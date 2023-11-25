import{q as me,y as _e}from"../chunks/scheduler.953cfe2b.js";import{S as ze,a as Je,I as M,g as De,f as Ne,c as we,d as le,e as te,i as ye,s as F,o as qe,b as z,P as Me,h as Qe}from"../chunks/singletons.021c165b.js";import{u as Ze}from"../chunks/parse.bee59afc.js";import{R as He,H as ne}from"../chunks/control.f5b05b5f.js";function et(n,o){return n==="/"||o==="ignore"?n:o==="never"?n.endsWith("/")?n.slice(0,-1):n:o==="always"&&!n.endsWith("/")?n+"/":n}function tt(n){return n.split("%25").map(decodeURI).join("%25")}function nt(n){for(const o in n)n[o]=decodeURIComponent(n[o]);return n}const at=["href","pathname","search","searchParams","toString","toJSON"];function rt(n,o){const f=new URL(n);for(const c of at)Object.defineProperty(f,c,{get(){return o(),n[c]},enumerable:!0,configurable:!0});return ot(f),f}function ot(n){Object.defineProperty(n,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const it="/__data.json";function st(n){return n.replace(/\/$/,"")+it}function ct(...n){let o=5381;for(const f of n)if(typeof f=="string"){let c=f.length;for(;c;)o=o*33^f.charCodeAt(--c)}else if(ArrayBuffer.isView(f)){const c=new Uint8Array(f.buffer,f.byteOffset,f.byteLength);let h=c.length;for(;h;)o=o*33^c[--h]}else throw new TypeError("value must be a string or TypedArray");return(o>>>0).toString(36)}const Be=window.fetch;window.fetch=(n,o)=>((n instanceof Request?n.method:(o==null?void 0:o.method)||"GET")!=="GET"&&ae.delete(Ee(n)),Be(n,o));const ae=new Map;function lt(n,o){const f=Ee(n,o),c=document.querySelector(f);if(c!=null&&c.textContent){const{body:h,...v}=JSON.parse(c.textContent),S=c.getAttribute("data-ttl");return S&&ae.set(f,{body:h,init:v,ttl:1e3*Number(S)}),Promise.resolve(new Response(h,v))}return window.fetch(n,o)}function ft(n,o,f){if(ae.size>0){const c=Ee(n,f),h=ae.get(c);if(h){if(performance.now()<h.ttl&&["default","force-cache","only-if-cached",void 0].includes(f==null?void 0:f.cache))return new Response(h.body,h.init);ae.delete(c)}}return window.fetch(o,f)}function Ee(n,o){let c=`script[data-sveltekit-fetched][data-url=${JSON.stringify(n instanceof Request?n.url:n)}]`;if(o!=null&&o.headers||o!=null&&o.body){const h=[];o.headers&&h.push([...new Headers(o.headers)].join(",")),o.body&&(typeof o.body=="string"||ArrayBuffer.isView(o.body))&&h.push(o.body),c+=`[data-hash="${ct(...h)}"]`}return c}const ut=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function dt(n){const o=[];return{pattern:n==="/"?/^\/$/:new RegExp(`^${ht(n).map(c=>{const h=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(c);if(h)return o.push({name:h[1],matcher:h[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const v=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(c);if(v)return o.push({name:v[1],matcher:v[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!c)return;const S=c.split(/\[(.+?)\](?!\])/);return"/"+S.map((_,b)=>{if(b%2){if(_.startsWith("x+"))return ve(String.fromCharCode(parseInt(_.slice(2),16)));if(_.startsWith("u+"))return ve(String.fromCharCode(..._.slice(2).split("-").map(O=>parseInt(O,16))));const u=ut.exec(_);if(!u)throw new Error(`Invalid param: ${_}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,j,D,C,N]=u;return o.push({name:C,matcher:N,optional:!!j,rest:!!D,chained:D?b===1&&S[0]==="":!1}),D?"(.*?)":j?"([^/]*)?":"([^/]+?)"}return ve(_)}).join("")}).join("")}/?$`),params:o}}function pt(n){return!/^\([^)]+\)$/.test(n)}function ht(n){return n.slice(1).split("/").filter(pt)}function gt(n,o,f){const c={},h=n.slice(1),v=h.filter(m=>m!==void 0);let S=0;for(let m=0;m<o.length;m+=1){const _=o[m];let b=h[m-S];if(_.chained&&_.rest&&S&&(b=h.slice(m-S,m+1).filter(u=>u).join("/"),S=0),b===void 0){_.rest&&(c[_.name]="");continue}if(!_.matcher||f[_.matcher](b)){c[_.name]=b;const u=o[m+1],j=h[m+1];u&&!u.rest&&u.optional&&j&&_.chained&&(S=0),!u&&!j&&Object.keys(c).length===v.length&&(S=0);continue}if(_.optional&&_.chained){S++;continue}return}if(!S)return c}function ve(n){return n.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function mt({nodes:n,server_loads:o,dictionary:f,matchers:c}){const h=new Set(o);return Object.entries(f).map(([m,[_,b,u]])=>{const{pattern:j,params:D}=dt(m),C={id:m,exec:N=>{const O=j.exec(N);if(O)return gt(O,D,c)},errors:[1,...u||[]].map(N=>n[N]),layouts:[0,...b||[]].map(S),leaf:v(_)};return C.errors.length=C.layouts.length=Math.max(C.errors.length,C.layouts.length),C});function v(m){const _=m<0;return _&&(m=~m),[_,n[m]]}function S(m){return m===void 0?m:[h.has(m),n[m]]}}function Ge(n){try{return JSON.parse(sessionStorage[n])}catch{}}function Ve(n,o){const f=JSON.stringify(o);try{sessionStorage[n]=f}catch{}}function _t(n){return n.filter(o=>o!=null)}const We=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...We];const wt=new Set([...We]);[...wt];async function yt(n){var o;for(const f in n)if(typeof((o=n[f])==null?void 0:o.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(n).map(async([c,h])=>[c,await h])));return n}const vt="x-sveltekit-invalidated",bt="x-sveltekit-trailing-slash",J=Ge(ze)??{},ee=Ge(Je)??{};function be(n){J[n]=te()}function B(n){return location.href=n.href,new Promise(()=>{})}function St(n,o){var je;const f=mt(n),c=n.nodes[0],h=n.nodes[1];c(),h();const v=document.documentElement,S=[],m=[];let _=null;const b={before_navigate:[],on_navigate:[],after_navigate:[]};let u={branch:[],error:null,url:null},j=!1,D=!1,C=!0,N=!1,O=!1,T=!1,G=!1,H,U=(je=history.state)==null?void 0:je[M];U||(U=Date.now(),history.replaceState({...history.state,[M]:U},"",location.href));const fe=J[U];fe&&(history.scrollRestoration="manual",scrollTo(fe.x,fe.y));let V,W,Y;async function xe(){if(Y=Y||Promise.resolve(),await Y,!Y)return;Y=null;const e=new URL(location.href),i=Q(e,!0);_=null;const t=W={},r=i&&await pe(i);if(t===W&&r){if(r.type==="redirect")return re(new URL(r.location,e).href,{},1,t);r.props.page!==void 0&&(V=r.props.page),H.$set(r.props)}}function Re(e){m.some(i=>i==null?void 0:i.snapshot)&&(ee[e]=m.map(i=>{var t;return(t=i==null?void 0:i.snapshot)==null?void 0:t.capture()}))}function ke(e){var i;(i=ee[e])==null||i.forEach((t,r)=>{var a,s;(s=(a=m[r])==null?void 0:a.snapshot)==null||s.restore(t)})}function Le(){be(U),Ve(ze,J),Re(U),Ve(Je,ee)}async function re(e,{noScroll:i=!1,replaceState:t=!1,keepFocus:r=!1,state:a={},invalidateAll:s=!1},l,w){return typeof e=="string"&&(e=new URL(e,De(document))),ce({url:e,scroll:i?te():null,keepfocus:r,redirect_count:l,details:{state:a,replaceState:t},nav_token:w,accepted:()=>{s&&(G=!0)},blocked:()=>{},type:"goto"})}async function Ae(e){return _={id:e.id,promise:pe(e).then(i=>(i.type==="loaded"&&i.state.error&&(_=null),i))},_.promise}async function oe(...e){const t=f.filter(r=>e.some(a=>r.exec(a))).map(r=>Promise.all([...r.layouts,r.leaf].map(a=>a==null?void 0:a[1]())));await Promise.all(t)}function Pe(e){var r;u=e.state;const i=document.querySelector("style[data-sveltekit]");i&&i.remove(),V=e.props.page,H=new n.root({target:o,props:{...e.props,stores:F,components:m},hydrate:!0}),ke(U);const t={from:null,to:{params:u.params,route:{id:((r=u.route)==null?void 0:r.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};b.after_navigate.forEach(a=>a(t)),D=!0}async function X({url:e,params:i,branch:t,status:r,error:a,route:s,form:l}){let w="never";for(const p of t)(p==null?void 0:p.slash)!==void 0&&(w=p.slash);e.pathname=et(e.pathname,w),e.search=e.search;const y={type:"loaded",state:{url:e,params:i,branch:t,error:a,route:s},props:{constructors:_t(t).map(p=>p.node.component)}};l!==void 0&&(y.props.form=l);let g={},L=!V,R=0;for(let p=0;p<Math.max(t.length,u.branch.length);p+=1){const d=t[p],P=u.branch[p];(d==null?void 0:d.data)!==(P==null?void 0:P.data)&&(L=!0),d&&(g={...g,...d.data},L&&(y.props[`data_${R}`]=g),R+=1)}return(!u.url||e.href!==u.url.href||u.error!==a||l!==void 0&&l!==V.form||L)&&(y.props.page={error:a,params:i,route:{id:(s==null?void 0:s.id)??null},status:r,url:new URL(e),form:l??null,data:L?g:V.data}),y}async function ue({loader:e,parent:i,url:t,params:r,route:a,server_data_node:s}){var g,L,R;let l=null;const w={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},y=await e();if((g=y.universal)!=null&&g.load){let A=function(...d){for(const P of d){const{href:I}=new URL(P,t);w.dependencies.add(I)}};const p={route:new Proxy(a,{get:(d,P)=>(w.route=!0,d[P])}),params:new Proxy(r,{get:(d,P)=>(w.params.add(P),d[P])}),data:(s==null?void 0:s.data)??null,url:rt(t,()=>{w.url=!0}),async fetch(d,P){let I;d instanceof Request?(I=d.url,P={body:d.method==="GET"||d.method==="HEAD"?void 0:await d.blob(),cache:d.cache,credentials:d.credentials,headers:d.headers,integrity:d.integrity,keepalive:d.keepalive,method:d.method,mode:d.mode,redirect:d.redirect,referrer:d.referrer,referrerPolicy:d.referrerPolicy,signal:d.signal,...P}):I=d;const q=new URL(I,t);return A(q.href),q.origin===t.origin&&(I=q.href.slice(t.origin.length)),D?ft(I,q.href,P):lt(I,P)},setHeaders:()=>{},depends:A,parent(){return w.parent=!0,i()}};l=await y.universal.load.call(null,p)??null,l=l?await yt(l):null}return{node:y,loader:e,server:s,universal:(L=y.universal)!=null&&L.load?{type:"data",data:l,uses:w}:null,data:l??(s==null?void 0:s.data)??null,slash:((R=y.universal)==null?void 0:R.trailingSlash)??(s==null?void 0:s.slash)}}function Ue(e,i,t,r,a){if(G)return!0;if(!r)return!1;if(r.parent&&e||r.route&&i||r.url&&t)return!0;for(const s of r.params)if(a[s]!==u.params[s])return!0;for(const s of r.dependencies)if(S.some(l=>l(new URL(s))))return!0;return!1}function de(e,i){return(e==null?void 0:e.type)==="data"?e:(e==null?void 0:e.type)==="skip"?i??null:null}async function pe({id:e,invalidating:i,url:t,params:r,route:a}){if((_==null?void 0:_.id)===e)return _.promise;const{errors:s,layouts:l,leaf:w}=a,y=[...l,w];s.forEach(E=>E==null?void 0:E().catch(()=>{})),y.forEach(E=>E==null?void 0:E[1]().catch(()=>{}));let g=null;const L=u.url?e!==u.url.pathname+u.url.search:!1,R=u.route?a.id!==u.route.id:!1;let A=!1;const p=y.map((E,k)=>{var K;const x=u.branch[k],$=!!(E!=null&&E[0])&&((x==null?void 0:x.loader)!==E[1]||Ue(A,R,L,(K=x.server)==null?void 0:K.uses,r));return $&&(A=!0),$});if(p.some(Boolean)){try{g=await Fe(t,p)}catch(E){return ie({status:E instanceof ne?E.status:500,error:await Z(E,{url:t,params:r,route:{id:a.id}}),url:t,route:a})}if(g.type==="redirect")return g}const d=g==null?void 0:g.nodes;let P=!1;const I=y.map(async(E,k)=>{var he;if(!E)return;const x=u.branch[k],$=d==null?void 0:d[k];if((!$||$.type==="skip")&&E[1]===(x==null?void 0:x.loader)&&!Ue(P,R,L,(he=x.universal)==null?void 0:he.uses,r))return x;if(P=!0,($==null?void 0:$.type)==="error")throw $;return ue({loader:E[1],url:t,params:r,route:a,parent:async()=>{var Te;const Ce={};for(let ge=0;ge<k;ge+=1)Object.assign(Ce,(Te=await I[ge])==null?void 0:Te.data);return Ce},server_data_node:de($===void 0&&E[0]?{type:"skip"}:$??null,E[0]?x==null?void 0:x.server:void 0)})});for(const E of I)E.catch(()=>{});const q=[];for(let E=0;E<y.length;E+=1)if(y[E])try{q.push(await I[E])}catch(k){if(k instanceof He)return{type:"redirect",location:k.location};let x=500,$;if(d!=null&&d.includes(k))x=k.status??x,$=k.error;else if(k instanceof ne)x=k.status,$=k.body;else{if(await F.updated.check())return await B(t);$=await Z(k,{params:r,url:t,route:{id:a.id}})}const K=await Oe(E,q,s);return K?await X({url:t,params:r,branch:q.slice(0,K.idx).concat(K.node),status:x,error:$,route:a}):await $e(t,{id:a.id},$,x)}else q.push(void 0);return await X({url:t,params:r,branch:q,status:200,error:null,route:a,form:i?void 0:null})}async function Oe(e,i,t){for(;e--;)if(t[e]){let r=e;for(;!i[r];)r-=1;try{return{idx:r+1,node:{node:await t[e](),loader:t[e],data:{},server:null,universal:null}}}catch{continue}}}async function ie({status:e,error:i,url:t,route:r}){const a={};let s=null;if(n.server_loads[0]===0)try{const g=await Fe(t,[!0]);if(g.type!=="data"||g.nodes[0]&&g.nodes[0].type!=="data")throw 0;s=g.nodes[0]??null}catch{(t.origin!==qe||t.pathname!==location.pathname||j)&&await B(t)}const w=await ue({loader:c,url:t,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:de(s)}),y={node:await h(),loader:h,universal:null,server:null,data:null};return await X({url:t,params:a,branch:[w,y],status:e,error:i,route:null})}function Q(e,i){if(ye(e,z))return;const t=se(e);for(const r of f){const a=r.exec(t);if(a)return{id:e.pathname+e.search,invalidating:i,route:r,params:nt(a),url:e}}}function se(e){return tt(e.pathname.slice(z.length)||"/")}function Ie({url:e,type:i,intent:t,delta:r}){let a=!1;const s=Ke(u,t,e,i);r!==void 0&&(s.navigation.delta=r);const l={...s.navigation,cancel:()=>{a=!0,s.reject(new Error("navigation was cancelled"))}};return O||b.before_navigate.forEach(w=>w(l)),a?null:s}async function ce({url:e,scroll:i,keepfocus:t,redirect_count:r,details:a,type:s,delta:l,nav_token:w={},accepted:y,blocked:g}){var I,q,E;const L=Q(e,!1),R=Ie({url:e,type:s,delta:l,intent:L});if(!R){g();return}const A=U;y(),O=!0,D&&F.navigating.set(R.navigation),W=w;let p=L&&await pe(L);if(!p){if(ye(e,z))return await B(e);p=await $e(e,{id:null},await Z(new Error(`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(L==null?void 0:L.url)||e,W!==w)return R.reject(new Error("navigation was aborted")),!1;if(p.type==="redirect")if(r>=20)p=await ie({status:500,error:await Z(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return re(new URL(p.location,e).href,{},r+1,w),!1;else((I=p.props.page)==null?void 0:I.status)>=400&&await F.updated.check()&&await B(e);if(S.length=0,G=!1,N=!0,be(A),Re(A),(q=p.props.page)!=null&&q.url&&p.props.page.url.pathname!==e.pathname&&(e.pathname=(E=p.props.page)==null?void 0:E.url.pathname),a){const k=a.replaceState?0:1;if(a.state[M]=U+=k,history[a.replaceState?"replaceState":"pushState"](a.state,"",e),!a.replaceState){let x=U+1;for(;ee[x]||J[x];)delete ee[x],delete J[x],x+=1}}if(_=null,D){u=p.state,p.props.page&&(p.props.page.url=e);const k=(await Promise.all(b.on_navigate.map(x=>x(R.navigation)))).filter(x=>typeof x=="function");if(k.length>0){let x=function(){b.after_navigate=b.after_navigate.filter($=>!k.includes($))};k.push(x),b.after_navigate.push(...k)}H.$set(p.props)}else Pe(p);const{activeElement:d}=document;if(await _e(),C){const k=e.hash&&document.getElementById(decodeURIComponent(e.hash.slice(1)));i?scrollTo(i.x,i.y):k?k.scrollIntoView():scrollTo(0,0)}const P=document.activeElement!==d&&document.activeElement!==document.body;!t&&!P&&Se(),C=!0,p.props.page&&(V=p.props.page),O=!1,s==="popstate"&&ke(U),R.fulfil(void 0),b.after_navigate.forEach(k=>k(R.navigation)),F.navigating.set(null),N=!1}async function $e(e,i,t,r){return e.origin===qe&&e.pathname===location.pathname&&!j?await ie({status:r,error:t,url:e,route:i}):await B(e)}function Xe(){let e;v.addEventListener("mousemove",s=>{const l=s.target;clearTimeout(e),e=setTimeout(()=>{r(l,2)},20)});function i(s){r(s.composedPath()[0],1)}v.addEventListener("mousedown",i),v.addEventListener("touchstart",i,{passive:!0});const t=new IntersectionObserver(s=>{for(const l of s)l.isIntersecting&&(oe(se(new URL(l.target.href))),t.unobserve(l.target))},{threshold:0});function r(s,l){const w=Ne(s,v);if(!w)return;const{url:y,external:g,download:L}=we(w,z);if(g||L)return;const R=le(w);if(!R.reload)if(l<=R.preload_data){const A=Q(y,!1);A&&Ae(A)}else l<=R.preload_code&&oe(se(y))}function a(){t.disconnect();for(const s of v.querySelectorAll("a")){const{url:l,external:w,download:y}=we(s,z);if(w||y)continue;const g=le(s);g.reload||(g.preload_code===Me.viewport&&t.observe(s),g.preload_code===Me.eager&&oe(se(l)))}}b.after_navigate.push(a),a()}function Z(e,i){return e instanceof ne?e.body:n.hooks.handleError({error:e,event:i})??{message:i.route.id!=null?"Internal Error":"Not Found"}}return{after_navigate:e=>{me(()=>(b.after_navigate.push(e),()=>{const i=b.after_navigate.indexOf(e);b.after_navigate.splice(i,1)}))},before_navigate:e=>{me(()=>(b.before_navigate.push(e),()=>{const i=b.before_navigate.indexOf(e);b.before_navigate.splice(i,1)}))},on_navigate:e=>{me(()=>(b.on_navigate.push(e),()=>{const i=b.on_navigate.indexOf(e);b.on_navigate.splice(i,1)}))},disable_scroll_handling:()=>{(N||!D)&&(C=!1)},goto:(e,i={})=>re(e,i,0),invalidate:e=>{if(typeof e=="function")S.push(e);else{const{href:i}=new URL(e,location.href);S.push(t=>t.href===i)}return xe()},invalidate_all:()=>(G=!0,xe()),preload_data:async e=>{const i=new URL(e,De(document)),t=Q(i,!1);if(!t)throw new Error(`Attempted to preload a URL that does not belong to this app: ${i}`);await Ae(t)},preload_code:oe,apply_action:async e=>{if(e.type==="error"){const i=new URL(location.href),{branch:t,route:r}=u;if(!r)return;const a=await Oe(u.branch.length,t,r.errors);if(a){const s=await X({url:i,params:u.params,branch:t.slice(0,a.idx).concat(a.node),status:e.status??500,error:e.error,route:r});u=s.state,H.$set(s.props),_e().then(Se)}}else e.type==="redirect"?re(e.location,{invalidateAll:!0},0):(H.$set({form:null,page:{...V,form:e.data,status:e.status}}),await _e(),H.$set({form:e.data}),e.type==="success"&&Se())},_start_router:()=>{var i;history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let r=!1;if(Le(),!O){const a=Ke(u,void 0,null,"leave"),s={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation was cancelled"))}};b.before_navigate.forEach(l=>l(s))}r?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Le()}),(i=navigator.connection)!=null&&i.saveData||Xe(),v.addEventListener("click",t=>{var A;if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const r=Ne(t.composedPath()[0],v);if(!r)return;const{url:a,external:s,target:l,download:w}=we(r,z);if(!a)return;if(l==="_parent"||l==="_top"){if(window.parent!==window)return}else if(l&&l!=="_self")return;const y=le(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||w)return;if(s||y.reload){Ie({url:a,type:"link"})?O=!0:t.preventDefault();return}const[L,R]=a.href.split("#");if(R!==void 0&&L===location.href.split("#")[0]){if(u.url.hash===a.hash){t.preventDefault(),(A=r.ownerDocument.getElementById(R))==null||A.scrollIntoView();return}if(T=!0,be(U),e(a),!y.replace_state)return;T=!1,t.preventDefault()}ce({url:a,scroll:y.noscroll?te():null,keepfocus:y.keep_focus??!1,redirect_count:0,details:{state:{},replaceState:y.replace_state??a.href===location.href},accepted:()=>t.preventDefault(),blocked:()=>t.preventDefault(),type:"link"})}),v.addEventListener("submit",t=>{if(t.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(t.target),a=t.submitter;if(((a==null?void 0:a.formMethod)||r.method)!=="get")return;const l=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(ye(l,z))return;const w=t.target,{keep_focus:y,noscroll:g,reload:L,replace_state:R}=le(w);if(L)return;t.preventDefault(),t.stopPropagation();const A=new FormData(w),p=a==null?void 0:a.getAttribute("name");p&&A.append(p,(a==null?void 0:a.getAttribute("value"))??""),l.search=new URLSearchParams(A).toString(),ce({url:l,scroll:g?te():null,keepfocus:y??!1,redirect_count:0,details:{state:{},replaceState:R??l.href===location.href},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",async t=>{var r;if(W={},(r=t.state)!=null&&r[M]){if(t.state[M]===U)return;const a=J[t.state[M]],s=new URL(location.href);if(u.url.href.split("#")[0]===location.href.split("#")[0]){e(s),J[U]=te(),U=t.state[M],scrollTo(a.x,a.y);return}const l=t.state[M]-U;await ce({url:s,scroll:a,keepfocus:!1,redirect_count:0,details:null,accepted:()=>{U=t.state[M]},blocked:()=>{history.go(-l)},type:"popstate",delta:l,nav_token:W})}else if(!T){const a=new URL(location.href);e(a)}}),addEventListener("hashchange",()=>{T&&(T=!1,history.replaceState({...history.state,[M]:++U},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&F.navigating.set(null)});function e(t){u.url=t,F.page.set({...V,url:t}),F.page.notify()}},_hydrate:async({status:e=200,error:i,node_ids:t,params:r,route:a,data:s,form:l})=>{j=!0;const w=new URL(location.href);({params:r={},route:a={id:null}}=Q(w,!1)||{});let y;try{const g=t.map(async(A,p)=>{const d=s[p];return d!=null&&d.uses&&(d.uses=Ye(d.uses)),ue({loader:n.nodes[A],url:w,params:r,route:a,parent:async()=>{const P={};for(let I=0;I<p;I+=1)Object.assign(P,(await g[I]).data);return P},server_data_node:de(d)})}),L=await Promise.all(g),R=f.find(({id:A})=>A===a.id);if(R){const A=R.layouts;for(let p=0;p<A.length;p++)A[p]||L.splice(p,0,void 0)}y=await X({url:w,params:r,branch:L,status:e,error:i,form:l,route:R??null})}catch(g){if(g instanceof He){await B(new URL(g.location,location.href));return}y=await ie({status:g instanceof ne?g.status:500,error:await Z(g,{url:w,params:r,route:a}),url:w,route:a})}Pe(y)}}}async function Fe(n,o){var h;const f=new URL(n);f.pathname=st(n.pathname),n.pathname.endsWith("/")&&f.searchParams.append(bt,"1"),f.searchParams.append(vt,o.map(v=>v?"1":"0").join(""));const c=await Be(f.href);if((h=c.headers.get("content-type"))!=null&&h.includes("text/html")&&await B(n),!c.ok)throw new ne(c.status,await c.json());return new Promise(async v=>{var j;const S=new Map,m=c.body.getReader(),_=new TextDecoder;function b(D){return Ze(D,{Promise:C=>new Promise((N,O)=>{S.set(C,{fulfil:N,reject:O})})})}let u="";for(;;){const{done:D,value:C}=await m.read();if(D&&!u)break;for(u+=!C&&u?`
`:_.decode(C);;){const N=u.indexOf(`
`);if(N===-1)break;const O=JSON.parse(u.slice(0,N));if(u=u.slice(N+1),O.type==="redirect")return v(O);if(O.type==="data")(j=O.nodes)==null||j.forEach(T=>{(T==null?void 0:T.type)==="data"&&(T.uses=Ye(T.uses),T.data=b(T.data))}),v(O);else if(O.type==="chunk"){const{id:T,data:G,error:H}=O,U=S.get(T);S.delete(T),H?U.reject(b(H)):U.fulfil(b(G))}}}})}function Ye(n){return{dependencies:new Set((n==null?void 0:n.dependencies)??[]),params:new Set((n==null?void 0:n.params)??[]),parent:!!(n!=null&&n.parent),route:!!(n!=null&&n.route),url:!!(n!=null&&n.url)}}function Se(){const n=document.querySelector("[autofocus]");if(n)n.focus();else{const o=document.body,f=o.getAttribute("tabindex");o.tabIndex=-1,o.focus({preventScroll:!0,focusVisible:!1}),f!==null?o.setAttribute("tabindex",f):o.removeAttribute("tabindex");const c=getSelection();if(c&&c.type!=="None"){const h=[];for(let v=0;v<c.rangeCount;v+=1)h.push(c.getRangeAt(v));setTimeout(()=>{if(c.rangeCount===h.length){for(let v=0;v<c.rangeCount;v+=1){const S=h[v],m=c.getRangeAt(v);if(S.commonAncestorContainer!==m.commonAncestorContainer||S.startContainer!==m.startContainer||S.endContainer!==m.endContainer||S.startOffset!==m.startOffset||S.endOffset!==m.endOffset)return}c.removeAllRanges()}})}}}function Ke(n,o,f,c){var _,b;let h,v;const S=new Promise((u,j)=>{h=u,v=j});return S.catch(()=>{}),{navigation:{from:{params:n.params,route:{id:((_=n.route)==null?void 0:_.id)??null},url:n.url},to:f&&{params:(o==null?void 0:o.params)??null,route:{id:((b=o==null?void 0:o.route)==null?void 0:b.id)??null},url:f},willUnload:!o,type:c,complete:S},fulfil:h,reject:v}}async function Lt(n,o,f){const c=St(n,o);Qe({client:c}),f?await c._hydrate(f):c.goto(location.href,{replaceState:!0}),c._start_router()}export{Lt as start};