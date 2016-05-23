import sdk from './rc-sdk'
import rcSubscription from './rc-subscription-service'

var rcMessageService = function(sdk) {
    var messages = {}
    var fetchingPromise = null
    var syncToken = null
    var messageUpdateHandlers = []

    function fullSyncMessages(hour) {
        return sdk.platform().get('/account/~/extension/~/message-sync', {
            dateFrom: new Date(Date.now() - hour * 3600 * 1000).toISOString(),
            syncType: 'FSync'
        }).then(responses => {
            var jsonResponse = responses.json()
            syncToken = jsonResponse.syncInfo.syncToken
            var results = jsonResponse.records
            addMessageToList(results)
            fetchingPromise = null
            return results
        })
    }

    function incrementalSyncMessages() {
        if (syncToken) {
            return sdk.platform().get('/account/~/extension/~/message-sync', {
                syncType: 'ISync',
                syncToken: syncToken
            }).then(responses => {
                var jsonResponse = responses.json()
                var results = jsonResponse.records
                syncToken = jsonResponse.syncInfo.syncToken
                updateMessageList(results)
                messageUpdateHandlers.forEach(h => h(results))
            })
        }
    }

    function concatMessages() {
        var results = []
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                results = results.concat(messages[key])
            }
        }
        return results
    }

    function addMessageToList(results) {
        results.forEach(message => {
            if (!messages[message.type]) {
                messages[message.type] = []
            }
            messages[message.type].push(message)
        })
    }

    function updateMessageList(results) {
        results.forEach(message => {
            var messageList = messages[message.type]
            if (!messageList) {
                if (message.availability === 'Alive') {
                    messages[message.type] = []
                    messages[message.type].splice(0, 0, message)
                }
            }else {
                var index = 0
                for (; index < messageList.length; index++) {
                    if (messageList[index].id === message.id) {
                        if (message.availability === 'Alive') {
                            messageList[index] = message
                        } else {
                            messageList.splice(index, 1)
                        }
                        break
                    }
                }
                if (index === messageList.length) {
                    if (message.availability === 'Alive') {
                        messageList.splice(0, 0, message)
                    }
                }
            }
        })
    }

    return {
        syncMessages: function(hour) {
            fetchingPromise = fullSyncMessages(hour)
            return fetchingPromise
        },
        getMessagesByType: function(type) {
            if (!fetchingPromise) {
                if (messages[type]) {
                    return messages[type]
                } else {
                    return []
                }
            } else {
                return fetchingPromise.then(() => {
                    return messages[type]
                })
            }
        },
        getAllMessages: function() {
            return !fetchingPromise ? concatMessages() : fetchingPromise.then(concatMessages)
        },
        subscribeToMessageUpdate: function() {
            rcSubscription.subscribe(
                'message-store',
                '/restapi/v1.0/account/~/extension/~/message-store',
                incrementalSyncMessages
            )
        },
        onMessageUpdated: function(handler) {
            if (handler) {
                messageUpdateHandlers.push(handler)
            }
        },
        sendSMSMessage: function(text, fromNumber, toNumber) {
            return sdk.platform()
                .post('/account/~/extension/~/sms/', {
                    from: {phoneNumber: fromNumber},
                    to: [
                        {phoneNumber: toNumber}
                    ],
                    text: text
                })
                .then(response => response.json())
        },
        sendPagerMessage: function(text, fromNumber, toNumber) {
            console.log(fromNumber);
            return sdk.platform()
                .post('/account/~/extension/~/company-pager/', {
                    from: {extensionNumber: fromNumber},
                    to: [
                        {extensionNumber: toNumber}
                    ],
                    text: text
                })
                .then(response => response.json())
        },
        getConversation: function(conversationId, hourFrom, hourTo) {
            return sdk.platform()
                .get('/account/~/extension/~/message-store', {
                    dateFrom: new Date(Date.now() - hourFrom * 3600 * 1000).toISOString(),
                    dateTo: new Date(Date.now() - (hourTo || 0) * 3600 * 1000).toISOString(),
                    conversationId
                })
                .then(response => response.json())
                .then(data => data.records)
                .then(records => records.reverse())
        },
        getMessagesByNumber: function(phoneNumber, hourFrom, hourTo) {
            return sdk.platform()
                .get('/account/~/extension/~/message-store', {
                    dateFrom: new Date(Date.now() - hourFrom * 3600 * 1000).toISOString(),
                    dateTo: new Date(Date.now() - (hourTo || 0) * 3600 * 1000).toISOString(),
                    phoneNumber
                })
                .then(response => response.json())
                .then(data => data.records)
                .then(records => records.reverse())
        }
    }
}(sdk)

export default rcMessageService
