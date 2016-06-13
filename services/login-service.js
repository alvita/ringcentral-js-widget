import { RC } from './rc-sdk'
var LoginService = function(sdk) {
    var onLoginHandler = []
    return {
        login: function(username, extension, password) {
            return RC.sdk.platform()
                .login({
                    'username': username,
                    'extension': extension,
                    'password': password
                })
        },
        logout: function() {
            return RC.sdk.platform().logout()
        },
        checkLoginStatus: function() {
            return RC.sdk.platform().loggedIn().then(function(isLoggedIn) {
                if (isLoggedIn) {
                    onLoginHandler.forEach(handler => handler())
                }
                return isLoggedIn
            })
        },
        oauth: function() {
            parent.postMessage({
                type: 'oauth-request-info',
            }, '*')
            return new Promise((resolve, reject) => {
                window.addEventListener('message', function(e) {
                    if (e.data.type === 'oauth-info-response') {
                        var url = RC.sdk.platform().authUrl({
                            redirectUri: e.data.value
                        })
                        parent.postMessage({
                            type: 'oauth-request',
                            value:url
                        }, '*')
                    }
                    if (e.data.type === 'oauth-response') {
                        var qs = RC.sdk.platform().parseAuthRedirectUrl(e.data.value.url);
                        qs.redirectUri = e.data.value.redirectUri;
                        resolve(RC.sdk.platform().login(qs))
                    }
                }); 
            })
        }
    }
}()
export default LoginService
