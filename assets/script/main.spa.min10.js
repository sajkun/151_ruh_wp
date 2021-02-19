console.time('all script');
var Cookie =
{
   set: function(name, value, days)
   {
      var domain, domainParts, date, expires, host;

      if (days)
      {
         date = new Date();
         date.setTime(date.getTime()+(days*24*60*60*1000));
         expires = "; expires="+date.toGMTString();
      }
      else
      {
         expires = "";
      }

      host = location.host;
      if (host.split('.').length === 1)
      {
         // no "." in a domain - it's localhost or something similar
         document.cookie = name+"="+value+expires+"; path=/";
      }
      else
      {
         // Remember the cookie on all subdomains.
          //
         // Start with trying to set cookie to the top domain.
         // (example: if user is on foo.com, try to set
         //  cookie to domain ".com")
         //
         // If the cookie will not be set, it means ".com"
         // is a top level domain and we need to
         // set the cookie to ".foo.com"
         domainParts = host.split('.');
         domainParts.shift();
         domain = '.'+domainParts.join('.');

         document.cookie = name+"="+value+expires+"; path=/; domain="+domain;

         // check if cookie was successfuly set to the given domain
         // (otherwise it was a Top-Level Domain)
         if (Cookie.get(name) == null || Cookie.get(name) != value)
         {
            // append "." to current domain
            domain = '.'+host;
            document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
         }
      }
   },

   get: function(name)
   {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i=0; i < ca.length; i++)
      {
         var c = ca[i];
         while (c.charAt(0)==' ')
         {
            c = c.substring(1,c.length);
         }

         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
   },

   erase: function(name)
   {
      Cookie.set(name, '', -1);
   }
};
  var is_mobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },

    any: function() {
        return (is_mobile.Android() || is_mobile.BlackBerry() || is_mobile.iOS() || is_mobile.Opera() || is_mobile.Windows());
    },

    anyphone: function(){
        return (is_mobile.any && (jQuery(window).width()<=768));
    }
  };
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Velocity=t()}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e};function i(e){return!0===e||!1===e}function o(e){return"[object Function]"===Object.prototype.toString.call(e)}function a(e){return!(!e||!e.nodeType)}function l(e){return"number"==typeof e}function s(t){if(!t||"object"!==(void 0===t?"undefined":e(t))||t.nodeType||"[object Object]"!==Object.prototype.toString.call(t))return!1;var n=Object.getPrototypeOf(t);return!n||n.hasOwnProperty("constructor")&&n.constructor===Object}function u(e){return"string"==typeof e}function c(e){return e&&l(e.length)&&o(e.velocity)}function f(e){return e&&e!==window&&l(e.length)&&!u(e)&&!o(e)&&!a(e)&&(0===e.length||a(e[0]))}function d(e){return Array.prototype.slice.call(e,0)}function v(e,t,n,r){e&&Object.defineProperty(e,t,{configurable:!r,writable:!r,value:n})}function p(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=!0,i=!1,o=void 0;try{for(var a,l=arguments[Symbol.iterator]();!(r=(a=l.next()).done);r=!0){var s=a.value;if(void 0!==s&&s==s)return s}}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}}var y=Date.now?Date.now:function(){return(new Date).getTime()};function g(e,t){e instanceof Element&&(e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s)"+t+"(\\s|$)","gi")," "))}var h={};function m(e,t){var n,r,i=e[0],a=e[1];u(i)?o(a)?h[i]&&(n=h,r=i,!Object.prototype.propertyIsEnumerable.call(n,r))?console.warn("VelocityJS: Trying to override internal 'registerAction' callback",i):!0===t?v(h,i,a):h[i]=a:console.warn("VelocityJS: Trying to set 'registerAction' callback to an invalid value:",i,a):console.warn("VelocityJS: Trying to set 'registerAction' name to an invalid value:",i)}m(["registerAction",m],!0);var w=400,b={fast:200,normal:400,slow:600},S={};function x(e){var t=e[0],n=e[1];u(t)?o(n)?S[t]?console.warn("VelocityJS: Trying to override 'registerEasing' callback",t):S[t]=n:console.warn("VelocityJS: Trying to set 'registerEasing' callback to an invalid value:",t,n):console.warn("VelocityJS: Trying to set 'registerEasing' name to an invalid value:",t)}function k(e,t,n,r){return t+e*(n-t)}function O(e){return Math.min(Math.max(e,0),1)}function E(e,t){return 1-3*t+3*e}function _(e,t){return 3*t-6*e}function T(e){return 3*e}function M(e,t,n){return((E(t,n)*e+_(t,n))*e+T(t))*e}function V(e,t,n){return 3*E(t,n)*e*e+2*_(t,n)*e+T(t)}function q(e,t,n,r){var i=4,o=.001,a=1e-7,l=10,s=11,u=1/(s-1),c="Float32Array"in window;if(4===arguments.length){for(var f=0;f<4;++f)if("number"!=typeof arguments[f]||isNaN(arguments[f])||!isFinite(arguments[f]))return;e=O(e),n=O(n);var d=c?new Float32Array(s):new Array(s),v=!1,p="generateBezier("+[e,t,n,r]+")",y=function(i,o,a,l){return v||h(),0===i?o:1===i?a:e===t&&n===r?o+i*(a-o):o+M(g(i),t,r)*(a-o)};return y.getControlPoints=function(){return[{x:e,y:t},{x:n,y:r}]},y.toString=function(){return p},y}function g(t){for(var r=s-1,c=0,f=1;f!==r&&d[f]<=t;++f)c+=u;var v=c+(t-d[--f])/(d[f+1]-d[f])*u,p=V(v,e,n);return p>=o?function(t,r){for(var o=0;o<i;++o){var a=V(r,e,n);if(0===a)return r;r-=(M(r,e,n)-t)/a}return r}(t,v):0===p?v:function(t,r,i){var o=void 0,s=void 0,u=0;do{(o=M(s=r+(i-r)/2,e,n)-t)>0?i=s:r=s}while(Math.abs(o)>a&&++u<l);return s}(t,c,c+u)}function h(){v=!0,e===t&&n===r||function(){for(var t=0;t<s;++t)d[t]=M(t*u,e,n)}()}}m(["registerEasing",x],!0),x(["linear",k]),x(["swing",function(e,t,n){return t+(.5-Math.cos(e*Math.PI)/2)*(n-t)}]),x(["spring",function(e,t,n){return t+(1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e))*(n-t)}]);var N=q(.42,0,1,1),A=q(0,0,.58,1),L=q(.42,0,.58,1);function J(e){return-e.tension*e.x-e.friction*e.v}function I(e,t,n){var r={x:e.x+n.dx*t,v:e.v+n.dv*t,tension:e.tension,friction:e.friction};return{dx:r.v,dv:J(r)}}function j(e,t){var n={dx:e.v,dv:J(e)},r=I(e,.5*t,n),i=I(e,.5*t,r),o=I(e,t,i),a=1/6*(n.dx+2*(r.dx+i.dx)+o.dx),l=1/6*(n.dv+2*(r.dv+i.dv)+o.dv);return e.x=e.x+a*t,e.v=e.v+l*t,e}x(["ease",q(.25,.1,.25,1)]),x(["easeIn",N]),x(["ease-in",N]),x(["easeOut",A]),x(["ease-out",A]),x(["easeInOut",L]),x(["ease-in-out",L]),x(["easeInSine",q(.47,0,.745,.715)]),x(["easeOutSine",q(.39,.575,.565,1)]),x(["easeInOutSine",q(.445,.05,.55,.95)]),x(["easeInQuad",q(.55,.085,.68,.53)]),x(["easeOutQuad",q(.25,.46,.45,.94)]),x(["easeInOutQuad",q(.455,.03,.515,.955)]),x(["easeInCubic",q(.55,.055,.675,.19)]),x(["easeOutCubic",q(.215,.61,.355,1)]),x(["easeInOutCubic",q(.645,.045,.355,1)]),x(["easeInQuart",q(.895,.03,.685,.22)]),x(["easeOutQuart",q(.165,.84,.44,1)]),x(["easeInOutQuart",q(.77,0,.175,1)]),x(["easeInQuint",q(.755,.05,.855,.06)]),x(["easeOutQuint",q(.23,1,.32,1)]),x(["easeInOutQuint",q(.86,0,.07,1)]),x(["easeInExpo",q(.95,.05,.795,.035)]),x(["easeOutExpo",q(.19,1,.22,1)]),x(["easeInOutExpo",q(1,0,0,1)]),x(["easeInCirc",q(.6,.04,.98,.335)]),x(["easeOutCirc",q(.075,.82,.165,1)]),x(["easeInOutCirc",q(.785,.135,.15,.86)]);var C={};function P(e,t){return l(e)?e:u(e)?b[e.toLowerCase()]||parseFloat(e.replace("ms","").replace("s","000")):null==t?void 0:P(t)}function z(e){if(i(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'cache' to an invalid value:",e)}function F(e){if(o(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'begin' to an invalid value:",e)}function H(e,t){if(o(e))return e;null==e||t||console.warn("VelocityJS: Trying to set 'complete' to an invalid value:",e)}function R(e){var t=P(e);if(!isNaN(t))return t;null!=e&&console.error("VelocityJS: Trying to set 'delay' to an invalid value:",e)}function B(e,t){var n=P(e);if(!isNaN(n)&&n>=0)return n;null==e||t||console.error("VelocityJS: Trying to set 'duration' to an invalid value:",e)}function W(e,t,n){if(u(e))return S[e];if(o(e))return e;if(Array.isArray(e)){if(1===e.length)return r=e[0],C[r]||(C[r]=function(e,t,n){return 0===e?t:1===e?n:t+Math.round(e*r)*(1/r)*(n-t)});if(2===e.length)return function e(t,n,r){var i={x:-1,v:0,tension:parseFloat(t)||500,friction:parseFloat(n)||20},o=[0],a=null!=r,l=0,s=void 0,u=void 0;for(s=a?(l=e(i.tension,i.friction))/r*.016:.016;u=j(u||i,s),o.push(1+u.x),l+=16,Math.abs(u.x)>1e-4&&Math.abs(u.v)>1e-4;);return a?function(e,t,n){return 0===e?t:1===e?n:t+o[Math.floor(e*(o.length-1))]*(n-t)}:l}(e[0],e[1],t);if(4===e.length)return q.apply(null,e)||!1}var r;null==e||n||console.error("VelocityJS: Trying to set 'easing' to an invalid value:",e)}function $(e){if(!1===e)return 0;var t=parseInt(e,10);if(!isNaN(t)&&t>=0)return Math.min(t,60);null!=e&&console.warn("VelocityJS: Trying to set 'fpsLimit' to an invalid value:",e)}function G(e){switch(e){case!1:return 0;case!0:return!0;default:var t=parseInt(e,10);if(!isNaN(t)&&t>=0)return t}null!=e&&console.warn("VelocityJS: Trying to set 'loop' to an invalid value:",e)}function Q(e,t){if(!1===e||u(e))return e;null==e||t||console.warn("VelocityJS: Trying to set 'queue' to an invalid value:",e)}function D(e){switch(e){case!1:return 0;case!0:return!0;default:var t=parseInt(e,10);if(!isNaN(t)&&t>=0)return t}null!=e&&console.warn("VelocityJS: Trying to set 'repeat' to an invalid value:",e)}function U(e){if(l(e))return e;null!=e&&console.error("VelocityJS: Trying to set 'speed' to an invalid value:",e)}function Z(e){if(i(e))return e;null!=e&&console.error("VelocityJS: Trying to set 'sync' to an invalid value:",e)}var Y=void 0,X=void 0,K=void 0,ee=void 0,te=void 0,ne=void 0,re=void 0,ie=void 0,oe=void 0,ae=void 0,le=void 0,se=void 0,ue=void 0,ce=void 0,fe=void 0,de=void 0,ve=function(){function e(){t(this,e)}return n(e,null,[{key:"reset",value:function(){Y=!0,X=void 0,K=void 0,ee=0,te=w,ne=W("swing",w),re=60,ie=0,ae=980/60,le=!0,se=!0,ue="",ce=0,fe=1,de=!0}},{key:"cache",get:function(){return Y},set:function(e){void 0!==(e=z(e))&&(Y=e)}},{key:"begin",get:function(){return X},set:function(e){void 0!==(e=F(e))&&(X=e)}},{key:"complete",get:function(){return K},set:function(e){void 0!==(e=H(e))&&(K=e)}},{key:"delay",get:function(){return ee},set:function(e){void 0!==(e=R(e))&&(ee=e)}},{key:"duration",get:function(){return te},set:function(e){void 0!==(e=B(e))&&(te=e)}},{key:"easing",get:function(){return ne},set:function(e){void 0!==(e=W(e,te))&&(ne=e)}},{key:"fpsLimit",get:function(){return re},set:function(e){void 0!==(e=$(e))&&(re=e,ae=980/e)}},{key:"loop",get:function(){return ie},set:function(e){void 0!==(e=G(e))&&(ie=e)}},{key:"mobileHA",get:function(){return oe},set:function(e){i(e)&&(oe=e)}},{key:"minFrameTime",get:function(){return ae}},{key:"promise",get:function(){return le},set:function(e){void 0!==(e=function(e){if(i(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'promise' to an invalid value:",e)}(e))&&(le=e)}},{key:"promiseRejectEmpty",get:function(){return se},set:function(e){void 0!==(e=function(e){if(i(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'promiseRejectEmpty' to an invalid value:",e)}(e))&&(se=e)}},{key:"queue",get:function(){return ue},set:function(e){void 0!==(e=Q(e))&&(ue=e)}},{key:"repeat",get:function(){return ce},set:function(e){void 0!==(e=D(e))&&(ce=e)}},{key:"repeatAgain",get:function(){return ce}},{key:"speed",get:function(){return fe},set:function(e){void 0!==(e=U(e))&&(fe=e)}},{key:"sync",get:function(){return de},set:function(e){void 0!==(e=Z(e))&&(de=e)}}]),e}();Object.freeze(ve),ve.reset();var pe=[],ye={},ge=new Set,he=[],me=new Map,we="velocityData";function be(e){var t=e[we];if(t)return t;for(var n=e.ownerDocument.defaultView,r=0,i=0;i<he.length;i++){var o=he[i];u(o)?e instanceof n[o]&&(r|=1<<i):e instanceof o&&(r|=1<<i)}var a={types:r,count:0,computedStyle:null,cache:{},queueList:{},lastAnimationList:{},lastFinishList:{},window:n};return Object.defineProperty(e,we,{value:a}),a}var Se=window&&window===window.window,xe=Se&&void 0!==window.pageYOffset,ke={isClient:Se,isMobile:Se&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isGingerbread:Se&&/Android 2\.3\.[3-7]/i.test(navigator.userAgent),prefixElement:Se&&document.createElement("div"),windowScrollAnchor:xe,scrollAnchor:xe?window:!Se||document.documentElement||document.body.parentNode||document.body,scrollPropertyLeft:xe?"pageXOffset":"scrollLeft",scrollPropertyTop:xe?"pageYOffset":"scrollTop",className:"velocity-animating",isTicking:!1,first:void 0,last:void 0,firstNew:void 0};function Oe(e){var t=ke.last;e._prev=t,e._next=void 0,t?t._next=e:ke.first=e,ke.last=e,ke.firstNew||(ke.firstNew=e);var n=e.element;be(n).count++||function(e,t){e instanceof Element&&(e.classList?e.classList.add(t):(g(e,t),e.className+=(e.className.length?" ":"")+t))}(n,ke.className)}function Ee(e,t,n){var r=be(e);if(!1!==n&&(r.lastAnimationList[n]=t),!1===n)Oe(t);else{u(n)||(n="");var i=r.queueList[n];if(i){for(;i._next;)i=i._next;i._next=t,t._prev=i}else null===i?r.queueList[n]=t:(r.queueList[n]=null,Oe(t))}}function _e(e){var t=e._next,n=e._prev,r=null==e.queue?e.options.queue:e.queue;(ke.firstNew===e&&(ke.firstNew=t),ke.first===e?ke.first=t:n&&(n._next=t),ke.last===e?ke.last=n:t&&(t._prev=n),r)&&(be(e.element)&&(e._next=e._prev=void 0))}var Te={};function Me(e){var t=e.options,n=p(e.queue,t.queue),r=p(e.loop,t.loop,ve.loop),i=p(e.repeat,t.repeat,ve.repeat),o=8&e._flags;if(o||!r&&!i){var a=e.element,l=be(a);if(--l.count||o||g(a,ke.className),t&&++t._completed===t._total){!o&&t.complete&&(!function(e){var t=e.complete||e.options.complete;if(t)try{var n=e.elements;t.call(n,n,e)}catch(e){setTimeout(function(){throw e},1)}}(e),t.complete=null);var s=t._resolver;s&&(s(e.elements),delete t._resolver)}!1!==n&&(o||(l.lastFinishList[n]=e.timeStart+p(e.duration,t.duration,ve.duration)),function(e,t,n){if(!1!==t){u(t)||(t="");var r=be(e),i=r.queueList[t];i?(r.queueList[t]=i._next||null,n||Oe(i)):null===i&&delete r.queueList[t]}}(a,n)),_e(e)}else i&&!0!==i?e.repeat=i-1:r&&!0!==r&&(e.loop=r-1,e.repeat=p(e.repeatAgain,t.repeatAgain,ve.repeatAgain)),r&&(e._flags^=64),!1!==n&&(be(e.element).lastFinishList[n]=e.timeStart+p(e.duration,t.duration,ve.duration)),e.timeStart=e.ellapsedTime=e.percentComplete=0,e._flags&=-5}function Ve(e){var t=e[0],n=e[1],r=e[2];if((!u(t)||window[t]instanceof Object)&&(u(t)||t instanceof Object))if(u(n))if(o(r)){var i=he.indexOf(t),a=3;if(i<0&&!u(t))if(me.has(t))i=he.indexOf(me.get(t));else for(var l in window)if(window[l]===t){(i=he.indexOf(l))<0&&(i=he.push(l)-1,pe[i]={},me.set(t,l));break}if(i<0&&(i=he.push(t)-1,pe[i]={}),pe[i][n]=r,u(e[a])){var s=e[a++],c=ye[s];c||(c=ye[s]=[]),c.push(r)}!1===e[a]&&ge.add(n)}else console.warn("VelocityJS: Trying to set 'registerNormalization' callback to an invalid value:",n,r);else console.warn("VelocityJS: Trying to set 'registerNormalization' name to an invalid value:",n);else console.warn("VelocityJS: Trying to set 'registerNormalization' constructor to an invalid value:",t)}function qe(e){var t=e[0],n=e[1],r=he.indexOf(t);if(r<0&&!u(t))if(me.has(t))r=he.indexOf(me.get(t));else for(var i in window)if(window[i]===t){r=he.indexOf(i);break}return r>=0&&pe[r].hasOwnProperty(n)}function Ne(e,t){for(var n=be(e),r=void 0,i=he.length-1,o=n.types;!r&&i>=0;i--)o&1<<i&&(r=pe[i][t]);return r}function Ae(e,t,n,r){var i=ge.has(t),o=!i&&be(e);(i||o&&o.cache[t]!==n)&&(i||(o.cache[t]=n||void 0),(r=r||Ne(e,t))&&r(e,n),Ut.debug>=2&&console.info('Set "'+t+'": "'+n+'"',e))}function Le(e){if(e.indexOf("calc(")>=0){for(var t=e.split(/([\(\)])/),n=0,r=0;r<t.length;r++){var i=t[r];switch(i){case"(":n++;break;case")":n--;break;default:n&&"0"===i[0]&&(t[r]=i.replace(/^0[a-z%]+ \+ /,""))}}return t.join("").replace(/(?:calc)?\(([0-9\.]+[a-z%]+)\)/g,"$1")}return e}m(["registerNormalization",Ve]),m(["hasNormalization",qe]);var Je={};function Ie(e){var t=Je[e];return t||(Je[e]=e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}))}var je=/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/gi,Ce=/#([a-f\d])([a-f\d])([a-f\d])/gi,Pe=/(rgba?\(\s*)?(\b[a-z]+\b)/g,ze=/rgb(a?)\(([^\)]+)\)/gi,Fe=/\s+/g,He={};function Re(e,t,n,r){return"rgba("+parseInt(t,16)+","+parseInt(n,16)+","+parseInt(r,16)+",1)"}function Be(e){return e.replace(je,Re).replace(Ce,function(e,t,n,r){return Re(0,t+t,n+n,r+r)}).replace(Pe,function(e,t,n){return He[n]?(t||"rgba(")+He[n]+(t?"":",1)"):e}).replace(ze,function(e,t,n){return"rgba("+n.replace(Fe,"")+(t?"":",1")+")"})}function We(e,t,n){if("border-box"===Qe(e,"boxSizing").toString().toLowerCase()===n){var r="width"===t?["Left","Right"]:["Top","Bottom"],i=["padding"+r[0],"padding"+r[1],"border"+r[0]+"Width","border"+r[1]+"Width"],o=0,a=!0,l=!1,s=void 0;try{for(var u,c=i[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var f=u.value,d=parseFloat(Qe(e,f));isNaN(d)||(o+=d)}}catch(e){l=!0,s=e}finally{try{!a&&c.return&&c.return()}finally{if(l)throw s}}return n?-o:o}return 0}function $e(e,t){return e.getBoundingClientRect()[t]+We(e,t,!0)+"px"}function Ge(e,t){var n=be(e),r=n.computedStyle?n.computedStyle:n.window.getComputedStyle(e,null),i=0;if(n.computedStyle||(n.computedStyle=r),"none"===r.display)switch(t){case"width":case"height":return Ae(e,"display","auto"),i=$e(e,t),Ae(e,"display","none"),String(i)}if((i=r[t])||(i=e.style[t]),"auto"===i)switch(t){case"width":case"height":i=$e(e,t);break;case"top":case"left":case"right":case"bottom":var o=Qe(e,"position");if("fixed"===o||"absolute"===o){i=e.getBoundingClientRect[t]+"px";break}default:i="0px"}return i?String(i):""}function Qe(e,t,n,r){var i=be(e),o=void 0;return ge.has(t)&&(r=!0),!r&&i&&null!=i.cache[t]?o=i.cache[t]:(n=n||Ne(e,t))&&(o=n(e),i&&(i.cache[t]=o)),Ut.debug>=2&&console.info('Get "'+t+'": "'+o+'"',e),o}var De=/^#([A-f\d]{3}){1,2}$/i,Ue={function:function(e,t,n,r,i,o){return e.call(t,r,n.length,i)},number:function(e,t,n,r,i,o){return String(e)+function(e){for(var t in ye)if(ye[t].includes(e))return t;return""}(o.fn)},string:function(e,t,n,r,i,o){return Be(e)},undefined:function(e,t,n,r,i,o){return Be(Qe(t,i,o.fn)||"")}};function Ze(t,n){var r=t.tweens=Object.create(null),i=t.elements,a=t.element,s=i.indexOf(a),c=be(a),f=p(t.queue,t.options.queue),d=p(t.options.duration,ve.duration);for(var v in n)if(n.hasOwnProperty(v)){var y=Ie(v),g=Ne(a,y),h=n[v];if(!g&&"tween"!==y){Ut.debug&&console.log('Skipping "'+v+'" due to a lack of browser support.');continue}if(null==h){Ut.debug&&console.log('Skipping "'+v+'" due to no value supplied.');continue}var m=r[y]={},w=void 0,b=void 0;if(m.fn=g,o(h)&&(h=h.call(a,s,i.length,i)),Array.isArray(h)){var x=h[1],k=h[2];w=h[0],u(x)&&(/^[\d-]/.test(x)||De.test(x))||o(x)||l(x)?b=x:u(x)&&S[x]||Array.isArray(x)?(m.easing=W(x,d),b=k):b=x||k}else w=h;m.end=Ue[void 0===w?"undefined":e(w)](w,a,i,s,y,m),null==b&&!1!==f&&void 0!==c.queueList[f]||(m.start=Ue[void 0===b?"undefined":e(b)](b,a,i,s,y,m),et(y,m,d))}}var Ye=/((?:[+\-*\/]=)?(?:[+-]?\d*\.\d+|[+-]?\d+)[a-z%]*|(?:.(?!$|[+-]?\d|[+\-*\/]=[+-]?\d))+.|.)/g,Xe=/^([+\-*\/]=)?([+-]?\d*\.\d+|[+-]?\d+)(.*)$/;function Ke(e,t){for(var n=e.length,r=[],i=[],o=void 0,a=0;a<n;a++){if(!u(e[a]))return;""===e[a]?r[a]=[""]:r[a]=d(e[a].match(Ye)),i[a]=0,o=o||r[a].length>1}for(var l=[],s=l.pattern=[],c=function(e){if(u(s[s.length-1]))s[s.length-1]+=e;else if(e){s.push(e);for(var t=0;t<n;t++)l[t].push(null)}},f=function(){if(!(o||s.length>1)){for(var r="display"===t,i="visibility"===t,a=0;a<n;a++){var u=e[a];l[a][0]=u,l[a].easing=W(r&&"none"===u||i&&"hidden"===u||!r&&!i?"at-end":"at-start",400)}return s[0]=!1,l}},v=!0,p=0;p<n;p++)l[p]=[];for(;v;){for(var y=[],g=[],h=void 0,m=!1,w=!1,b=0;b<n;b++){var S=i[b]++,x=r[b][S];if(!x){if(b)return;for(;b<n;b++){var k=i[b]++;if(r[b][k])return f()}v=!1;break}var O=x.match(Xe);if(O){if(h)return f();var E=parseFloat(O[2]),_=O[3],T=O[1]?O[1][0]+_:void 0,M=T||_;E&&!g.includes(M)&&g.push(M),_||(E?w=!0:m=!0),y[b]=T?[E,M,!0]:[E,M]}else{if(y.length)return f();if(h){if(h!==x)return f()}else h=x}}if(h)c(h);else if(g.length)if(2===g.length&&m&&!w&&g.splice(g[0]?1:0,1),1===g.length){var V=g[0];switch(V[0]){case"+":case"-":case"*":case"/":return void(t&&console.error('Velocity: The first property must not contain a relative function "'+t+'":',e))}s.push(!1);for(var q=0;q<n;q++)l[q].push(y[q][0]);c(V)}else{c("calc(");for(var N=s.length-1,A=0;A<g.length;A++){var L=g[A],J=L[0],I="*"===J||"/"===J,j=I||"+"===J||"-"===J;I&&(s[N]+="(",c(")")),A&&c(" "+(j?J:"+")+" "),s.push(!1);for(var C=0;C<n;C++){var P=y[C],z=P[1]===L?P[0]:3===P.length?l[C-1][l[C-1].length-1]:I?1:0;l[C].push(z)}c(j?L.substring(1):L)}c(")")}}for(var F=0,H=0;F<s.length;F++){var R=s[F];u(R)?H&&R.indexOf(",")>=0?H++:R.indexOf("rgb")>=0&&(H=1):H&&(H<4?s[F]=!0:H=0)}return l}function et(e,t,n,r){var i=t.start,o=t.end;if(u(o)&&u(i)){var a=Ke([i,o],e);if(!a&&r){var l=i.match(/\d\.?\d*/g)||["0"],s=l.length,c=0;a=Ke([o.replace(/\d+\.?\d*/g,function(){return l[c++%s]}),o],e)}if(a)switch(Ut.debug&&console.log("Velocity: Sequence found:",a),a[0].percent=0,a[1].percent=1,t.sequence=a,t.easing){case S["at-start"]:case S.during:case S["at-end"]:a[0].easing=a[1].easing=t.easing}}}function tt(e){if(ke.firstNew===e&&(ke.firstNew=e._next),!(1&e._flags)){var t=e.element,n=e.tweens;p(e.options.duration,ve.duration);for(var r in n){var i=n[r];if(null==i.start){var o=Qe(e.element,r);u(o)?(i.start=Be(o),et(r,i,0,!0)):Array.isArray(o)||console.warn("bad type",i,r,o)}Ut.debug&&console.log('tweensContainer "'+r+'": '+JSON.stringify(i),t)}e._flags|=1}}function nt(e){var t=e.begin||e.options.begin;if(t)try{var n=e.elements;t.call(n,n,e)}catch(e){setTimeout(function(){throw e},1)}}function rt(e){var t=e.progress||e.options.progress;if(t)try{var n=e.elements,r=e.percentComplete,i=e.options,o=e.tween;t.call(n,n,r,Math.max(0,e.timeStart+(null!=e.duration?e.duration:null!=i.duration?i.duration:ve.duration)-vt),void 0!==o?o:String(100*r),e)}catch(e){setTimeout(function(){throw e},1)}}function it(){var e=!0,t=!1,n=void 0;try{for(var r,i=lt[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){rt(r.value)}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}lt.clear();var o=!0,a=!1,l=void 0;try{for(var s,u=at[Symbol.iterator]();!(o=(s=u.next()).done);o=!0){Me(s.value)}}catch(e){a=!0,l=e}finally{try{!o&&u.return&&u.return()}finally{if(a)throw l}}at.clear()}var ot=1e3/60,at=new Set,lt=new Set,st=function(){var e=window.performance||{};if("function"!=typeof e.now){var t=e.timing&&e.timing.navigationStart?e.timing.navigationStart:y();e.now=function(){return y()-t}}return e}(),ut=function(e){return setTimeout(e,Math.max(0,ot-(st.now()-vt)))},ct=window.requestAnimationFrame||ut,ft=void 0,dt=void 0,vt=0;try{(dt=new Worker(URL.createObjectURL(new Blob(["("+function(){var e=this,t=void 0;this.onmessage=function(n){switch(n.data){case!0:t||(t=setInterval(function(){e.postMessage(!0)},1e3/30));break;case!1:t&&(clearInterval(t),t=0);break;default:e.postMessage(n.data)}}}+")()"])))).onmessage=function(e){!0===e.data?pt():it()},ke.isMobile||void 0===document.hidden||document.addEventListener("visibilitychange",function(){dt.postMessage(ke.isTicking&&document.hidden)})}catch(e){}function pt(e){if(!ft){if(ft=!0,!1!==e){var t=st.now(),n=vt?t-vt:ot,r=ve.speed,i=ve.easing,o=ve.duration,a=void 0,l=void 0;if(n>=ve.minFrameTime||!vt){for(vt=t;ke.firstNew;)tt(ke.firstNew);for(a=ke.first;a&&a!==ke.firstNew;a=a._next){var s=a.element,u=be(s);if(s.parentNode&&u){var c=a.options,f=a._flags,d=a.timeStart;if(!d){var v=null!=a.queue?a.queue:c.queue;d=t-n,!1!==v&&(d=Math.max(d,u.lastFinishList[v]||0)),a.timeStart=d}16&f?a.timeStart+=n:2&f||(a._flags|=2,c._ready++)}else _e(a)}for(a=ke.first;a&&a!==ke.firstNew;a=l){var p=a._flags;if(l=a._next,2&p&&!(16&p)){var y=a.options;if(32&p&&y._ready<y._total)a.timeStart+=n;else{var g=null!=a.speed?a.speed:null!=y.speed?y.speed:r,h=a.timeStart;if(!(4&p)){var m=null!=a.delay?a.delay:y.delay;if(m){if(h+m/g>t)continue;a.timeStart=h+=m/(m>0?g:1)}a._flags|=4,0==y._started++&&(y._first=a,y.begin&&(nt(a),y.begin=void 0))}1!==g&&(a.timeStart=h+=Math.min(n,t-h)*(1-g));var w=null!=a.easing?a.easing:null!=y.easing?y.easing:i,b=a.ellapsedTime=t-h,S=null!=a.duration?a.duration:null!=y.duration?y.duration:o,x=a.percentComplete=Ut.mock?1:Math.min(b/S,1),O=a.tweens,E=64&p;for(var _ in(a.progress||y._first===a&&y.progress)&&lt.add(a),1===x&&at.add(a),O){var T=O[_],M=T.sequence,V=M.pattern,q="",N=0;if(V){for(var A=(T.easing||w)(x,0,1,_),L=0,J=0;J<M.length-1;J++)M[J].percent<A&&(L=J);for(var I=M[L],j=M[L+1]||I,C=(x-I.percent)/(j.percent-I.percent),P=E?1-C:C,z=j.easing||w||k;N<V.length;N++){var F=I[N];if(null==F)q+=V[N];else{var H=j[N];if(F===H)q+=F;else{var R=z(P,F,H,_);q+=!0!==V[N]?R:Math.round(R)}}}"tween"!==_?(1===x&&(q=Le(q)),Ae(a.element,_,q,T.fn)):a.tween=q}else console.warn("VelocityJS: Missing pattern:",_,JSON.stringify(T[_])),delete O[_]}}}}(lt.size||at.size)&&(document.hidden?dt?dt.postMessage(""):setTimeout(it,1):it())}}ke.first?(ke.isTicking=!0,document.hidden?dt?!1===e&&dt.postMessage(!0):ut(pt):ct(pt)):(ke.isTicking=!1,vt=0,document.hidden&&dt&&dt.postMessage(!1)),ft=!1}}function yt(e,t,n){if(tt(e),void 0===t||t===p(e.queue,e.options.queue,n)){if(!(4&e._flags)){var r=e.options;0==r._started++&&(r._first=e,r.begin&&(nt(e),r.begin=void 0)),e._flags|=4}for(var i in e.tweens){var o=e.tweens[i],a=o.sequence,l=a.pattern,s="",u=0;if(l)for(var c=a[a.length-1];u<l.length;u++){var f=c[u];s+=null==f?l[u]:f}Ae(e.element,i,s,o.fn)}Me(e)}}m(["finish",function(e,t,n){var r=Q(e[0],!0),i=ve.queue,o=!0===e[void 0===r?0:1];if(c(t)&&t.velocity.animations){var a=!0,l=!1,s=void 0;try{for(var u,f=t.velocity.animations[Symbol.iterator]();!(a=(u=f.next()).done);a=!0)yt(u.value,r,i)}catch(e){l=!0,s=e}finally{try{!a&&f.return&&f.return()}finally{if(l)throw s}}}else{for(;ke.firstNew;)tt(ke.firstNew);for(var d,v=ke.first;v&&(o||v!==ke.firstNew);v=d||ke.firstNew)d=v._next,t&&!t.includes(v.element)||yt(v,r,i)}n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}],!0);var gt={isExpanded:1,isReady:2,isStarted:4,isStopped:8,isPaused:16,isSync:32,isReverse:64};function ht(e,t,n,r){void 0!==t&&t!==p(e.queue,e.options.queue,n)||(r?e._flags|=16:e._flags&=-17)}function mt(e,t,n,r){var i=0===r.indexOf("pause"),o="false"!==(r.indexOf(".")>=0?r.replace(/^.*\./,""):void 0)&&Q(e[0]),a=ve.queue;if(c(t)&&t.velocity.animations){var l=!0,s=!1,u=void 0;try{for(var f,d=t.velocity.animations[Symbol.iterator]();!(l=(f=d.next()).done);l=!0){ht(f.value,o,a,i)}}catch(e){s=!0,u=e}finally{try{!l&&d.return&&d.return()}finally{if(s)throw u}}}else for(var v=ke.first;v;)t&&!t.includes(v.element)||ht(v,o,a,i),v=v._next;n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}function wt(t,n,r,i){var o=t[0],a=t[1];if(!o)return console.warn("VelocityJS: Cannot access a non-existant property!"),null;if(void 0===a&&!s(o)){if(Array.isArray(o)){if(1===n.length){var f={},d=!0,v=!1,p=void 0;try{for(var y,g=o[Symbol.iterator]();!(d=(y=g.next()).done);d=!0){var h=y.value;f[h]=Be(Qe(n[0],h))}}catch(e){v=!0,p=e}finally{try{!d&&g.return&&g.return()}finally{if(v)throw p}}return f}var m=[],w=!0,b=!1,S=void 0;try{for(var x,k=n[Symbol.iterator]();!(w=(x=k.next()).done);w=!0){var O=x.value,E={},_=!0,T=!1,M=void 0;try{for(var V,q=o[Symbol.iterator]();!(_=(V=q.next()).done);_=!0){var N=V.value;E[N]=Be(Qe(O,N))}}catch(e){T=!0,M=e}finally{try{!_&&q.return&&q.return()}finally{if(T)throw M}}m.push(E)}}catch(e){b=!0,S=e}finally{try{!w&&k.return&&k.return()}finally{if(b)throw S}}return m}if(1===n.length)return Be(Qe(n[0],o));var A=[],L=!0,J=!1,I=void 0;try{for(var j,C=n[Symbol.iterator]();!(L=(j=C.next()).done);L=!0){var P=j.value;A.push(Be(Qe(P,o)))}}catch(e){J=!0,I=e}finally{try{!L&&C.return&&C.return()}finally{if(J)throw I}}return A}var z=[];if(s(o)){for(var F in o)if(o.hasOwnProperty(F)){var H=!0,R=!1,B=void 0;try{for(var W,$=n[Symbol.iterator]();!(H=(W=$.next()).done);H=!0){var G=W.value,Q=o[F];u(Q)||l(Q)?Ae(G,F,o[F]):(z.push('Cannot set a property "'+F+'" to an unknown type: '+(void 0===Q?"undefined":e(Q))),console.warn('VelocityJS: Cannot set a property "'+F+'" to an unknown type:',Q))}}catch(e){R=!0,B=e}finally{try{!H&&$.return&&$.return()}finally{if(R)throw B}}}}else if(u(a)||l(a)){var D=!0,U=!1,Z=void 0;try{for(var Y,X=n[Symbol.iterator]();!(D=(Y=X.next()).done);D=!0){Ae(Y.value,o,String(a))}}catch(e){U=!0,Z=e}finally{try{!D&&X.return&&X.return()}finally{if(U)throw Z}}}else z.push('Cannot set a property "'+o+'" to an unknown type: '+(void 0===a?"undefined":e(a))),console.warn('VelocityJS: Cannot set a property "'+o+'" to an unknown type:',a);r&&(z.length?r._rejecter(z.join(", ")):c(n)&&n.velocity.animations&&n.then?n.then(r._resolver):r._resolver(n))}function bt(e,t,n){tt(e),void 0!==t&&t!==p(e.queue,e.options.queue,n)||(e._flags|=8,Me(e))}m(["option",function(e,t,n,r){var i=e[0],o=r.indexOf(".")>=0?r.replace(/^.*\./,""):void 0,a="false"!==o&&Q(o,!0),l=void 0,s=e[1];if(!i)return console.warn("VelocityJS: Cannot access a non-existant key!"),null;if(c(t)&&t.velocity.animations)l=t.velocity.animations;else{l=[];for(var u=ke.first;u;u=u._next)t.indexOf(u.element)>=0&&p(u.queue,u.options.queue)===a&&l.push(u);if(t.length>1&&l.length>1){for(var f=1,d=l[0].options;f<l.length;)if(l[f++].options!==d){d=null;break}d&&(l=[l[0]])}}if(void 0===s){var v=[],y=gt[i],g=!0,h=!1,m=void 0;try{for(var w,b=l[Symbol.iterator]();!(g=(w=b.next()).done);g=!0){var S=w.value;void 0===y?v.push(p(S[i],S.options[i])):v.push(0==(S._flags&y))}}catch(e){h=!0,m=e}finally{try{!g&&b.return&&b.return()}finally{if(h)throw m}}return 1===t.length&&1===l.length?v[0]:v}var x=void 0;switch(i){case"cache":s=z(s);break;case"begin":s=F(s);break;case"complete":s=H(s);break;case"delay":s=R(s);break;case"duration":s=B(s);break;case"fpsLimit":s=$(s);break;case"loop":s=G(s);break;case"percentComplete":x=!0,s=parseFloat(s);break;case"repeat":case"repeatAgain":s=D(s);break;default:if("_"!==i[0]){var k=parseFloat(s);s===String(k)&&(s=k);break}case"queue":case"promise":case"promiseRejectEmpty":case"easing":case"started":return void console.warn("VelocityJS: Trying to set a read-only key:",i)}if(void 0===s||s!=s)return console.warn("VelocityJS: Trying to set an invalid value:"+i+"="+s+" ("+e[1]+")"),null;var O=!0,E=!1,_=void 0;try{for(var T,M=l[Symbol.iterator]();!(O=(T=M.next()).done);O=!0){var V=T.value;x?V.timeStart=vt-p(V.duration,V.options.duration,ve.duration)*s:V[i]=s}}catch(e){E=!0,_=e}finally{try{!O&&M.return&&M.return()}finally{if(E)throw _}}n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}],!0),m(["pause",mt],!0),m(["resume",mt],!0),m(["property",wt],!0),m(["reverse",function(e,t,n,r){throw new SyntaxError("VelocityJS: The 'reverse' action is built in and private.")}],!0),m(["stop",function(e,t,n,r){var i=Q(e[0],!0),o=ve.queue,a=!0===e[void 0===i?0:1];if(c(t)&&t.velocity.animations){var l=!0,s=!1,u=void 0;try{for(var f,d=t.velocity.animations[Symbol.iterator]();!(l=(f=d.next()).done);l=!0)bt(f.value,i,o)}catch(e){s=!0,u=e}finally{try{!l&&d.return&&d.return()}finally{if(s)throw u}}}else{for(;ke.firstNew;)tt(ke.firstNew);for(var v,p=ke.first;p&&(a||p!==ke.firstNew);p=v||ke.firstNew)v=p._next,t&&!t.includes(p.element)||bt(p,i,o)}n&&(c(t)&&t.velocity.animations&&t.then?t.then(n._resolver):n._resolver(t))}],!0),m(["style",wt],!0),m(["tween",function(e,t,n,i){var o=void 0;if(t){if(1!==t.length)throw new Error("VelocityJS: Cannot tween more than one element!")}else{if(!e.length)return console.info('Velocity(<element>, "tween", percentComplete, property, end | [end, <easing>, <start>], <easing>) => value\nVelocity(<element>, "tween", percentComplete, {property: end | [end, <easing>, <start>], ...}, <easing>) => {property: value, ...}'),null;t=[document.body],o=!0}var a=e[0],c={elements:t,element:t[0],queue:!1,options:{duration:1e3},tweens:null},f={},d=e[1],v=void 0,y=void 0,g=e[2],h=0;if(u(e[1])?Te&&Te[e[1]]?(y=Te[e[1]],d={},g=e[2]):(v=!0,d=r({},e[1],e[2]),g=e[3]):Array.isArray(e[1])&&(v=!0,d={tween:e[1]},g=e[2]),!l(a)||a<0||a>1)throw new Error("VelocityJS: Must tween a percentage from 0 to 1!");if(!s(d))throw new Error("VelocityJS: Cannot tween an invalid property!");if(o)for(var m in d)if(d.hasOwnProperty(m)&&(!Array.isArray(d[m])||d[m].length<2))throw new Error("VelocityJS: When not supplying an element you must force-feed values: "+m);var b=W(p(g,ve.easing),w);for(var S in y?tn(c,y):Ze(c,d),c.tweens){var x=c.tweens[S],O=x.sequence,E=O.pattern,_="",T=0;if(h++,E){for(var M=(x.easing||b)(a,0,1,S),V=0,q=0;q<O.length-1;q++)O[q].percent<M&&(V=q);for(var N=O[V],A=O[V+1]||N,L=(a-N.percent)/(A.percent-N.percent),J=A.easing||k;T<E.length;T++){var I=N[T];if(null==I)_+=E[T];else{var j=A[T];if(I===j)_+=I;else{var C=J(L,I,j,S);_+=!0===E[T]?Math.round(C):C}}}f[S]=_}}if(v&&1===h)for(var P in f)if(f.hasOwnProperty(P))return f[P];return f}],!0);var St={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgrey:11119017,darkgreen:25600,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,grey:8421504,green:32768,greenyellow:11403055,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgrey:13882323,lightgreen:9498256,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};for(var xt in St)if(St.hasOwnProperty(xt)){var kt=St[xt];He[xt]=Math.floor(kt/65536)+","+Math.floor(kt/256%256)+","+kt%256}function Ot(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375}function Et(e){return 1-Ot(1-e)}!function(e,t){x([e,function(e,n,r){return 0===e?n:1===e?r:Math.pow(e,2)*((t+1)*e-t)*(r-n)}])}("easeInBack",1.7),function(e,t){x([e,function(e,n,r){return 0===e?n:1===e?r:(Math.pow(--e,2)*((t+1)*e+t)+1)*(r-n)}])}("easeOutBack",1.7),function(e,t){t*=1.525,x([e,function(e,n,r){return 0===e?n:1===e?r:.5*((e*=2)<1?Math.pow(e,2)*((t+1)*e-t):Math.pow(e-2,2)*((t+1)*(e-2)+t)+2)*(r-n)}])}("easeInOutBack",1.7),x(["easeInBounce",function(e,t,n){return 0===e?t:1===e?n:Et(e)*(n-t)}]),x(["easeOutBounce",function(e,t,n){return 0===e?t:1===e?n:Ot(e)*(n-t)}]),x(["easeInOutBounce",function(e,t,n){return 0===e?t:1===e?n:(e<.5?.5*Et(2*e):.5*Ot(2*e-1)+.5)*(n-t)}]);var _t=2*Math.PI;function Tt(e,t){return function(n,r){if(void 0===r)return We(n,e,t)+"px";Ae(n,e,parseFloat(r)-We(n,e,t)+"px")}}!function(e,t,n){x([e,function(e,r,i){return 0===e?r:1===e?i:-t*Math.pow(2,10*(e-=1))*Math.sin((e-n/_t*Math.asin(1/t))*_t/n)*(i-r)}])}("easeInElastic",1,.3),function(e,t,n){x([e,function(e,r,i){return 0===e?r:1===e?i:(t*Math.pow(2,-10*e)*Math.sin((e-n/_t*Math.asin(1/t))*_t/n)+1)*(i-r)}])}("easeOutElastic",1,.3),function(e,t,n){x([e,function(e,r,i){if(0===e)return r;if(1===e)return i;var o=n/_t*Math.asin(1/t);return((e=2*e-1)<0?t*Math.pow(2,10*e)*Math.sin((e-o)*_t/n)*-.5:t*Math.pow(2,-10*e)*Math.sin((e-o)*_t/n)*.5+1)*(i-r)}])}("easeInOutElastic",1,.3*1.5),x(["at-start",function(e,t,n){return 0===e?t:n}]),x(["during",function(e,t,n){return 0===e||1===e?t:n}]),x(["at-end",function(e,t,n){return 1===e?n:t}]),Ve(["Element","innerWidth",Tt("width",!0)]),Ve(["Element","innerHeight",Tt("height",!0)]),Ve(["Element","outerWidth",Tt("width",!1)]),Ve(["Element","outerHeight",Tt("height",!1)]);var Mt=/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|let|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i,Vt=/^(li)$/i,qt=/^(tr)$/i,Nt=/^(table)$/i,At=/^(tbody)$/i;function Lt(e,t){return function(n,r){if(null==r)return Qe(n,"client"+e,null,!0),Qe(n,"scroll"+e,null,!0),n["scroll"+t]+"px";var i=parseFloat(r);switch(r.replace(String(i),"")){case"":case"px":n["scroll"+t]=i;break;case"%":var o=parseFloat(Qe(n,"client"+e)),a=parseFloat(Qe(n,"scroll"+e));n["scroll"+t]=Math.max(0,a-o)*i/100}}}Ve(["Element","display",function(e,t){var n=e.style;if(void 0===t)return Ge(e,"display");if("auto"===t){var r=e&&e.nodeName,i=be(e);t=Mt.test(r)?"inline":Vt.test(r)?"list-item":qt.test(r)?"table-row":Nt.test(r)?"table":At.test(r)?"table-row-group":"block",i.cache.display=t}n.display=t}]),Ve(["HTMLElement","scroll",Lt("Height","Top"),!1]),Ve(["HTMLElement","scrollTop",Lt("Height","Top"),!1]),Ve(["HTMLElement","scrollLeft",Lt("Width","Left"),!1]),Ve(["HTMLElement","scrollWidth",function(e,t){if(null==t)return e.scrollWidth+"px"}]),Ve(["HTMLElement","clientWidth",function(e,t){if(null==t)return e.clientWidth+"px"}]),Ve(["HTMLElement","scrollHeight",function(e,t){if(null==t)return e.scrollHeight+"px"}]),Ve(["HTMLElement","clientHeight",function(e,t){if(null==t)return e.clientHeight+"px"}]);var Jt=/^(b(lockSize|o(rder(Bottom(LeftRadius|RightRadius|Width)|Image(Outset|Width)|LeftWidth|R(adius|ightWidth)|Spacing|Top(LeftRadius|RightRadius|Width)|Width)|ttom))|column(Gap|RuleWidth|Width)|f(lexBasis|ontSize)|grid(ColumnGap|Gap|RowGap)|height|inlineSize|le(ft|tterSpacing)|m(a(rgin(Bottom|Left|Right|Top)|x(BlockSize|Height|InlineSize|Width))|in(BlockSize|Height|InlineSize|Width))|o(bjectPosition|utline(Offset|Width))|p(adding(Bottom|Left|Right|Top)|erspective)|right|s(hapeMargin|troke(Dashoffset|Width))|t(extIndent|op|ransformOrigin)|w(idth|ordSpacing))$/;function It(e,t){return function(n,r){if(void 0===r)return Ge(n,e)||Ge(n,t);n.style[e]=n.style[t]=r}}function jt(e){return function(t,n){if(void 0===n)return Ge(t,e);t.style[e]=n}}var Ct=/^(webkit|moz|ms|o)[A-Z]/,Pt=ke.prefixElement;if(Pt)for(var zt in Pt.style)if(Ct.test(zt)){var Ft=zt.replace(/^[a-z]+([A-Z])/,function(e,t){return t.toLowerCase()}),Ht=Jt.test(Ft)?"px":void 0;Ve(["Element",Ft,It(zt,Ft),Ht])}else if(!qe(["Element",zt])){var Rt=Jt.test(zt)?"px":void 0;Ve(["Element",zt,jt(zt),Rt])}function Bt(e){return function(t,n){if(void 0===n)return t.getAttribute(e);t.setAttribute(e,n)}}var Wt=document.createElement("div"),$t=/^SVG(.*)Element$/,Gt=/Element$/;function Qt(e){return function(t,n){if(void 0===n)try{return t.getBBox()[e]+"px"}catch(e){return"0px"}t.setAttribute(e,n)}}Object.getOwnPropertyNames(window).forEach(function(e){var t=$t.exec(e);if(t&&"SVG"!==t[1])try{var n=t[1]?document.createElementNS("http://www.w3.org/2000/svg",(t[1]||"svg").toLowerCase()):document.createElement("svg");for(var r in n){var i=n[r];!u(r)||"o"===r[0]&&"n"===r[1]||r===r.toUpperCase()||Gt.test(r)||r in Wt||o(i)||Ve([e,r,Bt(r)])}}catch(t){console.error("VelocityJS: Error when trying to identify SVG attributes on "+e+".",t)}}),Ve(["SVGElement","width",Qt("width")]),Ve(["SVGElement","height",Qt("height")]),Ve(["Element","tween",function(e,t){if(void 0===t)return""}]);var Dt,Ut=an;if(function(e){e.Actions=h,e.Easings=S,e.Sequences=Te,e.State=ke,e.defaults=ve,e.patch=sn,e.debug=!1,e.mock=!1,e.version="2.0.5",e.Velocity=an}(Dt||(Dt={})),function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e}}()<=8)throw new Error("VelocityJS cannot run on Internet Explorer 8 or earlier");if(window){var Zt=window.jQuery,Yt=window.Zepto;sn(window,!0),sn(Element&&Element.prototype),sn(NodeList&&NodeList.prototype),sn(HTMLCollection&&HTMLCollection.prototype),sn(Zt,!0),sn(Zt&&Zt.fn),sn(Yt,!0),sn(Yt&&Yt.fn)}var Xt=function(t){if(Dt.hasOwnProperty(t))switch(void 0===t?"undefined":e(t)){case"number":case"boolean":v(Ut,t,{get:function(){return Dt[t]},set:function(e){Dt[t]=e}},!0);break;default:v(Ut,t,Dt[t],!0)}};for(var Kt in Dt)Xt(Kt);Object.freeze(Ut);var en=/(\d*\.\d+|\d+\.?|from|to)/g;function tn(e,t){var n=e.tweens=Object.create(null),r=e.element;for(var i in t.tweens)if(t.tweens.hasOwnProperty(i)){var o=Ne(r,i);if(!o&&"tween"!==i){Ut.debug&&console.log("Skipping ["+i+"] due to a lack of browser support.");continue}n[i]={fn:o,sequence:t.tweens[i]}}}m(["registerSequence",function e(t){if(s(t[0]))for(var n in t[0])t[0].hasOwnProperty(n)&&e([n,t[0][n]]);else if(u(t[0])){var r=t[0],i=t[1];if(u(r))if(s(i)){Te[r]&&console.warn("VelocityJS: Replacing named sequence:",r);var o={},a=new Array(100),c=[],f=Te[r]={},d=B(i.duration);for(var v in f.tweens={},l(d)&&(f.duration=d),i)if(i.hasOwnProperty(v)){var p=String(v).match(en);if(p){var y=!0,g=!1,h=void 0;try{for(var m,b=p[Symbol.iterator]();!(y=(m=b.next()).done);y=!0){var S=m.value,x="from"===S?0:"to"===S?100:parseFloat(S);if(x<0||x>100)console.warn("VelocityJS: Trying to use an invalid value as a percentage (0 <= n <= 100):",r,x);else if(isNaN(x))console.warn("VelocityJS: Trying to use an invalid number as a percentage:",r,v,S);else for(var k in o[String(x)]||(o[String(x)]=[]),o[String(x)].push(v),i[v])c.includes(k)||c.push(k)}}catch(e){g=!0,h=e}finally{try{!y&&b.return&&b.return()}finally{if(g)throw h}}}}var O=Object.keys(o).sort(function(e,t){var n=parseFloat(e),r=parseFloat(t);return n>r?1:n<r?-1:0});O.forEach(function(e){a.push.apply(o[e])});var E=!0,_=!1,T=void 0;try{for(var M,V=c[Symbol.iterator]();!(E=(M=V.next()).done);E=!0){var q=M.value,N=[],A=Ie(q),L=!0,J=!1,I=void 0;try{for(var j,C=O[Symbol.iterator]();!(L=(j=C.next()).done);L=!0){var P=j.value,z=!0,F=!1,H=void 0;try{for(var R,$=o[P][Symbol.iterator]();!(z=(R=$.next()).done);z=!0){var G=i[R.value];G[A]&&N.push(u(G[A])?G[A]:G[A][0])}}catch(e){F=!0,H=e}finally{try{!z&&$.return&&$.return()}finally{if(F)throw H}}}}catch(e){J=!0,I=e}finally{try{!L&&C.return&&C.return()}finally{if(J)throw I}}if(N.length){var Q=Ke(N,A),D=0;if(Q){var U=!0,Z=!1,Y=void 0;try{for(var X,K=O[Symbol.iterator]();!(U=(X=K.next()).done);U=!0){var ee=X.value,te=!0,ne=!1,re=void 0;try{for(var ie,oe=o[ee][Symbol.iterator]();!(te=(ie=oe.next()).done);te=!0){var ae=i[ie.value][A];ae&&(Array.isArray(ae)&&ae.length>1&&(u(ae[1])||Array.isArray(ae[1]))&&(Q[D].easing=W(ae[1],f.duration||w)),Q[D++].percent=parseFloat(ee)/100)}}catch(e){ne=!0,re=e}finally{try{!te&&oe.return&&oe.return()}finally{if(ne)throw re}}}}catch(e){Z=!0,Y=e}finally{try{!U&&K.return&&K.return()}finally{if(Z)throw Y}}f.tweens[A]=Q}}}}catch(e){_=!0,T=e}finally{try{!E&&V.return&&V.return()}finally{if(_)throw T}}}else console.warn("VelocityJS: Trying to set 'registerSequence' sequence to an invalid value:",r,i);else console.warn("VelocityJS: Trying to set 'registerSequence' name to an invalid value:",r)}}],!0);var nn=void 0;try{nn=Promise}catch(e){}var rn=", if that is deliberate then pass `promiseRejectEmpty:false` as an option";function on(e,t){v(t,"promise",e),v(t,"then",e.then.bind(e)),v(t,"catch",e.catch.bind(e)),e.finally&&v(t,"finally",e.finally.bind(e))}function an(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=ve,y=arguments,g=y[0],m=s(g)&&(g.p||s(g.properties)&&!g.properties.names||u(g.properties)),w=0,b=void 0,S=void 0,x=void 0,k=void 0,O=void 0,E=void 0,_=void 0;a(this)?b=[this]:f(this)?(b=d(this),c(this)&&(k=this.velocity.animations)):m?(b=d(g.elements||g.e),w++):a(g)?(b=d([g]),w++):f(g)&&(b=d(g),w++),b&&(v(b,"velocity",an.bind(b)),k&&v(b.velocity,"animations",k));var T="reverse"===(S=m?p(g.properties,g.p):y[w++]),M=!T&&u(S),V=M&&Te[S],q=m?p(g.options,g.o):y[w];if(s(q)&&(x=q),nn&&p(x&&x.promise,r.promise)&&(O=new nn(function(e,t){_=t,E=function(t){c(t)&&t.promise?(delete t.then,delete t.catch,delete t.finally,e(t),on(t.promise,t)):e(t)}}),b&&on(O,b)),O){var N=x&&x.promiseRejectEmpty,A=p(N,r.promiseRejectEmpty);b||M?S||(A?_("Velocity: No properties supplied"+(i(N)?"":rn)+". Aborting."):E()):A?_("Velocity: No elements supplied"+(i(N)?"":rn)+". Aborting."):E()}if(!b&&!M||!S)return O;if(M){for(var L=[],J=O&&{_promise:O,_resolver:E,_rejecter:_};w<y.length;)L.push(y[w++]);var I=S.replace(/\..*$/,""),j=h[I];if(j){var C=j(L,b,J,S);return void 0!==C?C:b||O}if(!V)return void console.error("VelocityJS: First argument ("+S+") was not a property map, a known action, or a registered redirect. Aborting.")}var P=void 0;if(s(S)||T||V){var z={},$=r.sync;if(O&&(v(z,"_promise",O),v(z,"_rejecter",_),v(z,"_resolver",E)),v(z,"_ready",0),v(z,"_started",0),v(z,"_completed",0),v(z,"_total",0),s(x)){var Y=B(x.duration);P=void 0!==Y,z.duration=p(Y,r.duration),z.delay=p(R(x.delay),r.delay),z.easing=W(p(x.easing,r.easing),z.duration)||W(r.easing,z.duration),z.loop=p(G(x.loop),r.loop),z.repeat=z.repeatAgain=p(D(x.repeat),r.repeat),null!=x.speed&&(z.speed=p(U(x.speed),1)),i(x.promise)&&(z.promise=x.promise),z.queue=p(Q(x.queue),r.queue),x.mobileHA&&!ke.isGingerbread&&(z.mobileHA=!0),!0===x.drag&&(z.drag=!0),(l(x.stagger)||o(x.stagger))&&(z.stagger=x.stagger),T||(null!=x.display&&(S.display=x.display,console.error('Deprecated "options.display" used, this is now a property:',x.display)),null!=x.visibility&&(S.visibility=x.visibility,console.error('Deprecated "options.visibility" used, this is now a property:',x.visibility)));var X=F(x.begin),K=H(x.complete),ee=function(e){if(o(e))return e;null!=e&&console.warn("VelocityJS: Trying to set 'progress' to an invalid value:",e)}(x.progress),te=Z(x.sync);null!=X&&(z.begin=X),null!=K&&(z.complete=K),null!=ee&&(z.progress=ee),null!=te&&($=te)}else if(!m){var ne=0;if(z.duration=B(y[w],!0),void 0===z.duration?z.duration=r.duration:(P=!0,ne++),!o(y[w+ne])){var re=W(y[w+ne],p(z&&B(z.duration),r.duration),!0);void 0!==re&&(ne++,z.easing=re)}var ie=H(y[w+ne],!0);void 0!==ie&&(z.complete=ie),z.delay=r.delay,z.loop=r.loop,z.repeat=z.repeatAgain=r.repeat}if(T&&!1===z.queue)throw new Error("VelocityJS: Cannot reverse a queue:false animation.");!P&&V&&V.duration&&(z.duration=V.duration);var oe={options:z,elements:b,_prev:void 0,_next:void 0,_flags:$?32:0,percentComplete:0,ellapsedTime:0,timeStart:0};k=[];for(var ae=0;ae<b.length;ae++){var le=b[ae],se=0;if(a(le)){if(T){var ue=be(le).lastAnimationList[z.queue];if(!(S=ue&&ue.tweens)){console.error("VelocityJS: Attempting to reverse an animation on an element with no previous animation:",le);continue}se|=64&~(64&ue._flags)}var ce=Object.assign({},oe,{element:le,_flags:oe._flags|se});if(z._total++,k.push(ce),z.stagger)if(o(z.stagger)){var fe=ln(z.stagger,le,ae,b.length,b,"stagger");l(fe)&&(ce.delay=z.delay+fe)}else ce.delay=z.delay+z.stagger*ae;z.drag&&(ce.duration=z.duration-z.duration*Math.max(1-(ae+1)/b.length,.75)),V?tn(ce,V):T?ce.tweens=S:(ce.tweens=Object.create(null),Ze(ce,S)),Ee(le,ce,z.queue)}}!1===ke.isTicking&&pt(!1),k&&v(b.velocity,"animations",k)}return b||O}function ln(e,t,n,r,i,o){try{return e.call(t,n,r,i,o)}catch(e){console.error("VelocityJS: Exception when calling '"+o+"' callback:",e)}}function sn(e,t){try{v(e,(t?"V":"v")+"elocity",an)}catch(e){console.warn("VelocityJS: Error when trying to add prototype.",e)}}var un,cn=an;if(function(e){e.Actions=h,e.Easings=S,e.Sequences=Te,e.State=ke,e.defaults=ve,e.patch=sn,e.debug=!1,e.mock=!1,e.version="2.0.5",e.Velocity=an}(un||(un={})),function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e}}()<=8)throw new Error("VelocityJS cannot run on Internet Explorer 8 or earlier");if(window){var fn=window.jQuery,dn=window.Zepto;sn(window,!0),sn(Element&&Element.prototype),sn(NodeList&&NodeList.prototype),sn(HTMLCollection&&HTMLCollection.prototype),sn(fn,!0),sn(fn&&fn.fn),sn(dn,!0),sn(dn&&dn.fn)}var vn=function(t){if(un.hasOwnProperty(t))switch(void 0===t?"undefined":e(t)){case"number":case"boolean":v(cn,t,{get:function(){return un[t]},set:function(e){un[t]=e}},!0);break;default:v(cn,t,un[t],!0)}};for(var pn in un)vn(pn);return Object.freeze(cn),cn});
/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Vue=t()}(this,function(){"use strict";var e=Object.freeze({});function t(e){return null==e}function n(e){return null!=e}function r(e){return!0===e}function i(e){return"string"==typeof e||"number"==typeof e||"symbol"==typeof e||"boolean"==typeof e}function o(e){return null!==e&&"object"==typeof e}var a=Object.prototype.toString;function s(e){return"[object Object]"===a.call(e)}function c(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function u(e){return n(e)&&"function"==typeof e.then&&"function"==typeof e.catch}function l(e){return null==e?"":Array.isArray(e)||s(e)&&e.toString===a?JSON.stringify(e,null,2):String(e)}function f(e){var t=parseFloat(e);return isNaN(t)?e:t}function p(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}var d=p("slot,component",!0),v=p("key,ref,slot,slot-scope,is");function h(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}var m=Object.prototype.hasOwnProperty;function y(e,t){return m.call(e,t)}function g(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}var _=/-(\w)/g,b=g(function(e){return e.replace(_,function(e,t){return t?t.toUpperCase():""})}),$=g(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),w=/\B([A-Z])/g,C=g(function(e){return e.replace(w,"-$1").toLowerCase()});var x=Function.prototype.bind?function(e,t){return e.bind(t)}:function(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n};function k(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function A(e,t){for(var n in t)e[n]=t[n];return e}function O(e){for(var t={},n=0;n<e.length;n++)e[n]&&A(t,e[n]);return t}function S(e,t,n){}var T=function(e,t,n){return!1},E=function(e){return e};function N(e,t){if(e===t)return!0;var n=o(e),r=o(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var i=Array.isArray(e),a=Array.isArray(t);if(i&&a)return e.length===t.length&&e.every(function(e,n){return N(e,t[n])});if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(i||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return N(e[n],t[n])})}catch(e){return!1}}function j(e,t){for(var n=0;n<e.length;n++)if(N(e[n],t))return n;return-1}function D(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var L="data-server-rendered",M=["component","directive","filter"],I=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],F={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:T,isReservedAttr:T,isUnknownElement:T,getTagNamespace:S,parsePlatformTagName:E,mustUseProp:T,async:!0,_lifecycleHooks:I},P=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function R(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var H=new RegExp("[^"+P.source+".$_\\d]");var B,U="__proto__"in{},z="undefined"!=typeof window,V="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,K=V&&WXEnvironment.platform.toLowerCase(),J=z&&window.navigator.userAgent.toLowerCase(),q=J&&/msie|trident/.test(J),W=J&&J.indexOf("msie 9.0")>0,Z=J&&J.indexOf("edge/")>0,G=(J&&J.indexOf("android"),J&&/iphone|ipad|ipod|ios/.test(J)||"ios"===K),X=(J&&/chrome\/\d+/.test(J),J&&/phantomjs/.test(J),J&&J.match(/firefox\/(\d+)/)),Y={}.watch,Q=!1;if(z)try{var ee={};Object.defineProperty(ee,"passive",{get:function(){Q=!0}}),window.addEventListener("test-passive",null,ee)}catch(e){}var te=function(){return void 0===B&&(B=!z&&!V&&"undefined"!=typeof global&&(global.process&&"server"===global.process.env.VUE_ENV)),B},ne=z&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function re(e){return"function"==typeof e&&/native code/.test(e.toString())}var ie,oe="undefined"!=typeof Symbol&&re(Symbol)&&"undefined"!=typeof Reflect&&re(Reflect.ownKeys);ie="undefined"!=typeof Set&&re(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var ae=S,se=0,ce=function(){this.id=se++,this.subs=[]};ce.prototype.addSub=function(e){this.subs.push(e)},ce.prototype.removeSub=function(e){h(this.subs,e)},ce.prototype.depend=function(){ce.target&&ce.target.addDep(this)},ce.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},ce.target=null;var ue=[];function le(e){ue.push(e),ce.target=e}function fe(){ue.pop(),ce.target=ue[ue.length-1]}var pe=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},de={child:{configurable:!0}};de.child.get=function(){return this.componentInstance},Object.defineProperties(pe.prototype,de);var ve=function(e){void 0===e&&(e="");var t=new pe;return t.text=e,t.isComment=!0,t};function he(e){return new pe(void 0,void 0,void 0,String(e))}function me(e){var t=new pe(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}var ye=Array.prototype,ge=Object.create(ye);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=ye[e];R(ge,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var _e=Object.getOwnPropertyNames(ge),be=!0;function $e(e){be=e}var we=function(e){var t;this.value=e,this.dep=new ce,this.vmCount=0,R(e,"__ob__",this),Array.isArray(e)?(U?(t=ge,e.__proto__=t):function(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];R(e,o,t[o])}}(e,ge,_e),this.observeArray(e)):this.walk(e)};function Ce(e,t){var n;if(o(e)&&!(e instanceof pe))return y(e,"__ob__")&&e.__ob__ instanceof we?n=e.__ob__:be&&!te()&&(Array.isArray(e)||s(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new we(e)),t&&n&&n.vmCount++,n}function xe(e,t,n,r,i){var o=new ce,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set;s&&!c||2!==arguments.length||(n=e[t]);var u=!i&&Ce(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return ce.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&function e(t){for(var n=void 0,r=0,i=t.length;r<i;r++)(n=t[r])&&n.__ob__&&n.__ob__.dep.depend(),Array.isArray(n)&&e(n)}(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!=t&&r!=r||s&&!c||(c?c.call(e,t):n=t,u=!i&&Ce(t),o.notify())}})}}function ke(e,t,n){if(Array.isArray(e)&&c(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(xe(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function Ae(e,t){if(Array.isArray(e)&&c(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||y(e,t)&&(delete e[t],n&&n.dep.notify())}}we.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)xe(e,t[n])},we.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)Ce(e[t])};var Oe=F.optionMergeStrategies;function Se(e,t){if(!t)return e;for(var n,r,i,o=oe?Reflect.ownKeys(t):Object.keys(t),a=0;a<o.length;a++)"__ob__"!==(n=o[a])&&(r=e[n],i=t[n],y(e,n)?r!==i&&s(r)&&s(i)&&Se(r,i):ke(e,n,i));return e}function Te(e,t,n){return n?function(){var r="function"==typeof t?t.call(n,n):t,i="function"==typeof e?e.call(n,n):e;return r?Se(r,i):i}:t?e?function(){return Se("function"==typeof t?t.call(this,this):t,"function"==typeof e?e.call(this,this):e)}:t:e}function Ee(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n):n}function Ne(e,t,n,r){var i=Object.create(e||null);return t?A(i,t):i}Oe.data=function(e,t,n){return n?Te(e,t,n):t&&"function"!=typeof t?e:Te(e,t)},I.forEach(function(e){Oe[e]=Ee}),M.forEach(function(e){Oe[e+"s"]=Ne}),Oe.watch=function(e,t,n,r){if(e===Y&&(e=void 0),t===Y&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};for(var o in A(i,e),t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},Oe.props=Oe.methods=Oe.inject=Oe.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return A(i,e),t&&A(i,t),i},Oe.provide=Te;var je=function(e,t){return void 0===t?e:t};function De(e,t,n){if("function"==typeof t&&(t=t.options),function(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[b(i)]={type:null});else if(s(n))for(var a in n)i=n[a],o[b(a)]=s(i)?i:{type:i};e.props=o}}(t),function(e,t){var n=e.inject;if(n){var r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(s(n))for(var o in n){var a=n[o];r[o]=s(a)?A({from:o},a):{from:a}}}}(t),function(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}(t),!t._base&&(t.extends&&(e=De(e,t.extends,n)),t.mixins))for(var r=0,i=t.mixins.length;r<i;r++)e=De(e,t.mixins[r],n);var o,a={};for(o in e)c(o);for(o in t)y(e,o)||c(o);function c(r){var i=Oe[r]||je;a[r]=i(e[r],t[r],n,r)}return a}function Le(e,t,n,r){if("string"==typeof n){var i=e[t];if(y(i,n))return i[n];var o=b(n);if(y(i,o))return i[o];var a=$(o);return y(i,a)?i[a]:i[n]||i[o]||i[a]}}function Me(e,t,n,r){var i=t[e],o=!y(n,e),a=n[e],s=Pe(Boolean,i.type);if(s>-1)if(o&&!y(i,"default"))a=!1;else if(""===a||a===C(e)){var c=Pe(String,i.type);(c<0||s<c)&&(a=!0)}if(void 0===a){a=function(e,t,n){if(!y(t,"default"))return;var r=t.default;if(e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n])return e._props[n];return"function"==typeof r&&"Function"!==Ie(t.type)?r.call(e):r}(r,i,e);var u=be;$e(!0),Ce(a),$e(u)}return a}function Ie(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function Fe(e,t){return Ie(e)===Ie(t)}function Pe(e,t){if(!Array.isArray(t))return Fe(t,e)?0:-1;for(var n=0,r=t.length;n<r;n++)if(Fe(t[n],e))return n;return-1}function Re(e,t,n){le();try{if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){Be(e,r,"errorCaptured hook")}}Be(e,t,n)}finally{fe()}}function He(e,t,n,r,i){var o;try{(o=n?e.apply(t,n):e.call(t))&&!o._isVue&&u(o)&&!o._handled&&(o.catch(function(e){return Re(e,r,i+" (Promise/async)")}),o._handled=!0)}catch(e){Re(e,r,i)}return o}function Be(e,t,n){if(F.errorHandler)try{return F.errorHandler.call(null,e,t,n)}catch(t){t!==e&&Ue(t,null,"config.errorHandler")}Ue(e,t,n)}function Ue(e,t,n){if(!z&&!V||"undefined"==typeof console)throw e;console.error(e)}var ze,Ve=!1,Ke=[],Je=!1;function qe(){Je=!1;var e=Ke.slice(0);Ke.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!=typeof Promise&&re(Promise)){var We=Promise.resolve();ze=function(){We.then(qe),G&&setTimeout(S)},Ve=!0}else if(q||"undefined"==typeof MutationObserver||!re(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())ze="undefined"!=typeof setImmediate&&re(setImmediate)?function(){setImmediate(qe)}:function(){setTimeout(qe,0)};else{var Ze=1,Ge=new MutationObserver(qe),Xe=document.createTextNode(String(Ze));Ge.observe(Xe,{characterData:!0}),ze=function(){Ze=(Ze+1)%2,Xe.data=String(Ze)},Ve=!0}function Ye(e,t){var n;if(Ke.push(function(){if(e)try{e.call(t)}catch(e){Re(e,t,"nextTick")}else n&&n(t)}),Je||(Je=!0,ze()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}var Qe=new ie;function et(e){!function e(t,n){var r,i;var a=Array.isArray(t);if(!a&&!o(t)||Object.isFrozen(t)||t instanceof pe)return;if(t.__ob__){var s=t.__ob__.dep.id;if(n.has(s))return;n.add(s)}if(a)for(r=t.length;r--;)e(t[r],n);else for(i=Object.keys(t),r=i.length;r--;)e(t[i[r]],n)}(e,Qe),Qe.clear()}var tt=g(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return{name:e=r?e.slice(1):e,once:n,capture:r,passive:t}});function nt(e,t){function n(){var e=arguments,r=n.fns;if(!Array.isArray(r))return He(r,null,arguments,t,"v-on handler");for(var i=r.slice(),o=0;o<i.length;o++)He(i[o],null,e,t,"v-on handler")}return n.fns=e,n}function rt(e,n,i,o,a,s){var c,u,l,f;for(c in e)u=e[c],l=n[c],f=tt(c),t(u)||(t(l)?(t(u.fns)&&(u=e[c]=nt(u,s)),r(f.once)&&(u=e[c]=a(f.name,u,f.capture)),i(f.name,u,f.capture,f.passive,f.params)):u!==l&&(l.fns=u,e[c]=l));for(c in n)t(e[c])&&o((f=tt(c)).name,n[c],f.capture)}function it(e,i,o){var a;e instanceof pe&&(e=e.data.hook||(e.data.hook={}));var s=e[i];function c(){o.apply(this,arguments),h(a.fns,c)}t(s)?a=nt([c]):n(s.fns)&&r(s.merged)?(a=s).fns.push(c):a=nt([s,c]),a.merged=!0,e[i]=a}function ot(e,t,r,i,o){if(n(t)){if(y(t,r))return e[r]=t[r],o||delete t[r],!0;if(y(t,i))return e[r]=t[i],o||delete t[i],!0}return!1}function at(e){return i(e)?[he(e)]:Array.isArray(e)?function e(o,a){var s=[];var c,u,l,f;for(c=0;c<o.length;c++)t(u=o[c])||"boolean"==typeof u||(l=s.length-1,f=s[l],Array.isArray(u)?u.length>0&&(st((u=e(u,(a||"")+"_"+c))[0])&&st(f)&&(s[l]=he(f.text+u[0].text),u.shift()),s.push.apply(s,u)):i(u)?st(f)?s[l]=he(f.text+u):""!==u&&s.push(he(u)):st(u)&&st(f)?s[l]=he(f.text+u.text):(r(o._isVList)&&n(u.tag)&&t(u.key)&&n(a)&&(u.key="__vlist"+a+"_"+c+"__"),s.push(u)));return s}(e):void 0}function st(e){return n(e)&&n(e.text)&&!1===e.isComment}function ct(e,t){if(e){for(var n=Object.create(null),r=oe?Reflect.ownKeys(e):Object.keys(e),i=0;i<r.length;i++){var o=r[i];if("__ob__"!==o){for(var a=e[o].from,s=t;s;){if(s._provided&&y(s._provided,a)){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}}return n}}function ut(e,t){if(!e||!e.length)return{};for(var n={},r=0,i=e.length;r<i;r++){var o=e[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==t&&o.fnContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children||[]):c.push(o)}}for(var u in n)n[u].every(lt)&&delete n[u];return n}function lt(e){return e.isComment&&!e.asyncFactory||" "===e.text}function ft(t,n,r){var i,o=Object.keys(n).length>0,a=t?!!t.$stable:!o,s=t&&t.$key;if(t){if(t._normalized)return t._normalized;if(a&&r&&r!==e&&s===r.$key&&!o&&!r.$hasNormal)return r;for(var c in i={},t)t[c]&&"$"!==c[0]&&(i[c]=pt(n,c,t[c]))}else i={};for(var u in n)u in i||(i[u]=dt(n,u));return t&&Object.isExtensible(t)&&(t._normalized=i),R(i,"$stable",a),R(i,"$key",s),R(i,"$hasNormal",o),i}function pt(e,t,n){var r=function(){var e=arguments.length?n.apply(null,arguments):n({});return(e=e&&"object"==typeof e&&!Array.isArray(e)?[e]:at(e))&&(0===e.length||1===e.length&&e[0].isComment)?void 0:e};return n.proxy&&Object.defineProperty(e,t,{get:r,enumerable:!0,configurable:!0}),r}function dt(e,t){return function(){return e[t]}}function vt(e,t){var r,i,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),i=0,a=e.length;i<a;i++)r[i]=t(e[i],i);else if("number"==typeof e)for(r=new Array(e),i=0;i<e;i++)r[i]=t(i+1,i);else if(o(e))if(oe&&e[Symbol.iterator]){r=[];for(var u=e[Symbol.iterator](),l=u.next();!l.done;)r.push(t(l.value,r.length)),l=u.next()}else for(s=Object.keys(e),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=t(e[c],c,i);return n(r)||(r=[]),r._isVList=!0,r}function ht(e,t,n,r){var i,o=this.$scopedSlots[e];o?(n=n||{},r&&(n=A(A({},r),n)),i=o(n)||t):i=this.$slots[e]||t;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},i):i}function mt(e){return Le(this.$options,"filters",e)||E}function yt(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function gt(e,t,n,r,i){var o=F.keyCodes[t]||n;return i&&r&&!F.keyCodes[t]?yt(i,r):o?yt(o,e):r?C(r)!==t:void 0}function _t(e,t,n,r,i){if(n)if(o(n)){var a;Array.isArray(n)&&(n=O(n));var s=function(o){if("class"===o||"style"===o||v(o))a=e;else{var s=e.attrs&&e.attrs.type;a=r||F.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var c=b(o),u=C(o);c in a||u in a||(a[o]=n[o],i&&((e.on||(e.on={}))["update:"+o]=function(e){n[o]=e}))};for(var c in n)s(c)}else;return e}function bt(e,t){var n=this._staticTrees||(this._staticTrees=[]),r=n[e];return r&&!t?r:(wt(r=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),"__static__"+e,!1),r)}function $t(e,t,n){return wt(e,"__once__"+t+(n?"_"+n:""),!0),e}function wt(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&Ct(e[r],t+"_"+r,n);else Ct(e,t,n)}function Ct(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function xt(e,t){if(t)if(s(t)){var n=e.on=e.on?A({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function kt(e,t,n,r){t=t||{$stable:!n};for(var i=0;i<e.length;i++){var o=e[i];Array.isArray(o)?kt(o,t,n):o&&(o.proxy&&(o.fn.proxy=!0),t[o.key]=o.fn)}return r&&(t.$key=r),t}function At(e,t){for(var n=0;n<t.length;n+=2){var r=t[n];"string"==typeof r&&r&&(e[t[n]]=t[n+1])}return e}function Ot(e,t){return"string"==typeof e?t+e:e}function St(e){e._o=$t,e._n=f,e._s=l,e._l=vt,e._t=ht,e._q=N,e._i=j,e._m=bt,e._f=mt,e._k=gt,e._b=_t,e._v=he,e._e=ve,e._u=kt,e._g=xt,e._d=At,e._p=Ot}function Tt(t,n,i,o,a){var s,c=this,u=a.options;y(o,"_uid")?(s=Object.create(o))._original=o:(s=o,o=o._original);var l=r(u._compiled),f=!l;this.data=t,this.props=n,this.children=i,this.parent=o,this.listeners=t.on||e,this.injections=ct(u.inject,o),this.slots=function(){return c.$slots||ft(t.scopedSlots,c.$slots=ut(i,o)),c.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return ft(t.scopedSlots,this.slots())}}),l&&(this.$options=u,this.$slots=this.slots(),this.$scopedSlots=ft(t.scopedSlots,this.$slots)),u._scopeId?this._c=function(e,t,n,r){var i=Pt(s,e,t,n,r,f);return i&&!Array.isArray(i)&&(i.fnScopeId=u._scopeId,i.fnContext=o),i}:this._c=function(e,t,n,r){return Pt(s,e,t,n,r,f)}}function Et(e,t,n,r,i){var o=me(e);return o.fnContext=n,o.fnOptions=r,t.slot&&((o.data||(o.data={})).slot=t.slot),o}function Nt(e,t){for(var n in t)e[b(n)]=t[n]}St(Tt.prototype);var jt={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed&&e.data.keepAlive){var r=e;jt.prepatch(r,r)}else{(e.componentInstance=function(e,t){var r={_isComponent:!0,_parentVnode:e,parent:t},i=e.data.inlineTemplate;n(i)&&(r.render=i.render,r.staticRenderFns=i.staticRenderFns);return new e.componentOptions.Ctor(r)}(e,Wt)).$mount(t?e.elm:void 0,t)}},prepatch:function(t,n){var r=n.componentOptions;!function(t,n,r,i,o){var a=i.data.scopedSlots,s=t.$scopedSlots,c=!!(a&&!a.$stable||s!==e&&!s.$stable||a&&t.$scopedSlots.$key!==a.$key),u=!!(o||t.$options._renderChildren||c);t.$options._parentVnode=i,t.$vnode=i,t._vnode&&(t._vnode.parent=i);if(t.$options._renderChildren=o,t.$attrs=i.data.attrs||e,t.$listeners=r||e,n&&t.$options.props){$e(!1);for(var l=t._props,f=t.$options._propKeys||[],p=0;p<f.length;p++){var d=f[p],v=t.$options.props;l[d]=Me(d,v,n,t)}$e(!0),t.$options.propsData=n}r=r||e;var h=t.$options._parentListeners;t.$options._parentListeners=r,qt(t,r,h),u&&(t.$slots=ut(o,i.context),t.$forceUpdate())}(n.componentInstance=t.componentInstance,r.propsData,r.listeners,n,r.children)},insert:function(e){var t,n=e.context,r=e.componentInstance;r._isMounted||(r._isMounted=!0,Yt(r,"mounted")),e.data.keepAlive&&(n._isMounted?((t=r)._inactive=!1,en.push(t)):Xt(r,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?function e(t,n){if(n&&(t._directInactive=!0,Gt(t)))return;if(!t._inactive){t._inactive=!0;for(var r=0;r<t.$children.length;r++)e(t.$children[r]);Yt(t,"deactivated")}}(t,!0):t.$destroy())}},Dt=Object.keys(jt);function Lt(i,a,s,c,l){if(!t(i)){var f=s.$options._base;if(o(i)&&(i=f.extend(i)),"function"==typeof i){var p;if(t(i.cid)&&void 0===(i=function(e,i){if(r(e.error)&&n(e.errorComp))return e.errorComp;if(n(e.resolved))return e.resolved;var a=Ht;a&&n(e.owners)&&-1===e.owners.indexOf(a)&&e.owners.push(a);if(r(e.loading)&&n(e.loadingComp))return e.loadingComp;if(a&&!n(e.owners)){var s=e.owners=[a],c=!0,l=null,f=null;a.$on("hook:destroyed",function(){return h(s,a)});var p=function(e){for(var t=0,n=s.length;t<n;t++)s[t].$forceUpdate();e&&(s.length=0,null!==l&&(clearTimeout(l),l=null),null!==f&&(clearTimeout(f),f=null))},d=D(function(t){e.resolved=Bt(t,i),c?s.length=0:p(!0)}),v=D(function(t){n(e.errorComp)&&(e.error=!0,p(!0))}),m=e(d,v);return o(m)&&(u(m)?t(e.resolved)&&m.then(d,v):u(m.component)&&(m.component.then(d,v),n(m.error)&&(e.errorComp=Bt(m.error,i)),n(m.loading)&&(e.loadingComp=Bt(m.loading,i),0===m.delay?e.loading=!0:l=setTimeout(function(){l=null,t(e.resolved)&&t(e.error)&&(e.loading=!0,p(!1))},m.delay||200)),n(m.timeout)&&(f=setTimeout(function(){f=null,t(e.resolved)&&v(null)},m.timeout)))),c=!1,e.loading?e.loadingComp:e.resolved}}(p=i,f)))return function(e,t,n,r,i){var o=ve();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}(p,a,s,c,l);a=a||{},$n(i),n(a.model)&&function(e,t){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[r]=t.model.value;var o=t.on||(t.on={}),a=o[i],s=t.model.callback;n(a)?(Array.isArray(a)?-1===a.indexOf(s):a!==s)&&(o[i]=[s].concat(a)):o[i]=s}(i.options,a);var d=function(e,r,i){var o=r.options.props;if(!t(o)){var a={},s=e.attrs,c=e.props;if(n(s)||n(c))for(var u in o){var l=C(u);ot(a,c,u,l,!0)||ot(a,s,u,l,!1)}return a}}(a,i);if(r(i.options.functional))return function(t,r,i,o,a){var s=t.options,c={},u=s.props;if(n(u))for(var l in u)c[l]=Me(l,u,r||e);else n(i.attrs)&&Nt(c,i.attrs),n(i.props)&&Nt(c,i.props);var f=new Tt(i,c,a,o,t),p=s.render.call(null,f._c,f);if(p instanceof pe)return Et(p,i,f.parent,s);if(Array.isArray(p)){for(var d=at(p)||[],v=new Array(d.length),h=0;h<d.length;h++)v[h]=Et(d[h],i,f.parent,s);return v}}(i,d,a,s,c);var v=a.on;if(a.on=a.nativeOn,r(i.options.abstract)){var m=a.slot;a={},m&&(a.slot=m)}!function(e){for(var t=e.hook||(e.hook={}),n=0;n<Dt.length;n++){var r=Dt[n],i=t[r],o=jt[r];i===o||i&&i._merged||(t[r]=i?Mt(o,i):o)}}(a);var y=i.options.name||l;return new pe("vue-component-"+i.cid+(y?"-"+y:""),a,void 0,void 0,void 0,s,{Ctor:i,propsData:d,listeners:v,tag:l,children:c},p)}}}function Mt(e,t){var n=function(n,r){e(n,r),t(n,r)};return n._merged=!0,n}var It=1,Ft=2;function Pt(e,a,s,c,u,l){return(Array.isArray(s)||i(s))&&(u=c,c=s,s=void 0),r(l)&&(u=Ft),function(e,i,a,s,c){if(n(a)&&n(a.__ob__))return ve();n(a)&&n(a.is)&&(i=a.is);if(!i)return ve();Array.isArray(s)&&"function"==typeof s[0]&&((a=a||{}).scopedSlots={default:s[0]},s.length=0);c===Ft?s=at(s):c===It&&(s=function(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}(s));var u,l;if("string"==typeof i){var f;l=e.$vnode&&e.$vnode.ns||F.getTagNamespace(i),u=F.isReservedTag(i)?new pe(F.parsePlatformTagName(i),a,s,void 0,void 0,e):a&&a.pre||!n(f=Le(e.$options,"components",i))?new pe(i,a,s,void 0,void 0,e):Lt(f,a,e,s,i)}else u=Lt(i,a,e,s);return Array.isArray(u)?u:n(u)?(n(l)&&function e(i,o,a){i.ns=o;"foreignObject"===i.tag&&(o=void 0,a=!0);if(n(i.children))for(var s=0,c=i.children.length;s<c;s++){var u=i.children[s];n(u.tag)&&(t(u.ns)||r(a)&&"svg"!==u.tag)&&e(u,o,a)}}(u,l),n(a)&&function(e){o(e.style)&&et(e.style);o(e.class)&&et(e.class)}(a),u):ve()}(e,a,s,c,u)}var Rt,Ht=null;function Bt(e,t){return(e.__esModule||oe&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function Ut(e){return e.isComment&&e.asyncFactory}function zt(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var r=e[t];if(n(r)&&(n(r.componentOptions)||Ut(r)))return r}}function Vt(e,t){Rt.$on(e,t)}function Kt(e,t){Rt.$off(e,t)}function Jt(e,t){var n=Rt;return function r(){null!==t.apply(null,arguments)&&n.$off(e,r)}}function qt(e,t,n){Rt=e,rt(t,n||{},Vt,Kt,Jt,e),Rt=void 0}var Wt=null;function Zt(e){var t=Wt;return Wt=e,function(){Wt=t}}function Gt(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function Xt(e,t){if(t){if(e._directInactive=!1,Gt(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Xt(e.$children[n]);Yt(e,"activated")}}function Yt(e,t){le();var n=e.$options[t],r=t+" hook";if(n)for(var i=0,o=n.length;i<o;i++)He(n[i],e,null,e,r);e._hasHookEvent&&e.$emit("hook:"+t),fe()}var Qt=[],en=[],tn={},nn=!1,rn=!1,on=0;var an=0,sn=Date.now;if(z&&!q){var cn=window.performance;cn&&"function"==typeof cn.now&&sn()>document.createEvent("Event").timeStamp&&(sn=function(){return cn.now()})}function un(){var e,t;for(an=sn(),rn=!0,Qt.sort(function(e,t){return e.id-t.id}),on=0;on<Qt.length;on++)(e=Qt[on]).before&&e.before(),t=e.id,tn[t]=null,e.run();var n=en.slice(),r=Qt.slice();on=Qt.length=en.length=0,tn={},nn=rn=!1,function(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Xt(e[t],!0)}(n),function(e){var t=e.length;for(;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&Yt(r,"updated")}}(r),ne&&F.devtools&&ne.emit("flush")}var ln=0,fn=function(e,t,n,r,i){this.vm=e,i&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++ln,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ie,this.newDepIds=new ie,this.expression="","function"==typeof t?this.getter=t:(this.getter=function(e){if(!H.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}(t),this.getter||(this.getter=S)),this.value=this.lazy?void 0:this.get()};fn.prototype.get=function(){var e;le(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Re(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&et(e),fe(),this.cleanupDeps()}return e},fn.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},fn.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},fn.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(e){var t=e.id;if(null==tn[t]){if(tn[t]=!0,rn){for(var n=Qt.length-1;n>on&&Qt[n].id>e.id;)n--;Qt.splice(n+1,0,e)}else Qt.push(e);nn||(nn=!0,Ye(un))}}(this)},fn.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Re(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},fn.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},fn.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},fn.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||h(this.vm._watchers,this);for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1}};var pn={enumerable:!0,configurable:!0,get:S,set:S};function dn(e,t,n){pn.get=function(){return this[t][n]},pn.set=function(e){this[t][n]=e},Object.defineProperty(e,n,pn)}function vn(e){e._watchers=[];var t=e.$options;t.props&&function(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[];e.$parent&&$e(!1);var o=function(o){i.push(o);var a=Me(o,t,n,e);xe(r,o,a),o in e||dn(e,"_props",o)};for(var a in t)o(a);$e(!0)}(e,t.props),t.methods&&function(e,t){e.$options.props;for(var n in t)e[n]="function"!=typeof t[n]?S:x(t[n],e)}(e,t.methods),t.data?function(e){var t=e.$options.data;s(t=e._data="function"==typeof t?function(e,t){le();try{return e.call(t,t)}catch(e){return Re(e,t,"data()"),{}}finally{fe()}}(t,e):t||{})||(t={});var n=Object.keys(t),r=e.$options.props,i=(e.$options.methods,n.length);for(;i--;){var o=n[i];r&&y(r,o)||(a=void 0,36!==(a=(o+"").charCodeAt(0))&&95!==a&&dn(e,"_data",o))}var a;Ce(t,!0)}(e):Ce(e._data={},!0),t.computed&&function(e,t){var n=e._computedWatchers=Object.create(null),r=te();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new fn(e,a||S,S,hn)),i in e||mn(e,i,o)}}(e,t.computed),t.watch&&t.watch!==Y&&function(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)_n(e,n,r[i]);else _n(e,n,r)}}(e,t.watch)}var hn={lazy:!0};function mn(e,t,n){var r=!te();"function"==typeof n?(pn.get=r?yn(t):gn(n),pn.set=S):(pn.get=n.get?r&&!1!==n.cache?yn(t):gn(n.get):S,pn.set=n.set||S),Object.defineProperty(e,t,pn)}function yn(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),ce.target&&t.depend(),t.value}}function gn(e){return function(){return e.call(this,this)}}function _n(e,t,n,r){return s(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}var bn=0;function $n(e){var t=e.options;if(e.super){var n=$n(e.super);if(n!==e.superOptions){e.superOptions=n;var r=function(e){var t,n=e.options,r=e.sealedOptions;for(var i in n)n[i]!==r[i]&&(t||(t={}),t[i]=n[i]);return t}(e);r&&A(e.extendOptions,r),(t=e.options=De(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function wn(e){this._init(e)}function Cn(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return(a.prototype=Object.create(n.prototype)).constructor=a,a.cid=t++,a.options=De(n.options,e),a.super=n,a.options.props&&function(e){var t=e.options.props;for(var n in t)dn(e.prototype,"_props",n)}(a),a.options.computed&&function(e){var t=e.options.computed;for(var n in t)mn(e.prototype,n,t[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,M.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=A({},a.options),i[r]=a,a}}function xn(e){return e&&(e.Ctor.options.name||e.tag)}function kn(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:(n=e,"[object RegExp]"===a.call(n)&&e.test(t));var n}function An(e,t){var n=e.cache,r=e.keys,i=e._vnode;for(var o in n){var a=n[o];if(a){var s=xn(a.componentOptions);s&&!t(s)&&On(n,o,r,i)}}}function On(e,t,n,r){var i=e[t];!i||r&&i.tag===r.tag||i.componentInstance.$destroy(),e[t]=null,h(n,t)}!function(t){t.prototype._init=function(t){var n=this;n._uid=bn++,n._isVue=!0,t&&t._isComponent?function(e,t){var n=e.$options=Object.create(e.constructor.options),r=t._parentVnode;n.parent=t.parent,n._parentVnode=r;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}(n,t):n.$options=De($n(n.constructor),t||{},n),n._renderProxy=n,n._self=n,function(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}(n),function(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&qt(e,t)}(n),function(t){t._vnode=null,t._staticTrees=null;var n=t.$options,r=t.$vnode=n._parentVnode,i=r&&r.context;t.$slots=ut(n._renderChildren,i),t.$scopedSlots=e,t._c=function(e,n,r,i){return Pt(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return Pt(t,e,n,r,i,!0)};var o=r&&r.data;xe(t,"$attrs",o&&o.attrs||e,null,!0),xe(t,"$listeners",n._parentListeners||e,null,!0)}(n),Yt(n,"beforeCreate"),function(e){var t=ct(e.$options.inject,e);t&&($e(!1),Object.keys(t).forEach(function(n){xe(e,n,t[n])}),$e(!0))}(n),vn(n),function(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}(n),Yt(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}(wn),function(e){var t={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=ke,e.prototype.$delete=Ae,e.prototype.$watch=function(e,t,n){if(s(t))return _n(this,e,t,n);(n=n||{}).user=!0;var r=new fn(this,e,t,n);if(n.immediate)try{t.call(this,r.value)}catch(e){Re(e,this,'callback for immediate watcher "'+r.expression+'"')}return function(){r.teardown()}}}(wn),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this;if(Array.isArray(e))for(var i=0,o=e.length;i<o;i++)r.$on(e[i],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){var n=this;function r(){n.$off(e,r),t.apply(n,arguments)}return r.fn=t,n.$on(e,r),n},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(e)){for(var r=0,i=e.length;r<i;r++)n.$off(e[r],t);return n}var o,a=n._events[e];if(!a)return n;if(!t)return n._events[e]=null,n;for(var s=a.length;s--;)if((o=a[s])===t||o.fn===t){a.splice(s,1);break}return n},e.prototype.$emit=function(e){var t=this._events[e];if(t){t=t.length>1?k(t):t;for(var n=k(arguments,1),r='event handler for "'+e+'"',i=0,o=t.length;i<o;i++)He(t[i],this,n,this,r)}return this}}(wn),function(e){e.prototype._update=function(e,t){var n=this,r=n.$el,i=n._vnode,o=Zt(n);n._vnode=e,n.$el=i?n.__patch__(i,e):n.__patch__(n.$el,e,t,!1),o(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Yt(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||h(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Yt(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(wn),function(e){St(e.prototype),e.prototype.$nextTick=function(e){return Ye(e,this)},e.prototype._render=function(){var e,t=this,n=t.$options,r=n.render,i=n._parentVnode;i&&(t.$scopedSlots=ft(i.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=i;try{Ht=t,e=r.call(t._renderProxy,t.$createElement)}catch(n){Re(n,t,"render"),e=t._vnode}finally{Ht=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof pe||(e=ve()),e.parent=i,e}}(wn);var Sn=[String,RegExp,Array],Tn={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Sn,exclude:Sn,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var e in this.cache)On(this.cache,e,this.keys)},mounted:function(){var e=this;this.$watch("include",function(t){An(e,function(e){return kn(t,e)})}),this.$watch("exclude",function(t){An(e,function(e){return!kn(t,e)})})},render:function(){var e=this.$slots.default,t=zt(e),n=t&&t.componentOptions;if(n){var r=xn(n),i=this.include,o=this.exclude;if(i&&(!r||!kn(i,r))||o&&r&&kn(o,r))return t;var a=this.cache,s=this.keys,c=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;a[c]?(t.componentInstance=a[c].componentInstance,h(s,c),s.push(c)):(a[c]=t,s.push(c),this.max&&s.length>parseInt(this.max)&&On(a,s[0],s,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}}};!function(e){var t={get:function(){return F}};Object.defineProperty(e,"config",t),e.util={warn:ae,extend:A,mergeOptions:De,defineReactive:xe},e.set=ke,e.delete=Ae,e.nextTick=Ye,e.observable=function(e){return Ce(e),e},e.options=Object.create(null),M.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,A(e.options.components,Tn),function(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=k(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}(e),function(e){e.mixin=function(e){return this.options=De(this.options,e),this}}(e),Cn(e),function(e){M.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&s(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}(e)}(wn),Object.defineProperty(wn.prototype,"$isServer",{get:te}),Object.defineProperty(wn.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(wn,"FunctionalRenderContext",{value:Tt}),wn.version="2.6.11";var En=p("style,class"),Nn=p("input,textarea,option,select,progress"),jn=function(e,t,n){return"value"===n&&Nn(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},Dn=p("contenteditable,draggable,spellcheck"),Ln=p("events,caret,typing,plaintext-only"),Mn=function(e,t){return Hn(t)||"false"===t?"false":"contenteditable"===e&&Ln(t)?t:"true"},In=p("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),Fn="http://www.w3.org/1999/xlink",Pn=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},Rn=function(e){return Pn(e)?e.slice(6,e.length):""},Hn=function(e){return null==e||!1===e};function Bn(e){for(var t=e.data,r=e,i=e;n(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(t=Un(i.data,t));for(;n(r=r.parent);)r&&r.data&&(t=Un(t,r.data));return function(e,t){if(n(e)||n(t))return zn(e,Vn(t));return""}(t.staticClass,t.class)}function Un(e,t){return{staticClass:zn(e.staticClass,t.staticClass),class:n(e.class)?[e.class,t.class]:t.class}}function zn(e,t){return e?t?e+" "+t:e:t||""}function Vn(e){return Array.isArray(e)?function(e){for(var t,r="",i=0,o=e.length;i<o;i++)n(t=Vn(e[i]))&&""!==t&&(r&&(r+=" "),r+=t);return r}(e):o(e)?function(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}(e):"string"==typeof e?e:""}var Kn={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Jn=p("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),qn=p("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Wn=function(e){return Jn(e)||qn(e)};function Zn(e){return qn(e)?"svg":"math"===e?"math":void 0}var Gn=Object.create(null);var Xn=p("text,number,password,search,email,tel,url");function Yn(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}var Qn=Object.freeze({createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(Kn[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setStyleScope:function(e,t){e.setAttribute(t,"")}}),er={create:function(e,t){tr(t)},update:function(e,t){e.data.ref!==t.data.ref&&(tr(e,!0),tr(t))},destroy:function(e){tr(e,!0)}};function tr(e,t){var r=e.data.ref;if(n(r)){var i=e.context,o=e.componentInstance||e.elm,a=i.$refs;t?Array.isArray(a[r])?h(a[r],o):a[r]===o&&(a[r]=void 0):e.data.refInFor?Array.isArray(a[r])?a[r].indexOf(o)<0&&a[r].push(o):a[r]=[o]:a[r]=o}}var nr=new pe("",{},[]),rr=["create","activate","update","remove","destroy"];function ir(e,i){return e.key===i.key&&(e.tag===i.tag&&e.isComment===i.isComment&&n(e.data)===n(i.data)&&function(e,t){if("input"!==e.tag)return!0;var r,i=n(r=e.data)&&n(r=r.attrs)&&r.type,o=n(r=t.data)&&n(r=r.attrs)&&r.type;return i===o||Xn(i)&&Xn(o)}(e,i)||r(e.isAsyncPlaceholder)&&e.asyncFactory===i.asyncFactory&&t(i.asyncFactory.error))}function or(e,t,r){var i,o,a={};for(i=t;i<=r;++i)n(o=e[i].key)&&(a[o]=i);return a}var ar={create:sr,update:sr,destroy:function(e){sr(e,nr)}};function sr(e,t){(e.data.directives||t.data.directives)&&function(e,t){var n,r,i,o=e===nr,a=t===nr,s=ur(e.data.directives,e.context),c=ur(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,i.oldArg=r.arg,fr(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(fr(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)fr(u[n],"inserted",t,e)};o?it(t,"insert",f):f()}l.length&&it(t,"postpatch",function(){for(var n=0;n<l.length;n++)fr(l[n],"componentUpdated",t,e)});if(!o)for(n in s)c[n]||fr(s[n],"unbind",e,e,a)}(e,t)}var cr=Object.create(null);function ur(e,t){var n,r,i=Object.create(null);if(!e)return i;for(n=0;n<e.length;n++)(r=e[n]).modifiers||(r.modifiers=cr),i[lr(r)]=r,r.def=Le(t.$options,"directives",r.name);return i}function lr(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function fr(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){Re(r,n.context,"directive "+e.name+" "+t+" hook")}}var pr=[er,ar];function dr(e,r){var i=r.componentOptions;if(!(n(i)&&!1===i.Ctor.options.inheritAttrs||t(e.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=e.data.attrs||{},u=r.data.attrs||{};for(o in n(u.__ob__)&&(u=r.data.attrs=A({},u)),u)a=u[o],c[o]!==a&&vr(s,o,a);for(o in(q||Z)&&u.value!==c.value&&vr(s,"value",u.value),c)t(u[o])&&(Pn(o)?s.removeAttributeNS(Fn,Rn(o)):Dn(o)||s.removeAttribute(o))}}function vr(e,t,n){e.tagName.indexOf("-")>-1?hr(e,t,n):In(t)?Hn(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n)):Dn(t)?e.setAttribute(t,Mn(t,n)):Pn(t)?Hn(n)?e.removeAttributeNS(Fn,Rn(t)):e.setAttributeNS(Fn,t,n):hr(e,t,n)}function hr(e,t,n){if(Hn(n))e.removeAttribute(t);else{if(q&&!W&&"TEXTAREA"===e.tagName&&"placeholder"===t&&""!==n&&!e.__ieph){var r=function(t){t.stopImmediatePropagation(),e.removeEventListener("input",r)};e.addEventListener("input",r),e.__ieph=!0}e.setAttribute(t,n)}}var mr={create:dr,update:dr};function yr(e,r){var i=r.elm,o=r.data,a=e.data;if(!(t(o.staticClass)&&t(o.class)&&(t(a)||t(a.staticClass)&&t(a.class)))){var s=Bn(r),c=i._transitionClasses;n(c)&&(s=zn(s,Vn(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}var gr,_r,br,$r,wr,Cr,xr={create:yr,update:yr},kr=/[\w).+\-_$\]]/;function Ar(e){var t,n,r,i,o,a=!1,s=!1,c=!1,u=!1,l=0,f=0,p=0,d=0;for(r=0;r<e.length;r++)if(n=t,t=e.charCodeAt(r),a)39===t&&92!==n&&(a=!1);else if(s)34===t&&92!==n&&(s=!1);else if(c)96===t&&92!==n&&(c=!1);else if(u)47===t&&92!==n&&(u=!1);else if(124!==t||124===e.charCodeAt(r+1)||124===e.charCodeAt(r-1)||l||f||p){switch(t){case 34:s=!0;break;case 39:a=!0;break;case 96:c=!0;break;case 40:p++;break;case 41:p--;break;case 91:f++;break;case 93:f--;break;case 123:l++;break;case 125:l--}if(47===t){for(var v=r-1,h=void 0;v>=0&&" "===(h=e.charAt(v));v--);h&&kr.test(h)||(u=!0)}}else void 0===i?(d=r+1,i=e.slice(0,r).trim()):m();function m(){(o||(o=[])).push(e.slice(d,r).trim()),d=r+1}if(void 0===i?i=e.slice(0,r).trim():0!==d&&m(),o)for(r=0;r<o.length;r++)i=Or(i,o[r]);return i}function Or(e,t){var n=t.indexOf("(");if(n<0)return'_f("'+t+'")('+e+")";var r=t.slice(0,n),i=t.slice(n+1);return'_f("'+r+'")('+e+(")"!==i?","+i:i)}function Sr(e,t){console.error("[Vue compiler]: "+e)}function Tr(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function Er(e,t,n,r,i){(e.props||(e.props=[])).push(Rr({name:t,value:n,dynamic:i},r)),e.plain=!1}function Nr(e,t,n,r,i){(i?e.dynamicAttrs||(e.dynamicAttrs=[]):e.attrs||(e.attrs=[])).push(Rr({name:t,value:n,dynamic:i},r)),e.plain=!1}function jr(e,t,n,r){e.attrsMap[t]=n,e.attrsList.push(Rr({name:t,value:n},r))}function Dr(e,t,n,r,i,o,a,s){(e.directives||(e.directives=[])).push(Rr({name:t,rawName:n,value:r,arg:i,isDynamicArg:o,modifiers:a},s)),e.plain=!1}function Lr(e,t,n){return n?"_p("+t+',"'+e+'")':e+t}function Mr(t,n,r,i,o,a,s,c){var u;(i=i||e).right?c?n="("+n+")==='click'?'contextmenu':("+n+")":"click"===n&&(n="contextmenu",delete i.right):i.middle&&(c?n="("+n+")==='click'?'mouseup':("+n+")":"click"===n&&(n="mouseup")),i.capture&&(delete i.capture,n=Lr("!",n,c)),i.once&&(delete i.once,n=Lr("~",n,c)),i.passive&&(delete i.passive,n=Lr("&",n,c)),i.native?(delete i.native,u=t.nativeEvents||(t.nativeEvents={})):u=t.events||(t.events={});var l=Rr({value:r.trim(),dynamic:c},s);i!==e&&(l.modifiers=i);var f=u[n];Array.isArray(f)?o?f.unshift(l):f.push(l):u[n]=f?o?[l,f]:[f,l]:l,t.plain=!1}function Ir(e,t,n){var r=Fr(e,":"+t)||Fr(e,"v-bind:"+t);if(null!=r)return Ar(r);if(!1!==n){var i=Fr(e,t);if(null!=i)return JSON.stringify(i)}}function Fr(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function Pr(e,t){for(var n=e.attrsList,r=0,i=n.length;r<i;r++){var o=n[r];if(t.test(o.name))return n.splice(r,1),o}}function Rr(e,t){return t&&(null!=t.start&&(e.start=t.start),null!=t.end&&(e.end=t.end)),e}function Hr(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=Br(t,o);e.model={value:"("+t+")",expression:JSON.stringify(t),callback:"function ($$v) {"+a+"}"}}function Br(e,t){var n=function(e){if(e=e.trim(),gr=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<gr-1)return($r=e.lastIndexOf("."))>-1?{exp:e.slice(0,$r),key:'"'+e.slice($r+1)+'"'}:{exp:e,key:null};_r=e,$r=wr=Cr=0;for(;!zr();)Vr(br=Ur())?Jr(br):91===br&&Kr(br);return{exp:e.slice(0,wr),key:e.slice(wr+1,Cr)}}(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function Ur(){return _r.charCodeAt(++$r)}function zr(){return $r>=gr}function Vr(e){return 34===e||39===e}function Kr(e){var t=1;for(wr=$r;!zr();)if(Vr(e=Ur()))Jr(e);else if(91===e&&t++,93===e&&t--,0===t){Cr=$r;break}}function Jr(e){for(var t=e;!zr()&&(e=Ur())!==t;);}var qr,Wr="__r",Zr="__c";function Gr(e,t,n){var r=qr;return function i(){null!==t.apply(null,arguments)&&Qr(e,i,n,r)}}var Xr=Ve&&!(X&&Number(X[1])<=53);function Yr(e,t,n,r){if(Xr){var i=an,o=t;t=o._wrapper=function(e){if(e.target===e.currentTarget||e.timeStamp>=i||e.timeStamp<=0||e.target.ownerDocument!==document)return o.apply(this,arguments)}}qr.addEventListener(e,t,Q?{capture:n,passive:r}:n)}function Qr(e,t,n,r){(r||qr).removeEventListener(e,t._wrapper||t,n)}function ei(e,r){if(!t(e.data.on)||!t(r.data.on)){var i=r.data.on||{},o=e.data.on||{};qr=r.elm,function(e){if(n(e[Wr])){var t=q?"change":"input";e[t]=[].concat(e[Wr],e[t]||[]),delete e[Wr]}n(e[Zr])&&(e.change=[].concat(e[Zr],e.change||[]),delete e[Zr])}(i),rt(i,o,Yr,Qr,Gr,r.context),qr=void 0}}var ti,ni={create:ei,update:ei};function ri(e,r){if(!t(e.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=e.data.domProps||{},c=r.data.domProps||{};for(i in n(c.__ob__)&&(c=r.data.domProps=A({},c)),s)i in c||(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i&&"PROGRESS"!==a.tagName){a._value=o;var u=t(o)?"":String(o);ii(a,u)&&(a.value=u)}else if("innerHTML"===i&&qn(a.tagName)&&t(a.innerHTML)){(ti=ti||document.createElement("div")).innerHTML="<svg>"+o+"</svg>";for(var l=ti.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;l.firstChild;)a.appendChild(l.firstChild)}else if(o!==s[i])try{a[i]=o}catch(e){}}}}function ii(e,t){return!e.composing&&("OPTION"===e.tagName||function(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}(e,t)||function(e,t){var r=e.value,i=e._vModifiers;if(n(i)){if(i.number)return f(r)!==f(t);if(i.trim)return r.trim()!==t.trim()}return r!==t}(e,t))}var oi={create:ri,update:ri},ai=g(function(e){var t={},n=/:(.+)/;return e.split(/;(?![^(]*\))/g).forEach(function(e){if(e){var r=e.split(n);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t});function si(e){var t=ci(e.style);return e.staticStyle?A(e.staticStyle,t):t}function ci(e){return Array.isArray(e)?O(e):"string"==typeof e?ai(e):e}var ui,li=/^--/,fi=/\s*!important$/,pi=function(e,t,n){if(li.test(t))e.style.setProperty(t,n);else if(fi.test(n))e.style.setProperty(C(t),n.replace(fi,""),"important");else{var r=vi(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},di=["Webkit","Moz","ms"],vi=g(function(e){if(ui=ui||document.createElement("div").style,"filter"!==(e=b(e))&&e in ui)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<di.length;n++){var r=di[n]+t;if(r in ui)return r}});function hi(e,r){var i=r.data,o=e.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=ci(r.data.style)||{};r.data.normalizedStyle=n(p.__ob__)?A({},p):p;var d=function(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode)&&i.data&&(n=si(i.data))&&A(r,n);(n=si(e.data))&&A(r,n);for(var o=e;o=o.parent;)o.data&&(n=si(o.data))&&A(r,n);return r}(r,!0);for(s in f)t(d[s])&&pi(c,s,"");for(s in d)(a=d[s])!==f[s]&&pi(c,s,null==a?"":a)}}var mi={create:hi,update:hi},yi=/\s+/;function gi(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(yi).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function _i(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(yi).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?e.setAttribute("class",n):e.removeAttribute("class")}}function bi(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&A(t,$i(e.name||"v")),A(t,e),t}return"string"==typeof e?$i(e):void 0}}var $i=g(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),wi=z&&!W,Ci="transition",xi="animation",ki="transition",Ai="transitionend",Oi="animation",Si="animationend";wi&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(ki="WebkitTransition",Ai="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Oi="WebkitAnimation",Si="webkitAnimationEnd"));var Ti=z?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()};function Ei(e){Ti(function(){Ti(e)})}function Ni(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),gi(e,t))}function ji(e,t){e._transitionClasses&&h(e._transitionClasses,t),_i(e,t)}function Di(e,t,n){var r=Mi(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===Ci?Ai:Si,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}var Li=/\b(transform|all)(,|$)/;function Mi(e,t){var n,r=window.getComputedStyle(e),i=(r[ki+"Delay"]||"").split(", "),o=(r[ki+"Duration"]||"").split(", "),a=Ii(i,o),s=(r[Oi+"Delay"]||"").split(", "),c=(r[Oi+"Duration"]||"").split(", "),u=Ii(s,c),l=0,f=0;return t===Ci?a>0&&(n=Ci,l=a,f=o.length):t===xi?u>0&&(n=xi,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?Ci:xi:null)?n===Ci?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===Ci&&Li.test(r[ki+"Property"])}}function Ii(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Fi(t)+Fi(e[n])}))}function Fi(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function Pi(e,r){var i=e.elm;n(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=bi(e.data.transition);if(!t(a)&&!n(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,l=a.enterToClass,p=a.enterActiveClass,d=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,C=a.appearCancelled,x=a.duration,k=Wt,A=Wt.$vnode;A&&A.parent;)k=A.context,A=A.parent;var O=!k._isMounted||!e.isRootInsert;if(!O||$||""===$){var S=O&&d?d:u,T=O&&h?h:p,E=O&&v?v:l,N=O&&b||m,j=O&&"function"==typeof $?$:y,L=O&&w||g,M=O&&C||_,I=f(o(x)?x.enter:x),F=!1!==s&&!W,P=Bi(j),R=i._enterCb=D(function(){F&&(ji(i,E),ji(i,T)),R.cancelled?(F&&ji(i,S),M&&M(i)):L&&L(i),i._enterCb=null});e.data.show||it(e,"insert",function(){var t=i.parentNode,n=t&&t._pending&&t._pending[e.key];n&&n.tag===e.tag&&n.elm._leaveCb&&n.elm._leaveCb(),j&&j(i,R)}),N&&N(i),F&&(Ni(i,S),Ni(i,T),Ei(function(){ji(i,S),R.cancelled||(Ni(i,E),P||(Hi(I)?setTimeout(R,I):Di(i,c,R)))})),e.data.show&&(r&&r(),j&&j(i,R)),F||P||R()}}}function Ri(e,r){var i=e.elm;n(i._enterCb)&&(i._enterCb.cancelled=!0,i._enterCb());var a=bi(e.data.transition);if(t(a)||1!==i.nodeType)return r();if(!n(i._leaveCb)){var s=a.css,c=a.type,u=a.leaveClass,l=a.leaveToClass,p=a.leaveActiveClass,d=a.beforeLeave,v=a.leave,h=a.afterLeave,m=a.leaveCancelled,y=a.delayLeave,g=a.duration,_=!1!==s&&!W,b=Bi(v),$=f(o(g)?g.leave:g),w=i._leaveCb=D(function(){i.parentNode&&i.parentNode._pending&&(i.parentNode._pending[e.key]=null),_&&(ji(i,l),ji(i,p)),w.cancelled?(_&&ji(i,u),m&&m(i)):(r(),h&&h(i)),i._leaveCb=null});y?y(C):C()}function C(){w.cancelled||(!e.data.show&&i.parentNode&&((i.parentNode._pending||(i.parentNode._pending={}))[e.key]=e),d&&d(i),_&&(Ni(i,u),Ni(i,p),Ei(function(){ji(i,u),w.cancelled||(Ni(i,l),b||(Hi($)?setTimeout(w,$):Di(i,c,w)))})),v&&v(i,w),_||b||w())}}function Hi(e){return"number"==typeof e&&!isNaN(e)}function Bi(e){if(t(e))return!1;var r=e.fns;return n(r)?Bi(Array.isArray(r)?r[0]:r):(e._length||e.length)>1}function Ui(e,t){!0!==t.data.show&&Pi(t)}var zi=function(e){var o,a,s={},c=e.modules,u=e.nodeOps;for(o=0;o<rr.length;++o)for(s[rr[o]]=[],a=0;a<c.length;++a)n(c[a][rr[o]])&&s[rr[o]].push(c[a][rr[o]]);function l(e){var t=u.parentNode(e);n(t)&&u.removeChild(t,e)}function f(e,t,i,o,a,c,l){if(n(e.elm)&&n(c)&&(e=c[l]=me(e)),e.isRootInsert=!a,!function(e,t,i,o){var a=e.data;if(n(a)){var c=n(e.componentInstance)&&a.keepAlive;if(n(a=a.hook)&&n(a=a.init)&&a(e,!1),n(e.componentInstance))return d(e,t),v(i,e.elm,o),r(c)&&function(e,t,r,i){for(var o,a=e;a.componentInstance;)if(a=a.componentInstance._vnode,n(o=a.data)&&n(o=o.transition)){for(o=0;o<s.activate.length;++o)s.activate[o](nr,a);t.push(a);break}v(r,e.elm,i)}(e,t,i,o),!0}}(e,t,i,o)){var f=e.data,p=e.children,m=e.tag;n(m)?(e.elm=e.ns?u.createElementNS(e.ns,m):u.createElement(m,e),g(e),h(e,p,t),n(f)&&y(e,t),v(i,e.elm,o)):r(e.isComment)?(e.elm=u.createComment(e.text),v(i,e.elm,o)):(e.elm=u.createTextNode(e.text),v(i,e.elm,o))}}function d(e,t){n(e.data.pendingInsert)&&(t.push.apply(t,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,m(e)?(y(e,t),g(e)):(tr(e),t.push(e))}function v(e,t,r){n(e)&&(n(r)?u.parentNode(r)===e&&u.insertBefore(e,t,r):u.appendChild(e,t))}function h(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)f(t[r],n,e.elm,null,!0,t,r);else i(e.text)&&u.appendChild(e.elm,u.createTextNode(String(e.text)))}function m(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return n(e.tag)}function y(e,t){for(var r=0;r<s.create.length;++r)s.create[r](nr,e);n(o=e.data.hook)&&(n(o.create)&&o.create(nr,e),n(o.insert)&&t.push(e))}function g(e){var t;if(n(t=e.fnScopeId))u.setStyleScope(e.elm,t);else for(var r=e;r;)n(t=r.context)&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t),r=r.parent;n(t=Wt)&&t!==e.context&&t!==e.fnContext&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t)}function _(e,t,n,r,i,o){for(;r<=i;++r)f(n[r],o,e,t,!1,n,r)}function b(e){var t,r,i=e.data;if(n(i))for(n(t=i.hook)&&n(t=t.destroy)&&t(e),t=0;t<s.destroy.length;++t)s.destroy[t](e);if(n(t=e.children))for(r=0;r<e.children.length;++r)b(e.children[r])}function $(e,t,r){for(;t<=r;++t){var i=e[t];n(i)&&(n(i.tag)?(w(i),b(i)):l(i.elm))}}function w(e,t){if(n(t)||n(e.data)){var r,i=s.remove.length+1;for(n(t)?t.listeners+=i:t=function(e,t){function n(){0==--n.listeners&&l(e)}return n.listeners=t,n}(e.elm,i),n(r=e.componentInstance)&&n(r=r._vnode)&&n(r.data)&&w(r,t),r=0;r<s.remove.length;++r)s.remove[r](e,t);n(r=e.data.hook)&&n(r=r.remove)?r(e,t):t()}else l(e.elm)}function C(e,t,r,i){for(var o=r;o<i;o++){var a=t[o];if(n(a)&&ir(e,a))return o}}function x(e,i,o,a,c,l){if(e!==i){n(i.elm)&&n(a)&&(i=a[c]=me(i));var p=i.elm=e.elm;if(r(e.isAsyncPlaceholder))n(i.asyncFactory.resolved)?O(e.elm,i,o):i.isAsyncPlaceholder=!0;else if(r(i.isStatic)&&r(e.isStatic)&&i.key===e.key&&(r(i.isCloned)||r(i.isOnce)))i.componentInstance=e.componentInstance;else{var d,v=i.data;n(v)&&n(d=v.hook)&&n(d=d.prepatch)&&d(e,i);var h=e.children,y=i.children;if(n(v)&&m(i)){for(d=0;d<s.update.length;++d)s.update[d](e,i);n(d=v.hook)&&n(d=d.update)&&d(e,i)}t(i.text)?n(h)&&n(y)?h!==y&&function(e,r,i,o,a){for(var s,c,l,p=0,d=0,v=r.length-1,h=r[0],m=r[v],y=i.length-1,g=i[0],b=i[y],w=!a;p<=v&&d<=y;)t(h)?h=r[++p]:t(m)?m=r[--v]:ir(h,g)?(x(h,g,o,i,d),h=r[++p],g=i[++d]):ir(m,b)?(x(m,b,o,i,y),m=r[--v],b=i[--y]):ir(h,b)?(x(h,b,o,i,y),w&&u.insertBefore(e,h.elm,u.nextSibling(m.elm)),h=r[++p],b=i[--y]):ir(m,g)?(x(m,g,o,i,d),w&&u.insertBefore(e,m.elm,h.elm),m=r[--v],g=i[++d]):(t(s)&&(s=or(r,p,v)),t(c=n(g.key)?s[g.key]:C(g,r,p,v))?f(g,o,e,h.elm,!1,i,d):ir(l=r[c],g)?(x(l,g,o,i,d),r[c]=void 0,w&&u.insertBefore(e,l.elm,h.elm)):f(g,o,e,h.elm,!1,i,d),g=i[++d]);p>v?_(e,t(i[y+1])?null:i[y+1].elm,i,d,y,o):d>y&&$(r,p,v)}(p,h,y,o,l):n(y)?(n(e.text)&&u.setTextContent(p,""),_(p,null,y,0,y.length-1,o)):n(h)?$(h,0,h.length-1):n(e.text)&&u.setTextContent(p,""):e.text!==i.text&&u.setTextContent(p,i.text),n(v)&&n(d=v.hook)&&n(d=d.postpatch)&&d(e,i)}}}function k(e,t,i){if(r(i)&&n(e.parent))e.parent.data.pendingInsert=t;else for(var o=0;o<t.length;++o)t[o].data.hook.insert(t[o])}var A=p("attrs,class,staticClass,staticStyle,key");function O(e,t,i,o){var a,s=t.tag,c=t.data,u=t.children;if(o=o||c&&c.pre,t.elm=e,r(t.isComment)&&n(t.asyncFactory))return t.isAsyncPlaceholder=!0,!0;if(n(c)&&(n(a=c.hook)&&n(a=a.init)&&a(t,!0),n(a=t.componentInstance)))return d(t,i),!0;if(n(s)){if(n(u))if(e.hasChildNodes())if(n(a=c)&&n(a=a.domProps)&&n(a=a.innerHTML)){if(a!==e.innerHTML)return!1}else{for(var l=!0,f=e.firstChild,p=0;p<u.length;p++){if(!f||!O(f,u[p],i,o)){l=!1;break}f=f.nextSibling}if(!l||f)return!1}else h(t,u,i);if(n(c)){var v=!1;for(var m in c)if(!A(m)){v=!0,y(t,i);break}!v&&c.class&&et(c.class)}}else e.data!==t.text&&(e.data=t.text);return!0}return function(e,i,o,a){if(!t(i)){var c,l=!1,p=[];if(t(e))l=!0,f(i,p);else{var d=n(e.nodeType);if(!d&&ir(e,i))x(e,i,p,null,null,a);else{if(d){if(1===e.nodeType&&e.hasAttribute(L)&&(e.removeAttribute(L),o=!0),r(o)&&O(e,i,p))return k(i,p,!0),e;c=e,e=new pe(u.tagName(c).toLowerCase(),{},[],void 0,c)}var v=e.elm,h=u.parentNode(v);if(f(i,p,v._leaveCb?null:h,u.nextSibling(v)),n(i.parent))for(var y=i.parent,g=m(i);y;){for(var _=0;_<s.destroy.length;++_)s.destroy[_](y);if(y.elm=i.elm,g){for(var w=0;w<s.create.length;++w)s.create[w](nr,y);var C=y.data.hook.insert;if(C.merged)for(var A=1;A<C.fns.length;A++)C.fns[A]()}else tr(y);y=y.parent}n(h)?$([e],0,0):n(e.tag)&&b(e)}}return k(i,p,l),i.elm}n(e)&&b(e)}}({nodeOps:Qn,modules:[mr,xr,ni,oi,mi,z?{create:Ui,activate:Ui,remove:function(e,t){!0!==e.data.show?Ri(e,t):t()}}:{}].concat(pr)});W&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&Xi(e,"input")});var Vi={inserted:function(e,t,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?it(n,"postpatch",function(){Vi.componentUpdated(e,t,n)}):Ki(e,t,n.context),e._vOptions=[].map.call(e.options,Wi)):("textarea"===n.tag||Xn(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("compositionstart",Zi),e.addEventListener("compositionend",Gi),e.addEventListener("change",Gi),W&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){Ki(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,Wi);if(i.some(function(e,t){return!N(e,r[t])}))(e.multiple?t.value.some(function(e){return qi(e,i)}):t.value!==t.oldValue&&qi(t.value,i))&&Xi(e,"change")}}};function Ki(e,t,n){Ji(e,t,n),(q||Z)&&setTimeout(function(){Ji(e,t,n)},0)}function Ji(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=j(r,Wi(a))>-1,a.selected!==o&&(a.selected=o);else if(N(Wi(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function qi(e,t){return t.every(function(t){return!N(t,e)})}function Wi(e){return"_value"in e?e._value:e.value}function Zi(e){e.target.composing=!0}function Gi(e){e.target.composing&&(e.target.composing=!1,Xi(e.target,"input"))}function Xi(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function Yi(e){return!e.componentInstance||e.data&&e.data.transition?e:Yi(e.componentInstance._vnode)}var Qi={model:Vi,show:{bind:function(e,t,n){var r=t.value,i=(n=Yi(n)).data&&n.data.transition,o=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;r&&i?(n.data.show=!0,Pi(n,function(){e.style.display=o})):e.style.display=r?o:"none"},update:function(e,t,n){var r=t.value;!r!=!t.oldValue&&((n=Yi(n)).data&&n.data.transition?(n.data.show=!0,r?Pi(n,function(){e.style.display=e.__vOriginalDisplay}):Ri(n,function(){e.style.display="none"})):e.style.display=r?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,r,i){i||(e.style.display=e.__vOriginalDisplay)}}},eo={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function to(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?to(zt(t.children)):e}function no(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[b(o)]=i[o];return t}function ro(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}var io=function(e){return e.tag||Ut(e)},oo=function(e){return"show"===e.name},ao={name:"transition",props:eo,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(io)).length){var r=this.mode,o=n[0];if(function(e){for(;e=e.parent;)if(e.data.transition)return!0}(this.$vnode))return o;var a=to(o);if(!a)return o;if(this._leaving)return ro(e,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=no(this),u=this._vnode,l=to(u);if(a.data.directives&&a.data.directives.some(oo)&&(a.data.show=!0),l&&l.data&&!function(e,t){return t.key===e.key&&t.tag===e.tag}(a,l)&&!Ut(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=A({},c);if("out-in"===r)return this._leaving=!0,it(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),ro(e,o);if("in-out"===r){if(Ut(a))return u;var p,d=function(){p()};it(c,"afterEnter",d),it(c,"enterCancelled",d),it(f,"delayLeave",function(e){p=e})}}return o}}},so=A({tag:String,moveClass:String},eo);function co(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function uo(e){e.data.newPos=e.elm.getBoundingClientRect()}function lo(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}delete so.mode;var fo={Transition:ao,TransitionGroup:{props:so,beforeMount:function(){var e=this,t=this._update;this._update=function(n,r){var i=Zt(e);e.__patch__(e._vnode,e.kept,!1,!0),e._vnode=e.kept,i(),t.call(e,n,r)}},render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=no(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var p=r[f];p.data.transition=a,p.data.pos=p.elm.getBoundingClientRect(),n[p.key]?u.push(p):l.push(p)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(co),e.forEach(uo),e.forEach(lo),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Ni(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Ai,n._moveCb=function e(r){r&&r.target!==n||r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Ai,e),n._moveCb=null,ji(n,t))})}}))},methods:{hasMove:function(e,t){if(!wi)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){_i(n,e)}),gi(n,t),n.style.display="none",this.$el.appendChild(n);var r=Mi(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};wn.config.mustUseProp=jn,wn.config.isReservedTag=Wn,wn.config.isReservedAttr=En,wn.config.getTagNamespace=Zn,wn.config.isUnknownElement=function(e){if(!z)return!0;if(Wn(e))return!1;if(e=e.toLowerCase(),null!=Gn[e])return Gn[e];var t=document.createElement(e);return e.indexOf("-")>-1?Gn[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Gn[e]=/HTMLUnknownElement/.test(t.toString())},A(wn.options.directives,Qi),A(wn.options.components,fo),wn.prototype.__patch__=z?zi:S,wn.prototype.$mount=function(e,t){return function(e,t,n){var r;return e.$el=t,e.$options.render||(e.$options.render=ve),Yt(e,"beforeMount"),r=function(){e._update(e._render(),n)},new fn(e,r,S,{before:function(){e._isMounted&&!e._isDestroyed&&Yt(e,"beforeUpdate")}},!0),n=!1,null==e.$vnode&&(e._isMounted=!0,Yt(e,"mounted")),e}(this,e=e&&z?Yn(e):void 0,t)},z&&setTimeout(function(){F.devtools&&ne&&ne.emit("init",wn)},0);var po=/\{\{((?:.|\r?\n)+?)\}\}/g,vo=/[-.*+?^${}()|[\]\/\\]/g,ho=g(function(e){var t=e[0].replace(vo,"\\$&"),n=e[1].replace(vo,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")});var mo={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=Fr(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=Ir(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}};var yo,go={staticKeys:["staticStyle"],transformNode:function(e,t){t.warn;var n=Fr(e,"style");n&&(e.staticStyle=JSON.stringify(ai(n)));var r=Ir(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},_o=function(e){return(yo=yo||document.createElement("div")).innerHTML=e,yo.textContent},bo=p("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),$o=p("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),wo=p("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),Co=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,xo=/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,ko="[a-zA-Z_][\\-\\.0-9_a-zA-Z"+P.source+"]*",Ao="((?:"+ko+"\\:)?"+ko+")",Oo=new RegExp("^<"+Ao),So=/^\s*(\/?)>/,To=new RegExp("^<\\/"+Ao+"[^>]*>"),Eo=/^<!DOCTYPE [^>]+>/i,No=/^<!\--/,jo=/^<!\[/,Do=p("script,style,textarea",!0),Lo={},Mo={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t","&#39;":"'"},Io=/&(?:lt|gt|quot|amp|#39);/g,Fo=/&(?:lt|gt|quot|amp|#39|#10|#9);/g,Po=p("pre,textarea",!0),Ro=function(e,t){return e&&Po(e)&&"\n"===t[0]};function Ho(e,t){var n=t?Fo:Io;return e.replace(n,function(e){return Mo[e]})}var Bo,Uo,zo,Vo,Ko,Jo,qo,Wo,Zo=/^@|^v-on:/,Go=/^v-|^@|^:|^#/,Xo=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Yo=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Qo=/^\(|\)$/g,ea=/^\[.*\]$/,ta=/:(.*)$/,na=/^:|^\.|^v-bind:/,ra=/\.[^.\]]+(?=[^\]]*$)/g,ia=/^v-slot(:|$)|^#/,oa=/[\r\n]/,aa=/\s+/g,sa=g(_o),ca="_empty_";function ua(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:ma(t),rawAttrsMap:{},parent:n,children:[]}}function la(e,t){Bo=t.warn||Sr,Jo=t.isPreTag||T,qo=t.mustUseProp||T,Wo=t.getTagNamespace||T;t.isReservedTag;zo=Tr(t.modules,"transformNode"),Vo=Tr(t.modules,"preTransformNode"),Ko=Tr(t.modules,"postTransformNode"),Uo=t.delimiters;var n,r,i=[],o=!1!==t.preserveWhitespace,a=t.whitespace,s=!1,c=!1;function u(e){if(l(e),s||e.processed||(e=fa(e,t)),i.length||e===n||n.if&&(e.elseif||e.else)&&da(n,{exp:e.elseif,block:e}),r&&!e.forbidden)if(e.elseif||e.else)a=e,(u=function(e){var t=e.length;for(;t--;){if(1===e[t].type)return e[t];e.pop()}}(r.children))&&u.if&&da(u,{exp:a.elseif,block:a});else{if(e.slotScope){var o=e.slotTarget||'"default"';(r.scopedSlots||(r.scopedSlots={}))[o]=e}r.children.push(e),e.parent=r}var a,u;e.children=e.children.filter(function(e){return!e.slotScope}),l(e),e.pre&&(s=!1),Jo(e.tag)&&(c=!1);for(var f=0;f<Ko.length;f++)Ko[f](e,t)}function l(e){if(!c)for(var t;(t=e.children[e.children.length-1])&&3===t.type&&" "===t.text;)e.children.pop()}return function(e,t){for(var n,r,i=[],o=t.expectHTML,a=t.isUnaryTag||T,s=t.canBeLeftOpenTag||T,c=0;e;){if(n=e,r&&Do(r)){var u=0,l=r.toLowerCase(),f=Lo[l]||(Lo[l]=new RegExp("([\\s\\S]*?)(</"+l+"[^>]*>)","i")),p=e.replace(f,function(e,n,r){return u=r.length,Do(l)||"noscript"===l||(n=n.replace(/<!\--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Ro(l,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});c+=e.length-p.length,e=p,A(l,c-u,c)}else{var d=e.indexOf("<");if(0===d){if(No.test(e)){var v=e.indexOf("--\x3e");if(v>=0){t.shouldKeepComment&&t.comment(e.substring(4,v),c,c+v+3),C(v+3);continue}}if(jo.test(e)){var h=e.indexOf("]>");if(h>=0){C(h+2);continue}}var m=e.match(Eo);if(m){C(m[0].length);continue}var y=e.match(To);if(y){var g=c;C(y[0].length),A(y[1],g,c);continue}var _=x();if(_){k(_),Ro(_.tagName,e)&&C(1);continue}}var b=void 0,$=void 0,w=void 0;if(d>=0){for($=e.slice(d);!(To.test($)||Oo.test($)||No.test($)||jo.test($)||(w=$.indexOf("<",1))<0);)d+=w,$=e.slice(d);b=e.substring(0,d)}d<0&&(b=e),b&&C(b.length),t.chars&&b&&t.chars(b,c-b.length,c)}if(e===n){t.chars&&t.chars(e);break}}function C(t){c+=t,e=e.substring(t)}function x(){var t=e.match(Oo);if(t){var n,r,i={tagName:t[1],attrs:[],start:c};for(C(t[0].length);!(n=e.match(So))&&(r=e.match(xo)||e.match(Co));)r.start=c,C(r[0].length),r.end=c,i.attrs.push(r);if(n)return i.unarySlash=n[1],C(n[0].length),i.end=c,i}}function k(e){var n=e.tagName,c=e.unarySlash;o&&("p"===r&&wo(n)&&A(r),s(n)&&r===n&&A(n));for(var u=a(n)||!!c,l=e.attrs.length,f=new Array(l),p=0;p<l;p++){var d=e.attrs[p],v=d[3]||d[4]||d[5]||"",h="a"===n&&"href"===d[1]?t.shouldDecodeNewlinesForHref:t.shouldDecodeNewlines;f[p]={name:d[1],value:Ho(v,h)}}u||(i.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:f,start:e.start,end:e.end}),r=n),t.start&&t.start(n,f,u,e.start,e.end)}function A(e,n,o){var a,s;if(null==n&&(n=c),null==o&&(o=c),e)for(s=e.toLowerCase(),a=i.length-1;a>=0&&i[a].lowerCasedTag!==s;a--);else a=0;if(a>=0){for(var u=i.length-1;u>=a;u--)t.end&&t.end(i[u].tag,n,o);i.length=a,r=a&&i[a-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,o):"p"===s&&(t.start&&t.start(e,[],!1,n,o),t.end&&t.end(e,n,o))}A()}(e,{warn:Bo,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldDecodeNewlinesForHref:t.shouldDecodeNewlinesForHref,shouldKeepComment:t.comments,outputSourceRange:t.outputSourceRange,start:function(e,o,a,l,f){var p=r&&r.ns||Wo(e);q&&"svg"===p&&(o=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];ya.test(r.name)||(r.name=r.name.replace(ga,""),t.push(r))}return t}(o));var d,v=ua(e,o,r);p&&(v.ns=p),"style"!==(d=v).tag&&("script"!==d.tag||d.attrsMap.type&&"text/javascript"!==d.attrsMap.type)||te()||(v.forbidden=!0);for(var h=0;h<Vo.length;h++)v=Vo[h](v,t)||v;s||(!function(e){null!=Fr(e,"v-pre")&&(e.pre=!0)}(v),v.pre&&(s=!0)),Jo(v.tag)&&(c=!0),s?function(e){var t=e.attrsList,n=t.length;if(n)for(var r=e.attrs=new Array(n),i=0;i<n;i++)r[i]={name:t[i].name,value:JSON.stringify(t[i].value)},null!=t[i].start&&(r[i].start=t[i].start,r[i].end=t[i].end);else e.pre||(e.plain=!0)}(v):v.processed||(pa(v),function(e){var t=Fr(e,"v-if");if(t)e.if=t,da(e,{exp:t,block:e});else{null!=Fr(e,"v-else")&&(e.else=!0);var n=Fr(e,"v-else-if");n&&(e.elseif=n)}}(v),function(e){null!=Fr(e,"v-once")&&(e.once=!0)}(v)),n||(n=v),a?u(v):(r=v,i.push(v))},end:function(e,t,n){var o=i[i.length-1];i.length-=1,r=i[i.length-1],u(o)},chars:function(e,t,n){if(r&&(!q||"textarea"!==r.tag||r.attrsMap.placeholder!==e)){var i,u,l,f=r.children;if(e=c||e.trim()?"script"===(i=r).tag||"style"===i.tag?e:sa(e):f.length?a?"condense"===a&&oa.test(e)?"":" ":o?" ":"":"")c||"condense"!==a||(e=e.replace(aa," ")),!s&&" "!==e&&(u=function(e,t){var n=t?ho(t):po;if(n.test(e)){for(var r,i,o,a=[],s=[],c=n.lastIndex=0;r=n.exec(e);){(i=r.index)>c&&(s.push(o=e.slice(c,i)),a.push(JSON.stringify(o)));var u=Ar(r[1].trim());a.push("_s("+u+")"),s.push({"@binding":u}),c=i+r[0].length}return c<e.length&&(s.push(o=e.slice(c)),a.push(JSON.stringify(o))),{expression:a.join("+"),tokens:s}}}(e,Uo))?l={type:2,expression:u.expression,tokens:u.tokens,text:e}:" "===e&&f.length&&" "===f[f.length-1].text||(l={type:3,text:e}),l&&f.push(l)}},comment:function(e,t,n){if(r){var i={type:3,text:e,isComment:!0};r.children.push(i)}}}),n}function fa(e,t){var n,r;(r=Ir(n=e,"key"))&&(n.key=r),e.plain=!e.key&&!e.scopedSlots&&!e.attrsList.length,function(e){var t=Ir(e,"ref");t&&(e.ref=t,e.refInFor=function(e){var t=e;for(;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}(e))}(e),function(e){var t;"template"===e.tag?(t=Fr(e,"scope"),e.slotScope=t||Fr(e,"slot-scope")):(t=Fr(e,"slot-scope"))&&(e.slotScope=t);var n=Ir(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,e.slotTargetDynamic=!(!e.attrsMap[":slot"]&&!e.attrsMap["v-bind:slot"]),"template"===e.tag||e.slotScope||Nr(e,"slot",n,function(e,t){return e.rawAttrsMap[":"+t]||e.rawAttrsMap["v-bind:"+t]||e.rawAttrsMap[t]}(e,"slot")));if("template"===e.tag){var r=Pr(e,ia);if(r){var i=va(r),o=i.name,a=i.dynamic;e.slotTarget=o,e.slotTargetDynamic=a,e.slotScope=r.value||ca}}else{var s=Pr(e,ia);if(s){var c=e.scopedSlots||(e.scopedSlots={}),u=va(s),l=u.name,f=u.dynamic,p=c[l]=ua("template",[],e);p.slotTarget=l,p.slotTargetDynamic=f,p.children=e.children.filter(function(e){if(!e.slotScope)return e.parent=p,!0}),p.slotScope=s.value||ca,e.children=[],e.plain=!1}}}(e),function(e){"slot"===e.tag&&(e.slotName=Ir(e,"name"))}(e),function(e){var t;(t=Ir(e,"is"))&&(e.component=t);null!=Fr(e,"inline-template")&&(e.inlineTemplate=!0)}(e);for(var i=0;i<zo.length;i++)e=zo[i](e,t)||e;return function(e){var t,n,r,i,o,a,s,c,u=e.attrsList;for(t=0,n=u.length;t<n;t++)if(r=i=u[t].name,o=u[t].value,Go.test(r))if(e.hasBindings=!0,(a=ha(r.replace(Go,"")))&&(r=r.replace(ra,"")),na.test(r))r=r.replace(na,""),o=Ar(o),(c=ea.test(r))&&(r=r.slice(1,-1)),a&&(a.prop&&!c&&"innerHtml"===(r=b(r))&&(r="innerHTML"),a.camel&&!c&&(r=b(r)),a.sync&&(s=Br(o,"$event"),c?Mr(e,'"update:"+('+r+")",s,null,!1,0,u[t],!0):(Mr(e,"update:"+b(r),s,null,!1,0,u[t]),C(r)!==b(r)&&Mr(e,"update:"+C(r),s,null,!1,0,u[t])))),a&&a.prop||!e.component&&qo(e.tag,e.attrsMap.type,r)?Er(e,r,o,u[t],c):Nr(e,r,o,u[t],c);else if(Zo.test(r))r=r.replace(Zo,""),(c=ea.test(r))&&(r=r.slice(1,-1)),Mr(e,r,o,a,!1,0,u[t],c);else{var l=(r=r.replace(Go,"")).match(ta),f=l&&l[1];c=!1,f&&(r=r.slice(0,-(f.length+1)),ea.test(f)&&(f=f.slice(1,-1),c=!0)),Dr(e,r,i,o,f,c,a,u[t])}else Nr(e,r,JSON.stringify(o),u[t]),!e.component&&"muted"===r&&qo(e.tag,e.attrsMap.type,r)&&Er(e,r,"true",u[t])}(e),e}function pa(e){var t;if(t=Fr(e,"v-for")){var n=function(e){var t=e.match(Xo);if(!t)return;var n={};n.for=t[2].trim();var r=t[1].trim().replace(Qo,""),i=r.match(Yo);i?(n.alias=r.replace(Yo,"").trim(),n.iterator1=i[1].trim(),i[2]&&(n.iterator2=i[2].trim())):n.alias=r;return n}(t);n&&A(e,n)}}function da(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function va(e){var t=e.name.replace(ia,"");return t||"#"!==e.name[0]&&(t="default"),ea.test(t)?{name:t.slice(1,-1),dynamic:!0}:{name:'"'+t+'"',dynamic:!1}}function ha(e){var t=e.match(ra);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function ma(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}var ya=/^xmlns:NS\d+/,ga=/^NS\d+:/;function _a(e){return ua(e.tag,e.attrsList.slice(),e.parent)}var ba=[mo,go,{preTransformNode:function(e,t){if("input"===e.tag){var n,r=e.attrsMap;if(!r["v-model"])return;if((r[":type"]||r["v-bind:type"])&&(n=Ir(e,"type")),r.type||n||!r["v-bind"]||(n="("+r["v-bind"]+").type"),n){var i=Fr(e,"v-if",!0),o=i?"&&("+i+")":"",a=null!=Fr(e,"v-else",!0),s=Fr(e,"v-else-if",!0),c=_a(e);pa(c),jr(c,"type","checkbox"),fa(c,t),c.processed=!0,c.if="("+n+")==='checkbox'"+o,da(c,{exp:c.if,block:c});var u=_a(e);Fr(u,"v-for",!0),jr(u,"type","radio"),fa(u,t),da(c,{exp:"("+n+")==='radio'"+o,block:u});var l=_a(e);return Fr(l,"v-for",!0),jr(l,":type",n),fa(l,t),da(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}];var $a,wa,Ca={expectHTML:!0,modules:ba,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return Hr(e,r,i),!1;if("select"===o)!function(e,t,n){var r='var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"});";r=r+" "+Br(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),Mr(e,"change",r,null,!0)}(e,r,i);else if("input"===o&&"checkbox"===a)!function(e,t,n){var r=n&&n.number,i=Ir(e,"value")||"null",o=Ir(e,"true-value")||"true",a=Ir(e,"false-value")||"false";Er(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),Mr(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+Br(t,"$$a.concat([$$v])")+")}else{$$i>-1&&("+Br(t,"$$a.slice(0,$$i).concat($$a.slice($$i+1))")+")}}else{"+Br(t,"$$c")+"}",null,!0)}(e,r,i);else if("input"===o&&"radio"===a)!function(e,t,n){var r=n&&n.number,i=Ir(e,"value")||"null";Er(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),Mr(e,"change",Br(t,i),null,!0)}(e,r,i);else if("input"===o||"textarea"===o)!function(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?Wr:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=Br(t,l);c&&(f="if($event.target.composing)return;"+f),Er(e,"value","("+t+")"),Mr(e,u,f,null,!0),(s||a)&&Mr(e,"blur","$forceUpdate()")}(e,r,i);else if(!F.isReservedTag(o))return Hr(e,r,i),!1;return!0},text:function(e,t){t.value&&Er(e,"textContent","_s("+t.value+")",t)},html:function(e,t){t.value&&Er(e,"innerHTML","_s("+t.value+")",t)}},isPreTag:function(e){return"pre"===e},isUnaryTag:bo,mustUseProp:jn,canBeLeftOpenTag:$o,isReservedTag:Wn,getTagNamespace:Zn,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(ba)},xa=g(function(e){return p("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap"+(e?","+e:""))});function ka(e,t){e&&($a=xa(t.staticKeys||""),wa=t.isReservedTag||T,function e(t){t.static=function(e){if(2===e.type)return!1;if(3===e.type)return!0;return!(!e.pre&&(e.hasBindings||e.if||e.for||d(e.tag)||!wa(e.tag)||function(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}(e)||!Object.keys(e).every($a)))}(t);if(1===t.type){if(!wa(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var n=0,r=t.children.length;n<r;n++){var i=t.children[n];e(i),i.static||(t.static=!1)}if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++){var s=t.ifConditions[o].block;e(s),s.static||(t.static=!1)}}}(e),function e(t,n){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=n),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var r=0,i=t.children.length;r<i;r++)e(t.children[r],n||!!t.for);if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++)e(t.ifConditions[o].block,n)}}(e,!1))}var Aa=/^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,Oa=/\([^)]*?\);*$/,Sa=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,Ta={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},Ea={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},Na=function(e){return"if("+e+")return null;"},ja={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:Na("$event.target !== $event.currentTarget"),ctrl:Na("!$event.ctrlKey"),shift:Na("!$event.shiftKey"),alt:Na("!$event.altKey"),meta:Na("!$event.metaKey"),left:Na("'button' in $event && $event.button !== 0"),middle:Na("'button' in $event && $event.button !== 1"),right:Na("'button' in $event && $event.button !== 2")};function Da(e,t){var n=t?"nativeOn:":"on:",r="",i="";for(var o in e){var a=La(e[o]);e[o]&&e[o].dynamic?i+=o+","+a+",":r+='"'+o+'":'+a+","}return r="{"+r.slice(0,-1)+"}",i?n+"_d("+r+",["+i.slice(0,-1)+"])":n+r}function La(e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return La(e)}).join(",")+"]";var t=Sa.test(e.value),n=Aa.test(e.value),r=Sa.test(e.value.replace(Oa,""));if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)if(ja[s])o+=ja[s],Ta[s]&&a.push(s);else if("exact"===s){var c=e.modifiers;o+=Na(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=function(e){return"if(!$event.type.indexOf('key')&&"+e.map(Ma).join("&&")+")return null;"}(a)),o&&(i+=o),"function($event){"+i+(t?"return "+e.value+"($event)":n?"return ("+e.value+")($event)":r?"return "+e.value:e.value)+"}"}return t||n?e.value:"function($event){"+(r?"return "+e.value:e.value)+"}"}function Ma(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=Ta[e],r=Ea[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key,"+JSON.stringify(r)+")"}var Ia={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}},cloak:S},Fa=function(e){this.options=e,this.warn=e.warn||Sr,this.transforms=Tr(e.modules,"transformCode"),this.dataGenFns=Tr(e.modules,"genData"),this.directives=A(A({},Ia),e.directives);var t=e.isReservedTag||T;this.maybeComponent=function(e){return!!e.component||!t(e.tag)},this.onceId=0,this.staticRenderFns=[],this.pre=!1};function Pa(e,t){var n=new Fa(t);return{render:"with(this){return "+(e?Ra(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function Ra(e,t){if(e.parent&&(e.pre=e.pre||e.parent.pre),e.staticRoot&&!e.staticProcessed)return Ha(e,t);if(e.once&&!e.onceProcessed)return Ba(e,t);if(e.for&&!e.forProcessed)return za(e,t);if(e.if&&!e.ifProcessed)return Ua(e,t);if("template"!==e.tag||e.slotTarget||t.pre){if("slot"===e.tag)return function(e,t){var n=e.slotName||'"default"',r=qa(e,t),i="_t("+n+(r?","+r:""),o=e.attrs||e.dynamicAttrs?Ga((e.attrs||[]).concat(e.dynamicAttrs||[]).map(function(e){return{name:b(e.name),value:e.value,dynamic:e.dynamic}})):null,a=e.attrsMap["v-bind"];!o&&!a||r||(i+=",null");o&&(i+=","+o);a&&(i+=(o?"":",null")+","+a);return i+")"}(e,t);var n;if(e.component)n=function(e,t,n){var r=t.inlineTemplate?null:qa(t,n,!0);return"_c("+e+","+Va(t,n)+(r?","+r:"")+")"}(e.component,e,t);else{var r;(!e.plain||e.pre&&t.maybeComponent(e))&&(r=Va(e,t));var i=e.inlineTemplate?null:qa(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return qa(e,t)||"void 0"}function Ha(e,t){e.staticProcessed=!0;var n=t.pre;return e.pre&&(t.pre=e.pre),t.staticRenderFns.push("with(this){return "+Ra(e,t)+"}"),t.pre=n,"_m("+(t.staticRenderFns.length-1)+(e.staticInFor?",true":"")+")"}function Ba(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return Ua(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+Ra(e,t)+","+t.onceId+++","+n+")":Ra(e,t)}return Ha(e,t)}function Ua(e,t,n,r){return e.ifProcessed=!0,function e(t,n,r,i){if(!t.length)return i||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+a(o.block)+":"+e(t,n,r,i):""+a(o.block);function a(e){return r?r(e,n):e.once?Ba(e,n):Ra(e,n)}}(e.ifConditions.slice(),t,n,r)}function za(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||Ra)(e,t)+"})"}function Va(e,t){var n="{",r=function(e,t){var n=e.directives;if(!n)return;var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?",arg:"+(o.isDynamicArg?o.arg:'"'+o.arg+'"'):"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}if(c)return s.slice(0,-1)+"]"}(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:"+Ga(e.attrs)+","),e.props&&(n+="domProps:"+Ga(e.props)+","),e.events&&(n+=Da(e.events,!1)+","),e.nativeEvents&&(n+=Da(e.nativeEvents,!0)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=function(e,t,n){var r=e.for||Object.keys(t).some(function(e){var n=t[e];return n.slotTargetDynamic||n.if||n.for||Ka(n)}),i=!!e.if;if(!r)for(var o=e.parent;o;){if(o.slotScope&&o.slotScope!==ca||o.for){r=!0;break}o.if&&(i=!0),o=o.parent}var a=Object.keys(t).map(function(e){return Ja(t[e],n)}).join(",");return"scopedSlots:_u(["+a+"]"+(r?",null,true":"")+(!r&&i?",null,false,"+function(e){var t=5381,n=e.length;for(;n;)t=33*t^e.charCodeAt(--n);return t>>>0}(a):"")+")"}(e,e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=function(e,t){var n=e.children[0];if(n&&1===n.type){var r=Pa(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.dynamicAttrs&&(n="_b("+n+',"'+e.tag+'",'+Ga(e.dynamicAttrs)+")"),e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function Ka(e){return 1===e.type&&("slot"===e.tag||e.children.some(Ka))}function Ja(e,t){var n=e.attrsMap["slot-scope"];if(e.if&&!e.ifProcessed&&!n)return Ua(e,t,Ja,"null");if(e.for&&!e.forProcessed)return za(e,t,Ja);var r=e.slotScope===ca?"":String(e.slotScope),i="function("+r+"){return "+("template"===e.tag?e.if&&n?"("+e.if+")?"+(qa(e,t)||"undefined")+":undefined":qa(e,t)||"undefined":Ra(e,t))+"}",o=r?"":",proxy:true";return"{key:"+(e.slotTarget||'"default"')+",fn:"+i+o+"}"}function qa(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag){var s=n?t.maybeComponent(a)?",1":",0":"";return""+(r||Ra)(a,t)+s}var c=n?function(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(Wa(i)||i.ifConditions&&i.ifConditions.some(function(e){return Wa(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}(o,t.maybeComponent):0,u=i||Za;return"["+o.map(function(e){return u(e,t)}).join(",")+"]"+(c?","+c:"")}}function Wa(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function Za(e,t){return 1===e.type?Ra(e,t):3===e.type&&e.isComment?(r=e,"_e("+JSON.stringify(r.text)+")"):"_v("+(2===(n=e).type?n.expression:Xa(JSON.stringify(n.text)))+")";var n,r}function Ga(e){for(var t="",n="",r=0;r<e.length;r++){var i=e[r],o=Xa(i.value);i.dynamic?n+=i.name+","+o+",":t+='"'+i.name+'":'+o+","}return t="{"+t.slice(0,-1)+"}",n?"_d("+t+",["+n.slice(0,-1)+"])":t}function Xa(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b");function Ya(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),S}}function Qa(e){var t=Object.create(null);return function(n,r,i){(r=A({},r)).warn;delete r.warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=Ya(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return Ya(e,c)}),t[o]=s}}var es,ts,ns=(es=function(e,t){var n=la(e.trim(),t);!1!==t.optimize&&ka(n,t);var r=Pa(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}},function(e){function t(t,n){var r=Object.create(e),i=[],o=[];if(n)for(var a in n.modules&&(r.modules=(e.modules||[]).concat(n.modules)),n.directives&&(r.directives=A(Object.create(e.directives||null),n.directives)),n)"modules"!==a&&"directives"!==a&&(r[a]=n[a]);r.warn=function(e,t,n){(n?o:i).push(e)};var s=es(t.trim(),r);return s.errors=i,s.tips=o,s}return{compile:t,compileToFunctions:Qa(t)}})(Ca),rs=(ns.compile,ns.compileToFunctions);function is(e){return(ts=ts||document.createElement("div")).innerHTML=e?'<a href="\n"/>':'<div a="\n"/>',ts.innerHTML.indexOf("&#10;")>0}var os=!!z&&is(!1),as=!!z&&is(!0),ss=g(function(e){var t=Yn(e);return t&&t.innerHTML}),cs=wn.prototype.$mount;return wn.prototype.$mount=function(e,t){if((e=e&&Yn(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=ss(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=function(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}(e));if(r){var i=rs(r,{outputSourceRange:!1,shouldDecodeNewlines:os,shouldDecodeNewlinesForHref:as,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return cs.call(this,e,t)},wn.compile=rs,wn});
/*! Sortable 1.8.4 - MIT | git://github.com/SortableJS/Sortable.git */

!function(t){"use strict";"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module&&void 0!==module.exports?module.exports=t():window.Sortable=t()}(function(){"use strict";if("undefined"==typeof window||!window.document)return function(){throw new Error("Sortable.js requires a window with a document")};var U,V,f,u,q,G,h,X,Y,A,K,n,Z,Q,l,s,c,p,k,J,$,tt,et,ot,g,nt,I=[],B=!1,v=!1,it=!1,d=[],rt=!1,at=!1,m=[],i=/\s+/g,lt="Sortable"+(new Date).getTime(),b=window,st=b.document,w=b.parseInt,ct=b.setTimeout,e=b.jQuery||b.Zepto,o=b.Polymer,r={capture:!1,passive:!1},dt=!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),_=!!navigator.userAgent.match(/Edge/i),y=!!navigator.userAgent.match(/firefox/i),D=!(!navigator.userAgent.match(/safari/i)||navigator.userAgent.match(/chrome/i)||navigator.userAgent.match(/android/i)),S=!!navigator.userAgent.match(/iP(ad|od|hone)/i),T=_||dt?"cssFloat":"float",a="draggable"in st.createElement("div"),C=function(){if(dt)return!1;var t=st.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}(),ht=!1,E=!1,ut=Math.abs,x=Math.min,N=Math.max,M=[],P=function(t,e){var o=Dt(t),n=w(o.width)-w(o.paddingLeft)-w(o.paddingRight)-w(o.borderLeftWidth)-w(o.borderRightWidth),i=Mt(t,0,e),r=Mt(t,1,e),a=i&&Dt(i),l=r&&Dt(r),s=a&&w(a.marginLeft)+w(a.marginRight)+Lt(i).width,c=l&&w(l.marginLeft)+w(l.marginRight)+Lt(r).width;if("flex"===o.display)return"column"===o.flexDirection||"column-reverse"===o.flexDirection?"vertical":"horizontal";if("grid"===o.display)return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(i&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==l.clear&&l.clear!==d?"horizontal":"vertical"}return i&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||n<=s&&"none"===o[T]||r&&"none"===o[T]&&n<s+c)?"vertical":"horizontal"},O=function(t,e){if(!t||!t.getBoundingClientRect)return H();var o=t,n=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var i=Dt(o);if(o.clientWidth<o.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!o||!o.getBoundingClientRect||o===st.body)return H();if(n||e)return o;n=!0}}}while(o=o.parentNode);return H()},H=function(){return dt?st.documentElement:st.scrollingElement},ft=function(t,e,o){t.scrollLeft+=e,t.scrollTop+=o},R=It(function(o,t,e,n){if(t.scroll){var i=e?e[lt]:window,r=t.scrollSensitivity,a=t.scrollSpeed,l=o.clientX,s=o.clientY,c=H(),d=!1;Y!==e&&(L(),X=t.scroll,A=t.scrollFn,!0===X&&(X=O(e,!0),Y=X));var h=0,u=X;do{var f,p,g,v,m,b,w,_,y,D=u,S=Lt(D),T=S.top,C=S.bottom,E=S.left,x=S.right,N=S.width,M=S.height;if(f=D.scrollWidth,p=D.scrollHeight,g=Dt(D),_=D.scrollLeft,y=D.scrollTop,w=D===c?(b=N<f&&("auto"===g.overflowX||"scroll"===g.overflowX||"visible"===g.overflowX),M<p&&("auto"===g.overflowY||"scroll"===g.overflowY||"visible"===g.overflowY)):(b=N<f&&("auto"===g.overflowX||"scroll"===g.overflowX),M<p&&("auto"===g.overflowY||"scroll"===g.overflowY)),v=b&&(ut(x-l)<=r&&_+N<f)-(ut(E-l)<=r&&!!_),m=w&&(ut(C-s)<=r&&y+M<p)-(ut(T-s)<=r&&!!y),!I[h])for(var P=0;P<=h;P++)I[P]||(I[P]={});I[h].vx==v&&I[h].vy==m&&I[h].el===D||(I[h].el=D,I[h].vx=v,I[h].vy=m,clearInterval(I[h].pid),!D||0==v&&0==m||(d=!0,I[h].pid=setInterval(function(){n&&0===this.layer&&(mt.active._emulateDragOver(!0),mt.active._onTouchMove(k,!0));var t=I[this.layer].vy?I[this.layer].vy*a:0,e=I[this.layer].vx?I[this.layer].vx*a:0;"function"==typeof A&&"continue"!==A.call(i,e,t,o,k,I[this.layer].el)||ft(I[this.layer].el,e,t)}.bind({layer:h}),24))),h++}while(t.bubbleScroll&&u!==c&&(u=O(u,!1)));B=d}},30),L=function(){I.forEach(function(t){clearInterval(t.pid)}),I=[]},W=function(t){function s(a,l){return function(t,e,o,n){var i=t.options.group.name&&e.options.group.name&&t.options.group.name===e.options.group.name;if(null==a&&(l||i))return!0;if(null==a||!1===a)return!1;if(l&&"clone"===a)return a;if("function"==typeof a)return s(a(t,e,o,n),l)(t,e,o,n);var r=(l?t:e).options.group.name;return!0===a||"string"==typeof a&&a===r||a.join&&-1<a.indexOf(r)}}var e={},o=t.group;o&&"object"==typeof o||(o={name:o}),e.name=o.name,e.checkPull=s(o.pull,!0),e.checkPut=s(o.put),e.revertClone=o.revertClone,t.group=e},F=function(t){U&&U.parentNode&&U.parentNode[lt]&&U.parentNode[lt]._computeIsAligned(t)},pt=function(t,e){for(var o=e;!o[lt];)o=o.parentNode;return t===o},gt=function(t,e,o){for(var n=t.parentNode;n&&!n[lt];)n=n.parentNode;n&&n[lt][o](Bt(e,{artificialBubble:!0}))},z=function(){!C&&f&&Dt(f,"display","none")},j=function(){!C&&f&&Dt(f,"display","")};st.addEventListener("click",function(t){if(it)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),it=!1},!0);var vt,t=function(t){if(t=t.touches?t.touches[0]:t,U){var e=function(t,e){for(var o=0;o<d.length;o++)if(!Pt(d[o])){var n=Lt(d[o]),i=d[o][lt].options.emptyInsertThreshold,r=t>=n.left-i&&t<=n.right+i,a=e>=n.top-i&&e<=n.bottom+i;if(r&&a)return d[o]}}(t.clientX,t.clientY);e&&e[lt]._onDragOver({clientX:t.clientX,clientY:t.clientY,target:e,rootEl:e})}};function mt(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, not "+{}.toString.call(t);this.el=t,this.options=e=Bt({},e),t[lt]=this;var o={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,draggable:/[uo]l/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return P(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,touchStartThreshold:w(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==mt.supportPointer&&("PointerEvent"in window||window.navigator&&"msPointerEnabled"in window.navigator),emptyInsertThreshold:5};for(var n in o)!(n in e)&&(e[n]=o[n]);for(var i in W(e),this)"_"===i.charAt(0)&&"function"==typeof this[i]&&(this[i]=this[i].bind(this));this.nativeDraggable=!e.forceFallback&&a,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?wt(t,"pointerdown",this._onTapStart):(wt(t,"mousedown",this._onTapStart),wt(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(wt(t,"dragover",this),wt(t,"dragenter",this)),d.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[])}function bt(t,e,o,n){if(t){o=o||st;do{if(null!=e&&(">"===e[0]&&t.parentNode===o&&kt(t,e.substring(1))||kt(t,e))||n&&t===o)return t;if(t===o)break}while(t=(i=t).host&&i!==st&&i.host.nodeType?i.host:i.parentNode)}var i;return null}function wt(t,e,o){t.addEventListener(e,o,r)}function _t(t,e,o){t.removeEventListener(e,o,r)}function yt(t,e,o){if(t&&e)if(t.classList)t.classList[o?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(i," ").replace(" "+e+" "," ");t.className=(n+(o?" "+e:"")).replace(i," ")}}function Dt(t,e,o){var n=t&&t.style;if(n){if(void 0===o)return st.defaultView&&st.defaultView.getComputedStyle?o=st.defaultView.getComputedStyle(t,""):t.currentStyle&&(o=t.currentStyle),void 0===e?o:o[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=o+("string"==typeof o?"":"px")}}function St(t){var e="";do{var o=Dt(t,"transform");o&&"none"!==o&&(e=o+" "+e)}while(t=t.parentNode);return window.DOMMatrix?new DOMMatrix(e):window.WebKitCSSMatrix?new WebKitCSSMatrix(e):window.CSSMatrix?new CSSMatrix(e):void 0}function Tt(t,e,o){if(t){var n=t.getElementsByTagName(e),i=0,r=n.length;if(o)for(;i<r;i++)o(n[i],i);return n}return[]}function Ct(t,e,o,n,i,r,a,l,s){var c,d=(t=t||e[lt]).options,h="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||dt||_?(c=st.createEvent("Event")).initEvent(o,!0,!0):c=new CustomEvent(o,{bubbles:!0,cancelable:!0}),c.to=i||e,c.from=r||e,c.item=n||e,c.clone=u,c.oldIndex=a,c.newIndex=l,c.originalEvent=s,c.pullMode=Q?Q.lastPutMode:void 0,e&&e.dispatchEvent(c),d[h]&&d[h].call(t,c)}function Et(t,e,o,n,i,r,a,l){var s,c,d=t[lt],h=d.options.onMove;return!window.CustomEvent||dt||_?(s=st.createEvent("Event")).initEvent("move",!0,!0):s=new CustomEvent("move",{bubbles:!0,cancelable:!0}),s.to=e,s.from=t,s.dragged=o,s.draggedRect=n,s.related=i||e,s.relatedRect=r||Lt(e),s.willInsertAfter=l,s.originalEvent=a,t.dispatchEvent(s),h&&(c=h.call(d,s,a)),c}function xt(t){t.draggable=!1}function Nt(){ht=!1}function Mt(t,e,o){for(var n=0,i=0,r=t.children;i<r.length;){if("none"!==r[i].style.display&&r[i]!==f&&r[i]!==U&&bt(r[i],o.draggable,t,!1)){if(n===e)return r[i];n++}i++}return null}function Pt(t){for(var e=t.lastElementChild;e&&(e===f||"none"===e.style.display);)e=e.previousElementSibling;return e||null}function Xt(t){return At(U)<At(t)?1:-1}function Yt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,o=e.length,n=0;o--;)n+=e.charCodeAt(o);return n.toString(36)}function At(t,e){var o=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"!==t.nodeName.toUpperCase()&&t!==u&&o++;return o}function kt(t,e){if(t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}function It(o,n){return function(){if(!vt){var t=arguments,e=this;vt=ct(function(){1===t.length?o.call(e,t[0]):o.apply(e,t),vt=void 0},n)}}}function Bt(t,e){if(t&&e)for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}function Ot(t){return o&&o.dom?o.dom(t).cloneNode(!0):e?e(t).clone(!0)[0]:t.cloneNode(!0)}function Ht(t){return ct(t,0)}function Rt(t){return clearTimeout(t)}function Lt(t,e,o,n){if(t.getBoundingClientRect||t===b){var i,r,a,l,s,c,d;if(d=t!==b&&t!==H()?(r=(i=t.getBoundingClientRect()).top,a=i.left,l=i.bottom,s=i.right,c=i.height,i.width):(a=r=0,l=window.innerHeight,s=window.innerWidth,c=window.innerHeight,window.innerWidth),n&&t!==b&&(o=o||t.parentNode,!dt))do{if(o&&o.getBoundingClientRect&&"none"!==Dt(o,"transform")){var h=o.getBoundingClientRect();r-=h.top+w(Dt(o,"border-top-width")),a-=h.left+w(Dt(o,"border-left-width")),l=r+i.height,s=a+i.width;break}}while(o=o.parentNode);if(e&&t!==b){var u=St(o||t),f=u&&u.a,p=u&&u.d;u&&(l=(r/=p)+(c/=p),s=(a/=f)+(d/=f))}return{top:r,left:a,bottom:l,right:s,width:d,height:c}}}function Wt(t,e){for(var o=O(t,!0),n=Lt(t)[e];o;){var i=Lt(o)[e];if(!("top"===e||"left"===e?i<=n:n<=i))return o;if(o===H())break;o=O(o,!1)}return!1}function Ft(t){var e=0,o=0,n=H();if(t)do{var i=St(t),r=i.a,a=i.d;e+=t.scrollLeft*r,o+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,o]}return wt(st,"dragover",t),wt(st,"mousemove",t),wt(st,"touchmove",t),mt.prototype={constructor:mt,_computeIsAligned:function(t){var e;if(f&&!C?(z(),e=st.elementFromPoint(t.clientX,t.clientY),j()):e=t.target,e=bt(e,this.options.draggable,this.el,!1),!E&&U&&U.parentNode===this.el){for(var o,n,i,r,a,l,s,c,d=this.el.children,h=0;h<d.length;h++)bt(d[h],this.options.draggable,this.el,!1)&&d[h]!==e&&(d[h].sortableMouseAligned=(o=t.clientX,n=t.clientY,i=d[h],r=this._getDirection(t,null),this.options,void 0,a=Lt(i),l="vertical"===r?a.left:a.top,s="vertical"===r?a.right:a.bottom,l<(c="vertical"===r?o:n)&&c<s));bt(e,this.options.draggable,this.el,!0)||($=null),E=!0,ct(function(){E=!1},30)}},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,U):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e,o=this,n=this.el,i=this.options,r=i.preventOnFilter,a=t.type,l=t.touches&&t.touches[0],s=(l||t).target,c=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,d=i.filter;if(function(t){M.length=0;var e=t.getElementsByTagName("input"),o=e.length;for(;o--;){var n=e[o];n.checked&&M.push(n)}}(n),(!dt||t.artificialBubble||pt(n,s))&&!U&&!(/mousedown|pointerdown/.test(a)&&0!==t.button||i.disabled||c.isContentEditable))if(s=bt(s,i.draggable,n,!1)){if(h!==s){if(e=At(s,i.draggable),"function"==typeof d){if(d.call(this,t,s,this))return Ct(o,c,"filter",s,n,n,e),void(r&&t.cancelable&&t.preventDefault())}else if(d&&(d=d.split(",").some(function(t){if(t=bt(c,t.trim(),n,!1))return Ct(o,t,"filter",s,n,n,e),!0})))return void(r&&t.cancelable&&t.preventDefault());i.handle&&!bt(c,i.handle,n,!1)||this._prepareDragStart(t,l,s,e)}}else dt&&gt(n,t,"_onTapStart")}},_handleAutoScroll:function(e,o){if(U&&this.options.scroll){var n=e.clientX,i=e.clientY,t=st.elementFromPoint(n,i),r=this;if(o||_||dt||D){R(e,r.options,t,o);var a=O(t,!0);!B||l&&n===s&&i===c||(l&&clearInterval(l),l=setInterval(function(){if(U){var t=O(st.elementFromPoint(n,i),!0);t!==a&&(a=t,L(),R(e,r.options,a,o))}},10),s=n,c=i)}else{if(!r.options.bubbleScroll||O(t,!0)===H())return void L();R(e,r.options,O(t,!1),!1)}}},_prepareDragStart:function(t,e,o,n){var i,r=this,a=r.el,l=r.options,s=a.ownerDocument;o&&!U&&o.parentNode===a&&(q=a,V=(U=o).parentNode,G=U.nextSibling,h=o,Z=l.group,K=n,p={target:U,clientX:(e||t).clientX,clientY:(e||t).clientY},this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,U.style["will-change"]="all",U.style.transition="",U.style.transform="",i=function(){r._disableDelayedDragEvents(),!y&&r.nativeDraggable&&(U.draggable=!0),r._triggerDragStart(t,e),Ct(r,q,"choose",U,q,q,K),yt(U,l.chosenClass,!0)},l.ignore.split(",").forEach(function(t){Tt(U,t.trim(),xt)}),l.supportPointer?wt(s,"pointerup",r._onDrop):(wt(s,"mouseup",r._onDrop),wt(s,"touchend",r._onDrop),wt(s,"touchcancel",r._onDrop)),y&&this.nativeDraggable&&(this.options.touchStartThreshold=4,U.draggable=!0),!l.delay||this.nativeDraggable&&(_||dt)?i():(wt(s,"mouseup",r._disableDelayedDrag),wt(s,"touchend",r._disableDelayedDrag),wt(s,"touchcancel",r._disableDelayedDrag),wt(s,"mousemove",r._delayedDragTouchMoveHandler),wt(s,"touchmove",r._delayedDragTouchMoveHandler),l.supportPointer&&wt(s,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=ct(i,l.delay)))},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;N(ut(e.clientX-this._lastX),ut(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){U&&xt(U),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;_t(t,"mouseup",this._disableDelayedDrag),_t(t,"touchend",this._disableDelayedDrag),_t(t,"touchcancel",this._disableDelayedDrag),_t(t,"mousemove",this._delayedDragTouchMoveHandler),_t(t,"touchmove",this._delayedDragTouchMoveHandler),_t(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||("touch"==t.pointerType?t:null),!this.nativeDraggable||e?this.options.supportPointer?wt(st,"pointermove",this._onTouchMove):wt(st,e?"touchmove":"mousemove",this._onTouchMove):(wt(U,"dragend",this),wt(q,"dragstart",this._onDragStart));try{st.selection?Ht(function(){st.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(v=!1,q&&U){this.nativeDraggable&&(wt(st,"dragover",this._handleAutoScroll),wt(st,"dragover",F));var o=this.options;!t&&yt(U,o.dragClass,!1),yt(U,o.ghostClass,!0),Dt(U,"transform",""),mt.active=this,t&&this._appendGhost(),Ct(this,q,"start",U,q,q,K,void 0,e)}else this._nulling()},_emulateDragOver:function(t){if(k){if(this._lastX===k.clientX&&this._lastY===k.clientY&&!t)return;this._lastX=k.clientX,this._lastY=k.clientY,z();for(var e=st.elementFromPoint(k.clientX,k.clientY),o=e;e&&e.shadowRoot;)o=e=e.shadowRoot.elementFromPoint(k.clientX,k.clientY);if(o)do{if(o[lt])if(o[lt]._onDragOver({clientX:k.clientX,clientY:k.clientY,target:e,rootEl:o})&&!this.options.dragoverBubble)break;e=o}while(o=o.parentNode);U.parentNode[lt]._computeIsAligned(k),j()}},_onTouchMove:function(t,e){if(p){var o=this.options,n=o.fallbackTolerance,i=o.fallbackOffset,r=t.touches?t.touches[0]:t,a=f&&St(f),l=f&&a&&a.a,s=f&&a&&a.d,c=S&&g&&Ft(g),d=(r.clientX-p.clientX+i.x)/(l||1)+(c?c[0]-m[0]:0)/(l||1),h=(r.clientY-p.clientY+i.y)/(s||1)+(c?c[1]-m[1]:0)/(s||1),u=t.touches?"translate3d("+d+"px,"+h+"px,0)":"translate("+d+"px,"+h+"px)";if(!mt.active&&!v){if(n&&x(ut(r.clientX-this._lastX),ut(r.clientY-this._lastY))<n)return;this._onDragStart(t,!0)}!e&&this._handleAutoScroll(r,!0),J=!0,k=r,Dt(f,"webkitTransform",u),Dt(f,"mozTransform",u),Dt(f,"msTransform",u),Dt(f,"transform",u),t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!f){var t=this.options.fallbackOnBody?st.body:q,e=Lt(U,!0,t,!S),o=(Dt(U),this.options);if(S){for(g=t;"static"===Dt(g,"position")&&"none"===Dt(g,"transform")&&g!==st;)g=g.parentNode;if(g!==st){var n=Lt(g,!0);e.top-=n.top,e.left-=n.left}g!==st.body&&g!==st.documentElement?(g===st&&(g=H()),e.top+=g.scrollTop,e.left+=g.scrollLeft):g=H(),m=Ft(g)}yt(f=U.cloneNode(!0),o.ghostClass,!1),yt(f,o.fallbackClass,!0),yt(f,o.dragClass,!0),Dt(f,"box-sizing","border-box"),Dt(f,"margin",0),Dt(f,"top",e.top),Dt(f,"left",e.left),Dt(f,"width",e.width),Dt(f,"height",e.height),Dt(f,"opacity","0.8"),Dt(f,"position",S?"absolute":"fixed"),Dt(f,"zIndex","100000"),Dt(f,"pointerEvents","none"),t.appendChild(f)}},_onDragStart:function(t,e){var o=this,n=t.dataTransfer,i=o.options;(u=Ot(U)).draggable=!1,u.style["will-change"]="",this._hideClone(),yt(u,o.options.chosenClass,!1),o._cloneId=Ht(function(){o.options.removeCloneOnHide||q.insertBefore(u,U),Ct(o,q,"clone",U)}),!e&&yt(U,i.dragClass,!0),e?(it=!0,o._loopId=setInterval(o._emulateDragOver,50)):(_t(st,"mouseup",o._onDrop),_t(st,"touchend",o._onDrop),_t(st,"touchcancel",o._onDrop),n&&(n.effectAllowed="move",i.setData&&i.setData.call(o,n,U)),wt(st,"drop",o),Dt(U,"transform","translateZ(0)")),v=!0,o._dragStartId=Ht(o._dragStarted.bind(o,e,t)),wt(st,"selectstart",o),D&&Dt(st.body,"user-select","none")},_onDragOver:function(e){var o,n,t,i=this.el,r=e.target,a=this.options,l=a.group,s=mt.active,c=Z===l,d=a.sort,h=this;if(!ht&&(!dt||e.rootEl||e.artificialBubble||pt(i,r))){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),J=!0,r=bt(r,a.draggable,i,!0),bt(e.target,null,U,!0)||r.animated)return z(!1);if(r!==U&&(it=!1),s&&!a.disabled&&(c?d||(t=!q.contains(U)):Q===this||(this.lastPutMode=Z.checkPull(this,s,U,e))&&l.checkPut(this,s,U,e))){var u=this._getDirection(e,r);if(o=Lt(U),t)return this._hideClone(),V=q,G?q.insertBefore(U,G):q.appendChild(U),z(!0);var f=Pt(i);if(f&&(I=e,B=u,O=Lt(Pt(i)),H="vertical"===B?I.clientY:I.clientX,R="vertical"===B?I.clientX:I.clientY,L="vertical"===B?O.bottom:O.right,W="vertical"===B?O.left:O.top,F="vertical"===B?O.right:O.bottom,!("vertical"===B?F+10<R||R<=F&&L<H&&W<=R:L<H&&W<R||H<=L&&F+10<R)||f.animated)){if(r&&r!==U&&r.parentNode===i){var p,g=0,v=r.sortableMouseAligned,m=U.parentNode!==i,b="vertical"===u?"top":"left",w=Wt(r,"top")||Wt(U,"top"),_=w?w.scrollTop:void 0;if($!==r&&(et=null,p=Lt(r)[b],rt=!1),C=r,E=u,x=(T=U)===U&&nt||Lt(T),N=C===U&&nt||Lt(C),M="vertical"===E?x.left:x.top,P="vertical"===E?x.right:x.bottom,X="vertical"===E?x.width:x.height,Y="vertical"===E?N.left:N.top,A="vertical"===E?N.right:N.bottom,k="vertical"===E?N.width:N.height,et=(M===Y||P===A||M+X/2===Y+k/2)&&v||m||w||a.invertSwap||"insert"===et||"swap"===et?("swap"!==et&&(at=a.invertSwap||m),g=function(t,e,o,n,i,r,a){var l=Lt(e),s="vertical"===o?t.clientY:t.clientX,c="vertical"===o?l.height:l.width,d="vertical"===o?l.top:l.left,h="vertical"===o?l.bottom:l.right,u=Lt(U),f=!1;if(!r)if(a&&ot<c*n)if(!rt&&(1===tt?d+c*i/2<s:s<h-c*i/2)&&(rt=!0),rt)f=!0;else{"vertical"===o?u.top:u.left,"vertical"===o?u.bottom:u.right;if(1===tt?s<d+ot:h-ot<s)return-1*tt}else if(d+c*(1-n)/2<s&&s<h-c*(1-n)/2)return Xt(e);if((f=f||r)&&(s<d+c*i/2||h-c*i/2<s))return d+c/2<s?1:-1;return 0}(e,r,u,a.swapThreshold,null==a.invertedSwapThreshold?a.swapThreshold:a.invertedSwapThreshold,at,$===r),"swap"):(g=Xt(r),"insert"),0===g)return z(!1);nt=null,tt=g,n=Lt($=r);var y=r.nextElementSibling,D=!1,S=Et(q,i,U,o,r,n,e,D=1===g);if(!1!==S)return 1!==S&&-1!==S||(D=1===S),ht=!0,ct(Nt,30),c?s._hideClone():s._showClone(this),D&&!y?i.appendChild(U):r.parentNode.insertBefore(U,D?y:r),w&&ft(w,0,_-w.scrollTop),V=U.parentNode,void 0===p||at||(ot=ut(p-Lt(r)[b])),j(),z(!0)}}else if(f&&i===e.target&&(r=f),r&&(n=Lt(r)),c?s._hideClone():s._showClone(this),!1!==Et(q,i,U,o,r,n,e,!!r))return i.appendChild(U),V=i,nt=null,j(),z(!0);if(i.contains(U))return z(!1)}var T,C,E,x,N,M,P,X,Y,A,k,I,B,O,H,R,L,W,F;return dt&&!e.rootEl&&gt(i,e,"_onDragOver"),!1}function z(t){return t&&(c?s._hideClone():s._showClone(h),s&&(yt(U,Q?Q.options.ghostClass:s.options.ghostClass,!1),yt(U,a.ghostClass,!0)),Q!==h&&h!==mt.active?Q=h:h===mt.active&&(Q=null),o&&h._animate(o,U),r&&n&&h._animate(n,r)),(r===U&&!U.animated||r===i&&!r.animated)&&($=null),a.dragoverBubble||e.rootEl||r===st||(h._handleAutoScroll(e),U.parentNode[lt]._computeIsAligned(e)),!a.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),!0}function j(){Ct(h,q,"change",r,i,q,K,At(U,a.draggable),e)}},_animate:function(t,e){var o=this.options.animation;if(o){var n=Lt(e);if(e===U&&(nt=n),1===t.nodeType&&(t=Lt(t)),t.left+t.width/2!==n.left+n.width/2||t.top+t.height/2!==n.top+n.height/2){var i=St(this.el),r=i&&i.a,a=i&&i.d;Dt(e,"transition","none"),Dt(e,"transform","translate3d("+(t.left-n.left)/(r||1)+"px,"+(t.top-n.top)/(a||1)+"px,0)"),e.offsetWidth,Dt(e,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),Dt(e,"transform","translate3d(0,0,0)")}"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=ct(function(){Dt(e,"transition",""),Dt(e,"transform",""),e.animated=!1},o)}},_offUpEvents:function(){var t=this.el.ownerDocument;_t(st,"touchmove",this._onTouchMove),_t(st,"pointermove",this._onTouchMove),_t(t,"mouseup",this._onDrop),_t(t,"touchend",this._onDrop),_t(t,"pointerup",this._onDrop),_t(t,"touchcancel",this._onDrop),_t(st,"selectstart",this)},_onDrop:function(t){var e=this.el,o=this.options;rt=at=B=v=!1,clearInterval(this._loopId),clearInterval(l),L(),clearTimeout(vt),vt=void 0,clearTimeout(this._dragStartTimer),Rt(this._cloneId),Rt(this._dragStartId),_t(st,"mousemove",this._onTouchMove),this.nativeDraggable&&(_t(st,"drop",this),_t(e,"dragstart",this._onDragStart),_t(st,"dragover",this._handleAutoScroll),_t(st,"dragover",F)),D&&Dt(st.body,"user-select",""),this._offUpEvents(),t&&(J&&(t.cancelable&&t.preventDefault(),!o.dropBubble&&t.stopPropagation()),f&&f.parentNode&&f.parentNode.removeChild(f),(q===V||Q&&"clone"!==Q.lastPutMode)&&u&&u.parentNode&&u.parentNode.removeChild(u),U&&(this.nativeDraggable&&_t(U,"dragend",this),xt(U),U.style["will-change"]="",yt(U,Q?Q.options.ghostClass:this.options.ghostClass,!1),yt(U,this.options.chosenClass,!1),Ct(this,q,"unchoose",U,V,q,K,null,t),q!==V?(0<=(n=At(U,o.draggable))&&(Ct(null,V,"add",U,V,q,K,n,t),Ct(this,q,"remove",U,V,q,K,n,t),Ct(null,V,"sort",U,V,q,K,n,t),Ct(this,q,"sort",U,V,q,K,n,t)),Q&&Q.save()):U.nextSibling!==G&&0<=(n=At(U,o.draggable))&&(Ct(this,q,"update",U,V,q,K,n,t),Ct(this,q,"sort",U,V,q,K,n,t)),mt.active&&(null!=n&&-1!==n||(n=K),Ct(this,q,"end",U,V,q,K,n,t),this.save()))),this._nulling()},_nulling:function(){q=U=V=f=G=u=h=X=Y=I.length=l=s=c=p=k=J=n=K=$=tt=nt=Q=Z=mt.active=null,M.forEach(function(t){t.checked=!0}),M.length=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":U&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],o=this.el.children,n=0,i=o.length,r=this.options;n<i;n++)bt(t=o[n],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||Yt(t));return e},sort:function(t){var n={},i=this.el;this.toArray().forEach(function(t,e){var o=i.children[e];bt(o,this.options.draggable,i,!1)&&(n[t]=o)},this),t.forEach(function(t){n[t]&&(i.removeChild(n[t]),i.appendChild(n[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return bt(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var o=this.options;if(void 0===e)return o[t];o[t]=e,"group"===t&&W(o)},destroy:function(){var t=this.el;t[lt]=null,_t(t,"mousedown",this._onTapStart),_t(t,"touchstart",this._onTapStart),_t(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(_t(t,"dragover",this),_t(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),d.splice(d.indexOf(this.el),1),this.el=t=null},_hideClone:function(){u.cloneHidden||(Dt(u,"display","none"),u.cloneHidden=!0,u.parentNode&&this.options.removeCloneOnHide&&u.parentNode.removeChild(u))},_showClone:function(t){"clone"===t.lastPutMode?u.cloneHidden&&(q.contains(U)&&!this.options.group.revertClone?q.insertBefore(u,U):G?q.insertBefore(u,G):q.appendChild(u),this.options.group.revertClone&&this._animate(U,u),Dt(u,"display",""),u.cloneHidden=!1):this._hideClone()}},wt(st,"touchmove",function(t){(mt.active||v)&&t.cancelable&&t.preventDefault()}),mt.utils={on:wt,off:_t,css:Dt,find:Tt,is:function(t,e){return!!bt(t,e,t,!1)},extend:Bt,throttle:It,closest:bt,toggleClass:yt,clone:Ot,index:At,nextTick:Ht,cancelNextTick:Rt,detectDirection:P,getChild:Mt},mt.create=function(t,e){return new mt(t,e)},mt.version="1.8.4",mt});
(function(t,n){"object"===typeof exports&&"object"===typeof module?module.exports=n(require("sortablejs")):"function"===typeof define&&define.amd?define(["sortablejs"],n):"object"===typeof exports?exports["vuedraggable"]=n(require("sortablejs")):t["vuedraggable"]=n(t["Sortable"])})("undefined"!==typeof self?self:this,function(t){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s="fb15")}({"02f4":function(t,n,e){var r=e("4588"),o=e("be13");t.exports=function(t){return function(n,e){var i,u,c=String(o(n)),a=r(e),f=c.length;return a<0||a>=f?t?"":void 0:(i=c.charCodeAt(a),i<55296||i>56319||a+1===f||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536)}}},"0390":function(t,n,e){"use strict";var r=e("02f4")(!0);t.exports=function(t,n,e){return n+(e?r(t,n).length:1)}},"07e3":function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},"0bfb":function(t,n,e){"use strict";var r=e("cb7c");t.exports=function(){var t=r(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},"0fc9":function(t,n,e){var r=e("3a38"),o=Math.max,i=Math.min;t.exports=function(t,n){return t=r(t),t<0?o(t+n,0):i(t,n)}},1654:function(t,n,e){"use strict";var r=e("71c1")(!0);e("30f1")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,e=this._i;return e>=n.length?{value:void 0,done:!0}:(t=r(n,e),this._i+=t.length,{value:t,done:!1})})},1691:function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},"1af6":function(t,n,e){var r=e("63b6");r(r.S,"Array",{isArray:e("9003")})},"1bc3":function(t,n,e){var r=e("f772");t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"1ec9":function(t,n,e){var r=e("f772"),o=e("e53d").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},"20fd":function(t,n,e){"use strict";var r=e("d9f6"),o=e("aebd");t.exports=function(t,n,e){n in t?r.f(t,n,o(0,e)):t[n]=e}},"214f":function(t,n,e){"use strict";e("b0c5");var r=e("2aba"),o=e("32e9"),i=e("79e5"),u=e("be13"),c=e("2b4c"),a=e("520a"),f=c("species"),s=!i(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),l=function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2===e.length&&"a"===e[0]&&"b"===e[1]}();t.exports=function(t,n,e){var p=c(t),d=!i(function(){var n={};return n[p]=function(){return 7},7!=""[t](n)}),v=d?!i(function(){var n=!1,e=/a/;return e.exec=function(){return n=!0,null},"split"===t&&(e.constructor={},e.constructor[f]=function(){return e}),e[p](""),!n}):void 0;if(!d||!v||"replace"===t&&!s||"split"===t&&!l){var h=/./[p],b=e(u,p,""[t],function(t,n,e,r,o){return n.exec===a?d&&!o?{done:!0,value:h.call(n,e,r)}:{done:!0,value:t.call(e,n,r)}:{done:!1}}),g=b[0],y=b[1];r(String.prototype,t,g),o(RegExp.prototype,p,2==n?function(t,n){return y.call(t,this,n)}:function(t){return y.call(t,this)})}}},"230e":function(t,n,e){var r=e("d3f4"),o=e("7726").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},"23c6":function(t,n,e){var r=e("2d95"),o=e("2b4c")("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,n){try{return t[n]}catch(e){}};t.exports=function(t){var n,e,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=u(n=Object(t),o))?e:i?r(n):"Object"==(c=r(n))&&"function"==typeof n.callee?"Arguments":c}},"241e":function(t,n,e){var r=e("25eb");t.exports=function(t){return Object(r(t))}},"25eb":function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},"294c":function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},"2aba":function(t,n,e){var r=e("7726"),o=e("32e9"),i=e("69a8"),u=e("ca5a")("src"),c=e("fa5b"),a="toString",f=(""+c).split(a);e("8378").inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,e,c){var a="function"==typeof e;a&&(i(e,"name")||o(e,"name",n)),t[n]!==e&&(a&&(i(e,u)||o(e,u,t[n]?""+t[n]:f.join(String(n)))),t===r?t[n]=e:c?t[n]?t[n]=e:o(t,n,e):(delete t[n],o(t,n,e)))})(Function.prototype,a,function(){return"function"==typeof this&&this[u]||c.call(this)})},"2b4c":function(t,n,e){var r=e("5537")("wks"),o=e("ca5a"),i=e("7726").Symbol,u="function"==typeof i,c=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))};c.store=r},"2d00":function(t,n){t.exports=!1},"2d95":function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},"2fdb":function(t,n,e){"use strict";var r=e("5ca1"),o=e("d2c8"),i="includes";r(r.P+r.F*e("5147")(i),"String",{includes:function(t){return!!~o(this,t,i).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"30f1":function(t,n,e){"use strict";var r=e("b8e3"),o=e("63b6"),i=e("9138"),u=e("35e8"),c=e("481b"),a=e("8f60"),f=e("45f2"),s=e("53e2"),l=e("5168")("iterator"),p=!([].keys&&"next"in[].keys()),d="@@iterator",v="keys",h="values",b=function(){return this};t.exports=function(t,n,e,g,y,x,m){a(e,n,g);var w,O,S,j=function(t){if(!p&&t in C)return C[t];switch(t){case v:return function(){return new e(this,t)};case h:return function(){return new e(this,t)}}return function(){return new e(this,t)}},_=n+" Iterator",M=y==h,T=!1,C=t.prototype,E=C[l]||C[d]||y&&C[y],A=E||j(y),P=y?M?j("entries"):A:void 0,I="Array"==n&&C.entries||E;if(I&&(S=s(I.call(new t)),S!==Object.prototype&&S.next&&(f(S,_,!0),r||"function"==typeof S[l]||u(S,l,b))),M&&E&&E.name!==h&&(T=!0,A=function(){return E.call(this)}),r&&!m||!p&&!T&&C[l]||u(C,l,A),c[n]=A,c[_]=b,y)if(w={values:M?A:j(h),keys:x?A:j(v),entries:P},m)for(O in w)O in C||i(C,O,w[O]);else o(o.P+o.F*(p||T),n,w);return w}},"32a6":function(t,n,e){var r=e("241e"),o=e("c3a1");e("ce7e")("keys",function(){return function(t){return o(r(t))}})},"32e9":function(t,n,e){var r=e("86cc"),o=e("4630");t.exports=e("9e1e")?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},"32fc":function(t,n,e){var r=e("e53d").document;t.exports=r&&r.documentElement},"335c":function(t,n,e){var r=e("6b4c");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},"355d":function(t,n){n.f={}.propertyIsEnumerable},"35e8":function(t,n,e){var r=e("d9f6"),o=e("aebd");t.exports=e("8e60")?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},"36c3":function(t,n,e){var r=e("335c"),o=e("25eb");t.exports=function(t){return r(o(t))}},3702:function(t,n,e){var r=e("481b"),o=e("5168")("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},"3a38":function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},"40c3":function(t,n,e){var r=e("6b4c"),o=e("5168")("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,n){try{return t[n]}catch(e){}};t.exports=function(t){var n,e,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=u(n=Object(t),o))?e:i?r(n):"Object"==(c=r(n))&&"function"==typeof n.callee?"Arguments":c}},4588:function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},"45f2":function(t,n,e){var r=e("d9f6").f,o=e("07e3"),i=e("5168")("toStringTag");t.exports=function(t,n,e){t&&!o(t=e?t:t.prototype,i)&&r(t,i,{configurable:!0,value:n})}},4630:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},"469f":function(t,n,e){e("6c1c"),e("1654"),t.exports=e("7d7b")},"481b":function(t,n){t.exports={}},"4aa6":function(t,n,e){t.exports=e("dc62")},"4bf8":function(t,n,e){var r=e("be13");t.exports=function(t){return Object(r(t))}},"4ee1":function(t,n,e){var r=e("5168")("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,function(){throw 2})}catch(u){}t.exports=function(t,n){if(!n&&!o)return!1;var e=!1;try{var i=[7],c=i[r]();c.next=function(){return{done:e=!0}},i[r]=function(){return c},t(i)}catch(u){}return e}},"50ed":function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},5147:function(t,n,e){var r=e("2b4c")("match");t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r]=!1,!"/./"[t](n)}catch(o){}}return!0}},5168:function(t,n,e){var r=e("dbdb")("wks"),o=e("62a0"),i=e("e53d").Symbol,u="function"==typeof i,c=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))};c.store=r},5176:function(t,n,e){t.exports=e("51b6")},"51b6":function(t,n,e){e("a3c3"),t.exports=e("584a").Object.assign},"520a":function(t,n,e){"use strict";var r=e("0bfb"),o=RegExp.prototype.exec,i=String.prototype.replace,u=o,c="lastIndex",a=function(){var t=/a/,n=/b*/g;return o.call(t,"a"),o.call(n,"a"),0!==t[c]||0!==n[c]}(),f=void 0!==/()??/.exec("")[1],s=a||f;s&&(u=function(t){var n,e,u,s,l=this;return f&&(e=new RegExp("^"+l.source+"$(?!\\s)",r.call(l))),a&&(n=l[c]),u=o.call(l,t),a&&u&&(l[c]=l.global?u.index+u[0].length:n),f&&u&&u.length>1&&i.call(u[0],e,function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(u[s]=void 0)}),u}),t.exports=u},"53e2":function(t,n,e){var r=e("07e3"),o=e("241e"),i=e("5559")("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},"549b":function(t,n,e){"use strict";var r=e("d864"),o=e("63b6"),i=e("241e"),u=e("b0dc"),c=e("3702"),a=e("b447"),f=e("20fd"),s=e("7cd6");o(o.S+o.F*!e("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var n,e,o,l,p=i(t),d="function"==typeof this?this:Array,v=arguments.length,h=v>1?arguments[1]:void 0,b=void 0!==h,g=0,y=s(p);if(b&&(h=r(h,v>2?arguments[2]:void 0,2)),void 0==y||d==Array&&c(y))for(n=a(p.length),e=new d(n);n>g;g++)f(e,g,b?h(p[g],g):p[g]);else for(l=y.call(p),e=new d;!(o=l.next()).done;g++)f(e,g,b?u(l,h,[o.value,g],!0):o.value);return e.length=g,e}})},"54a1":function(t,n,e){e("6c1c"),e("1654"),t.exports=e("95d5")},5537:function(t,n,e){var r=e("8378"),o=e("7726"),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,n){return u[t]||(u[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e("2d00")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},5559:function(t,n,e){var r=e("dbdb")("keys"),o=e("62a0");t.exports=function(t){return r[t]||(r[t]=o(t))}},"584a":function(t,n){var e=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=e)},"5b4e":function(t,n,e){var r=e("36c3"),o=e("b447"),i=e("0fc9");t.exports=function(t){return function(n,e,u){var c,a=r(n),f=o(a.length),s=i(u,f);if(t&&e!=e){while(f>s)if(c=a[s++],c!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}}},"5ca1":function(t,n,e){var r=e("7726"),o=e("8378"),i=e("32e9"),u=e("2aba"),c=e("9b43"),a="prototype",f=function(t,n,e){var s,l,p,d,v=t&f.F,h=t&f.G,b=t&f.S,g=t&f.P,y=t&f.B,x=h?r:b?r[n]||(r[n]={}):(r[n]||{})[a],m=h?o:o[n]||(o[n]={}),w=m[a]||(m[a]={});for(s in h&&(e=n),e)l=!v&&x&&void 0!==x[s],p=(l?x:e)[s],d=y&&l?c(p,r):g&&"function"==typeof p?c(Function.call,p):p,x&&u(x,s,p,t&f.U),m[s]!=p&&i(m,s,d),g&&w[s]!=p&&(w[s]=p)};r.core=o,f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},"5d73":function(t,n,e){t.exports=e("469f")},"5f1b":function(t,n,e){"use strict";var r=e("23c6"),o=RegExp.prototype.exec;t.exports=function(t,n){var e=t.exec;if("function"===typeof e){var i=e.call(t,n);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t,n)}},"626a":function(t,n,e){var r=e("2d95");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},"62a0":function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},"63b6":function(t,n,e){var r=e("e53d"),o=e("584a"),i=e("d864"),u=e("35e8"),c=e("07e3"),a="prototype",f=function(t,n,e){var s,l,p,d=t&f.F,v=t&f.G,h=t&f.S,b=t&f.P,g=t&f.B,y=t&f.W,x=v?o:o[n]||(o[n]={}),m=x[a],w=v?r:h?r[n]:(r[n]||{})[a];for(s in v&&(e=n),e)l=!d&&w&&void 0!==w[s],l&&c(x,s)||(p=l?w[s]:e[s],x[s]=v&&"function"!=typeof w[s]?e[s]:g&&l?i(p,r):y&&w[s]==p?function(t){var n=function(n,e,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,e)}return new t(n,e,r)}return t.apply(this,arguments)};return n[a]=t[a],n}(p):b&&"function"==typeof p?i(Function.call,p):p,b&&((x.virtual||(x.virtual={}))[s]=p,t&f.R&&m&&!m[s]&&u(m,s,p)))};f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},6762:function(t,n,e){"use strict";var r=e("5ca1"),o=e("c366")(!0);r(r.P,"Array",{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),e("9c6c")("includes")},6821:function(t,n,e){var r=e("626a"),o=e("be13");t.exports=function(t){return r(o(t))}},"69a8":function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},"6a99":function(t,n,e){var r=e("d3f4");t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"6b4c":function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},"6c1c":function(t,n,e){e("c367");for(var r=e("e53d"),o=e("35e8"),i=e("481b"),u=e("5168")("toStringTag"),c="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),a=0;a<c.length;a++){var f=c[a],s=r[f],l=s&&s.prototype;l&&!l[u]&&o(l,u,f),i[f]=i.Array}},"71c1":function(t,n,e){var r=e("3a38"),o=e("25eb");t.exports=function(t){return function(n,e){var i,u,c=String(o(n)),a=r(e),f=c.length;return a<0||a>=f?t?"":void 0:(i=c.charCodeAt(a),i<55296||i>56319||a+1===f||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536)}}},7726:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},"774e":function(t,n,e){t.exports=e("d2d5")},"77f1":function(t,n,e){var r=e("4588"),o=Math.max,i=Math.min;t.exports=function(t,n){return t=r(t),t<0?o(t+n,0):i(t,n)}},"794b":function(t,n,e){t.exports=!e("8e60")&&!e("294c")(function(){return 7!=Object.defineProperty(e("1ec9")("div"),"a",{get:function(){return 7}}).a})},"79aa":function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},"79e5":function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},"7cd6":function(t,n,e){var r=e("40c3"),o=e("5168")("iterator"),i=e("481b");t.exports=e("584a").getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},"7d7b":function(t,n,e){var r=e("e4ae"),o=e("7cd6");t.exports=e("584a").getIterator=function(t){var n=o(t);if("function"!=typeof n)throw TypeError(t+" is not iterable!");return r(n.call(t))}},"7e90":function(t,n,e){var r=e("d9f6"),o=e("e4ae"),i=e("c3a1");t.exports=e("8e60")?Object.defineProperties:function(t,n){o(t);var e,u=i(n),c=u.length,a=0;while(c>a)r.f(t,e=u[a++],n[e]);return t}},8378:function(t,n){var e=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=e)},8436:function(t,n){t.exports=function(){}},"86cc":function(t,n,e){var r=e("cb7c"),o=e("c69a"),i=e("6a99"),u=Object.defineProperty;n.f=e("9e1e")?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return u(t,n,e)}catch(c){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},"8aae":function(t,n,e){e("32a6"),t.exports=e("584a").Object.keys},"8e60":function(t,n,e){t.exports=!e("294c")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},"8f60":function(t,n,e){"use strict";var r=e("a159"),o=e("aebd"),i=e("45f2"),u={};e("35e8")(u,e("5168")("iterator"),function(){return this}),t.exports=function(t,n,e){t.prototype=r(u,{next:o(1,e)}),i(t,n+" Iterator")}},9003:function(t,n,e){var r=e("6b4c");t.exports=Array.isArray||function(t){return"Array"==r(t)}},9138:function(t,n,e){t.exports=e("35e8")},9306:function(t,n,e){"use strict";var r=e("c3a1"),o=e("9aa9"),i=e("355d"),u=e("241e"),c=e("335c"),a=Object.assign;t.exports=!a||e("294c")(function(){var t={},n={},e=Symbol(),r="abcdefghijklmnopqrst";return t[e]=7,r.split("").forEach(function(t){n[t]=t}),7!=a({},t)[e]||Object.keys(a({},n)).join("")!=r})?function(t,n){var e=u(t),a=arguments.length,f=1,s=o.f,l=i.f;while(a>f){var p,d=c(arguments[f++]),v=s?r(d).concat(s(d)):r(d),h=v.length,b=0;while(h>b)l.call(d,p=v[b++])&&(e[p]=d[p])}return e}:a},9427:function(t,n,e){var r=e("63b6");r(r.S,"Object",{create:e("a159")})},"95d5":function(t,n,e){var r=e("40c3"),o=e("5168")("iterator"),i=e("481b");t.exports=e("584a").isIterable=function(t){var n=Object(t);return void 0!==n[o]||"@@iterator"in n||i.hasOwnProperty(r(n))}},"9aa9":function(t,n){n.f=Object.getOwnPropertySymbols},"9b43":function(t,n,e){var r=e("d8e8");t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},"9c6c":function(t,n,e){var r=e("2b4c")("unscopables"),o=Array.prototype;void 0==o[r]&&e("32e9")(o,r,{}),t.exports=function(t){o[r][t]=!0}},"9def":function(t,n,e){var r=e("4588"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},"9e1e":function(t,n,e){t.exports=!e("79e5")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},a159:function(t,n,e){var r=e("e4ae"),o=e("7e90"),i=e("1691"),u=e("5559")("IE_PROTO"),c=function(){},a="prototype",f=function(){var t,n=e("1ec9")("iframe"),r=i.length,o="<",u=">";n.style.display="none",e("32fc").appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write(o+"script"+u+"document.F=Object"+o+"/script"+u),t.close(),f=t.F;while(r--)delete f[a][i[r]];return f()};t.exports=Object.create||function(t,n){var e;return null!==t?(c[a]=r(t),e=new c,c[a]=null,e[u]=t):e=f(),void 0===n?e:o(e,n)}},a352:function(n,e){n.exports=t},a3c3:function(t,n,e){var r=e("63b6");r(r.S+r.F,"Object",{assign:e("9306")})},a481:function(t,n,e){"use strict";var r=e("cb7c"),o=e("4bf8"),i=e("9def"),u=e("4588"),c=e("0390"),a=e("5f1b"),f=Math.max,s=Math.min,l=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};e("214f")("replace",2,function(t,n,e,h){return[function(r,o){var i=t(this),u=void 0==r?void 0:r[n];return void 0!==u?u.call(r,i,o):e.call(String(i),r,o)},function(t,n){var o=h(e,t,this,n);if(o.done)return o.value;var l=r(t),p=String(this),d="function"===typeof n;d||(n=String(n));var g=l.global;if(g){var y=l.unicode;l.lastIndex=0}var x=[];while(1){var m=a(l,p);if(null===m)break;if(x.push(m),!g)break;var w=String(m[0]);""===w&&(l.lastIndex=c(p,i(l.lastIndex),y))}for(var O="",S=0,j=0;j<x.length;j++){m=x[j];for(var _=String(m[0]),M=f(s(u(m.index),p.length),0),T=[],C=1;C<m.length;C++)T.push(v(m[C]));var E=m.groups;if(d){var A=[_].concat(T,M,p);void 0!==E&&A.push(E);var P=String(n.apply(void 0,A))}else P=b(_,p,M,T,E,n);M>=S&&(O+=p.slice(S,M)+P,S=M+_.length)}return O+p.slice(S)}];function b(t,n,r,i,u,c){var a=r+t.length,f=i.length,s=d;return void 0!==u&&(u=o(u),s=p),e.call(c,s,function(e,o){var c;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(a);case"<":c=u[o.slice(1,-1)];break;default:var s=+o;if(0===s)return e;if(s>f){var p=l(s/10);return 0===p?e:p<=f?void 0===i[p-1]?o.charAt(1):i[p-1]+o.charAt(1):e}c=i[s-1]}return void 0===c?"":c})}})},a4bb:function(t,n,e){t.exports=e("8aae")},a745:function(t,n,e){t.exports=e("f410")},aae3:function(t,n,e){var r=e("d3f4"),o=e("2d95"),i=e("2b4c")("match");t.exports=function(t){var n;return r(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},aebd:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},b0c5:function(t,n,e){"use strict";var r=e("520a");e("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},b0dc:function(t,n,e){var r=e("e4ae");t.exports=function(t,n,e,o){try{return o?n(r(e)[0],e[1]):n(e)}catch(u){var i=t["return"];throw void 0!==i&&r(i.call(t)),u}}},b447:function(t,n,e){var r=e("3a38"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},b8e3:function(t,n){t.exports=!0},be13:function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},c366:function(t,n,e){var r=e("6821"),o=e("9def"),i=e("77f1");t.exports=function(t){return function(n,e,u){var c,a=r(n),f=o(a.length),s=i(u,f);if(t&&e!=e){while(f>s)if(c=a[s++],c!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}}},c367:function(t,n,e){"use strict";var r=e("8436"),o=e("50ed"),i=e("481b"),u=e("36c3");t.exports=e("30f1")(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,o(1)):o(0,"keys"==n?e:"values"==n?t[e]:[e,t[e]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},c3a1:function(t,n,e){var r=e("e6f3"),o=e("1691");t.exports=Object.keys||function(t){return r(t,o)}},c649:function(t,n,e){"use strict";(function(t){e.d(n,"c",function(){return l}),e.d(n,"a",function(){return f}),e.d(n,"b",function(){return u}),e.d(n,"d",function(){return s});e("a481");var r=e("4aa6"),o=e.n(r);function i(){return"undefined"!==typeof window?window.console:t.console}var u=i();function c(t){var n=o()(null);return function(e){var r=n[e];return r||(n[e]=t(e))}}var a=/-(\w)/g,f=c(function(t){return t.replace(a,function(t,n){return n?n.toUpperCase():""})});function s(t){null!==t.parentElement&&t.parentElement.removeChild(t)}function l(t,n,e){var r=0===e?t.children[0]:t.children[e-1].nextSibling;t.insertBefore(n,r)}}).call(this,e("c8ba"))},c69a:function(t,n,e){t.exports=!e("9e1e")&&!e("79e5")(function(){return 7!=Object.defineProperty(e("230e")("div"),"a",{get:function(){return 7}}).a})},c8ba:function(t,n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(r){"object"===typeof window&&(e=window)}t.exports=e},c8bb:function(t,n,e){t.exports=e("54a1")},ca5a:function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},cb7c:function(t,n,e){var r=e("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},ce7e:function(t,n,e){var r=e("63b6"),o=e("584a"),i=e("294c");t.exports=function(t,n){var e=(o.Object||{})[t]||Object[t],u={};u[t]=n(e),r(r.S+r.F*i(function(){e(1)}),"Object",u)}},d2c8:function(t,n,e){var r=e("aae3"),o=e("be13");t.exports=function(t,n,e){if(r(n))throw TypeError("String#"+e+" doesn't accept regex!");return String(o(t))}},d2d5:function(t,n,e){e("1654"),e("549b"),t.exports=e("584a").Array.from},d3f4:function(t,n){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},d864:function(t,n,e){var r=e("79aa");t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},d8e8:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},d9f6:function(t,n,e){var r=e("e4ae"),o=e("794b"),i=e("1bc3"),u=Object.defineProperty;n.f=e("8e60")?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return u(t,n,e)}catch(c){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},dbdb:function(t,n,e){var r=e("584a"),o=e("e53d"),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,n){return u[t]||(u[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e("b8e3")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},dc62:function(t,n,e){e("9427");var r=e("584a").Object;t.exports=function(t,n){return r.create(t,n)}},e4ae:function(t,n,e){var r=e("f772");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},e53d:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},e6f3:function(t,n,e){var r=e("07e3"),o=e("36c3"),i=e("5b4e")(!1),u=e("5559")("IE_PROTO");t.exports=function(t,n){var e,c=o(t),a=0,f=[];for(e in c)e!=u&&r(c,e)&&f.push(e);while(n.length>a)r(c,e=n[a++])&&(~i(f,e)||f.push(e));return f}},f410:function(t,n,e){e("1af6"),t.exports=e("584a").Array.isArray},f559:function(t,n,e){"use strict";var r=e("5ca1"),o=e("9def"),i=e("d2c8"),u="startsWith",c=""[u];r(r.P+r.F*e("5147")(u),"String",{startsWith:function(t){var n=i(this,t,u),e=o(Math.min(arguments.length>1?arguments[1]:void 0,n.length)),r=String(t);return c?c.call(n,r,e):n.slice(e,e+r.length)===r}})},f772:function(t,n){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},fa5b:function(t,n,e){t.exports=e("5537")("native-function-to-string",Function.toString)},fb15:function(t,n,e){"use strict";var r;(e.r(n),"undefined"!==typeof window)&&((r=window.document.currentScript)&&(r=r.src.match(/(.+\/)[^\/]+\.js(\?.*)?$/))&&(e.p=r[1]));var o=e("5176"),i=e.n(o),u=(e("f559"),e("a4bb")),c=e.n(u),a=(e("6762"),e("2fdb"),e("a745")),f=e.n(a);function s(t){if(f()(t))return t}var l=e("5d73"),p=e.n(l);function d(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,c=p()(t);!(r=(u=c.next()).done);r=!0)if(e.push(u.value),n&&e.length===n)break}catch(a){o=!0,i=a}finally{try{r||null==c["return"]||c["return"]()}finally{if(o)throw i}}return e}function v(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function h(t,n){return s(t)||d(t,n)||v()}function b(t){if(f()(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}var g=e("774e"),y=e.n(g),x=e("c8bb"),m=e.n(x);function w(t){if(m()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return y()(t)}function O(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function S(t){return b(t)||w(t)||O()}var j=e("a352"),_=e.n(j),M=e("c649");function T(t,n,e){return void 0===e?t:(t=t||{},t[n]=e,t)}function C(t,n){return t.map(function(t){return t.elm}).indexOf(n)}function E(t,n,e,r){if(!t)return[];var o=t.map(function(t){return t.elm}),i=n.length-r,u=S(n).map(function(t,n){return n>=i?o.length:o.indexOf(t)});return e?u.filter(function(t){return-1!==t}):u}function A(t,n){var e=this;this.$nextTick(function(){return e.$emit(t.toLowerCase(),n)})}function P(t){var n=this;return function(e){null!==n.realList&&n["onDrag"+t](e),A.call(n,t,e)}}function I(t){if(!t||1!==t.length)return!1;var n=h(t,1),e=n[0].componentOptions;return!!e&&["transition-group","TransitionGroup"].includes(e.tag)}function L(t,n){var e=n.header,r=n.footer,o=0,i=0;return e&&(o=e.length,t=t?[].concat(S(e),S(t)):S(e)),r&&(i=r.length,t=t?[].concat(S(t),S(r)):S(r)),{children:t,headerOffset:o,footerOffset:i}}function F(t,n){var e=null,r=function(t,n){e=T(e,t,n)},o=c()(t).filter(function(t){return"id"===t||t.startsWith("data-")}).reduce(function(n,e){return n[e]=t[e],n},{});if(r("attrs",o),!n)return e;var u=n.on,a=n.props,f=n.attrs;return r("on",u),r("props",a),i()(e.attrs,f),e}var $=["Start","Add","Remove","Update","End"],k=["Choose","Sort","Filter","Clone"],D=["Move"].concat($,k).map(function(t){return"on"+t}),R=null,V={options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(t){return t}},element:{type:String,default:"div"},tag:{type:String,default:null},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},N={name:"draggable",inheritAttrs:!1,props:V,data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(t){var n=this.$slots.default;this.transitionMode=I(n);var e=L(n,this.$slots),r=e.children,o=e.headerOffset,i=e.footerOffset;this.headerOffset=o,this.footerOffset=i;var u=F(this.$attrs,this.componentData);return t(this.getTag(),u,r)},created:function(){null!==this.list&&null!==this.value&&M["b"].error("Value and list props are mutually exclusive! Please set one or another."),"div"!==this.element&&M["b"].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props"),void 0!==this.options&&M["b"].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props")},mounted:function(){var t=this;if(this.noneFunctionalComponentMode=this.getTag().toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));var n={};$.forEach(function(e){n["on"+e]=P.call(t,e)}),k.forEach(function(e){n["on"+e]=A.bind(t,e)});var e=c()(this.$attrs).reduce(function(n,e){return n[Object(M["a"])(e)]=t.$attrs[e],n},{}),r=i()({},this.options,e,n,{onMove:function(n,e){return t.onDragMove(n,e)}});!("draggable"in r)&&(r.draggable=">*"),this._sortable=new _.a(this.rootContainer,r),this.computeIndexes()},beforeDestroy:function(){void 0!==this._sortable&&this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(t){this.updateOptions(t)},deep:!0},$attrs:{handler:function(t){this.updateOptions(t)},deep:!0},realList:function(){this.computeIndexes()}},methods:{getTag:function(){return this.tag||this.element},updateOptions:function(t){for(var n in t){var e=Object(M["a"])(n);-1===D.indexOf(e)&&this._sortable.option(e,t[n])}},getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1===this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var t=this.$slots.default;return this.transitionMode?t[0].child.$slots.default:t},computeIndexes:function(){var t=this;this.$nextTick(function(){t.visibleIndexes=E(t.getChildrenNodes(),t.rootContainer.children,t.transitionMode,t.footerOffset)})},getUnderlyingVm:function(t){var n=C(this.getChildrenNodes()||[],t);if(-1===n)return null;var e=this.realList[n];return{index:n,element:e}},getUnderlyingPotencialDraggableComponent:function(t){var n=t.__vue__;return n&&n.$options&&"transition-group"===n.$options._componentTag?n.$parent:n},emitChanges:function(t){var n=this;this.$nextTick(function(){n.$emit("change",t)})},alterList:function(t){if(this.list)t(this.list);else{var n=S(this.value);t(n),this.$emit("input",n)}},spliceList:function(){var t=arguments,n=function(n){return n.splice.apply(n,S(t))};this.alterList(n)},updatePosition:function(t,n){var e=function(e){return e.splice(n,0,e.splice(t,1)[0])};this.alterList(e)},getRelatedContextFromMoveEvent:function(t){var n=t.to,e=t.related,r=this.getUnderlyingPotencialDraggableComponent(n);if(!r)return{component:r};var o=r.realList,u={list:o,component:r};if(n!==e&&o&&r.getUnderlyingVm){var c=r.getUnderlyingVm(e);if(c)return i()(c,u)}return u},getVmIndex:function(t){var n=this.visibleIndexes,e=n.length;return t>e-1?e:n[t]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(t){if(this.noTransitionOnDrag&&this.transitionMode){var n=this.getChildrenNodes();n[t].data=null;var e=this.getComponent();e.children=[],e.kept=void 0}},onDragStart:function(t){this.context=this.getUnderlyingVm(t.item),t.item._underlying_vm_=this.clone(this.context.element),R=t.item},onDragAdd:function(t){var n=t.item._underlying_vm_;if(void 0!==n){Object(M["d"])(t.item);var e=this.getVmIndex(t.newIndex);this.spliceList(e,0,n),this.computeIndexes();var r={element:n,newIndex:e};this.emitChanges({added:r})}},onDragRemove:function(t){if(Object(M["c"])(this.rootContainer,t.item,t.oldIndex),"clone"!==t.pullMode){var n=this.context.index;this.spliceList(n,1);var e={element:this.context.element,oldIndex:n};this.resetTransitionData(n),this.emitChanges({removed:e})}else Object(M["d"])(t.clone)},onDragUpdate:function(t){Object(M["d"])(t.item),Object(M["c"])(t.from,t.item,t.oldIndex);var n=this.context.index,e=this.getVmIndex(t.newIndex);this.updatePosition(n,e);var r={element:this.context.element,oldIndex:n,newIndex:e};this.emitChanges({moved:r})},updateProperty:function(t,n){t.hasOwnProperty(n)&&(t[n]+=this.headerOffset)},computeFutureIndex:function(t,n){if(!t.element)return 0;var e=S(n.to.children).filter(function(t){return"none"!==t.style["display"]}),r=e.indexOf(n.related),o=t.component.getVmIndex(r),i=-1!==e.indexOf(R);return i||!n.willInsertAfter?o:o+1},onDragMove:function(t,n){var e=this.move;if(!e||!this.realList)return!0;var r=this.getRelatedContextFromMoveEvent(t),o=this.context,u=this.computeFutureIndex(r,t);i()(o,{futureIndex:u});var c=i()({},t,{relatedContext:r,draggedContext:o});return e(c,n)},onDragEnd:function(){this.computeIndexes(),R=null}}};"undefined"!==typeof window&&"Vue"in window&&window.Vue.component("draggable",N);var U=N;n["default"]=U}})["default"]});
//# sourceMappingURL=vuedraggable.umd.min.js.map
jQuery('.search-open').click(function(){
  jQuery('.search__wrapper').toggleClass('shown');
});


jQuery('#login-form').on('submit',function(){
  console.log('login');
  var data = jQuery(this).serializeArray();

  var post_data = {};

  for(id in data){
    post_data[data[id].name] = data[id].value;

    if(!data[id].value){
      alert('No ' + data[id].name +' entered');
      return false;
    }

  }

  post_data.action = 'run_login';

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: post_data,

    complete: function(xhr, textStatus) {
      //called when complete
    },

    success: function(data, textStatus, xhr) {
      console.group('leads updated by date');
      console.log(data);

      location.href= data.redirect;

      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      var resp = JSON.parse(xhr.responseText);

      message = '';
      for(id in resp.data){
        message += resp.data[id][0];
      }

      alert(message);

      console.log(resp);
     }
  });
})


// jQuery('.trigger-color').hover(function(){
//   var id = jQuery(this).data('id');
//   console.log(id);
// },function(){

// })



jQuery('.button-add').click(function(e) {
  e.preventDefault();
  console.log(1);
});
jQuery(document).ready(function(){
    jQuery('.reminder input').datetimepicker({
      format:'M d Y H:i',
    });

    jQuery('.datepicker').datetimepicker({
      format:'M d Y H:i',
    });

    if(jQuery('.horizontal-scroll').length){
      var height = jQuery('.site-inner').height() - jQuery('.filter-container').height() - 180;

      // jQuery('.horizontal-scroll').css({'max-height': height + 'px'});
    }


    // if(jQuery('.leads-column__head').length && jQuery(window).width() > 990){
    //   jQuery('.leads-column__head').each(function(ind, el){
    //     var opt = {
    //       left: jQuery(el).offset().left + 'px',
    //       top : jQuery(el).offset().top + 'px',
    //       position: 'fixed',
    //     }

    //     jQuery(el).css(opt);
    //   })
    // }
});




jQuery('.reminder .icon').click(function(){
    jQuery('.reminder input').datetimepicker('show');
})

jQuery('.reminder .label').click(function(){
    jQuery('.reminder input').datetimepicker('show');
})

jQuery(document).ready(function(){
  init_date_range();
})

function init_date_range(){
  var now     = new Date();
  var last_7  = new Date();
  var last_30  = new Date();
  var last_90 = new Date();
  last_7.setDate(last_7.getDate() - 7);
  last_30.setDate(last_30.getDate() - 30);
  last_90.setDate(last_7.getDate() - 90);

  var now     = new Date();

  var today_str = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();


  var last_7_str = (last_7.getMonth() + 1) + '/' + last_7.getDate() + '/' + last_7.getFullYear();

  var last_30_str = (last_30.getMonth() + 1) + '/' + last_30.getDate() + '/' + last_30.getFullYear();

  var last_90_str = (last_90.getMonth() + 1) + '/' + last_90.getDate() + '/' + last_90.getFullYear();

  var for_last_day = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  var month_first_day = (now.getMonth() + 1) + '/' + 1 + '/' + now.getFullYear();

  var month_last_day = (now.getMonth() + 1) + '/' + for_last_day.getDate() + '/' + now.getFullYear();

  jQuery('.range-datepicker').daterangepicker({
    "autoApply": true,
    "ranges": {
        "Today": [
            today_str,
            today_str
        ],
        'This Month': [
          month_first_day,
          today_str
        ],

        'Past 7 Days': [
          last_7_str,
          today_str
        ],

        'Past 30 Days':[
          last_30_str,
          today_str
        ],

        'Past 90 Days': [
          last_90_str,
          today_str
        ],
        'All time':[
          '01/01/1999',
          today_str,
        ],
    },
    "alwaysShowCalendars": true,
    "startDate": last_30_str,
    "endDate": today_str
  }, function(start, end, label) {

    var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

    jQuery('.range-datepicker__text').text(text);
    jQuery('.range-datepicker__label').text(label);

    var data = {from: start.format('MMM DD YYYY') , to: end.format('MMM DD YYYY'), label: label, _from: start.format('MM/DD/YYYY'), _to: end.format('MM/DD/YYYY'), }

    if(jQuery(this.element).data('action') == 'popup'){
      jQuery(document.body).trigger('get_popup_leads_by_dates', data);

    }else{
      jQuery(document.body).trigger('get_leads_by_dates', data);
    }

  });

}

jQuery(document.body).on('get_leads_by_dates', function(e, data){

  data.action = 'get_leads_by_dates';

  data.get_previous_data = typeof(is_dashboard) !== 'undefined';

  Cookie.set('list_data_settings', JSON.stringify(data));

  wait_block.show();

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data,

    complete: function(xhr, textStatus) {
      //called when complete
      wait_block.hide();
    },

    success: function(data, textStatus, xhr) {
      jQuery('.site-inner').find('.preload').removeClass('hidden').removeClass('visaullyhidden');
      console.group('leads updated by date');
      console.log(data);

      if('undefined' !== typeof(is_dashboard)){
        _to = data.to;
        _from = data.from;
        billed_posts = data.billed_posts;
        billed_posts_prev = data.billed_posts_prev;
        perfomance.update('leads', data.leads);
        perfomance.update('billed_posts', data.billed_posts);
      }

      dashboard_leads_data      = data.leads;
      dashboard_leads_data_prev = data.leads_prev;
      team_perfomance           = data.team_perfomance;

      //dashboard
      update_filters(data.filter_data);
      update_dashboard_totals(data.days_count_prev);

      //leads_list
      update_leads_filters(data.filter_data);
      update_leads_list();

      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.log(xhr);
     }
  });
})

jQuery(document.body).on('get_popup_leads_by_dates', function(e, data){

  data.action = 'get_leads_by_dates';

  data.get_previous_data = typeof(is_dashboard) !== 'undefined';

  Cookie.set('list_data_settings', JSON.stringify(data), 1);

  wait_block.show();

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: data,

    complete: function(xhr, textStatus) {
      //called when complete
      wait_block.hide();
    },

    success: function(data, textStatus, xhr) {
      jQuery('.site-inner').find('.preload').removeClass('hidden').removeClass('visaullyhidden');
      clog(data);

      if('undefined' !== typeof(is_dashboard)){
        _to2 = data.to;
        _from2 = data.from;
        var filter = {
          clinics: [],
          treatments: [],
          campaigns: [],
          sources: [],
          team: [],
        };

        print_popup.update('leads_obj', data.leads);
        print_popup.update('filter_data_', data.filter_data_csv);
        print_popup.update('filter', filter);
      }

    },

    error: function(xhr, textStatus, errorThrown) {
      clog('error');
      clog(errorThrown);
      clog(xhr);
     }
  });
})

jQuery(document).ready(function(){
  var saved_dates = JSON.parse(Cookie.get('list_data_settings'));

  if(saved_dates && 'undefined' !== typeof(is_lead_list) && jQuery('.range-datepicker').length){
     var text = saved_dates.from + ' → ' + saved_dates.to;

    jQuery('.range-datepicker .range-datepicker__text').text(text);

    jQuery('.range-datepicker .range-datepicker__label').text(saved_dates.label);

    jQuery('.range-datepicker').data('daterangepicker').setStartDate(saved_dates._from);
    jQuery('.range-datepicker').data('daterangepicker').setEndDate(saved_dates._to);

    // jQuery(document.body).trigger('get_leads_by_dates',saved_dates);
  }
})
if('undefined' !== typeof(is_dashboard)){
  var date  = new Date();
  var chart = document.getElementById('gistogramm-year').getContext('2d');
  var currency     = '£';
  var current_year = date.getFullYear();

  months = [
    ['January', 'April',   'July',      "October" ],
    ['February','May', "August",    'November'],
    ['March',   'June',  "September", 'December'],
  ];

  var options_chart = {
      options: {
          legend:{
             display: false,
          },

          title: {
             display: false,
          },

          gridLines: {
            display: false,
          },

           tooltips: {
              callbacks: {
                  title : function(tooltipItem, data) {
                    var row = tooltipItem[0].datasetIndex;
                    var col = tooltipItem[0].index;
                    return months[row][col] + ' '+ current_year;
                  },

                  beforeLabel: function(tooltipItem, data) {
                    return currency +  formatMoney(tooltipItem.value, 2, ".", ",") ;
                  },

                  label: function(tooltipItem, data) {
                       return false;
                  }
              }
          },

          layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
          },

          scales: {
              xAxes:[{
                  scaleLabel:{
                      display: false,
                  },
                  gridLines : {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
                      drawTicks: true
                  },
              }],
              yAxes: [{
                  gridLines : {
                      display: true,
                      drawBorder: false,
                      drawOnChartArea: true,
                      drawTicks: false
                  },
                  display: false,
                  id: 'left-y-axis',
                  // type: 'linear',
                  // position: 'left'
              }]
          }
      },

      type: 'bar',
      data: {
          datasets: [{
              backgroundColor: 'rgb(237, 240, 255)',
              data: [
                income_month_data['Jan']['sum'],
                income_month_data['Apr']['sum'],
                income_month_data['Jul']['sum'],
                income_month_data['Oct']['sum']
                ], // january, may, july, october
              label: 'Left dataset',

              // This binds the dataset to the left y axis
              yAxisID: 'left-y-axis'
          }, {
              data: [
                income_month_data['Feb']['sum'],
                income_month_data['May']['sum'],
                income_month_data['Aug']['sum'],
                income_month_data['Nov']['sum']
                ], //february, april, august, november
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          },{
              data:  [
                income_month_data['Mar']['sum'],
                income_month_data['Jun']['sum'],
                income_month_data['Sep']['sum'],
                income_month_data['Dec']['sum']
                ], //march, june, september, december
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          }],
          labels: ['c1', 'c2', 'c3', 'c4']
      },
  }

  var options_chart_test = {
      options: {
          legend:{
             display: false,
          },

          title: {
             display: false,
          },

          gridLines: {
            display: false,
          },

           tooltips: {
              callbacks: {

                  title : function(tooltipItem, data) {
                    var row = tooltipItem[0].datasetIndex;
                    var col = tooltipItem[0].index;
                    return months[row][col] + ' '+ current_year;
                  },


                  beforeLabel: function(tooltipItem, data) {
                    return currency +  formatMoney(tooltipItem.value, 2, ".", ",") ;
                  },

                  label: function(tooltipItem, data) {
                       return false;
                  }
              }
          },

          layout: {
              padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
              }
          },

          scales: {
              xAxes:[{
                  scaleLabel:{
                      display: false,
                  },
                  gridLines : {
                      display: true,
                      drawBorder: true,
                      drawOnChartArea: false,
                      drawTicks: true
                  },
              }],
              yAxes: [{
                  gridLines : {
                      display: true,
                      drawBorder: false,
                      drawOnChartArea: true,
                      drawTicks: false
                  },
                  display: false,
                  id: 'left-y-axis',
                  // type: 'linear',
                  // position: 'left'
              }]
          }
      },

      type: 'bar',
      data: {
          datasets: [{
              backgroundColor: 'rgb(237, 240, 255)',
              data: [6000, 9000, 4000, 1500], // january, may, july, october
              label: 'Left dataset',

              // This binds the dataset to the left y axis
              yAxisID: 'left-y-axis'
          }, {
              data: [9000, 7250, 1000, 4000], //february, april, august, november
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          },{
              data: [9000, 10000, 7500, 5000], //march, june, september, december
              label: 'Right dataset',
              backgroundColor: 'rgb(237, 240, 255)',
              // This binds the dataset to the right y axis
              yAxisID: 'left-y-axis'
          }],
          labels: ['c1', 'c2', 'c3', 'c4']
      },
  }

  var _prefix;
  var _suffix;

  function prepare_donnut_data(data, labels, suffix, prefix){
    var colors = [
            '#f6b82f',
            '#ee63d2',
            '#8933f6',
            '#3354f6',
            '#01c58d',
            '#eee',
            '#eee',
          ]
    _prefix = prefix;
    _suffix = suffix;

    var config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: data,
          backgroundColor: colors,
          label: 'Dataset 1'
        }],
        labels: labels
      },

      options: {
        responsive: true,


        legend: {
          position: 'right',
          fontColor: 'rgb(0,100, 0)',

          labels : {
            'boxWidth' : 14,
            'fullWidth': 'no',
             'width': 100,
            'padding' : 20,
            'fontFamily' : 'HelveticaFont_,sans-serif',
            'fontColor' : '#3b3f45',

             generateLabels: function(chart){
                      var data = chart.data;
                      if (data.labels.length && data.datasets.length) {
                          return data.labels.map(function(label, i) {
                              var meta = chart.getDatasetMeta(0);
                              var ds = data.datasets[0];
                              var arc = meta.data[i];
                              var custom = arc && arc.custom || {};
                              var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                              var arcOpts = chart.options.elements.arc;
                              var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                              var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                              var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                // We get the value of the current label
                             var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];


                             var text = (typeof(_suffix) !== 'undefined' && _suffix!== false)? label + "  " + value + suffix : label + "  " + value;

                              text = (typeof(_prefix) !== 'undefined' && _prefix!== false)? label + "  " + _prefix + formatMoney(value, 2, ".", ",") : text;

                              return {
                                  // Instead of `text: label,`
                                  // We add the value to the string
                                  text: text,
                                  fillStyle: fill,
                                  strokeStyle: stroke,
                                  lineWidth: bw,
                                  hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                  index: i
                              };
                          });
                      } else {
                          return [];
                      }
                  }

          }
        },

        title: {
          display: false,
        },

        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    config.options.legend.position = jQuery(window).width() < 768 ? 'bottom' : 'right';

    return config
  }

  jQuery(document).ready(function(){
    var chart_income = new Chart(chart, options_chart);
  })
}
jQuery(document).on('update_app', function(){

})

// class to work with leads
var parse_leads = {
  leads: {},

  /**
  **
  **/
  construct: function(){
    if('undefined' !== typeof(is_dashboard)){
      this.leads = dashboard_leads_data;
    }

    if('undefined' !== typeof(is_lead_list)){
       this.leads = dashboard_leads_data;
    }

    return this;
  },

  /**
  **
  **/
  filter: function(){
    var dashboard_leads_data_filtered_new = [];

    for(lead_id in dashboard_leads_data){
      if(this.filter_lead(dashboard_leads_data[lead_id])){
        dashboard_leads_data_filtered_new.push(dashboard_leads_data[lead_id]);
      }
    }

    dashboard_leads_data_filtered = dashboard_leads_data_filtered_new;

    this.leads = dashboard_leads_data_filtered_new;

    return dashboard_leads_data_filtered_new;
  },

  /**
  **
  **/
  filter_exec: function(filters){
    var dashboard_leads_data_filtered_new = [];

    for(lead_id in dashboard_leads_data){
      if(this.filter_lead(dashboard_leads_data[lead_id]), filters){
        dashboard_leads_data_filtered_new.push(dashboard_leads_data[lead_id]);
      }
    }

    dashboard_leads_data_filtered = dashboard_leads_data_filtered_new;

    this.leads = dashboard_leads_data_filtered_new;

    return this;
  },

  /**
  **
  **/
  filter_for_leads_list: function(filters){
    var dashboard_leads_data_filtered_new = [];

    for(lead_id in dashboard_leads_data){
      if(this.filter_lead(dashboard_leads_data[lead_id], filters)){
        dashboard_leads_data_filtered_new.push(dashboard_leads_data[lead_id]);
      }
    }

    dashboard_leads_data_filtered = dashboard_leads_data_filtered_new;
    this.leads = dashboard_leads_data_filtered_new;
    return dashboard_leads_data_filtered_new;
  },

  /**
  **
  **/
  //  check if passed lead mathces current filter values
  filter_lead: function(lead, filters){
    var filter_value = {};
    var lead_filter  = lead.filter_data;
    var is_match     = true;

    if('undefined' !== typeof(filters)){
      for(id in vue_selects){
       var value = vue_selects[id].get_value();

       if(value.search('All') !== 0){
          filter_value[vue_selects[id].get_name()] = value;
        }
      }
    }else{
      for(id in filters){
       var value = filters[id];

       if(value.search('All') !== 0){
          filter_value[id] = value;
        }
      }
    }

    for(filter_id in filter_value){
      switch(typeof(lead_filter[filter_id])){
        case 'object':
          is_match = (lead_filter[filter_id].indexOf(filter_value[filter_id]) < 0)? false : is_match;
         break;
        default:
          is_match = (lead_filter[filter_id] !== filter_value[filter_id])? false : is_match;
         break;
      }
    }

    return is_match;
  },

  /**
  **
  **/
  get_leads: function (){
    return this.leads;
  },

  /**
  **
  **/
  get_leads_for_list: function(){
    var leads = [];

    var now = new Date();

    for(id in this.leads){
      var data = {};
      var for_csv = {
        dentists:  this.leads[id].meta.treatment_coordinator.specialist,
        proposed:  get_sum_from_price(this.leads[id].meta.treatment_value.value),
        billed:    get_sum_from_price(this.leads[id].meta.treatment_value.billed),
        notes:     this.leads[id].meta.lead_notes,
        campaign:  this.leads[id].meta.patient_data.campaign,
      };

      var manager_noted = 'no';

      if(typeof(this.leads[id].meta.lead_notes) == 'object'){
        for(var k in this.leads[id].meta.lead_notes){
          if('undefined' !== typeof(this.leads[id].meta.lead_notes[k].is_manager)){
            manager_noted = ('yes' === this.leads[id].meta.lead_notes[k].is_manager  && 1  === this.leads[id].meta.lead_notes[k].show)? 'yes' : manager_noted;
          }
        }
      }

      if(typeof(this.leads[id].meta.lead_notes_tco) == 'object'){
        for(var k in this.leads[id].meta.lead_notes_tco){
          if('undefined' !== typeof(this.leads[id].meta.lead_notes_tco[k].is_manager)){
            manager_noted = ('yes' === this.leads[id].meta.lead_notes_tco[k].is_manager && 1  === this.leads[id].meta.lead_notes_tco[k].show  )? 'yes' : manager_noted;
          }
        }
      }

      var date_received = new Date(this.leads[id].post_date);
      var reminder_date = new Date(this.leads[id].meta.reminder);

      data.overdue = (this.leads[id].meta.reminder !== '' && now > reminder_date)? 'yes' : 'no';

      data.alarms      = (this.leads[id].meta.reminder)? 'yes' : 'no';
      data.post_id     = this.leads[id].ID;
      data.name        = this.leads[id].meta.patient_data.name;
      data.clinic      = this.leads[id].meta.patient_data.clinic;
      data.treatment   = this.leads[id].meta.patient_data.treatment;
      data.phone   = this.leads[id].meta.patient_data.phone;
      data.email   = this.leads[id].meta.patient_data.email;
      data.sourse      = this.leads[id].meta.patient_data.sourse;
      data.text_messages = this.leads[id].meta.text_messages ? this.leads[id].meta.text_messages.length : 0 ;
      data.show_message_alert = false;
      data.show_message_alert_him = false;
      data.team        = this.leads[id].meta.lead_specialists;
      data.lead_stage  = this.leads[id].lead_stage;
      data.reminder    = this.leads[id].meta.reminder;
      data.permalink   = this.leads[id].permalink;
      data.filter_data = this.leads[id].filter_data;
      data.phone_count = this.leads[id].phone_count;
      data.phone_count_tco = this.leads[id].phone_count_tco;
      data.message_count = this.leads[id].message_count;
      data.message_count_tco = this.leads[id].message_count_tco;
      data.sms_count_tco = this.leads[id].sms_count_tco;
      data.for_csv       = for_csv;
      data.manager_noted = manager_noted;
      data.post_modified = this.leads[id].post_modified;
      data.base_lead     = this.leads[id];
      data.isMarked     = false;

      if('undefined' !== typeof(this.leads[id].order)){
        data.order = this.leads[id].order;
      }else{
        data.order = 0;
      }

      data.time_passed = date_difference.construct(date_received, now)  + ' ago';
      leads.push(data);
    }

    return leads;
  },

  /**
  **
  **/
  get_total_revenue : function(){
    revenue = 0;

    for(id in this.leads){
      revenue += parseInt(this.leads[id].meta.treatment_value.value);
    }

    return revenue;
  },

  /**
  **
  **/
  get_total_leads: function(){
    return this.leads.length;
  },

  /**
  **
  **/
  get_average_leads: function(formatted){
    var revenue = this.get_total_revenue();
    var total   = this.get_total_leads();

    if(formatted){
      return formatMoney(revenue/total, 2, ".", ",") ;
    }else{
      return revenue/total;
    }
  },

  /**
  **
  **/
  prepare_sorted_data_by: function(get_by){
    var sorted = {};
    var index;
    switch(get_by){
      case 'sourse':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.sourse;
          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }

        break;
      case 'campaign':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.campaign;

          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }
       break
      case 'treatment':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.treatment;
          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }
       break
      case 'clinic':
        for(_i in this.leads){
          index = this.leads[_i].meta.patient_data.clinic;
          if(index){
            if('undefined' === typeof(sorted[index])){
              sorted[index] = {
                leads : 0,
                revenue : 0,
                rate : 0,
                name: index,
              };
            }

            sorted[index].leads++;
            sorted[index].revenue += parseInt(this.leads[_i].meta.treatment_value.value);
          }
        }
       break
    }

    return sorted;
  },

  /**
  **
  **/
  get_leads_data_by: function(get_by, type){
    var sorted = this.prepare_sorted_data_by(get_by);


    if(Object.keys(sorted).length === 0){
      return {
        leads : 'no',
        revenue :  '-',
        rate :  '-',
        name: 'Unavailable',
      };
    }

    switch(type){
      case 'Leads':
        var max = 0;
        var index = '';

        for(id in sorted){
          if(sorted[id].leads > max){
            index = id;
            max = sorted[id].leads;
          }
        }

        return sorted[index];
        break;

      case 'Revenue':
        var max = 0;
        var index = '';

        for(id in sorted){
          if(sorted[id].revenue > max){
            index = id;
            max = sorted[id].revenue;
          }
        }

        return sorted[index];
        break;
    }
  }
}

// class to calculate date difference
var date_difference = {
  ms_to_minute : 60000,
  ms_to_hour   : 3600000,
  ms_to_day    : 86400000,


  construct: function(d1, d2){
    var date_diff = d2 - d1;
    var days_data = this.get_days_passed(date_diff);
    var hours_data = this.get_hours_passed(days_data.date_diff);
    var minutes_data = this.get_minutes_passed(hours_data.date_diff);
    var time_passed = '';
    var days_text     = (days_data.value > 1)? 'd ' : 'd ';
    var hours_text    = (hours_data.value > 1)? 'h ' : 'h ';
    var minutes_text  =  (minutes_data.value > 1)? 'm ' : 'm ';

    if(date_diff < this.ms_to_minute){
      return 'Just recieved';
    } else if(date_diff < this.ms_to_day && date_diff >= this.ms_to_minute){
      // how many days

      time_passed += (days_data.value > 0)?  days_data.value + days_text : '';
      time_passed += (hours_data.value > 0)? hours_data.value + hours_text : '';
      time_passed += (minutes_data.value > 0)?  minutes_data.value + minutes_text : '';

    } else if(date_diff > this.ms_to_day && date_diff < this.ms_to_day * 31 ){
        time_passed = (days_data.value > 0)?  days_data.value + days_text : '';
    } else if(date_diff >= this.ms_to_day * 31 ){
      var date1    = new Date(d1);
      var date2    = new Date(d2);

      var months;
      months = (date2.getFullYear() - date1.getFullYear()) * 12;
      months -= date1.getMonth();
      months += date2.getMonth();
      var month_text  =  (months > 1)? 'mos' : 'mo';

      time_passed = months+month_text;
    }

     return time_passed;
  },

  get_minutes_passed: function(date_diff){
    var value  = Math.floor(date_diff/this.ms_to_minute);
    var delta =  date_diff - value*this.ms_to_minute;

    return {value: value, date_diff: delta};
  },

  get_hours_passed: function(date_diff){
    var value  = Math.floor(date_diff/this.ms_to_hour);
    var delta =  date_diff - value*this.ms_to_hour;


    return {value: value, date_diff: delta};
  },

  get_days_passed: function(date_diff){
    var value  = Math.floor(date_diff/this.ms_to_day);
    var delta =  date_diff - value*this.ms_to_day;

    return {value: value, date_diff: delta};
  },
};

  // component that displays total revenue on dahsboard page

  var icon_encr = '<svg class="icon svg-icon-up"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-up"></use> </svg>';

  var icon_decr = '<svg class="icon svg-icon-down"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-down"></use> </svg>';

  var blank_html = ''
var vue_select_components = [];
var select_imitation;
var select_imitation_icon;
var input_field;
var datepicker_field;
var wait_block;
var animation_mixin;
var single_lead_popup;
var single_lead;
var perfomance;
var debug_vue;
var exist_popup;

var editing_object = -1;


var icons_selects = {
  'clinics': '<svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>',

  'treatments': '<svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>',

  'campaigns': '<svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>',

  'sources': '<svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>',

  'team': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',

  'dentists': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',

  'human': '<svg class="icon svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>',

  'card': '<svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>',

  'currency': '<span class="currency-in-select">£</span>',

  'sortby': '<span class="icon-sortby"> <svg xmlns:dc="http://purl.org/dc/elements/1.1/"xmlns:cc="http://creativecommons.org/ns#"xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"xmlns:svg="http://www.w3.org/2000/svg"xmlns="http://www.w3.org/2000/svg"xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"width="105.73048mm"height="60.448288mm"viewBox="0 0 374.63554 214.18685"id="svg2"version="1.1"inkscape:version="0.91 r13725"sodipodi:docname="desc.svg"> <defs id="defs4" /> <sodipodi:namedview id="base"pagecolor="#ffffff"bordercolor="#666666"borderopacity="1.0"inkscape:pageopacity="0.0"inkscape:pageshadow="2"inkscape:zoom="0.35"inkscape:cx="533.25919"inkscape:cy="533.92856"inkscape:document-units="px"inkscape:current-layer="layer1"showgrid="false"fit-margin-top="0"fit-margin-left="0"fit-margin-right="0"fit-margin-bottom="0"inkscape:window-width="1920"inkscape:window-height="976"inkscape:window-x="-8"inkscape:window-y="1072"inkscape:window-maximized="1" /> <metadata id="metadata7"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <g inkscape:label="Layer 1"inkscape:groupmode="layer"id="layer1"transform="translate(672.54491,-854.96105)"> <path style="fill:#838993"d="m -553.75621,1065.0846 c -7.99146,-7.3236 -6.87414,-19.1169 2.34368,-24.7373 3.83487,-2.3383 6.73931,-2.4401 69.62681,-2.4401 63.62166,0 65.75131,0.077 69.76273,2.5227 8.72665,5.3205 9.74037,16.9649 2.13868,24.5666 l -4.15141,4.1514 -67.64336,0 -67.64335,0 -4.43378,-4.0633 z"id="path4155"inkscape:connector-curvature="0" /> <path style="fill:#838993"d="m -599.26031,978.37748 c -4.88353,-2.6376 -7.56658,-8.71232 -7.05942,-15.98332 0.24135,-3.46003 1.21848,-7.06332 2.33486,-8.61003 4.51521,-6.25572 0.74969,-6.06481 119.62458,-6.06481 105.75005,0 111.35628,0.11175 114.63782,2.28409 3.74051,2.47623 7.15104,9.03755 7.15104,13.7575 0,4.43576 -2.86871,11.02393 -5.91003,13.57271 -2.55732,2.14316 -8.54166,2.275 -115.10261,2.53566 -94.99093,0.23238 -112.91182,10e-4 -115.67624,-1.4918 z"id="path4151"inkscape:connector-curvature="0" /> <path style="fill:#838993"d="m -665.69569,883.60895 c -7.01294,-5.51638 -8.83062,-13.77749 -4.56921,-20.76644 5.15136,-8.4485 -8.3984,-7.87319 185.42869,-7.87319 l 175.50221,0 4.24736,2.85325 c 4.99679,3.3567 8.22065,11.0967 6.86752,16.48795 -0.49088,1.95589 -2.77187,5.4355 -5.06884,7.73248 l -4.17633,4.17632 -177.45643,0 -177.45642,0 -3.31855,-2.61037 z"id="path4147"inkscape:connector-curvature="0" /> </g> </svg> </span>',
};
var select_mixin = {
  data: function () {
    return {
      select_name : this._select_name,
      options: this._options,
      selected:this._selected,
      isExpanded: this._isExpanded,
      isSelected: this._isSelected,
      isHiddenSelect: this._isHiddenSelect,
      isHiddenImitation: this._isHiddenImitation,
    }
  },

  props:{
    _select_name : String,
    _options: Array,
    _selected: String,
    _isExpanded: String,
    _isSelected: Array,
    _isHiddenSelect: Boolean,
    _isHiddenImitation: Boolean,
  },

  created: function(){},

  mounted:function(){},

  methods: {
    change: function(){
      this.$emit('update_list', {val: this.selected, name: this.select_name});
    },

    // toggles state of expanded list initation
    expand_select: function(){
       discard_selects();
       collapse_filters('');
       collapse_top_lists();
      this.isExpanded = 'expanded';
    },

    // toggles select in expanded dropdown
    update_selected_option: function(){
      for(id in this.options){
        this.isSelected[this.options[id]] = false;
      }

      this.isSelected[this.selected] = true;
    },

    // changes data on option click
    imitate_select_option: function(value){
      this.selected = value;
      this.isExpanded = '';
      this.update_selected_option();
      this.change();
    },

     // closes select
    discard_select:function(){
      this.isExpanded = '';
    },

     // updates options of a select
    update_options: function(options){
      this.options = options;
      this.selected = options[0];
      this.isExpanded = '';
      this.update_selected_option();
    },

    // sets value for a select
    set_value: function(key, value){
      this[key] = value;
      this.$emit('update_list', { val :this.selected, name: this.select_name});


      if(key === 'options'){
        var vm = this;
        var select = vm.$el.getElementsByClassName( 'select-imitation__dropdown' )[0].getElementsByClassName( 'select-imitation__list' )[0];
        vm.$el.setAttribute("style", "width: auto");

        Vue.nextTick(function() {
          var width = (window.outerWidth < 768)? window.outerWidth - 30 : select.clientWidth + 62;
          vm.$el.setAttribute("style", "width:" + (width) + 'px');
        });
      }
    },

    resert_width: function(){
      var vm = this;
      vm.$el.setAttribute("style", "width: auto");
    },

    // gets value of a select
    get_value: function(){
      return this.selected;
    },

    // gets name of a select
    get_name: function(){
      return this.select_name;
    }
  },
}
var animation_mixin = {
  methods:{
   beforeEnter: function (el) {
      el.style.opacity = 0
    },

    enter: function (el, done) {
      const width = getComputedStyle(el).width;

      el.style.width = width;
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.height = 'auto';

      const height = getComputedStyle(el).height;

      el.style.width = null;
      el.style.position = null;
      el.style.visibility = null;
      el.style.height = 0;

      getComputedStyle(el).height;

      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: height },
          { complete: done }
        )
      }, delay)
    },

    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    },

    enterAfter: function(el){
      el.style.height = 'auto';

      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    },

    leaveAfter: function(el){
      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    }
  }
}
select_imitation = Vue.component('select-imitation', {

  mixins: [select_mixin],

  template: '<div class="select-imitation" v-bind:class="{ expanded: isExpanded}" > <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span>{{data}}</span> </li> </ul> </div> </div>',
})
select_imitation_icon = Vue.component('select-imitation-icon', {
  mixins: [select_mixin],

  data: function () {
    return {
      icon : this._icon,
    }
  },

  props:{
    _icon: String,
  },

  template: '<div class="select-imitation has-icon select-imitation_shift-bottom" v-bind:class="{ expanded: isExpanded}" > <span v-html="icon"></span> <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span>{{data}}</span> </li> </ul> </div> </div>',
})

datepicker_field = Vue.component('datepicker', {
  data: function () {
    return {
      name:  this._name,
      value : this._value,
    }
  },

  props:['_value', '_name'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).datetimepicker({
      format:'M d Y H:i',

      onClose:function(dp,$input){
        vm.value = $input.val();
        vm.$emit('input_value_changed', {name: vm.name, val: vm.value});
      }
    });
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input type="text" v-on:input="input" autocomplete="off" v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" >',
});
input_field = Vue.component('input-field', {
  data: function () {
    return {
      type: (this._type)? this._type : 'text',
      name:  this._name,
      value : this._value,
      readonly : this._readonly,
      placeholder : (this._placeholder)? this._placeholder : 'Add',
    }
  },

  props:['_value', '_name', '_readonly', '_placeholder', '_type'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
  },

  methods:{
    input: function(){
      if(typeof(this.value) == 'undefined') {
        this.value = jQuery(this.$el).val();
      }

      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="leads-block__input":readonly="readonly == 1" autocomplete="off">',

});


input_field_decorated = Vue.component('input-decorated', {
  data: function () {
    return {
      type: (this._type)? this._type : 'text',
      name:  this._name,
      value : this._value,
      icon : this._icon,
      readonly : this._readonly,
      placeholder : (this._placeholder)? this._placeholder : 'Add',
    }
  },

  props:['_value', '_name', '_readonly', '_placeholder', '_type', '_icon'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<div class="wrapper-input"><span v-html="icon"></span><input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="":readonly="readonly == 1" autocomplete="off"></div>',

});
animation_mixin = {
  methods:{
   beforeEnter: function (el) {
      el.style.opacity = 0
    },

    enter: function (el, done) {
      const width = getComputedStyle(el).width;

      el.style.width = width;
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';

      const height = getComputedStyle(el).height;

      el.style.width = null;
      el.style.position = null;
      el.style.visibility = null;
      // el.style.height = 0;

      getComputedStyle(el).height;

      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1},
          { complete: done }
        )
      }, delay)
    },

    leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0 },
          { complete: done }
        )
      }, delay)
    },

    enterAfter: function(el){

      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    },

    leaveAfter: function(el){
      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    }
  }
}

var vue_selects = {};
var vue_dashboard_totals;
var filter_dashboard;
var vue_team_perfomance;
var dashboard_convertions;
var perfomance;
var vue_top_items = {};
var print_popup ;
/**
**
**/
function update_team_perfomance(){
  if('undefined' !== typeof(is_dashboard)){
    vue_team_perfomance.run_update_list({val: 'all'});
  }
}

/**
**
**/
function discard_selects(){
  for(id in vue_select_components){
    if('undefined' !== typeof(vue_select_components[id])){
      vue_select_components[id].discard_select();
    }
  }

  if('undefined' !== typeof(is_dashboard)){
    perfomance.$refs.perfomance_type.discard_select();
  }
}

//deprecated
function update_top_sources(){
  if('undefined' !== typeof(is_dashboard)){
  }
}

//deprecated
function collapse_top_lists(name){
  if('undefined' !== typeof(is_dashboard)){
  }
}


function init_filters(filter_data){
  if('undefined' !== typeof(is_dashboard)){
    filter_dashboard = new Vue({
      el: '#dashboard-filters',

      data:{
        filters:{
          clinics:    'All Clinics',
          treatments: 'All Treatments',
          campaigns:  'All Campaigns',
          sources:    'All Sources',
          team:       'All Team',
          dentists:   'All Dentists',
        },
      },

      mounted: function(){
        this.init_filters();
      },

      computed: {
        show_filter_clear_btn: function(){
          //console.groupCollapsed('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'filters:', 'show_filter_clear_btn');
          var show = false;
          for(var filter_name in this.filters){
            show = (this.filters[filter_name].search('All') !== 0)? true: show;

            //console.log(show);
          }

          //console.groupEnd();

          return show ? '' : 'visuallyhidden';
        },
      },

      methods: {
        //inits filters
        init_filters: function(){
          //console.log('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'filters:', 'init_filters');
          var props;
          for(select_name in dashboard_filter_data){
            props =  {
              icon: icons_selects[select_name],
              isExpanded: '',
              isSelected: [],
              isHiddenSelect: true,
              isHiddenImitation: false,
            };

            props.options = dashboard_filter_data[select_name];
            props.selected = dashboard_filter_data[select_name][0];

            vue_select_components.push(this.$refs[select_name]);

            for( id in props){
              this.$refs[select_name].set_value(id, props[id]);
            }
          }
        },

        // sets all filters' values to default value
        resert_filters: function(){
          this.filters = {
            clinics:    'All Clinics',
            treatments: 'All Treatments',
            campaigns:  'All Campaigns',
            sources:    'All Sources',
            team:       'All Team',
             dentists:    'All Dentists',
          };

          for(select_name in this.filters){
            this.$refs[select_name].set_value('selected', this.filters[select_name]);
          }
        },

        run_filter_list: function(event){
          if('undefined' !== typeof(event.val)){
            //console.groupCollapsed('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'filters:', 'run_filter_list');

            //console.log(event);
            //console.groupEnd();
            this.filters[event.name] = event.val;

            if('undefined' !== typeof(vue_dashboard_totals)){

              var vm = this;

              Vue.nextTick(function(){
                vue_dashboard_totals.update_filters(vm.filters);
              })
            }
          }
        }
      },
    });
  }
}

function collapse_filters(select_name){}


function update_filters(filter_data){
  if('undefined' !== typeof(is_dashboard)){
    for(select_name in filter_data){
       filter_dashboard.$refs[select_name].set_value('options', filter_data[select_name]);
       filter_dashboard.$refs[select_name].set_value('selected', filter_data[select_name][0]);
    }
  }
}

jQuery('.site-inner').click(function(e){
  if(!jQuery(e.target).closest('.select-imitation').length){
   collapse_top_lists('');
   discard_selects();
  }
})

if('undefined' !== typeof(is_dashboard)){
  init_filters(dashboard_filter_data);
}
if('undefined' !== typeof(is_dashboard)){
  var icon_encr = '<svg class="icon svg-icon-up"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-up"></use> </svg>';

  var icon_decr = '<svg class="icon svg-icon-down"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-down"></use> </svg>';

  vue_dashboard_totals = new Vue({
    el: '#dashboard_totals',

    data:{

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sources:    'All Sourses',
        team:       'All Team',
        dentists:    'All Dentists',
      },

      days_count: 30,

      leads_obj      : dashboard_leads_data,
      leads_obj_prev : dashboard_leads_data_prev,
    },

    computed:{
      filtered_leads: function(){
        var leads = this.run_filtered_leads(this.leads_obj)
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'filtered_leads');
        //console.log(leads);
        //console.groupEnd();
        return leads;
      },

      filtered_leads_prev: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'filtered_leads_prev');
        var leads  = this.leads_obj_prev;

        //console.log('\x1b[34m %s \x1b[0m' , 'Leads initial:');
        //console.log(leads);
        var leads_filtered = [];

        for(id in leads){
          var is_match = true;

          filter_value = leads[id]['filter_data'];

          for(filter_id in this.filters){
            if(this.filters[filter_id].search('All') === 0) continue;

            if(filter_value[filter_id] === null && this.filters[filter_id] !== null){
              is_match = false;
              continue;
            }

            switch(typeof(filter_value[filter_id])){
              case 'object':
                is_match = (filter_value[filter_id].indexOf(this.filters[filter_id]) < 0)? false : is_match;
               break;
              case 'string':
                is_match = (this.filters[filter_id] !== filter_value[filter_id])? false : is_match;
               break;
            }
          }

          if(is_match){
            leads_filtered.push(leads[id]);
          }
        }

        //console.log('\x1b[34m %s \x1b[0m' , 'Leads filtered:');
        //console.log(leads_filtered);
        //console.groupEnd();

        return leads_filtered;
      },

      leads: function(){
        return this.filtered_leads.length;
      },

      revenue_val_prev: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'revenue_val_prev');

        if(!this.leads_obj_prev){
          return 0;
        }
        var total = 0;

        for(id in this.filtered_leads_prev){
          var value = this.filtered_leads_prev[id].meta.treatment_value.value;
          total += get_sum_from_price(value);
        }
        //console.log(total);
        //console.groupEnd();

        return total;
      },

      revenue_val: function(){
        var total = 0;
        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'revenue_val');

        for(id in this.filtered_leads){
          if (this.filtered_leads[id].is_converted == 'yes'){
            var value = this.filtered_leads[id].meta.treatment_value.value;
            if(value){
              total += get_sum_from_price(value);
            }
          }
        }

        //console.log(total);
        //console.groupEnd();

        return total;
      },

      billed_this_period: function(){
        var total = this.get_billed_this_period(this.filtered_leads);
        return total;
      },

      billed_value: function(){
        var billed_total = this.get_billed_value(this.billed_filtered_leads);
        var total = billed_total + this.billed_this_period;
        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'billed_value');
        //console.log(total);
        //console.groupEnd();
        return '£'+ formatMoney(total, 2, ".", ",");
      },

      billed_this_period_prev: function(){
        var total = this.get_billed_this_period(this.filtered_leads_prev);
        return total;
      },

      billed_value_prev: function(){
        var billed_total = this.get_billed_value(this.billed_filtered_leads_prev);
        var total = billed_total + this.billed_this_period_prev;

        //console.groupCollapsed('\x1b[0m%s\x1b[31m %s \x1b[0m' , 'dashboard:', 'billed_value_prev');
        //console.log(total);
        //console.groupEnd();
        return '£'+ formatMoney(total, 2, ".", ",");
      },

      _billed_value_prev: function(){
        //console.log(get_sum_from_price(this.billed_value_prev));
        return get_sum_from_price(this.billed_value_prev);
      },


      billed_filtered_leads: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'billed_filtered_leads');
        //console.log(billed_posts);
        //console.groupEnd();
         return this.run_filtered_leads(billed_posts);
      },

      billed_filtered_leads_prev: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'billed_posts_prev');
        //console.log(billed_posts_prev);
        //console.groupEnd();
        return this.run_filtered_leads(billed_posts_prev);
      },

      revenue: function(){
        return '£'+ formatMoney(this.revenue_val, 2, ".", ",");
      },

      booked_value: function(){
        return '£'+ formatMoney(this.revenue_val, 2, ".", ",");
      },

      avg: function(){
        var avg =  this.revenue_val/this.leads;
        return  '£'+ formatMoney(avg, 2, ".", ",");
      },

      leads_converted: function(){

        var converted_count = 0;

        for(id in this.filtered_leads){
          converted_count = ('yes' === this.filtered_leads[id].is_converted)? converted_count+1 : converted_count;
        }
        return converted_count;
      },

      icon: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? icon_encr: icon_decr;
      },

      icon_billed: function(){
        if(!this.billed_filtered_leads_prev){
          return '';
        }

        return (get_sum_from_price(this.billed_value) >= get_sum_from_price(this.billed_value_prev))? icon_encr: icon_decr;
      },

      up_down: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? 'up': 'down';
      },

      up_down_billed: function(){
        if(!this.billed_filtered_leads_prev){
          return '';
        }

        return (get_sum_from_price(this.billed_value) >= get_sum_from_price(this.billed_value_prev))? 'up': 'down';
      },



      change_type: function(){
        if(!this.leads_obj_prev){
          return '';
        }

        return (this.revenue_val >= this.revenue_val_prev)? 'encr': 'decr';
      },

      change_type_billed: function(){
        if(!this.billed_filtered_leads_prev){
          return '';
        }

        return (get_sum_from_price(this.billed_value) >= get_sum_from_price(this.billed_value_prev))?  'encr': 'decr';
      },

      percent_change: function(){

        var result = Math.abs((this.revenue_val_prev - this.revenue_val)*100/this.revenue_val).toFixed(2);
        return result;
      },

      percent_change_billed: function(){
        var billed_value = get_sum_from_price(this.billed_value);
        var billed_value_prev = get_sum_from_price(this.billed_value_prev);
        var result = Math.abs(((billed_value_prev - billed_value) * 100)/billed_value).toFixed(2);
        return result;
      }
    },

    mounted: function(){
      var vm = this;
      vm.$nextTick(function(){
        jQuery('.preload').removeClass('hidden')
        jQuery('.preload').removeClass('visuallyhidden')
        jQuery('.spinner-cont').remove();
      })
    },

    methods:{
      get_billed_this_period: function(leads){
        var total = 0;

        for(id in leads){
          if ('undefined' != typeof(leads[id].meta.treatment_value.billed)){
            var value = leads[id].meta.treatment_value.billed

            if(value){
              total += get_sum_from_price(value);
            }
          }
        }

        return total;
      },

      get_billed_value: function(leads){

        var date_from = new Date(_from);
        var date_to   = new Date(_to);

        billed_total = 0

        for(var id in leads){
          if('undefined' !== typeof(leads[id].meta.start_date)){
            var billed_start = new Date(leads[id].meta.start_date);
            var count =  count_billed_time(billed_start, date_from, date_to);

            if('undefined' !== typeof(leads[id].meta.treatment_value.mounthly) && !isNaN(leads[id].meta.treatment_value.mounthly)){
                billed_total+= count * get_sum_from_price(leads[id].meta.treatment_value.mounthly);
            }
          }
        }

       return billed_total;
      },

      set_value: function(key, value){
        //console.log('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'set value');
        this[key] = value;
        var vm = this;

        Vue.nextTick(function(){
          this.update_filters(this.filters);
        });
      },

      update: function(){
        //console.log('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'update totals');
        this.leads_obj      = dashboard_leads_data;
        this.leads_obj_prev = dashboard_leads_data_prev;

        var vm = this;
        Vue.nextTick(function(){
          vm.update_filters(this.filters);
        });
     },

      update_filters: function(filters){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'dashboard:', 'update_filters');
        //console.log(filters);
        this.filters = filters;
        //console.log(this.filters);

        //console.groupEnd();

        var vm = this;
        Vue.nextTick(function(){
          vm.$forceUpdate();
        })
      },

      run_filtered_leads: function(leads){
        var leads_filtered = [];
        for(id in leads){
          var is_match = true;

          filter_value = leads[id]['filter_data'];

          for(filter_id in this.filters){
            if(this.filters[filter_id].search('All') === 0) continue;

            if(filter_value[filter_id] === null && this.filters[filter_id] !== null){
              is_match = false;
              continue;
            }

            switch(typeof(filter_value[filter_id])){
              case 'object':
                is_match = (filter_value[filter_id].indexOf(this.filters[filter_id]) < 0)? false : is_match;
               break;
              case 'string':
                is_match = (this.filters[filter_id] !== filter_value[filter_id])? false : is_match;
               break;
            }
          }

          if(is_match){
            leads_filtered.push(leads[id]);
          }
        }

        return leads_filtered;
      },
    },
  })
}

function update_dashboard_totals(days_count){
  if('undefined' !== typeof(is_dashboard)){
    vue_dashboard_totals.update();
    vue_dashboard_totals.set_value('days_count', days_count);
  }
}


function count_billed_time(date, _from, _to, count){

  if(!count){
    var count = 0;
  }

  if(date <= _to && date >= _from) {
    count++;
    var new_date = new Date(date.setMonth(date.getMonth() + 1));
    count = count_billed_time(new_date, _from, _to, count);
  } else if( date < _from ){
    var new_date = new Date(date.setMonth(date.getMonth() + 1));
    count = count_billed_time(new_date, _from, _to, count);
  }

  return count;
}

if('undefined' != typeof(is_dashboard)){
  var _from2 = _from;
  var _to2   = _to;
  print_popup = new Vue({
    el: '#popup-print-options',

    data: {
      filter:{
        clinics: [],
        treatments: [],
        campaigns: [],
        sources: [],
        team: [],
        dentists: [],
        lead_stage: [],
      },

      is_shown: false,

      filter_data_ : dashboard_filter_data_csv,

      leads_obj   : dashboard_leads_data,

      max_items : false,

      filename: 'Leads data',

      leads_found: false,
    },

    watch:{
      "filter.clinics": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.clinics_all' ]).prop({'checked': 0})
        }

         if(this.filter_data['clinics'].length - 1 === this.filter['clinics'].length){

          jQuery(this.$refs['filter.clinics_all' ]).prop({'checked': 1})
         }else{
          jQuery(this.$refs['filter.clinics_all' ]).prop({'checked': 0})

         }
      },

      "filter.treatments": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.treatments_all' ]).prop({'checked': 0})
        }

         if(this.filter_data['treatments'].length - 1 === this.filter['treatments'].length){

          jQuery(this.$refs['filter.treatments_all' ]).prop({'checked': 1})
         }else{
          jQuery(this.$refs['filter.treatments_all' ]).prop({'checked': 0})
         }
      },

      "filter.campaigns": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.campaigns_all']).prop({'checked': 0})
        }


         if(this.filter_data['campaigns'].length - 1 === this.filter['campaigns'].length){
          jQuery(this.$refs['filter.campaigns_all' ]).prop({'checked': 1})
         }else{

          jQuery(this.$refs['filter.campaigns_all']).prop({'checked': 0})
         }
      },

      "filter.sources": function(val){
        if(val.length == 0){
          jQuery(this.$refs['filter.sources_all']).prop({'checked': 0})
        }

         if(this.filter_data['sources'].length - 1 === this.filter['sources'].length){
          jQuery(this.$refs['filter.sources_all' ]).prop({'checked': 1})
         }else{
          jQuery(this.$refs['filter.sources_all']).prop({'checked': 0})

         }
      },

      "filter.team": function(val){
        if(val.length == 0){
         jQuery(this.$refs['filter.team_all']).prop({'checked': 0})
        }

         if(this.filter_data['team'].length - 1 === this.filter['team'].length){
          jQuery(this.$refs['filter.team_all' ]).prop({'checked': 1})
         }else{
         jQuery(this.$refs['filter.team_all']).prop({'checked': 0})

         }
      },

      "filter.dentists": function(val){
        if(val.length == 0){
         jQuery(this.$refs['filter.dentists_all']).prop({'checked': 0})
        }

         if(this.filter_data['dentists'].length - 1 === this.filter['dentists'].length){
          jQuery(this.$refs['filter.dentists_all' ]).prop({'checked': 1})
         }else{
         jQuery(this.$refs['filter.dentists_all']).prop({'checked': 0})

         }
      },

      "filter.lead_stage": function(val){
        if(val.length == 0){
         jQuery(this.$refs['filter.lead_stage_all']).prop({'checked': 0})
        }

         if(this.filter_data['lead_stage'].length - 1 === this.filter['lead_stage'].length){
          jQuery(this.$refs['filter.lead_stage_all' ]).prop({'checked': 1})
         }else{
         jQuery(this.$refs['filter.lead_stage_all']).prop({'checked': 0})

         }
      },
    },

    computed: {
      found: function(){
        var leads = this.filter_leads(this.leads_obj)
        return leads.length;
      },

      filter_data: function(){
        var max_items = 0;

        if(this.filter_data_){
          for(var id in this.filter_data_){
            max_items = Math.max(max_items, this.filter_data_[id].length);
          }
        }

       this.max_items = max_items;
        return this.filter_data_;
      },

      show_this: function(){
        jQuery('.popup-print-options').removeClass('visuallyhidden')
        return this.is_shown ? '' : 'hidden';
      }
    },

    mounted: function(){
      var max_items = 0;

      jQuery('.popup-print-options').removeClass('visuallyhidden')

      if(this.filter_data){
        for(var id in this.filter_data){
          max_items = Math.max(max_items, this.filter_data[id].length);
        }
      }

      this.max_items = max_items;
    },

    methods: {
      show: function(){
        this.is_shown = true;
        Vue.nextTick(function(){
          jQuery('.popup-print-options').removeClass('visuallyhidden')
        })
      },
      hide: function(){
        this.is_shown = false;
      },

      do_filter: function(filter, value){
        var id = this.filter[filter].indexOf(value);

        if(id < 0){
          this.filter[filter].push(value);
        }else{
          this.filter[filter].splice(id, 1);
        }
      },

      do_filter_all: function(filter){
        if(this.filter_data[filter].length - 1 === this.filter[filter].length){
          for(var id in this.$refs['filter.'+filter]){
            var item = jQuery(this.$refs['filter.'+filter][id]);

            if(item.prop('checked')){
              item.trigger('click');
            }
          }

        }else{

          for(var id in this.$refs['filter.'+filter]){
            var item = jQuery(this.$refs['filter.'+filter][id]);

            if(!item.prop('checked')){
              item.trigger('click');
            }
          }
        }
      },

      // create a document file
      // by default prints patients name, billed and booked values
      gen_csv_file: function(leads){
        var formatted_data = [];

        for(var id in leads){
          // prepare initial data
          var lead = leads[id];

          var billed = this.get_billed_this_period(lead) + this.get_billed_value(lead);

          var for_csv = {
            name:      lead.meta.patient_data.name,
            email:     lead.meta.patient_data.email,
            phone:     lead.meta.patient_data.phone,
            source:    lead.meta.patient_data.source,
            treatment: lead.meta.patient_data.treatment,
            clinic:    lead.meta.patient_data.clinic,
            campaign:  lead.meta.patient_data.campaign,
            lead_stage: lead.lead_stage,
            booked:    get_sum_from_price(lead.meta.treatment_value.value).toString(),
            billed:    get_sum_from_price(billed).toString(),
            dentists:  lead.meta.treatment_coordinator.specialist,
            notes:     "",
          };


          // check and modify data about dentists
          // format it to string
          for_csv.dentists = typeof(for_csv.dentists) === 'object'? for_csv.dentists.join(';') : 'none';

          // format notes content
            if(typeof(for_csv.notes) === 'object'){
              var notes = [];
              for (var i in for_csv.notes){
                  notes.push(for_csv.notes[i].text);
              }
              for_csv.notes = notes.join(';');
            }else{
              for_csv.notes = 'none';
            }

           //check and fix all symbols that can break csv markup
            var temp_arr = [];
            for(var i in for_csv){
              var reg = new RegExp("[\n|,|\"]");

                if(for_csv[i] && for_csv[i].match("/\r\n|\n|\r|,/gm")){
              }

               var _t = for_csv[i]? '"' + for_csv[i].split("\n").join(' ').split('"').join(' ').split('#').join(' ') + '"': 'none';

               temp_arr.push(_t);
            }

           formatted_data.push(temp_arr);
        }

        return formatted_data;
      },


      // run print function
      print_data: function(){
        var leads = this.filter_leads(this.leads_obj);
        var formatted_data = this.gen_csv_file(leads);

        var csvContent = "data:text/csv;charset=utf-8,name,email,phone,source,treatment,clinic,campaign,stage,proposed,billed,dentists,notes" + "\r\n"
            + formatted_data.map(e => e.join(",")).join("\r\n");

        var filename = this.filename;
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename + ".csv");
        document.body.appendChild(link); // Required for FF

        link.click();
      },

      filter_leads: function(leads_obj){
        var leads = [];

        // for every lead check if meets current filter values
        // i.e. if each item among lead.filter_data exists and matches selected filter add this lead to a result array
        for(var id in leads_obj){
          // define lead var and consider, that it matches all selected filters
          var lead  = leads_obj[id];
          var add_it = true;

          // for every lead.filter_data check if it matches current filters
          for (var filter_id in lead.filter_data){
            var val    = lead.filter_data[filter_id];
            var filter = this.filter[filter_id];

            // if current'x filter item with id equl filter_id is empty skip check and consider that filter matches all conditioas
            if(filter.length === 0){
              continue;
            }

            // detect type of filter, sting or object
            var type_of_variable = typeof(val);

            // detect if filter is empty
            // if empty consider that it doesn't matches filter set
            // if not empty run test
            switch(type_of_variable){

              // only team members filter is object
              // if filter has values run check
              // other way consider that lead doesn't macth filters
              case 'object':
                if(Object.keys(val).length > 0){
                  //  run check
                  add_it = (Intersec(filter, val).length == 0)? false: add_it;
                }else{
                  // consider, that lead doesn't match filters
                  add_it = false;
                }

                break;
              case 'string':
                // run chek if filter item of lead exists
                // other way consider that lead doesn't match
                if(val){
                  add_it = filter.indexOf(val) < 0 ? false : add_it;
                }else{
                  add_it = false;
                }
                break;
            }

            // if a lead should not be added to a list stop loop and go on proceed  to the next lead


          }

            if(add_it){
              leads.push(lead);
            }


        }

        return leads;
      },

      get_billed_this_period: function(lead){
        var total = 0;

        if ('undefined' !== typeof(lead.meta.treatment_value.billed)){
          var value = lead.meta.treatment_value.billed

          if(value){
            total += get_sum_from_price(value);
          }
        }
        return total;
      },

      get_billed_value: function(lead){
        var date_from = new Date(_from2);
        var date_to   = new Date(_to2);

        // console.log(date_to);

        billed_total = 0

        if('undefined' !== typeof(lead.meta.start_date)){

            var billed_start = new Date(lead.meta.start_date);


            var count =  count_billed_time(billed_start, date_from, date_to);

            if('undefined' !== typeof(lead.meta.treatment_value.mounthly) && !isNaN(lead.meta.treatment_value.mounthly)){

                billed_total+= count * get_sum_from_price(lead.meta.treatment_value.mounthly);

            }
        }
       return billed_total;
      },

      update: function(key, value){
        var vm = this;
        vm[key] = value;

        jQuery(vm.$el).find('[type=checkbox]').prop({'checked': 0})

        Vue.nextTick(function(){
          vm.$forceUpdate();
        });
      }
    }
  });
}

function Intersec(arr1,arr2){

 var idx = 0, arr3 = [];

 for (var i = 0; i < arr2.length; i++)
     {
     idx = arr1.indexOf(arr2[i]);
       if (idx >= 0) arr3.push(arr2[i]);
     }

 return arr3;
}
if('undefined' !== typeof(is_dashboard)){
  perfomance = new Vue({
    el: '#statistic_data',

    data: {
      filter        : false,
      leads         : dashboard_leads_data,
      leads_prev    : dashboard_leads_data_prev,
      elements      : [],
      billed_posts  : billed_posts,
      billed_posts_prev  : billed_posts_prev,
    },

    computed: {
      rows: function(){
        //console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'perfomance:', 'rows calculated');
        var rows = [];
        for(var id in this.elements){

          var item = this.elements[id];
          item.name = id;
          item.billed = this.get_billed_this_period(item.leads) + this.get_billed_value(item.leads_billed);

          item.billed_cha = 0;

          // billed change
          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.leads)){
            var billed_prev_c = ('undefined' == typeof(item.prev.leads))? this.get_billed_this_period(item.prev.leads) : 0;

            var billed_prev = billed_prev_c + this.get_billed_value(item.prev.leads_billed);

            item.billed_prev = billed_prev;

            item.billed_cha = ( get_sum_from_price(item.billed) !== 0 )? ((billed_prev * 100) / get_sum_from_price(item.billed)) : 0;

            item.billed_cha = ((get_sum_from_price(item.billed) - billed_prev )*100)/billed_prev;

            item.billed_prev = billed_prev;
          }

          item.billed_cha = item.billed_cha.toFixed(2);

          item.billed = '£'+ formatMoney(item.billed, 2, ".", ",");
          item.booked = this.calc_revenue_val(item.leads);
          item.booked = '£'+ formatMoney(item.booked, 2, ".", ",");

          item.width = (get_sum_from_price(item.billed) / get_sum_from_price(this.billed_value)) * 100 + '%';

          item.show = get_sum_from_price(item.billed) > 0;


          var converted =(item.converted/item.count)*100;

          item.converted_percents = converted;
          item.converted_percents = (isNaN(item.converted_percents))? "0.00%" :item.converted_percents.toFixed(2) + '%';

          item.converted_percents_cha  = 0;

          // booked changed

          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.converted)){
            var converted_prev = (item.prev.converted/item.prev.count)*100;
            item.converted_percents_cha = (((converted - converted_prev )*100)/ converted_prev);
            item.converted_prev = converted_prev;
            item._converted = converted;
          }

          item.converted_percents_cha = item.converted_percents_cha.toFixed(2);

          item.leads_cha = 0;

          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.count)){

            item.leads_cha = (( item.count - item.prev.count ) * 100) / item.prev.count;
          }

          item.leads_cha = item.leads_cha.toFixed(2);
          item.cha_booked = 0;

          if('undefined' != typeof(item.prev) && 'undefined' != typeof(item.prev.leads)){

            var revenue = this.calc_revenue_val(item.leads);
            var revenue_prev = this.calc_revenue_val(item.prev.leads);

            item.cha_booked = ((revenue - revenue_prev) * 100)/revenue_prev;
            item.revenue_val = revenue;
            item.revenue_prev = revenue_prev;
          }

          item.cha_booked = item.cha_booked.toFixed(2);
          rows.push(item);
        }
        //console.log(rows);
        //console.groupEnd();
        return rows;
      },

      revenue_val: function(){
        return this.calc_revenue_val(this.leads);
      },

      booked_value: function (){
        return '£'+ formatMoney(this.revenue_val, 2, ".", ",");
      },

      billed_value: function(){
         var total = this.get_billed_this_period(this.leads) + this.get_billed_value(this.billed_posts)

         return '£'+ formatMoney(total, 2, ".", ",");
      },
    },

    mounted: function(){
      //console.groupCollapsed('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'perfomance:', 'perfomance mounted');
      var props =  {
        options: ['clinics', "treatments", "campaigns", "sources", "team", 'dentists'],
        selected: 'campaigns',
        isExpanded: '',
        isSelected: [],
        isHiddenSelect: true,
        isHiddenImitation: false,
      };

      for( id in props){
        this.$refs.perfomance_type.set_value(id, props[id]);
      };

      this.elements = this.get_rows();

      var vm = this;

      Vue.nextTick(function(){
        vm.$forceUpdate();
      });

      //console.log('dashboard_leads_data');
      //console.log(dashboard_leads_data);
      //console.log('dashboard_leads_data_prev');
      //console.log(dashboard_leads_data_prev);
      //console.groupEnd();
    },

    methods: {
      calc_revenue_val: function(leads){
        var total = 0;

        for(var id in leads){
          if (leads[id].is_converted == 'yes' && 'undefined' != typeof(leads[id].meta.treatment_value.value) ){
            var value = leads[id].meta.treatment_value.value;
            if(value){
              total += get_sum_from_price(value);
            }
          }
        }
        return total;
      },

      get_billed_this_period: function(leads){
        var total = 0;

        for(var id in leads){
          if ('undefined' !== typeof(leads[id].meta.treatment_value.billed)){
            var value = leads[id].meta.treatment_value.billed

            if(value){
              total += get_sum_from_price(value);
            }
          }
        }
        return total;
      },

      get_billed_value: function(leads){
        var date_from = new Date(_from);
        var date_to   = new Date(_to);

        billed_total = 0

        for(id in leads){
          if('undefined' !== typeof(leads[id].meta.start_date)){

              var billed_start = new Date(leads[id].meta.start_date);

              var count =  count_billed_time(billed_start, date_from, date_to);

              if('undefined' !== typeof(leads[id].meta.treatment_value.mounthly) && !isNaN(leads[id].meta.treatment_value.mounthly)){
                  billed_total+= count * get_sum_from_price(leads[id].meta.treatment_value.mounthly);

              }
          }
        }
       return billed_total;
      },

      change_perfomance: function(event){
        this.filter = event.val;
        this.elements = this.get_rows();
      },

      get_rows: function(){
        var rows;
        switch(this.filter){
          case 'team':
            rows = this.get_rows_object();
            break;
          case 'dentists':
            rows = this.get_rows_object();
            break;
          case 'treatments':
            rows = this.get_rows_object();
            break;
          default:
            rows = this.get_rows_string();
            break;
        }

        return rows;
      },

      //gets rows' data if a target filter item is a string
      get_rows_string: function(){
        var rows = []
        var rows_prev = []


        if(this.filter){
          rows = this.get_rows_leads_data(this.leads, this.filter);

          rows_prev = this.get_rows_leads_data(this.leads_prev, this.filter);

          for(var k in rows){
            rows[k].prev = rows_prev[k]
          }

          for(var id in this.billed_posts){
            var billed_lead = this.billed_posts[id];
            var row_name = billed_lead.filter_data[this.filter];
            row_name = (!row_name)? 'Others' : row_name;
            row_name = (row_name == '--Select--')? 'Others' : row_name;

            if('undefined' == typeof(rows[row_name])){
              rows[row_name] = {
                'count': 0,
                'converted' : 0,
                'leads'     :    [],
                'leads_billed' : [],
              };
            }

            rows[row_name].leads_billed.push(billed_lead);
          }

          for(var id in this.billed_posts_prev){
            var billed_lead = this.billed_posts_prev[id];
            var row_name = billed_lead.filter_data[this.filter];
            row_name = (!row_name)? 'Others' : row_name;
            row_name = (row_name == '--Select--')? 'Others' : row_name;

            if('undefined' == typeof(rows[row_name])){
              rows[row_name] = {
                'count': 0,
                'converted' : 0,
                'leads'     :    [],
                'leads_billed' : [],
              };
            }

            if('undefined' == typeof(rows[row_name].prev)){
              rows[row_name].prev = {
                leads_billed: [],
              };
            }

            rows[row_name].prev.leads_billed.push(billed_lead);
          }
        }

        return rows;
      },

      get_rows_leads_data: function(leads, filter){
        var rows = [];

        for(var id in leads){
          var lead     = leads[id];
          var row_name = lead.filter_data[filter];
          row_name = (!row_name)? 'Others' : row_name;
          row_name = (row_name == '--Select--')? 'Others' : row_name;
          row_name = (row_name.length < 3)? 'Others' : row_name;

          if('undefined' == typeof(rows[row_name])){
            rows[row_name] = {
              'count': 0,
              'converted'  : 0,
              'leads'      : [],
              'leads_billed' : []
            };
          }

          rows[row_name].leads.push(lead);
          rows[row_name].converted = (lead.is_converted == 'yes')? rows[row_name].converted + 1: rows[row_name].converted;
          rows[row_name].count++;
        }

        return rows;
      },

      //gets rows' data if a target filter item is an object
      get_rows_object: function(){
        var rows = []
        var total = 0;

        if(this.filter){
          for(var id in this.leads){

            //get lead
            var lead = this.leads[id];

            //select a filter value object from a lead's data
            var row_names = this.leads[id].filter_data[this.filter];


            var row_name  = false;

            //create new rows if they don't exists and if object not empty
            for(var j in row_names){

              // defined an index of possible new row
              var row_name;

              row_name = (!row_names[j])? 'Others' : row_names[j];
              row_name = (row_name == '--Select--')? 'Others' : row_name;
              row_name = (row_name.length < 3)? 'Others' : row_name;

              //create a row if not exist
              if('undefined' == typeof(rows[row_name])){
                rows[row_name] = {
                  'count': 0,
                  'converted' : 0,
                  'leads'      : [],
                  'leads_billed' : [],
                };
              }
            }

            // if no data set or object is empty create others row
            if(!row_name &&  'undefined' == typeof(rows['Others']) ){
             var row_names = ['Others'];
              rows['Others'] = {
                'count': 0,
                'converted' : 0,
                  'leads'      : [],
                  'leads_billed' : [],
              }
            }

              if(!row_name || row_names.length <= 0){
               var row_names = ['Others'];
              }

            //add values for each name
            for(var k in row_names){
              var row_name = row_names[k];
              row_name = (row_name.length < 3)? 'Others' : row_name;

              rows[row_name].leads.push(lead);

              // calculate converted rows
              rows[row_name].converted = (this.leads[id].is_converted == 'yes')? rows[row_name].converted + 1: rows[row_name].converted;

              // calculate total number of rows
              rows[row_name].count++;
            }
          }

          // calculation of billed value from othe periods

          var date_from = new Date(_from);
          var date_to   = new Date(_to);


          // parse every billed lead
          for(var id in this.billed_posts){
            var billed_lead = this.billed_posts[id];
            var filtered_lead = this.billed_posts[id];
            var row_names = filtered_lead.filter_data[this.filter];
            var row_name  = false;

            //create new rows if they don't exists and if object not empty
            for(var j in row_names){
              row_name = (!row_names[j])? 'Others' : row_names[j];
              row_name = (row_name == '--Select--')? 'Others' : row_name;
              row_name = (row_name.length < 3)? 'Others' : row_name;

              if('undefined' == typeof(rows[row_name])){
                rows[row_name] = {
                  'count': 0,
                  'converted' : 0,
                  'leads'      : [],
                  'leads_billed' : [],
                };
              }

               rows[row_name].leads_billed.push(billed_lead);
            }

             // if no data set or object is empty create others row
            if(!row_name && 'undefined' == typeof(rows['Others'])){
              row_name = 'Others';
              rows['Others'] = {
                'count':    0,
                'converted' : 0,
                'leads'      : [],
                'leads_billed' : [],
               }

              rows[row_name].leads_billed.push(billed_lead);
            }
          }
        }

        return rows;
      },

      update: function(key, value){
        this[key] = value;
        var vm = this;

        Vue.nextTick(function(){
          vm.elements = vm.get_rows();
          vm.$forceUpdate();
        });
      },

      show_item: function(id){
        jQuery('.revenue-proportion > div').removeClass('shown');
        jQuery('.revenue-proportion').find('.color-'+id).addClass('shown');
      },

      hide_all: function(){
        jQuery('.revenue-proportion > div').removeClass('shown');
      },

      load_csv: function(){
        print_popup.show();
      }
    },
  });
}
var vue_leads_list;

var overdue_timeout;
var date_start;


Vue.directive('min-height', {

  componentUpdated: function (el, binding, vnode) {
    el.setAttribute("style", "min-height:" +binding.value + 'px');
  },
});

if('undefined' !== typeof(is_lead_list)){

  vue_leads_list = new Vue({
    el: '#leads-list',

    mixins: [animation_mixin],

    data:{
      height_value: 0,
      scroll_height: 0,
      show         : true,

      single_lead: {
        lead: false,
        new:  false,
      },

      overdue_checked: false,
      not_overdue_checked: false,
      overdue_only_checked: false,
      show_not_read_only: false,

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sources:    'All Sources',
        team:       'All Team',
        dentists:   'All Dentists',
      },

      filter_options:{
        clinics:    [],
        treatments: [],
        campaigns:  [],
        sources:    [],
        team:       [],
        dentists:   [],
      },

      by_phones : [],
      by_phones_data : {},

      search_value: '',

      unread_messages: 0,

      leads:{},

      sortby: 'Sort By',
    },

    computed:{
      get_convertion: function(){
        var vm = this;

        return function (col_id) {
          var leads_total = 0;
          var leads_column_total = 0;
          var column_number = stages.indexOf(col_id);

          if(col_id == failed_lead_name ){
            for(id in this.leads_filtered){
              leads_total += this.leads_filtered[id].length;
            }
          }else{
            for(var i = 0 ; i <= column_number; i++){
              var _col_id = stages[i];
              leads_total +=(_col_id != failed_lead_name && 'undefined' !== typeof(this.leads_filtered[_col_id]))? this.leads_filtered[_col_id].length : 0;
            }
          }

          if('undefined' !== typeof(this.leads_filtered[col_id]) && leads_total > 0){
              leads_column_total = this.leads_filtered[col_id].length;

              var val = (leads_column_total/leads_total)*100;
              return val.toFixed(2);

          }else{
            return 0;
          }
        }
      },

      get_scroll_height: function(){
        return this.scroll_height;
      },

      get_leads_total: function(){
        return function(col_id){
          if(col_id == 'all'){
            var leads_total = 0;

            for(id in this.leads_filtered){
              leads_total += this.leads_filtered[id].length;
            }

            return leads_total;
          }else{
            if('undefined' !== typeof(this.leads_filtered[col_id])){
              return this.leads_filtered[col_id].length;
            }else{
              return 0;
            }
          }
        }
      },

      /**
      * gets array of leads that matches current filter set
      *
      */
      leads_filtered: function(){

        var leads_filtered = {};
        var filters = {};
        var unread_messages = 0;

        for(var column_name in this.leads ){
          leads_filtered[column_name] = [];
        }

        for(var filter_name in this.filters){
         if(this.filters[filter_name].search('All') !== 0){
            filters[filter_name] = this.filters[filter_name];
          }
        }

        for(var column_name in this.leads){
          var fields_search = ['name', 'phone', 'email'];

          for(var id in this.leads[column_name]){
            var lead     = this.leads[column_name][id];
            var is_match = true;

            // apply filter
            for(filter_id in filters){
              //console.log(filter_id);
              switch(typeof(lead.filter_data[filter_id])){
                case 'object':
                  is_match = (lead.filter_data[filter_id].indexOf(filters[filter_id]) < 0)? false : is_match;
                 break;

                default:
                  is_match = (filters[filter_id] !== lead.filter_data[filter_id])? false : is_match;
                 break;
              }
            }

            // apply search
            if(this.search_value){
              var search_match = false;

              for(field in lead){

                if(fields_search.indexOf(field) < 0) continue;
                 var value  = lead[field];
                 var _found = exists_in_object(value, this.search_value);

                 search_match = (_found)? true : search_match;
              }

              is_match = search_match && is_match;
            }

            //apply overdue
            if(this.not_overdue_checked){
              is_match = is_match && (lead.reminder && lead.overdue != 'yes');
            }

            if(this.overdue_only_checked){
              is_match = is_match && (lead.reminder && lead.overdue == 'yes');
            }

            var phone = lead.base_lead.meta.patient_data.phone;

            if('undefined' != typeof(this.by_phones_data[phone])){
              var msgs =  this.by_phones_data[phone];
              var type = msgs[msgs.length - 1].type;

              lead.show_message_alert_him = type === 'him' ? true: false; // by him
              lead.show_message_alert = type === 'him' ? false: true; // by us
            }


            if(this.show_not_read_only){
              is_match = is_match && lead.show_message_alert_him;
            }

            if(is_match){
               unread_messages =  lead.show_message_alert_him ? unread_messages + 1: unread_messages;
            }

            if(is_match){
              leads_filtered[column_name].push(lead);
            }

            this.unread_messages = unread_messages;
          }
        }

       switch(this.sortby){
          case 'Recent Messages':
            for(var column_id in leads_filtered){
             leads_filtered[column_id].sort(this.sort_by_sms);
            }
            break;
          case 'Date Added':
           for(var column_id in leads_filtered){
             leads_filtered[column_id].sort(this.sort_by_date_added);
            }
            break;
          case 'Recently Updated':
           for(var column_id in leads_filtered){
             leads_filtered[column_id].sort(this.sort_by_date);
            }
            break;
        }

        return leads_filtered;
      },

      unread_messages_calc: function(){
        return this.unread_messages;
      },

      show_filter_clear_btn: function(){
        var show = false;
        for(var filter_name in this.filters){
          show = (this.filters[filter_name] !== dashboard_filter_data[filter_name][0])? true: show;
        }

        return show ? '' : 'visuallyhidden';
      },

      alarms: function(){
        var alarms = 0;
        var overdue = 0;

        for(col_id in this.leads_filtered){
          for(id in this.leads_filtered[col_id]){
            var lead = this.leads_filtered[col_id][id];
            alarms = (lead.reminder && 'yes' != lead.overdue)? alarms+1 : alarms;
            overdue = (lead.reminder && 'yes' === lead.overdue)? overdue+1 : overdue;
          }
        }

        if(alarms === 0){
          this.overdue_checked = false;
        }

        return {
           total: alarms,
           overdue: overdue,
           class: (alarms > 0)? '' : 'visuallyhidden',
           class_overdue: (overdue > 0)? '' : 'visuallyhidden',
         };
      },
    },

    watch:{
      sortby:function(data){
        Cookie.set('sort_lead_list', data);
        // this.run_update_list();
      },

      overdue_checked: function(show){
      },

      overdue_only_checked: function(show){
        if(show){
          this.not_overdue_checked = false;
        }

      },

      not_overdue_checked: function(show){
        if(show){
          this.overdue_only_checked = false;
        }
      },

      show: function(value){
        var vm = this;
        if(!value){
         vue_select_components = [];
        }else{
          strlog(value, 'display leads list' );
          vm.init();

          Vue.nextTick(function(){
             strlog('next tick equal_list_heights', 'red');
            equal_list_heights();
            do_sort();
          })
        }
      },

      'filters.clinics': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.treatments': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.campaigns': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.sources': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.team': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.dentists': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },
    },

    created: function(){
      strlog('Leads List Created', 'green');
    },

    beforeMount: function(){
      var vm = this;
      var leads = parse_leads.construct();
      _leads = leads.get_leads_for_list();
      vm.update_leads(_leads);
    },

    mounted: function(){
      var vm = this;
      vm.init();
      // vm.handle_resize();
      vm.check_text_messages();

      vm.$nextTick(function(){
        strlog('next tick', 'red');
        setInterval(function(){vm.check_text_messages()}, 60000);
      })

      window.addEventListener('resize', vm.handle_resize);

      strlog('mounted', 'purple')
     },

   updated: function(){
     strlog('updated', 'purple')
   },

    methods:{
      init: function(){
        var vm = this;
        vm.init_filters();

        vm.$nextTick(function(){
          jQuery('.preload-timer').addClass('hidden');
          jQuery('.leads-container').removeClass('visuallyhidden');
          jQuery('.filter-container').removeClass('visuallyhidden');
          strlog('Leads List Loaded', 'green');
        })
      },

      get_text_list: function(data){
        if(data.treatment){
          return data.treatment;
        } else if(data.campaign){
          return data.campaign;
        } else if(data.source){
          return data.source;
        }else if(data.sourse){
          return data.sourse;
        }
      },
      //fits horisontal scroll container to screen height
      handle_resize (event) {
        //console.groupCollapsed('Leads list resize');
        //resert height of scroll content
        this.$refs.horizontal_scroll.setAttribute("style", "min-height:0");

        //calculate element height
        this.height_value = this.$refs.parent.clientHeight;


        //calculate scroll-block height
        this.scroll_height = this.height_value - this.$refs.spacer1.clientHeight - this.$refs.spacer2.clientHeight - this.$refs.container_filter.clientHeight - 40;

        this.$forceUpdate();

        //console.log('Scroll area height:' + this.scroll_height);
        //console.groupEnd('----');
      },

      init_datepicker: function(){
        init_date_range();
      },

      //inits filters
      init_filters: function(){

        var vm = this;

        var saved_filter = JSON.parse(Cookie.get('lead_list_filter2'));

        var all_props = {};

        for(var select_name in dashboard_filter_data){

          var props =  {
            icon: icons_selects[select_name],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
          };

          props.options =  dashboard_filter_data[select_name];
          props.selected = (saved_filter)? saved_filter[select_name] : dashboard_filter_data[select_name][0];
          all_props[select_name] = props;
        }

        var sortby = Cookie.get('sort_lead_list')?  Cookie.get('sort_lead_list') : 'Sort By';

        var props_sort =  {
          icon: icons_selects.sortby,
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: ['Sort By','Recent Messages','Date Added', 'Recently Updated'],
          selected: sortby,
        };

        this.sortby = sortby;

        for(var  id in props_sort){
          if('undefined' !== typeof(vm.$refs['sort'])){
            vm.$refs['sort'].set_value(id, props_sort[id]);
          }
        }

        vue_select_components.push(vm.$refs['sort']);

        vm.$nextTick(function(){
           strlog('next tick selects', 'red');

          for(var select_name in all_props){
            vue_select_components.push(vm.$refs[select_name]);
            var props = all_props[select_name];

            for(var  id in props){
              if('undefined' !== typeof(vm.$refs[select_name])){
                vm.$refs[select_name].set_value(id, props[id]);
              }
            }
          }

          strlog('selects initalized', 'red');
        });
      },

      // sets all filters' values to default value
      resert_filters: function(){

        this.filters = {
          clinics:    'All Clinics',
          treatments: 'All Treatments',
          campaigns:  'All Campaigns',
          sources:    'All Sources',
          team:       'All Team',
          dentists:    dashboard_filter_data['dentists'][0],
        };

        for(select_name in this.filters){
          this.$refs[select_name].set_value('selected', this.filters[select_name]);
        }
      },

      //changes filters values
      run_filter_list: function(select_value){
        if(select_value){
          //console.log('leads were filtered: ' + select_value.name + ' = ' +  select_value.val);
          this.filters[select_value.name] = select_value.val;
        }
        // Cookie.set('lead_list_filter', JSON.stringify(this.filters));
      },

      // updates list value
      run_update_list: function(){
        if(this.filters){
          var leads = parse_leads.construct();
          leads.filter_for_leads_list(this.filters);
          var leads_filtered = leads.get_leads_for_list();
          this.update_leads(leads_filtered);
        }
      },

      // sort function forr manual drag and drop
      sort_by_order: function(a, b){
        if(a.order === b.order){
          return 0;
        }
        return (a.order > b.order)? 1 : -1;
      },

      sort_by_id: function(lead_a,lead_b){
        if(lead_a.post_id === lead_b.post_id){
          return 0;
        }
        return (lead_a.post_id > lead_b.post_id)? 1 : -1;
      },

      sort_by_date: function(lead_a,lead_b){
        var date_lead_a = new Date(lead_a.post_modified);
        var date_lead_b = new Date(lead_b.post_modified);

        if(date_lead_a === date_lead_b){
          return 0;
        }
        return (date_lead_a > date_lead_b)? -1 : 1;
      },

      sort_by_date_added: function(lead_a,lead_b){
        var date_lead_a = new Date(lead_a.base_lead.post_date);
        var date_lead_b = new Date(lead_b.base_lead.post_date);

        if(date_lead_a === date_lead_b){
          return 0;
        }
        return (date_lead_a > date_lead_b)? -1 : 1;
      },


      sort_by_sms: function(lead_a,lead_b){
        if((lead_a.show_message_alert_him && lead_b.show_message_alert_him && lead_b.show_message_alert && lead_a.show_message_alert) || (!lead_a.show_message_alert_him && !lead_b.show_message_alert_him  && !lead_b.show_message_alert && !lead_a.show_message_alert)){
          return 0;
        }
        if(lead_a.show_message_alert_him && !lead_b.show_message_alert_him){
          return -1;
        }
        if(!lead_a.show_message_alert_him && lead_b.show_message_alert_him){
          return 1;
        }
        if(lead_a.show_message_alert && !lead_b.show_message_alert){
          return -1;
        }
        if(!lead_a.show_message_alert && lead_b.show_message_alert){
          return 1;
        }
      },


      update_leads: function(leads){
        var temp_leads = {};
        this.leads = {};

        for(id in leads){
          if('undefined'  === typeof(temp_leads[leads[id].lead_stage])){
            temp_leads[leads[id].lead_stage]  = [];
          }
          temp_leads[leads[id].lead_stage].push(leads[id]);
        }

        switch(this.sortby){
          case 'Recent Messages':
            for(id in temp_leads){
              temp_leads[id].sort(this.sort_by_sms);
            }
            break;
          case 'Date Added':
            for(id in temp_leads){
              temp_leads[id].sort(this.sort_by_date_added);
            }
            break;
          case 'Recently Updated':
            for(id in temp_leads){
              temp_leads[id].sort(this.sort_by_date);
            }
            break;
        }

        this.leads = temp_leads;
      },

      set_data: function(key, value){
        this[key] = value;
      },

      run_search: function(search){
        //console.log('run search');
        this.search_value = search;
      },

      load_csv: function(){
        var formatted_data = [];

        var filters = [];

        for(var j in this.filters){
         if(this.filters[j].match('All')){
         }else{
            filters.push(this.filters[j]);
          }
        }

        filters = filters.length ==0 ? ['No filters']: filters;

        filename = jQuery('.range-datepicker__text').text() + '_' + filters.join('-')

        filename = filename.split(' ').join('_');

        if(jQuery('.search__field').val()){
          filename+='__searched_for%'+ jQuery('.search__field').val()
        }

        for(var column in this.leads_filtered){
          var column_data =  this.leads_filtered[column];
          // console.log(column_data);

          for(var lead_id in column_data){

            var temp = {
              name: column_data[lead_id].name,
              treatment: column_data[lead_id].treatment,
              clinic: column_data[lead_id].clinic,
              campaign: column_data[lead_id].for_csv.campaign,
              notes: '',
              proposed: '£' + formatMoney(column_data[lead_id].for_csv.proposed, 2, '.', ',') ,
              billed: '£' + formatMoney(column_data[lead_id].for_csv.billed, 2, '.', ',') ,
            };


            temp.dentists = typeof(column_data[lead_id].for_csv.dentists) === 'object'? column_data[lead_id].for_csv.dentists.join(';') : 'none';

            if(typeof(column_data[lead_id].for_csv.notes) === 'object'){
              var notes = [];
              for (var i in column_data[lead_id].for_csv.notes){
                  notes.push(column_data[lead_id].for_csv.notes[i].text);
              }
              temp.notes = notes.join(';');
            }else{
              temp.notes = 'none';
            }

            var temp_arr = [];

            for(var i in temp){
              var reg = new RegExp("[\n|,|\"]");
              if(temp[i] && temp[i].match("/\r\n|\n|\r|,/gm")){
              }

               var _t = temp[i]? '"' + temp[i].split("\n").join(' ').split('"').join(' ').split('#').join(' ') + '"': 'none';

               temp_arr.push(_t);
            }

            formatted_data.push(temp_arr);
          }
        }

          var csvContent = "data:text/csv;charset=utf-8,name,treatment,clinic,campaign,notes,proposed,billed,dentists" + "\r\n"
              + formatted_data.map(e => e.join(",")).join("\r\n");

          var encodedUri = encodeURI(csvContent);
          var link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", filename + ".csv");
          document.body.appendChild(link); // Required for FF

          link.click();
      },


      /**
      * show single lead on click on a lead item on a list
      *
      * @param {post_id} - integer WP_Post id,
      */
      show_single_lead: function(post_id, lead){
        editing_object = post_id;
        var vm = this;
        date_start = lead.base_lead.post_date;

        single_lead.run_update_lead = true;
        single_lead.init();
        single_lead.base_lead = lead.base_lead;
        vue_leads_list.show = false;
      },

      update_dashboard_lead_data: function(lead_id ){

      },

      check_text_messages: function(){
        var vm = this;

        if('undefined' == typeof(sms_data)){
          return;
        }

        var data = {
          sms_data: sms_data,
          phone: 'all',
        };

        jQuery.ajax({
          url: WP_URLS.theme_url+"/messaging/twilio_update_msg.php",
          type: 'POST',
          dataType: 'json',
          data: data,
        })

        .done(function(e) {
          if(!e.error){
            vm.by_phones = e.by_phones;
            vm.by_phones_data = e.by_phones_data;
            console.log(e);
          }
        })

        .fail(function() {
        })

        .always(function(e) {
          // console.log(e);
        });
      },

      sort_leads: function(data){
        if(data.val){
          this.sortby = data.val;
        }
      },
    },
  })

}


function get_theme_users(){

  jQuery.ajax({
    url: WP_URLS.wp_ajax_url,
    type: 'POST',
    dataType: 'json',
    data: {action: 'theme_get_users'},
  })
  .done(function() {
    clog("success");
  })
  .fail(function() {
    clog("error");
  })
  .always(function(e) {
    clog(e);
  });

}

function update_leads_filters(filters){
  var saved_filter = JSON.parse(Cookie.get('lead_list_filter'));

  if('undefined' !== typeof(is_lead_list)){



    for(select_name in filters){
      vue_leads_list.$refs[select_name].set_value('options', filters[select_name]);

      // var selected = (saved_filter )

     var selected = (saved_filter && filters[select_name].indexOf(saved_filter[select_name]) >=0)? saved_filter[select_name]: filters[select_name][0];

      vue_leads_list.$refs[select_name].set_value('selected', selected);
    }
  }
}

function update_leads_list(){
  if('undefined' !== typeof(is_lead_list)){
    vue_leads_list.run_update_list();
    vue_leads_list.check_text_messages();
  }
}

function exists_in_object(obj, search){
  if(typeof(obj) === 'string'){
    search = search.toLowerCase();
    obj = obj.toLowerCase();
    return obj.search(search) >= 0;
  }

  var found = false;

  for(id in obj){
    var _found = exists_in_object(obj[id], search);
    found = (_found)? true : found;
  }

  return found;
}
if(document.getElementById('exist-popup')){
  exist_popup = new Vue({
    'el' : '#exist-popup',

    data: {
      show: false,
      name: '',
      email: '',
      phone: '',
      posted_data: {},
      leads: [],
    },

    watch: {},

    mounted: function(){
      this.$el.classList.remove('visuallyhidden');
    },

    computed:{
      number: function(){
        return this.leads.length;
      }
    },

    methods: {
      cancel: function(){
        this.show = false;
      },

      create: function(){
        this.show = false;
        this.posted_data.confirmed= 1;
        wait_block.show();
        single_lead.second_request(this.posted_data)
      },

      time_passed:function(date){

        var now = new Date();
        var date_received = new Date(date);

        return date_difference.construct(date_received, now)  + ' ago';
      },

      marked: function(v){
        return v == this.name ||v == this.phone ||v == this.email;
      }
    },
  });
}
if('undefined' !== typeof(is_single_lead)){
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var default_sources = [
          'Live Chat',
          'Instagram',
          'Slaine Instagram',
          'Riz Instagram',
          'Andy Instagram',
          'Pete Instagram',
          'Sonnie Instagram',
          'Google PPC',
          'Website',
          'Phone',
          "Walk In",
          "Other"
        ];

  single_lead = new Vue({
    el: '#single-lead',

    mixins: [animation_mixin],

    data: {
      patient_data: {
        name: '',
        phone: '',
        email: '',
      },

      tco_data: tco_data,

      treatment_value: {
        billed    : 0,
        value     : 0,
        terms     : '',
        mounthly  : '',
        date_end : date_start,
      },

      treatment_coordinator: {
        specialist: Object.values(assigned_dentists),
      },

      treatment_data: treatment_data,

      notes       : [],
      notes_tco   : [],
      enquery_notes_count: 1,
      tco_notes_count: 1,
      files       : [],
      logs        : [],
      lead_data   : {},
      note_text   : '',
      note_text_tco    : '',
      reminder    : '',
      new_file    : '',
      phones      : 0,
      phones_tco  : 0,
      sms_tco     : 0,
      messages    : 0,
      messages_tco    : 0,
      requre_save : false,
      save_text           : 'Save Changes',
      specialists_data    : {},
      selected_specialist : false,
      lead_stage: '',
      show_confirmation_popup: false,
      balance: 0,
      message_to_client: '',
      sms_data: sms_data,
      text_messages: [],
      text_messages_to_show: 2,
      intial_load : true,
      deleting_lead : false,
    },

    computed:{
      text_messages_shown: function(){

        if(this.text_messages_to_show  == 2 && this.text_messages.length > 2){
          var messages = [];
          for(var i = 2; i > 0 ; i--){
          messages.push(this.text_messages[this.text_messages.length - i]);
          }
          return messages;
        }else{
          return this.text_messages;
        }
      },

      enquery_notes_c: function(){
        var notes = this.notes;
        var notes_c = [];
        var counter = 0;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.enquery_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      enquery_notes_count_c: function(){
        var counter = 0;
        var notes = this.notes;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      tco_notes_c: function(){
        var notes = this.notes_tco;
        var notes_c = [];
        var counter = 0;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.tco_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      tco_notes_count_c: function(){
        var counter = 0;
        var notes = this.notes_tco;

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },


      messages_left : function(){
        return Math.max(0, 3 - this.messages);
      },

      phones_left : function(){
        return Math.max(0, 3 - parseInt(this.phones));
      },

      phones_count: function(){
        return parseInt(this.phones);
      },

      messages_count: function(){
        return parseInt(this.messages);
      },

      file_is_prepared: function(){
        return this.new_file.length > 0
      },

      files_updated: function(){
        return this.files;
      },

      is_requre_save: function(){
        return this.requre_save;
      },

      get_logs: function(){
        return this.logs;
      },

      show_add_specialist_button: function(){
        return !!this.selected_specialist;
      },

      visible_specialists: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show){
            shown.push(this.specialists_data[id]);
          }
        }

        return shown;
      },

      visible_specialists_tco: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show_tco){
            shown.push(this.specialists_data[id]);
          }
        }

        return shown;
      },


      visible_specialists_show_select: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show){
            shown.push(this.specialists_data[id]);
          }
        }
        return shown.length > 0 ? 'hidden': '';
      },

      visible_specialists_show_select_tco: function(){
        var shown = [];

        for(id in this.specialists_data){
          if('yes' === this.specialists_data[id].show_tco){
            shown.push(this.specialists_data[id]);
          }
        }
        return shown.length > 0 ? 'hidden': '';
      },


      get_treatment_value: function(){
        return this.treatment_value.value;
      },

      get_billed_value: function(){
        return this.treatment_value.billed;
      },

      get_terms_count: function(){
        $return = 1;
        switch(this.treatment_value.terms){
          case '12 Months':
             $return = 12;
            break;
          case '18 Months':
             $return = 18;
            break;
          case '24 Months':
             $return = 24;
            break;
          case '36 Months':
             $return = 36;
            break;
          case '48 Months':
             $return = 48;
            break;
          default:
             $return = 1;
            break;
        }

        return  $return;
      },

      monthly_payment: function(){
        var billed = get_sum_from_price(this.get_billed_value);
        var summ = (get_sum_from_price(this.get_treatment_value) - get_sum_from_price(this.get_billed_value))/this.get_terms_count;
        summ = summ.toFixed(2);
        this.treatment_value.mounthly = summ;
        return   '£'+ formatMoney(summ, 2, ".", ",");
      },

      c_dentists: function(){
        var dentists = [];
        for (s in this.treatment_coordinator.specialist){
           if(this.treatment_coordinator.specialist[s])

            dentists.push(this.treatment_coordinator.specialist[s]);
        }

        return dentists;
      },

      c_treatments: function(){
        var treatments = [];
        for (s in this.treatment_value.treatment){
           if(this.treatment_value.treatment[s])

            treatments.push(this.treatment_value.treatment[s]);
        }

        return treatments;
      },
    },

    watch: {
      text_messages_to_show: function(val){
        if(val > 2){
          Vue.nextTick(function(){
            jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
          })
        }
      },

      note_text: function(){
        this.$refs.note_textarea.style.height = '';
        this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
      },

      note_text_tco: function(){
        this.$refs.note_textarea_tco.style.height = '';
        this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px';
      },


      'treatment_value.billed': function(val){

        var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


        this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },


      'treatment_value.value': function(val){

        var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


        this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },

      'treatment_value.terms': function(val){

        var count = 0;

        switch(val){
          case '12 Months' :
            count = 12;
            break;
          case '18 Months' :
            count = 18;
            break;
          case '24 Months' :
            count = 24;
            break;
          case '36 Months' :
            count = 36;
            break;
          case '48 Months' :
            count = 48;
            break;
        }

        if(count > 0){
          var date = new Date(date_start);
          date.setMonth(date.getMonth() + count);

          var month = (date.getMonth() < 9)? "0" + (date.getMonth() + 1) : (date.getMonth() + 1) ;

          var _date = date.getDate() < 10? '0' + date.getDate() : date.getDate();

          var hours =  date.getHours() < 10? '0' + date.getHours() : date.getHours();

          var minutes =  date.getMinutes() < 10? '0' + date.getMinutes() : date.getMinutes();

          var date_end = date.getFullYear() + '-' + month  + '-' + _date + ' ' + hours + ':'+ minutes + ':'+ '00';

          this.treatment_value.date_end = date_end;
        }else{
          this.treatment_value.date_end = date_start;
        }

        posted_data = {
          date: this.treatment_value.date_end,
          lead_id: this.lead_data.lead_id,
          action: 'save_lead_end_date',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: posted_data,

          complete: function(xhr, textStatus) {
          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
          },

          error: function(xhr, textStatus, errorThrown) {}
        });
      },

      'patient_data.name': function(){
        jQuery('input[name=name]').removeClass('error');
      },

      'patient_data.phone': function(){
        jQuery('input[name=phone]').removeClass('error');
      },

      'patient_data.email': function(){
        jQuery('input[name=email]').removeClass('error');
      },
    },

    created: function(){},

    mounted: function(){
      this.phones = phone_count;
      this.phones_tco = parseInt(phone_count_tco);
      this.sms_tco = parseInt(sms_count_tco);
      this.messages = message_count;
      this.messages_tco = parseInt(message_count_tco);
      this.notes = lead_notes;
      this.notes_tco = lead_notes_tco;
      this.files = lead_files;
      this.logs  = lead_logs;
      this.specialists_data  = specialists_data;
      this.init_select();
      this.treatment_data_selects();
      var vm = this;

      if(vm.lead_data.lead_id >=0){
        vm.update_text_messages();
        setInterval(function(){
          console.log('check messages');
          vm.update_text_messages();
        },30000)
      }
    },

    methods: {
      update_treatment_data: function(e, key){
        if(typeof(e.val)  !== 'undefined'){
          this.treatment_data[key][e.name] = e.val;

          var total = 0;

          for(var id in this.treatment_data){
            total += get_sum_from_price(this.treatment_data[id].billed);
          }

          this.treatment_value.value =  '£' + formatMoney(total,2, '.',',');
        }
      },

      add_treatment_dentist: function(){

        this.treatment_data.push({
          'treatment': '',
          'dentist': '',
          'billed' : 0,
          'payment_method': ''
        });

        var vm = this;
        Vue.nextTick(function(){

         var select_id = vm.treatment_data.length - 1;


         // init dentists list
         var props =  {
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            icon: icons_selects['human'],
            options: available_dentists,
          };

          if(is_dentist === 'yes'){
            props['selected'] = dentist_name;
          }

          for( var id in props){
            vm.$refs['select_dentist'][select_id].set_value(id, props[id]);
          }


         // init treatments list
         var props =  {
            icon: icons_selects['treatments'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: treatments,
          };

          for( var id in props){
            vm.$refs['select_treatment'][select_id].set_value(id, props[id]);
          }

         var props =  {
            icon: icons_selects['currency'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: payment_methods,
          };

          for( var i in props){
            vm.$refs['select_payment_method'][select_id].set_value(i, props[i]);
          }



          vue_select_components.push(vm.$refs['select_dentist'][select_id]);
          vue_select_components.push(vm.$refs['select_treatment'][select_id]);
          vue_select_components.push(vm.$refs['select_payment_method'][select_id]);
        })
      },

      price_to_value: function(ref){
        var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;

        switch(ref){
          case 'price_input_field':
            var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;
            break;
          case 'input_billed':
            var summ = (!!this.treatment_value.billed)? this.treatment_value.billed : 0;
            break;
        }
        summ = get_sum_from_price(summ);
        this.$refs[ref].set_value(summ);
      },

      update_dates: function(){
        // console.log(this);
      },

      value_to_price: function(ref){
        switch(ref){
          case 'price_input_field':
            var summ = '£' + formatMoney(this.treatment_value.value,2, '.',',');
            break;
          case 'input_billed':
            var summ = '£' + formatMoney(this.treatment_value.billed,2, '.',',');
            break;
        }
         this.$refs[ref].set_value(summ);
      },

      treatment_data_selects: function(){
        var vm = this;
        var total = 0;

        for(var id in vm.treatment_data){
         var select_id = id;
         var data = vm.treatment_data[id];

         var props =  {
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            icon: icons_selects['human'],
            options: available_dentists,
            selected: data['dentist'],
          };

          for( var i in props){
            vm.$refs['select_dentist'][select_id].set_value(i, props[i]);
          }


          vue_select_components.push(vm.$refs['select_dentist'][select_id]);

         var props =  {
            icon: icons_selects['treatments'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: treatments,
            selected: data['treatment']
          };

          for( var i in props){
            vm.$refs['select_treatment'][select_id].set_value(i, props[i]);
          }

          vue_select_components.push(vm.$refs['select_treatment'][select_id]);

         var props =  {
            icon: icons_selects['currency'],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
            options: payment_methods,
            selected: data['payment_method']? data['payment_method']: 'Payment Method',
          };

          for( var i in props){
            vm.$refs['select_payment_method'][select_id].set_value(i, props[i]);
          }


          vue_select_components.push(vm.$refs['select_payment_method'][select_id]);
          vm.$refs.select_billed[select_id].set_value( data['billed']);


          total += get_sum_from_price(data['billed']);
        }

        vm.treatment_value.value = total;
      },


      init_select: function(){

       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        };

        if(jQuery(window).width()< 768){
          props.isHiddenSelect = false;
          props.isHiddenImitation =  true;
        }

        props.options = typeof(theme_leads_sources)!== 'undefined'? theme_leads_sources: default_sources;



        for( id in props){
          this.$refs['source_select'].set_value(id, props[id]);
        }

        props.options = specialists;

        for( id in props){
          this.$refs['lead_specialissts_select'].set_value(id, props[id]);
        }

       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
        };

        props.options = specialists_tco;

        for( id in props){
          this.$refs['lead_specialissts_select_tco'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['source_select']);
        vue_select_components.push(this.$refs['lead_specialissts_select']);
        vue_select_components.push(this.$refs['lead_specialissts_select_tco']);


        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: treatments,
        };

        for( id in props){
          this.$refs['treatments_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['treatments_select']);
        vue_select_components.push(this.$refs['treatments_select2']);

        this.$refs['treatments_select'].resert_width();

        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: clinics,
        };

        for( id in props){
          this.$refs['clinic_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['clinic_select']);

        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: campaigns,
        };

        for( id in props){
          this.$refs['campaign_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['campaign_select']);


       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: stages,
        };

        for( id in props){
          this.$refs['lead_stage_select2'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['lead_stage_select2']);
      },

      save_lead_meta: function(key_meta, key_this){
        console.log('save_lead_meta');
        var vm = this;

        if (vm.deleting_lead){
          return;
        }

        if(typeof(key_meta) !== 'string'){
          var meta = {
            patient_data          : this.patient_data,
            treatment_data        : this.treatment_data,
            treatment_value       : this.treatment_value,
            treatment_coordinator : this.treatment_coordinator,
            lead_notes            : this.notes,
            lead_notes_tco        : this.notes_tco,
            reminder              : this.reminder,
            text_messages         : this.text_messages,
            tco_data              : this.tco_data,
          };
        }else{
          var  meta = {};
          meta[key_meta] = this[key_this];
        }

        var posted_data = {
          confirmed: 0,
          meta: meta,
          action                : 'update_lead_meta',
          lead_data             : this.lead_data,
          nonce                 : jQuery('[name=lead_data]').val(),
        };

        this.show_confirmation_popup = (this.lead_data.lead_id >=0 )? true : this.show_confirmation_popup ;

        var no_popup_keys = [
          'tco_data',
          'lead_notes',
          'lead_notes_tco',
          'text_messages',
        ];

        if(no_popup_keys.indexOf(key_meta) >=0 ){
          this.show_confirmation_popup = false;
        }


        if((!this.patient_data.name || !this.patient_data.phone || !this.patient_data.email) && this.lead_data.lead_id < 0){


          if(!this.patient_data.phone){
            jQuery('input[name=phone]').addClass('error');
          }

          if(!this.patient_data.name){
            jQuery('input[name=name]').addClass('error');
          }

          if(!this.patient_data.email){
            jQuery('input[name=email]').addClass('error');
          }
          return false;
        }

        var vm = this;

        var no_block_keys = [
          'text_messages',
          'tco_data',
        ];

       if( no_block_keys.indexOf(key_meta) < 0){
          wait_block.show();
        }

        console.log(posted_data);

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: posted_data,

          complete: function(xhr, textStatus) {
             console.log(xhr);
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(posted_data);
            console.log(data);

            if(data.confirm){
               var confirm = window.confirm(data.confirm);

               if(!confirm){
                return;
               }
            }

            if(data.exist_leads){
              exist_popup.name  = posted_data.meta.patient_data.name;
              exist_popup.phone = posted_data.meta.patient_data.phone;
              exist_popup.email = posted_data.meta.patient_data.email;
              exist_popup.leads = data.leads;
              exist_popup.leads = data.leads;
              exist_popup.posted_data = posted_data;
              exist_popup.show = true;
              return;
            }

            if(data.reload){
              location.href = data.url;
              // wait_block.show();
            }

            if(data.post_id){

              vm.$refs.lead_id_input.set_value(data.post_id);
            }
            jQuery('.button-create span').text('Save Changes');
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);

              console.log(response_text);

              if(response_text.data[0] === 'name was found'){
                var confirm = window.confirm("Are you sure you want to add lead for " + vm.patient_data.name +'? Lead for patient with this name already exists');

                // console.log(confirm);

                if(confirm){
                  posted_data.confirmed= 1;
                  wait_block.show();
                  vm.second_request(posted_data)
                }

              }else{
                alert(response_text.data[0]);
              }
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      },


      second_request: function(posted_data){
        console.log(posted_data);
        var vm = this;
        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: posted_data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
            if(data.post_id){
              vm.$refs.lead_id_input.set_value(data.post_id);
            }
            jQuery('.button-create span').text('Save Changes');

            if(data.reload){
              location.href = data.url;
              // wait_block.show();
            }
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              // console.log(xhr);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      },

      update_lead: function(data, key){

        if('object' === typeof(data)){
          if(key === 'treatment_coordinator' && data.name === 'specialist' ){
            if('undefined' === typeof(this[key][data.name])){
              this[key][data.name] = []
            }

            if(this[key][data.name].indexOf(data.val) < 0){
              this[key][data.name].push(data.val);
            }else{
              var ind = this[key][data.name].indexOf(data.val);
              this[key][data.name].splice(ind, 1);
            }

          }else if(key === 'treatment_value' && data.name === 'treatment' ){
            if('undefined' === typeof(this[key][data.name])){
              this[key][data.name] = []
            }

            if(this[key][data.name].indexOf(data.val) < 0){
              this[key][data.name].push(data.val);
            }else{
              var ind = this[key][data.name].indexOf(data.val);
              this[key][data.name].splice(ind, 1);
            }
          }else{
            if('object' === typeof(this[key])){
              var val = (data.name === 'value' && key == 'treatment_value')? (data.val) : data.val;
              this[key][data.name] = val;
            }
            if('string' === typeof(this[key])){
              this[key] = data.val;
            }
          }

          this.requre_save = true;
          var vm = this;

          Vue.nextTick(function(){
            vm.$forceUpdate();
          });
        }

       if(this.reminder){
        jQuery('.clear-reminder').removeClass('hidden');
       }else{
        jQuery('.clear-reminder').addClass('hidden');
       }
      },

      update_lead_stage: function(data, key){
        this.lead_data.lead_stage_prev = this.lead_data.lead_stage ;
        this.lead_data.lead_stage = data.val;
      },

      save_new_stage: function(){

        if(this.lead_data.lead_stage === this.lead_data.lead_stage_prev){
          this.show_confirmation_popup = false;
          return true;
        }

        var list_id_prev  = this.lead_data.lead_stage_prev;
        var list_id       = this.lead_data.lead_stage ;
        var user_name     = this.lead_data.user_name;
        var user_id       = this.lead_data.user_id;
        var post_id       = this.lead_data.lead_id;

        jQuery(document.body).trigger('update_lead_log', {
          post_id: post_id,
          list_id_prev: list_id_prev,
          list_id_new: list_id,
          user_name: user_name ,
          user_id:   user_id ,
          event: 'stage_changed'
        });

        jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

        this.show_confirmation_popup = false;
      },

      do_delete_or_return: function(url){
        this.deleting_lead = true;
        wait_block.show();

        if(parseInt(this.lead_data.lead_id) === -1){
          wait_block.hide();
          location.href = url;
        }else{
          var data = {
            action  : 'delete_lead',
            lead_id : parseInt(this.lead_data.lead_id),
            nonce   : jQuery('[name=lead_data]').val(),
            url     : url,
          };

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
             clog(xhr)
          },

          success: function(data, textStatus, xhr) {
            if('undefined' != typeof(data.redirect)){
              window.close();
              // location.href = data.redirect;
            }
          },

          error: function(xhr, textStatus, errorThrown) {
            clog(xhr);
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
        }
      },

      add_note: function(type){
        // console.log(is_manager);
        type = 'undefined' !== typeof(type)? type : 'enquery';

        if(!this.note_text && type == 'enquery'){
          alert('Please enter some text');
          return false;
        }else  if(!this.note_text_tco && type == 'tco'){
          alert('Please enter some text');
          return false;
        }

        this.requre_save = true;

        var date = new Date();

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

        var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

        var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + minutes;

        var new_note = {
          'date'       : date_formatted,
          'user_name'  : this.lead_data.user_name,
          'user_id'    : this.lead_data.user_id,
          'text'       : this.note_text,
          'is_manager' : is_manager,
          'done'       : 'no',
          'show'       : 1,
        };


        if(type == 'enquery'){
          this.notes.push(new_note);
          this.note_text = '';
          this.$refs.note_textarea.style.height = '';
          this.save_lead_meta('lead_notes', 'notes');
        }else if (type =='tco'){
          new_note.text = this.note_text_tco;
          this.notes_tco.push(new_note);
          this.note_text_tco = '';
          this.$refs.note_textarea_tco.style.height = '';
           this.save_lead_meta('lead_notes_tco', 'notes_tco');
        }


      },

      delete_note: function(key , type){
        type = 'undefined' !== typeof(type)? type : 'enquery';

       if(type == 'enquery'){
          key = this.notes.length - key - 1;
          this.notes[key].show = 0;
          this.save_lead_meta('lead_notes', 'notes');
        }
       if(type == 'tco'){
          key = this.notes_tco.length - key - 1;
          this.notes_tco[key].show = 0;
          this.save_lead_meta('lead_notes_tco', 'notes_tco');
        }
      },

      mark_note_done: function(key, val, type){
        type = 'undefined' !== typeof(type)? type : 'enquery';

        if(type == 'enquery'){
          key = this.notes.length - key - 1;
          this.notes[key].done = val;
          this.save_lead_meta('lead_notes', 'notes');
        }
      },

      update_specialists: function(event, type){
        if('undefined' !== typeof(event.val) ){

          if(this.lead_data.lead_id < 0){
            alert('Create lead before assigning it to a specialist, please');
            return false;
          };
          type = 'undefined' !== typeof(type)? type : 'enquery';

          if(type == 'enquery'){

            if(this.specialists_data[event.val].show === 'yes')
              {
                 return false;
              };

            this.specialists_data[event.val].show = 'yes';
            this.save_specialists_meta();
          }

          if(type == 'tco'){


            if(this.specialists_data[event.val].show_tco === 'yes')
              {
                 return false;
              };

            this.specialists_data[event.val].show_tco = 'yes';

               this.save_specialists_meta();
          }
        }
      },

      assign_specialist: function(){
        // this.selected_specialist = false;
        // this.save_sepcialists_meta();
      },

      remove_specialist: function(name){
        if(window.confirm("Confirm unassigning " + name + " from this lead")){
          this.specialists_data[name].show = 'no';
          this.specialists_data[name].show_tco = 'no';
          this.save_specialists_meta();

          // jQuery(document.body).trigger('update_lead_log', {
          //   post_id     : parseInt(this.lead_data.lead_id),
          //   nonce       : jQuery('[name=lead_data]').val(),
          //   user_name   : this.lead_data.user_name,
          //   user_id     : this.lead_data.user_id,
          //   event       : 'specialist_updated',
          //   text: 'Unassined from ' +  name + ' by ' + this.lead_data.user_name,
          // })
        }
      },

      save_specialists_meta: function(){
        var meta     = {};
        var meta_tco = {};

        for(id in this.specialists_data){
          meta[this.specialists_data[id].user_id] = this.specialists_data[id].show;
        }
        for(id in this.specialists_data){
          meta_tco[this.specialists_data[id].user_id] = this.specialists_data[id].show_tco;
        }

        var data = {
          meta: {
            lead_specialists: meta,
            lead_specialists_tco: meta_tco,
          },
          action                : 'update_lead_specialist_meta',
          lead_data             : this.lead_data,
          nonce                 : jQuery('[name=lead_data]').val(),
        };

        console.log(data);

        if(this.lead_data.lead_id < 0){
          alert(" Please save a lead before adding a specialist")
          return;
        }


        var vm = this;
        wait_block.show();

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {
             wait_block.hide();

             vm.$refs.lead_specialissts_select.set_value('selected', '')
          },

          success: function(data, textStatus, xhr) {
            console.log(data);

            if(data.post_id){
              vm.$refs.lead_id_input.set_value(data.post_id);
            }
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      },


      load_file: function(){
        // console.log('load_file');

        wait_block.show();

        var file_pierces = this.$refs.file_input.value.split('\\');
        var file_name = file_pierces[file_pierces.length-1];
        var file = jQuery(this.$refs.file_input).prop('files')[0];
        var fd   = new FormData();

        var vm = this;

        fd.append('file',file);
        fd.append('lead_id',this.lead_data.lead_id);
        fd.append('user_name',this.lead_data.user_name);
        fd.append('action', 'upload_new_document');
        fd.append('file_nonce',jQuery('[name=file_nonce]').val());
        fd.append('_wp_http_referer',jQuery('[name=_wp_http_referer]').val());

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          processData: false,
          contentType: false,
          data: fd,

          complete: function(xhr, textStatus) {
            single_lead.new_file = '';
            wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
            vm.files.push(data.file_data);
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
           }
        })
      },


      remove_file: function(file_id){
        var vm = this;

        if(window.confirm("Confirm deleting file " + this.files[file_id].name)){

          var file_data = vm.files[file_id];

          vm.files.splice(file_id, 1);

          var data = {
            file_data: file_data,
            lead_id: vm.lead_data.lead_id,
            user_name: vm.lead_data.user_name,
            action: 'delete_file_from_lead',
          };

          jQuery.ajax({
            url: WP_URLS.wp_ajax_url,
            type: 'POST',
            data: data,

            complete: function(xhr, textStatus) {

            },

            success: function(data, textStatus, xhr) {
              // console.log(data);
            },

            error: function(xhr, textStatus, errorThrown) {
              if(xhr.status === 418){
                var response_text = JSON.parse(xhr.responseText);
                alert(response_text.data[0]);
              }else{
                alert(xhr.status + ' ' +errorThrown);
              }
            }
          })
        }
      },

      file_changed: function(){
        var file_pierces = this.$refs.file_input.value.split('\\');
        var file_name = file_pierces[file_pierces.length-1];
        this.new_file = file_name;
      },

      change_phone: function(action){
        var phone = this.phones;

        if(action === 'add'){
          phone++;
        }

        if(action === 'remove'){
          phone--;
        }

        this.phones = Math.min(3, phone);

        var data = {
          lead_id: this.lead_data.lead_id,
          count: this.phones,
          action: 'save_phones_count',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
           },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },


      change_phone_tco: function(action){
        var vm= this;
        switch(action){
          case 'add':
           vm.phones_tco = 1;
           break;
          case 'remove':
           vm.phones_tco = 0;
           break;
        }

        var data = {
          lead_id: this.lead_data.lead_id,
          count: this.phones_tco,
          action: 'save_phones_count_tco',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
           },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },

      change_message_tco: function(action){
        var vm= this;
        switch(action){
          case 'add':
           vm.messages_tco = 1;
           break;
          case 'remove':
           vm.messages_tco = 0;
           break;
        }


        var data = {
          lead_id: this.lead_data.lead_id,
          count: this.messages_tco,
          action: 'save_messages_count_tco',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
           },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },


      clear_reminder: function(){
        this.reminder = '';
        jQuery('[name=reminder]').val('');
        jQuery('.clear-reminder').addClass('hidden');
      },

      change_message: function(action){
        var messages = this.messages;
        if(action === 'add'){
          messages++;
        }

        if(action === 'remove'){
          messages--;
        }

        this.messages = Math.min(3, messages);

        // console.log('change_message');

        var data = {
          lead_id: this.lead_data.lead_id,
          count:   this.messages,
          action:  'save_messages_count',
        }

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
          },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },


      /**
      * show single lead on click on a lead item on a list
      */
      show_single_lead: function(id){
        clog(id, 0 , 1);
      },

      close_tab: function(){
        window.close();
      },

      send_text_message: function(){
        var phone = this.patient_data.phone;
        var vm = this;



        if(!phone || phone.length < 4){
          alert('phone not set');
          return;
        }

        if(!this.message_to_client ){
          alert('Type a message, please');
          return;
        }

        if(!this.sms_data ){
          alert('Messaging center is not configured');
          return;
        }

        var data = {
          sms_data: this.sms_data,
          phone: phone,
          text: this.message_to_client,
        };


        jQuery.ajax({
          url: WP_URLS.theme_url+"/messaging/twilio_send.php",
          type: 'POST',
          dataType: 'json',
          data: data,
        })

        .done(function(e) {
          if(e.error){
            alert(e.error);
          }else{
            var date = new Date();
            var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() ;

            var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

            var ant = date.getHours() > 12 ? 'pm' : 'am';

            var date_sent = months[date.getMonth()] + ' ' + day+ ' '+date.getFullYear() + ' '+ hours+':' + date.getMinutes() + ant;


            vm.text_messages.push({
              'body'      :  vm.message_to_client,
              'date_sent' : date_sent,
              'type'      : 'we',
              'status'    : 'sent',
            });

            vm.save_lead_meta('text_messages', 'text_messages');

            vm.message_to_client = '';

            Vue.nextTick(function(){
              jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
            })
          }
        })

        .fail(function() {
        })

        .always(function(e) {
          console.log(e);
        });
      },


      update_text_messages: function(){
        if (this.deleting_lead){
          return;
        }
        var phone = this.patient_data.phone;
        var vm = this;

        var data = {
          sms_data: this.sms_data,
          phone: phone,
        };

        jQuery.ajax({
          url: WP_URLS.theme_url+"/messaging/twilio_update_msg.php",
          type: 'POST',
          dataType: 'json',
          data: data,
        })

        .done(function(e) {
          if(e.error){
            alert(e.error);
          }else{

            if (vm.deleting_lead){
              return;
            }

            vm.text_messages = e.messages;
            vm.save_lead_meta('text_messages', 'text_messages');
            vm.intial_load = false;

            if(vm.text_messages.length < e.messages.length){
              if(! vm.intial_load ){
                var message = e.messages[e.messages.length-1];
              }
            }

          }
        })

        .fail(function() {
        })

        .always(function(e) {
          jQuery('._messages').removeClass('hidden');
          jQuery('.preloader-messages').addClass('hidden');
        });
      }
    },
  })
}
// if(jQuery('#single-lead-in-list').length){

// var assigned_dentists = {};
// var assigned_treatments = {};
// var specialists_data    = specialists_data;
// var specialists         = specialists;
// var lead_notes  = {};
// var lead_notes_tco  = {};
// var lead_files   = {};
// var lead_logs    = {};
// var phone_count  = 0;
// var message_count  = 0;


// single_lead = new Vue({
//     el: '#single-lead-in-list',

//     data: {
//       run_update_lead: false,
//       base_lead : {},
//       text_save_del : 'delete',
//       text_save_btn : 'save',
//       patient_data: {
//         name: '',
//         phone: '',
//         clinic: '',
//         treatment: '',
//         source: '',
//       },

//       treatment_value: {
//         billed: 0,
//         value     : 0,
//         terms     : '',
//         mounthly  : '',
//         treatment : [] ,
//         date_end : '',
//       },

//       treatment_coordinator: {
//         specialist: [],
//         reason: '',
//         consultation_date: '',
//         follow: '',
//       },

//       treatment_data: [],

//       notes       : [],
//       notes_tco       : [],
//       files       : [],
//       enquery_notes_count: 1,
//       tco_notes_count: 1,
//       logs        : [],

//       lead_data   : {
//           lead_id : "",
//           lead_stage : "",
//           user_id : "",
//           user_name : "",
//       },

//       note_text   : '',
//       note_text_tco  : '',
//       reminder    : '',
//       new_file    : '',
//       phones      : 0,
//       messages    : 0,
//       requre_save : false,
//       save_text           : 'Save Changes',
//       specialists_data    : {},
//       selected_specialist : false,
//       lead_stage: '',
//       show_confirmation_popup: false,
//       balance: 0,
//       lead_class: '', // converted failed opened
//       lead_type: 'Opened Lead' // Failed Lead Converted Lead
//     },

//     computed:{

//       overdue: function(){
//         var overdue = false;

//         if(!this.reminder){
//           return overdue;
//         }
//         var date = new Date();
//         var date_reminder = new Date(this.reminder);
//         return date_reminder < date;
//       },

//       enquery_notes_c: function(){
//         var notes = this.notes;
//         var notes_c = [];
//         var counter = 0;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1 && counter < this.enquery_notes_count){
//               note.key =  notes.length -1 - id;
//               notes_c.push(note);
//               counter++;
//            }
//         }

//         return notes_c;
//       },

//       enquery_notes_count_c: function(){
//         var counter = 0;
//         var notes = this.notes;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1){
//               counter++;
//            }
//         }

//         return counter;
//       },

//       tco_notes_c: function(){
//         var notes = this.notes_tco;
//         var notes_c = [];
//         var counter = 0;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1 && counter < this.tco_notes_count){
//               note.key =  notes.length -1 - id;
//               notes_c.push(note);
//               counter++;
//            }
//         }

//         return notes_c;
//       },

//       tco_notes_count_c: function(){
//         var counter = 0;
//         var notes = this.notes_tco;

//         for (var id = notes.length -1; id >= 0;  id--) {
//           var note = notes[id];

//            if(note.show == 1){
//               counter++;
//            }
//         }

//         return counter;
//       },



//       messages_left : function(){
//         return Math.max(0, 3 - this.messages);
//       },

//       phones_left : function(){
//         return Math.max(0, 3 - parseInt(this.phones));
//       },

//       phones_count: function(){
//         return parseInt(this.phones);
//       },

//       messages_count: function(){
//         return parseInt(this.messages);
//       },

//       file_is_prepared: function(){
//         return this.new_file.length > 0
//       },

//       files_updated: function(){
//         return this.files;
//       },

//       is_requre_save: function(){
//         return this.requre_save;
//       },

//       get_logs: function(){
//         return this.logs;
//       },

//       show_add_specialist_button: function(){
//         return !!this.selected_specialist;
//       },

//       visible_specialists: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown;
//       },

//       visible_specialists_tco: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show_tco){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown;
//       },


//       visible_specialists_show_select: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown.length > 0 ? 'hidden': '';
//       },


//       visible_specialists_show_select_tco: function(){
//         var shown = [];

//         for(id in this.specialists_data){
//           if('yes' === this.specialists_data[id].show_tco){
//             shown.push(this.specialists_data[id]);
//           }
//         }

//         return shown.length > 0 ? 'hidden': '';
//       },


//       get_treatment_value: function(){
//         return this.treatment_value.value;
//       },

//       get_billed_value: function(){
//         return this.treatment_value.billed;
//       },

//       get_terms_count: function(){
//         $return = 1;
//         switch(this.treatment_value.terms){
//           case '12 Months':
//              $return = 12;
//             break;
//           case '18 Months':
//              $return = 18;
//             break;
//           case '24 Months':
//              $return = 24;
//             break;
//           case '36 Months':
//              $return = 36;
//             break;
//           case '48 Months':
//              $return = 48;
//             break;
//           default:
//              $return = 1;
//             break;
//         }

//         return  $return;
//       },

//       monthly_payment: function(){
//         var billed = get_sum_from_price(this.get_billed_value);
//         var summ = (get_sum_from_price(this.get_treatment_value) - get_sum_from_price(this.get_billed_value))/this.get_terms_count;
//         summ = summ.toFixed(2);
//         this.treatment_value.mounthly = summ;
//         return   '£'+ formatMoney(summ, 2, ".", ",");
//       },

//       c_dentists: function(){
//         var dentists = [];
//         for (s in this.treatment_coordinator.specialist){
//            if(this.treatment_coordinator.specialist[s])

//             dentists.push(this.treatment_coordinator.specialist[s]);
//         }

//         return dentists;
//       },

//       c_treatments: function(){
//         var treatments = [];
//         for (s in this.treatment_value.treatment){
//            if(this.treatment_value.treatment[s])

//             treatments.push(this.treatment_value.treatment[s]);
//         }

//         return treatments;
//       },
//     },


//     watch: {
//       treatment_data: function(val){
//       },

//       base_lead: function(){
//         var vm = this;

//         if(!vm.run_update_lead){
//           return;
//         }

//         var meta = [
//           'patient_data',
//           'treatment_value',
//           'treatment_coordinator',
//           // 'treatment_data',
//         ];

//         start_date = vm.base_lead.meta.start_date;

//         for(var id in meta) {
//           if('undefined' !== typeof(vm.base_lead) && 'undefined' !== typeof(vm.base_lead.meta[meta[id]]) && vm.base_lead.meta[meta[id]]){
//             vm[meta[id]] = vm.base_lead.meta[meta[id]];
//           }
//         }


//         vm.phones   = vm.base_lead.phone_count     || 0;
//         vm.messages = vm.base_lead.message_count   || 0;
//         vm.notes    = vm.base_lead.meta.lead_notes || [];
//         vm.notes_tco    = vm.base_lead.meta.lead_notes_tco || [];
//         vm.files    = vm.base_lead.meta.lead_files || [];
//         vm.reminder = vm.base_lead.meta.reminder   || '';
//         // specialists data

//         for(var id in this.specialists_data){
//           this.specialists_data[id].show  = vm.base_lead.meta['specialists_assigned'][this.specialists_data[id]['user_id']]
//           this.specialists_data[id].show_tco  = vm.base_lead.meta['specialists_assigned_tco'][this.specialists_data[id]['user_id']]
//         }

//         //lead type

//         if(vm.base_lead.is_converted === 'yes'){
//           this.lead_class = 'converted';
//           this.lead_type = 'Converted Lead';
//         }else if(vm.base_lead.is_failed === 'yes'){
//           this.lead_class = 'failed';
//           this.lead_type = 'Failed Lead';
//         }else{
//           this.lead_class = 'opened';
//           this.lead_type = 'Opened Lead';
//         }


//         this.lead_data = {
//           lead_id : vm.base_lead.ID,
//           lead_stage : vm.base_lead.meta.lead_stage,
//           user_id : theme_user_id,
//           user_name : theme_user_name,
//         };


//         var vm = this;

//        if(vm.base_lead.meta.treatment_data){
//           vm.treatment_data = vm.base_lead.meta.treatment_data;

//           Vue.nextTick(function(){

//             for(var num in vm.$refs['select_treatment']){
//                var props =  {
//                   icon: icons_selects['treatments'],
//                   isExpanded: '',
//                   isSelected: [],
//                   isHiddenSelect: true,
//                   isHiddenImitation: false,
//                   options: treatments,
//                   selected: vm.treatment_data[num].treatment
//                 };


//                 for( var t in props){
//                   vm.$refs['select_treatment'][num].set_value(t, props[t]);
//                 }
//                 vue_select_components.push(vm.$refs['select_treatment'][num]);
//             }


//             for(var num in vm.$refs['select_dentist']){
//                var props =  {
//                   icon: icons_selects['human'],
//                   isExpanded: '',
//                   isSelected: [],
//                   isHiddenSelect: true,
//                   isHiddenImitation: false,
//                   options: available_dentists,
//                   selected: vm.treatment_data[num].dentist
//                 };


//                 for( var t in props){
//                   vm.$refs['select_dentist'][num].set_value(t, props[t]);
//                 }
//                 vue_select_components.push(vm.$refs['select_dentist'][num]);
//             }

//             for(var num in vm.$refs['select_billed']){

//               var _value = '£' + formatMoney(vm.treatment_data[num].billed,2, '.',',');
//               var _value = vm.treatment_data[num].billed;
//               vm.$refs['select_billed'][num].set_value(_value);
//             }

//           });
//         }
//       },


//       note_text: function(){
//         this.$refs.note_textarea.style.height = '';
//         this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
//       },

//       note_text_tco: function(){
//         this.$refs.note_textarea_tco.style.height = '';
//         this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px';
//       },



//       'treatment_value.billed': function(val){

//         var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


//         this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

//         this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
//         this.balance = formatMoney(balance,2, '.',',');
//       },


//       'treatment_value.value': function(val){

//         var balance = get_sum_from_price(this.treatment_value.value) - get_sum_from_price(this.treatment_value.billed);


//         this.treatment_value.terms = get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 'Full Payment' :  '12 Months';

//         this.treatment_value.mounthly =  get_sum_from_price(this.treatment_value.value) === get_sum_from_price(this.treatment_value.billed)? 0 : balance/12;
//         this.balance = formatMoney(balance,2, '.',',');
//       },

//       'treatment_value.terms': function(val){

//         var count = 0;

//         switch(val){
//           case '12 Months' :
//             count = 12;
//             break;
//           case '18 Months' :
//             count = 18;
//             break;
//           case '24 Months' :
//             count = 24;
//             break;
//           case '36 Months' :
//             count = 36;
//             break;
//           case '48 Months' :
//             count = 48;
//             break;
//         }

//         if(count > 0){
//           var date = new Date(date_start);
//           date.setMonth(date.getMonth() + count);

//           var month = (date.getMonth() < 9)? "0" + (date.getMonth() + 1) : (date.getMonth() + 1) ;

//           var _date = date.getDate() < 10? '0' + date.getDate() : date.getDate();

//           var hours =  date.getHours() < 10? '0' + date.getHours() : date.getHours();

//           var minutes =  date.getMinutes() < 10? '0' + date.getMinutes() : date.getMinutes();

//           var date_end = date.getFullYear() + '-' + month  + '-' + _date + ' ' + hours + ':'+ minutes + ':'+ '00';

//           this.treatment_value.date_end = date_end;
//         }else{
//           this.treatment_value.date_end = date_start;
//         }

//         posted_data = {
//           date: this.treatment_value.date_end,
//           lead_id: this.lead_data.lead_id,
//           action: 'save_lead_end_date',
//         }

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: posted_data,

//           complete: function(xhr, textStatus) {
//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//           },

//           error: function(xhr, textStatus, errorThrown) {}
//         });
//       },

//       'patient_data.name': function(){
//         jQuery('input[name=name]').removeClass('error');
//       },

//       'patient_data.phone': function(){
//         jQuery('input[name=phone]').removeClass('error');
//       },

//       'patient_data.email': function(){
//         jQuery('input[name=email]').removeClass('error');
//       },

//       'patient_data.clinic': function(value){
//         if('undefined' !== this.$refs.clinic_select){
//           this.$refs.clinic_select.selected = value;
//         }
//       },

//       'patient_data.treatment': function(value){
//         if('undefined' !== this.$refs.treatments_select){
//           this.$refs.treatments_select.selected = value;
//         }
//       },

//       'patient_data.source': function(value){
//         if('undefined' !== this.$refs.source_select){
//           this.$refs.source_select.selected = value;
//         }
//       },

//       'patient_data.campaign': function(value){
//         if('undefined' !== this.$refs.campaign_select){
//           this.$refs.campaign_select.selected = value;
//         }
//       },

//       'lead_data.lead_stage': function(value){
//         if('undefined' !== this.$refs.lead_stage_select2){
//           this.$refs.lead_stage_select2.selected = value;
//         }
//       },
//     },

//     created: function(){},

//     mounted: function(){
//       // if(this.run_update_lead){
//         this.init();
//       // }
//     },

//     methods: {
//       init: function(){
//         this.phones            = phone_count;
//         this.messages          = message_count;
//         this.files             = lead_files;
//         this.logs              = lead_logs;
//         this.specialists_data  = specialists_data;
//         this.init_select();
//         this.treatment_data_selects();
//       },

//       update_treatment_data: function(e, key){
//         if(typeof(e.val)  !== 'undefined'){
//           this.treatment_data[key][e.name] = e.val;

//           var total = 0;

//           for(var id in this.treatment_data){
//             total += get_sum_from_price(this.treatment_data[id].billed);
//           }

//           this.treatment_value.value =  '£' + formatMoney(total,2, '.',',');
//         }
//       },

//       add_treatment_dentist: function(){

//         this.treatment_data.push({
//           'treatment': '',
//           'dentist': '',
//           'billed' : 0,
//         })

//         var vm = this;
//         Vue.nextTick(function(){

//          var select_id = vm.treatment_data.length - 1;

//          var props =  {
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             icon: icons_selects['human'],
//             options: available_dentists,
//           };

//           for( var id in props){
//             vm.$refs['select_dentist'][select_id].set_value(id, props[id]);
//           }


//           vue_select_components.push(vm.$refs['select_dentist'][select_id]);


//          var props =  {
//             icon: icons_selects['treatments'],
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             options: treatments,
//           };

//           for( var id in props){
//             vm.$refs['select_treatment'][select_id].set_value(id, props[id]);
//           }

//           vue_select_components.push(vm.$refs['select_treatment'][select_id]);
//         })
//       },

//       price_to_value: function(ref){
//         var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;

//         switch(ref){
//           case 'price_input_field':
//             var summ = (!!this.treatment_value.value)? this.treatment_value.value : 0;
//             break;
//           case 'input_billed':
//             var summ = (!!this.treatment_value.billed)? this.treatment_value.billed : 0;
//             break;
//         }
//         summ = get_sum_from_price(summ);
//         this.$refs[ref].set_value(summ);
//       },

//       update_dates: function(){
//         // console.log(this);
//       },

//       value_to_price: function(ref){
//         switch(ref){
//           case 'price_input_field':
//             var summ = '£' + formatMoney(this.treatment_value.value,2, '.',',');
//             break;
//           case 'input_billed':
//             var summ = '£' + formatMoney(this.treatment_value.billed,2, '.',',');
//             break;
//         }
//          this.$refs[ref].set_value(summ);
//       },


//       treatment_data_selects: function(){
//         var vm = this;

//         var total = 0;

//         for(var id in vm.treatment_data){

//          var select_id = id;

//          var props =  {
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             icon: icons_selects['human'],
//             options: available_dentists,
//           };

//           for( var i in props){
//             vm.$refs['select_dentist'][select_id].set_value(i, props[i]);
//           }


//          var props =  {
//             icon: icons_selects['treatments'],
//             isExpanded: '',
//             isSelected: [],
//             isHiddenSelect: true,
//             isHiddenImitation: false,
//             options: treatments,
//           };

//           for( var i in props){
//             vm.$refs['select_treatment'][select_id].set_value(i, props[i]);
//           }

//           var data = vm.treatment_data[id];
//           vm.$refs.select_dentist[id].set_value('selected', data['dentist']);
//           vm.$refs.select_treatment[id].set_value('selected', data['treatment']);
//           vm.$refs.select_billed[id].set_value( data['billed']);

//           total += get_sum_from_price(data['billed']);
//         }

//         vm.treatment_value.value = total;
//       },


//       init_select: function(){

//        var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//         };

//         if(jQuery(window).width()< 768){
//           props.isHiddenSelect = false;
//           props.isHiddenImitation =  true;
//         }

//         props.options = [
//           'Live Chat',
//           'Instagram',
//           'Slaine Instagram',
//           'Riz Instagram',
//           'Andy Instagram',
//           'Pete Instagram',
//           'Sonnie Instagram',
//           'Google PPC',
//           'Website',
//           'Phone',
//           "Walk In",
//           "Other"
//         ];

//         for( id in props){
//           this.$refs['source_select'].set_value(id, props[id]);
//         }

//         props.options = specialists;

//         for( id in props){
//           this.$refs['lead_specialissts_select'].set_value(id, props[id]);
//           this.$refs['lead_specialissts_select_tco'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['source_select']);
//         vue_select_components.push(this.$refs['lead_specialissts_select']);
//         vue_select_components.push(this.$refs['lead_specialissts_select_tco']);


//         var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: treatments,
//         };

//         for( id in props){
//           this.$refs['treatments_select'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['treatments_select']);
//         vue_select_components.push(this.$refs['treatments_select2']);

//         this.$refs['treatments_select'].resert_width();

//         var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: clinics,
//         };

//         for( id in props){
//           this.$refs['clinic_select'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['clinic_select']);

//         var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: campaigns,
//         };

//         for( id in props){
//           this.$refs['campaign_select'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['campaign_select']);


//        var props =  {
//           isExpanded: '',
//           isSelected: [],
//           isHiddenSelect: true,
//           isHiddenImitation: false,
//           options: stages,
//         };

//         for( id in props){
//           this.$refs['lead_stage_select2'].set_value(id, props[id]);
//         }

//         vue_select_components.push(this.$refs['lead_stage_select2']);
//       },

//       save_lead_meta: function(key_meta, key_this){
//         var vm = this;

//         var show = {};
//         var show_tco = {};

//         if(typeof(key_meta) !== 'string'){
//           var meta = {
//             patient_data          : this.patient_data,
//             treatment_data        : this.treatment_data,
//             treatment_value       : this.treatment_value,
//             treatment_coordinator : this.treatment_coordinator,
//             treatment_data        : this.treatment_data,
//             lead_notes            : this.notes,
//             lead_notes_tco        : this.notes_tco,
//             reminder              : this.reminder,
//           };
//         }else{
//           var  meta = {};
//           meta[key_meta] = this[key_this];
//         }

//         var posted_data = {
//           confirmed: 0,
//           meta: meta,
//           action                : 'update_lead_meta',
//           lead_data             : this.lead_data,
//           nonce                 : jQuery('[name=lead_data]').val(),
//         };

//         this.show_confirmation_popup = (this.lead_data.lead_id >=0 )? true : this.show_confirmation_popup ;


//         if(key_meta  === 'lead_notes' || key_meta  === 'lead_notes_tco' ){
//           this.show_confirmation_popup = false;
//         }

//         // console.log(this.lead_data);


//         if((!this.patient_data.name || !this.patient_data.phone || !this.patient_data.email) && this.lead_data.lead_id < 0){


//           if(!this.patient_data.phone){
//             jQuery('input[name=phone]').addClass('error');
//           }

//           if(!this.patient_data.name){
//             jQuery('input[name=name]').addClass('error');
//           }

//           if(!this.patient_data.email){
//             jQuery('input[name=email]').addClass('error');
//           }
//           return false;
//         }

//         var vm = this;

//         this.update_lead_in_list(editing_object);

//         wait_block.show();

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: posted_data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {

//             clog('saved');

//             if(data.reload){
//               location.href = data.url;
//               wait_block.show();
//             }
//             vm.$refs.lead_id_input.set_value(data.post_id);
//             jQuery('.button-create span').text('Save Changes');
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);

//               if(response_text.data[0] === 'name was found'){
//                 var confirm = window.confirm("Are you sure you want to add lead for " + vm.patient_data.name +'? Lead for patient with this name already exists');

//                 // console.log(confirm);

//                 if(confirm){
//                   posted_data.confirmed= 1;
//                   wait_block.show();
//                   vm.second_request(posted_data)
//                 }

//               }else{
//                 alert(response_text.data[0]);
//               }
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//       },


//       second_request: function(posted_data){
//         var vm = this;
//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: posted_data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//             vm.$refs.lead_id_input.set_value(data.post_id);
//             jQuery('.button-create span').text('Save Changes');
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               // console.log(xhr);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//       },

//       update_lead: function(data, key){


//         if('object' === typeof(data)){
//           if(key === 'treatment_coordinator' && data.name === 'specialist' ){
//             if('undefined' === typeof(this[key][data.name])){
//               this[key][data.name] = []
//             }

//             if(this[key][data.name].indexOf(data.val) < 0){
//               this[key][data.name].push(data.val);
//             }else{
//               var ind = this[key][data.name].indexOf(data.val);
//               this[key][data.name].splice(ind, 1);
//             }

//           }else if(key === 'treatment_value' && data.name === 'treatment' ){
//             if('undefined' === typeof(this[key][data.name])){
//               this[key][data.name] = []
//             }

//             if(this[key][data.name].indexOf(data.val) < 0){
//               this[key][data.name].push(data.val);
//             }else{
//               var ind = this[key][data.name].indexOf(data.val);
//               this[key][data.name].splice(ind, 1);
//             }
//           }else{
//             if('object' === typeof(this[key])){
//               var val = (data.name === 'value' && key == 'treatment_value')? (data.val) : data.val;
//               this[key][data.name] = val;
//             }
//             if('string' === typeof(this[key])){
//               this[key] = data.val;
//             }
//           }

//           this.requre_save = true;
//           var vm = this;

//           Vue.nextTick(function(){
//             vm.$forceUpdate();
//           });
//         }

//        // if(this.reminder){
//        //  jQuery('.clear-reminder').removeClass('hidden');
//        // }else{
//        //  jQuery('.clear-reminder').addClass('hidden');
//        // }
//       },

//       update_lead_stage: function(data, key){
//         this.lead_data.lead_stage_prev = this.lead_data.lead_stage ;
//         this.lead_data.lead_stage = data.val;
//       },

//       save_new_stage: function(){

//         if(this.lead_data.lead_stage === this.lead_data.lead_stage_prev){
//           this.show_confirmation_popup = false;
//           return true;
//         }

//         var list_id_prev  = this.lead_data.lead_stage_prev;
//         var list_id       = this.lead_data.lead_stage ;
//         var user_name     = this.lead_data.user_name;
//         var user_id       = this.lead_data.user_id;
//         var post_id       = this.lead_data.lead_id;

//         this.update_lead_in_list(editing_object);

//         jQuery(document.body).trigger('update_lead_log', {
//           post_id: post_id,
//           list_id_prev: list_id_prev,
//           list_id_new: list_id,
//           user_name: user_name ,
//           user_id:   user_id ,
//           event: 'stage_changed'
//         });

//         jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

//         this.show_confirmation_popup = false;
//       },

//       do_delete_or_return: function(url){


//         if(parseInt(this.lead_data.lead_id) < 0){
//           wait_block.hide();
//           location.href = url;
//         }else{
//           var data = {
//             action  : 'delete_lead',
//             lead_id : parseInt(this.lead_data.lead_id),
//             nonce   : jQuery('[name=lead_data]').val(),
//             url     : url,
//           };

//         var vm = this;

//         if(!confirm('Are you sure you want to delete this lead?')){
//           return;
//         }

//         wait_block.show();

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//               for(var id in dashboard_leads_data){
//                 if(dashboard_leads_data[id].ID == editing_object){
//                   var index = dashboard_leads_data.indexOf(dashboard_leads_data[id]);

//                   dashboard_leads_data.splice(index, 1);

//                   vue_leads_list.init();
//                   console.log('init finished');
//                   break;
//                 }
//               }
//              vm.return_to_list();
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//         }
//       },

//       add_note: function(type){
//         // console.log(is_manager);
//         type = 'undefined' !== typeof(type)? type : 'enquery';

//         if(!this.note_text && type == 'enquery'){
//           alert('Please enter some text');
//           return false;
//         }else  if(!this.note_text_tco && type == 'tco'){
//           alert('Please enter some text');
//           return false;
//         }

//         this.requre_save = true;

//         var date = new Date();

//         var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

//         var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

//         var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + minutes;

//         var new_note = {
//           'date'       : date_formatted,
//           'user_name'  : this.lead_data.user_name,
//           'user_id'    : this.lead_data.user_id,
//           'text'       : this.note_text,
//           'is_manager' : is_manager,
//           'done'       : 'no',
//           'show'       : 1,
//         };


//         if(type == 'enquery'){
//           this.notes.push(new_note);
//           this.note_text = '';
//           this.$refs.note_textarea.style.height = '';
//           this.save_lead_meta('lead_notes', 'notes');
//         }else if (type =='tco'){
//           new_note.text = this.note_text_tco;
//           this.notes_tco.push(new_note);
//           this.note_text_tco = '';
//           this.$refs.note_textarea_tco.style.height = '';
//           this.save_lead_meta('lead_notes_tco', 'notes_tco');
//         }


//       },

//       delete_note: function(key , type){
//         type = 'undefined' !== typeof(type)? type : 'enquery';

//        if(type == 'enquery'){
//           key = this.notes.length - key - 1;
//           this.notes[key].show = 0;
//           this.save_lead_meta('lead_notes', 'notes');
//         }
//        if(type == 'tco'){
//           key = this.notes_tco.length - key - 1;
//           this.notes_tco[key].show = 0;
//           this.save_lead_meta('lead_notes_tco', 'notes_tco');
//         }
//       },

//       mark_note_done: function(key, val, type){
//         type = 'undefined' !== typeof(type)? type : 'enquery';

//         if(type == 'enquery'){
//           key = this.notes.length - key - 1;
//           this.notes[key].done = val;
//           this.save_lead_meta('lead_notes', 'notes');
//         }
//       },

//       update_specialists: function(event, type){
//         if('undefined' !== typeof(event.val) ){

//           if(this.lead_data.lead_id < 0){
//             alert('Create lead before assigning it to a specialist, please');
//             return false;
//           };
//           type = 'undefined' !== typeof(type)? type : 'enquery';

//           if(type == 'enquery'){


//             if(this.specialists_data[event.val].show === 'yes')
//               {
//                  return false;
//               };

//             this.specialists_data[event.val].show = 'yes';
//             this.save_specialists_meta();
//           }

//           if(type == 'tco'){


//             if(this.specialists_data[event.val].show_tco === 'yes')
//               {
//                  return false;
//               };

//             this.specialists_data[event.val].show_tco = 'yes';

//                this.save_specialists_meta();
//           }
//         }
//       },

//       assign_specialist: function(){
//         // this.selected_specialist = false;
//         // this.save_sepcialists_meta();
//       },

//       remove_specialist: function(name){
//         if(window.confirm("Confirm unassigning " + name + " from this lead")){
//           this.specialists_data[name].show = 'no';
//           this.specialists_data[name].show_tco = 'no';
//           this.save_specialists_meta();
//         }
//       },

//       save_specialists_meta: function(){
//         var meta     = {};
//         var meta_tco = {};

//         for(id in specialists_data){
//           meta[specialists_data[id].user_id] = specialists_data[id].show;
//         }
//         for(id in specialists_data){
//           meta_tco[specialists_data[id].user_id] = specialists_data[id].show_tco;
//         }



//         var data = {
//           meta: {
//             lead_specialists: meta,
//             lead_specialists_tco: meta_tco,
//           },
//           action                : 'update_lead_meta',
//           lead_data             : this.lead_data,
//           nonce                 : jQuery('[name=lead_data]').val(),
//         };

//        wait_block.show();


//         var vm = this;

//         this.update_lead_in_list(editing_object);

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {
//              wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//             console.log('saved');
//             vm.$refs.lead_id_input.set_value(data.post_id);
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//           }
//         })
//       },


//       load_file: function(){
//         // console.log('load_file');

//         wait_block.show();

//         var file_pierces = this.$refs.file_input.value.split('\\');
//         var file_name = file_pierces[file_pierces.length-1];
//         var file = jQuery(this.$refs.file_input).prop('files')[0];
//         var fd   = new FormData();

//         var vm = this;

//         fd.append('file',file);
//         fd.append('lead_id',this.lead_data.lead_id);
//         fd.append('user_name',this.lead_data.user_name);
//         fd.append('action', 'upload_new_document');
//         fd.append('file_nonce',jQuery('[name=file_nonce]').val());
//         fd.append('_wp_http_referer',jQuery('[name=_wp_http_referer]').val());

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           processData: false,
//           contentType: false,
//           data: fd,

//           complete: function(xhr, textStatus) {
//             single_lead.new_file = '';
//             wait_block.hide();
//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//             vm.files.push(data.file_data);
//           },

//           error: function(xhr, textStatus, errorThrown) {
//             if(xhr.status === 418){
//               var response_text = JSON.parse(xhr.responseText);
//               alert(response_text.data[0]);
//             }else{
//               alert(xhr.status + ' ' +errorThrown);
//             }
//            }
//         })
//       },


//       remove_file: function(file_id){
//         var vm = this;

//         if(window.confirm("Confirm deleting file " + this.files[file_id].name)){

//           var file_data = vm.files[file_id];

//           vm.files.splice(file_id, 1);

//           var data = {
//             file_data: file_data,
//             lead_id: vm.lead_data.lead_id,
//             user_name: vm.lead_data.user_name,
//             action: 'delete_file_from_lead',
//           };

//           jQuery.ajax({
//             url: WP_URLS.wp_ajax_url,
//             type: 'POST',
//             data: data,

//             complete: function(xhr, textStatus) {

//             },

//             success: function(data, textStatus, xhr) {
//               // console.log(data);
//             },

//             error: function(xhr, textStatus, errorThrown) {
//               if(xhr.status === 418){
//                 var response_text = JSON.parse(xhr.responseText);
//                 alert(response_text.data[0]);
//               }else{
//                 alert(xhr.status + ' ' +errorThrown);
//               }
//             }
//           })
//         }
//       },

//       file_changed: function(){
//         var file_pierces = this.$refs.file_input.value.split('\\');
//         var file_name = file_pierces[file_pierces.length-1];
//         this.new_file = file_name;
//       },

//       change_phone: function(action){
//         var phone = this.phones;

//         if(action === 'add'){
//           phone++;
//         }

//         if(action === 'remove'){
//           phone--;
//         }

//         this.phones = Math.min(3, phone);

//         var data = {
//           lead_id: this.lead_data.lead_id,
//           count: this.phones,
//           action: 'save_phones_count',
//         }

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {

//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//            },

//           error: function(xhr, textStatus, errorThrown) {

//           }
//         })

//         // console.log('change_phone');
//       },

//       clear_reminder: function(){
//         this.reminder = '';
//         jQuery('[name=reminder]').val('');
//         jQuery('.clear-reminder').addClass('hidden');
//       },

//       change_message: function(action){
//         var messages = this.messages;
//         if(action === 'add'){
//           messages++;
//         }

//         if(action === 'remove'){
//           messages--;
//         }

//         this.messages = Math.min(3, messages);

//         // console.log('change_message');

//         var data = {
//           lead_id: this.lead_data.lead_id,
//           count:   this.messages,
//           action:  'save_messages_count',
//         }

//         jQuery.ajax({
//           url: WP_URLS.wp_ajax_url,
//           type: 'POST',
//           data: data,

//           complete: function(xhr, textStatus) {

//           },

//           success: function(data, textStatus, xhr) {
//             // console.log(data);
//           },

//           error: function(xhr, textStatus, errorThrown) {

//           }
//         })
//       },


//       /**
//       * show single lead on click on a lead item on a list
//       */
//       show_single_lead: function(id){
//         console.log('cliked');
//         clog(id, 0 , 1);
//       },

//       return_to_list: function(){
//         var data =  {
//           base_lead : {},
//           text_save_del : 'delete',
//           text_save_btn : 'save',
//           patient_data: {
//             name: '',
//             phone: '',
//             clinic: '',
//             treatment: '',
//             source: '',
//           },

//           treatment_value: {
//             billed: 0,
//             value     : 0,
//             terms     : '',
//             mounthly  : '',
//             treatment : [] ,
//             date_end : '',
//           },

//           treatment_coordinator: {
//             specialist: [],
//             reason: '',
//             consultation_date: '',
//             follow: '',
//           },

//           treatment_data: [],

//           notes       : [],
//           notes_tco       : [],
//           files       : [],
//           enquery_notes_count: 1,
//           tco_notes_count: 1,
//           logs        : [],

//           lead_data   : {
//               lead_id : "",
//               lead_stage : "",
//               user_id : "",
//               user_name : "",
//           },

//           note_text   : '',
//           note_text_tco  : '',
//           reminder    : '',
//           new_file    : '',
//           phones      : 0,
//           messages    : 0,
//           requre_save : false,
//           save_text           : 'Save Changes',
//           specialists_data    : {},
//           selected_specialist : false,
//           lead_stage: '',
//           show_confirmation_popup: false,
//           balance: 0,
//           lead_class: '', // converted failed opened
//           lead_type: 'Opened Lead' // Failed Lead Converted Lead
//         };

//         for(var j in data){
//           this[j] = data[j];
//         }

//         this.run_update_lead = false;
//         vue_leads_list.show = true;
//       },

//       update_lead_in_list: function(lead_id){

//         for(var id in dashboard_leads_data){
//           if(dashboard_leads_data[id].ID == lead_id){
//             console.log(dashboard_leads_data[id]);

//             dashboard_leads_data[id].meta.patient_data = this.patient_data;
//             dashboard_leads_data[id].meta.treatment_coordinator = this.treatment_coordinator;
//             dashboard_leads_data[id].meta.treatment_coordinator = this.treatment_coordinator;
//             dashboard_leads_data[id].meta.treatment_data = this.treatment_data;
//             dashboard_leads_data[id].meta.treatment_value = this.treatment_value;
//             dashboard_leads_data[id].message_count         = this.messages;
//             dashboard_leads_data[id].phone_count           = this.phones;
//             dashboard_leads_data[id].meta.lead_files       = this.files;
//             dashboard_leads_data[id].meta.lead_notes       = this.notes;
//             dashboard_leads_data[id].meta.lead_notes_tco   = this.notes_tco;
//             dashboard_leads_data[id].meta.reminder       = this.reminder;



//             dashboard_leads_data[id].lead_stage        = this.lead_data.lead_stage;
//             dashboard_leads_data[id].meta.lead_stage       = this.lead_data.lead_stage;

//              dashboard_leads_data[id].is_failed =  dashboard_leads_data[id].meta.lead_stage === failed_stage_name? 'yes' : 'no';

//              dashboard_leads_data[id].is_converted =  converted_stages.indexOf(dashboard_leads_data[id].meta.lead_stage) >=0 ? 'yes' : 'no';



//             var date = new Date();
//             var month = (date.getMonth() + 1) < 10? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);

//             var day = date.getDate() < 10? '0' + date.getDate() : date.getDate();
//             dashboard_leads_data[id].post_modified =
//               date.getFullYear() + '-' +
//               month + '-' +
//               day+ ' ' +
//               date.getHours() + ':' +
//               date.getMinutes() + ':' +
//               date.getSeconds();


//               var show = {};
//               var show_tco = {};

//               for (var j in  this.specialists_data){
//                 show[this.specialists_data[j].user_id ] = 'yes' === this.specialists_data[j].show ? 'yes' : 'no';
//                 show_tco[this.specialists_data[j].user_id ] = 'yes' === this.specialists_data[j].show_tco ? 'yes' : 'no';
//               }

//               dashboard_leads_data[id].meta.specialists_assigned = show;
//               dashboard_leads_data[id].meta.specialists_assigned_tco = show_tco;
//               break;
//           }
//         }


//         vue_leads_list.init();
//       },
//     },

// });

// }
if(typeof(is_lead_list_2) !== 'undefined' || typeof(is_lead_list) !== 'undefined' || typeof(is_dashboard) !== 'undefined' || typeof(is_single_lead) !== 'undefined' ){

  var search_field_header = new Vue({
    el: '#search-form',

    data: {
      search_value: '',
    },

    computed:{
      isVisuallyHidden: function(){
        return typeof(is_lead_list) === 'undefined' &&  typeof(is_lead_list_2) === 'undefined';
      },

      classes: function(){
        return typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list ?
        'order-2 order-md-0 col-md-2 col-lg-4' : 'search-single col-md-2 col-lg-4'
      },

      show_search: function(){
        return (typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list) || (typeof(is_lead_list_2)!== 'undefined') ? true: false;
      }
    },

    watch: {
      search_value: function(val){

        if(typeof(is_lead_list)!== 'undefined'){
          if(val.length >= 3){
            vue_leads_list.run_search(val);
          }else{
            vue_leads_list.run_search('');
          }
        }

        if(typeof(is_lead_list_2) !== 'undefined'){
          if(val.length >= 3){
            list_app.run_search(val);
          }else{
            list_app.run_search('');
          }
        }
      }
    },

    mounted:function(){
      this.$el.classList.remove('visuallyhidden')
    },

    methods:{
      run_search: function(search){
        this.search = search;
      },

      run_search_ajax: function(search){
        var vm = this;

        if(typeof(is_lead_list_2) == 'undefined'){
          return;
        }

        if(vm.search_value.length < 3){
          alert('please enter at least 3 characters ');
          return;
        }

        wait_block.show();

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          dataType: 'json',
          data: {search: vm.search_value, action: 'do_ajax_search'},
        })
        .done(function(data) {
          list_app.add_leads(data.leads);
        })
        .fail(function() {
        })
        .always(function(e) {
          wait_block.hide();
        });
      },

      close: function(){
        setTimeout(function(){
          window.close();
        },100);
      }
    }
  });
}
wait_block = new Vue({
  el: '#wait-block',

  data: {
    class: '',
    text: '',
  },

  computed:{
    show_class: function(){
      return this.class;
    },

    wait_text: function(){
      return this.text;
    },
  },

  mounted: function(){
  },

  methods: {
    show: function(){
      this.text = 'Please wait';
      this.class = 'shown';
    },

    hide: function(text){
      this.text = '';
       this.class = '';
    }
  }
});
if(jQuery('#debug').length){
  debug_vue = new Vue({
    el: '#debug',
    data: {
      content: [],
    },

    computed: {},

    watch: {},

    mounted: function(){
      console.log('debug enabled');
      this.content.push('debug active');
       var vm = this;

        Vue.nextTick(function(){
          vm.$forceUpdate();
        });
    },

    methods:{
      log: function(content, label){
        if('undefined' !== typeof(content) || !content){
          return false;
        }

        if('undefined' !== typeof(label)){
          this.content.push(label +' : ');
        }

        this.content.push(content);
      },

      clear: function(){
        this.content = [];
      },
    }
  });
}
var list_app,
    wait_block2
;

var vue_select_components = [];

/***********************

***********************/

var months_short = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

var icons_selects = {
  'clinics': '<svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>',

  'treatments': '<svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>',

  'campaigns': '<svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>',

  'sources': '<svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>',

  'team': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',

  'dentists': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',

  'human': '<svg class="icon svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>',

  'card': '<svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>',

  'currency': '<span class="currency-in-select">£</span>',

  'sortby': '<span class="icon-sortby"> <svg xmlns:dc="http://purl.org/dc/elements/1.1/"xmlns:cc="http://creativecommons.org/ns#"xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"xmlns:svg="http://www.w3.org/2000/svg"xmlns="http://www.w3.org/2000/svg"xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"width="105.73048mm"height="60.448288mm"viewBox="0 0 374.63554 214.18685"id="svg2"version="1.1"inkscape:version="0.91 r13725"sodipodi:docname="desc.svg"> <defs id="defs4" /> <sodipodi:namedview id="base"pagecolor="#ffffff"bordercolor="#666666"borderopacity="1.0"inkscape:pageopacity="0.0"inkscape:pageshadow="2"inkscape:zoom="0.35"inkscape:cx="533.25919"inkscape:cy="533.92856"inkscape:document-units="px"inkscape:current-layer="layer1"showgrid="false"fit-margin-top="0"fit-margin-left="0"fit-margin-right="0"fit-margin-bottom="0"inkscape:window-width="1920"inkscape:window-height="976"inkscape:window-x="-8"inkscape:window-y="1072"inkscape:window-maximized="1" /> <metadata id="metadata7"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <g inkscape:label="Layer 1"inkscape:groupmode="layer"id="layer1"transform="translate(672.54491,-854.96105)"> <path style="fill:#838993"d="m -553.75621,1065.0846 c -7.99146,-7.3236 -6.87414,-19.1169 2.34368,-24.7373 3.83487,-2.3383 6.73931,-2.4401 69.62681,-2.4401 63.62166,0 65.75131,0.077 69.76273,2.5227 8.72665,5.3205 9.74037,16.9649 2.13868,24.5666 l -4.15141,4.1514 -67.64336,0 -67.64335,0 -4.43378,-4.0633 z"id="path4155"inkscape:connector-curvature="0" /> <path style="fill:#838993"d="m -599.26031,978.37748 c -4.88353,-2.6376 -7.56658,-8.71232 -7.05942,-15.98332 0.24135,-3.46003 1.21848,-7.06332 2.33486,-8.61003 4.51521,-6.25572 0.74969,-6.06481 119.62458,-6.06481 105.75005,0 111.35628,0.11175 114.63782,2.28409 3.74051,2.47623 7.15104,9.03755 7.15104,13.7575 0,4.43576 -2.86871,11.02393 -5.91003,13.57271 -2.55732,2.14316 -8.54166,2.275 -115.10261,2.53566 -94.99093,0.23238 -112.91182,10e-4 -115.67624,-1.4918 z"id="path4151"inkscape:connector-curvature="0" /> <path style="fill:#838993"d="m -665.69569,883.60895 c -7.01294,-5.51638 -8.83062,-13.77749 -4.56921,-20.76644 5.15136,-8.4485 -8.3984,-7.87319 185.42869,-7.87319 l 175.50221,0 4.24736,2.85325 c 4.99679,3.3567 8.22065,11.0967 6.86752,16.48795 -0.49088,1.95589 -2.77187,5.4355 -5.06884,7.73248 l -4.17633,4.17632 -177.45643,0 -177.45642,0 -3.31855,-2.61037 z"id="path4147"inkscape:connector-curvature="0" /> </g> </svg> </span>',
};
var select_mixin2 = {
  data: function () {
    return {
      select_name : this._select_name,
      options: '',
      selected:this._selected,
      isExpanded: this._isExpanded,
      isSelected: this._isSelected ? this._isSelected: [],
      isHiddenSelect: true,
      isHiddenImitation: false,
    }
  },

  props:{
    _select_name : String,
    _options: Array,
    _selected: String,
    _isExpanded: String,
    _isSelected: Array,
    _isHiddenSelect: Boolean,
    _isHiddenImitation: Boolean,
  },

  beforeMount:function(){
    this.options = this._options;

    if(this._options){
      var options = strip(this._options);
      switch(typeof(options)){
        case 'object':
          options = Object.values(options);
          this.options = options.filter(function(el){
            return !!el && el != '--Select--' ;
          });
          break
        case 'array':
          this.options = options.filter(function(el){
            return !!el && el != '--Select--';
          });
          break;
        default:
          this.options = options;
          break;
      }
    }

  },

  mounted: function(){
  },

  change: function(){
    this.options = this._options;
  },

  watch:{
    selected: function(){
      this.$el.classList.remove('error');
    },

    _selected: function(val){
      this.selected = val;
    },

    _options: function(val){
      this.options = val;
    },
  },

  mounted:function(){
    this.change_width();
  },

  directives: {
    'click-outside': {
      bind (el,binding, vnode) {
        const outsideClickEventHandler = event => {
          if(!el.contains(event.target) && el !== event.target){
            binding.value(event);
          }
        }

        el.__outsideClickEventHandler__ = outsideClickEventHandler;
        document.addEventListener("click", outsideClickEventHandler);
      },

      unbind(el) {
        document.removeEventListener("click", el.__outsideClickEventHandler__);
      },
    }
  },

  methods: {
    change: function(){
      this.$emit('update_list', {val: this.selected, name: this.select_name});
    },

    // toggles state of expanded list initation
    expand_select: function(){
      this.isExpanded = 'expanded';
    },

    // toggles select in expanded dropdown
    update_selected_option: function(){
      for(var id in this.options){
        this.isSelected[this.options[id]] = false;
      }

      this.isSelected[this.selected] = true;
    },

    // changes data on option click
    imitate_select_option: function(value){
      this.selected = value;
      this.isExpanded = '';
      this.update_selected_option();
      this.change();
    },

     // closes select
    discard_select:function(){
      this.isExpanded = '';
    },

     // updates options of a select
    update_options: function(options){
      this.options = options;
      this.selected = options[0];
      this.isExpanded = '';
      this.update_selected_option();
    },

    // sets value for a select
    set_value: function(key, value){
      this[key] = value;
      this.$emit('update_list', { val :this.selected, name: this.select_name});

      if(key === 'options'){
        this.change_width();
      }
    },

    change_width:function(){
      var vm = this;
      var select = vm.$el.getElementsByClassName( 'select-imitation__dropdown' )[0].getElementsByClassName( 'select-imitation__list' )[0];

      vm.$el.setAttribute("style", "width: auto");

      Vue.nextTick(function() {
        var width = 0;
        var options = select.getElementsByClassName('element');

        for( var option of options){
          width = Math.max(width, option.offsetWidth);
        }

        width += 90;
        width = Math.max(width, select.offsetWidth);

        var _width = (window.outerWidth < 768)? window.outerWidth - 30 : width;
        vm.$el.setAttribute("style", "width:" + (_width) + 'px');
      });
    },

    resert_width: function(){
      var vm = this;
      vm.$el.setAttribute("style", "width: auto");
    },

    // gets value of a select
    get_value: function(){
      return this.selected;
    },

    // gets name of a select
    get_name: function(){
      return this.select_name;
    },


  },
}
var animation_mixin = {
  methods:{
   animation_beforeEnter: function (el) {
      el.style.opacity = 0
    },

    animation_enter: function (el, done) {
      const width = getComputedStyle(el).width;

      el.style.width = width;
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.height = 'auto';

      const height = getComputedStyle(el).height;

      el.style.width = null;
      el.style.position = null;
      el.style.visibility = null;
      el.style.height = 0;

      getComputedStyle(el).height;

      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: height },
          { complete: done }
        )
      }, delay)
    },

    animation_leave: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    },

    animation_enterAfter: function(el){
      el.style.height = 'auto';

      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    },

    animation_leaveAfter: function(el){
      if(typeof(this.update_scroll)!=='undefined'){
        this.update_scroll();
      }
    }
  }
}
var get_set_props = {
  methods: {
    /**
    * update prop
    *
    * @param id - string, name of parameter from data object of this component
    * @param value  - mixed, value to store
    *
    * @return void;
    */
    update_prop: function(id, value){
      this[id] = value;
    },
    /**
    * update prop
    *
    * @param id - string, name of parameter from data object of this component
    * @param value  - mixed, value to store
    *
    * @return void;
    */
    set_prop: function(id, value){
      this[id] = value;
    },

    /**
    * get prop value
    *
    * @param id - string, name of parameter from data object of this component
    *
    * @return mixed - value of propery or 'not found';
    */
    get_prop: function(id){
      return typeof(this[id]) != 'undefined'? this[id] : 'not found';
    },
  },
}
Vue.component('select-imitation2', {

  mixins: [select_mixin2],

  beforeMount:function(){
    this.options = this._options;
  },

  watch:{
    _options: function(val){
      this.options = val;
    },
  },

  template: '<div class="select-imitation" v-click-outside="discard_select"  v-bind:class="{ expanded: isExpanded}" > <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="data in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span  class="element">{{data}}</span> </li> </ul> </div> </div>',
})
Vue.component('select-imitation-obj', {

  props:{
    _options: Object,
  },

  computed:{
    is_selected: function(){
      if('undefined' != typeof(this.options[this.selected]) ){
        return this.options[this.selected].name;
      }else{
        return '';
      }
    },
  },

  methods:{
    change: function(){
      this.$emit('update_list', {val: this.options[this.selected], name: this.select_name});
    },


    update_selected_option: function(){
      for(var id in this.options){
        this.isSelected[id] = false;
      }

      this.isSelected[this.selected] = true;
    },
  },

  mixins: [select_mixin],

  template: '<div class="select-imitation" v-click-outside="discard_select"  v-bind:class="{ expanded: isExpanded}" > <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="(data, key) in options" v-bind:value="key">{{data.name}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{is_selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li v-for="(data, key) in options" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(key)"> <span  class="element">{{data.name}}</span> </li> </ul> </div> </div>',
})
Vue.component('select-imitation-icon-2', {
  mixins: [select_mixin2],

  data: function () {
    return {
      icon : this._icon,
    }
  },

  beforeMount:function(){
    this.options = this._options;
    this.icon = this._icon;
  },

  watch:{
    _icon: function(val){
      this.icon = val;
    },
  },

  props:{
    _icon: String,
  },

  template: '<div class="select-imitation has-icon select-imitation_shift-bottom"  v-click-outside="discard_select" v-bind:class="{ expanded: isExpanded}" > <span v-html="icon"></span> <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="data in options" v-bind:value="data">{{data}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li class="select-imitation__item" v-for="data in options" v-if="data" v-bind:class="{selected: isSelected[data]}"  v-on:click="imitate_select_option(data)"> <span class="element">{{data}}</span> </li> </ul> </div> </div>',
})
Vue.component('order-status-select', {
  mixins: [select_mixin],

  data: function () {
    return {
      color : '#eee',
    }
  },

  props: {
    _options: Object,
    '_current_status' : String
  },

  watch: {
    _current_status: function(val){
      this.selected = order_statuses[val].title;
      this.color    = order_statuses[val].color;
    }
  },

  beforeMount: function(){
    this.selected = ('undefined' != typeof(this._current_status) && this._current_status)?order_statuses[this._current_status].title : '';
    this.color = ('undefined' != typeof(this._current_status) && this._current_status)?order_statuses[this._current_status].color : '';
  },

  mounted: function(){
    this.change_width();
  },

  methods:{
    imitate_select: function(title, color){
      this.selected = title;
      this.color    = color;
      this.isExpanded = '';
      this.update_selected_option();
      this.change();
    }
  },

  template: '<div class="select-imitation has-icon"  v-click-outside="discard_select" v-bind:class="{ expanded: isExpanded}" > <span class="marker-select" v-bind:style="{backgroundColor: color}"></span> <select v-model="selected" v-on:change="change" v-bind:class="{ hidden: isHiddenSelect}"> <option v-for="(data, key) in options" v-bind:value="key">{{data.title}}</option> </select> <span class="select-imitation__view " v-on:click="expand_select"  v-bind:class="{ hidden: isHiddenImitation}">{{selected}}</span> <span class="select-imitation__arrow" onclick="imitate_select_expand(this)"></span> <div class="select-imitation__dropdown"> <ul class="select-imitation__list"> <li class="select-imitation__item with-marker" v-for="(data, key) in options" v-bind:class="{selected: isSelected[data.title]}"  v-on:click="imitate_select(data.title, data.color)"> <span class="marker" v-bind:style="{backgroundColor: data.color}"></span> <span class="element">{{data.title}}</span> </li> </ul> </div> </div>',
})
Vue.component('user-select', {
  data: function () {
    return {
      names: '',
      current_user: '',
      gravatar: '',
      user_names: [],
      editing: false,
      all_creators: all_creators,
      all_users: all_users,
    }
  },

  props:['_current_user', '_select_name'],

  beforeMount: function(){

    var vm = this;
    vm.current_user = vm._current_user;
    vm.gravatar = this.get_gravatar();

    switch(this._select_name){
      case 'creator':
        for( var user of this.all_creators){
          this.user_names.push(user.name);
        }
        break;
      default:
        for( var user of this.all_users){
          this.user_names.push(user.name);
        }
        break;
    }
  },

  change:function(){
    var vm = this;
    vm.current_user = vm._current_user;
    vm.gravatar = this.get_gravatar();
  },

  watch: {
    current_user: function(val){
      this.$emit('user_select_change',{name: this._select_name,val: val});
    }
  },

  computed: {
    is_editing: function(){
      return this.editing || !this.current_user;
    }
  },

  directives: {
    'click-outside': {
      bind (el,binding, vnode) {
        const outsideClickEventHandler = event => {
          if(!el.contains(event.target) && el !== event.target){
            binding.value(event);
          }
        }

        el.__outsideClickEventHandler__ = outsideClickEventHandler;
        document.addEventListener("click", outsideClickEventHandler);
      },

      unbind(el) {
        document.removeEventListener("click", el.__outsideClickEventHandler__);
      },
    }
  },

  methods:{
    get_gravatar: function(){
      var vm = this

      if( vm._current_user){

        switch(this._select_name){
          case 'creator':
          var user_data = vm.all_creators.filter(
            obj => {
              return obj.name === vm.current_user ;
            }
          );

          return typeof(user_data[0]) != 'undefined'? user_data[0].gravatar : '';

          default:
            var user_data = vm.all_users.filter(
              obj => {
                return obj.name === vm.current_user ;
              }
            );
            return typeof(user_data[0]) != 'undefined'? user_data[0].gravatar : '';
            break;
        }
      }

      return false;
    },

    collapse: function(){
      this.editing = false;
    },

    expand: function(){
      this.editing = true;
    },

    update_user_data: function(data){
      this.current_user = data.val;
      this.gravatar = this.get_gravatar();
      this.editing = false;
    },
  },

  template: `<div class="edit-team text-left" v-click-outside="collapse">
     <table class="team-leads"  v-on:click.stop="expand" v-if="!is_editing"><tbody><tr><td><div class="team-leads__photo"><img v-bind:src="gravatar"  v-if="gravatar" :alt="current_user"></div></td> <td colspan="3"><div class="clearfix"><span class="team-leads__name">{{current_user}}</span></div></td></tr></tbody></table>

    <select-imitation
      v-if="is_editing"
      v-bind:class="'fullwidth'"
      _select_name="user_select"
      v-bind:_options="user_names"
      v-bind:_selected="current_user"
      v-on:update_list = "update_user_data"
      ref="select"
      ></select-imitation>
  </div>`,
});
/**
* component to select date range
*/
Vue.component('daterangepicker', {
  data: function () {
    return {
      name:  '',
      label : '',
      from : '',
      to   : '',
    }
  },

  props: [
    '_name',
    '_label',
    '_from',
    '_to',
  ],

  beforeMount: function(){
    // get saved data
    var list_data_settings =Cookie.get('list_data_settings') ? JSON.parse(Cookie.get('list_data_settings')) : false;

    // prepare dates if no cookies stored
    var now = new Date();
    var fmt = new DateFormatter();

    this.label = list_data_settings? list_data_settings.label : 'This Month';

    this.from = list_data_settings ? list_data_settings.from : fmt.formatDate(now, 'M 01 Y');

    this.to = list_data_settings ? list_data_settings.to : fmt.formatDate(now, 'M d Y');

  },

  mounted: function(){
    var vm = this;
    var ranges_all     = vm.get_date_ranges();
    var ranges_current = [];
    var list_data_settings = Cookie.get('list_data_settings') ? JSON.parse(Cookie.get('list_data_settings')) : false;

    ranges_current = vm.label != 'Custom Range' ? ranges_all[vm.label] : [list_data_settings._from,list_data_settings._to];

    jQuery(vm.$el).daterangepicker({
      startDate: ranges_current[0],
      endDate  : ranges_current[1],
      ranges   : ranges_all,
      autoApply: true,
      alwaysShowCalendars : true,
    }, function(start, end, label) {

      var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

      vm.label = label;

      jQuery('.range-datepicker__text').text(text);

      var data = {
         label: label,
         from: start.format('MMM DD YYYY') ,
         to:   end.format('MMM DD YYYY'),
         _from: start.format('MM/DD/YYYY'),
         _to: end.format('MM/DD/YYYY'),
       };
       vm.$emit('daterange_changed', data);
    });
  },


  methods:{
    get_date_ranges: function(){
      var now     = new Date();
      var last_7  = new Date();
      var last_30 = new Date();
      var last_90 = new Date();
      var fmt  = new DateFormatter();

      last_7.setDate(last_7.getDate() - 7);
      last_30.setDate(last_30.getDate() - 30);
      last_90.setDate(last_7.getDate() - 90);

      return {
        "Today": [
          fmt.formatDate(now, 'm/d/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],
        'This Month': [
          fmt.formatDate(now, 'm/01/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],

        'Past 7 Days': [
          fmt.formatDate(last_7, 'm/d/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],

        'Past 30 Days':[
          fmt.formatDate(last_30, 'm/d/Y 00:00:00'),
           fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],

        'Past 90 Days': [
          fmt.formatDate(last_90, 'm/d/Y 00:00:00'),
          fmt.formatDate(now, 'm/d/Y 23:59:59')
        ],
        'All time':[
          '01/01/1999',
           fmt.formatDate(now, 'm/d/Y 23:59:59'),
        ],
      };
    },

  },

  template: `
    <div class="range-datepicker-component">
       <svg class="icon svg-icon-calendar"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-calendar"></use></svg>
         <span class="range-datepicker__label">{{label}}</span>
         <span class="range-datepicker__text">{{from}} → {{to}}</span> <span class="range-datepicker__arrow"></span>
    </div>
  `,
})
Vue.component('datepicker2', {
  data: function () {
    return {
      name:  '',
      value : '',
    }
  },

  props:['_value', '_name'],

  beforeMount: function(){
    this.name = this._name ? this._name : 'datetimepicker';
    this.value = this._value ? this._value : '';
  },

  watch: {
    _value: function(val){
      if(val && val != 'false'){

        this.value = val;
      }else{
        this.value= '';
      }
    },
  },

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).datetimepicker({
      format:'M d Y H:i',

      onClose:function(dp,$input){
        vm.value = $input.val();
        vm.$emit('input_value_changed', {name: vm.name, val: vm.value});
      }
    });
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input type="text" v-on:input="input" autocomplete="off" v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" >',
});
Vue.component('datepicker-styled', {
  data: function () {
    return {
      name:  '',
      value : '',
    }
  },

  props:['_value', '_name'],


  beforeMount: function(){
    this.name = this._name ? this._name : 'datetimepicker';

    if(this._value){
      var date = new Date(this._value);
      var fmt  = new DateFormatter();
      this.value = fmt.formatDate(date, 'd F Y');


    }
  },

  watch:{
    _value: function(){
      var date = new Date(this._value);
      var fmt  = new DateFormatter();
      this.value = fmt.formatDate(date, 'd F Y');
    },
  },


  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).datetimepicker({
      format:'d F Y',
      timepicker:false,
      value: this.value,

      onClose:function(dp,$input){
        var fmt  = new DateFormatter();
        vm.value = $input.val();
        vm.$emit('input_value_changed', {name: vm.name, val: fmt.formatDate(dp, 'Y-m-d H:i:s')});
      }
    });
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : `
    <div class="datepicker-wrapper range-datepicker">
      <svg class="icon svg-icon-calendar"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-calendar"></use> </svg>
      <input type="text"
          autocomplete="off"
          placeholder="Add"
          v-on:input="input"
          v-on:change="input"
          v-on:blur="input"
          v-bind:name="name"
          v-model="value"
        >
    </div>`,
});

datepicker_field = Vue.component('reminder', {
  data: function () {
    return {
      name:  '',
      value : '',
      value_formatted : '',
      overdue: '',
    }
  },

  props:['_value', '_name', '_value_formatted', '_overdue'],


  beforeMount: function(){
    this.name = this._name ? this._name : 'datetimepicker';
    this.value = this._value;
    this.overdue = is_boolean(this._overdue);
    this.value_formatted = this._value_formatted && this._value_formatted != 'No Due Date' ? this._value_formatted : '';
  },

  change: function(){},

  watch:{
    value_formatted:function(){
      this.$emit('input_value_changed', {value: this.value, value_formatted: this.value_formatted, overdue: this.overdue});
    },
  },

  mounted: function(){
    // this.$emit('input_value_changed', {name: this.name, val: this.value});
    var vm = this;

    jQuery(vm.$el).find('input').datetimepicker({
      format:'d M Y',
       timepicker:false,

      onClose:function(dp,$input){
        var now  = new Date();
        vm.overdue = now > dp? 1 : 0;

        var day      = dp.getDay();
        var month    = dp.getMonth();
        var hours    = dp.getHours();
        var minutes  = dp.getMinutes();

        day = day < 10? '0' + day: day;
        month = month + 1 < 10 ? '0' + month + 1: month + 1;
        hours = hours < 10? '0' + hours: hours;
        minutes = minutes < 10? '0' + minutes: minutes;
        vm.value_formatted = $input.val();
        vm.value = dp.getFullYear() + '-'+ month + '-' + day;
      }
    });
  },

  methods:{
    input: function(){
      // this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    clear: function(){
      this.value = '';
      this.value_formatted = '';
      this.overdue = false;
    }
  },

  template : '<div class="reminder"> <svg class="icon svg-icon-bell"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg> <span class="label">Set Reminder</span> <input type="text" class="value" v-on:input="input" autocomplete="off" v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value_formatted" placeholder="Add" > <span href="javascript:void(0)" class="clear-reminder" v-if="value" v-on:click="clear">clear</span> </div>',
});
Vue.component('input-field2', {
  data: function () {
    return {
      type: (this._type)? this._type : 'text',
      name:  this._name,
      value : this._value,
      readonly : this._readonly,
      placeholder : (this._placeholder)? this._placeholder : 'Add',
    }
  },

  props:['_value', '_name', '_readonly', '_placeholder', '_type'],

  watch:{
    _value: function(val){
      this.value = val;
    },

    value: function(){
      this.$el.classList.remove('error');
    },
  },

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
  },

  methods:{
    input: function(){
      if(typeof(this.value) == 'undefined') {
        this.value = jQuery(this.$el).val();
      }

      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="leads-block__input":readonly="readonly == 1" autocomplete="off">',

});


input_field_decorated = Vue.component('input-decorated', {
  data: function () {
    return {
      type: (this._type)? this._type : 'text',
      name:  this._name,
      value : this._value,
      icon : this._icon,
      readonly : this._readonly,
      placeholder : (this._placeholder)? this._placeholder : 'Add',
    }
  },

  props:['_value', '_name', '_readonly', '_placeholder', '_type', '_icon'],

  mounted: function(){
    this.$emit('input_value_changed', {name: this.name, val: this.value});
  },

  methods:{
    input: function(){
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<div class="wrapper-input"><span v-html="icon"></span><input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="":readonly="readonly == 1" autocomplete="off"></div>',

});
Vue.component('input-text-search-product', {
  data: function () {
    return {
      title: '',
      name: '',
      options: available_products,
      img_url: '',
      searching: false,
      found: false,
      show_dropdown: false,
      variations :     {
      },
      free_product_id: false,
    }
  },



  mixins: [get_set_props],

  props: ['_img_url', '_placeholder', '_name'],

  watch: {
    title: function(val){
      var vm = this;
      vm.searching = true;
      vm.show_dropdown = val.length > 0? true : false;

      if('undefined' == typeof(timeout)){
        var timeout;
      }

      if(!timeout){
        timeout = setTimeout(function(){
          vm.searching = false;
        },100)
      }else{
        clearTimeout(timeout);
      }
    },

    show_dropdown: function(val){
    },

    _img_url: function(val){
      this.img_url = this._img_url;
    },

    _name: function(name){
      this.name = name;
    },

    found: function(is_found){
      if(is_found){
        this.$emit('product_found', {'variations' : this.variations, free_product_id: this.free_product_id, recipe: this.title});
      }else{
        this.$emit('product_found', {'variations' : false, free_product_id: false});
      }
    }
  },

  computed: {
    found_options: function(){
      var options = [];
      var search = this.title.toLowerCase();

      if( this.options ){
        for(var opt in this.options){
          var tried_value = this.options[opt].name.toLowerCase();

          // check if input text is a part of possible values
          if(tried_value.indexOf(search) >= 0 && search){
            var temp = this.options[opt];
            temp.slug = opt;
            options.push(temp);
          }

          // search name is equal to imput value
          if (search === tried_value){
            var vm = this;
            var id = opt;
            Vue.nextTick(function(){
              vm.title = vm.options[id].name;
              vm.variations = vm.options[id].variations;
              vm.free_product_id = vm.options[id].free_product_id;
              vm.show_dropdown = false;
              vm.found = id;
              return [vm.options[id]];
            })
          }
        }
      }
      return options;
    },
  },

  beforeMount: function(){
    this.img_url = this._img_url;
    this.name =   this._name;
  },

  mounted: function(){
  },

  methods: {
    set_title: function(id){
      this.title = this.options[id].name;
      this.variations = this.options[id].variations;
      this.free_product_id = this.options[id].free_product_id;
      this.found = id;
      var vm = this;
      Vue.nextTick(function(){
        vm.show_dropdown = false;
      })
    },

    resert_values: function(){
      this.title = '';
      this.searching = false;
      this.found = false;
      this.show_dropdown = false;
      this.variations  = {};
      this.free_product_id = false;
    },

    restore_data: function(){
    },
  },

  template: `
    <div class="input-holder">
      <input type="text" id="product-name" class="popup-inner__field" v-model="title" autocomplete="off"
        v-bind:placeholder = "_placeholder"
      >
       <img :src="img_url" v-if="searching">

       <div class="input-holder__dropdown" v-if="found_options.length > 0 && show_dropdown">
          <ul class="input-holder__list">
            <li v-for="(prod, id) in found_options" v-on:click="set_title(prod.slug)">{{prod.name}}</li>
          </ul>
       </div>

       <div class="input-holder__dropdown" v-if="found_options.length == 0 && show_dropdown">
          <p> No products found </p>
       </div>
    </div>
  `,
});
Vue.component('list-column', {

  data: function(){
    return {
      info:  '',
      leads: [],
      trigger_scroll : false,
      counter: 20,
      moved_item_id: -1,
      target_stage: '',
      converted: '',
    };
  },

  props: [
    '_info',
    '_converted',
    '_leads',
  ],

  watch:{

    '_info': function(val){
      this.info = val;
    },

    '_leads': function(val){
      this.leads = val;
    },
    '_converted': function(val){
      this.converted = val;
    },

    trigger_scroll: function(trigger){
      if(trigger){
        this.counter += 50;
      }
    },
  },

  computed: {
    count: function(){
      return this._leads.length;
    },

    // converted: function(){
    //   return 0;
    // },

    leads_show: function(){
      var leads = this.leads.slice(0, this.counter);
      for(var id in leads){
        leads[id].lead_stage = this.info.name;
      }
      return leads;
    },
  },

  beforeMount: function(){
    this.info = this._info;
    this.leads = this._leads;
    this.converted = this._converted;
  },



  mounted: function(){
    var header = this.$el.getElementsByClassName('leads-column__tag')[0];
    header.style.backgroundColor = this.info.bg_color;
    header.style.color           = this.info.text_color;
  },

  methods: {

    checkMove: function(item){
      this.moved_item_id = item.draggedContext.element.ID;
    },

    end_drag: function(evt,data){
      this.$emit('update_order_status_on_drag', {item_id: this.moved_item_id, lead_stage: this.target_stage});
      this.moved_item_id = -1;
      this.target_stage = '';
    },

    end_sort: function(evt,data){
      this.$emit('update_order_status_on_drag', {item_id: this.moved_item_id, lead_stage: this.target_stage});
      this.moved_item_id = -1;
      this.target_stage = '';
    },

    open_lead_cb:function(data){
      this.$emit('open_lead', data);
    },

    /**
    * replaces default scroll of column.
    * scrolls column by 1 elemnt hieght
    */
    scroll_items: function(){
      event.preventDefault()

      if( !this.trigger_scroll ){
        this.$refs.scroll.scrollTop  = (event.deltaY > 0)? this.$refs.scroll.scrollTop + 66 : this.$refs.scroll.scrollTop - 66;
      }
    },


    /**
    * emits scroll if end of scroll content reached
    */
    scroll_items_emit:function(slug){
      this.trigger_scroll = this.$refs.scroll.offsetHeight + this.$refs.scroll.scrollTop >= this.$refs.scroll.scrollHeight - this.$refs.scroll.scrollHeight  * 0.05;

      var vm = this;

      Vue.nextTick(function(){
        vm.trigger_scroll = false;
      })
    },

  },

  template: `
  <div class="leads-column leads-column-2">
    <div class="leads-column__head">
      <span class="leads-column__tag">
        {{info.name}}
      </span>
      <span class="leads-column__count">{{count}}</span>
      <span class="leads-column__convertion" v-if="info.name != 'New' "><svg class="icon svg-icon-convertions"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use></svg>
         {{converted}}
       </span>
    </div>
    <div class="leads-column__body"
        ref="scroll"
        @wheel="scroll_items(info.name)"
        @scroll="scroll_items_emit(info.name)"
    >
      <div name="lead-list" class="leads-list" >
        <draggable
          v-bind:class="'scroll'"
          ref="scroll-inner"
          :move="checkMove"
          :list="leads"
          group="info.name"
          @end="end_sort"
        >
          <item-reception
            v-for="lead, key in leads_show"
            v-on:open_lead = 'open_lead_cb'
            :_info = "lead"
            :key = "'item_'+key"
          ></item-reception>
        </draggable>
      </div>
     </div>
   </div>
  `,
});
Vue.component('item-reception', {
  data: function(){
    return {
      info: {},
    };
  },

  props: ['_info'],

  watch:{
    _info: function(val){
      this.info = val
    },
  },

  beforeMount: function(){
    this.info = this._info;
    // console.log(strip(this.info));
  },

  computed: {

    name: function(){
      return  this.info.meta.patient_data.name;
    },

    time_passed: function(){
      var now = new Date();
      var date_received = new Date(this.info.post_date);

      return date_difference.construct(date_received, now)  + ' ago';
    },

    source_text: function(){
      if(this.info.meta.patient_data.treatment){
        return this.info.meta.patient_data.treatment;
      } else if(this.info.meta.patient_data.campaign){
        return this.info.meta.patient_data.campaign;
      } else if(this.info.meta.patient_data.source){
        return this.info.meta.patient_data.source;
      }
    },

    overdue: function(){
      var now = new Date();
      var reminder_date = new Date(this.info.meta.reminder);
      return   (this.info.meta.reminder !== '' && now > reminder_date)? 'yes' : 'no';
    },
  },

  methods: {
    open_lead:function(data){
      this.$emit('open_lead', {lead_id: data});
    },
  },

  template: `
    <div class="lead-preview" v-on:click = 'open_lead(info.ID)'>
     <div class="clearfix">
      <div class="row justify-content-start">
        <div class="col-7">
         <span class="lead-preview__name" v-bind:title="name">{{name}}</span>
         <span class="lead-preview__icons">
          <svg xmlns="http://www.w3.org/2000/svg" class="hidden" width="12" height="12" viewBox="0 0 12 12"><g><g><g><path fill="#2196f3" d="M6 0C2.691 0 0 2.691 0 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"/></g><g><path fill="#fafafa" d="M8.85 4.803l-3.319 3.06a.532.532 0 0 1-.36.137.532.532 0 0 1-.362-.138l-1.66-1.53a.444.444 0 0 1 0-.665.541.541 0 0 1 .723 0L5.17 6.864l2.958-2.726a.541.541 0 0 1 .722 0c.2.184.2.481 0 .665z"/></g></g></g></svg>
         </span>
        </div>

        <div class="col-5">
         <span class="lead-preview__time" v-bind:title="time_passed">{{time_passed}}</span>
        </div>
      </div>
     </div>
       <div class="clearfix">
         <span class="lead-preview__sourse">{{source_text}}</span>
          <span class="list-counters">

            <svg class="icon svg-icon-bell" v-if="info.meta.reminder != '' && overdue == 'yes'" v-bind:title="info.meta.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

            <svg class="icon svg-icon-bell green" v-if="info.meta.reminder != '' && overdue == 'no'" v-bind:title="info.meta.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

            <i class="icon-message-phone phone-na" v-if="info.phone_count == 0"></i>
            <i class="icon-message-phone phone-ok" v-else="info.phone_count > 0"><span class="counter">{{info.phone_count}}</span></i>
            <i class="icon-message-phone message-na" v-if="info.message_count == 0"></i>
            <i class="icon-message-phone message-ok" v-else="info.message_count > 0"><span class="counter">{{info.message_count}}</span></i>

            <i class="icon-message-phone" v-if="info.show_message_alert">
                <svg  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#3354f6" fill-opacity="1"></path></g></g></svg>
             </i>
             <i class="icon-message-phone" v-if="info.show_message_alert_him">
               <svg  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#eb0147" fill-opacity="1"></path></g></g>
             </i>
          </span>
       </div>
    </div>
  `
})
Vue.component('list-column-tco', {

  data: function(){
    return {
      info:  '',
      leads: [],
      trigger_scroll : false,
      counter: 20,
      moved_item_id: -1,
      target_stage: '',
      converted: '',
    };
  },

  props: [
    '_info',
    '_converted',
    '_leads',
  ],

  watch:{

    '_info': function(val){
      this.info = val;
    },

    '_leads': function(val){
      this.leads = val;
    },
    '_converted': function(val){
      this.converted = val;
    },

    trigger_scroll: function(trigger){
      if(trigger){
        this.counter += 50;
      }
    },
  },

  computed: {
    count: function(){
      return this._leads.length;
    },

    // converted: function(){
    //   return 0;
    // },

    leads_show: function(){
      var leads = this.leads.slice(0, this.counter);
      for(var id in leads){
        leads[id].lead_stage = this.info.name;
      }
      return leads;
    },
  },

  beforeMount: function(){
    this.info = this._info;
    this.leads = this._leads;
    this.converted = this._converted;
  },



  mounted: function(){
    var header = this.$el.getElementsByClassName('leads-column__tag')[0];
    header.style.backgroundColor = this.info.bg_color;
    header.style.color           = this.info.text_color;
  },

  methods: {

    checkMove: function(item){
      this.moved_item_id = item.draggedContext.element.ID;
    },

    end_drag: function(evt,data){
      this.$emit('update_order_status_on_drag', {item_id: this.moved_item_id, lead_stage: this.target_stage});
      this.moved_item_id = -1;
      this.target_stage = '';
    },

    end_sort: function(evt,data){
      this.$emit('update_order_status_on_drag', {item_id: this.moved_item_id, lead_stage: this.target_stage});
      this.moved_item_id = -1;
      this.target_stage = '';
    },

    open_lead_cb:function(data){
      this.$emit('open_lead', data);
    },

    /**
    * replaces default scroll of column.
    * scrolls column by 1 elemnt hieght
    */
    scroll_items: function(){
      event.preventDefault()

      if( !this.trigger_scroll ){
        this.$refs.scroll.scrollTop  = (event.deltaY > 0)? this.$refs.scroll.scrollTop + 66 : this.$refs.scroll.scrollTop - 66;
      }
    },


    /**
    * emits scroll if end of scroll content reached
    */
    scroll_items_emit:function(slug){
      this.trigger_scroll = this.$refs.scroll.offsetHeight + this.$refs.scroll.scrollTop >= this.$refs.scroll.scrollHeight - this.$refs.scroll.scrollHeight  * 0.05;

      var vm = this;

      Vue.nextTick(function(){
        vm.trigger_scroll = false;
      })
    },

  },

  template: `
  <div class="leads-column leads-column-2">
    <div class="leads-column__head">
      <span class="leads-column__tag">
        {{info.name}}
      </span>
      <span class="leads-column__count">{{count}}</span>
      <span class="leads-column__convertion" v-if="info.name != 'New' "><svg class="icon svg-icon-convertions"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-convertions"></use></svg>
         {{converted}}
       </span>
    </div>
    <div class="leads-column__body"
        ref="scroll"
        @wheel="scroll_items(info.name)"
        @scroll="scroll_items_emit(info.name)"
    >
      <div name="lead-list" class="leads-list" >
        <draggable
          v-bind:class="'scroll'"
          ref="scroll-inner"
          :move="checkMove"
          :list="leads"
          group="info.name"
          @end="end_sort"
        >
          <item-tco
            v-for="lead, key in leads_show"
            v-on:open_lead = 'open_lead_cb'
            :_info = "lead"
            :key = "'item_'+key"
          ></item-tco>
        </draggable>
      </div>
     </div>
   </div>
  `,
});
Vue.component('item-tco', {
  data: function(){
    return {
      info: {},
    };
  },

  props: ['_info'],

  watch:{
    _info: function(val){
      this.info = val
    },
  },

  beforeMount: function(){
    this.info = this._info;
    // console.log(strip(this.info));
  },

  computed: {

    name: function(){
      return  this.info.meta.patient_data.name;
    },

    time_passed: function(){
      var now = new Date();
      var date_received = new Date(this.info.post_date);

      return date_difference.construct(date_received, now)  + ' ago';
    },

    source_text: function(){
      if(this.info.meta.patient_data.treatment){
        return this.info.meta.patient_data.treatment;
      } else if(this.info.meta.patient_data.campaign){
        return this.info.meta.patient_data.campaign;
      } else if(this.info.meta.patient_data.source){
        return this.info.meta.patient_data.source;
      }
    },

    overdue: function(){
      var now = new Date();
      var reminder_date = new Date(this.info.meta.reminder);
      return   (this.info.meta.reminder !== '' && now > reminder_date)? 'yes' : 'no';
    },
  },

  methods: {
    open_lead:function(data){
      this.$emit('open_lead', {lead_id: data});
    },
  },

  template: `
    <div class="lead-preview" v-on:click = 'open_lead(info.ID)'>
     <div class="clearfix">
      <div class="row justify-content-start">
        <div class="col-7">
         <span class="lead-preview__name" v-bind:title="name">{{name}}</span>
         <span class="lead-preview__icons">
          <svg xmlns="http://www.w3.org/2000/svg" class="hidden" width="12" height="12" viewBox="0 0 12 12"><g><g><g><path fill="#2196f3" d="M6 0C2.691 0 0 2.691 0 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"/></g><g><path fill="#fafafa" d="M8.85 4.803l-3.319 3.06a.532.532 0 0 1-.36.137.532.532 0 0 1-.362-.138l-1.66-1.53a.444.444 0 0 1 0-.665.541.541 0 0 1 .723 0L5.17 6.864l2.958-2.726a.541.541 0 0 1 .722 0c.2.184.2.481 0 .665z"/></g></g></g></svg>
         </span>
        </div>

        <div class="col-5">
         <span class="lead-preview__time" v-bind:title="time_passed">{{time_passed}}</span>
        </div>
      </div>
     </div>
       <div class="clearfix">
         <span class="lead-preview__sourse">{{source_text}}</span>
          <span class="list-counters">

            <svg class="icon svg-icon-bell" v-if="info.meta.reminder != '' && overdue == 'yes'" v-bind:title="info.meta.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

            <svg class="icon svg-icon-bell green" v-if="info.meta.reminder != '' && overdue == 'no'" v-bind:title="info.meta.reminder"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-bell"></use> </svg>

            <i class="icon-message-phone phone-na" v-if="info.phone_count_tco == 0"></i>
            <i class="icon-message-phone phone-ok" v-else="info.phone_count_tco > 0"></i>
            <i class="icon-message-phone message-na" v-if="info.message_count_tco == 0"></i>
            <i class="icon-message-phone message-ok" v-else="info.message_count_tco > 0"></i>

            <i class="icon-message-phone" v-if="info.show_message_alert">
                <svg  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#3354f6" fill-opacity="1"></path></g></g></svg>
             </i>

             <i class="icon-message-phone" v-if="info.show_message_alert_him">
               <svg  width="15" height="13" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 15 13"><defs></defs><g><g><title>Shape</title><path d="M4.5,4.30185c0,-0.27868 0.22386,-0.50461 0.5,-0.50461h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461zM5,6.56509h5c0.27614,0 0.5,0.22592 0.5,0.50461c0,0.27868 -0.22386,0.50461 -0.5,0.50461h-5c-0.27614,0 -0.5,-0.22592 -0.5,-0.50461c0,-0.27868 0.22386,-0.50461 0.5,-0.50461zM5.11,0.26c-2.82103,0.00276 -5.10724,2.28897 -5.11,5.11v0.78c0.00276,2.82103 2.28897,5.10724 5.11,5.11h1.89l0.955,1.5c0.1372,0.22145 0.37949,0.35585 0.64,0.355c0.26225,-0.00225 0.50454,-0.14044 0.64,-0.365l0.92,-1.5c2.68416,-0.05427 4.83469,-2.24031 4.845,-4.925v-0.955c-0.00276,-2.82103 -2.28897,-5.10724 -5.11,-5.11z" fill="#eb0147" fill-opacity="1"></path></g></g>
             </i>
          </span>
       </div>
    </div>
  `
})
Vue.component('exist-popup-spa', {

  data: function(){
    return {
      show: false,
      name: '',
      email: '',
      phone: '',
      posted_data: {},
      leads: [],
    };
  },

  props: [
  ],

  watch:{
  },

  mounted: function(){
    this.show = false;
    this.$el.classList.remove('visuallyhidden');
  },

  computed:{
    number: function(){
      return this.leads.length;
    }
  },


  methods:{
      cancel: function(){
        this.show = false;
      },

      create: function(){
        this.show = false;

        this.$emit('save_lead',{posted_data: this.posted_data});
      },

      time_passed:function(date){

        var now = new Date();
        var date_received = new Date(date);

        return date_difference.construct(date_received, now)  + ' ago';
      },

      open_lead: function(lead_id){
        this.show = false;
        this.$emit('open_lead', {lead_id: lead_id});
      },

      marked: function(v){
        return v == this.name ||v == this.phone ||v == this.email;
      }
  },

  template: '#exist-popup-spa',
});

console.log();
wait_block2 = new Vue({
  el: '#wait-block2',

  data: {
    class: '',
    text: '',
  },

  computed:{
    show_class: function(){
      return this.class;
    },

    wait_text: function(){
      return this.text;
    },
  },

  methods: {
    show: function(){
      this.text = 'Please wait';
      this.class = 'shown';
      console.log(this.class)
    },

    hide: function(text){
      this.text = '';
      this.class = '';
    }
  }
});
if(document.getElementById('list-app') && 'undefined' != typeof(is_lead_list_2)){
  list_app = new Vue({
    el: '#list-app',

    data: {
      filter_data: dashboard_filter_data,

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sources:    'All Sources',
        team:       'All Team',
        dentists:   'All Dentists',
      },

      leads : dashboard_leads_data,
      stages: stages,
      by_phones : [],
      by_phones_data : false,
      sortby: false,

      overdue_checked: false,
      not_overdue_checked: false,
      overdue_only_checked: false,
      show_overdue_only: false,
      show_not_read_only: false,
      show_list: true,
      search_value: '',
    },

    watch: {

      'by_phones_data' : function(val){
        var vm = this;
        if(vm.$refs.single_lead.visible){
          var phone = vm.$refs.single_lead.lead_data.meta.patient_data.phone;

          if(phone){
            phone = phone.replace('+44', '0');
            vm.$refs.single_lead.text_messages = val && 'undefined' !== typeof(val[phone]) ? val[phone] : [];
          }
        }
      },

      'filters.clinics': function(val){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.treatments': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.campaigns': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.sources': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.team': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },

      'filters.dentists': function(){
        Cookie.set('lead_list_filter2', JSON.stringify(this.filters));
      },
    },

    beforeMount: function(){
      this.update_filter_from_cookies();
    },

    mounted: function(){
      var vm = this;

      vm.check_text_messages();

      vm.$nextTick(function(){
        setInterval(function(){vm.check_text_messages()}, 60000);
        vm.adjust_sizes();
        vm.$el.classList.add('init');
        window.addEventListener('resize', function(){
          vm.adjust_sizes()
        } , true);

        vm.$forceUpdate();
      })
    },

    computed: {
      not_read_count: function(){
        var count =0 ;

        if(!this.leads_by_column){
          return 0;
        }
        for(var id in this.leads_by_column){
          count += this.leads_by_column[id].filter(e=>{return e.show_message_alert_him}).length
        }

        return count;
      },

      alarms: function(){
        return {
          class: '',
          class_overdue: '',
          total: 0,
          overdue: 0,
        }
      },

      get_convertion: function(){
        var vm = this;

        return function (col_id) {

          var leads_total = 0;
          var leads_column_total = 0;

          var column_number = this.visible_stages.findIndex(e=> {return e.name == col_id});

          if(col_id == failed_lead_name ){
            for(id in this.leads_by_column){
              leads_total += this.leads_by_column[id].length;
            }
          }else{
            for(var i = 0 ; i <= column_number; i++){
              var _col_id = this.visible_stages[i].name;
              leads_total +=(_col_id != failed_lead_name && 'undefined' !== typeof(this.leads_by_column[_col_id]))? this.leads_by_column[_col_id].length : 0;
            }
          }

          if('undefined' !== typeof(this.leads_by_column[col_id]) && leads_total > 0){
              leads_column_total = this.leads_by_column[col_id].length;

              var val = (leads_column_total/leads_total)*100;
              return val.toFixed(2);

          }else{
            return 0;
          }
        }
      },

      leads_by_column: function(){
        var vm = this;

        var stages = 'object' == typeof(vm.stages)? Object.values(vm.stages) : vm.stages;

        var leads = Object.fromEntries(
            stages.map(
                function(el){

                  return [el.name, []];
                }));

        for(var lead_stage in leads){

          var stage_data = stages.filter(el=>{
            return el.name == lead_stage;
          });

          leads[lead_stage] = vm.leads_filtered.filter(function(el){
            return el.lead_stage == lead_stage;
          });

          switch(vm.sortby){
            case 'Recent Messages':
               leads[lead_stage].sort(vm.sort_by_sms);
              break;
            case 'Date Added':
                leads[lead_stage].sort(vm.sort_by_date_added);
              break;
            case 'Recently Updated':
              leads[lead_stage].sort(vm.sort_by_date);
              break;
          }
        }

        return leads;
      },


      /**
      * select visible leads according to filters, overdue and only messages parameters
      *
      */
      leads_filtered: function(){
        var vm = this;

        // add message data
        var  leads = vm.leads.map(el=>{

          if(!el.meta.patient_data.phone){
            return el;
          }

          var phone = el.meta.patient_data.phone.replace('+44', '0');

          if('undefined' != typeof(vm.by_phones_data[phone])){
            var msgs =  vm.by_phones_data[phone];
            var type = msgs[msgs.length - 1].type;

            el.show_message_alert_him = type === 'him' ? true: false; // by him
            el.show_message_alert = type === 'him' ? false: true; // by us
            // console.group(phone)
            // console.log(strip(el.meta.patient_data.name))
            // console.log(strip(msgs))
            // console.log(strip(type))
            // console.log(strip(el.show_message_alert))
            // console.log(strip(el.show_message_alert_him))
            // console.log(strip(el))
            // console.groupEnd()
          }

          return el;
        })

        var now = new Date();

        leads = leads.filter(function(el){
          var validated = true;
          var filter_data = strip(el.filter_data2);
          var now = new Date();

          // filter by search name

          if(el.meta.patient_data.name){
            validated = vm.search_value.length > 2 && el.meta.patient_data.name.toLowerCase().indexOf(vm.search_value) < 0 ? false : validated;
          }

          // show reminders only

          if(vm.show_overdue_only && !el.meta.reminder){
            validated = false;
          }


          var overdue_date = new Date(el.meta.reminder)

          if(vm.not_overdue_checked && (!el.meta.reminder || overdue_date < now)){
            validated = false;
          }

          if(vm.overdue_only_checked && (!el.meta.reminder || overdue_date > now)){
            validated = false;
          }

          // show only with latest sms from clients
          if(vm.show_not_read_only && !el.show_message_alert_him){
            validated = false;
          }

          // show only filter's matches
          for(var filter_id in vm.filters){
            if(vm.filters[filter_id].toLowerCase().indexOf('all') >=0){
              continue;
            }

            if(!filter_data[filter_id].length){
              return false;
            }

            validated = filter_data[filter_id].indexOf(vm.filters[filter_id]) < 0 ? false : validated;
          }
          return validated;
        });

        return leads;
      },


      overdue_data: function(){

        var visible_stage_names = this.visible_stages.map(el=>{return el.name});

        var leads = this.leads_filtered.filter(el=>{
          return visible_stage_names.indexOf(el.lead_stage) >=0 ;
        });

        var leads_reminder = leads.filter(el=>{return !!el.meta.reminder})

        var now = new Date();

        var leads_overdue = leads_reminder.filter(el=>{
          return now > new Date(el.meta.reminder);
        })

        var leads_not_overdue = leads_reminder.filter(el=>{
          return now < new Date(el.meta.reminder);
        })

        return {
          reminder: leads_reminder.length,
          overdue: leads_overdue.length,
          not_overdue: leads_not_overdue.length,
        }
      },


      sort_options:function(){
        return ['Sort By', 'Recent Messages', 'Date Added', 'Recently Updated']
      },

      stages_reception: function(){
       var stages = 'object' == typeof(this.stages)? Object.values(this.stages) : this.stages;

        return stages.filter(el=>{
          return el.reception == 1;
        })
      },

      stages_tco: function(){
       var stages = 'object' == typeof(this.stages)? Object.values(this.stages) : this.stages;

        return stages.filter(el=>{
          return el.tco == 1;
        })
      },

      visible_stages: function(){
       var stages = 'object' == typeof(this.stages)? Object.values(this.stages) : this.stages;

       switch(list_type){
         case 'reception':
          return   stages.filter(el=>{
            return el.reception == 1;
          })
           break;
         case 'tco':
           return   stages.filter(el=>{
            return el.tco == 1;
          })
           break;
         default:
           return stages;
           break;
        }
      },
    },

    methods: {
      add_leads: function(leads){
        var current_leads_ids = this.leads.map(e=>{return e.ID});

        leads = leads.filter(el=>{
          return current_leads_ids.indexOf(el.ID) < 0;
        });

        this.leads = this.leads.concat(leads);
      },

      adjust_sizes: function(){
        var vm = this;
        jQuery(vm.$refs.column_container).removeAttr('style');

        jQuery('.horizontal-scroll').removeAttr('style');
        jQuery('.horizontal-scroll > .row').removeAttr('style');
        jQuery('.horizontal-scroll .leads-column').removeAttr('style');
        jQuery('.horizontal-scroll .leads-column__body').removeAttr('style');


        var heigth = jQuery('.site-inner').height() - jQuery('.filter-container').height() - 28;

        var width = vm.visible_stages.length * 300;

        // set width of columns' container to avoid line breaks
        jQuery(vm.$refs.column_container).css({
          'min-width' : width + 'px',
        })

        if(width < jQuery(window).width()){
          var margin = (jQuery(window).width() - width)/2
          jQuery(vm.$refs.column_container).css({
            'margin-left' : margin + 'px',
          })
        }

        // set height of s scroll block to fit it to the page size
        jQuery('.horizontal-scroll').css({
          'min-height' : heigth + 'px',
          'max-height' : heigth + 'px',
        });
        jQuery('.horizontal-scroll > .row').css({
          'min-height' : heigth + 'px',
          'max-height' : heigth + 'px',
        });
        jQuery('.horizontal-scroll .leads-column').css({
          'min-height' : heigth + 'px',
          'max-height' : heigth + 'px',
        });
        jQuery('.horizontal-scroll .leads-column__body').css({
          'height' : heigth - 68  + 'px',
          'max-height' : heigth  - 68 + 'px',
        });
      },
      /**
      * discards all changes of filters;
      */
      clear_filters : function(){
        var filters ={
          clinics:    'All Clinics',
          treatments: 'All Treatments',
          campaigns:  'All Campaigns',
          sources:    'All Sources',
          team:       'All Team',
          dentists:   'All Dentists',
        };

        for( filter_name in filters){
          this.$refs[filter_name][0].set_value('selected', filters[filter_name]);
        }
      },


      /**
      * gets smss data from twilio
      */
      check_text_messages: function(){
        var vm = this;

        if('undefined' == typeof(sms_data)){
          return;
        }

        var data = {
          sms_data: sms_data,
          phone: 'all',
        };

        jQuery.ajax({
          url: WP_URLS.theme_url+"/messaging/twilio_update_msg.php",
          type: 'POST',
          dataType: 'json',
          data: data,
        })

        .done(function(e) {
          console.log(e);
          if(!e.error){
            vm.by_phones = e.by_phones;
            vm.by_phones_data = e.by_phones_data;
            console.log(e);
            Vue.nextTick(function(){
              vm.$forceUpdate();
            })
          }
        })

        .fail(function() {
        })

        .always(function(e) {

          console.log('check_msg')
          console.log(e);
        });
      },


      /**
      * gets filter value by filter name.
      * gets data from cookie.
      */
      get_filter_value: function(filter_name){
        var lead_list_filter = Cookie.get('lead_list_filter2');

        if(lead_list_filter){
          lead_list_filter = JSON.parse(lead_list_filter);
          return lead_list_filter[filter_name];
        }else{
          return this.filter_data[filter_name][0]
        }
      },

      open_lead_cb: function(data){
        var vm = this;
        var lead = strip(this.leads.filter(el=>{return el.ID == data.lead_id})[0]);

        vm.show_list = false;
        vm.$refs.single_lead.lead_data = lead;

        Vue.nextTick(function(){
          vm.$refs.single_lead.visible = true;
          var phone = lead.meta.patient_data.phone;
          if(phone){
            phone = phone.replace('+44', '0');

            if(!vm.by_phones_data){
               vm.$refs.single_lead.text_messages = false;
            }else{
              vm.$refs.single_lead.text_messages = 'undefined' !== typeof(vm.by_phones_data[phone])? vm.by_phones_data[phone] : []
            }
          }
          console.log(lead);
        })
      },

      // fires when filter select changes
      run_filter_list: function(data){
        this.filters[data.name] = data.val;
      },

      run_search: function(search){
        //console.log('run search');
        this.search_value = search.toLowerCase();
      },


      sort_by_date: function(lead_a,lead_b){
        var date_lead_a = new Date(lead_a.post_modified);
        var date_lead_b = new Date(lead_b.post_modified);

        if(date_lead_a === date_lead_b){
          return 0;
        }
        return (date_lead_a > date_lead_b)? -1 : 1;
      },

      sort_by_date_added: function(lead_a,lead_b){
        var date_lead_a = new Date(lead_a.post_date);
        var date_lead_b = new Date(lead_b.post_date);

        if(date_lead_a === date_lead_b){
          return 0;
        }
        return (date_lead_a > date_lead_b)? -1 : 1;
      },

      sort_by_sms: function(lead_a,lead_b){
        if((lead_a.show_message_alert_him && lead_b.show_message_alert_him && lead_b.show_message_alert && lead_a.show_message_alert) || (!lead_a.show_message_alert_him && !lead_b.show_message_alert_him  && !lead_b.show_message_alert && !lead_a.show_message_alert)){
          return 0;
        }
        if(lead_a.show_message_alert_him && !lead_b.show_message_alert_him){
          return -1;
        }
        if(!lead_a.show_message_alert_him && lead_b.show_message_alert_him){
          return 1;
        }
        if(lead_a.show_message_alert && !lead_b.show_message_alert){
          return -1;
        }
        if(!lead_a.show_message_alert && lead_b.show_message_alert){
          return 1;
        }
      },

      /**
      * get filter data from cookies if exists
      */
      update_filter_from_cookies: function(){
         var lead_list_filter = Cookie.get('lead_list_filter2');
         if(lead_list_filter){
           this.filters  = JSON.parse(lead_list_filter);
         }
      },

      // fires update action when daterange is changed
      update_leads_by_dates: function(data){
        console.log(data);

        this.show_not_read_only = false;
        this.show_overdue_only = false;
        var vm = this;
        data.get_previous_data = 0;

        Cookie.set('list_data_settings', JSON.stringify(data));

         data.action = 'get_leads_by_dates';

         wait_block.show();


        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          dataType: 'json',
          data: data,

          complete: function(xhr, textStatus) {
            //called when complete
            wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(data)

            vm.clear_filters();
            vm.leads = data.leads;
            vm.filter = data.filter_data;
          },

          error: function(xhr, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(xhr);
           }
        });
      },

      update_order_status_on_drag_cb: function(data){
        var index = this.leads.findIndex(el =>{
          return data.item_id == el.ID;
        })

        if(index < 0){
          return;
        }

         var fmt = new DateFormatter();
         var today = new Date();
         this.leads[index].post_modified = fmt.formatDate(today, 'Y-m-d H:i:s')

        var data_post = {
          action : 'update_leads_list',
          post_id: this.leads[index].ID,
          list_id: this.leads[index].lead_stage,
        };

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          dataType: 'json',
          data: data_post,
          complete: function(xhr, textStatus) {
            //called when complete
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
            //console.groupEnd('---');
          },

          error: function(xhr, textStatus, errorThrown) {
            //console.log('error');
            //console.log(errorThrown);
            //console.groupEnd();
           }
        });
      },

      sort_leads: function(data){
        if(data.val){
          this.sortby = data.val;
        }
      },
    },
  });
}
Vue.component('comp-single-lead', {
  data: function(){
    return {
      visible: false,
      lead_data: {
        phone_count: 0,
        message_count: 0,
        phone_count_tco: 0,
        message_count_tco: 0,
        meta: {
          treatment_value: {
            billed    : 0,
            value     : 0,
            terms     : '',
            mounthly  : '',
            date_end : '',
          },
          reminder: '',
          specialists_assigned: false,
          specialists_assigned_tco: false,
          tco_data: {
            'digital' : false,
            'tco' : false,
            'dentist' : false,
            'attended' : false,
            'fta_cancelled' : false,
            'tax' : false,
          },
          patient_data: {
            name: '',
            phone: '',
            email: '',
            source: '',
            treatment: '',
            clinic: '',
            campaign: '',
          },
          treatment_data: [],
        },
      },
      balance: 0,
      enquery_notes_count: 1,
      tco_notes_count: 1,
      text_messages_to_show: 2,
      note_text: '',
      note_text_tco : '',
      file_changed   : '',
      new_file  : '',
      specialists_data: specialists_data,
      requre_save: false,
      show_confirmation_popup: false,
      text_messages: false,
      message_to_client: '',
      sms_data: sms_data,
    };
  },

  watch: {
    'lead_data.meta.patient_data.name': function(){
      jQuery('input[name=name]').removeClass('error');
    },

    'lead_data.meta.patient_data.phone': function(){
      jQuery('input[name=phone]').removeClass('error');
    },

    'lead_data.meta.patient_data.email': function(){
      jQuery('input[name=email]').removeClass('error');
    },

    show_confirmation_popup: function(){
      this.$refs.popup._stage = this.lead_data.lead_stage;
      this.$refs.popup.show_confirmation_popup = true;
    },

    text_messages_to_show: function(val){
      if(val > 2){
        Vue.nextTick(function(){
          jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
        })
      }
    },

    note_text: function(){
      this.$refs.note_textarea.style.height = '';
      this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
    },

    note_text_tco: function(){
      this.$refs.note_textarea_tco.style.height = '';
      this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px';
    },

    visible: function(show){
      var vm = this;

      if(show){
        this.treatment_data_selects();
        this.requre_save  = false;
      }else{
        this.enquery_notes_count  = 1;
        this.tco_notes_count  = 1;
        this.note_text  = '';
        this.note_text_tco   = '';
        this.files_updated   = '';
        this.file_changed     = '';
        this.specialists_data  = specialists_data;
        this.requre_save  = false;
        this.show_confirmation_popup  = false;
      }
    },


      'lead_data.meta.treatment_value.billed': function(val){

        var balance = get_sum_from_price(this.lead_data.meta.treatment_value.value) - get_sum_from_price(this.lead_data.meta.treatment_value.billed);


        this.lead_data.meta.treatment_value.terms = get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.lead_data.meta.treatment_value.mounthly =  get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },


      'lead_data.meta.treatment_value.value': function(val){

        var balance = get_sum_from_price(this.lead_data.meta.treatment_value.value) - get_sum_from_price(this.lead_data.meta.treatment_value.billed);

        this.lead_data.meta.treatment_value.terms = get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.lead_data.meta.treatment_value.mounthly =  get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },
  },

  computed: {
      text_messages_shown: function(){
        if(this.text_messages_to_show  == 2 && this.text_messages.length > 2){
          var messages = [];
          for(var i = 2; i > 0 ; i--){
          messages.push(this.text_messages[this.text_messages.length - i]);
          }
          return messages;
        }else{
          return this.text_messages;
        }
      },

      file_is_prepared: function(){
        return this.new_file.length > 0
      },


      files_updated: function(){
        return this.lead_data.meta.lead_files;
      },

      get_treatment_value: function(){
        return this.lead_data.meta.treatment_value.value;
      },

      get_billed_value: function(){
        return this.lead_data.meta.treatment_value.billed;
      },

      get_terms_count: function(){
        $return = 1;
        switch(this.lead_data.meta.treatment_value.terms){
          case '12 Months':
             $return = 12;
            break;
          case '18 Months':
             $return = 18;
            break;
          case '24 Months':
             $return = 24;
            break;
          case '36 Months':
             $return = 36;
            break;
          case '48 Months':
             $return = 48;
            break;
          default:
             $return = 1;
            break;
        }

        return  $return;
      },

      monthly_payment: function(){
        var billed = get_sum_from_price(this.get_billed_value);
        var summ = (get_sum_from_price(this.get_treatment_value) - get_sum_from_price(this.get_billed_value))/this.get_terms_count;
        summ = summ.toFixed(2);
        this.lead_data.meta.treatment_value.mounthly = summ;
        return   '£'+ formatMoney(summ, 2, ".", ",");
      },

      select_data: function(){
        return {
          clinics: clinics,
          sources: theme_leads_sources,
          campaigns: campaigns,
          treatments: treatments,
          specialists: specialists,
          specialists_tco: specialists_tco,
          payment_methods: payment_methods,
          available_dentists: available_dentists,
        };
      },

      lead_status:function(){
        if(this.lead_data.is_converted == 'yes'){
          return {
            text: 'Converted Lead',
            class: 'converted',
          }

        }else if (this.lead_data.is_failed == 'yes'){
          return {
            text: 'Failed Lead',
            class: 'failed',
          }
        }else{
          return {
            text: 'Opened Lead',
            class: 'opened',
          }
        }
      },

      messages_left : function(){
        return Math.max(0, 3 - this.lead_data.message_count);
      },

      phones_left : function(){
        return Math.max(0, 3 - parseInt(this.lead_data.phone_count));
      },

      phones_count: function(){
        return parseInt(this.lead_data.phone_count);
      },

      messages_count: function(){
        return parseInt(this.lead_data.message_count);
      },

      visible_specialists: function(){
        var ids = [];

        if('object' == typeof(this.lead_data.meta.specialists_assigned)){
          for(var _id in this.lead_data.meta.specialists_assigned){
             if(this.lead_data.meta.specialists_assigned[_id] == 'yes'){
               ids.push( parseInt(_id) );
             }
          }
        }

        var data =  Object.values(specialists_data).filter(el =>{
          return ids.indexOf( el.user_id ) >=0;
        });

        return data;
      },

      visible_specialists_tco: function(){
        var ids = [];

        if('object' == typeof(this.lead_data.meta.specialists_assigned_tco)){
          for(var _id in this.lead_data.meta.specialists_assigned_tco){
             if(this.lead_data.meta.specialists_assigned_tco[_id] == 'yes'){
              ids.push( parseInt(_id) );
             }
          }
        }

        var data =  Object.values(specialists_data).filter(el =>{
          return ids.indexOf( el.user_id ) >=0;
        });

        return data;
      },

      treatment_data  : function(){
        return this.lead_data.meta.treatment_data? this.lead_data.meta.treatment_data : [];
      },

      balance   : function(){
        return '';
      },

      enquery_notes_c: function(){
        var notes = this.lead_data.meta.lead_notes;
        var notes_c = [];
        var counter = 0;

        if(!notes){
          return notes_c;
        }

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.enquery_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      tco_notes_c : function(){
        var notes = this.lead_data.meta.lead_notes_tco;
        var notes_c = [];
        var counter = 0;

        if(!notes){
          return notes_c;
        }

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.tco_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      enquery_notes_count_c: function(){
        var counter = 0;
        var notes = this.lead_data.meta.lead_notes;

        if(!notes){
          return counter;
        }

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      tco_notes_count_c : function(){
        var counter = 0;
        var notes = this.lead_data.meta.lead_notes_tco;

        if(!notes){
          return counter;
        }
        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      phones_tco: function(){
        return parseInt(this.lead_data.phone_count_tco);
      },

      messages_tco: function(){
         return parseInt(this.lead_data.message_count_tco);
      },

      patient_data : function(){
        return 0;
      },

      visible_specialists_show_select: function(){
        return true;
        if(!this.lead_data.meta.specialists_assigned){
          return true;
        }
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned)){

          for(var _id in this.lead_data.meta.specialists_assigned){
             if(this.lead_data.meta.specialists_assigned[_id] == 'yes'){
              id = _id;
             }
          }
        }

        var _class =  parseInt(id) > 0? false: true;

        return _class;

      },

      visible_specialists_show_select_tco: function(){
        return true;
        if(!this.lead_data.meta.specialists_assigned_tco){
          return true;
        }
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned_tco)){

          for(var _id in this.lead_data.meta.specialists_assigned_tco){
             if(this.lead_data.meta.specialists_assigned_tco[_id] == 'yes'){
              id = _id;
             }
          }
        }
        var _class =  parseInt(id) > 0? false: true;
        return _class;
      },
  },

  mounted: function(){
    var vm = this;

    Vue.nextTick(function(){
      vm.$forceUpdate();
    })
  },

  methods: {
    go_back_to_list: function(){
      this.visible = false;
      this.$parent.show_list = true;
    },


    update_treatment_data: function(e, key){
      if(typeof(e.val)  !== 'undefined'){
        this.lead_data.meta.treatment_data[key][e.name] = e.val;

        var total = 0;

        for(var id in this.lead_data.meta.treatment_data){
          total += get_sum_from_price(this.lead_data.meta.treatment_data[id].billed);
        }

        this.$set(this.lead_data.meta.treatment_value, 'value', '£' + formatMoney(total,2, '.',','));

        this.requre_save = true;
      }
    },

    add_treatment_dentist: function(){
      this.lead_data.meta.treatment_data.push({
        'treatment': '',
        'dentist': '',
        'billed' : 0,
        'payment_method': ''
      });

      var vm = this;
      Vue.nextTick(function(){

       var select_id = vm.lead_data.meta.treatment_data.length - 1;

        if(is_dentist === 'yes'){
          vm.$refs['select_dentist'][select_id].set_value('selected', dentist_name);
        }
      })

      this.requre_save = true;
    },

    price_to_value: function(ref){
      var summ = (!!this.lead_data.meta.treatment_value.value)? this.lead_data.meta.treatment_value.value : 0;

      switch(ref){
        case 'price_input_field':
          var summ = (!!this.lead_data.meta.treatment_value.value)? this.lead_data.meta.treatment_value.value : 0;
          break;
        case 'input_billed':
          var summ = (!!this.lead_data.meta.treatment_value.billed)? this.lead_data.meta.treatment_value.billed : 0;
          break;
      }
      summ = get_sum_from_price(summ);
      this.$refs[ref].set_value(summ);
    },

    update_dates: function(){
      // console.log(this);
    },

    value_to_price: function(ref){
      switch(ref){
        case 'price_input_field':
          var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.value,2, '.',',');
          break;
        case 'input_billed':
          var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.billed,2, '.',',');
          break;
      }
       this.$refs[ref].set_value(summ);
    },

    treatment_data_selects: function(){
      var vm = this;
      var total = 0;

      if(!vm.lead_data.meta.treatment_data){
      }

      for(var id in vm.lead_data.meta.treatment_data){
       var select_id = id;
       var data = vm.lead_data.meta.treatment_data[id];

       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          icon: icons_selects['human'],
          options: available_dentists,
          selected: data['dentist'],
        };

        for( var i in props){
          vm.$refs['select_dentist'][select_id].set_value(i, props[i]);
        }


       vue_select_components.push(vm.$refs['select_dentist'][select_id]);

       var props =  {
          icon: icons_selects['treatments'],
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: treatments,
          selected: data['treatment']
        };

        for( var i in props){
          vm.$refs['select_treatment'][select_id].set_value(i, props[i]);
        }

        vue_select_components.push(vm.$refs['select_treatment'][select_id]);

       var props =  {
          icon: icons_selects['currency'],
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: payment_methods,
          selected: data['payment_method']? data['payment_method']: 'Payment Method',
        };

        for( var i in props){
          vm.$refs['select_payment_method'][select_id].set_value(i, props[i]);
        }


        vue_select_components.push(vm.$refs['select_payment_method'][select_id]);
        vm.$refs.select_billed[select_id].set_value( data['billed']);


        total += get_sum_from_price(data['billed']);
      }

      if(!vm.lead_data.meta.treatment_value){
        vm.$set(vm.lead_data.meta, 'treatment_value', {});
      }
       vm.$set(vm.lead_data.meta.treatment_value, 'value', total);
    },

    exec_save: function(){
      if(this.requre_save){
        this.show_confirmation_popup = true;
      }
    },

    change_stage_popup_cb:function(data){
      this.lead_data.lead_stage = data.stage;
      this.save_lead_meta(false);
    },

    save_lead_meta: function(key_meta, key_this){
      console.log('save_lead_meta');
      var vm = this;

      if (vm.deleting_lead){
        return;
      }

      if(typeof(key_meta) !== 'string'){
        var meta = {
          patient_data          : this.lead_data.meta.patient_data,
          treatment_data        : this.lead_data.meta.treatment_data,
          treatment_value       : this.lead_data.meta.treatment_value,
          treatment_coordinator : this.lead_data.meta.treatment_coordinator,
          lead_notes            : this.lead_data.meta.lead_notes,
          lead_notes_tco        : this.lead_data.meta.lead_notes_tco,
          reminder              : this.lead_data.meta.reminder,
          text_messages         : this.lead_data.meta.text_messages,
          tco_data              : this.lead_data.meta.tco_data,
          lead_stage            : this.lead_data.lead_stage,
        };
      }else{
        var  meta = {};
        meta[key_meta] = this.lead_data.meta[key_this];
      }

      var posted_data = {
        confirmed: 0,
        meta: meta,
        action                : 'update_lead_meta',
        lead_data             : { lead_id: this.lead_data.ID },
        nonce                 : jQuery('[name=lead_data]').val(),
      };

      var no_popup_keys = [
        'tco_data',
        'lead_notes',
        'lead_notes_tco',
        'text_messages',
      ];


      if((!this.lead_data.meta.patient_data.name || !this.lead_data.meta.patient_data.phone || !this.lead_data.meta.patient_data.email)){

        if(!this.lead_data.meta.patient_data.phone){
          jQuery('input[name=phone]').addClass('error');
        }

        if(!this.lead_data.meta.patient_data.name){
          jQuery('input[name=name]').addClass('error');
        }

        if(!this.lead_data.meta.patient_data.email){
          jQuery('input[name=email]').addClass('error');
        }
        return false;
      }

      var vm = this;

      var no_block_keys = [
        'tco_data',
        'lead_notes',
        'lead_notes_tco',
        'text_messages',
      ];

      if( no_block_keys.indexOf(key_meta) < 0){
        wait_block.show();
      }

      for(var _id in meta){
        if(_id != 'lead_stage'){
          this.save_parent_meta(this.lead_data.ID, meta[_id], _id, true);
        }else{
          this.save_parent_meta(this.lead_data.ID, meta[_id], _id, false);
        }
      }

      var fmt = new DateFormatter();
      var today = new Date();

      this.save_parent_meta(this.lead_data.ID,  fmt.formatDate(today, 'Y-m-d H:i:s'), 'post_modified',  false)

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: posted_data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
           vm.requre_save = false;
        },

        success: function(data, textStatus, xhr) {
           console.log(data);

          // if(data.reload){
          //   location.href = data.url;
          //   // wait_block.show();
          // }

          // jQuery('.button-create span').text('Save Changes');
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);

            if(response_text.data[0] === 'name was found'){
              var confirm = window.confirm("Are you sure you want to add lead for " + vm.patient_data.name +'? Lead for patient with this name already exists');

              // console.log(confirm);

              if(confirm){
                posted_data.confirmed= 1;
                wait_block.show();
                vm.second_request(posted_data)
              }

            }else{
              alert(response_text.data[0]);
            }
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
    },

    second_request: function(posted_data){
      var vm = this;
      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: posted_data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
          // console.log(data);
          vm.$refs.lead_id_input.set_value(data.post_id);
          jQuery('.button-create span').text('Save Changes');
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            // console.log(xhr);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
    },

    update_lead: function(data, key){

      if('object' === typeof(data)){
        if(key === 'treatment_coordinator' && data.name === 'specialist' ){
          if('undefined' === typeof(this.lead_data.meta[key][data.name])){
            this.lead_data.meta[key][data.name] = []
          }

          if(this.lead_data.meta[key][data.name].indexOf(data.val) < 0){
            this.lead_data.meta[key][data.name].push(data.val);
          }else{
            var ind = this.lead_data.meta[key][data.name].indexOf(data.val);
            this.lead_data.meta[key][data.name].splice(ind, 1);
          }

        }else if(key === 'treatment_value' && data.name === 'treatment' ){
          if('undefined' === typeof(this.lead_data.meta[key][data.name])){
            this.lead_data.meta[key][data.name] = []
          }
          if(this.lead_data.meta[key][data.name].indexOf(data.val) < 0){
            this.lead_data.meta[key][data.name].push(data.val);
          }else{
            var ind = this.lead_data.meta[key][data.name].indexOf(data.val);
            this.lead_data.meta[key][data.name].splice(ind, 1);
          }
        }else{
          if('object' === typeof(this.lead_data.meta[key])){
            this.$set(this.lead_data.meta[key], data.name, data.val);
          }
          if('string' === typeof(this.lead_data.meta[key])){
            this.$set(this.lead_data.meta, key, data.val);
          }
        }

        this.requre_save = true;
        var vm = this;

        Vue.nextTick(function(){
          vm.$forceUpdate();
        });
      }
    },

    update_lead_stage: function(data, key){
      this.lead_data.lead_stage_prev = this.lead_data.lead_stage ;
      this.lead_data.lead_stage = data.val;
    },

    save_new_stage: function(){

      if(this.lead_data.lead_stage === this.lead_data.lead_stage_prev){
        this.show_confirmation_popup = false;
        return true;
      }

      var list_id_prev  = this.lead_data.lead_stage_prev;
      var list_id       = this.lead_data.lead_stage ;
      var user_name     = this.lead_data.user_name;
      var user_id       = this.lead_data.user_id;
      var post_id       = this.lead_data.ID;

      jQuery(document.body).trigger('update_lead_log', {
        post_id: post_id,
        list_id_prev: list_id_prev,
        list_id_new: list_id,
        user_name: user_name ,
        user_id:   user_id ,
        event: 'stage_changed'
      });

      jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

      this.show_confirmation_popup = false;
    },

    do_delete_or_return: function(){
      this.deleting_lead = true;
      var vm = this;

      wait_block.show();


      if(parseInt(this.lead_data.lead_id) === -1){
        wait_block.hide();
      }else{
        var data = {
          action  : 'delete_lead',
          lead_id : parseInt(this.lead_data.ID),
        };

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
           clog(xhr)
        },

        success: function(data, textStatus, xhr) {
          if('undefined' != typeof(data.redirect)){
            // location.href = data.redirect;
          }

          var index =  vm.$parent.leads.findIndex(el =>{
            return el.ID == vm.lead_data.ID;
          })
          vm.$parent.leads.splice(index,1);
          vm.visible = false;
          vm.$parent.show_list = true
        },

        error: function(xhr, textStatus, errorThrown) {
          clog(xhr);
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
      }
    },

    add_note: function(type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

      if(!this.note_text && type == 'enquery'){
        alert('Please enter some text');
        return false;
      }else  if(!this.note_text_tco && type == 'tco'){
        alert('Please enter some text');
        return false;
      }

      var date = new Date();
      var fmt  = new DateFormatter();
      var date_formatted =  fmt.formatDate(date, 'F d Y') + ' at ' + fmt.formatDate(date, 'H:i');

      var new_note = {
        'date'       : date_formatted,
        'user_name'  : this.lead_data.user_name,
        'user_id'    : this.lead_data.user_id,
        'text'       : (type== 'enquery')? this.note_text : this.note_text_tco,
        'is_manager' : is_manager,
        'done'       : 'no',
        'show'       : 1,
      };

      if(type == 'enquery'){

        if(!this.lead_data.meta.lead_notes){
          this.$set(this.lead_data.meta, 'lead_notes', []);
        }

        this.lead_data.meta.lead_notes.push(new_note);
        this.note_text = '';
        this.$refs.note_textarea.style.height = '';
        this.save_lead_meta('lead_notes', 'lead_notes');
      }else if (type =='tco'){

        if(!this.lead_data.meta.lead_notes_tco){
          this.$set(this.lead_data.meta, 'lead_notes_tco', []);
        }

        this.lead_data.meta.lead_notes_tco.push(new_note);
        this.note_text_tco = '';
        this.$refs.note_textarea_tco.style.height = '';
        this.save_lead_meta('lead_notes_tco', 'lead_notes_tco');
      }
    },

    delete_note: function(key , type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

     if(type == 'enquery'){
        key = this.lead_data.meta.lead_notes.length - key - 1;
        this.lead_data.meta.lead_notes[key].show = 0;
        this.save_lead_meta('lead_notes', 'lead_notes');
      }
     if(type == 'tco'){
        key = this.lead_data.meta.lead_notes_tco.length - key - 1;
        this.lead_data.meta.lead_notes_tco[key].show = 0;
        this.save_lead_meta('lead_notes_tco', 'lead_notes_tco');
      }
    },

    mark_note_done: function(key, val, type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

      if(type == 'enquery'){
        key = this.lead_data.meta.lead_notes.length - key - 1;
        this.lead_data.meta.lead_notes[key].done = val;
        this.save_lead_meta('lead_notes', 'lead_notes');
      }
      if(type == 'tco'){
        key = this.lead_data.meta.lead_notes_tco.length - key - 1;
        this.lead_data.meta.lead_notes_tco[key].done = val;
        this.save_lead_meta('lead_notes_tco', 'lead_notes_tco');
      }
    },

    update_specialists: function(event, type){

      if('undefined' !== typeof(event.val) ){
        if(this.lead_data.ID < 0){
          alert('Create lead before assigning it to a specialist, please');
          return false;
        };

        var data =  Object.values(specialists_data).filter(el =>{
          return el.name == event.val})[0];


        switch(type){
          case 'tco':
            if(!this.lead_data.meta.specialists_assigned_tco){
              this.lead_data.meta.specialists_assigned_tco = {};

              for(var id of specialists_data){
                this.lead_data.meta.specialists_assigned_tco[id.user_id] = 'no';
              }
            }
            this.$set( this.lead_data.meta.specialists_assigned_tco, data.user_id, 'yes');
            break;

          default:
            if(!this.lead_data.meta.specialists_assigned){
              this.lead_data.meta.specialists_assigned = {};
            }
            // this.lead_data.meta.specialists_assigned[data.user_id] = 'yes';
            this.$set( this.lead_data.meta.specialists_assigned, data.user_id, 'yes');
            break;
        };

        // this.requre_save = true;
        this.save_specialists_meta();
      };
    },

    assign_specialist: function(){
      // this.selected_specialist = false;
      // this.save_sepcialists_meta();
    },

    remove_specialist: function(name){
      if(window.confirm("Confirm unassigning " + name + " from this lead")){
          var ids = this.visible_specialists.map(el=>{return el.user_id});

          for( var id of ids){
            this.lead_data.meta.specialists_assigned[id] = 'no';
            this.lead_data.meta.specialists_assigned_tco[id] = 'no';
          }

        // this.specialists_data[name].show = 'no';
        // this.specialists_data[name].show_tco = 'no';
        // this.save_specialists_meta();

        // jQuery(document.body).trigger('update_lead_log', {
        //   post_id     : parseInt(this.lead_data.lead_id),
        //   nonce       : jQuery('[name=lead_data]').val(),
        //   user_name   : this.lead_data.user_name,
        //   user_id     : this.lead_data.user_id,
        //   event       : 'specialist_updated',
        //   text: 'Unassined from ' +  name + ' by ' + this.lead_data.user_name,
        // })
      }
    },

    save_specialists_meta: function(){
      var meta     = {};
      var meta_tco = {};

      for(id in specialists_data){
        meta[specialists_data[id].user_id] = this.lead_data.meta.specialists_assigned[specialists_data[id].user_id]? this.lead_data.meta.specialists_assigned[specialists_data[id].user_id]:'no';
        meta_tco[specialists_data[id].user_id] = this.lead_data.meta.specialists_assigned_tco[specialists_data[id].user_id]? this.lead_data.meta.specialists_assigned_tco[specialists_data[id].user_id]:'no';;
      }

      var data = {
        meta: {
          lead_specialists: meta,
          lead_specialists_tco: meta_tco,
        },
        action                : 'update_lead_specialist_meta',
        lead_data             : this.lead_data,
        nonce                 : jQuery('[name=lead_data]').val(),
      };

      data.lead_data.lead_id = this.lead_data.ID;

      var vm = this;
      wait_block.show();

      for(var _id in meta){
        if(_id != 'lead_stage'){
          this.save_parent_meta(this.lead_data.ID, meta[_id], _id, true);
        }else{
          this.save_parent_meta(this.lead_data.ID, meta[_id], _id, false);
        }
      }

      var fmt = new DateFormatter();
      var today = new Date();

      this.save_parent_meta(this.lead_data.ID,  fmt.formatDate(today, 'Y-m-d H:i:s'), 'post_modified',  false)

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
          // console.log(data);
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
    },


    load_file: function(){
      // console.log('load_file');

      wait_block.show();

      var file_pierces = this.$refs.file_input.value.split('\\');
      var file_name = file_pierces[file_pierces.length-1];
      var file = jQuery(this.$refs.file_input).prop('files')[0];
      var fd   = new FormData();

      var vm = this;

      fd.append('file',file);
      fd.append('lead_id',this.lead_data.ID);
      fd.append('user_name','unknown');
      fd.append('action', 'upload_new_document');

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        processData: false,
        contentType: false,
        data: fd,

        complete: function(xhr, textStatus) {
          vm.new_file = '';
          wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
          vm.lead_data.meta.lead_files.push(data.file_data);
          vm.save_parent_meta(vm.lead_data.ID, vm.lead_data.meta.lead_files, 'lead_files', true);
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
         }
      })
    },


    remove_file: function(file_id){
      var vm = this;

      if(window.confirm("Confirm deleting file " + this.files[file_id].name)){

        var file_data = vm.files[file_id];

        vm.files.splice(file_id, 1);

        var data = {
          file_data: file_data,
          lead_id: vm.lead_data.lead_id,
          user_name: vm.lead_data.user_name,
          action: 'delete_file_from_lead',
        };

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      }
    },

    do_file_changed: function(){
      var file_pierces = this.$refs.file_input.value.split('\\');
      var file_name = file_pierces[file_pierces.length-1];
      this.new_file = file_name;

      console.log(file_name)
    },

    change_phone: function(action){
      var phone = this.lead_data.phone_count;

      if(action === 'add'){
        phone++;
      }

      if(action === 'remove'){
        phone--;
      }

      phone = Math.max(0, phone);
      this.lead_data.phone_count = Math.min(3, phone);

      this.save_parent_meta(this.lead_data.ID, this.lead_data.phone_count, 'phone_count');

      var data = {
        lead_id: this.lead_data.ID,
        count: this.lead_data.phone_count,
        action: 'save_phones_count',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        success: function(data, textStatus, xhr) {
          // console.log(data);
         },
      })
    },


    change_message: function(action){
      var messages = this.lead_data.message_count;
      if(action === 'add'){
        messages++;
      }

      if(action === 'remove'){
        messages--;
      }

      messages = Math.max(0, messages);
      this.lead_data.message_count = Math.min(3, messages);

      this.save_parent_meta(this.lead_data.ID, this.lead_data.message_count, 'message_count');

      var data = {
        lead_id: this.lead_data.ID,
        count:   this.lead_data.message_count,
        action:  'save_messages_count',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        success: function(data, textStatus, xhr) {
          // console.log(data);
        },
      })
    },


    save_parent_meta: function(item_id, value, param, meta){
      var vm = this;
      var index = vm.$parent.leads.findIndex(el=>{return item_id == el.ID});
      if(meta){
        vm.$parent.$set(vm.$parent.leads[index]['meta'], param, value);
      }else{
        vm.$parent.$set(vm.$parent.leads[index], param, value);
      }
    },

    change_phone_tco: function(action){
      var vm= this;
      switch(action){
        case 'add':
         vm.lead_data.phone_count_tco = 1;
         break;
        case 'remove':
         vm.lead_data.phone_count_tco = 0;
         break;
      }

      this.save_parent_meta(this.lead_data.ID, this.lead_data.phone_count_tco, 'phone_count_tco');

      var data = {
        lead_id: vm.lead_data.ID,
        count: vm.lead_data.phones_tco,
        action: 'save_phones_count_tco',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {

        },

        success: function(data, textStatus, xhr) {
          // console.log(data);
         },

        error: function(xhr, textStatus, errorThrown) {

        }
      })
    },

    change_message_tco: function(action){
      var vm= this;
      switch(action){
        case 'add':
         vm.lead_data.message_count_tco = 1;
         break;
        case 'remove':
         vm.lead_data.message_count_tco = 0;
         break;
      }

      this.save_parent_meta(this.lead_data.ID, this.lead_data.message_count_tco, 'message_count_tco');

      var data = {
        lead_id: this.lead_data.ID,
        count: this.lead_data.message_count_tco,
        action: 'save_messages_count_tco',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {

        },
      })
    },


    clear_reminder: function(){
      this.lead_data.meta.reminder = '';
    },


    /**
    * show single lead on click on a lead item on a list
    */
    show_single_lead: function(id){
      clog(id, 0 , 1);
    },

    close_tab: function(){
      window.close();
    },

    send_text_message: function(){
      var phone = this.lead_data.meta.patient_data.phone;
      var vm = this;


      if(!phone || phone.length < 4){
        alert('phone not set');
        return;
      }

      if(!this.message_to_client ){
        alert('Type a message, please');
        return;
      }

      if(!this.sms_data ){
        alert('Messaging center is not configured');
        return;
      }

      var data = {
        sms_data: this.sms_data,
        phone: phone,
        text: this.message_to_client,
      };

      vm.message_to_client = '';


      jQuery.ajax({
        url: WP_URLS.theme_url+"/messaging/twilio_send.php",
        type: 'POST',
        dataType: 'json',
        data: data,
      })

      .done(function(e) {
        if(e.error){
          alert(e.error);
        }else{
         var date_sent = moment().format('MMM Do YY, h:mm:ss a');

         if(vm.text_messages){
            vm.text_messages.push({
              'body'      :  vm.message_to_client,
              'date_sent' : date_sent,
              'type'      : 'we',
              'status'    : 'sent',
            });

          vm.save_lead_meta('text_messages', 'text_messages');
          }

          vm.message_to_client = '';

          Vue.nextTick(function(){
            jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
          })
        }
      })

      .fail(function() {
      })

      .always(function(e) {
        console.log(e);
      });
    },


    update_text_messages: function(){
      if (this.deleting_lead){
        return;
      }

      var phone = this.patient_data.phone;
      var vm = this;

      var data = {
        sms_data: this.sms_data,
        phone: phone,
      };

      jQuery.ajax({
        url: WP_URLS.theme_url+"/messaging/twilio_update_msg.php",
        type: 'POST',
        dataType: 'json',
        data: data,
      })

      .done(function(e) {
        if(e.error){
          alert(e.error);
        }else{

          if (vm.deleting_lead){
            return;
          }

          vm.text_messages = e.messages;
          vm.save_lead_meta('text_messages', 'text_messages');
          vm.intial_load = false;

          if(vm.text_messages.length < e.messages.length){
            if(! vm.intial_load ){
              var message = e.messages[e.messages.length-1];
            }
          }

        }
      })

      .fail(function() {
      })

      .always(function(e) {
        jQuery('._messages').removeClass('hidden');
        jQuery('.preloader-messages').addClass('hidden');
      });
    }
  },



  template: '#lead-single-tmpl',

})
Vue.component('comp-new-lead', {
  data: function(){
    return {
      visible: false,
      lead_data: {
        phone_count: 0,
        message_count: 0,
        phone_count_tco: 0,
        message_count_tco: 0,
        meta: {
          treatment_value: {
            billed    : 0,
            value     : 0,
            terms     : '',
            mounthly  : '',
            date_end : '',
          },

          reminder: '',
          specialists_assigned: false,
          specialists_assigned_tco: false,
          tco_data: {
            'digital' : false,
            'tco' : false,
            'dentist' : false,
            'attended' : false,
            'fta_cancelled' : false,
            'tax' : false,
          },

          patient_data: {
            name: '',
            phone: '',
            email: '',
            source: '',
            treatment: '',
            clinic: '',
            campaign: '',
          },
          treatment_data: [],
        },
      },
      balance: 0,
      enquery_notes_count: 1,
      tco_notes_count: 1,
      text_messages_to_show: 2,
      note_text: '',
      note_text_tco : '',
      file_changed   : '',
      new_file  : '',
      specialists_data: specialists_data,
      requre_save: false,
      show_confirmation_popup: false,
      text_messages: false,
      message_to_client: '',
    };
  },

  watch: {
    show_confirmation_popup: function(){
      this.$refs.popup._stage = this.lead_data.lead_stage;
      this.$refs.popup.show_confirmation_popup = true;
    },

    text_messages_to_show: function(val){
      if(val > 2){
        Vue.nextTick(function(){
          jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
        })
      }
    },
    'lead_data.meta.patient_data.name': function(){
      jQuery('input[name=name]').removeClass('error');
    },

    'lead_data.meta.patient_data.phone': function(){
      jQuery('input[name=phone]').removeClass('error');
    },

    'lead_data.meta.patient_data.email': function(){
      jQuery('input[name=email]').removeClass('error');
    },

    note_text: function(){
      this.$refs.note_textarea.style.height = '';
      this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
    },

    note_text_tco: function(){
      this.$refs.note_textarea_tco.style.height = '';
      this.$refs.note_textarea_tco.style.height = this.$refs.note_textarea.scrollHeight + 'px';
    },

    visible: function(show){
      var vm = this;

      console.log('visible')

      if(show){
        this.treatment_data_selects();
        this.requre_save  = false;
      }else{
        this.enquery_notes_count  = 1;
        this.tco_notes_count  = 1;
        this.note_text  = '';
        this.note_text_tco   = '';
        this.files_updated   = '';
        this.file_changed     = '';
        this.specialists_data  = specialists_data;
        this.requre_save  = false;
        this.show_confirmation_popup  = false;

        var lead_data = {
            phone_count: 0,
            message_count: 0,
            phone_count_tco: 0,
            message_count_tco: 0,
            meta: {
              treatment_value: {
                billed    : 0,
                value     : 0,
                terms     : '',
                mounthly  : '',
                date_end : '',
              },

              reminder: '',
              specialists_assigned: false,
              specialists_assigned_tco: false,
              tco_data: {
                'digital' : false,
                'tco' : false,
                'dentist' : false,
                'attended' : false,
                'fta_cancelled' : false,
                'tax' : false,
              },

              patient_data: {
                name: '',
                phone: '',
                email: '',
                source: '',
                treatment: '',
                clinic: '',
                campaign: '',
              },
              treatment_data: [],
            },
          };

          this.$set(this, 'lead_data', lead_data);
      }
    },


      'lead_data.meta.treatment_value.billed': function(val){

        var balance = get_sum_from_price(this.lead_data.meta.treatment_value.value) - get_sum_from_price(this.lead_data.meta.treatment_value.billed);


        this.lead_data.meta.treatment_value.terms = get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.lead_data.meta.treatment_value.mounthly =  get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },


      'lead_data.meta.treatment_value.value': function(val){

        var balance = get_sum_from_price(this.lead_data.meta.treatment_value.value) - get_sum_from_price(this.lead_data.meta.treatment_value.billed);

        this.lead_data.meta.treatment_value.terms = get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 'Full Payment' :  '12 Months';

        this.lead_data.meta.treatment_value.mounthly =  get_sum_from_price(this.lead_data.meta.treatment_value.value) === get_sum_from_price(this.lead_data.meta.treatment_value.billed)? 0 : balance/12;
        this.balance = formatMoney(balance,2, '.',',');
      },
  },

  computed: {
      text_messages_shown: function(){
        if(this.text_messages_to_show  == 2 && this.text_messages.length > 2){
          var messages = [];
          for(var i = 2; i > 0 ; i--){
          messages.push(this.text_messages[this.text_messages.length - i]);
          }
          return messages;
        }else{
          return this.text_messages;
        }
      },

      file_is_prepared: function(){
        return this.new_file.length > 0
      },

      files_updated: function(){
        return this.lead_data.meta.lead_files;
      },

      get_treatment_value: function(){
        return this.lead_data.meta.treatment_value.value;
      },

      get_billed_value: function(){
        return this.lead_data.meta.treatment_value.billed;
      },

      get_terms_count: function(){
        $return = 1;
        switch(this.lead_data.meta.treatment_value.terms){
          case '12 Months':
             $return = 12;
            break;
          case '18 Months':
             $return = 18;
            break;
          case '24 Months':
             $return = 24;
            break;
          case '36 Months':
             $return = 36;
            break;
          case '48 Months':
             $return = 48;
            break;
          default:
             $return = 1;
            break;
        }

        return  $return;
      },

      monthly_payment: function(){
        var billed = get_sum_from_price(this.get_billed_value);
        var summ = (get_sum_from_price(this.get_treatment_value) - get_sum_from_price(this.get_billed_value))/this.get_terms_count;
        summ = summ.toFixed(2);
        this.lead_data.meta.treatment_value.mounthly = summ;
        return   '£'+ formatMoney(summ, 2, ".", ",");
      },

      select_data: function(){
        return {
          clinics: clinics,
          sources: theme_leads_sources,
          campaigns: campaigns,
          treatments: treatments,
          specialists: specialists,
          specialists_tco: specialists_tco,
          payment_methods: payment_methods,
          available_dentists: available_dentists,
        };
      },

      lead_status:function(){
        if(this.lead_data.is_converted == 'yes'){
          return {
            text: 'Converted Lead',
            class: 'converted',
          }

        }else if (this.lead_data.is_failed == 'yes'){
          return {
            text: 'Failed Lead',
            class: 'failed',
          }
        }else{
          return {
            text: 'Opened Lead',
            class: 'opened',
          }
        }
      },

      messages_left : function(){
        return Math.max(0, 3 - this.lead_data.message_count);
      },

      phones_left : function(){
        return Math.max(0, 3 - parseInt(this.lead_data.phone_count));
      },

      phones_count: function(){
        return parseInt(this.lead_data.phone_count);
      },

      messages_count: function(){
        return parseInt(this.lead_data.message_count);
      },

      visible_specialists: function(){
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned)){

          for(var _id in this.lead_data.meta.specialists_assigned){
             if(this.lead_data.meta.specialists_assigned[_id] == 'yes'){
              id = parseInt(_id);
             }
          }
        }

        if(id < 0){
          return [];
        }

        var data =  Object.values(specialists_data).filter(el =>{
          return el.user_id == id});

        return data;
      },

      visible_specialists_tco: function(){
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned_tco)){

          for(var _id in this.lead_data.meta.specialists_assigned_tco){
             if(this.lead_data.meta.specialists_assigned_tco[_id] == 'yes'){
              id = parseInt(_id);
             }
          }
        }

        if(id < 0){
          return [];
        }

        var data =  Object.values(specialists_data).filter(el =>{
          return el.user_id == id});

        return data;
      },

      treatment_data  : function(){
        return this.lead_data.meta.treatment_data? this.lead_data.meta.treatment_data : [];
      },

      balance   : function(){
        return '';
      },

      enquery_notes_c: function(){
        var notes = this.lead_data.meta.lead_notes;
        var notes_c = [];
        var counter = 0;

        if(!notes){
          return notes_c;
        }

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.enquery_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      tco_notes_c : function(){
        var notes = this.lead_data.meta.lead_notes_tco;
        var notes_c = [];
        var counter = 0;

        if(!notes){
          return notes_c;
        }

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1 && counter < this.tco_notes_count){
              note.key =  notes.length -1 - id;
              notes_c.push(note);
              counter++;
           }
        }

        return notes_c;
      },

      enquery_notes_count_c: function(){
        var counter = 0;
        var notes = this.lead_data.meta.lead_notes;

        if(!notes){
          return counter;
        }

        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      tco_notes_count_c : function(){
        var counter = 0;
        var notes = this.lead_data.meta.lead_notes_tco;

        if(!notes){
          return counter;
        }
        for (var id = notes.length -1; id >= 0;  id--) {
          var note = notes[id];

           if(note.show == 1){
              counter++;
           }
        }

        return counter;
      },

      phones_tco: function(){
        return parseInt(this.lead_data.phone_count_tco);
      },

      messages_tco: function(){
         return parseInt(this.lead_data.message_count_tco);
      },

      patient_data : function(){
        return 0;
      },

      visible_specialists_show_select: function(){
        if(!this.lead_data.meta.specialists_assigned){
          return true;
        }
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned)){

          for(var _id in this.lead_data.meta.specialists_assigned){
             if(this.lead_data.meta.specialists_assigned[_id] == 'yes'){
              id = _id;
             }
          }
        }

        var _class =  parseInt(id) > 0? false: true;

        return _class;

      },

      visible_specialists_show_select_tco: function(){
        if(!this.lead_data.meta.specialists_assigned_tco){
          return true;
        }
        var id = -1;

        if('object' == typeof(this.lead_data.meta.specialists_assigned_tco)){

          for(var _id in this.lead_data.meta.specialists_assigned_tco){
             if(this.lead_data.meta.specialists_assigned_tco[_id] == 'yes'){
              id = _id;
             }
          }
        }
        var _class =  parseInt(id) > 0? false: true;
        return _class;
      },
  },

  mounted: function(){
    var vm = this;

    Vue.nextTick(function(){
      vm.$forceUpdate();
    })
  },

  methods: {
    go_back_to_list: function(){
      this.visible = false;
      this.$parent.show_list = true;
    },


    update_treatment_data: function(e, key){
      if(typeof(e.val)  !== 'undefined'){
        this.lead_data.meta.treatment_data[key][e.name] = e.val;

        var total = 0;

        for(var id in this.lead_data.meta.treatment_data){
          total += get_sum_from_price(this.lead_data.meta.treatment_data[id].billed);
        }

        this.$set(this.lead_data.meta.treatment_value, 'value', '£' + formatMoney(total,2, '.',','));

        this.requre_save = true;
      }
    },

    add_treatment_dentist: function(){
      this.lead_data.meta.treatment_data.push({
        'treatment': '',
        'dentist': '',
        'billed' : 0,
        'payment_method': ''
      });

      var vm = this;
      Vue.nextTick(function(){

       var select_id = vm.lead_data.meta.treatment_data.length - 1;

        if(is_dentist === 'yes'){
          vm.$refs['select_dentist'][select_id].set_value('selected', dentist_name);
        }
      })

      this.requre_save = true;
    },

    price_to_value: function(ref){
      var summ = (!!this.lead_data.meta.treatment_value.value)? this.lead_data.meta.treatment_value.value : 0;

      switch(ref){
        case 'price_input_field':
          var summ = (!!this.lead_data.meta.treatment_value.value)? this.lead_data.meta.treatment_value.value : 0;
          break;
        case 'input_billed':
          var summ = (!!this.lead_data.meta.treatment_value.billed)? this.lead_data.meta.treatment_value.billed : 0;
          break;
      }
      summ = get_sum_from_price(summ);
      this.$refs[ref].set_value(summ);
    },

    update_dates: function(){
      // console.log(this);
    },

    value_to_price: function(ref){
      switch(ref){
        case 'price_input_field':
          var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.value,2, '.',',');
          break;
        case 'input_billed':
          var summ = '£' + formatMoney(this.lead_data.meta.treatment_value.billed,2, '.',',');
          break;
      }
       this.$refs[ref].set_value(summ);
    },

    treatment_data_selects: function(){
      var vm = this;
      var total = 0;

      if(!vm.lead_data.meta.treatment_data){
      }

      for(var id in vm.lead_data.meta.treatment_data){
       var select_id = id;
       var data = vm.lead_data.meta.treatment_data[id];

       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          icon: icons_selects['human'],
          options: available_dentists,
          selected: data['dentist'],
        };

        for( var i in props){
          vm.$refs['select_dentist'][select_id].set_value(i, props[i]);
        }


       vue_select_components.push(vm.$refs['select_dentist'][select_id]);

       var props =  {
          icon: icons_selects['treatments'],
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: treatments,
          selected: data['treatment']
        };

        for( var i in props){
          vm.$refs['select_treatment'][select_id].set_value(i, props[i]);
        }

        vue_select_components.push(vm.$refs['select_treatment'][select_id]);

       var props =  {
          icon: icons_selects['currency'],
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: payment_methods,
          selected: data['payment_method']? data['payment_method']: 'Payment Method',
        };

        for( var i in props){
          vm.$refs['select_payment_method'][select_id].set_value(i, props[i]);
        }


        vue_select_components.push(vm.$refs['select_payment_method'][select_id]);
        vm.$refs.select_billed[select_id].set_value( data['billed']);


        total += get_sum_from_price(data['billed']);
      }

      if(!vm.lead_data.meta.treatment_value){
        vm.$set(vm.lead_data.meta, 'treatment_value', {});
      }
       vm.$set(vm.lead_data.meta.treatment_value, 'value', total);
    },

    change_stage_popup_cb:function(data){
      this.lead_data.lead_stage = data.stage;
    },

    save_lead_meta: function(key_meta, key_this){
      var vm = this;

      var meta = {
        patient_data          : this.lead_data.meta.patient_data,
        treatment_data        : this.lead_data.meta.treatment_data,
        treatment_value       : this.lead_data.meta.treatment_value,
        treatment_coordinator : this.lead_data.meta.treatment_coordinator,
        lead_notes            : this.lead_data.meta.lead_notes,
        lead_notes_tco        : this.lead_data.meta.lead_notes_tco,
        reminder              : this.lead_data.meta.reminder,
        text_messages         : this.lead_data.meta.text_messages,
        tco_data              : this.lead_data.meta.tco_data,
      };


      var posted_data = {
        confirmed: 0,
        meta: meta,
        action                : 'update_lead_meta',
        lead_data             : { lead_id: -1 },
        nonce                 : jQuery('[name=lead_data]').val(),
      };

      if((!this.lead_data.meta.patient_data.name || !this.lead_data.meta.patient_data.phone || !this.lead_data.meta.patient_data.email)){

        if(!this.lead_data.meta.patient_data.phone){
          jQuery('input[name=phone]').addClass('error');
        }

        if(!this.lead_data.meta.patient_data.name){
          jQuery('input[name=name]').addClass('error');
        }

        if(!this.lead_data.meta.patient_data.email){
          jQuery('input[name=email]').addClass('error');
        }
        return false;
      }

      var vm = this;

      wait_block.show();

      var fmt = new DateFormatter();
      var today = new Date();

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: posted_data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
           vm.requre_save = false;
        },

        success: function(data, textStatus, xhr) {

            if(data.exist_leads){
              vm.$refs.exist_popup.name  = posted_data.meta.patient_data.name;
              vm.$refs.exist_popup.phone = posted_data.meta.patient_data.phone;
              vm.$refs.exist_popup.email = posted_data.meta.patient_data.email;
              vm.$refs.exist_popup.leads = data.leads;
              vm.$refs.exist_popup.leads = data.leads;
              vm.$refs.exist_popup.posted_data = posted_data;
              vm.$refs.exist_popup.show = true;
              return;
            }

           if(data.post_id > 0){
             vm.$parent.add_leads(data.new_leads);
             vm.visible = false;
             Vue.nextTick(function(){
               vm.$parent.open_lead_cb({lead_id: data.post_id});
             });
           }
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);

            if(response_text.data[0] === 'name was found'){
              var confirm = window.confirm("Are you sure you want to add lead for " + vm.patient_data.name +'? Lead for patient with this name already exists');

              // console.log(confirm);

              if(confirm){
                posted_data.confirmed= 1;
                wait_block.show();
                vm.second_request(posted_data)
              }

            }else{
              alert(response_text.data[0]);
            }
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
    },

    open_lead_cb: function(data){
      var vm = this;
       vm.visible = false;
       Vue.nextTick(function(){
         vm.$parent.open_lead_cb(data);
       });
    },

    exec_second_request : function(data){
      var vm = this;
      var posted_data = strip(data.posted_data);
      posted_data.confirmed= 1;
      wait_block.show();
      vm.second_request(posted_data)
    },

    second_request: function(posted_data){
      var vm = this;
      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: posted_data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
           if(data.post_id > 0){
             vm.$parent.add_leads(data.new_leads);
             vm.visible = false;
             Vue.nextTick(function(){
               vm.$parent.open_lead_cb({lead_id: data.post_id});
             });
           }
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            // console.log(xhr);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
    },

    update_lead: function(data, key){

      if('object' === typeof(data)){
        if(key === 'treatment_coordinator' && data.name === 'specialist' ){
          if('undefined' === typeof(this.lead_data.meta[key][data.name])){
            this.lead_data.meta[key][data.name] = []
          }

          if(this.lead_data.meta[key][data.name].indexOf(data.val) < 0){
            this.lead_data.meta[key][data.name].push(data.val);
          }else{
            var ind = this.lead_data.meta[key][data.name].indexOf(data.val);
            this.lead_data.meta[key][data.name].splice(ind, 1);
          }

        }else if(key === 'treatment_value' && data.name === 'treatment' ){
          if('undefined' === typeof(this.lead_data.meta[key][data.name])){
            this.lead_data.meta[key][data.name] = []
          }
          if(this.lead_data.meta[key][data.name].indexOf(data.val) < 0){
            this.lead_data.meta[key][data.name].push(data.val);
          }else{
            var ind = this.lead_data.meta[key][data.name].indexOf(data.val);
            this.lead_data.meta[key][data.name].splice(ind, 1);
          }
        }else{
          if('object' === typeof(this.lead_data.meta[key])){
            this.$set(this.lead_data.meta[key], data.name, data.val);
          }
          if('string' === typeof(this.lead_data.meta[key])){
            this.$set(this.lead_data.meta, key, data.val);
          }
        }

        this.requre_save = true;
        var vm = this;

        Vue.nextTick(function(){
          vm.$forceUpdate();
        });
      }
    },

    update_lead_stage: function(data, key){
      this.lead_data.lead_stage_prev = this.lead_data.lead_stage ;
      this.lead_data.lead_stage = data.val;
    },

    save_new_stage: function(){

      if(this.lead_data.lead_stage === this.lead_data.lead_stage_prev){
        this.show_confirmation_popup = false;
        return true;
      }

      var list_id_prev  = this.lead_data.lead_stage_prev;
      var list_id       = this.lead_data.lead_stage ;
      var user_name     = this.lead_data.user_name;
      var user_id       = this.lead_data.user_id;
      var post_id       = this.lead_data.ID;

      jQuery(document.body).trigger('update_lead_log', {
        post_id: post_id,
        list_id_prev: list_id_prev,
        list_id_new: list_id,
        user_name: user_name ,
        user_id:   user_id ,
        event: 'stage_changed'
      });

      jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

      this.show_confirmation_popup = false;
    },

    do_delete_or_return: function(url){
      this.deleting_lead = true;
      wait_block.show();

      if(parseInt(this.lead_data.lead_id) === -1){
        wait_block.hide();
        location.href = url;
      }else{
        var data = {
          action  : 'delete_lead',
          lead_id : parseInt(this.lead_data.lead_id),
          nonce   : jQuery('[name=lead_data]').val(),
          url     : url,
        };

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
           clog(xhr)
        },

        success: function(data, textStatus, xhr) {
          if('undefined' != typeof(data.redirect)){
            window.close();
            // location.href = data.redirect;
          }
        },

        error: function(xhr, textStatus, errorThrown) {
          clog(xhr);
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
      }
    },

    add_note: function(type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

      if(!this.note_text && type == 'enquery'){
        alert('Please enter some text');
        return false;
      }else  if(!this.note_text_tco && type == 'tco'){
        alert('Please enter some text');
        return false;
      }

      var date = new Date();
      var fmt  = new DateFormatter();
      var date_formatted =  fmt.formatDate(date, 'F d Y') + ' at ' + fmt.formatDate(date, 'H:i');

      var new_note = {
        'date'       : date_formatted,
        'user_name'  : this.lead_data.user_name,
        'user_id'    : this.lead_data.user_id,
        'text'       : (type== 'enquery')? this.note_text : this.note_text_tco,
        'is_manager' : is_manager,
        'done'       : 'no',
        'show'       : 1,
      };

      if(type == 'enquery'){

        if(!this.lead_data.meta.lead_notes){
          this.$set(this.lead_data.meta, 'lead_notes', []);
        }

        this.lead_data.meta.lead_notes.push(new_note);
        this.note_text = '';
        this.$refs.note_textarea.style.height = '';
      }else if (type =='tco'){

        if(!this.lead_data.meta.lead_notes_tco){
          this.$set(this.lead_data.meta, 'lead_notes_tco', []);
        }

        this.lead_data.meta.lead_notes_tco.push(new_note);
        this.note_text_tco = '';
        this.$refs.note_textarea_tco.style.height = '';
      }
    },

    delete_note: function(key , type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

     if(type == 'enquery'){
        key = this.lead_data.meta.lead_notes.length - key - 1;
        this.lead_data.meta.lead_notes[key].show = 0;
      }
     if(type == 'tco'){
        key = this.lead_data.meta.lead_notes_tco.length - key - 1;
        this.lead_data.meta.lead_notes_tco[key].show = 0;
      }
    },

    mark_note_done: function(key, val, type){
      type = 'undefined' !== typeof(type)? type : 'enquery';

      if(type == 'enquery'){
        key = this.lead_data.meta.lead_notes.length - key - 1;
        this.lead_data.meta.lead_notes[key].done = val;
      }
      if(type == 'tco'){
        key = this.lead_data.meta.lead_notes_tco.length - key - 1;
        this.lead_data.meta.lead_notes_tco[key].done = val;
      }
    },

    update_specialists: function(event, type){
      if('undefined' !== typeof(event.val) ){
        if(this.lead_data.ID < 0){
          alert('Create lead before assigning it to a specialist, please');
          return false;
        };

        var data =  Object.values(specialists_data).filter(el =>{
          return el.name == event.val})[0];

        switch(type){
          case 'tco':
          this.lead_data.meta.specialists_assigned_tco[data.user_id] = 'yes';
            break;
          default:
            this.lead_data.meta.specialists_assigned[data.user_id] = 'yes';
            break;
        };
      };
    },

    assign_specialist: function(){
      // this.selected_specialist = false;
      // this.save_sepcialists_meta();
    },

    remove_specialist: function(name){
      if(window.confirm("Confirm unassigning " + name + " from this lead")){
          var ids = this.visible_specialists.map(el=>{return el.user_id});

          for( var id of ids){
            this.lead_data.meta.specialists_assigned[id] = 'no';
            this.lead_data.meta.specialists_assigned_tco[id] = 'no';
          }

        // this.specialists_data[name].show = 'no';
        // this.specialists_data[name].show_tco = 'no';
        // this.save_specialists_meta();

        // jQuery(document.body).trigger('update_lead_log', {
        //   post_id     : parseInt(this.lead_data.lead_id),
        //   nonce       : jQuery('[name=lead_data]').val(),
        //   user_name   : this.lead_data.user_name,
        //   user_id     : this.lead_data.user_id,
        //   event       : 'specialist_updated',
        //   text: 'Unassined from ' +  name + ' by ' + this.lead_data.user_name,
        // })
      }
    },

    save_specialists_meta: function(){
      var meta     = {};
      var meta_tco = {};

      for(id in specialists_data){
        meta[specialists_data[id].user_id] = specialists_data[id].show;
      }
      for(id in specialists_data){
        meta_tco[specialists_data[id].user_id] = specialists_data[id].show_tco;
      }

      var data = {
        meta: {
          lead_specialists: meta,
          lead_specialists_tco: meta_tco,
        },
        action                : 'update_lead_meta',
        lead_data             : this.lead_data,
        nonce                 : jQuery('[name=lead_data]').val(),
      };

      var vm = this;
      wait_block.show();

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {
           wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
          // console.log(data);
          vm.$refs.lead_id_input.set_value(data.post_id);
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
        }
      })
    },


    load_file: function(){
      // console.log('load_file');

      wait_block.show();

      var file_pierces = this.$refs.file_input.value.split('\\');
      var file_name = file_pierces[file_pierces.length-1];
      var file = jQuery(this.$refs.file_input).prop('files')[0];
      var fd   = new FormData();

      var vm = this;

      fd.append('file',file);
      fd.append('lead_id',this.lead_data.ID);
      fd.append('user_name','unknown');
      fd.append('action', 'upload_new_document');

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        processData: false,
        contentType: false,
        data: fd,

        complete: function(xhr, textStatus) {
          vm.new_file = '';
          wait_block.hide();
        },

        success: function(data, textStatus, xhr) {
          vm.lead_data.meta.lead_files.push(data.file_data);
        },

        error: function(xhr, textStatus, errorThrown) {
          if(xhr.status === 418){
            var response_text = JSON.parse(xhr.responseText);
            alert(response_text.data[0]);
          }else{
            alert(xhr.status + ' ' +errorThrown);
          }
         }
      })
    },


    remove_file: function(file_id){
      var vm = this;

      if(window.confirm("Confirm deleting file " + this.files[file_id].name)){

        var file_data = vm.files[file_id];

        vm.files.splice(file_id, 1);

        var data = {
          file_data: file_data,
          lead_id: vm.lead_data.lead_id,
          user_name: vm.lead_data.user_name,
          action: 'delete_file_from_lead',
        };

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {

          },

          success: function(data, textStatus, xhr) {
            // console.log(data);
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              alert(response_text.data[0]);
            }else{
              alert(xhr.status + ' ' +errorThrown);
            }
          }
        })
      }
    },

    do_file_changed: function(){
      var file_pierces = this.$refs.file_input.value.split('\\');
      var file_name = file_pierces[file_pierces.length-1];
      this.new_file = file_name;

      console.log(file_name)
    },

    change_phone: function(action){
      var phone = this.lead_data.phone_count;

      if(action === 'add'){
        phone++;
      }

      if(action === 'remove'){
        phone--;
      }

      phone = Math.max(0, phone);
      this.lead_data.phone_count = Math.min(3, phone);


      var data = {
        lead_id: this.lead_data.ID,
        count: this.lead_data.phone_count,
        action: 'save_phones_count',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        success: function(data, textStatus, xhr) {
          // console.log(data);
         },
      })
    },


    change_message: function(action){
      var messages = this.lead_data.message_count;
      if(action === 'add'){
        messages++;
      }

      if(action === 'remove'){
        messages--;
      }

      messages = Math.max(0, messages);
      this.lead_data.message_count = Math.min(3, messages);


      var data = {
        lead_id: this.lead_data.ID,
        count:   this.lead_data.message_count,
        action:  'save_messages_count',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        success: function(data, textStatus, xhr) {
          // console.log(data);
        },
      })
    },

    change_phone_tco: function(action){
      var vm= this;
      switch(action){
        case 'add':
         vm.lead_data.phone_count_tco = 1;
         break;
        case 'remove':
         vm.lead_data.phone_count_tco = 0;
         break;
      }

      var data = {
        lead_id: vm.lead_data.ID,
        count: vm.lead_data.phones_tco,
        action: 'save_phones_count_tco',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {

        },

        success: function(data, textStatus, xhr) {
          // console.log(data);
         },

        error: function(xhr, textStatus, errorThrown) {

        }
      })
    },

    change_message_tco: function(action){
      var vm= this;
      switch(action){
        case 'add':
         vm.lead_data.message_count_tco = 1;
         break;
        case 'remove':
         vm.lead_data.message_count_tco = 0;
         break;
      }


      var data = {
        lead_id: this.lead_data.ID,
        count: this.lead_data.message_count_tco,
        action: 'save_messages_count_tco',
      }

      jQuery.ajax({
        url: WP_URLS.wp_ajax_url,
        type: 'POST',
        data: data,

        complete: function(xhr, textStatus) {

        },
      })
    },


    clear_reminder: function(){
      this.lead_data.meta.reminder = '';
    },


    /**
    * show single lead on click on a lead item on a list
    */
    show_single_lead: function(id){
      clog(id, 0 , 1);
    },

    close_tab: function(){
      window.close();
    },

    send_text_message: function(){
      var phone = this.patient_data.phone;
      var vm = this;



      if(!phone || phone.length < 4){
        alert('phone not set');
        return;
      }

      if(!this.message_to_client ){
        alert('Type a message, please');
        return;
      }

      if(!this.sms_data ){
        alert('Messaging center is not configured');
        return;
      }

      var data = {
        sms_data: this.sms_data,
        phone: phone,
        text: this.message_to_client,
      };


      jQuery.ajax({
        url: WP_URLS.theme_url+"/messaging/twilio_send.php",
        type: 'POST',
        dataType: 'json',
        data: data,
      })

      .done(function(e) {
        if(e.error){
          alert(e.error);
        }else{
          var date = new Date();
          var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() ;

          var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

          var ant = date.getHours() > 12 ? 'pm' : 'am';

          var date_sent = months[date.getMonth()] + ' ' + day+ ' '+date.getFullYear() + ' '+ hours+':' + date.getMinutes() + ant;


          vm.text_messages.push({
            'body'      :  vm.message_to_client,
            'date_sent' : date_sent,
            'type'      : 'we',
            'status'    : 'sent',
          });

          vm.message_to_client = '';

          Vue.nextTick(function(){
            jQuery('._messages')[0].scrollTop = jQuery('._messages')[0].scrollHeight;
          })
        }
      })

      .fail(function() {
      })

      .always(function(e) {
        console.log(e);
      });
    },


    update_text_messages: function(){
      if (this.deleting_lead){
        return;
      }

      var phone = this.patient_data.phone;
      var vm = this;

      var data = {
        sms_data: this.sms_data,
        phone: phone,
      };

      jQuery.ajax({
        url: WP_URLS.theme_url+"/messaging/twilio_update_msg.php",
        type: 'POST',
        dataType: 'json',
        data: data,
      })

      .done(function(e) {
        if(e.error){
          alert(e.error);
        }else{

          if (vm.deleting_lead){
            return;
          }

          vm.text_messages = e.messages;
          vm.intial_load = false;

          if(vm.text_messages.length < e.messages.length){
            if(! vm.intial_load ){
              var message = e.messages[e.messages.length-1];
            }
          }

        }
      })

      .fail(function() {
      })

      .always(function(e) {
        jQuery('._messages').removeClass('hidden');
        jQuery('.preloader-messages').addClass('hidden');
      });
    }
  },



  template: '#lead-new-tmpl',

})
Vue.component('confirmation-popup', {
  data: function(){
    return {
      stage: '',
      show_confirmation_popup: false,
      stages: stages,
    };
  },

  props:['_stage'],

  watch:{
    show_confirmation_popup: function(show){
      if(show){
        console.log(this.$refs)
      }
    },

    _stage:function(val){
      this.stage = val;
      this.$refs.lead_stage_select2.set_value('selected', val);
    },
  },

  computed:{
    _stages: function(){
      return Object.values(this.stages).map(e=>{return e.name});
    }
  },

  mounted:function(){
    // this.$refs.lead_stage_select2.set_value('options', this._stages);
  },

  methods:{
    update_lead_stage: function(data){
      this.stage = data.val;
    },

    save_new_stage: function(){
      this.show_confirmation_popup = false;
      this.$emit('change_stage_popup',{stage: this.stage});
    },
  },

  template: '#lead-single-popup-tmpl',
});
function formatMoney(number, decPlaces, decSep, thouSep) {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
  decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  var j = (j = i.length) > 3 ? j % 3 : 0;

  var reverted_i = reverseString(i);
  var numbers = reverted_i.match(/.{1,3}/g);

  numbers.reverse();

  for(id in numbers){
    numbers[id] =  reverseString(numbers[id]);
  }

  return sign +
    numbers.join(thouSep)+
    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); // "olleh"

    return joinArray; // "olleh"
}

function goBack() {
  window.history.back();
}


function get_sum_from_price(sum){
  if(typeof(sum) === 'undefined'){
    return 0;
  }

  if(isNaN(sum) && 'string' !== typeof(sum)){
    return 0;
  }

  if(!sum){
    return 0;
  }


  if(sum === 0){
    return 0;
  }


  if((sum) === 'undefined'){
    return 0;
  }

  if(typeof(sum) === 'string'){
    var exp = new RegExp("\\D", "gi");
    var pierces = sum.split('.');
    var summ = pierces[0].replace(exp, '');

    return parseFloat(summ);
  }

  if(typeof(sum) === 'number'){
    return sum;
  }

  return 0;
}



function clog(content, label, debug){
  if('undefined' === typeof(theme_debug)){
    return;
  }

  if('undefined' !== typeof(debug_vue) && 'undefined' !== typeof(debug) &&  debug){
    if('undefined' !== typeof(label) && 0 !== label){
      debug_vue.log(content,label);
    }
    else{
      debug_vue.log(content);
    }
  }

  if('undefined' !== typeof(label) && 0 !== label){
    console.group(label);
  }

  console.log(content);

  if('undefined' !== typeof(label) || 0 === label){
    console.groupEnd();
  }
}

function strlog(content, color , label){
  if('undefined' === typeof(theme_debug)){
    return;
  }

  var template = '';

  switch(color){
    case 'red':
      template = '\x1b[31m %s ';
      break;
    case 'green':
      template = '\x1b[32m %s ';
      break;
    case 'blue':
      template = '\x1b[34m %s ';
      break;
    default:
      template = '\x1b[34m %s ';
      break;
  }



  if('undefined' != typeof(label)){
    template = '\x1b[0m%s' + template + '\x1b[0m';
    console.log(template, label, content);
    // console.log('\x1b[0m%s\x1b[31m %s \x1b[0m' , time_str, err.message );
  }else{
    console.log(template, content);
  }

}


function strip(val){
  return JSON.parse(JSON.stringify(val));
}

function open_new_lead(){
  list_app.show_list = false;
  list_app.$refs.single_lead.visible= false;
  list_app.$refs.new_lead.visible= true;

}
console.timeEnd('all script');