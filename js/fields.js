/* ═══ حقول إدخال مصممة (ليست عناصر input) فلا يظهر شريط التعبئة التلقائية ولا الاقتراحات ═══ */
const CE=(()=>{try{const d=document.createElement('div');d.contentEditable='plaintext-only';return d.contentEditable==='plaintext-only'?'plaintext-only':'true'}catch(e){return 'true'}})();
function fldInit(root){(root||document).querySelectorAll('.fld').forEach(el=>{if(el._f)return;el._f=1;
  el.setAttribute('contenteditable',CE);el.setAttribute('role','textbox');el.setAttribute('inputmode',el.dataset.im||'text');el.setAttribute('enterkeyhint',el.dataset.im==='search'?'search':'done');
  el.setAttribute('autocomplete','off');el.setAttribute('autocorrect','off');el.setAttribute('autocapitalize','off');el.setAttribute('spellcheck','false');el.setAttribute('data-gramm','false');
  const max=+el.dataset.max||0;let init='';
  Object.defineProperty(el,'value',{get(){return el.textContent.replace(/[\u200b\n]/g,'').trim()},set(v){el.textContent=v==null?'':String(v)},configurable:true});
  el.addEventListener('focus',()=>{init=el.value});
  el.addEventListener('blur',()=>{if(el.value!==init)el.dispatchEvent(new Event('change',{bubbles:true}))});
  el.addEventListener('input',()=>{if(!el.textContent)el.innerHTML=''});
  el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();el.blur()}});
  el.addEventListener('paste',e=>{e.preventDefault();let t=((e.clipboardData||window.clipboardData).getData('text')||'').replace(/\s+/g,' ');if(max)t=t.slice(0,Math.max(0,max-el.value.length));document.execCommand('insertText',false,t)});
  el.addEventListener('beforeinput',e=>{if(max&&e.inputType&&e.inputType.indexOf('insert')===0&&e.inputType!=='insertFromPaste'&&el.value.length>=max&&getSelection().isCollapsed)e.preventDefault()});
  el.addEventListener('drop',e=>e.preventDefault())})}
fldInit();
