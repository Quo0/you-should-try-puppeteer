(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{144:function(t,s,e){"use strict";var a=e(99);e.n(a).a},148:function(t,s,e){"use strict";e.r(s);e(3);var a=e(52),i=e(0),n=e.n(i),o=e(10),r=e(13),l=e(6),c=e(1),p=e(7),d={components:{[o.a.name]:o.a,[o.f.name]:o.f},data:function(){const t=new URL(window.location.href).searchParams,s=new URL("http://127.0.0.1/api/v1");return s.port=t.get("port"),{dataLoaded:!1,apiUrl:s.href,session:t.get("session"),browser:"",appDir:"",manifestDir:"",manifestDirEditable:!1,isInstalling:!1,isInstallSuccess:!1,isInstallError:!1}},methods:{getText:c.k,getExtensionId:function(){let t=n.a.runtime.id;if("firefox"!==p.b){t=`${window.location.protocol}//${t}/`}return t},setLocation:async function(){try{await this.location()}catch(t){this.isInstallError=!0,console.log(t.toString())}},runInstall:async function(){this.isInstalling=!0;try{await this.install()}catch(t){this.isInstallError=!0,console.log(t.toString())}finally{this.isInstalling=!1}if(this.isInstallSuccess){const t=new FormData;t.append("session",this.session),await fetch(`${this.apiUrl}/setup/close`,{referrer:"",mode:"cors",method:"POST",body:t})}},location:async function(){const t=new FormData;t.append("session",this.session),t.append("browser",this.browser),t.append("targetEnv",p.b);const s=await fetch(`${this.apiUrl}/setup/location`,{referrer:"",mode:"cors",method:"POST",body:t}),e=await s.json();if(200!==s.status)throw new Error(e.error);this.appDir=e.appDir,this.manifestDir=e.manifestDir},install:async function(){const t=new FormData;t.append("session",this.session),t.append("appDir",this.appDir),t.append("manifestDir",this.manifestDir),t.append("browser",this.browser),t.append("targetEnv",p.b),t.append("extension",this.getExtensionId());const s=await fetch(`${this.apiUrl}/setup/install`,{referrer:"",mode:"cors",method:"POST",body:t});if(200!==s.status)throw new Error((await s.json()).error);await Object(l.c)(),await r.a.set({simulateUserInput:!0},"sync"),this.isInstallSuccess=!0}},created:async function(){this.browser=(await n.a.runtime.sendMessage({id:"getBrowser"})).name,await this.setLocation();const{os:t}=await n.a.runtime.sendMessage({id:"getPlatform"});"windows"!==t&&(this.manifestDirEditable=!0),this.dataLoaded=!0}},u=(e(144),e(5)),f=Object(u.a)(d,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.dataLoaded?e("div",{attrs:{id:"app"}},[t.isInstallSuccess||t.isInstallError?t._e():e("div",{staticClass:"wrap"},[e("div",{staticClass:"title"},[t._v("\n      "+t._s(t.getText("pageContent_installTitle"))+"\n    ")]),t._v(" "),e("div",{staticClass:"desc"},[t._v("\n      "+t._s(t.getText("pageContent_installDesc"))+"\n    ")]),t._v(" "),e("v-textfield",{attrs:{label:t.getText("inputLabel_appLocation")},model:{value:t.appDir,callback:function(s){t.appDir="string"==typeof s?s.trim():s},expression:"appDir"}}),t._v(" "),t.manifestDirEditable?e("div",{staticClass:"manifest-desc"},[t._v("\n      "+t._s(t.getText("pageContent_manifestLocationDesc"))+"\n    ")]):t._e(),t._v(" "),t.manifestDirEditable?e("v-textfield",{attrs:{label:t.getText("inputLabel_manifestLocation")},model:{value:t.manifestDir,callback:function(s){t.manifestDir="string"==typeof s?s.trim():s},expression:"manifestDir"}}):t._e(),t._v(" "),e("v-button",{staticClass:"button install-button",attrs:{unelevated:!0,disabled:t.isInstalling||!t.appDir||t.manifestDirEditable&&!t.manifestDir,label:t.getText("buttonText_installApp")},on:{click:t.runInstall}})],1),t._v(" "),t.isInstallSuccess?e("div",{staticClass:"wrap"},[e("div",{staticClass:"title"},[t._v(t._s(t.getText("pageContent_installSuccessTitle")))]),t._v(" "),e("div",{staticClass:"desc"},[t._v(t._s(t.getText("pageContent_installSuccessDesc")))]),t._v(" "),e("div",{staticClass:"success-icon"},[t._v("🎉")])]):t._e(),t._v(" "),t.isInstallError?e("div",{staticClass:"wrap"},[e("div",{staticClass:"title error-title"},[t._v("\n      "+t._s(t.getText("pageContent_installErrorTitle"))+"\n    ")]),t._v(" "),e("div",{staticClass:"desc"},[t._v(t._s(t.getText("pageContent_installErrorDesc")))]),t._v(" "),e("v-button",{staticClass:"button error-button",attrs:{unelevated:!0,label:t.getText("buttonText_goBack")},on:{click:function(s){t.isInstallError=!1}}})],1):t._e()]):t._e()}),[],!1,null,null,null).exports;window.top!==window&&async function(){try{await document.fonts.load("400 14px Roboto"),await document.fonts.load("500 14px Roboto")}catch(t){}new a.a({el:"#app",render:t=>t(f)})}()},99:function(t,s,e){}},[[148,0,1]]]);
//# sourceMappingURL=script.js.map