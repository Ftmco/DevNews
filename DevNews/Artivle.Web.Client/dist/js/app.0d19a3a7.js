(function(e){function n(n){for(var r,u,o=n[0],i=n[1],l=n[2],f=0,d=[];f<o.length;f++)u=o[f],Object.prototype.hasOwnProperty.call(c,u)&&c[u]&&d.push(c[u][0]),c[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);h&&h(n);while(d.length)d.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,u=1;u<t.length;u++){var o=t[u];0!==c[o]&&(r=!1)}r&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},u={app:0},c={app:0},a=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2bdb7f20":"4e6672b1","chunk-4ef4c5b0":"b9a51020","chunk-3d62ea44":"5bb98ce2","chunk-02e61ce5":"f1577df2","chunk-07ddfb26":"244ed7d6","chunk-ba4106a0":"9fcf7c0c","chunk-2635ebb7":"15173070","chunk-6d4095e7":"51807011","chunk-b0663ef8":"f4096846","chunk-63b5589a":"0427df32","chunk-0d55370c":"8573c7d6"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-4ef4c5b0":1,"chunk-02e61ce5":1,"chunk-07ddfb26":1,"chunk-ba4106a0":1,"chunk-2635ebb7":1,"chunk-6d4095e7":1,"chunk-b0663ef8":1,"chunk-63b5589a":1,"chunk-0d55370c":1};u[e]?n.push(u[e]):0!==u[e]&&t[e]&&n.push(u[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-2bdb7f20":"31d6cfe0","chunk-4ef4c5b0":"f43a6be7","chunk-3d62ea44":"31d6cfe0","chunk-02e61ce5":"0b6f6e92","chunk-07ddfb26":"4ca91e85","chunk-ba4106a0":"c7cc5066","chunk-2635ebb7":"33d6148b","chunk-6d4095e7":"33d6148b","chunk-b0663ef8":"33d6148b","chunk-63b5589a":"643e1ab3","chunk-0d55370c":"33d6148b"}[e]+".css",c=i.p+r,a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var l=a[o],f=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(f===r||f===c))return n()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],f=l.getAttribute("data-href");if(f===r||f===c)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var r=n&&n.target&&n.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete u[e],h.parentNode.removeChild(h),t(a)},h.href=c;var s=document.getElementsByTagName("head")[0];s.appendChild(h)})).then((function(){u[e]=0})));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var a=new Promise((function(n,t){r=c[e]=[n,t]}));n.push(r[2]=a);var l,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=o(e);var d=new Error;l=function(n){f.onerror=f.onload=null,clearTimeout(h);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+u+")",d.name="ChunkLoadError",d.type=r,d.request=u,t[1](d)}c[e]=void 0}};var h=setTimeout((function(){l({type:"timeout",target:f})}),12e4);f.onerror=f.onload=l,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],f=l.push.bind(l);l.push=n,l=l.slice();for(var d=0;d<l.length;d++)n(l[d]);var h=f;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("cd49")},cd49:function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-app",[t("router-view")],1)},c=[],a=r["a"].extend({name:"App"}),o=a,i=t("2877"),l=t("6544"),f=t.n(l),d=t("7496"),h=Object(i["a"])(o,u,c,!1,null,null,null),s=h.exports;f()(h,{VApp:d["a"]});var b=t("f309");r["a"].use(b["a"]);var p=new b["a"]({}),m=t("5530"),k=(t("d3b7"),t("3ca3"),t("ddb0"),t("8c4f")),v=function(e){var n=e.store,t=e.next;return n.getters.auth.isLogin?t({name:"Profile"}):t()},g=t("2f62"),w=t("fc08");r["a"].use(g["a"]);var y=new g["a"].Store({state:{user:{isLogin:w["a"].isAuthenticated()}},getters:{auth:function(e){return e.user}},mutations:{},actions:{},modules:{}});function P(e,n,t){var r=n[t];return r?function(){var u=P(e,n,t+1);r(Object(m["a"])(Object(m["a"])({},e),{},{next:u}))}:e.next}var O=function(e){var n=e.store,t=e.next;return n.getters.auth.isLogin?t():t({name:"Login"})},j=function(e){var n=document.getElementsByTagName("title")[0];n.innerHTML=e};r["a"].use(k["a"]);var x=[{path:"/",component:function(){return Promise.all([t.e("chunk-4ef4c5b0"),t.e("chunk-3d62ea44"),t.e("chunk-02e61ce5"),t.e("chunk-07ddfb26")]).then(t.bind(null,"ae0a"))},meta:function(e){return{route:e,title:"Home"}},children:[{path:"",name:"Home",component:function(){return t.e("chunk-2bdb7f20").then(t.bind(null,"f5b8"))},meta:function(e){return{route:e,title:"Dev News"}}},{path:"/account/login",name:"Login",component:function(){return Promise.all([t.e("chunk-4ef4c5b0"),t.e("chunk-3d62ea44"),t.e("chunk-ba4106a0"),t.e("chunk-02e61ce5"),t.e("chunk-2635ebb7")]).then(t.bind(null,"8db0"))},meta:function(e){return{route:e,title:"Login",middleware:v}}},{path:"/account/profile",name:"Profile",component:function(){return Promise.all([t.e("chunk-4ef4c5b0"),t.e("chunk-3d62ea44"),t.e("chunk-ba4106a0"),t.e("chunk-63b5589a")]).then(t.bind(null,"7a38"))},meta:function(e){return{route:e,title:"Profile",middleware:O}}},{path:"/account/forgotPassword",name:"ForgotPassword",component:function(){return Promise.all([t.e("chunk-4ef4c5b0"),t.e("chunk-ba4106a0"),t.e("chunk-02e61ce5"),t.e("chunk-0d55370c")]).then(t.bind(null,"ac8e"))},meta:function(e){return{route:e,title:"Forgot Password",middleware:v}}},{path:"/account/signup",name:"SignUp",component:function(){return Promise.all([t.e("chunk-4ef4c5b0"),t.e("chunk-3d62ea44"),t.e("chunk-ba4106a0"),t.e("chunk-02e61ce5"),t.e("chunk-6d4095e7")]).then(t.bind(null,"e058"))},meta:function(e){return{route:e,title:"SignUp",middleware:v}}},{path:"/account/activeAccount",name:"ActiveAccount",component:function(){return Promise.all([t.e("chunk-4ef4c5b0"),t.e("chunk-3d62ea44"),t.e("chunk-ba4106a0"),t.e("chunk-02e61ce5"),t.e("chunk-b0663ef8")]).then(t.bind(null,"1b1e"))},meta:function(e){return{route:e,title:"Active Account",middleware:v}}}]}],A=new k["a"]({routes:x,mode:"history"});A.beforeEach((function(e,n,t){var r=e.meta(e);if(j(r.title),!r.middleware)return t();var u=r.middleware,c={to:e,from:n,next:t,store:y};return u(Object(m["a"])(Object(m["a"])({},c),{},{next:P(c,u,1)}))}));var S=A;r["a"].config.productionTip=!0,new r["a"]({vuetify:p,router:S,render:function(e){return e(s)}}).$mount("#app")},fc08:function(e,n,t){"use strict";n["a"]={authenticationToken:function(){var e;return null!==(e=localStorage.getItem("Token"))&&void 0!==e?e:null},isAuthenticated:function(){var e=this.authenticationToken();return null!=e}}}});
//# sourceMappingURL=app.0d19a3a7.js.map