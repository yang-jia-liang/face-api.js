(function(){var e={7405:function(e,n,t){"use strict";t(6992),t(8674),t(9601),t(7727);var a=t(5010),r=t(3396),i={id:"app"};function o(e,n,t,a,o,c){var u=(0,r.up)("FaceRecognize");return(0,r.wg)(),(0,r.iD)("div",i,[(0,r.Wm)(u)])}var c=t(5082),u=t(6084),s=t(9584),l=t(6347),d=t(124),f=t(8534),m=(t(2222),t(6699),t(2023),t(9554),t(1539),t(4747),t(2479),t(9826),t(9720),t(7042),t(5827),t(3948),t(1249),t(7327),t(8783),t(4870)),p=t(7139),v=t.p+"media/shylock.449e5e04.mp4",h=t.p+"img/卷福.fe160b7d.jpg",w=t.p+"img/华生.92ff5fde.png",k=t(8817),g=t(9733),b=function(e){return(0,r.dD)("data-v-2949188d"),e=e(),(0,r.Cn)(),e},x={class:"detectBox"},y=["src"],_=b((function(){return(0,r._)("source",{src:v,type:"video/mp4"},null,-1)})),F=(0,r.Uk)(" 抱歉，您的浏览器不支持嵌入式视频。 "),C=[_,F],L={class:"timer"},V={class:"faceCompare"},T=b((function(){return(0,r._)("h2",null,"已录入人脸",-1)})),S=b((function(){return(0,r._)("div",{class:"referenceImgs"},[(0,r._)("p",null,[(0,r._)("img",{src:h,alt:"夏洛克·福尔摩斯"}),(0,r._)("span",null,"夏洛克·福尔摩斯")]),(0,r._)("p",null,[(0,r._)("img",{src:w,alt:"约翰·H·华生"}),(0,r._)("span",null,"约翰·H·华生")])],-1)})),U=[T,S],D={class:"similarity"},Z=b((function(){return(0,r._)("h2",null,"相似度比较",-1)})),P={class:"referenceImgs"},W=b((function(){return(0,r._)("p",null,[(0,r._)("img",{src:h,alt:"夏洛克·福尔摩斯",id:"reference"}),(0,r._)("span",null,"夏洛克·福尔摩斯")],-1)})),O=["src"],I=b((function(){return(0,r._)("span",null,"相似度：",-1)})),q=(0,r.Uk)("人脸识别"),B=(0,r.Uk)("表情"),j=(0,r.Uk)("年龄性别"),M=(0,r.Uk)("显示人脸边界"),z=(0,r.Uk)("显示人脸标记点"),A={class:"bottomBox"},E=(0,r.Uk)(" 人脸相似度比较 "),R=(0,r.Uk)(" 视频人脸追踪 "),G=(0,r.Uk)(" 摄像头人脸追踪 "),N=(0,r.Uk)(" 选择图片 "),Q=(0,r.Uk)(" 配置 "),H={__name:"index",setup:function(e){var n=(0,m.qj)({base64:"",similarity:0,detectList:[],optionList:[],showSimilar:!1,trackVideoFaces:!1,trackCameraFaces:!1,videoStream:"",videoStatus:0,genderTranslator:{male:"男",female:"女"},expressionTranslator:{neutral:"正常",happy:"开心",sad:"伤心",angry:"生气",fearful:"害怕",disgusted:"恶心",surprised:"惊喜"},detectTypes:["AgeAndGender","Expression","Face"],faces:[],showConfig:!1,columns:[{values:[{text:"SSD",value:"SSD"},{text:"Tiny",value:"Tiny"}],defaultIndex:1},{values:[{text:"0.1",value:.1},{text:"0.2",value:.2},{text:"0.3",value:.3},{text:"0.4",value:.4},{text:"0.5",value:.5},{text:"0.6",value:.6},{text:"0.7",value:.7},{text:"0.8",value:.8},{text:"0.9",value:.9}],defaultIndex:4},{values:[{text:"128",value:128},{text:"160",value:160},{text:"224",value:224},{text:"320",value:320},{text:"416",value:416},{text:"512",value:512},{text:"608",value:608}],defaultIndex:3}],selectedValue:["Tiny",.5,320],showCameraList:!1,cameraList:[],videoTrack:null,count:0,forwardTimes:[],time:"",fps:""}),t=(0,m.qj)({canvas:null,img:null,video:null,pickImage:null}),i=(0,m.BK)(t),o=i.canvas,v=i.img,h=i.video,w=i.pickImage,b=function(){var e=(0,f.Z)((0,d.Z)().mark((function e(t){var a,r;return(0,d.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.target.files,e.next=3,k.dV(a[0]);case 3:r=e.sent,n.base64=r.src;case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),_=function(){var e=(0,f.Z)((0,d.Z)().mark((function e(){var t,a,r,i,o;return(0,d.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=document.querySelectorAll(".faceCompare img"),a=(0,l.Z)(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=12;break}return i=r.value,e.next=8,k.bd(i).withFaceLandmarks().withFaceDescriptor();case 8:o=e.sent,n.faces=[].concat((0,s.Z)(n.faces),[new k.oE(i.alt,[o.descriptor])]);case 10:e.next=4;break;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](2),a.e(e.t0);case 17:return e.prev=17,a.f(),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[2,14,17,20]])})));return function(){return e.apply(this,arguments)}}(),F=function(e,n){var t={x:50,y:50,width:100,height:100},a={label:"Hello I am a box!",lineWidth:2,boxColor:"red",drawLabelOptions:{anchorPosition:"TOP_LEFT",backgroundColor:"rgba(0, 0, 0, 0.5)",fontColor:"purple",fontSize:16,padding:15}},r=new k.ii.DrawBox(e||t,n||a);r.draw(o.value)},T=function(e,n,t){var a=["This is a textline!","This is another textline!"],r={x:200,y:200},i={},c=new k.ii.DrawTextField(e||a,n||r,t||i);c.draw(o.value)},S=function(){var e=(0,f.Z)((0,d.Z)().mark((function e(){var t,a,r,i,c,l,f,m,p,w,g,b,x,y,_,C,L,V,U,D,Z,P;return(0,d.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=n.detectList,a=n.optionList,r=n.faces,i=n.base64,c=n.trackVideoFaces,l=n.trackCameraFaces,f=n.videoStatus,m=c||l?"myVideo":"myImg",p=Date.now(),("myImg"!==m||i)&&("myVideo"!==m||f)){e.next=5;break}return e.abrupt("return");case 5:if(w="myImg"===m?{width:v.value.width,height:v.value.height}:k.JF(o.value,h.value,!0),k.JF(o.value,w),g=K(),!t.includes("Recognition")){e.next=15;break}return e.next=11,k.Qr(m,g).withFaceLandmarks().withFaceDescriptors();case 11:b=e.sent,x=k._C(b,w),y=new k.zi(r||[]),x.forEach((function(e){var n=e.descriptor,t=e.detection.box,a=y.findBestMatch(n);F(t,{label:a._label})}));case 15:if(!t.includes("Expression")){e.next=21;break}return e.next=18,k.Qr(m,g).withFaceLandmarks().withFaceExpressions();case 18:_=e.sent,C=k._C(_,w),C.forEach((function(e){var t=e.expressions,a=Math.max.apply(Math,(0,s.Z)(Object.values(t))),r=Object.entries(t).find((function(e){var n=(0,u.Z)(e,2),t=n[1];return t===a}))[0];T(["".concat(n.expressionTranslator[r]," (").concat(Math.round(100*k.P6.round(a)),"%)")],e.detection.box.bottomLeft)}));case 21:if(!t.includes("AgeAndGender")){e.next=27;break}return e.next=24,k.Qr(m,g).withFaceLandmarks().withAgeAndGender();case 24:L=e.sent,V=k._C(L,w),V.forEach((function(e){var t=e.age,a=e.gender,r=e.genderProbability;T(["".concat(n.genderTranslator[a]," (").concat(100*k.P6.round(r),"%)"),"".concat(k.P6.round(t,0)," 岁 ")],e.detection.box.bottomLeft)}));case 27:if(!a.includes("showBorder")){e.next=33;break}return e.next=30,k.Qr(m,g);case 30:U=e.sent,D=k._C(U,w),D.forEach((function(e){var n=e.box,t=e._score;F(n,{label:"可信度".concat(Math.round(100*t),"%")})}));case 33:if(!a.includes("showMark")){e.next=39;break}return e.next=36,k.Qr(m,g).withFaceLandmarks();case 36:Z=e.sent,P=k._C(Z,w),k.ii.drawFaceLandmarks(o.value,P);case 39:f&&(J(Date.now()-p),setTimeout((function(){window.requestAnimationFrame(S)})));case 40:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=(0,f.Z)((0,d.Z)().mark((function e(){var t,a;return(0,d.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,k.bd("reference").withFaceLandmarks().withFaceDescriptor();case 2:return t=e.sent,e.next=5,k.bd("toCompare").withFaceLandmarks().withFaceDescriptor();case 5:a=e.sent,n.similarity=t&&a?Math.round(100*k.P6.round(1-k.WI(t.descriptor,a.descriptor))):0;case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(e){n.forwardTimes=[e].concat(n.forwardTimes).slice(0,30);var t=n.forwardTimes.reduce((function(e,n){return e+n}))/n.forwardTimes.length;n.time="".concat(Math.round(t)," ms"),n.fps="".concat(k.P6.round(1e3/t))},K=function(){var e=n.selectedValue;return"SSD"===e[0]?new k.d7({minConfidence:e[1]}):new k.aK({scoreThreshold:e[1],inputSize:e[2]})},Y=function(e,t){0===t&&(n.columns[2].values="SSD"===e[0].value?n.columns[2].values.map((function(e){return(0,c.Z)((0,c.Z)({},e),{},{disabled:!0})})):n.columns[2].values.map((function(e){return(0,c.Z)((0,c.Z)({},e),{},{disabled:!1})})))},X=function(e){var t=n.trackVideoFaces,a=n.trackCameraFaces;n.selectedValue=e.map((function(e){return e.value})),n.showConfig=!1,t||a||S()},$=function(){navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices?navigator.mediaDevices.enumerateDevices().then((function(e){var t=e.filter((function(e){return"videoinput"===e.kind})).map((function(e,n){return{text:e.label||"摄像头".concat(n+1),value:e.deviceId}}));t.length?(n.showCameraList=!0,n.cameraList=t):g.F.fail({message:"未找到网络摄像头",forbidClick:!0,mask:!0})})).catch((function(e){console.log(e)})):g.F.fail({message:"不支持 enumerateDevices()",forbidClick:!0,mask:!0})},ee=function(e){n.showCameraList=!1,navigator.mediaDevices.getUserMedia({audio:!1,video:{sourceId:e[0]}}).then((function(e){h.value.srcObject=e,n.videoTrack=e.getTracks()[0],window.requestAnimationFrame(S)})).catch((function(){g.F.fail({message:"摄像头调用失败",forbidClick:!0,mask:!0})}))},ne=function(){var e=g.F.loading({duration:0,message:"模型加载中...",forbidClick:!0,mask:!0});Promise.all([k.qB.faceRecognitionNet.loadFromUri("./models"),k.qB.faceLandmark68Net.loadFromUri("./models"),k.qB.faceLandmark68TinyNet.loadFromUri("./models"),k.qB.ssdMobilenetv1.loadFromUri("./models"),k.qB.tinyFaceDetector.loadFromUri("./models"),k.qB.mtcnn.loadFromUri("./models"),k.qB.faceExpressionNet.loadFromUri("./models"),k.qB.ageGenderNet.loadFromUri("./models")]).then((function(){_(),e.clear()})).catch((function(){e.clear()}))};return(0,r.bv)((function(){ne()})),(0,r.YP)((function(){return n.trackCameraFaces}),(function(e){var t;e?$():null===(t=n.videoTrack)||void 0===t||t.stop()})),function(e,t){var i=(0,r.up)("van-checkbox"),c=(0,r.up)("van-checkbox-group"),u=(0,r.up)("van-switch"),s=(0,r.up)("van-button"),l=(0,r.up)("van-picker"),d=(0,r.up)("van-popup");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("input",{hidden:"",type:"file",onChange:b,accept:"image/*",ref_key:"pickImage",ref:w},null,544),(0,r._)("div",x,[(0,r.wy)((0,r._)("img",{src:n.base64,alt:"",width:"500",ref_key:"img",ref:v,id:"myImg",onLoad:S},null,40,y),[[a.F8,!n.trackVideoFaces&&!n.trackCameraFaces]]),n.trackVideoFaces?((0,r.wg)(),(0,r.iD)("video",{key:0,width:"500",ref_key:"video",ref:h,id:"myVideo",muted:"",playsinline:"",preload:"",loop:"",onDurationchange:t[0]||(t[0]=function(e){return(0,m.SU)(h).play()}),onPlay:t[1]||(t[1]=function(e){return n.videoStatus=1}),onPause:t[2]||(t[2]=function(e){return n.videoStatus=0})},C,544)):(0,r.kq)("",!0),n.trackCameraFaces?((0,r.wg)(),(0,r.iD)("video",{key:1,ref_key:"video",ref:h,id:"myVideo",autoplay:"",muted:"",playsinline:"",onPlay:t[3]||(t[3]=function(e){return n.videoStatus=1}),onPause:t[4]||(t[4]=function(e){return n.videoStatus=0})},null,544)):(0,r.kq)("",!0),(0,r._)("canvas",{ref_key:"canvas",ref:o},null,512)]),(0,r.wy)((0,r._)("section",L,[(0,r._)("p",null,"平均检测时长："+(0,p.zw)(n.time),1),(0,r._)("p",null,"fps："+(0,p.zw)(n.fps>200?"200+":n.fps),1)],512),[[a.F8,n.trackVideoFaces||n.trackCameraFaces]]),(0,r.Uk)(" "+(0,p.zw)(n.videoTrack),1),(0,r.wy)((0,r._)("section",V,U,512),[[a.F8,n.detectList.includes("Recognition")]]),(0,r.wy)((0,r._)("section",D,[Z,(0,r._)("div",P,[W,(0,r._)("p",null,[(0,r._)("img",{src:n.base64,alt:"",id:"toCompare",onLoad:H},null,40,O),I,(0,r._)("span",{class:(0,p.C_)({danger:n.similarity<50})},(0,p.zw)(n.similarity)+"%",3)])])],512),[[a.F8,n.showSimilar]]),(0,r.Wm)(c,{modelValue:n.detectList,"onUpdate:modelValue":t[5]||(t[5]=function(e){return n.detectList=e}),onChange:S},{default:(0,r.w5)((function(){return[(0,r.Wm)(i,{name:"Recognition"},{default:(0,r.w5)((function(){return[q]})),_:1}),(0,r.Wm)(i,{name:"Expression"},{default:(0,r.w5)((function(){return[B]})),_:1}),(0,r.Wm)(i,{name:"AgeAndGender"},{default:(0,r.w5)((function(){return[j]})),_:1})]})),_:1},8,["modelValue"]),(0,r.Wm)(c,{modelValue:n.optionList,"onUpdate:modelValue":t[6]||(t[6]=function(e){return n.optionList=e}),onChange:S},{default:(0,r.w5)((function(){return[(0,r.Wm)(i,{name:"showBorder"},{default:(0,r.w5)((function(){return[M]})),_:1}),(0,r.Wm)(i,{name:"showMark"},{default:(0,r.w5)((function(){return[z]})),_:1})]})),_:1},8,["modelValue"]),(0,r._)("div",A,[(0,r._)("p",null,[(0,r.Wm)(u,{modelValue:n.showSimilar,"onUpdate:modelValue":t[7]||(t[7]=function(e){return n.showSimilar=e}),size:"24"},null,8,["modelValue"]),E]),(0,r._)("p",null,[(0,r.Wm)(u,{modelValue:n.trackVideoFaces,"onUpdate:modelValue":t[8]||(t[8]=function(e){return n.trackVideoFaces=e}),disabled:n.trackCameraFaces,size:"24"},null,8,["modelValue","disabled"]),R]),(0,r._)("p",null,[(0,r.Wm)(u,{modelValue:n.trackCameraFaces,"onUpdate:modelValue":t[9]||(t[9]=function(e){return n.trackCameraFaces=e}),disabled:n.trackVideoFaces,size:"24"},null,8,["modelValue","disabled"]),G])]),(0,r.Wm)(s,{plain:"",type:"primary",onClick:t[10]||(t[10]=function(e){return(0,m.SU)(w).click()})},{default:(0,r.w5)((function(){return[N]})),_:1}),(0,r.Wm)(s,{plain:"",type:"primary",onClick:t[11]||(t[11]=function(e){return n.showConfig=!0})},{default:(0,r.w5)((function(){return[Q]})),_:1}),(0,r.Wm)(d,{show:n.showCameraList,position:"bottom",round:"","close-on-click-overlay":!1},{default:(0,r.w5)((function(){return[(0,r.Wm)(l,{title:"摄像头列表",columns:n.cameraList,onConfirm:ee,onCancel:t[12]||(t[12]=function(e){n.showCameraList=!1,n.trackCameraFaces=!1})},null,8,["columns"])]})),_:1},8,["show"]),(0,r.Wm)(d,{show:n.showConfig,position:"bottom",round:"","close-on-click-overlay":!1},{default:(0,r.w5)((function(){return[(0,r.Wm)(l,{title:"人脸检测器配置",columns:n.columns,onConfirm:X,onCancel:t[13]||(t[13]=function(e){return n.showConfig=!1}),onChange:Y},null,8,["columns"])]})),_:1},8,["show"])])}}},J=t(89);const K=(0,J.Z)(H,[["__scopeId","data-v-2949188d"]]);var Y=K,X={name:"App",components:{FaceRecognize:Y}};const $=(0,J.Z)(X,[["render",o]]);var ee=$,ne=t(7966);t(5110);(0,a.ri)(ee).use(ne.ZP).mount("#app")},4902:function(){},522:function(){},753:function(){}},n={};function t(a){var r=n[a];if(void 0!==r)return r.exports;var i=n[a]={exports:{}};return e[a](i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,a,r,i){if(!a){var o=1/0;for(l=0;l<e.length;l++){a=e[l][0],r=e[l][1],i=e[l][2];for(var c=!0,u=0;u<a.length;u++)(!1&i||o>=i)&&Object.keys(t.O).every((function(e){return t.O[e](a[u])}))?a.splice(u--,1):(c=!1,i<o&&(o=i));if(c){e.splice(l--,1);var s=r();void 0!==s&&(n=s)}}return n}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[a,r,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p=""}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,a){var r,i,o=a[0],c=a[1],u=a[2],s=0;if(o.some((function(n){return 0!==e[n]}))){for(r in c)t.o(c,r)&&(t.m[r]=c[r]);if(u)var l=u(t)}for(n&&n(a);s<o.length;s++)i=o[s],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(l)},a=self["webpackChunkface_api"]=self["webpackChunkface_api"]||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(7405)}));a=t.O(a)})();
//# sourceMappingURL=app-legacy.01c16c31.js.map