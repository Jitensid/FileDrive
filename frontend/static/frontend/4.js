(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{229:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return Ee}));var n=t(0),l=t.n(n),r=t(12),c=t(206),o=t(233),s=t(228),i=t(225),m=t(226),u=t(211),d=t(208),p=t(207),E=t(169),f=t.n(E),h=t(212);var g=function(e){return l.a.createElement(h.a,{color:"inherit",onClick:()=>{e.handleThemeChange()}},l.a.createElement(f.a,null))},b=t(170),k=t.n(b);var v=()=>l.a.createElement(h.a,{color:"inherit",href:"https://github.com/Jitensid/Drive"},l.a.createElement(k.a,null)),F=t(176),w=t(216),x=t(171),S=t.n(x);var C=function(){const[e,a]=l.a.useState(null),t=()=>{a(null)};return l.a.createElement(l.a.Fragment,null,l.a.createElement(h.a,{color:"inherit",onClick:e=>{a(e.currentTarget)}},l.a.createElement(S.a,null)),l.a.createElement(F.a,{id:"simple-menu",anchorEl:e,keepMounted:!0,open:Boolean(e),onClose:t},l.a.createElement(w.a,{onClick:()=>{localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),t(),window.location.reload()}},"Logout")))},A=t(217),y=t(172),I=t.n(y),j=t(213),O=t(96),B=t(32);const N=Object(n.createContext)(),R=({children:e})=>{const[a,t]=Object(n.useState)({open:!1,message:""});return l.a.createElement(N.Provider,{value:{snackbarstate:a,setsnackbarstate:t}},e)},D=Object(c.a)(()=>({circularButton:{alignItems:"center",borderRadius:25,width:150,height:50},iconbtn:{alignContent:"left",marginRight:"10px"},input:{display:"none"}}));var z=function(e){const a=D(),t=Object(n.useContext)(N);return l.a.createElement(l.a.Fragment,null,l.a.createElement("input",{className:a.input,id:"contained-button-file",type:"file",onInput:a=>{let n=a.target.files[0];if(n.size>1e7)return a.target.value=null,void alert("File Size cannot exceed 10MB");const l=new FormData;l.append("file",n),Object(B.trackPromise)(O.a.AxiosApiInstance.post("api/fileupload/",l).then(a=>{const n=e.backendFiles.slice(),l=a.data;for(var r=n.length-1;r>=0;--r)n[r].filename===l.filename&&n.splice(r,1);n.unshift(l),e.setbackendFiles(n),t.setsnackbarstate({message:"File Uploaded Successfully",open:!0})})),a.target.value=null},enctype:"multipart/form-data"}),l.a.createElement("label",{htmlFor:"contained-button-file"},l.a.createElement(j.a,{variant:"contained",component:"span",className:a.circularButton},l.a.createElement(I.a,{className:a.iconbtn}),"Add File")))},L=t(220),T=t(221),_=t(219),P=t(218),U=t(135),H=t.n(U),M=t(7),G=t.n(M);function J(e){return l.a.createElement(d.a,{component:"h2",variant:"h6",color:"secondary",gutterBottom:!0},e.children)}J.propTypes={children:G.a.node};var K=t(173),Y=t.n(K),q=t(214);var W=e=>{const[a,t]=l.a.useState(null),r=Object(n.useContext)(N),c=()=>{t(null)},o=a=>{console.log(window.location.pathname);for(var t=e.backendFiles.length-1;t>=0;t--)if(e.backendFiles[t].filename===a)return console.log(e.backendFiles[t]),t;return 0},s=(a,t,n)=>{Object(B.trackPromise)(O.a.AxiosApiInstance.post("api/changefilestarstatus/",{filename:a}).then(()=>{const a=e.backendFiles.slice();a[t].is_starred=n,"/starred"===window.location.pathname&&a.splice(t,1),e.setbackendFiles(a),r.setsnackbarstate({message:!0===n?"Added to Starred Files":"Removed from Starred Files",open:!0})}))};return l.a.createElement(l.a.Fragment,null,l.a.createElement(h.a,{onClick:e=>{t(e.currentTarget)}},l.a.createElement(Y.a,null," ")),l.a.createElement(F.a,{id:"simple-menu",anchorEl:a,keepMounted:!0,open:Boolean(a),onClose:c},l.a.createElement(w.a,{onClick:()=>{var a,t;a=e.uploadedfile.filename,t=e.uploadedfile.file,O.a.AxiosApiInstance({url:t,method:"GET",responseType:"blob"}).then(e=>{const t=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=t,n.setAttribute("download",a),document.body.appendChild(n),n.click()}),c()}}," ",l.a.createElement(q.a,{style:{textDecoration:"inherit"},href:e.uploadedfile.file,color:"inherit",target:"_blank",download:!0},"Download")," "),(i=e.uploadedfile).is_starred?l.a.createElement(w.a,{onClick:()=>{return e=i.filename,a=o(e),s(e,a,!1),void c();var e,a}},"Remove from Starred Files"):l.a.createElement(w.a,{onClick:()=>{return e=i.filename,a=o(e),s(e,a,!0),void c();var e,a}},"Add to Starred Files"),l.a.createElement(w.a,{onClick:()=>{return a=e.uploadedfile.filename,Object(B.trackPromise)(O.a.AxiosApiInstance.post("api/deletefile/",{filename:a}).then(t=>{const n=e.backendFiles.slice();for(var l=n.length-1;l>=0;--l)n[l].filename===a&&n.splice(l,1);e.setbackendFiles(n),r.setsnackbarstate({message:"File Deleted Successfully",open:!0})})),void c();var a}},"Delete")));var i},X=t(35);const V=()=>l.a.createElement(P.a,null,l.a.createElement(_.a,null,"Name"),l.a.createElement(_.a,null,"Date"),l.a.createElement(_.a,null,"More"),l.a.createElement(_.a,{align:"right"},"Size"));var Q=e=>(Object(n.useEffect)(()=>{Object(B.trackPromise)(O.a.AxiosApiInstance.post("api/fetchfiles/",{}).then(a=>{e.setbackendFiles(a.data)}))},[]),l.a.createElement(l.a.Fragment,null,l.a.createElement(J,null," Your Files "),l.a.createElement(X.a,null),l.a.createElement(L.a,{size:"small"},l.a.createElement(T.a,null,l.a.createElement(V,null),e.backendFiles.map((a,t)=>l.a.createElement(P.a,{key:t},l.a.createElement(_.a,null," ",l.a.createElement(h.a,null,l.a.createElement(H.a,null," ")),a.filename),l.a.createElement(_.a,null,a.created),l.a.createElement(_.a,null,l.a.createElement(W,{uploadedfile:a,backendFiles:e.backendFiles,setbackendFiles:e.setbackendFiles})),l.a.createElement(_.a,{align:"right"},a.size/1e3," KB")))))));const Z=()=>l.a.createElement(P.a,null,l.a.createElement(_.a,null,"Name"),l.a.createElement(_.a,null,"Date"),l.a.createElement(_.a,null,"More"),l.a.createElement(_.a,{align:"right"},"Size"));var $=e=>(Object(n.useEffect)(()=>{Object(B.trackPromise)(O.a.AxiosApiInstance.post("api/fetchstarredfiles/",{}).then(a=>{e.setbackendFiles(a.data)}))},[]),l.a.createElement(l.a.Fragment,null,l.a.createElement(J,null," Your Starred Files "),l.a.createElement(X.a,null),l.a.createElement(L.a,{size:"small"},l.a.createElement(T.a,null,l.a.createElement(Z,null),e.backendFiles.map((a,t)=>l.a.createElement(P.a,{key:t},l.a.createElement(_.a,null," ",l.a.createElement(h.a,null,l.a.createElement(H.a,null," ")),a.filename),l.a.createElement(_.a,null,a.created),l.a.createElement(_.a,null,l.a.createElement(W,{uploadedfile:a,backendFiles:e.backendFiles,setbackendFiles:e.setbackendFiles})),l.a.createElement(_.a,{align:"right"},a.size/1e3," KB"))))))),ee=t(231),ae=t(234);var te=()=>{const e=Object(n.useContext)(N),a=(a,t)=>{"clickaway"!==t&&e.setsnackbarstate({message:"",open:!1})};return l.a.createElement(ae.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:e.snackbarstate.open,autoHideDuration:5e3,onClose:a},l.a.createElement(ee.a,{elevation:6,variant:"filled",onClose:a,severity:"info"},e.snackbarstate.message))},ne=t(223),le=t(224),re=t(174),ce=t.n(re),oe=t(175),se=t.n(oe),ie=t(222),me=t(24);const ue=l.a.createElement(l.a.Fragment,null,l.a.createElement(ie.a,null),l.a.createElement(me.c,{to:"/",style:{textDecoration:"none",color:"unset"}},l.a.createElement(A.a,{button:!0},l.a.createElement(ne.a,null,l.a.createElement(ce.a,null),l.a.createElement(le.a,{style:{marginLeft:"10px"},primary:"Dashboard"})))),l.a.createElement(ie.a,null),l.a.createElement(me.c,{to:"/starred",style:{textDecoration:"none",color:"unset"}},l.a.createElement(A.a,{button:!0},l.a.createElement(ne.a,null,l.a.createElement(se.a,null),l.a.createElement(le.a,{style:{marginLeft:"10px"},primary:"Starred"})))),l.a.createElement(ie.a,null));var de=t(3);const pe=Object(c.a)(e=>({root:{display:"flex"},toolbarIcon:{display:"flex",alignItems:"left",justifyContent:"flex-start",padding:"0 8px",...e.mixins.toolbar},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - 240px)",transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240},iconbutton:{padding:"500 px"}}));function Ee(e){const a=pe(),[t,c]=Object(n.useState)([]);return l.a.createElement(R,null,l.a.createElement("div",{className:a.root},l.a.createElement(i.a,{position:"absolute",className:Object(r.a)(a.appBar,a.appBarShift)},l.a.createElement(m.a,null,l.a.createElement(d.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:a.title},"React Drive"),l.a.createElement(v,{className:a.iconbutton}),l.a.createElement(g,{handleThemeChange:e.handleThemeChange}),l.a.createElement(C,null))),l.a.createElement(o.a,{variant:"permanent",classes:{paper:Object(r.a)(a.drawerPaper)},open:!0},l.a.createElement("div",{className:a.toolbarIcon}),l.a.createElement(u.a,null," ",l.a.createElement(A.a,null," ",l.a.createElement(z,{backendFiles:t,setbackendFiles:c})," ")," "),l.a.createElement(u.a,null,ue)),l.a.createElement("main",{className:a.content},l.a.createElement("div",{className:a.appBarSpacer}),l.a.createElement(p.a,{maxWidth:"lg",className:a.container},l.a.createElement(de.b,{path:"/",exact:!0,render:()=>l.a.createElement(Q,{backendFiles:t,setbackendFiles:c})}),l.a.createElement(de.b,{path:"/starred",render:()=>l.a.createElement($,{backendFiles:t,setbackendFiles:c})}),l.a.createElement(s.a,{pt:4}),l.a.createElement(te,null)))))}},96:function(e,a,t){"use strict";var n=t(112),l=t.n(n),r="";"localhost"!==location.hostname&&"http://127.0.0.1"!==window.location||(r="http://127.0.0.1:8000/"),l.a.defaults.baseURL=r;const c=l.a.create({baseURL:r,timeout:5e4});c.defaults.xsrfHeaderName="X-CSRFTOKEN",c.defaults.xsrfCookieName="csrftoken",c.defaults.withCredentials=!0,c.interceptors.request.use(e=>{const a=localStorage.getItem("access_token");return a&&(e.headers.Authorization="Bearer "+a),e},e=>{Promise.reject(e)}),c.interceptors.response.use(e=>(alert("Access Token was Valid !!! "+JSON.stringify(e)),e),e=>{if((403===e.response.status||401===e.response.status)&&e.response&&e.config)return l.a.post("api/token/refresh/",{refresh:localStorage.getItem("refresh_token")}).then(a=>{if(201===a.status||200===a.status)return alert("Got new Access Token !!!"),localStorage.setItem("access_token",a.data.access),e.config.headers.Authorization="Bearer "+localStorage.getItem("access_token"),c.request(e.config)}).catch(e=>{localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),alert("You need to Login Again !!!"),window.location.reload()})});const o=l.a.create({baseURL:r,timeout:5e4});o.defaults.xsrfHeaderName="X-CSRFTOKEN",o.defaults.xsrfCookieName="csrftoken",o.defaults.withCredentials=!0,o.interceptors.response.use(e=>e,e=>Promise.reject(e));const s=l.a.create({baseURL:r,timeout:5e4});s.interceptors.response.use(e=>(alert("Login Successful!"),localStorage.setItem("refresh_token",e.data.refresh),localStorage.setItem("access_token",e.data.access),window.location.href="/",e),e=>Promise.reject(e)),a.a={AxiosApiInstance:c,LoginAxiosApiInstance:s,RegisterAxiosApiInstance:o}}}]);