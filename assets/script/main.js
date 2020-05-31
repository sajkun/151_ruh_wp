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
jQuery(document).ready(function(){
    jQuery('.reminder input').datetimepicker({
      format:'M d Y H:i',
    });

    jQuery('.datepicker').datetimepicker({
      format:'M d Y H:i',
    });
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
    },
    "alwaysShowCalendars": true,
    "startDate": last_30_str,
    "endDate": today_str
  }, function(start, end, label) {

    var text = start.format('MMM DD YYYY') + ' → ' + end.format('MMM DD YYYY');

    jQuery('.range-datepicker__text').text(text);
    jQuery('.range-datepicker__label').text(label);

    var data = {from: start.format('MMM DD YYYY') , to: end.format('MMM DD YYYY'), label: label, _from: start.format('MM/DD/YYYY'), _to: end.format('MM/DD/YYYY'), }

    jQuery(document.body).trigger('get_leads_by_dates', data);
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

jQuery(document).ready(function(){
  var saved_dates = JSON.parse(Cookie.get('list_data_settings'));

  if(saved_dates && 'undefined' !== typeof(is_lead_list)){
     var text = saved_dates.from + ' → ' + saved_dates.to;

    jQuery('.range-datepicker__text').text(text);

    jQuery('.range-datepicker__label').text(saved_dates.label);

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
    ['January', 'May',   'July',      "October" ],
    ['February','April', "August",    'November'],
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
                income_month_data['May']['sum'],
                income_month_data['Jul']['sum'],
                income_month_data['Oct']['sum']
                ], // january, may, july, october
              label: 'Left dataset',

              // This binds the dataset to the left y axis
              yAxisID: 'left-y-axis'
          }, {
              data: [
                income_month_data['Feb']['sum'],
                income_month_data['Apr']['sum'],
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

// sortrable actions
  jQuery( function() {


    // makes height of all lists on leads' page one and the same
    jQuery(document).ready(function(){
      equal_list_heights();
    })

    // init of sortable
    jQuery("ul.leads-list" ).sortable({
      connectWith: "ul",

      create:function(event, ui){},

      receive: function( event, ui ){},

      over: function( event, ui ){
      },


      stop : function( event, ui ){
        jQuery(document).trigger('update_leads_list');

        var leads_order_list = [];

        var items = jQuery(event.target).find('a');

        var orders = [];

        items.each(function(ind, el){
          var post_id = parseInt(el.dataset.post_id);
          orders.push({post_id: post_id, order: ind});

          for(id in dashboard_leads_data){
            if(post_id == dashboard_leads_data[id].ID){
              dashboard_leads_data[id].order = ind;
            }
          }
        });

        vue_leads_list.run_update_list();

        if(orders.length > 1){
          jQuery(document.body).trigger('update_items_order', {order: orders});
        }
      },
    });

    jQuery( ".leads-list" ).on( "sortover", function( event, ui ) {
      jQuery(this).css({'background': '#eee'});
    } );

    jQuery( ".leads-list" ).on( "sortout", function( event, ui ) {
      jQuery(this).css({'background': 'none'});

    } );

    jQuery( ".leads-list" ).on( "sortreceive", function( event, ui ) {

      console.groupCollapsed('Sort receive');

      var order = -1;
      var post_id = ui.item.find('a').data('post_id');
      var list_id =  ui.item.closest('ul').data('list');
      var list_id_prev = ui.item.children('a').data('list');
      var orders = [];

      // set order for all items in list
      var items = jQuery(event.target).find('a');


      items.each(function(ind, el){
        var post_id = parseInt(el.dataset.post_id);
        orders.push({post_id: post_id, order: ind});
        for(id in dashboard_leads_data){
          if(post_id == dashboard_leads_data[id].ID){
            dashboard_leads_data[id].order = ind;
          }
        }
      });


      if(orders.length > 1){
        jQuery(document.body).trigger('update_items_order', {order: orders});
      }


      console.log('Moved from: ' + list_id_prev + ' to: ' + list_id);
      console.log('Sorted id: ' + post_id);

      // search item in global items array and update value for list
      for(ind in dashboard_leads_data){
        if(post_id == dashboard_leads_data[ind].ID){

          list_id_prev = dashboard_leads_data[ind].lead_stage;
          dashboard_leads_data[ind].lead_stage      = list_id;
          dashboard_leads_data[ind].meta.lead_stage = list_id;
          order = dashboard_leads_data[ind].order

          console.log(dashboard_leads_data[ind].ID + '. patient: ' + dashboard_leads_data[ind].meta.patient_data.name + ' new col: '+ dashboard_leads_data[ind].lead_stage);
        }
      }

      // update changes in Vue object
      vue_leads_list.run_update_list();
      console.log(vue_leads_list.leads[list_id]);

      // change visual part of lists
      equal_list_heights();
      jQuery(this).css({'background': 'none'});


      // fire trigger to save changes in backend
      jQuery(document.body).trigger('save_dragged_item', {post_id: post_id, list_id: list_id})

      var user_name = jQuery('#user_name').val();
      var user_id = jQuery('#user_id').val();

      jQuery(document.body).trigger('update_lead_log', {
        post_id: post_id,
        list_id_prev: list_id_prev,
        list_id_new: list_id,
        user_name: user_name ,
        user_id:   user_id ,
        event: 'stage_changed'
      });

      console.groupEnd('---');
    });
  });


/**
* function that makes height of all lists on leads' page one and the same;
*/
function equal_list_heights(){
  var height = 0;

  jQuery('.leads-list').css({'min-height': 0 + 'px'});

  jQuery('.leads-list').each(function(ind, el){
    height = Math.max(height, jQuery(el).height());
  });


  jQuery('.leads-list').css({'min-height': height + 50 + 'px'});
}


jQuery(document.body).on('update_items_order', function(e, data){
  console.groupCollapsed('update_items_order');

  var data_post = {
    action : 'update_leads_order',
    order: data.order,
  };

  console.log(data_post);

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
      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.groupEnd();
     }
  });

})

jQuery(document.body).on('save_dragged_item', function(e, data){
  console.groupCollapsed('save_dragged_item');

  var data_post = {
    action : 'update_leads_list',
  };

  for(id in data){
    data_post[id] = data[id];
  };

  console.log('data_post:');
  console.log(data_post);

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
      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.groupEnd('---');
     }
  });
})

jQuery(document.body).on('update_lead_log', function(e, data){
  console.groupCollapsed('update lead log');

  console.log(data);

  var data_post = {
    action : 'update_leads_log',
  };

  for(id in data){
    data_post[id] = data[id];
  };


  var date = new Date();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', "Sep", 'Oct', "Nov", "Dec"];

  var date_formatted = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes();

  data_post.date_formatted = date_formatted;

  var minutes =  (date.getMinutes() < 10)?  '0' + date.getMinutes():  date.getMinutes();

  data_post.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +date.getDate()+ ' ' + date.getHours() + ':' + minutes;


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

      if('object' === typeof(single_lead)){
        single_lead.logs = data.logs;
      }
      console.groupEnd('---');
    },

    error: function(xhr, textStatus, errorThrown) {
      console.log('error');
      console.log(errorThrown);
      console.groupEnd('---');
     }
  });
})
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
            manager_noted = ('yes' === this.leads[id].meta.lead_notes[k].is_manager)? 'yes' : manager_noted;
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
      data.sourse      = this.leads[id].meta.patient_data.sourse;
      data.team        = this.leads[id].meta.lead_specialists;
      data.lead_stage  = this.leads[id].lead_stage;
      data.reminder    = this.leads[id].meta.reminder;
      data.permalink   = this.leads[id].permalink;
      data.filter_data = this.leads[id].filter_data;
      data.phone_count = this.leads[id].phone_count;
      data.message_count = this.leads[id].message_count;
      data.for_csv      = for_csv;
      data.manager_noted = manager_noted;

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

    if(date_diff < this.ms_to_minute){
      return 'Just recieved';
    }


    // how many days

    var days_data = this.get_days_passed(date_diff);


    var hours_data = this.get_hours_passed(days_data.date_diff);

    var minutes_data = this.get_minutes_passed(hours_data.date_diff);

    var time_passed = '';
    var days_text     = (days_data.value > 1)? 'd ' : 'd ';
    var hours_text    = (hours_data.value > 1)? 'h ' : 'h ';
    var minutes_text = (minutes_data.value > 1)? 'm ' : 'm ';

    time_passed += (days_data.value > 0)?  days_data.value + days_text : '';
    time_passed += (hours_data.value > 0)? hours_data.value + hours_text : '';
    time_passed += (minutes_data.value > 0)?  minutes_data.value + minutes_text : '';

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

var icons_selects = {
  'clinics': '<svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>',

  'treatments': '<svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>',

  'campaigns': '<svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>',

  'sources': '<svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>',

  'team': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',
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

  template : '<input type="text" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" >',
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
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    },

    set_value:function(val){
      this.value = val;
      this.$emit('input_value_changed', {name: this.name, val: this.value});
    }
  },

  template : '<input v-bind:type="type" v-on:input="input"  v-on:change="input" v-on:blur="input" v-bind:name="name" v-model="value" placeholder="Add" class="leads-block__input":readonly="readonly == 1">',

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

var vue_selects = {};
var vue_dashboard_totals;
var filter_dashboard;
var vue_team_perfomance;
var dashboard_convertions;
var perfomance;
var vue_top_items = {};
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
    vue_select_components[id].discard_select();
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
        console.groupCollapsed('\x1b[0m%s\x1b[32m %s \x1b[0m' , 'perfomance:', 'rows calculated');
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
        console.log(rows);
        console.groupEnd();
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
      console.groupCollapsed('\x1b[0m%s\x1b[35m %s \x1b[0m' , 'perfomance:', 'perfomance mounted');
      var props =  {
        options: ['clinics', "treatments", "campaigns", "sources", "team"],
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

      console.log('dashboard_leads_data');
      console.log(dashboard_leads_data);
      console.log('dashboard_leads_data_prev');
      console.log(dashboard_leads_data_prev);
      console.groupEnd();
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

        for(var lead_id in this.leads){
          column_data = this.leads[lead_id];

          console.log(column_data);

          var temp = {
            name: column_data.name,
            treatment: column_data.treatment,
            clinic: column_data.clinic,
            campaign: column_data.campaign,
            notes: '',
            proposed: '£' + formatMoney(column_data.for_csv.proposed, 2, '.', ',') ,
            billed: '£' + formatMoney(column_data.for_csv.billed, 2, '.', ',') ,
          };


          temp.dentists = typeof(column_data.for_csv.dentists) === 'object'? column_data.for_csv.dentists.join(';') : 'none';

          if(typeof(column_data.for_csv.notes) === 'object'){
            var notes = [];
            for (var i in column_data.for_csv.notes){
                notes.push(column_data.for_csv.notes[i].text);
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


          var csvContent = "data:text/csv;charset=utf-8,name,treatment,clinic,campaign,notes,proposed,billed,dentists" + "\r\n"
              + formatted_data.map(e => e.join(",")).join("\r\n");

          var encodedUri = encodeURI(csvContent);
          var link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", filename + ".csv");
          document.body.appendChild(link); // Required for FF

          link.click();

      }
    },
  });
}
var vue_leads_list;

var overdue_timeout;

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

      overdue_checked: false,

      filters:{
        clinics:    'All Clinics',
        treatments: 'All Treatments',
        campaigns:  'All Campaigns',
        sources:    'All Sources',
        team:       'All Team',
      },

      search_value: '',

      leads:{},
    },

    computed:{
      get_convertion: function(){
        var vm = this;

        return function (col_id) {
          var leads_total = 0;
          var leads_column_total = 0;

          for(id in this.leads_filtered){
            leads_total += this.leads_filtered[id].length;
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

      leads_filtered: function(){
        var leads_filtered = {};
        var filters = {};

        for(var column_name in this.leads ){
          leads_filtered[column_name] = [];
        }

        for(var filter_name in this.filters){
         if(this.filters[filter_name].search('All') !== 0){
            filters[filter_name] = this.filters[filter_name];
          }
        }

        for(var column_name in this.leads){
          var fields_search = ['clinic', 'name', 'treatment', 'source', 'team', 'campaign'];

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
                 var value = lead[field];
                 var _found = exists_in_object(value, this.search_value);

                 search_match = (_found)? true : search_match;
              }

              is_match = search_match && is_match;
            }

            //apply overdue
            if(this.overdue_checked){
              is_match = is_match && lead.reminder;
            }


            if(is_match){
              leads_filtered[column_name].push(lead);
            }
          }
        }

        // console.log('leads_filtered');
        // console.log(leads_filtered);

        return leads_filtered;
      },

      show_filter_clear_btn: function(){
        var show = false;
        for(var filter_name in this.filters){
          show = (this.filters[filter_name].search('All') !== 0)? true: show;
        }

        return show ? '' : 'visuallyhidden';
      },

      alarms: function(){
        var alarms = 0;
        var overdue = 0;

        for(col_id in this.leads_filtered){
          for(id in this.leads_filtered[col_id]){
            var lead = this.leads_filtered[col_id][id];
            alarms = (lead.reminder)? alarms+1 : alarms;
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
      overdue_checked: function(show){
      },

      'filters.clinics': function(){
        Cookie.set('lead_list_filter', JSON.stringify(this.filters));
      },
      'filters.treatments': function(){
        Cookie.set('lead_list_filter', JSON.stringify(this.filters));
      },
      'filters.campaigns': function(){
        Cookie.set('lead_list_filter', JSON.stringify(this.filters));
      },
      'filters.sources': function(){
        Cookie.set('lead_list_filter', JSON.stringify(this.filters));
      },
      'filters.team': function(){
        Cookie.set('lead_list_filter', JSON.stringify(this.filters));
      },
    },

    mounted: function(){
      //console.groupCollapsed('vue inits list');
      var vm = this;
      vm.init_filters();

      Vue.nextTick(function() {
        vm.handle_resize();
      });

      window.addEventListener('resize', this.handle_resize);

      var leads = parse_leads.construct();
      _leads = leads.get_leads_for_list();

      vm.update_leads(_leads);
      //console.log(vm.leads);
      //console.groupEnd('---');

      var vm = this;

      vm.$nextTick(function(){
        console.log('loaded');

        jQuery('.preload-timer').addClass('hidden');
        jQuery('.leads-container').removeClass('visuallyhidden');
        jQuery('.filter-container').removeClass('visuallyhidden');
      })
     },

    methods:{
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
        this.scroll_height = this.height_value - this.$refs.spacer1.clientHeight - this.$refs.spacer2.clientHeight - this.$refs.container_filter.clientHeight;

        this.$forceUpdate();

        //console.log('Scroll area height:' + this.scroll_height);
        //console.groupEnd('----');
      },

      init_datepicker: function(){
        init_date_range();
      },

      //inits filters
      init_filters: function(){
        var props;

        var saved_filter = JSON.parse(Cookie.get('lead_list_filter'));

        for(select_name in dashboard_filter_data){
          props =  {
            icon: icons_selects[select_name],
            isExpanded: '',
            isSelected: [],
            isHiddenSelect: true,
            isHiddenImitation: false,
          };

          props.options = dashboard_filter_data[select_name];
          props.selected = (saved_filter)? saved_filter[select_name] : dashboard_filter_data[select_name][0];

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

      update_leads: function(leads){
        //console.log('Update leads');
        var temp_leads = {};
        this.leads = {};

        for(id in leads){
          if('undefined'  === typeof(temp_leads[leads[id].lead_stage])){
            temp_leads[leads[id].lead_stage]  = [];
          }
          temp_leads[leads[id].lead_stage].push(leads[id]);
        }

        for(id in temp_leads){
          temp_leads[id].sort(this.sort_by_order);
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

      }
    },
  })

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
if('undefined' !== typeof(is_single_lead)){
  single_lead = new Vue({
    el: '#single-lead',

    data: {
      patient_data: {
        name: '',
        phone: '',
        email: '',
      },

      treatment_value: {
        billed: 0,
        value     : 0,
        terms     : '',
        mounthly  : '',
        treatment :(!!assigned_treatments && typeof(assigned_treatments) === 'object')? Object.values(assigned_treatments) : [] ,
        date_end : date_start,
      },

      treatment_coordinator: {
        specialist: Object.values(assigned_dentists),
      },

      notes       : [],
      files       : [],
      logs        : [],
      lead_data   : {},
      note_text   : '',
      reminder    : '',
      new_file    : '',
      phones      : 0,
      messages    : 0,
      requre_save : false,
      save_text           : 'Save Changes',
      specialists_data    : {},
      selected_specialist : false,
      lead_stage: '',
      show_confirmation_popup: false
    },

    computed:{
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
      note_text: function(){
        this.$refs.note_textarea.style.height = '';
        this.$refs.note_textarea.style.height = this.$refs.note_textarea.scrollHeight + 'px';
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
            console.log(data);
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
      this.messages = message_count;
      this.notes = lead_notes;
      this.files = lead_files;
      this.logs  = lead_logs;
      this.specialists_data  = specialists_data;
      this.init_select();

    },

    methods: {
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
        console.log(this);
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

        props.options = [
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

        for( id in props){
          this.$refs['source_select'].set_value(id, props[id]);
        }

        props.options = specialists;

        for( id in props){
          this.$refs['lead_specialissts_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['source_select']);
        vue_select_components.push(this.$refs['lead_specialissts_select']);


        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: treatments,
        };

        for( id in props){
          this.$refs['treatments_select'].set_value(id, props[id]);
          this.$refs['treatments_select2'].set_value(id, props[id]);
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
          options: ['Full Payment', '12 Months','18 Months' , '24 Months', '36 Months', '48 Months'],
        };

        for( id in props){
          this.$refs['terms_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['terms_select']);

        var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: ['Cash', 'Bacs','Card' , 'Finance', 'Go Cardless'],
        };

        for( id in props){
          this.$refs['payment_method_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['payment_method_select']);

       var props =  {
          isExpanded: '',
          isSelected: [],
          isHiddenSelect: true,
          isHiddenImitation: false,
          options: available_dentists,
        };

        for( id in props){
          this.$refs['specialist_select'].set_value(id, props[id]);
        }

        vue_select_components.push(this.$refs['specialist_select']);

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
        var vm = this;

        if(typeof(key_meta) !== 'string'){
          var meta = {
            patient_data          : this.patient_data,
            treatment_value       : this.treatment_value,
            treatment_coordinator : this.treatment_coordinator,
            lead_notes            : this.notes,
            reminder              : this.reminder,
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


        console.log(this.lead_data);


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

        wait_block.show();

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: posted_data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
            vm.$refs.lead_id_input.set_value(data.post_id);
            jQuery('.button-create span').text('Save Changes');
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);

              if(response_text.data[0] === 'name was found'){
                var confirm = window.confirm("Are you sure you want to add lead for " + vm.patient_data.name +'? Lead for patient with this name already exists');

                console.log(confirm);

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
            console.log(data);
            vm.$refs.lead_id_input.set_value(data.post_id);
            jQuery('.button-create span').text('Save Changes');
          },

          error: function(xhr, textStatus, errorThrown) {
            if(xhr.status === 418){
              var response_text = JSON.parse(xhr.responseText);
              console.log(xhr);
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
        wait_block.show();
        if(parseInt(this.lead_data.lead_id) < 0){
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
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
            if('undefined' != typeof(data.redirect)){
              location.href = data.redirect;
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
        }
      },

      add_note: function(){
        console.log(is_manager);

        if(!this.note_text){
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
          'text'       : this.note_text,
          'is_manager' : is_manager,
          'done'       : 'no',
        };


        this.notes.push(new_note);
        this.note_text = '';
        this.$refs.note_textarea.style.height = '';

        this.save_lead_meta('lead_notes', 'notes');
      },

      mark_note_done: function(key, val){
        this.notes[key].done = val;
        this.save_lead_meta('lead_notes', 'notes');
      },

      update_specialists: function(event){
        if('undefined' !== typeof(event.val) ){

          if(this.lead_data.lead_id < 0){
            alert('Create lead before assigning it to a specialist, please');
            return false;
          };

          if(this.specialists_data[event.val].show === 'yes')
            {
               return false;
            };

          this.specialists_data[event.val].show = 'yes';
          this.save_sepcialists_meta();

          jQuery(document.body).trigger('update_lead_log', {
            post_id     : parseInt(this.lead_data.lead_id),
            nonce       : jQuery('[name=lead_data]').val(),
            user_name   : this.lead_data.user_name,
            user_id     : this.lead_data.user_id,
            event       : 'specialist_updated',
            text: 'Assined to ' +  event.val + ' by ' + this.lead_data.user_name,
          })
        }
      },

      assign_specialist: function(){
        // this.selected_specialist = false;
        // this.save_sepcialists_meta();
      },

      remove_specialist: function(name){
        if(window.confirm("Confirm unassigning " + name + " from this lead")){
          this.specialists_data[name].show = 'no';
          this.save_sepcialists_meta();

          jQuery(document.body).trigger('update_lead_log', {
            post_id     : parseInt(this.lead_data.lead_id),
            nonce       : jQuery('[name=lead_data]').val(),
            user_name   : this.lead_data.user_name,
            user_id     : this.lead_data.user_id,
            event       : 'specialist_updated',
            text: 'Unassined from ' +  name + ' by ' + this.lead_data.user_name,
          })
        }
      },

      save_sepcialists_meta: function(){
        var meta = {};
        for(id in specialists_data){
          meta[specialists_data[id].user_id] = specialists_data[id].show;
        }

        var data = {
          meta: {
            lead_specialists: meta,
          },
          action                : 'update_lead_meta',
          lead_data             : this.lead_data,
          nonce                 : jQuery('[name=lead_data]').val(),
        };

        var vm = this;

        jQuery.ajax({
          url: WP_URLS.wp_ajax_url,
          type: 'POST',
          data: data,

          complete: function(xhr, textStatus) {
             wait_block.hide();
          },

          success: function(data, textStatus, xhr) {
            console.log(data);
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
        console.log('load_file');

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
            console.log(data);
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
              console.log(data);
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
            console.log(data);
           },

          error: function(xhr, textStatus, errorThrown) {

          }
        })

        console.log('change_phone');
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

        console.log('change_message');

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
            console.log(data);
          },

          error: function(xhr, textStatus, errorThrown) {

          }
        })
      },
    },
  })


}
if(typeof(is_lead_list) !=='undefined' || typeof(is_dashboard) !=='undefined' || typeof(is_single_lead) !=='undefined' ){
  var search = new Vue({
    el: '#search-form',

    data: {
      search_value: '',
    },

    computed:{
      isVisuallyHidden: function(){
        return typeof(is_lead_list) === 'undefined';
      },

      classes: function(){
        return typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list ?
        'order-2 order-md-0 col-md-2 col-lg-4' : 'search-single col-md-2 col-lg-4'
      },

      show_search: function(){
        return typeof(is_lead_list)!== 'undefined' && 'yes' === is_lead_list? true: false;
      }
    },

    watch: {
      search_value: function(val){

        if(is_lead_list){
          if(val.length >= 3){
            vue_leads_list.run_search(val);
          }else{
            vue_leads_list.run_search('');
          }
        }

      }
    },

    methods:{
      run_search: function(search){
        this.search = search;
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