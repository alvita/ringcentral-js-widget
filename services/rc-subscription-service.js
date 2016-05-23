import sdk from './rc-sdk'

var rcSubscription = function() {

    var cacheKey = 'ringcentral-subscription'
    var subscription = sdk.createCachedSubscription(cacheKey).restore()
    var handlers = {}
    subscription.on(subscription.events.notification, function(msg) {
        console.log('update from pubnub');
        for (var key in handlers) {
            if (handlers.hasOwnProperty(key)) {
                if (msg.event.indexOf(key) > -1) {
                    handlers[key].forEach(h => {
                        try {
                            h(msg)
                        } catch (e) {
                            console.error('Error occurs when invoking subscription notification handler for "' +
                        msg.event + '": ' + e)
                        }
                    })
                }
            }
        }
    })

    return {
        subscribe: function(suffix, event, handler) {
            if (event && suffix) {
                if (!handlers[suffix]) {
                    handlers[suffix] = []
                }
                handlers[suffix].push(handler)
                subscription.addEventFilters(event).register()
            }
        }
    }
}()

export default rcSubscription
