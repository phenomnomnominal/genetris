!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t,n){"use strict";(function(t){var r=n(3);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */function o(e,t){if(e===t)return 0;for(var n=e.length,r=t.length,o=0,i=Math.min(n,r);o<i;++o)if(e[o]!==t[o]){n=e[o],r=t[o];break}return n<r?-1:r<n?1:0}function i(e){return t.Buffer&&"function"==typeof t.Buffer.isBuffer?t.Buffer.isBuffer(e):!(null==e||!e._isBuffer)}var s=n(4),a=Object.prototype.hasOwnProperty,c=Array.prototype.slice,u="foo"===function(){}.name;function l(e){return Object.prototype.toString.call(e)}function f(e){return!i(e)&&("function"==typeof t.ArrayBuffer&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):!!e&&(e instanceof DataView||!!(e.buffer&&e.buffer instanceof ArrayBuffer))))}var p=e.exports=b,h=/\s*function\s+([^\(\s]*)\s*/;function d(e){if(s.isFunction(e)){if(u)return e.name;var t=e.toString().match(h);return t&&t[1]}}function m(e,t){return"string"==typeof e?e.length<t?e:e.slice(0,t):e}function g(e){if(u||!s.isFunction(e))return s.inspect(e);var t=d(e);return"[Function"+(t?": "+t:"")+"]"}function y(e,t,n,r,o){throw new p.AssertionError({message:n,actual:e,expected:t,operator:r,stackStartFunction:o})}function b(e,t){e||y(e,!0,t,"==",p.ok)}function v(e,t,n,r){if(e===t)return!0;if(i(e)&&i(t))return 0===o(e,t);if(s.isDate(e)&&s.isDate(t))return e.getTime()===t.getTime();if(s.isRegExp(e)&&s.isRegExp(t))return e.source===t.source&&e.global===t.global&&e.multiline===t.multiline&&e.lastIndex===t.lastIndex&&e.ignoreCase===t.ignoreCase;if(null!==e&&"object"==typeof e||null!==t&&"object"==typeof t){if(f(e)&&f(t)&&l(e)===l(t)&&!(e instanceof Float32Array||e instanceof Float64Array))return 0===o(new Uint8Array(e.buffer),new Uint8Array(t.buffer));if(i(e)!==i(t))return!1;var a=(r=r||{actual:[],expected:[]}).actual.indexOf(e);return-1!==a&&a===r.expected.indexOf(t)||(r.actual.push(e),r.expected.push(t),function(e,t,n,r){if(null==e||null==t)return!1;if(s.isPrimitive(e)||s.isPrimitive(t))return e===t;if(n&&Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;var o=w(e),i=w(t);if(o&&!i||!o&&i)return!1;if(o)return e=c.call(e),t=c.call(t),v(e,t,n);var a,u,l=j(e),f=j(t);if(l.length!==f.length)return!1;for(l.sort(),f.sort(),u=l.length-1;u>=0;u--)if(l[u]!==f[u])return!1;for(u=l.length-1;u>=0;u--)if(a=l[u],!v(e[a],t[a],n,r))return!1;return!0}(e,t,n,r))}return n?e===t:e==t}function w(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function O(e,t){if(!e||!t)return!1;if("[object RegExp]"==Object.prototype.toString.call(t))return t.test(e);try{if(e instanceof t)return!0}catch(e){}return!Error.isPrototypeOf(t)&&!0===t.call({},e)}function x(e,t,n,r){var o;if("function"!=typeof t)throw new TypeError('"block" argument must be a function');"string"==typeof n&&(r=n,n=null),o=function(e){var t;try{e()}catch(e){t=e}return t}(t),r=(n&&n.name?" ("+n.name+").":".")+(r?" "+r:"."),e&&!o&&y(o,n,"Missing expected exception"+r);var i="string"==typeof r,a=!e&&o&&!n;if((!e&&s.isError(o)&&i&&O(o,n)||a)&&y(o,n,"Got unwanted exception"+r),e&&o&&n&&!O(o,n)||!e&&o)throw o}p.AssertionError=function(e){this.name="AssertionError",this.actual=e.actual,this.expected=e.expected,this.operator=e.operator,e.message?(this.message=e.message,this.generatedMessage=!1):(this.message=function(e){return m(g(e.actual),128)+" "+e.operator+" "+m(g(e.expected),128)}(this),this.generatedMessage=!0);var t=e.stackStartFunction||y;if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var n=new Error;if(n.stack){var r=n.stack,o=d(t),i=r.indexOf("\n"+o);if(i>=0){var s=r.indexOf("\n",i+1);r=r.substring(s+1)}this.stack=r}}},s.inherits(p.AssertionError,Error),p.fail=y,p.ok=b,p.equal=function(e,t,n){e!=t&&y(e,t,n,"==",p.equal)},p.notEqual=function(e,t,n){e==t&&y(e,t,n,"!=",p.notEqual)},p.deepEqual=function(e,t,n){v(e,t,!1)||y(e,t,n,"deepEqual",p.deepEqual)},p.deepStrictEqual=function(e,t,n){v(e,t,!0)||y(e,t,n,"deepStrictEqual",p.deepStrictEqual)},p.notDeepEqual=function(e,t,n){v(e,t,!1)&&y(e,t,n,"notDeepEqual",p.notDeepEqual)},p.notDeepStrictEqual=function e(t,n,r){v(t,n,!0)&&y(t,n,r,"notDeepStrictEqual",e)},p.strictEqual=function(e,t,n){e!==t&&y(e,t,n,"===",p.strictEqual)},p.notStrictEqual=function(e,t,n){e===t&&y(e,t,n,"!==",p.notStrictEqual)},p.throws=function(e,t,n){x(!0,e,t,n)},p.doesNotThrow=function(e,t,n){x(!1,e,t,n)},p.ifError=function(e){if(e)throw e},p.strict=r((function e(t,n){t||y(t,!0,n,"==",e)}),p,{equal:p.strictEqual,deepEqual:p.deepStrictEqual,notEqual:p.notStrictEqual,notDeepEqual:p.notDeepStrictEqual}),p.strict.strict=p.strict;var j=Object.keys||function(e){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t}}).call(this,n(2))},function(e,t,n){e.exports=function(){return new Worker(n.p+"ccfb4e8086b3c248ce35.worker.js")}},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function s(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,a,c=s(e),u=1;u<arguments.length;u++){for(var l in n=Object(arguments[u]))o.call(n,l)&&(c[l]=n[l]);if(r){a=r(n);for(var f=0;f<a.length;f++)i.call(n,a[f])&&(c[a[f]]=n[a[f]])}}return c}},function(e,t,n){(function(e){var r=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return n},o=/%[sdj%]/g;t.format=function(e){if(!y(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(a(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,i=r.length,s=String(e).replace(o,(function(e){if("%%"===e)return"%";if(n>=i)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}})),c=r[n];n<i;c=r[++n])m(c)||!w(c)?s+=" "+c:s+=" "+a(c);return s},t.deprecate=function(n,r){if(void 0!==e&&!0===e.noDeprecation)return n;if(void 0===e)return function(){return t.deprecate(n,r).apply(this,arguments)};var o=!1;return function(){if(!o){if(e.throwDeprecation)throw new Error(r);e.traceDeprecation?console.trace(r):console.error(r),o=!0}return n.apply(this,arguments)}};var i,s={};function a(e,n){var r={seen:[],stylize:u};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),d(n)?r.showHidden=n:n&&t._extend(r,n),b(r.showHidden)&&(r.showHidden=!1),b(r.depth)&&(r.depth=2),b(r.colors)&&(r.colors=!1),b(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=c),l(r,e,r.depth)}function c(e,t){var n=a.styles[t];return n?"["+a.colors[n][0]+"m"+e+"["+a.colors[n][1]+"m":e}function u(e,t){return e}function l(e,n,r){if(e.customInspect&&n&&j(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,e);return y(o)||(o=l(e,o,r)),o}var i=function(e,t){if(b(t))return e.stylize("undefined","undefined");if(y(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(g(t))return e.stylize(""+t,"number");if(d(t))return e.stylize(""+t,"boolean");if(m(t))return e.stylize("null","null")}(e,n);if(i)return i;var s=Object.keys(n),a=function(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}(s);if(e.showHidden&&(s=Object.getOwnPropertyNames(n)),x(n)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return f(n);if(0===s.length){if(j(n)){var c=n.name?": "+n.name:"";return e.stylize("[Function"+c+"]","special")}if(v(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(O(n))return e.stylize(Date.prototype.toString.call(n),"date");if(x(n))return f(n)}var u,w="",E=!1,_=["{","}"];(h(n)&&(E=!0,_=["[","]"]),j(n))&&(w=" [Function"+(n.name?": "+n.name:"")+"]");return v(n)&&(w=" "+RegExp.prototype.toString.call(n)),O(n)&&(w=" "+Date.prototype.toUTCString.call(n)),x(n)&&(w=" "+f(n)),0!==s.length||E&&0!=n.length?r<0?v(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),u=E?function(e,t,n,r,o){for(var i=[],s=0,a=t.length;s<a;++s)T(t,String(s))?i.push(p(e,t,n,r,String(s),!0)):i.push("");return o.forEach((function(o){o.match(/^\d+$/)||i.push(p(e,t,n,r,o,!0))})),i}(e,n,r,a,s):s.map((function(t){return p(e,n,r,a,t,E)})),e.seen.pop(),function(e,t,n){if(e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(u,w,_)):_[0]+w+_[1]}function f(e){return"["+Error.prototype.toString.call(e)+"]"}function p(e,t,n,r,o,i){var s,a,c;if((c=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]}).get?a=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(a=e.stylize("[Setter]","special")),T(r,o)||(s="["+o+"]"),a||(e.seen.indexOf(c.value)<0?(a=m(n)?l(e,c.value,null):l(e,c.value,n-1)).indexOf("\n")>-1&&(a=i?a.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+a.split("\n").map((function(e){return"   "+e})).join("\n")):a=e.stylize("[Circular]","special")),b(s)){if(i&&o.match(/^\d+$/))return a;(s=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+a}function h(e){return Array.isArray(e)}function d(e){return"boolean"==typeof e}function m(e){return null===e}function g(e){return"number"==typeof e}function y(e){return"string"==typeof e}function b(e){return void 0===e}function v(e){return w(e)&&"[object RegExp]"===E(e)}function w(e){return"object"==typeof e&&null!==e}function O(e){return w(e)&&"[object Date]"===E(e)}function x(e){return w(e)&&("[object Error]"===E(e)||e instanceof Error)}function j(e){return"function"==typeof e}function E(e){return Object.prototype.toString.call(e)}function _(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(n){if(b(i)&&(i=e.env.NODE_DEBUG||""),n=n.toUpperCase(),!s[n])if(new RegExp("\\b"+n+"\\b","i").test(i)){var r=e.pid;s[n]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",n,r,e)}}else s[n]=function(){};return s[n]},t.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=h,t.isBoolean=d,t.isNull=m,t.isNullOrUndefined=function(e){return null==e},t.isNumber=g,t.isString=y,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=b,t.isRegExp=v,t.isObject=w,t.isDate=O,t.isError=x,t.isFunction=j,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=n(6);var k=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function S(){var e=new Date,t=[_(e.getHours()),_(e.getMinutes()),_(e.getSeconds())].join(":");return[e.getDate(),k[e.getMonth()],t].join(" ")}function T(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",S(),t.format.apply(t,arguments))},t.inherits=n(7),t._extend=function(e,t){if(!t||!w(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e};var z="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function P(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}t.promisify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');if(z&&e[z]){var t;if("function"!=typeof(t=e[z]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,z,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,n,r=new Promise((function(e,r){t=e,n=r})),o=[],i=0;i<arguments.length;i++)o.push(arguments[i]);o.push((function(e,r){e?n(e):t(r)}));try{e.apply(this,o)}catch(e){n(e)}return r}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),z&&Object.defineProperty(t,z,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,r(e))},t.promisify.custom=z,t.callbackify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');function n(){for(var n=[],r=0;r<arguments.length;r++)n.push(arguments[r]);var o=n.pop();if("function"!=typeof o)throw new TypeError("The last argument must be of type Function");var i=this,s=function(){return o.apply(i,arguments)};t.apply(this,n).then((function(t){e.nextTick(s,null,t)}),(function(t){e.nextTick(P,t,s)}))}return Object.setPrototypeOf(n,Object.getPrototypeOf(t)),Object.defineProperties(n,r(t)),n}}).call(this,n(5))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var c,u=[],l=!1,f=-1;function p(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&h())}function h(){if(!l){var e=a(p);l=!0;for(var t=u.length;t;){for(c=u,u=[];++f<t;)c&&c[f].run();f=-1,t=u.length}c=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new d(e,t)),1!==u.length||l||a(h)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t,n){var r=n(9),o=n(10);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),s=[];function a(e){for(var t=-1,n=0;n<s.length;n++)if(s[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},r=[],o=0;o<e.length;o++){var i=e[o],c=t.base?i[0]+t.base:i[0],u=n[c]||0,l="".concat(c," ").concat(u);n[c]=u+1;var f=a(l),p={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(s[f].references++,s[f].updater(p)):s.push({identifier:l,updater:g(p,t),references:1}),r.push(l)}return r}function u(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var s=i(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var l,f=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function p(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=f(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function h(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var d=null,m=0;function g(e,t){var n,r,o;if(t.singleton){var i=m++;n=d||(d=u(t)),r=p.bind(null,n,i,!1),o=p.bind(null,n,i,!0)}else n=u(t),r=h.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=a(n[r]);s[o].references--}for(var i=c(e,t),u=0;u<n.length;u++){var l=a(n[u]);0===s[l].references&&(s[l].updater(),s.splice(l,1))}n=i}}}},function(e,t,n){(t=n(11)(!1)).push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Montserrat&family=Righteous&display=swap);"]),t.push([e.i,"html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after{content:'';content:none}q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}html,body{min-width:360px}@media only screen and (min-width: 0px){h1{font-size:4rem}h2{font-size:2rem}h3{font-size:1rem}}@media only screen and (min-width: 400px){h1{font-size:5rem}h2{font-size:2.5rem}h3{font-size:1.5rem}}@media only screen and (min-width: 480px){h1{font-size:6rem}h2{font-size:3rem}h3{font-size:2rem}}@media only screen and (min-width: 600px){h1{font-size:7rem}h2{font-size:3.5rem}h3{font-size:2.5rem}}@media only screen and (min-width: 720px){h1{font-size:8rem}h2{font-size:4rem}h3{font-size:3rem}}#genetris-run-toggle button{border-radius:0}#genetris-canvas-container{display:flex;flex-direction:row;flex-wrap:wrap;margin:1rem;justify-content:space-between}#genetris-focus-canvas-container{display:flex;margin:1rem;flex-wrap:wrap;justify-content:center}.genetris__canvas{outline:1px solid #6464ff;margin:0.25rem;cursor:pointer}.genetris__canvas:focus,.genetris__canvas--focus{outline:1px solid #c8c8ff}h1,h2,h3,button,label{font-family:'Righteous'}h1,h2,h3{color:blue;margin:1rem}#genetris-title{text-align:center;text-transform:uppercase}#genetris-cpu-warning{text-align:center;text-transform:uppercase}#genetris-cpu-warning h2{color:#c8c8ff}p,span,a{font-family:'Montserrat'}body{background:#00000a;color:#fff}pre{color:blue;text-align:center}a{color:currentColor}#genetris-info-container{font-size:2rem;margin:1rem;color:#6464ff}#genetris-info-container p{margin-bottom:1rem}#genetris-info-container span{display:block;color:#c8c8ff}#genetris-controls-container{text-align:center;margin-top:4rem;margin-bottom:2rem}button,#genetris-speed-slider{color:#c8c8ff;background:#00000a;min-width:300px;padding:2rem 0;font-size:2rem;text-transform:uppercase}button{outline:1px solid blue;border:none;cursor:pointer;margin-bottom:2px}button:hover{outline:2px solid blue}button:focus{outline:3px solid #c8c8ff}button:active{margin-top:1px;margin-bottom:1px}#footer-container{padding:2rem;background:blue}#footer-container p{display:inline-block;color:#c8c8ff;padding-right:1rem}.demo #genetris-cpu-warning,.demo #genetris-info-chromosome,.demo #genetris-focus-canvas-container,.demo #genetris-controls-container,.demo #footer-container{display:none}\n",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(s=r,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var s,a,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);r&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t,n){"use strict";n.r(t);var r=n(0);function o(e){return{length:e}}function i(e,t){const n=e>t?e:t,r=e>t?t:e;return Array.from(o(n-r),(e,t)=>t+r)}function s(){}function a(...e){console.log(...e)}class c{constructor(e){this.genes=e}procreate(e,t){const n=this.genes.map((n,r)=>{const o=Math.random(),i=o<.5?this.genes[r]:e.genes[r];return o<t?u():i});return new c(n)}static random(e){const t=i(0,e).map(()=>u());return new c(t)}}function u(){return Math.random()*Math.pow(2,32)-Math.pow(2,31)}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function l(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))}Object.create;Object.create;const f=Symbol("Comlink.proxy"),p=Symbol("Comlink.endpoint"),h=Symbol("Comlink.releaseProxy"),d=Symbol("Comlink.thrown"),m=e=>"object"==typeof e&&null!==e||"function"==typeof e,g=new Map([["proxy",{canHandle:e=>m(e)&&e[f],serialize(e){const{port1:t,port2:n}=new MessageChannel;return y(e,t),[n,[n]]},deserialize:e=>(e.start(),v(e))}],["throw",{canHandle:e=>m(e)&&d in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error(e.value.message),e.value);throw e.value}}]]);function y(e,t=self){t.addEventListener("message",(function n(r){if(!r||!r.data)return;const{id:o,type:i,path:s}=Object.assign({path:[]},r.data),a=(r.data.argumentList||[]).map(_);let c;try{const t=s.slice(0,-1).reduce((e,t)=>e[t],e),n=s.reduce((e,t)=>e[t],e);switch(i){case"GET":c=n;break;case"SET":t[s.slice(-1)[0]]=_(r.data.value),c=!0;break;case"APPLY":c=n.apply(t,a);break;case"CONSTRUCT":c=j(new n(...a));break;case"ENDPOINT":{const{port1:t,port2:n}=new MessageChannel;y(e,n),c=function(e,t){return x.set(e,t),e}(t,[t])}break;case"RELEASE":c=void 0;break;default:return}}catch(e){c={value:e,[d]:0}}Promise.resolve(c).catch(e=>({value:e,[d]:0})).then(e=>{const[r,s]=E(e);t.postMessage(Object.assign(Object.assign({},r),{id:o}),s),"RELEASE"===i&&(t.removeEventListener("message",n),b(t))})})),t.start&&t.start()}function b(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function v(e,t){return function e(t,n=[],r=function(){}){let o=!1;const i=new Proxy(r,{get(r,s){if(w(o),s===h)return()=>k(t,{type:"RELEASE",path:n.map(e=>e.toString())}).then(()=>{b(t),o=!0});if("then"===s){if(0===n.length)return{then:()=>i};const e=k(t,{type:"GET",path:n.map(e=>e.toString())}).then(_);return e.then.bind(e)}return e(t,[...n,s])},set(e,r,i){w(o);const[s,a]=E(i);return k(t,{type:"SET",path:[...n,r].map(e=>e.toString()),value:s},a).then(_)},apply(r,i,s){w(o);const a=n[n.length-1];if(a===p)return k(t,{type:"ENDPOINT"}).then(_);if("bind"===a)return e(t,n.slice(0,-1));const[c,u]=O(s);return k(t,{type:"APPLY",path:n.map(e=>e.toString()),argumentList:c},u).then(_)},construct(e,r){w(o);const[i,s]=O(r);return k(t,{type:"CONSTRUCT",path:n.map(e=>e.toString()),argumentList:i},s).then(_)}});return i}(e,[],t)}function w(e){if(e)throw new Error("Proxy has been released and is not useable")}function O(e){const t=e.map(E);return[t.map(e=>e[0]),(n=t.map(e=>e[1]),Array.prototype.concat.apply([],n))];var n}const x=new WeakMap;function j(e){return Object.assign(e,{[f]:!0})}function E(e){for(const[t,n]of g)if(n.canHandle(e)){const[r,o]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},o]}return[{type:"RAW",value:e},x.get(e)||[]]}function _(e){switch(e.type){case"HANDLER":return g.get(e.name).deserialize(e.value);case"RAW":return e.value}}function k(e,t,n){return new Promise(r=>{const o=new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===o&&(e.removeEventListener("message",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)})}class S{constructor(e,t){this._options=e,this._chromosomes=t,this._finished=!1,this._fitness=new Map}getNextFitness(e){return l(this,void 0,void 0,(function*(){const t=this._options.populationSize-this._chromosomes.length,n=this._chromosomes.shift();Object(r.ok)(n),0===this._chromosomes.length&&(this._finished=!0);const o=yield e(n,t);this._fitness.set(n,o)}))}state(){if(this._finished){const e=this._sortPopulationByFitness(),[t]=e,n=this._fitness.get(t);Object(r.ok)(n);return{bestChromosome:t,bestFitness:n,nextGeneration:this._nextGeneration(e),finished:!0}}return{finished:!1}}_sortPopulationByFitness(){return Array.from(this._fitness.keys()).sort((e,t)=>{const n=this._fitness.get(e),o=this._fitness.get(t);return Object(r.ok)(n),Object(r.ok)(o),o-n})}_nextGeneration(e){const{populationSize:t,mutationRate:n,survivalRate:r}=this._options,o=Math.floor(e.length*r),s=e.slice(0,o),a=s.slice(0),c=s.map((e,t)=>{const n=t+1;return 1/Math.pow(2,n)});function u(e){const t=Math.random(),n=e.find(e=>c[e]<t),[r]=e.splice(n,1);return r}for(;a.length<t;){const e=i(0,s.length),[t,r]=[u(e),u(e)],o=s[t],c=s[r],l=o.procreate(c,n);a.push(l)}return new S(this._options,a)}static random(e){const t=i(0,e.populationSize).map(()=>c.random(e.numberOfGenes));return new S(e,t)}}const T={workers:Math.max("undefined"!=typeof navigator&&navigator.hardwareConcurrency?navigator.hardwareConcurrency:4),onProgress:s,onComplete:s},z={populationSize:32,mutationRate:.1,survivalRate:.33};class P{constructor(e,t){this._queueSize=e,this._workers=t,this._deferreds=[],this._index=0}start(e){const t=i(0,this._queueSize).map(()=>new Promise(e=>{this._deferreds.push(e)}));return i(0,this._workers).forEach(()=>{this._next(e)}),t.reduce((e,t)=>l(this,void 0,void 0,(function*(){return yield e,t})),Promise.resolve())}_next(e){return l(this,void 0,void 0,(function*(){const t=this._index;this._index+=1,t<this._deferreds.length&&(yield e(),this._next(e),this._deferreds[t]())}))}}class M{constructor(e){this._bestFitness=null,this._generation=1,this._remotes=[],this._timeout=1e3,this._workers=[],this._options=function(e){if(void 0===e.numberOfGenes)throw new Error;if(void 0===e.work)throw new Error;return Object.assign(Object.assign(Object.assign({},T),z),e)}(e)}run(e=S.random(this._options)){return l(this,void 0,void 0,(function*(){const t=new P(this._options.populationSize,this._options.workers);a(`Generation ${this._generation} starting`),yield t.start(()=>l(this,void 0,void 0,(function*(){return e.getNextFitness((e,t)=>l(this,void 0,void 0,(function*(){a(`Chromosome ${t} running...`);const n=yield this._getFitness(e,t);return a(`Chromosome ${t} fitness: ${n}`),n})))})));const n=e.state();Object(r.ok)(n.finished);const{bestFitness:o,bestChromosome:i,nextGeneration:s}=n;return a(`Generation ${this._generation} complete.`),(!this._bestFitness||o>this._bestFitness)&&(this._bestFitness=o,a("New best fitting chomosome found with fit = "+o)),this._generation+=1,this._options.onComplete(this._generation,o,i),this.run(s)}))}resume(){return l(this,void 0,void 0,(function*(){yield Promise.all(this._remotes.map(e=>null==e?void 0:e.resume()))}))}pause(){return l(this,void 0,void 0,(function*(){yield Promise.all(this._remotes.map(e=>null==e?void 0:e.pause()))}))}setTimeout(e){return l(this,void 0,void 0,(function*(){this._timeout=e,yield Promise.all(this._remotes.map(e=>null==e?void 0:e.setTimeout(this._timeout)))}))}_getFitness(e,t){return l(this,void 0,void 0,(function*(){const n=yield this._createRemote(),r=yield n.evaluateFitness(e,j(e=>this._options.onProgress(t,e)));return this._destoryRemote(n),r}))}_createRemote(){return l(this,void 0,void 0,(function*(){const e=this._options.work(),t=v(e);return yield t.setTimeout(this._timeout),this._workers.push(e),this._remotes.push(t),t}))}_destoryRemote(e){const t=this._remotes.indexOf(e),n=this._workers[t];e[h](),n.terminate(),this._workers[t]=null,this._remotes[t]=null}}const F=[1,2,3,4,5,6,7];o(13);o(10);o(20);var C=n(1);n(8);const A=[null,"#F22","#2F2","#22F","#FF2","#F2F","#2FF","#FFF"],q=document.getElementById.bind(document),R=q("genetris"),L=q("genetris-canvas-container"),N=q("genetris-info-generation"),D=q("genetris-info-chromosome-index"),B=q("genetris-info-score"),I=q("genetris-info-maximising"),G=q("genetris-info-minimising"),H=q("genetris-focus-canvas"),$=q("genetris-run-toggle"),U=q("genetris-speed-range");Object(r.ok)(R),Object(r.ok)(L),Object(r.ok)(N),Object(r.ok)(D),Object(r.ok)(B),Object(r.ok)(I),Object(r.ok)(G),Object(r.ok)($),Object(r.ok)(U),Object(r.ok)(H),document.addEventListener("DOMContentLoaded",()=>{R.style.display="block";"#demo"===location.hash&&(document.body.classList.add("demo"),U.value="0");const e=function(e){const t=Math.floor(e/60),n=Math.floor(e/t);return{width:n,height:n/10*20,block:n/10}}(L.clientWidth),t={width:3*e.width,height:3*e.height,block:3*e.block};let n=0;const o={state:null,$canvas:H,context:H.getContext("2d"),canvasSize:t},s=[];i(0,36).forEach(()=>{const t=document.createElement("canvas");t.tabIndex=0,t.classList.add("genetris__canvas"),L.appendChild(t);const n=t.getContext("2d");Object(r.ok)(n),s.push({state:null,$canvas:t,context:n,canvasSize:e})}),l(s),l([o]),function(e){e.forEach(h)}(s);const a=["creating blockers","height","creating holes","touching other blocks","touching the floor","touching the wall","clearing one line","clearing two lines","clearing three lines","clearing four lines"],c=new M({mutationRate:.5,numberOfGenes:10,populationSize:36,work:()=>new C,onProgress:(e,t)=>{s[e].state=t,e===n&&d(t),f(s[e])},onComplete:e=>{N.innerHTML=""+e,s.forEach(e=>p(e))}});let u=!0;function l(e){e.forEach(e=>function(e,t){const{$canvas:n}=e;n.width=t.width,n.style.width=n.width+"px;",n.height=t.height,n.style.height=n.height+"px;"}(e,e.canvasSize)),e.forEach((t,n)=>f(e[n]))}function f(e){const{state:t}=e;t&&function(e){const{state:t,context:n,canvasSize:o}=e,{block:i}=o;Object(r.ok)(t),p(e),t.grid.rows.forEach((e,r)=>{e.forEach((e,o)=>{if(F.includes(e)){const s=t.finished?"#009":A[e];n.fillStyle=s,n.fillRect(o*i+1,r*i+1,i-2,i-2)}})})}(e)}function p(e){const{context:t,canvasSize:n}=e,{width:r,height:o}=n;t.clearRect(0,0,r,o),t.fillStyle="transparent",t.fillRect(0,0,r,o)}function h(e,t){e.$canvas.addEventListener("focus",()=>{n=t,Object(r.ok)(D),D.innerText=""+(t+1);const e=s[n];d(e.state),s.forEach(e=>{const{$canvas:t}=e;t.classList.remove("genetris__canvas--focus")});const{$canvas:o}=e;o.classList.add("genetris__canvas--focus")})}function d(e){if(o.state=e,Object(r.ok)(B),e){const t=new Intl.NumberFormat,{score:n}=e.gameState;B.innerText=t?t.format(n):""+n;const o=Math.max(...e.weights),i=Math.min(...e.weights);Object(r.ok)(I),I.innerHTML=a[e.weights.indexOf(o)],Object(r.ok)(G),G.innerHTML=a[e.weights.indexOf(i)]}f(o)}$.addEventListener("click",()=>{u=!u,$.innerHTML=u?"Pause":"Resume",u?c.resume():c.pause()}),U.addEventListener("change",e=>{const{value:t,max:n}=e.currentTarget;c.setTimeout(parseFloat(n)-parseFloat(t))}),c.setTimeout(parseFloat(U.value)),c.run()})}]);