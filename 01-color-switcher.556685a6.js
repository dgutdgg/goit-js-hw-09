const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.body;let a=null;e.addEventListener("click",(()=>{e.disabled=!0,t.disabled=!1,a=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=e}),1e3)})),t.addEventListener("click",(()=>{clearInterval(a),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.556685a6.js.map