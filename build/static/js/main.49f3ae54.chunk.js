(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{18:function(e,t,a){e.exports=a(42)},23:function(e,t,a){},24:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),c=a(11),i=a.n(c),l=(a(23),a(12)),r=a(13),s=a(16),d=a(14),p=a(17),u=(a(24),a(15)),f=a.n(u),m=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).firebaseConfig={apiKey:"AIzaSyAAJ11KSyoF72gWXLxsR1dD3V_Udoj8jxc",authDomain:"video-c34ea.firebaseapp.com",databaseURL:"https://video-c34ea.firebaseio.com",projectId:"video-c34ea",storageBucket:"video-c34ea.appspot.com",messagingSenderId:"216349406039",appId:"1:216349406039:web:ec24a29f93432dde3dc412"},a.state={selectedFile:null},a.fileSelectedHandler=function(e){console.log(e.target.files[0]),a.setState({selectedFile:e.target.files[0]})},a.fileUploadHandler=function(){var e=new FormData;e.append("video",a.state.selectedFile,a.state.selectedFile.name),f.a.post("https://us-central1-video-c34ea.cloudfunctions.net/upload",e).then((function(e){console.log(e)}))},a}return Object(p.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("input",{type:"file",onChange:this.fileSelectedHandler}),o.a.createElement("button",{onClick:this.fileUploadHandler},"Upload"))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.49f3ae54.chunk.js.map