!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("ohyeah",[],e):"object"==typeof exports?exports.ohyeah=e():t.ohyeah=e()}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=17)}([function(t,e,n){var o=n(15);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(18).default)("2b2dfccf",o,!0,{})},function(t,e,n){"use strict";(t.exports={}).forEach=function(t,e){for(var n=0;n<t.length;n++){var o=e(t[n]);if(o)return o}}},function(t,e,n){"use strict";var o=t.exports={};o.isIE=function(t){return(-1!==(e=navigator.userAgent.toLowerCase()).indexOf("msie")||-1!==e.indexOf("trident")||-1!==e.indexOf(" edge/"))&&(!t||t===function(){var t=3,e=document.createElement("div"),n=e.getElementsByTagName("i");do{e.innerHTML="\x3c!--[if gt IE "+ ++t+"]><i></i><![endif]--\x3e"}while(n[0]);return t>4?t:void 0}());var e},o.isLegacyOpera=function(){return!!window.opera}},function(t,e,n){"use strict";var o=n(1).forEach,i=n(4),r=n(5),a=n(6),s=n(7),l=n(8),c=n(2),h=n(9),d=n(11),u=n(12),f=n(13);function p(t){return Array.isArray(t)||void 0!==t.length}function b(t){if(Array.isArray(t))return t;var e=[];return o(t,(function(t){e.push(t)})),e}function v(t){return t&&1===t.nodeType}function m(t,e,n){var o=t[e];return null==o&&void 0!==n?n:o}t.exports=function(t){var e;if((t=t||{}).idHandler)e={get:function(e){return t.idHandler.get(e,!0)},set:t.idHandler.set};else{var n=a(),g=s({idGenerator:n,stateHandler:d});e=g}var y=t.reporter;y||(y=l(!1===y));var w=m(t,"batchProcessor",h({reporter:y})),S={};S.callOnAdd=!!m(t,"callOnAdd",!0),S.debug=!!m(t,"debug",!1);var x,H=r(e),W=i({stateHandler:d}),T=m(t,"strategy","object"),k={reporter:y,batchProcessor:w,stateHandler:d,idHandler:e};if("scroll"===T&&(c.isLegacyOpera()?(y.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."),T="object"):c.isIE(9)&&(y.warn("Scroll strategy is not supported on IE9. Changing to object strategy."),T="object")),"scroll"===T)x=f(k);else{if("object"!==T)throw new Error("Invalid strategy name: "+T);x=u(k)}var E={};return{listenTo:function(t,n,i){function r(t){var e=H.get(t);o(e,(function(e){e(t)}))}function a(t,e,n){H.add(e,n),t&&n(e)}if(i||(i=n,n=t,t={}),!n)throw new Error("At least one element required.");if(!i)throw new Error("Listener required.");if(v(n))n=[n];else{if(!p(n))return y.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");n=b(n)}var s=0,l=m(t,"callOnAdd",S.callOnAdd),c=m(t,"onReady",(function(){})),h=m(t,"debug",S.debug);o(n,(function(t){d.getState(t)||(d.initState(t),e.set(t));var u=e.get(t);if(h&&y.log("Attaching listener to element",u,t),!W.isDetectable(t))return h&&y.log(u,"Not detectable."),W.isBusy(t)?(h&&y.log(u,"System busy making it detectable"),a(l,t,i),E[u]=E[u]||[],void E[u].push((function(){++s===n.length&&c()}))):(h&&y.log(u,"Making detectable..."),W.markBusy(t,!0),x.makeDetectable({debug:h},t,(function(t){if(h&&y.log(u,"onElementDetectable"),d.getState(t)){W.markAsDetectable(t),W.markBusy(t,!1),x.addListener(t,r),a(l,t,i);var e=d.getState(t);if(e&&e.startSize){var f=t.offsetWidth,p=t.offsetHeight;e.startSize.width===f&&e.startSize.height===p||r(t)}E[u]&&o(E[u],(function(t){t()}))}else h&&y.log(u,"Element uninstalled before being detectable.");delete E[u],++s===n.length&&c()})));h&&y.log(u,"Already detecable, adding listener."),a(l,t,i),s++})),s===n.length&&c()},removeListener:H.removeListener,removeAllListeners:H.removeAllListeners,uninstall:function(t){if(!t)return y.error("At least one element is required.");if(v(t))t=[t];else{if(!p(t))return y.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");t=b(t)}o(t,(function(t){H.removeAllListeners(t),x.uninstall(t),d.cleanState(t)}))}}}},function(t,e,n){"use strict";t.exports=function(t){var e=t.stateHandler.getState;return{isDetectable:function(t){var n=e(t);return n&&!!n.isDetectable},markAsDetectable:function(t){e(t).isDetectable=!0},isBusy:function(t){return!!e(t).busy},markBusy:function(t,n){e(t).busy=!!n}}}},function(t,e,n){"use strict";t.exports=function(t){var e={};function n(n){var o=t.get(n);return void 0===o?[]:e[o]||[]}return{get:n,add:function(n,o){var i=t.get(n);e[i]||(e[i]=[]),e[i].push(o)},removeListener:function(t,e){for(var o=n(t),i=0,r=o.length;i<r;++i)if(o[i]===e){o.splice(i,1);break}},removeAllListeners:function(t){var e=n(t);e&&(e.length=0)}}}},function(t,e,n){"use strict";t.exports=function(){var t=1;return{generate:function(){return t++}}}},function(t,e,n){"use strict";t.exports=function(t){var e=t.idGenerator,n=t.stateHandler.getState;return{get:function(t){var e=n(t);return e&&void 0!==e.id?e.id:null},set:function(t){var o=n(t);if(!o)throw new Error("setId required the element to have a resize detection state.");var i=e.generate();return o.id=i,i}}}},function(t,e,n){"use strict";t.exports=function(t){function e(){}var n={log:e,warn:e,error:e};if(!t&&window.console){var o=function(t,e){t[e]=function(){var t=console[e];if(t.apply)t.apply(console,arguments);else for(var n=0;n<arguments.length;n++)t(arguments[n])}};o(n,"log"),o(n,"warn"),o(n,"error")}return n}},function(t,e,n){"use strict";var o=n(10);function i(){var t={},e=0,n=0,o=0;return{add:function(i,r){r||(r=i,i=0),i>n?n=i:i<o&&(o=i),t[i]||(t[i]=[]),t[i].push(r),e++},process:function(){for(var e=o;e<=n;e++)for(var i=t[e],r=0;r<i.length;r++){(0,i[r])()}},size:function(){return e}}}t.exports=function(t){var e=(t=t||{}).reporter,n=o.getOption(t,"async",!0),r=o.getOption(t,"auto",!0);r&&!n&&(e&&e.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."),n=!0);var a,s=i(),l=!1;function c(){for(l=!0;s.size();){var t=s;s=i(),t.process()}l=!1}function h(){var t;t=c,a=setTimeout(t,0)}return{add:function(t,e){!l&&r&&n&&0===s.size()&&h(),s.add(t,e)},force:function(t){l||(void 0===t&&(t=n),a&&(clearTimeout(a),a=null),t?h():c())}}}},function(t,e,n){"use strict";(t.exports={}).getOption=function(t,e,n){var o=t[e];if(null==o&&void 0!==n)return n;return o}},function(t,e,n){"use strict";var o="_erd";function i(t){return t[o]}t.exports={initState:function(t){return t[o]={},i(t)},getState:i,cleanState:function(t){delete t[o]}}},function(t,e,n){"use strict";var o=n(2);t.exports=function(t){var e=(t=t||{}).reporter,n=t.batchProcessor,i=t.stateHandler.getState;if(!e)throw new Error("Missing required dependency: reporter.");function r(t){return i(t).object}return{makeDetectable:function(t,r,a){a||(a=r,r=t,t=null),(t=t||{}).debug,o.isIE(8)?a(r):function(t,r){var a="display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding: 0; margin: 0; opacity: 0; z-index: -1000; pointer-events: none;",s=!1,l=window.getComputedStyle(t),c=t.offsetWidth,h=t.offsetHeight;function d(){function n(){if("static"===l.position){t.style.position="relative";var n=function(t,e,n,o){var i=n[o];"auto"!==i&&"0"!==function(t){return t.replace(/[^-\d\.]/g,"")}(i)&&(t.warn("An element that is positioned static has style."+o+"="+i+" which is ignored due to the static positioning. The element will need to be positioned relative, so the style."+o+" will be set to 0. Element: ",e),e.style[o]=0)};n(e,t,l,"top"),n(e,t,l,"right"),n(e,t,l,"bottom"),n(e,t,l,"left")}}""!==l.position&&(n(),s=!0);var c=document.createElement("object");c.style.cssText=a,c.tabIndex=-1,c.type="text/html",c.setAttribute("aria-hidden","true"),c.onload=function(){s||n(),function t(e,n){e.contentDocument?n(e.contentDocument):setTimeout((function(){t(e,n)}),100)}(this,(function(e){r(t)}))},o.isIE()||(c.data="about:blank"),t.appendChild(c),i(t).object=c,o.isIE()&&(c.data="about:blank")}i(t).startSize={width:c,height:h},n?n.add(d):d()}(r,a)},addListener:function(t,e){if(!r(t))throw new Error("Element is not detectable by this strategy.");function n(){e(t)}o.isIE(8)?(i(t).object={proxy:n},t.attachEvent("onresize",n)):r(t).contentDocument.defaultView.addEventListener("resize",n)},uninstall:function(t){o.isIE(8)?t.detachEvent("onresize",i(t).object.proxy):t.removeChild(r(t)),delete i(t).object}}}},function(t,e,n){"use strict";var o=n(1).forEach;t.exports=function(t){var e=(t=t||{}).reporter,n=t.batchProcessor,i=t.stateHandler.getState,r=(t.stateHandler.hasState,t.idHandler);if(!n)throw new Error("Missing required dependency: batchProcessor");if(!e)throw new Error("Missing required dependency: reporter.");var a=function(){var t=document.createElement("div");t.style.cssText="position: absolute; width: 1000px; height: 1000px; visibility: hidden; margin: 0; padding: 0;";var e=document.createElement("div");e.style.cssText="position: absolute; width: 500px; height: 500px; overflow: scroll; visibility: none; top: -1500px; left: -1500px; visibility: hidden; margin: 0; padding: 0;",e.appendChild(t),document.body.insertBefore(e,document.body.firstChild);var n=500-e.clientWidth,o=500-e.clientHeight;return document.body.removeChild(e),{width:n,height:o}}(),s="erd_scroll_detection_container";function l(t,n,o){if(t.addEventListener)t.addEventListener(n,o);else{if(!t.attachEvent)return e.error("[scroll] Don't know how to add event listeners.");t.attachEvent("on"+n,o)}}function c(t,n,o){if(t.removeEventListener)t.removeEventListener(n,o);else{if(!t.detachEvent)return e.error("[scroll] Don't know how to remove event listeners.");t.detachEvent("on"+n,o)}}function h(t){return i(t).container.childNodes[0].childNodes[0].childNodes[0]}function d(t){return i(t).container.childNodes[0].childNodes[0].childNodes[1]}return function(t,e){if(!document.getElementById(t)){var n=e+"_animation",o="/* Created by the element-resize-detector library. */\n";o+="."+e+" > div::-webkit-scrollbar { display: none; }\n\n",o+="."+(e+"_animation_active")+" { -webkit-animation-duration: 0.1s; animation-duration: 0.1s; -webkit-animation-name: "+n+"; animation-name: "+n+"; }\n",o+="@-webkit-keyframes "+n+" { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n",function(e,n){n=n||function(t){document.head.appendChild(t)};var o=document.createElement("style");o.innerHTML=e,o.id=t,n(o)}(o+="@keyframes "+n+" { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }")}}("erd_scroll_detection_scrollbar_style",s),{makeDetectable:function(t,c,u){function f(){if(t.debug){var n=Array.prototype.slice.call(arguments);if(n.unshift(r.get(c),"Scroll: "),e.log.apply)e.log.apply(null,n);else for(var o=0;o<n.length;o++)e.log(n[o])}}function p(t){var e=i(t).container.childNodes[0],n=window.getComputedStyle(e);return!n.width||-1===n.width.indexOf("px")}function b(){var t=window.getComputedStyle(c),e={};return e.position=t.position,e.width=c.offsetWidth,e.height=c.offsetHeight,e.top=t.top,e.right=t.right,e.bottom=t.bottom,e.left=t.left,e.widthCSS=t.width,e.heightCSS=t.height,e}function v(){if(f("storeStyle invoked."),i(c)){var t=b();i(c).style=t}else f("Aborting because element has been uninstalled")}function m(t,e,n){i(t).lastWidth=e,i(t).lastHeight=n}function g(){return 2*a.width+1}function y(){return 2*a.height+1}function w(t){return t+10+g()}function S(t){return t+10+y()}function x(t,e,n){var o=h(t),i=d(t),r=w(e),a=S(n),s=function(t){return 2*t+g()}(e),l=function(t){return 2*t+y()}(n);o.scrollLeft=r,o.scrollTop=a,i.scrollLeft=s,i.scrollTop=l}function H(){var t=i(c).container;if(!t){(t=document.createElement("div")).className=s,t.style.cssText="visibility: hidden; display: inline; width: 0px; height: 0px; z-index: -1; overflow: hidden; margin: 0; padding: 0;",i(c).container=t,function(t){t.className+=" "+s+"_animation_active"}(t),c.appendChild(t);var e=function(){i(c).onRendered&&i(c).onRendered()};l(t,"animationstart",e),i(c).onAnimationStart=e}return t}function W(){if(f("Injecting elements"),i(c)){!function(){var t=i(c).style;if("static"===t.position){c.style.position="relative";var n=function(t,e,n,o){var i=n[o];"auto"!==i&&"0"!==function(t){return t.replace(/[^-\d\.]/g,"")}(i)&&(t.warn("An element that is positioned static has style."+o+"="+i+" which is ignored due to the static positioning. The element will need to be positioned relative, so the style."+o+" will be set to 0. Element: ",e),e.style[o]=0)};n(e,c,t,"top"),n(e,c,t,"right"),n(e,c,t,"bottom"),n(e,c,t,"left")}}();var t=i(c).container;t||(t=H());var n,o,r,h,d=a.width,u=a.height,p="position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; "+("left: "+(n=(n=-(1+d))?n+"px":"0")+"; top: "+(o=(o=-(1+u))?o+"px":"0")+"; right: "+(h=(h=-d)?h+"px":"0")+"; bottom: "+(r=(r=-u)?r+"px":"0")+";"),b=document.createElement("div"),v=document.createElement("div"),m=document.createElement("div"),g=document.createElement("div"),y=document.createElement("div"),w=document.createElement("div");b.dir="ltr",b.style.cssText="position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; width: 100%; height: 100%; left: 0px; top: 0px;",b.className=s,v.className=s,v.style.cssText=p,m.style.cssText="position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",g.style.cssText="position: absolute; left: 0; top: 0;",y.style.cssText="position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",w.style.cssText="position: absolute; width: 200%; height: 200%;",m.appendChild(g),y.appendChild(w),v.appendChild(m),v.appendChild(y),b.appendChild(v),t.appendChild(b),l(m,"scroll",S),l(y,"scroll",x),i(c).onExpandScroll=S,i(c).onShrinkScroll=x}else f("Aborting because element has been uninstalled");function S(){i(c).onExpand&&i(c).onExpand()}function x(){i(c).onShrink&&i(c).onShrink()}}function T(){function a(t,e,n){var o=function(t){return h(t).childNodes[0]}(t),i=w(e),r=S(n);o.style.width=i+"px",o.style.height=r+"px"}function s(o){var s=c.offsetWidth,h=c.offsetHeight;f("Storing current size",s,h),m(c,s,h),n.add(0,(function(){if(i(c))if(l()){if(t.debug){var n=c.offsetWidth,o=c.offsetHeight;n===s&&o===h||e.warn(r.get(c),"Scroll: Size changed before updating detector elements.")}a(c,s,h)}else f("Aborting because element container has not been initialized");else f("Aborting because element has been uninstalled")})),n.add(1,(function(){i(c)?l()?x(c,s,h):f("Aborting because element container has not been initialized"):f("Aborting because element has been uninstalled")})),o&&n.add(2,(function(){i(c)?l()?o():f("Aborting because element container has not been initialized"):f("Aborting because element has been uninstalled")}))}function l(){return!!i(c).container}function u(){f("notifyListenersIfNeeded invoked");var t=i(c);return void 0===i(c).lastNotifiedWidth&&t.lastWidth===t.startSize.width&&t.lastHeight===t.startSize.height?f("Not notifying: Size is the same as the start size, and there has been no notification yet."):t.lastWidth===t.lastNotifiedWidth&&t.lastHeight===t.lastNotifiedHeight?f("Not notifying: Size already notified"):(f("Current size not notified, notifying..."),t.lastNotifiedWidth=t.lastWidth,t.lastNotifiedHeight=t.lastHeight,void o(i(c).listeners,(function(t){t(c)})))}function b(){if(f("Scroll detected."),p(c))f("Scroll event fired while unrendered. Ignoring...");else{var t=c.offsetWidth,e=c.offsetHeight;t!==i(c).lastWidth||e!==i(c).lastHeight?(f("Element size changed."),s(u)):f("Element size has not changed ("+t+"x"+e+").")}}if(f("registerListenersAndPositionElements invoked."),i(c)){i(c).onRendered=function(){if(f("startanimation triggered."),p(c))f("Ignoring since element is still unrendered...");else{f("Element rendered.");var t=h(c),e=d(c);0!==t.scrollLeft&&0!==t.scrollTop&&0!==e.scrollLeft&&0!==e.scrollTop||(f("Scrollbars out of sync. Updating detector elements..."),s(u))}},i(c).onExpand=b,i(c).onShrink=b;var v=i(c).style;a(c,v.width,v.height)}else f("Aborting because element has been uninstalled")}function k(){if(f("finalizeDomMutation invoked."),i(c)){var t=i(c).style;m(c,t.width,t.height),x(c,t.width,t.height)}else f("Aborting because element has been uninstalled")}function E(){u(c)}function L(){var t;f("Installing..."),i(c).listeners=[],t=b(),i(c).startSize={width:t.width,height:t.height},f("Element start size",i(c).startSize),n.add(0,v),n.add(1,W),n.add(2,T),n.add(3,k),n.add(4,E)}u||(u=c,c=t,t=null),t=t||{},f("Making detectable..."),!function(t){return!function(t){return t===t.ownerDocument.body||t.ownerDocument.body.contains(t)}(t)||null===window.getComputedStyle(t)}(c)?L():(f("Element is detached"),H(),f("Waiting until element is attached..."),i(c).onRendered=function(){f("Element is now attached"),L()})},addListener:function(t,e){if(!i(t).listeners.push)throw new Error("Cannot add listener to an element that is not detectable.");i(t).listeners.push(e)},uninstall:function(t){var e=i(t);e&&(e.onExpandScroll&&c(h(t),"scroll",e.onExpandScroll),e.onShrinkScroll&&c(d(t),"scroll",e.onShrinkScroll),e.onAnimationStart&&c(e.container,"animationstart",e.onAnimationStart),e.container&&t.removeChild(e.container))}}}},function(t,e,n){"use strict";var o=n(0);n.n(o).a},function(t,e,n){(t.exports=n(16)(!1)).push([t.i,".ohyeah-scroll-box {\n  position: relative;\n  overflow: hidden;\n  outline: none;\n}\n.ohyeah-scroll-box .ohyeah-scroll-body {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  outline: none;\n  overflow: auto;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  -webkit-overflow-scrolling: touch;\n}\n.ohyeah-scroll-box .ohyeah-scroll-body.isSmooth {\n  scroll-behavior: smooth;\n}\n.ohyeah-scroll-box .ohyeah-scroll-body::-webkit-scrollbar {\n  display: none;\n}\n.ohyeah-scroll-box.mobile {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.ohyeah-scroll-box:hover > .ohyeah-scroll-vertical-track-h,\n.ohyeah-scroll-box:hover > .ohyeah-scroll-vertical-track-w {\n  opacity: 1 !important;\n}\n.ohyeah-scroll-box .disabled {\n  visibility: hidden;\n  pointer-events: none;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h {\n  position: absolute;\n  box-sizing: border-box;\n  height: 100%;\n  right: 0;\n  top: 0;\n  z-index: 10;\n  padding: 2px;\n  cursor: pointer;\n  transition: opacity 200ms, width 200ms;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h.show {\n  opacity: 1 !important;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h.left {\n  left: 0;\n  right: auto;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h > div {\n  border-radius: 999px;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  bottom: 0;\n  left: 0;\n  z-index: 9;\n  padding: 2px;\n  cursor: pointer;\n  transition: opacity 200ms, height 200ms;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w.show {\n  opacity: 1 !important;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w.top {\n  top: 0;\n  bottom: auto;\n}\n.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w > div {\n  border-radius: 999px;\n}\n",""])},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var i=(a=o,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),r=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot).concat(t," */")}));return[n].concat(r).concat([i]).join("\n")}var a,s,l;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];null!=r&&(o[r]=!0)}for(var a=0;a<t.length;a++){var s=t[a];null!=s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="(".concat(s[2],") and (").concat(n,")")),e.push(s))}},e}},function(t,e,n){"use strict";n.r(e);var o=n(3),i=n.n(o),r=1,a={name:"ohyeah",data:function(){return{isMobile:!1,observer:null,isShowH:!1,isShowW:!1,trickH:0,trickW:0,barHTall:0,barWTall:0,barHScrollTop:0,barWScrollLeft:0,startBarHScrollTop:0,startBarWScrollLeft:0,barHDown:!1,barWDown:!1,startX:0,startY:0,scaleH:0,scaleW:0,hoverH:!1,hoverW:!1,timer:0,reqTimer:null,needSmooth:!0}},props:{id:{type:[String,Number],default:function(){return Date.now()+Math.random()}},noVer:{type:Boolean,default:!1},noHor:{type:Boolean,default:!1},left:{type:Boolean,default:!1},top:{type:Boolean,default:!1},breadth:{type:Number,default:6},trackColor:{type:String,default:"transparent"},thumbColor:{type:String,default:"#7f7f7f"},autoHide:{type:Boolean,default:!0},minLength:{type:Number,default:20},width:{type:[Number,String],default:"100%"},height:{type:[Number,String],default:"100%"},resizeObject:{type:Boolean,default:!1}},mounted:function(){this.isMobile=/(android)|(iphone)|(symbianos)|(windows phone)|(ipad)|(ipod)/.test(navigator.userAgent.toLowerCase()),this.callback(),this.listenResize(),document.addEventListener("mousemove",this.onBarDragMove,!1),document.addEventListener("mouseup",this.onMouseUp,!1)},beforeDestroy:function(){document.removeEventListener("mousemove",this.onBarDragMove,!1),document.removeEventListener("mouseup",this.onMouseUp,!1),window.ResizeObserver?this.observer.disconnect():this.observer.uninstall(this.$refs["ohyeahbody-".concat(this.id)]),this.observer=null},computed:{realShowH:function(){return this.isShowH&&!this.noVer},realShowW:function(){return this.isShowW&&!this.noHor},theWidth:function(){return Number(this.width)?"".concat(this.width,"px"):this.width},theHeight:function(){return Number(this.height)?"".concat(this.height,"px"):this.height}},watch:{noVer:function(t){if(t){var e=this.$refs["ohyeahbody-".concat(this.id)];this.barHScrollTop=0,this.scaleH=0,e.scrollTop=0}else this.callback()},noHor:function(t){if(t){var e=this.$refs["ohyeahbody-".concat(this.id)];this.barWScrollLeft=0,this.scaleW=0,e.scrollLeft=0}else this.callback()},barHScrollTop:function(t){if(!(t<0||t>this.trickH-this.barHTall)){var e=this.$refs["ohyeahbody-".concat(this.id)],n={offsetHeight:e.offsetHeight,offsetWidth:e.offsetWidth,clientHeight:e.clientHeight,clientWidth:e.clientWidth,scrollHeight:e.scrollHeight,scrollWidth:e.scrollWidth,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft};r?0===t?(r=!1,this.$emit("onVerStart",n,e)):t===this.trickH-this.barHTall&&(this.$emit("onVerEnd",n,e),r=!1):r=!0,this.$emit("onScroll",n,e)}},barWScrollLeft:function(t){if(!(t<0||t>this.trickW-this.barWTall)){var e=this.$refs["ohyeahbody-".concat(this.id)],n={offsetHeight:e.offsetHeight,offsetWidth:e.offsetWidth,clientHeight:e.clientHeight,clientWidth:e.clientWidth,scrollHeight:e.scrollHeight,scrollWidth:e.scrollWidth,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft};r?0===t?(r=!1,this.$emit("onHorStart",n,e)):t===this.trickW-this.barWTall&&(r=!1,this.$emit("onHorEnd",n,e)):r=!0,this.$emit("onScroll",n,e)}}},methods:{onScrollEvent:function(){var t=this.$refs["ohyeahbody-".concat(this.id)];this.realShowH&&(this.barHScrollTop=t.scrollTop/this.scaleH),this.realShowW&&(this.barWScrollLeft=t.scrollLeft/this.scaleW)},listenResize:function(){window.ResizeObserver?(this.observer=new ResizeObserver(this.callback),this.observer.observe(this.$refs["ohyeahbody-".concat(this.id)]),this.observer.observe(this.$refs["ohyeahbodylistener-".concat(this.id)])):(this.observer=i()(this.resizeObject?null:{strategy:"scroll"}),this.observer.listenTo(this.$refs["ohyeahbody-".concat(this.id)],this.callback),this.observer.listenTo(this.$refs["ohyeahbodylistener-".concat(this.id)],this.callback))},callback:function(){var t=this.$refs["ohyeahbody-".concat(this.id)],e=t.getBoundingClientRect();this.trickH=e.height-4,this.trickW=e.width-4,this.isShowH=t.scrollHeight>t.clientHeight,this.isShowW=t.scrollWidth>t.clientWidth,this.realShowH?(this.barHTall=Math.max(t.clientHeight/t.scrollHeight*this.trickH,this.minLength>t.clientHeight?0:this.minLength),this.scaleH=(t.scrollHeight-t.clientHeight)/(this.trickH-this.barHTall),this.barHScrollTop=Math.min(Math.max(t.scrollTop/this.scaleH,0),this.trickH-this.barHTall)):(this.scaleH=0,t.scrollTop=0),this.realShowW?(this.barWTall=Math.max(t.clientWidth/t.scrollWidth*this.trickW,this.minLength>t.clientWidth?0:this.minLength),this.scaleW=(t.scrollWidth-t.clientWidth)/(this.trickW-this.barWTall),this.barWScrollLeft=Math.min(Math.max(t.scrollLeft/this.scaleW,0),this.trickW-this.barWTall),t.scrollLeft=this.barWScrollLeft*this.scaleW):(this.scaleW=0,t.scrollLeft=0)},onBarMousedown:function(t,e,n){t.preventDefault(),this.needSmooth=!1,this.barHDown=1===e,this.barWDown=2===e,this.startX=t.clientX,this.startY=t.clientY,this.startBarHScrollTop=this.barHDown&&Number.isFinite(n)?n:this.barHScrollTop,this.startBarWScrollLeft=this.barWDown&&Number.isFinite(n)?n:this.barWScrollLeft},onTrackMousedown:function(t,e){var n=this;t.preventDefault(),this.needSmooth=!1;var o,i=this.$refs["ohyeahbody-".concat(this.id)];this.$nextTick((function(){var r;1===e&&(r=(o=n.barHScrollTop>=t.offsetY?Math.max(t.offsetY-6,0):Math.min(t.offsetY-n.barHTall+2,n.trickH-n.barHTall))*n.scaleH,cancelAnimationFrame(n.reqTimer),n.smoothScrollTo("scrollTop",i,r,(r-i.scrollTop)/15)),2===e&&(r=(o=n.barWScrollLeft>=t.offsetX?Math.max(t.offsetX-6,0):Math.min(t.offsetX-n.barWTall+2,n.trickW-n.barWTall))*n.scaleW,cancelAnimationFrame(n.reqTimer),n.smoothScrollTo("scrollLeft",i,r,(r-i.scrollLeft)/15)),n.onBarMousedown(t,e,o)}))},onBarDragMove:function(t){var e=this,n=this.$refs["ohyeahbody-".concat(this.id)];this.barHDown?this.timer||(cancelAnimationFrame(this.reqTimer),requestAnimationFrame((function(){var o=Math.min(Math.max(e.startBarHScrollTop+t.clientY-e.startY,0),e.trickH-e.barHTall);n.scrollTop=o*e.scaleH,e.timer=0})),this.timer=1):this.barWDown&&(this.timer||(cancelAnimationFrame(this.reqTimer),requestAnimationFrame((function(){var o=Math.min(Math.max(e.startBarWScrollLeft+t.clientX-e.startX,0),e.trickW-e.barWTall);n.scrollLeft=o*e.scaleW,e.timer=0})),this.timer=1))},onMouseUp:function(){this.barHDown=this.barWDown=!1,this.needSmooth=!0},smoothScrollTo:function(t,e,n,o){var i=this;this.reqTimer=requestAnimationFrame((function(){(o<0&&e[t]>n||o>0&&e[t]<n)&&(e[t]=e[t]+o,Math.abs(n-e[t])<Math.abs(o)?i.smoothScrollTo(t,e,n,Math.abs(n-e[t])*(o<0?-1:1)):i.smoothScrollTo(t,e,n,o))}))},scrollTo:function(t,e,n){var o=this,i=this.$refs["ohyeahbody-".concat(this.id)],r="end"===e?i.scrollHeight-i.clientHeight:e&&this.scaleH>0?e:0,a="end"===t?i.scrollWidth-i.clientWidth:t&&this.scaleW>0?t:0;this.needSmooth=!!n,this.$nextTick((function(){o.realShowH&&(e||0===e)&&(i.scrollTop=r),o.realShowW&&(t||0===t)&&(i.scrollLeft=a)}))},getScrollInfo:function(){var t=this.$refs["ohyeahbody-".concat(this.id)];return{height:t.clientHeight,width:t.clientWidth,clientHeight:t.clientHeight,clientWidth:t.clientWidth,offsetHeight:t.offsetHeight,offsetWidth:t.offsetWidth,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft,scrollHeight:t.scrollHeight,scrollWidth:t.scrollWidth}}}};n(14);var s=function(t,e,n,o,i,r,a,s){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=l):i&&(l=s?function(){i.call(this,this.$root.$options.shadowRoot)}:i),l)if(c.functional){c._injectStyles=l;var h=c.render;c.render=function(t,e){return l.call(e),h(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"ohyeahbox-"+t.id,staticClass:"ohyeah-scroll-box",style:"width:"+t.theWidth+";height:"+t.theHeight},[t.noVer?t._e():n("div",{class:["ohyeah-scroll-vertical-track-h",{disabled:!t.isShowH},{show:t.barHDown},{left:t.left}],style:"background-color:"+t.trackColor+";opacity:"+(t.autoHide?0:.8),on:{mousedown:function(e){return e.stopPropagation(),t.onTrackMousedown(e,1)},mouseenter:function(e){e.stopPropagation(),t.hoverH=!0},mouseleave:function(e){e.stopPropagation(),t.hoverH=!1}}},[n("div",{ref:"ohyeahbarh-"+t.id,style:"transition:width 250ms,height 250ms;background-color:"+t.thumbColor+";width:"+(t.hoverH||t.barHDown?t.breadth+4:t.breadth)+"px;height: "+t.barHTall+"px;transform: translateY("+t.barHScrollTop+"px);border-radius:"+t.breadth+"px",on:{mousedown:function(e){return e.stopPropagation(),t.onBarMousedown(e,1)}}})]),t._v(" "),t.noHor?t._e():n("div",{class:["ohyeah-scroll-vertical-track-w",{disabled:!t.isShowW},{show:t.barWDown},{top:t.top}],style:"background-color:"+t.trackColor+";opacity:"+(t.autoHide?0:.8),on:{mousedown:function(e){return e.stopPropagation(),t.onTrackMousedown(e,2)},mouseenter:function(e){e.stopPropagation(),t.hoverW=!0},mouseleave:function(e){e.stopPropagation(),t.hoverW=!1}}},[n("div",{ref:"ohyeahbarw-"+t.id,style:"transition:height 250ms,width 250ms;background-color:"+t.thumbColor+";height:"+(t.hoverW||t.barWDown?t.breadth+4:t.breadth)+"px;width: "+t.barWTall+"px;transform: translateX("+t.barWScrollLeft+"px)",on:{mousedown:function(e){return e.stopPropagation(),t.onBarMousedown(e,2)}}})]),t._v(" "),n("div",{ref:"ohyeahbody-"+t.id,class:["ohyeah-scroll-body",{isSmooth:t.needSmooth}],style:(t.noVer?"height:100%;overflow-y:hidden;":"")+" "+(t.noHor?"width:100%;overflow-x:hidden;":""),on:{scroll:t.onScrollEvent}},[n("div",{ref:"ohyeahbodylistener-"+t.id},[t._t("default")],2)])])}),[],!1,null,null,null).exports;s.install=function(t){return t.component(s.name,s)};var l=s;n.d(e,"Ohyeah",(function(){return l}));var c=[l],h=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];c.map((function(e){t.component(e.name,e)}))};"undefined"!=typeof window&&window.Vue&&h(window.Vue);e.default={install:h}},function(t,e,n){"use strict";function o(t,e){for(var n=[],o={},i=0;i<e.length;i++){var r=e[i],a=r[0],s={id:t+":"+i,css:r[1],media:r[2],sourceMap:r[3]};o[a]?o[a].parts.push(s):n.push(o[a]={id:a,parts:[s]})}return n}n.r(e),n.d(e,"default",(function(){return p}));var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},a=i&&(document.head||document.getElementsByTagName("head")[0]),s=null,l=0,c=!1,h=function(){},d=null,u="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,n,i){c=n,d=i||{};var a=o(t,e);return b(a),function(e){for(var n=[],i=0;i<a.length;i++){var s=a[i];(l=r[s.id]).refs--,n.push(l)}e?b(a=o(t,e)):a=[];for(i=0;i<n.length;i++){var l;if(0===(l=n[i]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete r[l.id]}}}}function b(t){for(var e=0;e<t.length;e++){var n=t[e],o=r[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(m(n.parts[i]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(m(n.parts[i]));r[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,n,o=document.querySelector("style["+u+'~="'+t.id+'"]');if(o){if(c)return h;o.parentNode.removeChild(o)}if(f){var i=l++;o=s||(s=v()),e=w.bind(null,o,i,!1),n=w.bind(null,o,i,!0)}else o=v(),e=S.bind(null,o),n=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else n()}}var g,y=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function w(t,e,n,o){var i=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var r=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function S(t,e){var n=e.css,o=e.media,i=e.sourceMap;if(o&&t.setAttribute("media",o),d.ssrId&&t.setAttribute(u,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}}])}));