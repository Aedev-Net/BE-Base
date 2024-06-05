if(window.VNLP)VNLP.host="https://auth-v2-beta.vnlp.ai",VNLP.env="beta",VNLP.version="1.1.3","prod"==VNLP.env?VNLP.cssUrl=`${VNLP.host}/public/sdk/web/vnlp.websdk-${VNLP.version}.css`:"beta"==VNLP.env?VNLP.cssUrl=`${VNLP.host}/public/sdk/web/${VNLP.env}/${VNLP.version}/vnlp.websdk.css`:VNLP.cssUrl="http://localhost:4051/public/sdk/web/src/web.css",VNLP.template='<div id="vnlp-chat-container"> <div id="vnlp-chat-icon" class="vnlp-shadow"> <img style="width:30px" src="https://gonjoy.com/static/icons/chat.svg"> </div><div id="vnlp-chat-dock" class="vnlp-shadow-light"> <span>VNLP Chatbot</span> </div><div id="vnlp-chat-popup" class="vnlp-shadow"> <div id="vnlp-chat-popup-header"> <span id="vnlp-chat-popup-title">VNLP Chatbot</span> <span id="vnlp-chat-popup-close">_</span> </div><div id="vnlp-chat-inbox"> </div><div id="vnlp-quick-replies-container"> </div><div id="vnlp-chat-input-container"> <div id="vnlp-chat-menu-icon"> <svg fill="#2a9cff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"> <path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"/> </svg> </div><input id="vnlp-chat-input" type="text" placeholder="Say somethings..."/> <div id="vnlp-chat-send"> <svg height="36px" width="36px" viewBox="0 0 36 36"> <g fill="none" fill-rule="evenodd"> <g> <polygon points="0 36 36 36 36 0 0 0"></polygon> <path d="M31.1059281,19.4468693 L10.3449666,29.8224462 C8.94594087,30.5217547 7.49043432,29.0215929 8.17420251,27.6529892 C8.17420251,27.6529892 10.7473302,22.456697 11.4550902,21.0955966 C12.1628503,19.7344961 12.9730756,19.4988922 20.4970248,18.5264632 C20.7754304,18.4904474 21.0033531,18.2803547 21.0033531,17.9997309 C21.0033531,17.7196073 20.7754304,17.5095146 20.4970248,17.4734988 C12.9730756,16.5010698 12.1628503,16.2654659 11.4550902,14.9043654 C10.7473302,13.5437652 8.17420251,8.34697281 8.17420251,8.34697281 C7.49043432,6.9788693 8.94594087,5.47820732 10.3449666,6.1775158 L31.1059281,16.553593 C32.298024,17.1488555 32.298024,18.8511065 31.1059281,19.4468693" fill="#2a9cff"></path> </g> </g> </svg> </div><div id="vnlp-chat-menu" style="display: none;"> <ul> <li onclick="VNLP.startAgain()">Start Again</li><li onclick="VNLP.reset()">Reset Conversation</li onclick="VNLP.reset()"> </ul> </div></div></div></div>',VNLP.responseTypes={Text:"text",QuickReply:"quick_replies",CustomPayload:"custom_payload",Image:"image",Card:"card",Button:"button"},VNLP.init=(()=>{VNLP.chatIcon=document.getElementById("vnlp-chat-icon"),VNLP.chatDock=document.getElementById("vnlp-chat-dock"),VNLP.chatInput=document.getElementById("vnlp-chat-input"),VNLP.chatPopup=document.getElementById("vnlp-chat-popup"),VNLP.chatInbox=document.getElementById("vnlp-chat-inbox"),VNLP.btnSend=document.getElementById("vnlp-chat-send"),VNLP.btnMenu=document.getElementById("vnlp-chat-menu-icon"),VNLP.menuPopup=document.getElementById("vnlp-chat-menu"),VNLP.popupTitle=document.getElementById("vnlp-chat-popup-title"),VNLP.popupHeader=document.getElementById("vnlp-chat-popup-header"),VNLP.btnClosePopup=document.getElementById("vnlp-chat-popup-close"),VNLP.container=document.getElementById("vnlp-chat-container"),VNLP.quickRepliesContainer=document.getElementById("vnlp-quick-replies-container"),VNLP.popupTitle.innerHTML=VNLP.options&&VNLP.options.title||"VNLP Chatbot",VNLP.chatInput.placeholder=VNLP.options&&VNLP.options.placeholder||"Say somethings...",VNLP.options&&VNLP.options.display&&"none"==VNLP.options.display||VNLP.show(),VNLP.dragElement(VNLP.chatIcon),VNLP.dragElement(VNLP.chatPopup),VNLP.btnClosePopup.onclick=function(){VNLP.drag||VNLP.closePopup()},VNLP.popupHeader.onclick=function(){VNLP.drag||VNLP.closePopup()},VNLP.chatIcon.onclick=function(){if(VNLP.drag)return;const e=VNLP.chatPopup.style.display;e&&"none"!=e?VNLP.closePopup():VNLP.showPopup()},VNLP.chatDock.onclick=function(){if(VNLP.drag)return;const e=VNLP.chatPopup.style.display;e&&"none"!=e?VNLP.closePopup():VNLP.showPopup()},VNLP.chatInput.onkeypress=function(e){if(13==e.keyCode){const e=VNLP.chatInput.value;VNLP.chat(e)}},VNLP.chatInput.onkeyup=function(){VNLP.updateBtnSendStatus()},VNLP.btnSend.onclick=function(){const e=VNLP.chatInput.value;VNLP.chat(e)},VNLP.btnMenu.onclick=function(e){VNLP.showMenu(),e.stopPropagation()},VNLP.bindClickAnywhereExceptMenu()}),VNLP.bindClickAnywhereExceptMenu=(()=>{document.getElementsByTagName("body")[0].onclick=function(){VNLP.menuPopup.style.display="none",VNLP.isEnabledMenu=!1}}),VNLP.showMenu=(()=>{VNLP.isEnabledMenu?(VNLP.menuPopup.style.display="none",VNLP.isEnabledMenu=!1):(VNLP.menuPopup.style.display="block",VNLP.isEnabledMenu=!0)}),VNLP.showTyping=(()=>{VNLP.chatInbox.innerHTML=`${VNLP.chatInbox.innerHTML}<div class="vnlp-message"> <div class="vnlp-message-content vnlp-message-bot"> <div class="vnlp-typing"> <div class="vnlp-typing-dot"></div><div class="vnlp-typing-dot"></div><div class="vnlp-typing-dot"></div></div></div></div>`,VNLP.chatInbox.scrollTop=VNLP.chatInbox.scrollHeight}),VNLP.updateBtnSendStatus=(()=>{VNLP.chatInput.value?(VNLP.btnSend.style.opacity=.8,VNLP.btnSend.style.cursor="pointer"):(VNLP.btnSend.style.opacity=.2,VNLP.btnSend.style.cursor="not-allowed")}),VNLP.chat=(e=>{e&&(VNLP.messages.push({isUser:!0,content:{type:VNLP.responseTypes.Text,text:e}}),VNLP.chatInput.value="",VNLP.reloadChatInbox(),VNLP.sendText(e),VNLP.updateBtnSendStatus())}),VNLP.send=((e,t,n)=>{if(!e)return;t&&VNLP.showTyping();const s=new XMLHttpRequest;s.onreadystatechange=function(){if(4==this.readyState&&200==this.status){const e=JSON.parse(this.responseText);n(e)}},VNLP.chatUrl=`${VNLP.host}/web/${VNLP.botId}/webhook`,s.open("POST",VNLP.chatUrl,!0),s.setRequestHeader("Content-Type","application/json;charset=UTF-8"),e.userId=VNLP.getUserId(),s.send(JSON.stringify(e))}),VNLP.sendText=(e=>{VNLP.send({text:e},!0,e=>{VNLP.addMessages(e)})}),VNLP.sendReset=((e,t,n)=>{VNLP.send({text:e,isReset:!0},t,t=>{e?VNLP.addMessages(t):VNLP.messages.push({isReset:!0}),"function"==typeof n&&n()})}),VNLP.getUserId=(()=>{let e=localStorage.vnlpUserId;return e||(e=`${VNLP.botId}-${function(){for(var e="",t="abcdefghijklmnopqrstuvwxyz0123456789",n=0;n<32;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}()}`,VNLP.setUserId(e)),e}),VNLP.setUserId=(e=>{e&&(localStorage.vnlpUserId=`${VNLP.botId}-${e}`)}),VNLP.addMessages=(e=>{if(!e||0==e.length)return;e=e.filter(e=>!!e);let t=0;for(let s of e)n(s,1e3*++t,t>=e.length);function n(e,t,n){setTimeout(()=>{VNLP.messages.push({isUser:!1,content:e}),VNLP.reloadChatInbox(),n||VNLP.showTyping()},t)}}),VNLP.getUserId=(()=>{let e=localStorage.vnlpUserId;return e||(e=`${VNLP.botId}-${function(){for(var e="",t="abcdefghijklmnopqrstuvwxyz0123456789",n=0;n<32;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}()}`,VNLP.setUserId(e)),e}),VNLP.setUserId=(e=>{e&&(localStorage.vnlpUserId=`${VNLP.botId}-${e}`)}),VNLP.addMessages=(e=>{if(!e||0==e.length)return;e=e.filter(e=>!!e);let t=0;for(let s of e)n(s,1e3*++t,t>=e.length);function n(e,t,n){setTimeout(()=>{VNLP.messages.push({isUser:!1,content:e}),VNLP.reloadChatInbox(),n||VNLP.showTyping()},t)}}),VNLP.reloadChatInbox=(()=>{VNLP.removeQuickReplies();let e="";if(VNLP.messages.forEach(t=>{if(t.isReset)e=`${e}${VNLP.generateResetMessage()}`;else switch(t.content.type){case VNLP.responseTypes.Text:e=`${e}${VNLP.generateTextMessage(t)}`;break;case VNLP.responseTypes.Image:e=`${e}${VNLP.generateImageMessage(t)}`;break;case VNLP.responseTypes.Card:e=`${e}${VNLP.generateCardsMessage(t)}`;break;case VNLP.responseTypes.Button:e=`${e}${VNLP.generateButtonsMesssage(t)}`;break;case VNLP.responseTypes.QuickReply:e=`${e}${VNLP.generateQuickRepliesMessage(t)}`}}),VNLP.chatInbox.innerHTML=e,VNLP.chatInbox.scrollTop=VNLP.chatInbox.scrollHeight,VNLP.messages&&VNLP.messages.length){const e=VNLP.messages[VNLP.messages.length-1];if(!e||!e.content||e.content.type!=VNLP.responseTypes.QuickReply)return;VNLP.generateQuickReplies(e.content.quickReplies)}}),VNLP.setChatInboxHeight=(e=>{VNLP.chatInbox.style.height=`${e}px`,VNLP.chatInbox.scrollTop=VNLP.chatInbox.scrollHeight}),VNLP.removeQuickReplies=(()=>{VNLP.quickRepliesContainer.innerHTML="",VNLP.setChatInboxHeight(VNLP.chatPopup.offsetHeight-80)}),VNLP.generateQuickReplies=(e=>{if(!e||0==e.length)return;VNLP.setChatInboxHeight(VNLP.chatPopup.offsetHeight-115);let t='<div class="vnlp-navigator vnlp-left-navigator" onclick="VNLP.navigateLeft(this)"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAhUlEQVRoge3YOw7CQAwA0dHCPbkZgiqnRNDEIkIpwkeyHeZJ7se71S5IkiSVN+ZpaQAXYAKOuSnvi/j7PK2WGMCVZ3zMOTNqq9eTj7kBp7ysbYzPYnwW47MY/6uQv1XmFr7hElW4RBUuUcVulmj7pAxrj/pDZtAnlt8q7eJD648tSZK0Ww8pUHlNU9RfiQAAAABJRU5ErkJggg=="> </div><div id="vnlp-quick-replies-right-navigator" class="vnlp-navigator vnlp-right-navigator" onclick="VNLP.navigateRight(this)"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAkklEQVRoge3YwQ6CMBBF0Sv4kXydkZUfqQlsaCARCbpgOnhPMpuu3mtJSAuSJEnVaKZJqQHuwAO4xkb5Xgk/TJOuxI05fJmeRJ9TBzx5L5HqJCxRC0vUwhK1sMSWI/+Ulw/rw4EZftIBL9Z3vw3MtYvhoxg+iuGjpA4PJ7hSrl3qU+z80vJZJV34IvXDliRJ+jsjFll6Ta3xY6cAAAAASUVORK5CYII="> </div><div id="vnlp-quick-replies" class="vnlp-quick-replies">';e.forEach(e=>{t=`${t}${function(e){return e&&e.title?`<div class="vnlp-quick-reply" onclick="VNLP.sendQuickReply(this)"> ${e.title}</div>`:""}(e)}`}),t=`${t}</div>`,VNLP.quickRepliesContainer.innerHTML=t;const n=document.getElementById("vnlp-quick-replies"),s=document.getElementById("vnlp-quick-replies-right-navigator");n.scrollWidth>=400?s.style.display="block":s.style.display="none"}),VNLP.generateResetMessage=(()=>'<div class="vnlp-message"> <p class="vnlp-message-content vnlp-message-reset">The conversation has been reset</p></div>'),VNLP.generateTextMessage=(e=>e&&e.content&&e.content.text?`<div class="vnlp-message"> <p class="vnlp-message-content vnlp-message-${e.isUser?"user":"bot"}"> ${e.content.text}</p></div>`:""),VNLP.generateImageMessage=(e=>e&&e.content&&e.content.imageUrl?`<div class="vnlp-message"> <div class="vnlp-message-content vnlp-message-image"> <div class="vnlp-image"> <img src="${e.content.imageUrl}"> </div></div></div>`:""),VNLP.generateCardsMessage=(e=>{if(!e||!e.content||!e.content.cards||0==e.content.cards.length)return"";const t=e.content.cards,n=210*t.length-8;return`<div class="vnlp-message"> ${t.length<=1?"":'<div class="vnlp-cards-navigator vnlp-cards-left-navigator" onclick="VNLP.navigateLeft(this)"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAhUlEQVRoge3YOw7CQAwA0dHCPbkZgiqnRNDEIkIpwkeyHeZJ7se71S5IkiSVN+ZpaQAXYAKOuSnvi/j7PK2WGMCVZ3zMOTNqq9eTj7kBp7ysbYzPYnwW47MY/6uQv1XmFr7hElW4RBUuUcVulmj7pAxrj/pDZtAnlt8q7eJD648tSZK0Ww8pUHlNU9RfiQAAAABJRU5ErkJggg=="> </div><div class="vnlp-cards-navigator vnlp-cards-right-navigator" onclick="VNLP.navigateRight(this)"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAkklEQVRoge3YwQ6CMBBF0Sv4kXydkZUfqQlsaCARCbpgOnhPMpuu3mtJSAuSJEnVaKZJqQHuwAO4xkb5Xgk/TJOuxI05fJmeRJ9TBzx5L5HqJCxRC0vUwhK1sMSWI/+Ulw/rw4EZftIBL9Z3vw3MtYvhoxg+iuGjpA4PJ7hSrl3qU+z80vJZJV34IvXDliRJ+jsjFll6Ta3xY6cAAAAASUVORK5CYII="> </div>'}<div class="vnlp-message-content vnlp-message-cards"> <div class="vnlp-cards" style="width: ${n}px"> ${function(e){if(!e||0==e.length)return"";let t="";return e.forEach(e=>{t=`${t}${function(e){return e?`<div class="vnlp-card"> <div class="vnlp-card-image"> <img src="${e.imageUrl||"https://gonjoy.com/static/images/no-image.png"}"> </div><div class="vnlp-card-title"> <p>${e.title}</p></div><div class="vnlp-card-description"> <p>${e.subTitle||""}</p></div><div class="vnlp-card-buttons"> ${function(e){if(!e||0==e.length)return"";let t="";return e.forEach(e=>{t=`${t}${function(e){return e&&e.title?e.url?`<a href="${e.url||""}" target="_blank"><div class="vnlp-card-button">${e.title}</div></a>`:`<div class="vnlp-card-button">${e.title}</div>`:""}(e)}`}),t}(e.buttons)}</div></div>`:""}(e)}`}),t}(t)}</div></div></div>`}),VNLP.generateButtonsMesssage=(e=>{return e&&e.content&&e.content.buttons&&0!=e.content.buttons.length?`<div class="vnlp-message"> <div class="vnlp-message-content vnlp-message-buttons"> <p class="text">${e.content.text}</p><div class="vnlp-buttons"> ${function(e){if(!e||0==e.length)return"";let t="";return e.forEach(e=>{t=`${t}${function(e){return e&&e.title?e.url?`<a href='${e.url||""}' target="_blank"><div class="vnlp-button">${e.title}</div></a>`:`<div class="vnlp-button">${e.title}</div>`:""}(e)}`}),t}(e.content.buttons)}</div></div></div>`:""}),VNLP.generateQuickRepliesMessage=(e=>e&&e.content&&e.content.text?`<div class="vnlp-message"> <p class="vnlp-message-content vnlp-message-${e.isUser?"user":"bot"}"> ${e.content.text}</p></div>`:""),VNLP.appendCss=(()=>{const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.href=VNLP.cssUrl,document.getElementsByTagName("head")[0].appendChild(e)}),VNLP.appendTemplate=(()=>{const e=document.createElement("div");e.innerHTML=VNLP.template,document.getElementsByTagName("body")[0].appendChild(e)}),VNLP.show=(()=>{VNLP.container.style.display="block",VNLP.showController()}),VNLP.hide=(()=>{VNLP.container.style.display="none"}),VNLP.showPopup=(()=>{VNLP.chatPopup.style.display="block",VNLP.chatIcon.style.display="none",VNLP.chatDock.style.display="none"}),VNLP.closePopup=(()=>{VNLP.chatPopup.style.display="none",VNLP.showController()}),VNLP.showController=(()=>{"dock"==(VNLP.options&&VNLP.options.controller)?(VNLP.chatIcon.style.display="none",VNLP.chatDock.style.display="block"):(VNLP.chatIcon.style.display="block",VNLP.chatDock.style.display="none")}),VNLP.clear=(()=>{VNLP.sendReset(null,!1,()=>{VNLP.messages=[],VNLP.reloadChatInbox()})}),VNLP.startAgain=(()=>{VNLP.messages.push({isUser:!0,content:{type:VNLP.responseTypes.Text,text:"Start Again"}}),VNLP.reloadChatInbox(),VNLP.sendReset("Start Again",!0)}),VNLP.reset=(()=>{VNLP.sendReset(null,!0,()=>{VNLP.reloadChatInbox()})}),VNLP.sendQuickReply=(e=>{VNLP.chat(e.textContent.trim())}),VNLP.sendQuickReply=(e=>{VNLP.chat(e.textContent.trim())}),VNLP.clearAndClosePopup=(()=>{VNLP.clear(),VNLP.closePopup()}),VNLP.setController=(e=>{VNLP.options||(VNLP.options={}),VNLP.options.controller=e,VNLP.showController()}),window.onload=(()=>{VNLP.appendCss(),setTimeout(()=>{VNLP.appendTemplate(),VNLP.init(),VNLP.clear(),VNLP.messages=[]},1e3)}),VNLP.navigateLeft=(e=>{VNLP.navigationCount=100,VNLP.navigate(e,!0)}),VNLP.navigateRight=(e=>{VNLP.navigationCount=100,VNLP.navigate(e,!1)}),VNLP.navigate=((e,t)=>{setTimeout(()=>{if(0==VNLP.navigationCount)return;const n=e.parentElement.children,s=n[2].scrollLeft;n[2].scrollLeft+=t?-2:2,VNLP.navigationCount--;const o=s!=n[2].scrollLeft;VNLP.showNavigators(n,s,o),VNLP.navigate(e,t)},1)}),VNLP.showNavigators=((e,t,n)=>{n?(e[0].style.display="block",e[1].style.display="block"):0==t?(e[0].style.display="none",e[1].style.display="block"):(e[0].style.display="block",e[1].style.display="none")}),VNLP.dragElement=(e=>{var t=0,n=0,s=0,o=0;function a(e){VNLP.drag=!1,(e=e||window.event).preventDefault(),s=e.clientX,o=e.clientY,document.onmouseup=i,document.onmousemove=l}function l(a){(a=a||window.event).preventDefault(),t=s-a.clientX,n=o-a.clientY,s=a.clientX,o=a.clientY,e.style.top=e.offsetTop-n+"px",e.style.left=e.offsetLeft-t+"px",VNLP.drag=!0}function i(){document.onmouseup=null,document.onmousemove=null}document.getElementById(e.id+"-header")?document.getElementById(e.id+"-header").onmousedown=a:e.onmousedown=a});else{console.error("VNLP has not been declared yet!"),document.getElementById("vnlp-chat-container").style.display="none"}