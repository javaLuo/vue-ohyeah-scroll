!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("ohyeah",[],e):"object"==typeof exports?exports.ohyeah=e():t.ohyeah=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=3)}([function(t,e,n){"use strict";var o=n(12),i=n.n(o);e.a={name:"ohyeah",data:function(){return{isMobile:/(android)|(iphone)|(symbianos)|(windows phone)|(ipad)|(ipod)/.test(navigator.userAgent.toLowerCase()),observer:null,isShowH:!1,isShowW:!1,bodyH:0,bodyW:0,trickH:0,trickW:0,barHTall:0,barWTall:0,barHScrollTop:0,barWScrollLeft:0,startBarHScrollTop:0,startBarWScrollLeft:0,barHDown:!1,barWDown:!1,startX:0,startY:0,scaleH:0,scaleW:0,hoverH:!1,hoverW:!1,timer:null,transSpeed:250,slow:navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0?1:5}},props:{noVer:{type:Boolean,default:!1},noHor:{type:Boolean,default:!1},left:{type:Boolean,default:!1},top:{type:Boolean,default:!1},breadth:{type:Number,default:6},trackColor:{type:String,default:"transparent"},thumbColor:{type:String,default:"#7f7f7f"},autoHide:{type:Boolean,default:!0},minLength:{type:Number,default:20}},mounted:function(){this.isMobile||(this.callback(),this.listenResize(),document.addEventListener("mousemove",this.onBarDragMove),document.addEventListener("mouseup",this.onMouseUp))},beforeDestroy:function(){this.isMobile||(document.removeEventListener("mousemove",this.onBarDragMove),window.ResizeObserver?this.observer.disconnect():this.observer.uninstall(),this.observer=null)},computed:{realShowH:function(){return this.isShowH&&!this.noVer},realShowW:function(){return this.isShowW&&!this.noHor}},watch:{noVer:function(t){t?(this.barHScrollTop=0,this.scaleH=0):this.callback()},noHor:function(t){t?(this.barWScrollLeft=0,this.scaleW=0):this.callback()},barHScrollTop:function(t){var e={offsetHeight:this.bodyH,offsetWidth:this.bodyW,height:this.trickH+4,width:this.trickW+4,scrollTop:t*this.scaleH,scrollLeft:this.barWScrollLeft*this.scaleW};t<=0?this.$emit("onVerStart",e):t>=this.trickH-this.barHTall&&this.$emit("onVerEnd",e),this.$emit("onScroll",e)},barWScrollLeft:function(t){var e={offsetHeight:this.bodyH,offsetWidth:this.bodyW,height:this.trickH+4,width:this.trickW+4,scrollTop:this.barHScrollTop*this.scaleH,scrollLeft:t*this.scaleW};t<=0?this.$emit("onHorStart",e):t>=this.trickW-this.barWTall&&this.$emit("onHorEnd",e),this.$emit("onScroll",e)}},methods:{listenResize:function(){window.ResizeObserver?(this.observer=new ResizeObserver(this.callback),this.observer.observe(this.$refs.ohyeahbody),this.observer.observe(this.$refs.ohyeahbox)):(this.observer=i()({strategy:"scroll"}),this.observer.listenTo(this.$refs.ohyeahbody,this.callback),this.observer.listenTo(this.$refs.ohyeahbox,this.callback))},callback:function(){var t=this.$refs.ohyeahbox.getBoundingClientRect(),e=this.$refs.ohyeahbody.getBoundingClientRect();if(this.bodyH=e.height,this.bodyW=e.width,this.trickH=t.height-4,this.trickW=t.width-4,this.isShowH=e.height>t.height,this.isShowW=e.width>t.width,this.realShowH){var n=this.barHScrollTop*this.scaleH;this.barHTall=Math.max(t.height/e.height*this.trickH,this.minLength>t.height?0:this.minLength),this.scaleH=(e.height-t.height)/(this.trickH-this.barHTall),this.barHScrollTop=Math.min(Math.max(n/this.scaleH,0),this.trickH-this.barHTall)}else this.barHScrollTop=0,this.scaleH=0;if(this.realShowW){var o=this.barWScrollLeft*this.scaleW;this.barWTall=Math.max(t.width/e.width*this.trickW,this.minLength>t.width?0:this.minLength),this.scaleW=(e.width-t.width)/(this.trickW-this.barWTall),this.barWScrollLeft=Math.min(Math.max(o/this.scaleW,0),this.trickW-this.barWTall)}else this.barWScrollLeft=0,this.scaleW=0},onBarMousedown:function(t,e){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.barHDown=1===e,this.barWDown=2===e,this.startX=t.clientX,this.startY=t.clientY,this.startBarHScrollTop=this.barHScrollTop,this.startBarWScrollLeft=this.barWScrollLeft},onTrackMousedown:function(t,e){var n=this;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.barHDown=1===e,this.barWDown=2===e,this.transSpeed=250,this.$nextTick(function(){n.barHDown&&(n.barHScrollTop>=t.offsetY?n.barHScrollTop=Math.max(t.offsetY-6,0):n.barHScrollTop=Math.min(t.offsetY-n.barHTall+2,n.trickH-n.barHTall)),n.barWDown&&(n.barWScrollLeft>=t.offsetX?n.barWScrollLeft=Math.max(t.offsetX-6,0):n.barWScrollLeft=Math.min(t.offsetX-n.barWTall+2,n.trickW-n.barWTall)),n.onBarMousedown(t,e)})},onBarDragMove:function(t){this.barHDown?(this.transSpeed=0,this.barHScrollTop=Math.min(Math.max(this.startBarHScrollTop+t.clientY-this.startY,0),this.trickH-this.barHTall)):this.barWDown&&(this.transSpeed=0,this.barWScrollLeft=Math.min(Math.max(this.startBarWScrollLeft+t.clientX-this.startX,0),this.trickW-this.barWTall))},onMouseUp:function(){this.barHDown=this.barWDown=!1},onMouseWheel:function(t){var e=this;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),this.timer||(this.timer=setTimeout(function(){e.transSpeed=0,e.realShowH&&(e.barHScrollTop=Math.min(Math.max(e.barHScrollTop+t.deltaY/e.slow,0),e.trickH-e.barHTall)),e.realShowW&&(e.barWScrollLeft=Math.min(Math.max(e.barWScrollLeft+t.deltaX/e.slow,0),e.trickW-e.barWTall)),e.timer=null}))},scrollTo:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o="end"===e?this.trickH-this.barHTall:e&&this.scaleH>0?e/this.scaleH:0,i="end"===t?this.trickW-this.barWTall:t&&this.scaleW>0?t/this.scaleW:0;this.transSpeed=n,this.realShowH&&(this.barHScrollTop=Math.min(Math.max(o,0),this.trickH-this.barHTall)),this.realShowW&&(this.barWScrollLeft=Math.min(Math.max(i,0),this.trickW-this.barWTall))},getScrollInfo:function(){return{offsetHeight:this.bodyH,offsetWidth:this.bodyW,height:this.trickH+4,width:this.trickW+4,scrollTop:this.barHScrollTop*this.scaleH,scrollLeft:this.barWScrollLeft*this.scaleW}}}}},function(t,e,n){"use strict";(t.exports={}).forEach=function(t,e){for(var n=0;n<t.length;n++){var o=e(t[n]);if(o)return o}}},function(t,e,n){"use strict";var o=t.exports={};o.isIE=function(t){return!!function(){var t=navigator.userAgent.toLowerCase();return-1!==t.indexOf("msie")||-1!==t.indexOf("trident")||-1!==t.indexOf(" edge/")}()&&(!t||t===function(){var t=3,e=document.createElement("div"),n=e.getElementsByTagName("i");do{e.innerHTML="\x3c!--[if gt IE "+ ++t+"]><i></i><![endif]--\x3e"}while(n[0]);return t>4?t:void 0}())},o.isLegacyOpera=function(){return!!window.opera}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4);n.d(e,"Ohyeah",function(){return o.a});var i=[o.a],r=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];i.map(function(e){t.component(e.name,e)})};"undefined"!=typeof window&&window.Vue&&r(window.Vue),e.default={install:r}},function(t,e,n){"use strict";var o=n(5);o.a.install=function(t){return t.component(o.a.name,o.a)},e.a=o.a},function(t,e,n){"use strict";function o(t){n(6)}var i=n(0),r=n(23),a=n(11),s=o,l=a(i.a,r.a,!1,s,null,null);e.a=l.exports},function(t,e,n){var o=n(7);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(9)("207bc19c",o,!0,{})},function(t,e,n){e=t.exports=n(8)(!1),e.push([t.i,".ohyeah-scroll-box{position:relative;overflow:hidden;width:100%;height:100%}.ohyeah-scroll-box.mobile{overflow:auto;-webkit-overflow-scrolling:touch}.ohyeah-scroll-box:hover>.ohyeah-scroll-vertical-track-h,.ohyeah-scroll-box:hover>.ohyeah-scroll-vertical-track-w{opacity:1!important}.ohyeah-scroll-box.transition>.ohyeah-scroll-body,.ohyeah-scroll-box.transition>.ohyeah-scroll-vertical-track-h>div,.ohyeah-scroll-box.transition>.ohyeah-scroll-vertical-track-w>div{transition:transform .25s}.ohyeah-scroll-box .disabled{visibility:hidden;pointer-events:none}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h{position:absolute;box-sizing:border-box;height:100%;padding:2px;right:0;top:0;z-index:10;cursor:pointer;transition:opacity .2s,width .2s}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h.show{opacity:1!important}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h.left{left:0;right:auto}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-h>div{border-radius:999px}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w{position:absolute;box-sizing:border-box;width:100%;padding:2px;bottom:0;left:0;z-index:9;cursor:pointer;transition:opacity .2s,height .2s}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w.show{opacity:1!important}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w.top{top:0;bottom:auto}.ohyeah-scroll-box .ohyeah-scroll-vertical-track-w>div{border-radius:999px}.ohyeah-scroll-box .ohyeah-scroll-body{position:absolute;top:0;left:0;min-height:100%;min-width:100%}",""])},function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var r=o(i);return[n].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([r]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t){for(var e=0;e<t.length;e++){var n=t[e],o=h[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(r(n.parts[i]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(r(n.parts[i]));h[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",d.appendChild(t),t}function r(t){var e,n,o=document.querySelector("style["+g+'~="'+t.id+'"]');if(o){if(p)return b;o.parentNode.removeChild(o)}if(m){var r=f++;o=u||(u=i()),e=a.bind(null,o,r,!1),n=a.bind(null,o,r,!0)}else o=i(),e=s.bind(null,o),n=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else n()}}function a(t,e,n,o){var i=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var r=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function s(t,e){var n=e.css,o=e.media,i=e.sourceMap;if(o&&t.setAttribute("media",o),v.ssrId&&t.setAttribute(g,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!l)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(10),h={},d=l&&(document.head||document.getElementsByTagName("head")[0]),u=null,f=0,p=!1,b=function(){},v=null,g="data-vue-ssr-id",m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n,i){p=n,v=i||{};var r=c(t,e);return o(r),function(e){for(var n=[],i=0;i<r.length;i++){var a=r[i],s=h[a.id];s.refs--,n.push(s)}e?(r=c(t,e),o(r)):r=[];for(var i=0;i<n.length;i++){var s=n[i];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete h[s.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],o={},i=0;i<e.length;i++){var r=e[i],a=r[0],s=r[1],l=r[2],c=r[3],h={id:t+":"+i,css:s,media:l,sourceMap:c};o[a]?o[a].parts.push(h):n.push(o[a]={id:a,parts:[h]})}return n}},function(t,e){t.exports=function(t,e,n,o,i,r){var a,s=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(a=t,s=t.default);var c="function"==typeof s?s.options:s;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),i&&(c._scopeId=i);var h;if(r?(h=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=h):o&&(h=o),h){var d=c.functional,u=d?c.render:c.beforeCreate;d?(c._injectStyles=h,c.render=function(t,e){return h.call(e),u(t,e)}):c.beforeCreate=u?[].concat(u,h):[h]}return{esModule:a,exports:s,options:c}}},function(t,e,n){"use strict";function o(t){return Array.isArray(t)||void 0!==t.length}function i(t){if(Array.isArray(t))return t;var e=[];return s(t,function(t){e.push(t)}),e}function r(t){return t&&1===t.nodeType}function a(t,e,n){var o=t[e];return void 0!==o&&null!==o||void 0===n?o:n}var s=n(1).forEach,l=n(13),c=n(14),h=n(15),d=n(16),u=n(17),f=n(2),p=n(18),b=n(20),v=n(21),g=n(22);t.exports=function(t){function e(t,e,n){function l(t){var e=k.get(t);s(e,function(e){e(t)})}function c(t,e,n){k.add(e,n),t&&n(e)}if(n||(n=e,e=t,t={}),!e)throw new Error("At least one element required.");if(!n)throw new Error("Listener required.");if(r(e))e=[e];else{if(!o(e))return x.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");e=i(e)}var h=0,d=a(t,"callOnAdd",H.callOnAdd),u=a(t,"onReady",function(){}),f=a(t,"debug",H.debug);s(e,function(t){b.getState(t)||(b.initState(t),m.set(t));var o=m.get(t);if(f&&x.log("Attaching listener to element",o,t),!T.isDetectable(t))return f&&x.log(o,"Not detectable."),T.isBusy(t)?(f&&x.log(o,"System busy making it detectable"),c(d,t,n),M[o]=M[o]||[],void M[o].push(function(){++h===e.length&&u()})):(f&&x.log(o,"Making detectable..."),T.markBusy(t,!0),W.makeDetectable({debug:f},t,function(t){if(f&&x.log(o,"onElementDetectable"),b.getState(t)){T.markAsDetectable(t),T.markBusy(t,!1),W.addListener(t,l),c(d,t,n);var i=b.getState(t);if(i&&i.startSize){var r=t.offsetWidth,a=t.offsetHeight;i.startSize.width===r&&i.startSize.height===a||l(t)}M[o]&&s(M[o],function(t){t()})}else f&&x.log(o,"Element uninstalled before being detectable.");delete M[o],++h===e.length&&u()}));f&&x.log(o,"Already detecable, adding listener."),c(d,t,n),h++}),h===e.length&&u()}function n(t){if(!t)return x.error("At least one element is required.");if(r(t))t=[t];else{if(!o(t))return x.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");t=i(t)}s(t,function(t){k.removeAllListeners(t),W.uninstall(t),b.cleanState(t)})}t=t||{};var m;if(t.idHandler)m={get:function(e){return t.idHandler.get(e,!0)},set:t.idHandler.set};else{var y=h(),w=d({idGenerator:y,stateHandler:b});m=w}var x=t.reporter;if(!x){x=u(!1===x)}var S=a(t,"batchProcessor",p({reporter:x})),H={};H.callOnAdd=!!a(t,"callOnAdd",!0),H.debug=!!a(t,"debug",!1);var W,k=c(m),T=l({stateHandler:b}),E=a(t,"strategy","object"),L={reporter:x,batchProcessor:S,stateHandler:b,idHandler:m};if("scroll"===E&&(f.isLegacyOpera()?(x.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."),E="object"):f.isIE(9)&&(x.warn("Scroll strategy is not supported on IE9. Changing to object strategy."),E="object")),"scroll"===E)W=g(L);else{if("object"!==E)throw new Error("Invalid strategy name: "+E);W=v(L)}var M={};return{listenTo:e,removeListener:k.removeListener,removeAllListeners:k.removeAllListeners,uninstall:n}}},function(t,e,n){"use strict";t.exports=function(t){function e(t){var e=r(t);return e&&!!e.isDetectable}function n(t){r(t).isDetectable=!0}function o(t){return!!r(t).busy}function i(t,e){r(t).busy=!!e}var r=t.stateHandler.getState;return{isDetectable:e,markAsDetectable:n,isBusy:o,markBusy:i}}},function(t,e,n){"use strict";t.exports=function(t){function e(e){var n=t.get(e);return void 0===n?[]:r[n]||[]}function n(e,n){var o=t.get(e);r[o]||(r[o]=[]),r[o].push(n)}function o(t,n){for(var o=e(t),i=0,r=o.length;i<r;++i)if(o[i]===n){o.splice(i,1);break}}function i(t){var n=e(t);n&&(n.length=0)}var r={};return{get:e,add:n,removeListener:o,removeAllListeners:i}}},function(t,e,n){"use strict";t.exports=function(){function t(){return e++}var e=1;return{generate:t}}},function(t,e,n){"use strict";t.exports=function(t){function e(t){var e=i(t);return e&&void 0!==e.id?e.id:null}function n(t){var e=i(t);if(!e)throw new Error("setId required the element to have a resize detection state.");var n=o.generate();return e.id=n,n}var o=t.idGenerator,i=t.stateHandler.getState;return{get:e,set:n}}},function(t,e,n){"use strict";t.exports=function(t){function e(){}var n={log:e,warn:e,error:e};if(!t&&window.console){var o=function(t,e){t[e]=function(){var t=console[e];if(t.apply)t.apply(console,arguments);else for(var n=0;n<arguments.length;n++)t(arguments[n])}};o(n,"log"),o(n,"warn"),o(n,"error")}return n}},function(t,e,n){"use strict";function o(){function t(t,e){e||(e=t,t=0),t>r?r=t:t<a&&(a=t),o[t]||(o[t]=[]),o[t].push(e),i++}function e(){for(var t=a;t<=r;t++)for(var e=o[t],n=0;n<e.length;n++){var i=e[n];i()}}function n(){return i}var o={},i=0,r=0,a=0;return{add:t,process:e,size:n}}var i=n(19);t.exports=function(t){function e(t,e){!p&&d&&h&&0===f.size()&&a(),f.add(t,e)}function n(){for(p=!0;f.size();){var t=f;f=o(),t.process()}p=!1}function r(t){p||(void 0===t&&(t=h),u&&(s(u),u=null),t?a():n())}function a(){u=l(n)}function s(t){return clearTimeout(t)}function l(t){return function(t){return setTimeout(t,0)}(t)}t=t||{};var c=t.reporter,h=i.getOption(t,"async",!0),d=i.getOption(t,"auto",!0);d&&!h&&(c&&c.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."),h=!0);var u,f=o(),p=!1;return{add:e,force:r}}},function(t,e,n){"use strict";function o(t,e,n){var o=t[e];return void 0!==o&&null!==o||void 0===n?o:n}(t.exports={}).getOption=o},function(t,e,n){"use strict";function o(t){return t[a]={},i(t)}function i(t){return t[a]}function r(t){delete t[a]}var a="_erd";t.exports={initState:o,getState:i,cleanState:r}},function(t,e,n){"use strict";var o=n(2);t.exports=function(t){function e(t,e){function n(){e(t)}if(!i(t))throw new Error("Element is not detectable by this strategy.");if(o.isIE(8))l(t).object={proxy:n},t.attachEvent("onresize",n);else{i(t).contentDocument.defaultView.addEventListener("resize",n)}}function n(t,e,n){n||(n=e,e=t,t=null),t=t||{};t.debug;o.isIE(8)?n(e):function(t,e){function n(){function n(){if("static"===c.position){t.style.position="relative";var e=function(t,e,n,o){var i=n[o];"auto"!==i&&"0"!==function(t){return t.replace(/[^-\d\.]/g,"")}(i)&&(t.warn("An element that is positioned static has style."+o+"="+i+" which is ignored due to the static positioning. The element will need to be positioned relative, so the style."+o+" will be set to 0. Element: ",e),e.style[o]=0)};e(a,t,c,"top"),e(a,t,c,"right"),e(a,t,c,"bottom"),e(a,t,c,"left")}}function s(){function o(t,e){if(!t.contentDocument)return void setTimeout(function(){o(t,e)},100);e(t.contentDocument)}r||n(),o(this,function(n){e(t)})}""!==c.position&&(n(c),r=!0);var h=document.createElement("object");h.style.cssText=i,h.tabIndex=-1,h.type="text/html",h.setAttribute("aria-hidden","true"),h.onload=s,o.isIE()||(h.data="about:blank"),t.appendChild(h),l(t).object=h,o.isIE()&&(h.data="about:blank")}var i="display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; padding: 0; margin: 0; opacity: 0; z-index: -1000; pointer-events: none;",r=!1,c=window.getComputedStyle(t),h=t.offsetWidth,d=t.offsetHeight;l(t).startSize={width:h,height:d},s?s.add(n):n()}(e,n)}function i(t){return l(t).object}function r(t){o.isIE(8)?t.detachEvent("onresize",l(t).object.proxy):t.removeChild(i(t)),delete l(t).object}t=t||{};var a=t.reporter,s=t.batchProcessor,l=t.stateHandler.getState;if(!a)throw new Error("Missing required dependency: reporter.");return{makeDetectable:n,addListener:e,uninstall:r}}},function(t,e,n){"use strict";var o=n(1).forEach;t.exports=function(t){function e(t){t.className+=" "+b+"_animation_active"}function n(t,e,n){if(t.addEventListener)t.addEventListener(e,n);else{if(!t.attachEvent)return h.error("[scroll] Don't know how to add event listeners.");t.attachEvent("on"+e,n)}}function i(t,e,n){if(t.removeEventListener)t.removeEventListener(e,n);else{if(!t.detachEvent)return h.error("[scroll] Don't know how to remove event listeners.");t.detachEvent("on"+e,n)}}function r(t){return u(t).container.childNodes[0].childNodes[0].childNodes[0]}function a(t){return u(t).container.childNodes[0].childNodes[0].childNodes[1]}function s(t,e){if(!u(t).listeners.push)throw new Error("Cannot add listener to an element that is not detectable.");u(t).listeners.push(e)}function l(t,i,s){function l(){if(t.debug){var e=Array.prototype.slice.call(arguments);if(e.unshift(f.get(i),"Scroll: "),h.log.apply)h.log.apply(null,e);else for(var n=0;n<e.length;n++)h.log(e[n])}}function c(t){var e=u(t).container.childNodes[0],n=window.getComputedStyle(e);return!n.width||-1===n.width.indexOf("px")}function v(){var t=window.getComputedStyle(i),e={};return e.position=t.position,e.width=i.offsetWidth,e.height=i.offsetHeight,e.top=t.top,e.right=t.right,e.bottom=t.bottom,e.left=t.left,e.widthCSS=t.width,e.heightCSS=t.height,e}function g(){var t=v();u(i).startSize={width:t.width,height:t.height},l("Element start size",u(i).startSize)}function m(){u(i).listeners=[]}function y(){if(l("storeStyle invoked."),!u(i))return void l("Aborting because element has been uninstalled");var t=v();u(i).style=t}function w(t,e,n){u(t).lastWidth=e,u(t).lastHeight=n}function x(t){return r(t).childNodes[0]}function S(){return 2*p.width+1}function H(){return 2*p.height+1}function W(t){return t+10+S()}function k(t){return t+10+H()}function T(t){return 2*t+S()}function E(t){return 2*t+H()}function L(t,e,n){var o=r(t),i=a(t),s=W(e),l=k(n),c=T(e),h=E(n);o.scrollLeft=s,o.scrollTop=l,i.scrollLeft=c,i.scrollTop=h}function M(){var t=u(i).container;if(!t){t=document.createElement("div"),t.className=b,t.style.cssText="visibility: hidden; display: inline; width: 0px; height: 0px; z-index: -1; overflow: hidden; margin: 0; padding: 0;",u(i).container=t,e(t),i.appendChild(t);var o=function(){u(i).onRendered&&u(i).onRendered()};n(t,"animationstart",o),u(i).onAnimationStart=o}return t}function C(){function t(){u(i).onExpand&&u(i).onExpand()}function e(){u(i).onShrink&&u(i).onShrink()}if(l("Injecting elements"),!u(i))return void l("Aborting because element has been uninstalled");!function(){var t=u(i).style;if("static"===t.position){i.style.position="relative";var e=function(t,e,n,o){var i=n[o];"auto"!==i&&"0"!==function(t){return t.replace(/[^-\d\.]/g,"")}(i)&&(t.warn("An element that is positioned static has style."+o+"="+i+" which is ignored due to the static positioning. The element will need to be positioned relative, so the style."+o+" will be set to 0. Element: ",e),e.style[o]=0)};e(h,i,t,"top"),e(h,i,t,"right"),e(h,i,t,"bottom"),e(h,i,t,"left")}}();var o=u(i).container;o||(o=M());var r=p.width,a=p.height,s="position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; "+function(t,e,n,o){return t=t?t+"px":"0",e=e?e+"px":"0",n=n?n+"px":"0",o=o?o+"px":"0","left: "+t+"; top: "+e+"; right: "+o+"; bottom: "+n+";"}(-(1+r),-(1+a),-a,-r),c=document.createElement("div"),d=document.createElement("div"),f=document.createElement("div"),v=document.createElement("div"),g=document.createElement("div"),m=document.createElement("div");c.dir="ltr",c.style.cssText="position: absolute; flex: none; overflow: hidden; z-index: -1; visibility: hidden; width: 100%; height: 100%; left: 0px; top: 0px;",c.className=b,d.className=b,d.style.cssText=s,f.style.cssText="position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",v.style.cssText="position: absolute; left: 0; top: 0;",g.style.cssText="position: absolute; flex: none; overflow: scroll; z-index: -1; visibility: hidden; width: 100%; height: 100%;",m.style.cssText="position: absolute; width: 200%; height: 200%;",f.appendChild(v),g.appendChild(m),d.appendChild(f),d.appendChild(g),c.appendChild(d),o.appendChild(c),n(f,"scroll",t),n(g,"scroll",e),u(i).onExpandScroll=t,u(i).onShrinkScroll=e}function D(){function e(t,e,n){var o=x(t),i=W(e),r=k(n);o.style.width=i+"px",o.style.height=r+"px"}function n(n){var o=i.offsetWidth,r=i.offsetHeight;l("Storing current size",o,r),w(i,o,r),d.add(0,function(){if(!u(i))return void l("Aborting because element has been uninstalled");if(!s())return void l("Aborting because element container has not been initialized");if(t.debug){var n=i.offsetWidth,a=i.offsetHeight;n===o&&a===r||h.warn(f.get(i),"Scroll: Size changed before updating detector elements.")}e(i,o,r)}),d.add(1,function(){return u(i)?s()?void L(i,o,r):void l("Aborting because element container has not been initialized"):void l("Aborting because element has been uninstalled")}),n&&d.add(2,function(){return u(i)?s()?void n():void l("Aborting because element container has not been initialized"):void l("Aborting because element has been uninstalled")})}function s(){return!!u(i).container}function p(){l("notifyListenersIfNeeded invoked");var t=u(i);return function(){return void 0===u(i).lastNotifiedWidth}()&&t.lastWidth===t.startSize.width&&t.lastHeight===t.startSize.height?l("Not notifying: Size is the same as the start size, and there has been no notification yet."):t.lastWidth===t.lastNotifiedWidth&&t.lastHeight===t.lastNotifiedHeight?l("Not notifying: Size already notified"):(l("Current size not notified, notifying..."),t.lastNotifiedWidth=t.lastWidth,t.lastNotifiedHeight=t.lastHeight,void o(u(i).listeners,function(t){t(i)}))}function b(){if(l("startanimation triggered."),c(i))return void l("Ignoring since element is still unrendered...");l("Element rendered.");var t=r(i),e=a(i);0!==t.scrollLeft&&0!==t.scrollTop&&0!==e.scrollLeft&&0!==e.scrollTop||(l("Scrollbars out of sync. Updating detector elements..."),n(p))}function v(){if(l("Scroll detected."),c(i))return void l("Scroll event fired while unrendered. Ignoring...");var t=i.offsetWidth,e=i.offsetHeight;t!==u(i).lastWidth||e!==u(i).lastHeight?(l("Element size changed."),n(p)):l("Element size has not changed ("+t+"x"+e+").")}if(l("registerListenersAndPositionElements invoked."),!u(i))return void l("Aborting because element has been uninstalled");u(i).onRendered=b,u(i).onExpand=v,u(i).onShrink=v;var g=u(i).style;e(i,g.width,g.height)}function z(){if(l("finalizeDomMutation invoked."),!u(i))return void l("Aborting because element has been uninstalled");var t=u(i).style;w(i,t.width,t.height),L(i,t.width,t.height)}function A(){s(i)}function _(){l("Installing..."),m(),g(),d.add(0,y),d.add(1,C),d.add(2,D),d.add(3,z),d.add(4,A)}s||(s=i,i=t,t=null),t=t||{},l("Making detectable..."),!function(t){return!function(t){return t===t.ownerDocument.body||t.ownerDocument.body.contains(t)}(t)||null===window.getComputedStyle(t)}(i)?_():(l("Element is detached"),M(),l("Waiting until element is attached..."),u(i).onRendered=function(){l("Element is now attached"),_()})}function c(t){var e=u(t);e&&(e.onExpandScroll&&i(r(t),"scroll",e.onExpandScroll),e.onShrinkScroll&&i(a(t),"scroll",e.onShrinkScroll),e.onAnimationStart&&i(e.container,"animationstart",e.onAnimationStart),e.container&&t.removeChild(e.container))}t=t||{};var h=t.reporter,d=t.batchProcessor,u=t.stateHandler.getState,f=(t.stateHandler.hasState,t.idHandler);if(!d)throw new Error("Missing required dependency: batchProcessor");if(!h)throw new Error("Missing required dependency: reporter.");var p=function(){var t=document.createElement("div");t.style.cssText="position: absolute; width: 1000px; height: 1000px; visibility: hidden; margin: 0; padding: 0;";var e=document.createElement("div");e.style.cssText="position: absolute; width: 500px; height: 500px; overflow: scroll; visibility: none; top: -1500px; left: -1500px; visibility: hidden; margin: 0; padding: 0;",e.appendChild(t),document.body.insertBefore(e,document.body.firstChild);var n=500-e.clientWidth,o=500-e.clientHeight;return document.body.removeChild(e),{width:n,height:o}}(),b="erd_scroll_detection_container";return function(t,e){if(!document.getElementById(t)){var n=e+"_animation",o=e+"_animation_active",i="/* Created by the element-resize-detector library. */\n";i+="."+e+" > div::-webkit-scrollbar { display: none; }\n\n",i+="."+o+" { -webkit-animation-duration: 0.1s; animation-duration: 0.1s; -webkit-animation-name: "+n+"; animation-name: "+n+"; }\n",i+="@-webkit-keyframes "+n+" { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n",i+="@keyframes "+n+" { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }",function(e,n){n=n||function(t){document.head.appendChild(t)};var o=document.createElement("style");o.innerHTML=e,o.id=t,n(o)}(i)}}("erd_scroll_detection_scrollbar_style",b),{makeDetectable:l,addListener:s,uninstall:c}}},function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isMobile?n("div",{staticClass:"ohyeah-scroll-box mobile"},[t._t("default")],2):n("div",{ref:"ohyeahbox",staticClass:"ohyeah-scroll-box",on:{wheel:t.onMouseWheel}},[t.noVer?t._e():n("div",{class:["ohyeah-scroll-vertical-track-h",{disabled:!t.isShowH},{show:t.barHDown},{left:t.left}],style:"background-color:"+t.trackColor+";opacity:"+(t.autoHide?0:.8),on:{mousedown:function(e){return e.stopPropagation(),t.onTrackMousedown(e,1)},mouseenter:function(e){e.stopPropagation(),t.hoverH=!0},mouseleave:function(e){e.stopPropagation(),t.hoverH=!1}}},[n("div",{ref:"ohyeahbarh",style:"transition:transform "+t.transSpeed+"ms,width 250ms,height 250ms;background-color:"+t.thumbColor+";width:"+(t.hoverH||t.barHDown?t.breadth+4:t.breadth)+"px;height: "+t.barHTall+"px;transform: translateY("+t.barHScrollTop+"px);border-radius:"+t.breadth+"px",on:{mousedown:function(e){return e.stopPropagation(),t.onBarMousedown(e,1)}}})]),t._v(" "),t.noHor?t._e():n("div",{class:["ohyeah-scroll-vertical-track-w",{disabled:!t.isShowW},{show:t.barWDown},{top:t.top}],style:"background-color:"+t.trackColor+";opacity:"+(t.autoHide?0:.8),on:{mousedown:function(e){return e.stopPropagation(),t.onTrackMousedown(e,2)},mouseenter:function(e){e.stopPropagation(),t.hoverW=!0},mouseleave:function(e){e.stopPropagation(),t.hoverW=!1}}},[n("div",{ref:"ohyeahbarw",style:"transition:transform "+t.transSpeed+"ms,height 250ms,width 250ms;background-color:"+t.thumbColor+";height:"+(t.hoverW||t.barWDown?t.breadth+4:t.breadth)+"px;width: "+t.barWTall+"px;transform: translateX("+t.barWScrollLeft+"px)",on:{mousedown:function(e){return e.stopPropagation(),t.onBarMousedown(e,2)}}})]),t._v(" "),n("div",{ref:"ohyeahbody",staticClass:"ohyeah-scroll-body",style:"transition:transform "+t.transSpeed+"ms,width 250ms;transform:translate(-"+t.barWScrollLeft*t.scaleW+"px, -"+t.barHScrollTop*t.scaleH+"px) translateZ(0)"},[t._t("default")],2)])},i=[],r={render:o,staticRenderFns:i};e.a=r}])});
//# sourceMappingURL=ohyeah-scroll.js.map