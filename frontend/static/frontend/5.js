(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{205:function(e,a,t){"use strict";t.r(a);var r=t(0),s=t.n(r),n=t(235),o=t(213),i=t(207),c=t(84),l=t(214),m=t(206),u=t(227),d=t(208),p=t(131),f=t.n(p),g=t(96),h=t(24),w=t(231);const k=Object(m.a)(e=>({paper:{marginTop:"100px",display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}));a.default=function(){const e=k(),[a,t]=Object(r.useState)({username:"",password:"",errorMessage:""}),m=""!==a.errorMessage,p=e=>{const r=e.target.value;t({...a,[e.target.name]:r})};return s.a.createElement(i.a,{maxWidth:"xs"},s.a.createElement("div",{className:e.paper},s.a.createElement(n.a,{className:e.avatar},s.a.createElement(f.a,null)),s.a.createElement(d.a,{component:"h1",variant:"h4"},"Login"),s.a.createElement("form",{className:e.form,onSubmit:e=>{e.preventDefault(),g.a.LoginAxiosApiInstance.post("api/token/",{username:a.username,password:a.password}).catch(e=>{t({username:"",password:"",errorMessage:JSON.stringify(e.response.data.detail)})})}},s.a.createElement(u.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"username",label:"Username",name:"username",type:"text",autoComplete:"text",value:a.username,onChange:p,InputLabelProps:{required:!1}}),s.a.createElement(u.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",value:a.password,onChange:p,InputLabelProps:{required:!1}}),m?s.a.createElement(w.a,{severity:"error"}," ",a.errorMessage," "):null,s.a.createElement(o.a,{type:"submit",fullWidth:!0,variant:"contained",className:e.submit},"Sign In"),s.a.createElement(c.a,{container:!0,direction:"row-reverse"},s.a.createElement(c.a,{item:!0},s.a.createElement(h.b,{to:"/register"},s.a.createElement(l.a,{variant:"body2"},"Don't have an account? Sign Up")))))))}},96:function(e,a,t){"use strict";var r=t(112),s=t.n(r),n="";"localhost"!==location.hostname&&"http://127.0.0.1"!==window.location||(n="http://127.0.0.1:8000/"),s.a.defaults.baseURL=n;const o=s.a.create({baseURL:n,timeout:5e4});o.defaults.xsrfHeaderName="X-CSRFTOKEN",o.defaults.xsrfCookieName="csrftoken",o.defaults.withCredentials=!0,o.interceptors.request.use(e=>{const a=localStorage.getItem("access_token");return a&&(e.headers.Authorization="Bearer "+a),e},e=>{Promise.reject(e)}),o.interceptors.response.use(e=>(alert("Access Token was Valid !!! "+JSON.stringify(e)),e),e=>{if((403===e.response.status||401===e.response.status)&&e.response&&e.config)return s.a.post("api/token/refresh/",{refresh:localStorage.getItem("refresh_token")}).then(a=>{if(201===a.status||200===a.status)return alert("Got new Access Token !!!"),localStorage.setItem("access_token",a.data.access),e.config.headers.Authorization="Bearer "+localStorage.getItem("access_token"),o.request(e.config)}).catch(e=>{localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),alert("You need to Login Again !!!"),window.location.reload()})});const i=s.a.create({baseURL:n,timeout:5e4});i.defaults.xsrfHeaderName="X-CSRFTOKEN",i.defaults.xsrfCookieName="csrftoken",i.defaults.withCredentials=!0,i.interceptors.response.use(e=>e,e=>Promise.reject(e));const c=s.a.create({baseURL:n,timeout:5e4});c.interceptors.response.use(e=>(alert("Login Successful!"),localStorage.setItem("refresh_token",e.data.refresh),localStorage.setItem("access_token",e.data.access),window.location.href="/",e),e=>Promise.reject(e)),c.defaults.xsrfHeaderName="X-CSRFTOKEN",c.defaults.xsrfCookieName="csrftoken",c.defaults.withCredentials=!0,a.a={AxiosApiInstance:o,LoginAxiosApiInstance:c,RegisterAxiosApiInstance:i}}}]);