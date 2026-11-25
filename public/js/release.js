/** Smart Accounting 101 */
const NovaRelease=(()=>{
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pretty=value=>value?value.split('-').reverse().join('/'):'';
  const iso=value=>{
    const parts=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
    if(!parts)return '';
    const result=[parts[3],parts[2],parts[1]].join('-'),d=new Date(result+'T00:00:00Z');
    return Number.isFinite(+d)&&d.toISOString().slice(0,10)===result?result:'';
  };
  function range(id,start,end,startId='',endId=''){
    return `<div class="date-range" data-range="${esc(id)}">
      <button type="button" class="outline" data-range-open aria-haspopup="dialog">▦ <span>${pretty(start)} - ${pretty(end)}</span></button>
      <input type="hidden" name="start" id="${esc(startId||id+'Start')}" value="${esc(start)}">
      <input type="hidden" name="end" id="${esc(endId||id+'End')}" value="${esc(end)}">
    </div>`;
  }
  function monthRange(month){
    const d=new Date(month+'-01T00:00:00Z');
    if(!Number.isFinite(+d))return null;
    d.setUTCMonth(d.getUTCMonth()+1,0);
    return [month+'-01',d.toISOString().slice(0,10)];
  }
  function openRange(container,today,translate){
    const existing=document.querySelector('.range-dialog');
    if(existing){existing.close();return;}
    const fields=[container.querySelector('[name=start]'),container.querySelector('[name=end]')];
    const dialog=document.createElement('dialog');
    dialog.className='range-dialog';
    dialog.setAttribute('aria-label',translate('เลือกช่วงเวลา'));
    dialog.innerHTML=`<div class="form">
      <h3>เลือกช่วงเวลา</h3>
      <div class="actions range-shortcuts">
        <button type="button" data-shortcut="month">เดือนนี้</button><button type="button" data-shortcut="previous">เดือนที่แล้ว</button>
        <button type="button" data-shortcut="months">เลือกช่วงเดือน</button><button type="button" data-shortcut="year">ปีนี้</button><button type="button" data-shortcut="last-year">ปีที่แล้ว</button>
      </div>
      <div class="two" data-month-fields hidden><label>เดือนเริ่มต้น<input type="month" data-month="0"></label><label>เดือนสิ้นสุด<input type="month" data-month="1"></label></div>
      <div class="two">
        ${['วันที่เริ่มต้น','วันที่สิ้นสุด'].map((label,i)=>`<label>${label}<span class="range-entry"><input data-text="${i}" inputmode="numeric" placeholder="DD/MM/YYYY"><input aria-label="${label}" data-date="${i}" type="date"></span></label>`).join('')}
      </div>
      <p role="status" data-range-status></p>
      <div class="actions"><button class="outline" type="button" data-range-cancel>ยกเลิก</button><button class="primary" type="button" data-range-apply>ยืนยัน</button></div>
    </div>`;
    const texts=[...dialog.querySelectorAll('[data-text]')],dates=[...dialog.querySelectorAll('[data-date]')],months=[...dialog.querySelectorAll('[data-month]')];
    const fill=values=>values.forEach((value,i)=>{texts[i].value=pretty(value);dates[i].value=value;months[i].value=value.slice(0,7);});
    fill(fields.map(f=>f.value));
    dialog.addEventListener('change',e=>{
      const input=e.target;
      if(input.dataset.date!==undefined)texts[Number(input.dataset.date)].value=pretty(input.value);
      if(input.dataset.text!==undefined)dates[Number(input.dataset.text)].value=iso(input.value);
      if(input.dataset.month!==undefined){
        const a=monthRange(months[0].value),b=monthRange(months[1].value);
        if(a&&b){texts[0].value=pretty(a[0]);texts[1].value=pretty(b[1]);dates[0].value=a[0];dates[1].value=b[1];}
      }
    });
    dialog.addEventListener('click',e=>{
      const key=e.target.dataset.shortcut;
      if(key==='months'){dialog.querySelector('[data-month-fields]').hidden=false;months[0].focus();}
      else if(key){
        const d=new Date(today+'T00:00:00Z'),y=d.getUTCFullYear()-(key==='last-year'?1:0);
        if(key==='year'||key==='last-year')fill([y+'-01-01',y+'-12-31']);
        else{
          d.setUTCDate(1);if(key==='previous')d.setUTCMonth(d.getUTCMonth()-1);
          fill(monthRange(d.toISOString().slice(0,7)));
        }
      }
      if(e.target.hasAttribute('data-range-cancel'))dialog.close();
      if(e.target.hasAttribute('data-range-apply')){
        const values=texts.map(field=>iso(field.value));
        if(!values[0]||!values[1]||values[0]>values[1]){
          dialog.querySelector('[data-range-status]').textContent=translate('ช่วงวันที่ไม่ถูกต้อง');
          return;
        }
        fields.forEach((field,i)=>{field.value=values[i];});
        container.querySelector('button span').textContent=values.map(pretty).join(' - ');
        dialog.close();
      }
    });
    dialog.addEventListener('close',()=>{dialog.remove();container.querySelector('button')?.focus();});
    document.body.append(dialog);
    NovaLang.localize(dialog);
    dialog.showModal();
  }

  function faceTracker({video,status,identify,cancel,seconds}){
    const wrapper=video.parentElement,layer=document.createElement('div');
    layer.className='face-layer';wrapper.append(layer);
    const cancelButton=document.createElement('button');
    cancelButton.type='button';cancelButton.className='outline face-cancel';
    cancelButton.textContent=NovaLang.t('ไม่ใช่ฉัน / สแกนใหม่');
    wrapper.after(cancelButton);cancelButton.hidden=true;
    let match=null,reference=null,started=0,current=true,lastRejected=0,ambiguous=false,dismissed=null;
    const distance=(a,b)=>Math.sqrt(a.reduce((sum,x,i)=>sum+(x-b[i])**2,0));
    const stopMatch=()=>{
      if(match)cancel(match);
      match=null;reference=null;started=0;cancelButton.hidden=true;
    };
    cancelButton.addEventListener('click',()=>{
      dismissed=reference;stopMatch();lastRejected=performance.now();layer.replaceChildren();
      status('ยกเลิกแล้ว กำลังสแกนใหม่');
    });
    function draw(faces,tone,label,count){
      const vw=video.videoWidth,vh=video.videoHeight,w=video.clientWidth,h=video.clientHeight;
      if(!vw||!vh||!w||!h)return;
      const scale=Math.max(w/vw,h/vh),ox=(w-vw*scale)/2,oy=(h-vh*scale)/2;
      layer.replaceChildren();
      for(const face of faces){
        const box=face.detection?.box;
        if(!box)continue;
        const el=document.createElement('div');
        el.className='face-tag '+tone;
        const left=w-(box.x+box.width)*scale-ox,top=box.y*scale+oy;
        Object.assign(el.style,{left:Math.max(0,left)+'px',top:Math.max(0,top)+'px',
          width:Math.max(0,Math.min(w,left+box.width*scale)-Math.max(0,left))+'px',
          height:Math.max(0,Math.min(h,top+box.height*scale)-Math.max(0,top))+'px'});
        if(label){const tag=document.createElement('span');tag.textContent=label;el.append(tag);}
        layer.append(el);
      }
      if(count){const el=document.createElement('output');el.className='face-countdown';el.textContent=count;layer.append(el);}
    }
    return {
      async track(faces,running){
        if(!current||!running()||document.hidden){stopMatch();return null;}
        if(faces.length!==1||faces[0].descriptor?.length!==128){
          stopMatch();ambiguous=false;lastRejected=0;dismissed=null;draw(faces,'neutral');
          status(faces.length>1?'พบหลายใบหน้า กรุณาสแกนทีละคน':'จัดใบหน้าให้อยู่กลางกรอบ');
          return null;
        }
        const probe=Array.from(faces[0].descriptor);
        if(dismissed){
          if(distance(dismissed,probe)<=0.33){draw(faces,'neutral');status('ยกเลิกแล้ว กรุณานำใบหน้าออกจากกรอบก่อนสแกนใหม่');return null;}
          dismissed=null;
        }
        if(reference){
          if(distance(reference,probe)>0.33){
            stopMatch();draw(faces,'neutral');status('ใบหน้าเปลี่ยน กรุณาสแกนใหม่');lastRejected=performance.now();return null;
          }
        }
        if(!match){
          if(lastRejected&&performance.now()-lastRejected<(ambiguous?4500:800)){draw(faces,ambiguous?'unknown':'neutral',ambiguous?NovaLang.t('ไม่พบข้อมูล'):'');return null;}
          draw(faces,'neutral');status('กำลังตรวจสอบใบหน้า กรุณารอสักครู่…');
          let found;
          try{found=await identify(probe);}catch(error){
            if(!current||!running())return null;
            ambiguous=/ไม่พบใบหน้า|ใบหน้าไม่ตรง/.test(error.message||'');
            if(!ambiguous)throw error;
            lastRejected=performance.now();draw(faces,'unknown',NovaLang.t('ไม่พบข้อมูล'));status('ไม่พบข้อมูล');return null;
          }
          if(!current||!running()||document.hidden){cancel(found);return null;}
          match=found;reference=probe;started=0;ambiguous=false;cancelButton.hidden=false;
          draw(faces,'neutral',found.nickname||found.name);
          status('ตรวจสอบชื่อเล่นก่อนบันทึก');
          return null;
        }
        if(!started)started=performance.now();
        const remaining=seconds-(performance.now()-started)/1000;
        draw(faces,'match',match.nickname||match.name,Math.max(1,Math.ceil(remaining)));
        if(remaining>0)return null;
        const result={...match,finalDescriptor:probe};match=null;
        return result;
      },
      dispose(){current=false;stopMatch();cancelButton.remove();layer.remove();}
    };
  }

  function downloadBackup(value){
    const url=URL.createObjectURL(new Blob([JSON.stringify(value)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='NovaAttendance-'+value.createdAt.slice(0,10)+'.json';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return {esc,range,openRange,faceTracker,downloadBackup};
})();
