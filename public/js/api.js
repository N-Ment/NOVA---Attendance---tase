const NovaApi=(()=>{
  const URL_KEY='nova_hr_api_url',TOKEN_KEY='nova_hr_token';
  const url=()=>localStorage.getItem(URL_KEY)||window.NOVA_APPS_SCRIPT_URL||'';
  const setUrl=value=>{const v=String(value||'').trim();if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(v))throw new Error('ใส่ Apps Script Web App URL ที่ลงท้าย /exec');const pending=outbox();if(pending?.apiUrl&&pending.apiUrl!==v)throw new Error('กรุณารีเซ็ตรายการลงเวลาค้างก่อนเปลี่ยน URL');localStorage.setItem(URL_KEY,v);};
  const token=()=>{
    const value=sessionStorage.getItem(TOKEN_KEY)||localStorage.getItem(TOKEN_KEY)||'';
    const expiresAt=Number(value.split('.')[1]);
    if(expiresAt&&Date.now()>=expiresAt){clearToken();return '';}
    return value;
  };
  const setToken=(value,remember=false)=>{sessionStorage.setItem(TOKEN_KEY,value);if(remember)localStorage.setItem(TOKEN_KEY,value);else localStorage.removeItem(TOKEN_KEY);};
  const clearToken=()=>{sessionStorage.removeItem(TOKEN_KEY);localStorage.removeItem(TOKEN_KEY);};
  const OUTBOX_KEY='nova_attendance_outbox_v541';
  const outbox=()=>{try{const value=JSON.parse(localStorage.getItem(OUTBOX_KEY)||'null');if(value&&!value.action){value.action='publicConfirm';localStorage.setItem(OUTBOX_KEY,JSON.stringify(value));}return value;}catch{return null;}};
  const isConfirm=action=>action==='confirmFace'||action==='publicConfirm';
  const matches=(a,b)=>!!a&&!!b&&a.pendingToken===b.pendingToken&&a.idempotencyKey===b.idempotencyKey&&a.action===b.action;
  const persist=intent=>localStorage.setItem(OUTBOX_KEY,JSON.stringify(intent));
  const removeIfSame=intent=>{const latest=outbox();if(matches(latest,intent))localStorage.removeItem(OUTBOX_KEY);};
  const knownNoWrite=message=>/การยืนยันหมดอายุ|ไม่มีการบันทึกเวลา กรุณาสแกนใหม่|มีคำขอลงเวลาแทนที่รอผู้ดูแลอนุมัติ/.test(String(message||''));
  const apiError=(message,code)=>Object.assign(new Error(message),{code});
  async function call(action,payload={},authToken){
    if(!url())throw new Error('ตั้งค่า Apps Script URL ก่อน');
    let intent=null,current=outbox();
    if(current?.apiUrl&&current.apiUrl!==url()&&(isConfirm(action)||action==='discardFaceIntent'))throw new Error('รายการค้างมาจาก URL เดิม กรุณาเปลี่ยนกลับก่อนส่งซ้ำหรือรีเซ็ต');
    if(current&&!current.action){
      // Older outboxes did not keep the route. Public confirmation safely replays
      // a committed idempotency key, and rejects an authenticated pending token before writing.
      current.action='publicConfirm';persist(current);
    }
    if(isConfirm(action)){
      if(current){
        if(current.pendingToken!==payload.pendingToken)throw apiError('มีรายการลงเวลารอผล กรุณาส่งรายการเดิมให้สำเร็จก่อน','OUTBOX_LOCKED');
        if(current.action!==action)throw apiError('รายการเดิมต้องส่งผ่านช่องทางเดิม กรุณาดำเนินการต่อจากรายการที่ค้าง','OUTBOX_ROUTE_MISMATCH');
        intent=current;
      }else{
        intent={action,apiUrl:url(),pendingToken:payload.pendingToken,idempotencyKey:crypto.randomUUID(),employeeId:payload.employeeId||'',name:payload.name||'',nickname:payload.nickname||'',createdAt:new Date().toISOString(),status:'waiting'};
      }
      if(!intent.pendingToken)throw apiError('ไม่พบรายการยืนยัน กรุณาสแกนใบหน้าใหม่','MISSING_PENDING');
      payload.idempotencyKey=intent.idempotencyKey;
      if(current)delete payload.finalDescriptor;
      if(intent.employeeId){payload.employeeId=intent.employeeId;payload.name=intent.name;payload.nickname=intent.nickname;}
      intent.status='sending';persist(intent);
    }else if(current){
      const conflicts=['publicIdentify','identifyFace','publicCancel','cancelFace','publicSubmitAttendanceException','submitAttendanceException'];
      if(conflicts.includes(action))throw apiError('มีรายการลงเวลารอผล กรุณาส่งรายการเดิมให้สำเร็จก่อน','OUTBOX_LOCKED');
    }
    const timed=isConfirm(action)||action==='discardFaceIntent'||action==='publicIdentify'||action==='identifyFace';
    const controller=timed&&typeof AbortController!=='undefined'?new AbortController():null;
    const timer=controller?setTimeout(()=>controller.abort(),25000):null;
    let response;
    try{response=await fetch(url(),{signal:controller?.signal,method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,payload,token:authToken===undefined?token():authToken}),redirect:'follow'});}
    catch{if(timer)clearTimeout(timer);if(intent){const q=outbox();if(matches(q,intent)){q.status='waiting';persist(q);}}throw new Error('เชื่อมต่อ Apps Script ไม่ได้ ตรวจ URL และสิทธิ์ Web App');}
    let result;
    try{result=await response.json();}
    catch{if(intent){const q=outbox();if(matches(q,intent)){q.status='waiting';persist(q);}}throw new Error('Apps Script ตอบกลับไม่ใช่ JSON ตรวจ URL /exec และการ Deploy');}
    finally{if(timer)clearTimeout(timer);}
    if(!result.ok){const message=String(result.error||'คำขอไม่สำเร็จ');if(intent){if(knownNoWrite(message)){removeIfSame(intent);throw apiError(message,message.includes('หมดอายุ')?'PENDING_EXPIRED':'DEFINITIVE_NO_WRITE');}const q=outbox();if(matches(q,intent)){if(message.includes('บัญชีผู้ยืนยันไม่ตรงกับผู้สแกน'))q.action='confirmFace';q.status='waiting';q.lastError=message;persist(q);}}if(message.includes('เซสชันหมดอายุ'))clearToken();throw new Error(message);}
    if(intent)removeIfSame(intent);
    return result.data;
  }
  async function discardIntent(){
    const intent=outbox();
    if(!intent)return {recorded:false};
    const result=await call('discardFaceIntent',{pendingToken:intent.pendingToken,idempotencyKey:intent.idempotencyKey});
    removeIfSame(intent);
    return result;
  }
  return {discardIntent,url,setUrl,token,setToken,clearToken,call,outbox};
})();
