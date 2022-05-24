

```sh
checkLoginProgress
​ +++ logout true:{"clientId":"idhe-two","autoRefresh":"true","provider":"http://silverfir:8787/realms/MisDev2/protocol/openid-connect","logoutEndpoint":"http://silverfir:8787/realms/MisDev2/protocol/openid-connect/logout\",","redirectUri":"http://localhost:3000/signin/","scopes":["read offline_access"]}
​ Should End? true
​ LOGOUT: http://silverfir:8787/realms/MisDev2/protocol/openid-connect/logout",
​ accessToken: undefined
​ DONE integration api gateway logout
​ +++ SignIn
:3000/signin/sign-in?preAuthUri=http://localhost:3000/signin/:1 
        
       Access to fetch at 'http://silverfir:8787/realms/MisDev2/protocol/openid-connect/logout%22,' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

        
       POST http://silverfir:8787/realms/MisDev2/protocol/openid-connect/logout%22, net::ERR_FAILED
logout @ main.chunk.js:5693
checkLoginProgress @ main.chunk.js:1863
(anonymous) @ main.chunk.js:1876
setTimeout (async)
(anonymous) @ main.chunk.js:1875
invokePassiveEffectCreate @ vendors~main.chunk.js:524216
callCallback @ vendors~main.chunk.js:504832
invokeGuardedCallbackDev @ vendors~main.chunk.js:504881
invokeGuardedCallback @ vendors~main.chunk.js:504941
flushPassiveEffectsImpl @ vendors~main.chunk.js:524298
unstable_runWithPriority @ vendors~main.chunk.js:542845
runWithPriority$1 @ vendors~main.chunk.js:512238
flushPassiveEffects @ vendors~main.chunk.js:524175
performSyncWorkOnRoot @ vendors~main.chunk.js:523015
(anonymous) @ vendors~main.chunk.js:512292
unstable_runWithPriority @ vendors~main.chunk.js:542845
runWithPriority$1 @ vendors~main.chunk.js:512238
flushSyncCallbackQueueImpl @ vendors~main.chunk.js:512287
flushSyncCallbackQueue @ vendors~main.chunk.js:512275
unbatchedUpdates @ vendors~main.chunk.js:523186
legacyRenderSubtreeIntoContainer @ vendors~main.chunk.js:526695
render @ vendors~main.chunk.js:526778
(anonymous) @ main.chunk.js:774
./src/index.jsx @ main.chunk.js:859
__webpack_require__ @ bundle.js:852
fn @ bundle.js:151
1 @ main.chunk.js:6843
__webpack_require__ @ bundle.js:852
checkDeferredModules @ bundle.js:46
webpackJsonpCallback @ bundle.js:33
(anonymous) @ main.chunk.js:1
​ FAILED LOGOUT
​ +++ login()
Navigated to http://localhost:3000/signin/?error=invalid_scope&error_description=Invalid+scopes%3A+read+offline_access
```
