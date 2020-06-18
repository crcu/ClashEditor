"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var s,c=e[Symbol.iterator]();!(n=(s=c.next()).done)&&(r.push(s.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}!function(p,e,t){var r,n=p.getElementById("msg"),o=e.getItem("clashEditor:config:proxy"),y=t(p.getElementById("proxy-editor"),{lineNumbers:!0,mode:"yaml"});o&&""!==o?y.setValue(o):y.setValue("Proxy:\n"),p.getElementById("ce-proxy-btn-validate").addEventListener("click",function(){try{r=jsyaml.load(y.getValue());try{if(r.Proxy)try{r.Proxy.map(function(e){if(e.type&&"ss"!==e.type&&"vmess"!==e.type&&"trojan"!==e.type&&"socks5"!==e.type&&"http"!==e.type&&"snell"!==e.type)throw new Error(e.type)}),setLS("clashEditor:config:proxy",y.getValue()),n.innerHTML='<span class="text-success">Proxy 配置检查通过！</span>',p.getElementById("ce-proxy-btn-continue").classList.remove("disabled"),p.getElementById("ce-proxy-btn-continue").removeAttribute("disabled"),p.getElementById("ce-proxy-btn-continue").setAttribute("href","/proxygroup")}catch(e){Modal("您的 Proxy 配置不符合要求！","<code>".concat(e,"</code> 不是 ClashEditor 可以辨识的代理类型！"))}else Modal("您的 Proxy 配置不符合要求！","Proxy 配置必须包括 <code>Proxy:</code>，并且 <code>Proxy:</code> 下的内容不能为空！")}catch(e){Modal("您的 Proxy 配置不符合要求！","请检查您的 Proxy 配置并重新输入！")}}catch(e){Modal("这看起来不太正常","<p>Clash Editor 似乎不能解析您提交的 YAML 内容</p>\n                <p>报错信息如下所示：</p>\n                <p><code>".concat(e,"</code></p>\n                <p>如果您认为这不是您的问题，请在 Clash Editor 的 GitHub 上提交一条 issue，并在 issue 中附上报错信息以供调试</p>"))}}),p.getElementById("ss-form").addEventListener("submit",function(e){e.preventDefault();var t="".concat(y.getValue(),'\n- name: "').concat(getValue("ss-name"),'"\n  type: ss\n  server: ').concat(getValue("ss-server"),"\n  port: ").concat(getValue("ss-port"),"\n  cipher: ").concat(getValue("ss-cipher"),'\n  password: "').concat(getValue("ss-password"),'"\n  udp: ').concat(getValue("ss-udp"),"\n");y.setValue(t),p.getElementById("ss-form").reset(),$("#ss-helper").modal("hide")}),p.getElementById("vmess-form").addEventListener("submit",function(e){e.preventDefault();var t="".concat(y.getValue(),'\n- name: "').concat(getValue("vmess-name"),'"\n  type: vmess\n  server: ').concat(getValue("vmess-server"),"\n  port: ").concat(getValue("vmess-port"),"\n  uuid: ").concat(getValue("vmess-uuid"),"\n  alterId: ").concat(getValue("vmess-alterId"),"\n  cipher: ").concat(getValue("vmess-cipher"),"\n  udp: ").concat(getValue("vmess-udp"),"\n  tls: ").concat(getValue("vmess-tls"),"\n");y.setValue(t),p.getElementById("vmess-form").reset(),$("#vmess-helper").modal("hide")});p.getElementById("trojan-form").addEventListener("submit",function(e){e.preventDefault();var t="".concat(y.getValue(),'\n    - name: "').concat(getValue("trojan-name"),'"\n      type: trojan\n      server: ').concat(getValue("trojan-server"),"\n      port: ").concat(getValue("trojan-port"),'\n      password: "').concat(getValue("trojan-password"),'"\n      skip-cert-verify: ').concat(getValue("trojan-skip-cert-verify"),"\n      udp: ").concat(getValue("trojan-udp"),"\n    ");y.setValue(t),p.getElementById("trojan-form").reset(),$("#trojan-helper").modal("hide")}),p.getElementById("ce-proxy-btn-import-online").addEventListener("click",function(){var r=getValue("proxy-online-url");(function(e,t){return fetch(e,{method:"GET"}).then(function(e){return"text"===t?Promise.all([e.ok,e.status,e.text(),e.headers]):Promise.all([e.ok,e.status,e.json(),e.headers])}).then(function(e){var t=_slicedToArray(e,4),r=t[0],n=t[1],o=t[2],a=t[3];if(r)return{ok:r,status:n,data:o,headers:a}}).catch(function(e){throw e})})("https://cors-anywhere.herokuapp.com/".concat(r),"text").then(function(e){var t=jsyaml.load(e.data);if(!t.Proxy||""===t.Proxy)throw new Error("从 ".concat(r," 下载的文件中没有找到 Proxy 字段或 Proxy 字段为空！"));y.setValue("Proxy:\n".concat(jsyaml.dump(t.Proxy))),$("#online-helper").modal("hide")}).catch(function(e){$("#online-helper").modal("hide"),Modal("这看起来不太正常","<p>Clash Editor 不能解析您提交的在线托管配置</p>\n                    <p>报错信息如下所示：</p>\n                    <p><code>".concat(e,"</code></p>\n                    <p>这可能是由于您提交了错误的在线托管配置的 URL，或者在线托管配置不是合法的 YAML。"))})}),p.getElementById("surge-form").addEventListener("submit",function(e){e.preventDefault();for(var t=[],r=parseIni(getValue("surge-ini-textarea")).Proxy,n=0,o=Object.entries(r);n<o.length;n++){var a=_slicedToArray(o[n],2),s=a[0],c=a[1].split(",");4<c.length&&c[5].includes("SSEncrypt.module")&&t.push({name:s,type:"ss",server:c[1],port:c[2],cipher:c[3],password:c[4],udp:!0})}for(var l="Proxy:\n",i=0,u=t;i<u.length;i++){var d=u[i];l+='- name: "'.concat(d.name,'"\n  type: ss\n  server: ').concat(d.server,"\n  port: ").concat(d.port,"\n  cipher: ").concat(d.cipher,'\n  password: "').concat(d.password,'"\n  udp: true\n')}y.setValue(l),p.getElementById("surge-form").reset(),$("#surge-helper").modal("hide")})}(document,localStorage,CodeMirror);