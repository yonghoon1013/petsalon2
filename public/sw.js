if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>i(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/LeeTest/footerImg/aroundLink_icon_active.svg",revision:"5c1f4ddc156960695860f8c2b52e5e5d"},{url:"/LeeTest/footerImg/arroundLink_icon.svg",revision:"8cfc3fab5bd7e2117ceed084dadf6ebe"},{url:"/LeeTest/footerImg/heartLink_icon.svg",revision:"74eaeece3faa31c4a80e7a75774ddfdf"},{url:"/LeeTest/footerImg/heartLink_icon_active.svg",revision:"b8338ae718a35c51a356b478f85b7159"},{url:"/LeeTest/footerImg/homeLink_icon.svg",revision:"fd719a3bb9239105e44870ca03597f07"},{url:"/LeeTest/footerImg/homeLink_icon_active.svg",revision:"8d9c4b9fcb6a1b5e42f6f9883ca1bc79"},{url:"/LeeTest/footerImg/myPageLink_icon.svg",revision:"d404bdf631a9de0df48c7fc893cb3d5a"},{url:"/LeeTest/footerImg/myPageLink_icon_active.svg",revision:"545d5b840b8fffb5bffa13896642f74f"},{url:"/LeeTest/img/accArrow_icon.svg",revision:"af08acd7a69193df01386a8123de4f0f"},{url:"/LeeTest/img/emailLogin_icon.svg",revision:"1ba18cd33e6d870db6e63174b37b05d6"},{url:"/LeeTest/img/eye_active_icon.svg",revision:"abad4a4c7378617185ae1bb3af5823ad"},{url:"/LeeTest/img/eye_icon.svg",revision:"fbffdbd52df65b4e1437ba9ee0c288d1"},{url:"/LeeTest/img/groomer_gray_icon.svg",revision:"7c6e42780f5e435a83b7897553f650b3"},{url:"/LeeTest/img/groomer_icon.svg",revision:"96cdfdcc6ce6d3d1aaaa472726e24b5c"},{url:"/LeeTest/img/intro_cat_icon.svg",revision:"9dd41bd2ecc43f5e4b671c594e117975"},{url:"/LeeTest/img/intro_dog_icon.svg",revision:"5f6c37d91ec7417c73b73ad4a13d1da0"},{url:"/LeeTest/img/intro_text_icon.svg",revision:"7cd7b0ea5463dc8a63206f1ee1890add"},{url:"/LeeTest/img/kakaoLogin_icon.svg",revision:"c2ea27aba39ee47f8b5af96b56ff5603"},{url:"/LeeTest/img/kakao_icon.svg",revision:"dfe20eac043219609887dfb6f7781ee6"},{url:"/LeeTest/img/login_bg.svg",revision:"efaa4cf9f3d1fe5a1b89568d6f38f888"},{url:"/LeeTest/img/logo.svg",revision:"3aef2211f5b24c44a5fedaee9341895d"},{url:"/LeeTest/img/normalLogin_icon.svg",revision:"e8bca9d539f5000e85c94365b0ab14a0"},{url:"/LeeTest/img/owner_gray_icon.svg",revision:"580600871fe7aec9226d08a037027cbe"},{url:"/LeeTest/img/owner_icon.svg",revision:"2e7736472d1d441cf42658cb56fe3dd4"},{url:"/LeeTest/img/prev_arrow_icon.svg",revision:"7399e06a415a9305d9b0273db96f792e"},{url:"/LeeTest/img/slide_ani.svg",revision:"d8bea524d51d88c1acd1b7517457951b"},{url:"/LeeTest/img/test.svg",revision:"9b51c9dc6966810ee7229068332e61ff"},{url:"/LeeTest/img/text_arrow_icon.svg",revision:"961d9d66eae0e7d170512b83e295e927"},{url:"/LeeTest/img/whiteCheck_icon.svg",revision:"2f4d8bc97fd7a0b0243ad97dcc1c8782"},{url:"/Noti.png",revision:"ae161efab7a741f7922adf388718bcb3"},{url:"/_next/app-build-manifest.json",revision:"ea8290f88e3096f19e86b9574641c5a4"},{url:"/_next/static/07yM62hchPzFgn3QYvPlM/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/07yM62hchPzFgn3QYvPlM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/174-c3a2fba41d6f8ebe.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/396-130c813b352c17c7.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/540-95d1fe153d2b61c0.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/68-a9693971e7232c67.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/_not-found-b567d34dc31a51c0.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/layout-4f03c176064e94ad.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/page-f4f296a6f852a08e.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/detail/page-a97f3001c8253c03.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/favorite/page-40c48f5ec05bb380.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/home/page-5cac4c783517ef28.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/intro/page-e55e606a860c1043.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/list/page-e76c5f37e2b74879.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/login/page-8579e0042c4b7105.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/mypage/page-8fe2d96260899047.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/signup/page-470582ebce8ac03a.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/signupterms/page-bbb5524a31fef7f1.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/signuptype/page-94db67bea011161e.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/app/pages/test/page-eac420e1a3dfb934.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/fd9d1056-2a8624ac6eab5f75.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/main-app-0190209b3e9b1638.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/main-f24d44dc94a6d0df.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6636411965fee397.js",revision:"07yM62hchPzFgn3QYvPlM"},{url:"/_next/static/css/12e9e5b82f70561e.css",revision:"12e9e5b82f70561e"},{url:"/_next/static/css/17e7a5b280c9bbc4.css",revision:"17e7a5b280c9bbc4"},{url:"/_next/static/css/53f7c1d9e3bfedd4.css",revision:"53f7c1d9e3bfedd4"},{url:"/_next/static/css/61506151dd5987f9.css",revision:"61506151dd5987f9"},{url:"/_next/static/css/676bca15b6f6f8fb.css",revision:"676bca15b6f6f8fb"},{url:"/_next/static/css/9bc00760b1a0b1a7.css",revision:"9bc00760b1a0b1a7"},{url:"/_next/static/css/be50c751ee20280b.css",revision:"be50c751ee20280b"},{url:"/_next/static/css/cb3fcb28e30c7271.css",revision:"cb3fcb28e30c7271"},{url:"/_next/static/css/d4772952cab24bcc.css",revision:"d4772952cab24bcc"},{url:"/_next/static/css/f4a126191d92afc6.css",revision:"f4a126191d92afc6"},{url:"/_next/static/css/fc37483816e65df2.css",revision:"fc37483816e65df2"},{url:"/asset/detail/arrow-gray-icon.svg",revision:"435e563e9828ab65fe86a527349036ec"},{url:"/asset/detail/copy.svg",revision:"89e8c1e4f565b69ce6e40e31b9ee4dbf"},{url:"/asset/detail/kakao_logo.svg",revision:"02b4040e7658e6faff4e9577af7fa3cd"},{url:"/asset/detail/like-color-icon.svg",revision:"5deaed95b11748bc3ed3d146b0a40e52"},{url:"/asset/detail/like-icon.svg",revision:"2768cd9021685c4031756060fdeceddc"},{url:"/asset/detail/location-icon-color.svg",revision:"7af5a6849d8e5bfb38d2fdf7db2666b4"},{url:"/asset/detail/location-icon.svg",revision:"0d408106a37d8a40b6f24db00b5b4784"},{url:"/asset/detail/share-icon.svg",revision:"fa4d36a0754bce194cd86af6c2994065"},{url:"/asset/detail/tel-icon.svg",revision:"36af641f2c773d3ae97bf527eb5c7482"},{url:"/asset/list/desiner.png",revision:"c0a7d1e413c8d2c4524656db87dc39e5"},{url:"/asset/list/reload.svg",revision:"996c34c0235c345275816cf22bbdf716"},{url:"/asset/list/test1.png",revision:"f5acc2383ba5cc76ce5edfd9fbd0fd72"},{url:"/asset/list/test2.png",revision:"19620213791b9aacebf06f669a4b55be"},{url:"/asset/list/test3.png",revision:"018299b4c9416669bf62fe2fecfb50a3"},{url:"/asset/list/test4.png",revision:"cff33b0042283e8259836db981a53fca"},{url:"/asset/mypage/pensil.png",revision:"b3cfd7ca1364fbd4c43eedc8e1783fe3"},{url:"/asset/mypage/setting.png",revision:"179e50f9537aaf57f3e1c95c6466925e"},{url:"/close.png",revision:"c8e511c33f1cf45563f0077b22937de4"},{url:"/favorite.png",revision:"147cef1a552d5803f22b7289336c931d"},{url:"/heart.png",revision:"94df0b0bd4054e8abf33963674621d7d"},{url:"/home.png",revision:"aec1ea56f71344591b67c517de41ddc5"},{url:"/icons/apple-touch-icon-114x114.png",revision:"5e54044b2a2049f9ae2ab354f5a0f755"},{url:"/icons/apple-touch-icon-120x120.png",revision:"b1f6319bca75bbeba89fb119d30bb9fe"},{url:"/icons/apple-touch-icon-144x144.png",revision:"747f2a51d76a3b90eeca69b9878bbfcc"},{url:"/icons/apple-touch-icon-152x152.png",revision:"a1012d116d6ba7fdd2b1378614fa6a2b"},{url:"/icons/apple-touch-icon-57x57.png",revision:"9c3ad393f4eba9bcae614f24783d7aa6"},{url:"/icons/apple-touch-icon-60x60.png",revision:"360e7ebce85d3058bdaedec3574182c1"},{url:"/icons/apple-touch-icon-72x72.png",revision:"5596fff1be1f59e8c915719211cb1569"},{url:"/icons/apple-touch-icon-76x76.png",revision:"d7375ab66deab807e6748a34d7714046"},{url:"/icons/favicon-128.png",revision:"51111692f9ad05de307edb9aa7216e96"},{url:"/icons/favicon-16x16.png",revision:"2e73f976dc5581c82f104cf56a17730a"},{url:"/icons/favicon-196x196.png",revision:"5bba5e6b1d0e75714f94e4c7a0393c65"},{url:"/icons/favicon-32x32.png",revision:"a31ad69b755e2fcd38c16675c6f73b50"},{url:"/icons/favicon-96x96.png",revision:"8c589bfc9cf0ce51a32d1ba429ff0b7b"},{url:"/icons/favicon.ico",revision:"d84c2263d21d6450f7d886db3369e253"},{url:"/icons/mstile-144x144.png",revision:"747f2a51d76a3b90eeca69b9878bbfcc"},{url:"/icons/mstile-150x150.png",revision:"898a6c4a3dc64e1a46a7032c2d776518"},{url:"/icons/mstile-310x150.png",revision:"07c51d668dcf118e98357e70320a6645"},{url:"/icons/mstile-310x310.png",revision:"fa0ac249f1619b90e40f8d4c056702ed"},{url:"/icons/mstile-70x70.png",revision:"51111692f9ad05de307edb9aa7216e96"},{url:"/km.png",revision:"bcfc18a7b4f48d836704f291e086776c"},{url:"/like01.png",revision:"804e976e05e774eda7cac482ec081741"},{url:"/like02.png",revision:"89582f4b51c8b3fd192eabe96eb6be45"},{url:"/logo.png",revision:"dc78d131d9a31837035adbc18343dc0a"},{url:"/manifest.json",revision:"145992f190264d3b29bd8ced995ac4c5"},{url:"/my.png",revision:"fa9fbd49f465d3caef157f6d850d550c"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/notice.png",revision:"ac6f34b2a29c625e802ebaf0c6fb66a7"},{url:"/serch.png",revision:"13d6c07dfd25e31c283bcf33d95a70be"},{url:"/star.png",revision:"f94a13fe713f08243aede0c11e8356c1"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
