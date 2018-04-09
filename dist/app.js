!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("lodash"),require("vue-class-component")):"function"==typeof define&&define.amd?define("vuex-keg",["lodash","vue-class-component"],e):"object"==typeof exports?exports["vuex-keg"]=e(require("lodash"),require("vue-class-component")):t["vuex-keg"]=e(t._,t["vue-class-component"])}(this,function(t,e){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([
/*!*************************************************************************************!*\
  !*** external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} ***!
  \*************************************************************************************/
/*! no static exports found */
/*! exports used: cloneDeep, forEach, isFunction, isNil, isString, trimEnd */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(e,n){e.exports=t},
/*!**************************************!*\
  !*** external "vue-class-component" ***!
  \**************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,n){t.exports=e},
/*!**********************************!*\
  !*** ./src/index.ts + 6 modules ***!
  \**********************************/
/*! exports provided: sLocalStoreStatus, sLocalStoreChannelName, sLocalStoreCounter, getNameSpace, getLocalMutationGetter, getLocalActionGetter, getLocalGetterGetter, getModuleByNameSpace, getLocalStateGetter, LocalState, LocalMutation, LocalAction, LocalStore, LocalGetter, mapLocalState, mapLocalMutations, mapLocalGetters, mapLocalActions, setLocalStore, default, Component */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with external "vue-class-component" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} (<- Module is not an ECMAScript module) */function(t,e,n){"use strict";n.r(e);var r=n(0),o=n(1),i=n.n(o),u=Symbol("localStoreChannel"),c=Symbol("localStoreStatus"),a=Symbol("localStoreCounter"),s=function(t){return t[u]},f=function(t){if(t){var e=t[c];e||(e={},t[c]=e);var n=e.localConnectedName;if(n)return n;for(var r,o=t;o;){(r=o[c])||(r={},o[c]=r);var i=r.localName,u=void 0===i?null:i;if(u)return t[c].localConnectedName=u,u;o=o.$parent}throw new Error("[Vuexl findLocalStoreName] cannot find a local store name")}},l=function(t,e,n){void 0===n&&(n="/");var o=Object(r.trimEnd)(e,n)+n,i=t._modulesNamespaceMap[o];if(!i)throw new Error("[Vuexl getModuleByNameSpace] cannot fine in "+e);return i},v=function(t,e){return e?e+"/"+t:t},d=function(t){return function(){var e=this.$isServer,n=this.$store;if(n&&!e&&t){var o=f(this),i=s(this),u=l(n,v(o,i)).context,c=u.state,a=u.getters;return Object(r.isFunction)(t)?t.call(this,c,a):Object(r.isString)(t)?c[t]:null}}},p=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=this.$isServer,i=this.$store;if(i&&!o&&t){var u=f(this),c=s(this),a=l(i,v(u,c)).context.commit;return Object(r.isFunction)(t)?t.apply(this,[a].concat(e)):a.apply(i,[t].concat(e))}}},m=function(t){return function(){var e=this.$isServer,n=this.$store;if(n&&!e&&t){var r=f(this),o=s(this);return n.getters[v(r,o)+"/"+t]}}},h=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var o=this.$isServer,i=this.$store;if(i&&!o&&t){var u=f(this),c=s(this),a=l(i,v(u,c)).context.dispatch;return Object(r.isFunction)(t)?t.apply(this,[a].concat(e)):a.apply(this,[t].concat(e))}}};function S(t,e){return void 0===e&&(e={}),function(n,r){if(n.localStore)throw new Error("[vuexl] omg");Object.defineProperty(n,"$localStore",{value:function(){return{name:r,store:t,options:e}}})}}function g(t){return function(e,n){var o,i=function(e,n){return t.call(this,e,n,o)};return Object(r.isString)(e)||Object(r.isFunction)(e)?(o=e,i):i(e,n)}}var b=g(function(t,e,n){var r=n||e;Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:d(r)})}),y=g(function(t,e,n){var r=n||e;Object.defineProperty(t,e,{value:p(r)})}),j=g(function(t,e,n){var r=n||e;Object.defineProperty(t,e,{value:h(r)})}),x=g(function(t,e,n){var r=n||e;Object.defineProperty(t,e,{get:m(r)})}),O=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},L=function(t,e,n){void 0===n&&(n=1);var o=t[a];return Object(r.isNil)(o[e])?(o[e]=0,0):(o[e]+=n,o[e])},$=function(t,e,n,o){void 0===o&&(o={});var i=t.$store,u=void 0===i?null:i,a=t.$isServer;if(u&&!(void 0!==a&&a)){var f=s(t),l=function(t,e,n){void 0===n&&(n={});var r=t.$options,o=(void 0===r?{}:r).name,i=void 0===o?"unknown":o,u=n.isUsingName,c=void 0===u||u,a=n.isUsingSameStore,s=void 0!==a&&a,f=n.numberingSeparator,l=void 0===f?"-":f,v=e&&c?e:i;return s?(L(t,v),v):""+v+l+L(t,v)}(t,n,o),v=o.isUsingName,d=void 0===v||v,p=o.isUsingSameStore,m=void 0!==p&&p;!function(t,e){var n=t.$store;e&&!n.state[e]&&n.registerModule(e,{namespaced:!0})}(t,f),t[c]={isUsingName:d,isUsingSameStore:m,name:n,localName:l,localConnectedName:null},function(t,e,n){var r=t.state;return Boolean(n?r[n][name]:r[name])}(u,0,f)||u.registerModule(f?[f,l]:[l],O({},Object(r.cloneDeep)(e),{namespaced:!0}))}},N=function(t){var e=t.$store,n=t.$isServer,r=function(t){return t[c]||{}}(t),o=r.localName,i=r.isUsingSameStore,u=r.name;if(e&&!n&&o){var a=L(t,u,-1);if(!i||a<0){var l=f(t),d=s(t);e.unregisterModule(v(l,d))}}};function M(t,e){var n={};return Object(r.forEach)(t,function(t,r){n[r]=e(t)}),n}var w=function(t){return M(t,h)},C=function(t){return M(t,m)},P=function(t){return M(t,p)},G=function(t){return M(t,d)},U=function(t,e,n){return void 0===n&&(n={}),{extends:t,beforeCreate:function(){var t=n.name;$(this,e,t,n)}}};n.d(e,"Component",function(){return _}),n.d(e,"sLocalStoreStatus",function(){return c}),n.d(e,"sLocalStoreChannelName",function(){return u}),n.d(e,"sLocalStoreCounter",function(){return a}),n.d(e,"getNameSpace",function(){return v}),n.d(e,"getLocalMutationGetter",function(){return p}),n.d(e,"getLocalActionGetter",function(){return h}),n.d(e,"getLocalGetterGetter",function(){return m}),n.d(e,"getModuleByNameSpace",function(){return l}),n.d(e,"getLocalStateGetter",function(){return d}),n.d(e,"LocalState",function(){return b}),n.d(e,"LocalMutation",function(){return y}),n.d(e,"LocalAction",function(){return j}),n.d(e,"LocalStore",function(){return S}),n.d(e,"LocalGetter",function(){return x}),n.d(e,"mapLocalState",function(){return G}),n.d(e,"mapLocalMutations",function(){return P}),n.d(e,"mapLocalGetters",function(){return C}),n.d(e,"mapLocalActions",function(){return w}),n.d(e,"setLocalStore",function(){return U});e.default={install:function(t,e){void 0===e&&(e={});var n=e.name;t.prototype[u]=n,t.prototype[a]={},t.mixin({created:function(){var t=this.$options.localStore,e=this.$localStore,n=t||e;if(Object(r.isFunction)(n)){var o=n.call(this);$(this,o.store,o.name,o.options)}},beforeDestroy:function(){N(this)}})}};function _(t){return i()(t)}},
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e,n){t.exports=n(/*! ./src/index.ts */2)}])});