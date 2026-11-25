/** Smart Accounting 101 */
const NovaLang=(()=>{
  const languages={th:'ไทย',zh:'简体中文',en:'English',my:'မြန်မာ'};
  const key='nova_hr_language';
  let current='th';
  try{if(Object.hasOwn(languages,localStorage.getItem(key)))current=localStorage.getItem(key);}catch{}
  const catalog=`ภาษา|Language|语言|ဘာသာစကား
เข้าสู่ระบบ|Sign in|登录|ဝင်ရောက်ရန်
ออกจากระบบ|Sign out|退出登录|ထွက်ရန်
ออก|Out|签退|ထွက်
เข้า|In|签到|ဝင်
กลับหน้าสแกน|Back to scan|返回扫描|စကင်မျက်နှာသို့ ပြန်ရန်
หน้าหลัก|Home|首页|ပင်မစာမျက်နှာ
ภาพรวม|Overview|概览|ခြုံငုံသုံးသပ်ချက်
ภาพรวมงานบุคคล|HR overview|人事概览|ဝန်ထမ်းရေးရာ အနှစ်ချုပ်
ระบบลงเวลาและวันลา|Attendance and leave|考勤与请假|အလုပ်ချိန်နှင့် ခွင့်စနစ်
ระบบลงเวลา|Attendance|考勤|အလုပ်ချိန်
พนักงาน|Employees|员工|ဝန်ထမ်း
เจ้าของธุรกิจ|Owner|所有者|လုပ်ငန်းပိုင်ရှင်
หัวหน้าแผนก|Department manager|部门主管|ဌာနမှူး
สแกนหน้า|Face scan|人脸扫描|မျက်နှာစကင်
สแกนใบหน้า|Face scan|人脸扫描|မျက်နှာစကင်
สแกนใบหน้าเข้า–ออกงาน|Face scan for clock-in and clock-out|人脸识别上下班打卡|အလုပ်ဝင်ထွက် မျက်နှာစကင်
สแกนหน้าเพื่อบันทึกเวลา|Scan your face to clock in or out|刷脸打卡|အလုပ်ချိန် မှတ်ရန် မျက်နှာစကင်ဖတ်ပါ
เปิดกล้องสแกนใบหน้า|Open camera|打开摄像头|ကင်မရာဖွင့်ရန်
เริ่มสแกนใบหน้า|Start face scan|开始人脸扫描|မျက်နှာစကင် စတင်ရန်
ปิดกล้อง|Close camera|关闭摄像头|ကင်မရာပိတ်ရန်
กดเปิดกล้องเพื่อสแกน|Open the camera to scan|打开摄像头进行扫描|စကင်ဖတ်ရန် ကင်မရာဖွင့်ပါ
กดเริ่มสแกน หรือรอกล้องเปิด|Start scanning or wait for the camera|开始扫描或等待摄像头开启|စကင်စတင်ပါ သို့မဟုတ် ကင်မရာဖွင့်သည်အထိ စောင့်ပါ
กำลังเตรียมกล้อง…|Preparing camera…|正在准备摄像头…|ကင်မရာ ပြင်ဆင်နေသည်…
กำลังเปิดกล้อง…|Opening camera…|正在打开摄像头…|ကင်မရာ ဖွင့်နေသည်…
กำลังสแกน…|Scanning…|正在扫描…|စကင်ဖတ်နေသည်…
กำลังโหลดโมเดลใบหน้า…|Loading face model…|正在加载人脸模型…|မျက်နှာ မော်ဒယ် ရယူနေသည်…
กำลังตรวจสอบใบหน้า กรุณารอสักครู่…|Checking face. Please wait…|正在验证人脸，请稍候…|မျက်နှာ စစ်ဆေးနေသည်၊ ခဏစောင့်ပါ…
จัดใบหน้าให้อยู่กลางกรอบ|Center your face in the frame|将面部对准画面中央|မျက်နှာကို ဘောင်အလယ်တွင် ထားပါ
พบหลายใบหน้า กรุณาสแกนทีละคน|Multiple faces detected. Scan one person at a time|检测到多张人脸，请逐人扫描|မျက်နှာများစွာ တွေ့သည်။ တစ်ကြိမ်လျှင် တစ်ဦးသာ စကင်ဖတ်ပါ
ใบหน้าเปลี่ยน กรุณาสแกนใหม่|Face changed. Please scan again|人脸已变化，请重新扫描|မျက်နှာ ပြောင်းသွားသည်။ ပြန်စကင်ဖတ်ပါ
ตรวจสอบชื่อเล่นก่อนบันทึก|Check the nickname before saving|保存前请核对昵称|မသိမ်းမီ အမည်ပြောင်ကို စစ်ဆေးပါ
ไม่พบข้อมูล|No match|未找到匹配记录|ကိုက်ညီသော အချက်အလက် မတွေ့ပါ
ไม่ใช่ฉัน / สแกนใหม่|Not me / Scan again|不是我 / 重新扫描|ကျွန်ုပ်မဟုတ်ပါ / ပြန်စကင်ဖတ်ရန်
ไม่ใช่ · สแกนใหม่|Not me · Scan again|不是我 · 重新扫描|ကျွန်ုပ်မဟုတ်ပါ · ပြန်စကင်ဖတ်ရန်
รีเซ็ตสถานะการสแกน|Reset scan status|重置扫描状态|စကင် အခြေအနေ ပြန်သတ်မှတ်ရန်
รีเซ็ตสถานะการสแกนแล้ว|Scan status reset|已重置扫描状态|စကင် အခြေအနေ ပြန်သတ်မှတ်ပြီး
รายการเดิมบันทึกแล้ว กรุณาตรวจสอบประวัติ|The previous record was saved. Check the history|上次打卡已保存，请查看记录|ယခင်မှတ်တမ်း သိမ်းပြီးပါပြီ။ မှတ်တမ်းကို စစ်ဆေးပါ
ส่งซ้ำเพื่อบันทึกเวลา|Retry saving|重试保存打卡|ပြန်လည် သိမ်းဆည်းရန်
รายการเดิมของ|Previous record for|上次记录属于|ယခင်မှတ်တမ်းပိုင်ရှင်
พบใบหน้า|Face matched|已匹配人脸|မျက်နှာ ကိုက်ညီသည်
ใช่ ฉันเอง|Yes, that's me|是我|ဟုတ်ပါသည်၊ ကျွန်ုပ်ပါ
เปิดเสียงบนเครื่องนี้|Enable sound on this device|在此设备启用声音|ဤစက်တွင် အသံဖွင့်ရန်
ทดสอบเสียงอีกครั้ง|Test sound again|再次测试声音|အသံ ပြန်စမ်းရန်
สแกนไม่สำเร็จ|Scan failed|扫描失败|စကင် မအောင်မြင်ပါ
บันทึกเวลาสำเร็จ|Attendance saved|打卡成功|အလုပ်ချိန် မှတ်တမ်းတင်ပြီး
บันทึกสำเร็จ|Saved|保存成功|သိမ်းဆည်းပြီး
กำลังบันทึก…|Saving…|正在保存…|သိမ်းဆည်းနေသည်…
กำลังโหลด…|Loading…|正在加载…|ဖွင့်နေသည်…
กำลังส่งเวลา…|Submitting attendance…|正在提交打卡…|အလုပ်ချိန် ပေးပို့နေသည်…
ประวัติและรายงาน|History and reports|记录与报表|မှတ်တမ်းနှင့် အစီရင်ခံစာ
ประวัติลงเวลา|Attendance history|考勤记录|အလုပ်ချိန်မှတ်တမ်း
ประวัติวันลา|Leave history|请假记录|ခွင့်မှတ်တမ်း
ประวัติ|History|记录|မှတ်တမ်း
รายการรออนุมัติ|Pending approvals|待审批事项|ခွင့်ပြုရန် စောင့်ဆိုင်းနေသော စာရင်း
รออนุมัติ|Pending approval|待审批|အတည်ပြုရန် စောင့်နေသည်
อนุมัติแล้ว|Approved|已批准|အတည်ပြုပြီး
อนุมัติ|Approve|批准|အတည်ပြုရန်
ไม่อนุมัติ|Reject|拒绝|ငြင်းပယ်ရန်
ไม่มีรายการรออนุมัติ|No pending requests|没有待审批事项|စောင့်ဆိုင်းနေသော တောင်းဆိုချက် မရှိပါ
รายการลงเวลา|Attendance records|打卡记录|အလုပ်ချိန်စာရင်း
คำขอลงเวลาแทนการสแกน|Manual attendance requests|补卡申请|အလုပ်ချိန် ဖြည့်သွင်းရန် တောင်းဆိုချက်
คำขอลาของฉัน|My leave requests|我的请假申请|ကျွန်ုပ်၏ ခွင့်တောင်းဆိုချက်များ
คำขอลาวันหยุด|Days-off requests|休息日申请|နားရက် တောင်းဆိုချက်များ
คำขอวันหยุด|Days-off requests|休息日申请|နားရက် တောင်းဆိုချက်များ
คำขอลา|Leave requests|请假申请|ခွင့်တောင်းဆိုချက်များ
ยื่นคำขอลา|Request leave|申请请假|ခွင့်တောင်းရန်
ส่งคำขอ|Submit request|提交申请|တောင်းဆိုချက် ပေးပို့ရန်
ประเภทการลา|Leave type|请假类型|ခွင့်အမျိုးအစား
เหตุผล|Reason|原因|အကြောင်းပြချက်
หมายเหตุ|Notes|备注|မှတ်ချက်
ปฏิทินพนักงาน|Team calendar|员工日历|ဝန်ထမ်း ပြက္ခဒိန်
ปฏิทินทุกคน|Team calendar|团队日历|အဖွဲ့ ပြက္ခဒိန်
ปฏิทิน|Calendar|日历|ပြက္ခဒိန်
วันหยุด|Day off|休息日|နားရက်
วันทำงาน|Workdays|工作日|အလုပ်လုပ်ရက်
มาทำงาน|Present|出勤|အလုပ်တက်သည်
ตั้งค่าระบบ|Settings|系统设置|စနစ် ဆက်တင်များ
ตั้งค่า|Settings|设置|ဆက်တင်များ
เมนูทั้งหมด|All menus|所有菜单|မီနူး အားလုံး
เมนูทางลัด|Shortcuts|快捷方式|ဖြတ်လမ်းများ
แผนก / กะ / OT / วันลา|Departments / shifts / overtime / leave|部门 / 班次 / 加班 / 请假|ဌာန / အလှည့် / အချိန်ပို / ခွင့်
บัญชี / บริษัท|Account / Company|账户 / 公司|အကောင့် / ကုမ္ပဏီ
บัญชีของฉัน|My account|我的账户|ကျွန်ုပ်၏ အကောင့်
เครื่องสแกน / พื้นที่|Scanner / Location|扫描设备 / 位置|စကင်စက် / တည်နေရာ
ใบหน้า|Face|人脸|မျက်နှာ
ลงทะเบียนใบหน้า|Enroll face|录入人脸|မျက်နှာ စာရင်းသွင်းရန်
ชื่อพนักงาน|Employee name|员工姓名|ဝန်ထမ်းအမည်
ชื่อเล่น|Nickname|昵称|အမည်ပြောင်
รหัสพนักงาน|Employee ID|员工编号|ဝန်ထမ်းနံပါတ်
พนักงานและบทบาท|Employees and roles|员工与角色|ဝန်ထမ်းနှင့် အခန်းကဏ္ဍများ
ค้นหาพนักงาน|Find employees|查找员工|ဝန်ထမ်း ရှာဖွေရန်
เพิ่มพนักงาน|Add employee|添加员工|ဝန်ထမ်း ထည့်ရန်
ชื่อบริษัท|Company name|公司名称|ကုမ္ပဏီအမည်
สถานะ|Status|状态|အခြေအနေ
ใช้งาน|Active|启用|အသုံးပြုနေသည်
ลบแล้ว|Inactive|已停用|ပိတ်ထားသည်
วันที่ลาออก|Resignation date|离职日期|အလုပ်ထွက်သည့်ရက်
วันที่กลับเข้าทำงาน|Rehire date|返聘日期|အလုပ်ပြန်ဝင်သည့်ရက်
รับกลับเข้าทำงาน|Rehire|返聘|အလုပ်ပြန်ခန့်ရန်
ยืนยันรับพนักงานกลับเข้าทำงาน?|Rehire this employee?|确认返聘此员工？|ဤဝန်ထမ်းကို ပြန်ခန့်မည်လား။
แผนก|Department|部门|ဌာန
กะการทำงาน|Work shifts|工作班次|အလုပ်အလှည့်များ
รหัสกะ|Shift ID|班次编号|အလှည့်နံပါတ်
ชื่อกะ|Shift name|班次名称|အလှည့်အမည်
กะ|Shift|班次|အလှည့်
เวลาเริ่ม|Start time|开始时间|စတင်ချိန်
เวลาสิ้นสุด|End time|结束时间|ပြီးဆုံးချိန်
เวลาพัก (นาที)|Break (min)|休息时间（分钟）|နားချိန် (မိနစ်)
เวลาเข้างาน|Clock-in time|上班打卡时间|အလုပ်ဝင်ချိန်
เวลาออกงาน|Clock-out time|下班打卡时间|အလုပ်ထွက်ချိန်
เข้างาน|Clock in|上班打卡|အလုပ်ဝင်
ออกงาน|Clock out|下班打卡|အလုပ်ထွက်
รอออกงาน|Awaiting clock-out|待签退|အလုပ်ထွက်ချိန် စောင့်နေသည်
สาย (นาที)|Late (min)|迟到（分钟）|နောက်ကျမှု (မိနစ်)
นาที|min|分钟|မိနစ်
ชั่วโมง|hours|小时|နာရီ
บันทึกกะ|Save shift|保存班次|အလှည့် သိမ်းရန်
เพิ่มกะ|Add shift|添加班次|အလှည့် ထည့်ရန်
ลบกะ|Delete shift|删除班次|အလှည့် ဖျက်ရန်
สรุป OT ของฉัน|My overtime|我的加班|ကျွန်ုပ်၏ အချိန်ပို
สรุป OT รายเดือนและช่วงวันที่|Overtime by month and date range|按月份和日期范围汇总加班|လနှင့် ရက်အပိုင်းအခြားအလိုက် အချိန်ပို
สรุป OT ตามช่วงวันที่|Summarize overtime for the date range|按日期范围汇总加班|ရက်အပိုင်းအခြားအလိုက် အချိန်ပို စုစည်းရန်
สรุปเดือนที่เลือก|Summarize selected month|汇总所选月份|ရွေးထားသောလ စုစည်းရန်
รวม OT|Total overtime|加班合计|အချိန်ပို စုစုပေါင်း
แก้ไขทั้งหมด|Edit all|编辑本页全部|အားလုံး ပြင်ရန်
บันทึกทั้งหมด|Save all|全部保存|အားလုံး သိမ်းရန်
เหตุผลการแก้ไข|Reason for changes|修改原因|ပြင်ဆင်ရသည့်အကြောင်း
บันทึกข้อมูลแล้ว|Changes saved|已保存修改|ပြောင်းလဲချက်များ သိမ်းပြီး
บันทึก|Save|保存|သိမ်းရန်
แก้ไข|Edit|编辑|ပြင်ရန်
ปิด|Close|关闭|ပိတ်ရန်
เลือก|Select|选择|ရွေးရန်
ยกเลิก|Cancel|取消|ပယ်ဖျက်ရန်
ยืนยัน|Confirm|确认|အတည်ပြုရန်
ก่อนหน้า|Previous|上一页|ရှေ့သို့
ถัดไป|Next|下一页|နောက်သို့
ส่งออก XLSX ตามวันที่ / พนักงาน|Export XLSX by date / employee|按日期 / 员工导出 XLSX|ရက် / ဝန်ထမ်းအလိုက် XLSX ထုတ်ရန်
ค้นหาและตัวกรอง|Search and filters|搜索和筛选|ရှာဖွေမှုနှင့် စစ်ထုတ်မှု
ค้นหา / โหลดช่วงวันที่|Search / Load date range|搜索 / 加载日期范围|ရှာဖွေရန် / ရက်အပိုင်းအခြား ဖွင့်ရန်
ค้นหาชื่อ / รหัส|Search name / ID|按姓名 / 编号搜索|အမည် / နံပါတ် ရှာရန်
ล้างตัวกรอง|Clear filters|清除筛选|စစ်ထုတ်ချက်များ ရှင်းရန်
ทุกสถานะ|All statuses|所有状态|အခြေအနေ အားလုံး
ทุกแผนก|All departments|所有部门|ဌာန အားလုံး
ทุกคน|Everyone|所有人|အားလုံး
โหมดมืด|Dark mode|深色模式|အမှောင်စနစ်
โหมดสว่าง|Light mode|浅色模式|အလင်းစနစ်
สำรองและนำเข้าข้อมูล|Backup and restore|备份与导入|အရန်ကူးခြင်းနှင့် ပြန်သွင်းခြင်း
สำรองข้อมูล|Backup|备份|အရန်ကူးရန်
ขอบเขตข้อมูล|Data scope|数据范围|ဒေတာ အတိုင်းအတာ
ทั้งหมด|All|全部|အားလုံး
รายชื่อพนักงาน|Employee list|员工名单|ဝန်ထမ်းစာရင်း
ประวัติตามช่วงวันที่|History by date range|按日期范围选择历史记录|ရက်အပိုင်းအခြားအလိုက် မှတ်တမ်း
ดาวน์โหลดไฟล์สำรอง|Download backup|下载备份文件|အရန်ဖိုင် ဒေါင်းလုဒ်လုပ်ရန်
ตรวจรายการก่อนเคลียร์|Preview deletion|预览清理项|မဖျက်မီ စစ်ဆေးရန်
ไฟล์สำรอง JSON|JSON backup file|JSON 备份文件|JSON အရန်ဖိုင်
ดูตัวอย่างก่อนนำเข้า|Preview import|预览导入|မသွင်းမီ ကြည့်ရန်
ตัวอย่างการนำเข้า|Import preview|导入预览|သွင်းမည့်စာရင်း အစမ်းကြည့်ရန်
ตัวอย่างรายการที่จะลบ|Deletion preview|删除预览|ဖျက်မည့်စာရင်း အစမ်းကြည့်ရန်
แทนที่|Replace|替换|အစားထိုးရန်
เพิ่ม|Add|添加|ထည့်ရန်
เปิดไฟล์สำรองใน Google Drive|Open backup in Google Drive|在 Google Drive 中打开备份|Google Drive တွင် အရန်ဖိုင် ဖွင့်ရန်
วันที่|Date|日期|ရက်စွဲ
เลือกช่วงเวลา|Select date range|选择日期范围|ရက်အပိုင်းအခြား ရွေးရန်
เลือกช่วงเดือน|Select month range|选择月份范围|လအပိုင်းအခြား ရွေးရန်
เลือกเดือน|Select month|选择月份|လ ရွေးရန်
เดือนนี้|This month|本月|ယခုလ
เดือนที่แล้ว|Last month|上月|ပြီးခဲ့သောလ
ปีนี้|This year|今年|ယခုနှစ်
ปีที่แล้ว|Last year|去年|ပြီးခဲ့သောနှစ်
วันที่เริ่มต้น|Start date|开始日期|စတင်ရက်
วันที่สิ้นสุด|End date|结束日期|ပြီးဆုံးရက်
เดือนเริ่มต้น|Start month|开始月份|စတင်လ
เดือนสิ้นสุด|End month|结束月份|ပြီးဆုံးလ
ช่วงวันที่ไม่ถูกต้อง|Invalid date range|日期范围无效|ရက်အပိုင်းအခြား မမှန်ပါ
จำรหัสพนักงาน|Remember employee ID|记住员工编号|ဝန်ထမ်းနံပါတ် မှတ်ထားရန်
เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่|Session expired. Sign in again|登录已过期，请重新登录|ဝင်ရောက်မှု သက်တမ်းကုန်ပါပြီ။ ပြန်ဝင်ပါ
เปลี่ยน PIN|Change PIN|更改 PIN|PIN ပြောင်းရန်
ตั้งค่าโลเคชัน|Location settings|位置设置|တည်နေရာ ဆက်တင်များ
ละติจูด|Latitude|纬度|လတ္တီတွဒ်
ลองจิจูด|Longitude|经度|လောင်ဂျီတွဒ်
บันทึกโลเคชัน|Save location|保存位置|တည်နေရာ သိမ်းရန်
ใช้ตำแหน่งปัจจุบัน|Use current location|使用当前位置|လက်ရှိ တည်နေရာ သုံးရန်
เวลารอก่อนเริ่มตรวจใบหน้า (วินาที)|Delay before face detection (seconds)|开始人脸检测前的等待时间（秒）|မျက်နှာ မစစ်မီ စောင့်ချိန် (စက္ကန့်)
เวลานับถอยหลังก่อนบันทึก (วินาที)|Countdown before saving (seconds)|打卡保存前的倒计时（秒）|မသိမ်းမီ နောက်ပြန်ရေတွက်ချိန် (စက္ကန့်)
บันทึกการสแกน|Save scan settings|保存扫描设置|စကင် ဆက်တင်များ သိမ်းရန်
เครื่องสแกนส่วนกลาง|Shared scanner|共享打卡机|အများသုံး စကင်စက်
เชื่อมต่อ Apps Script สำเร็จ|Connected to Apps Script|已连接到 Apps Script|Apps Script သို့ ချိတ်ဆက်ပြီး
เปลี่ยนรหัสผ่าน Developer|Change developer password|更改开发者密码|Developer စကားဝှက် ပြောင်းရန်
เลือกทั้งหมดในหน้านี้|Select all on this page|选择本页全部|ဤစာမျက်နှာရှိ အားလုံး ရွေးရန်
อนุมัติที่เลือก|Approve selected|批准所选项|ရွေးထားသည်များ အတည်ပြုရန်
รายการ|records|条记录|စာရင်း
ตรวจสอบ / ยกเลิกรายการนี้|Review / cancel this record|检查 / 取消此记录|ဤမှတ်တမ်းကို စစ်ဆေးရန် / ပယ်ဖျက်ရန်
ส่งคิวอีกครั้ง|Retry queue|重试队列|တန်းစီထားသည်များ ပြန်ပို့ရန်
ข้อมูลใบหน้าอยู่เฉพาะหน้าเว็บนี้ · ปิดหรือรีเฟรชแล้ว Admin ต้องเปิดโหมดใหม่|Face data stays on this page. An admin must re-enable the mode after closing or refreshing|人脸数据仅保存在此页。关闭或刷新后需管理员重新启用|မျက်နှာဒေတာကို ဤစာမျက်နှာတွင်သာ ထားသည်။ ပိတ်ပြီး သို့မဟုတ် ပြန်ဖွင့်ပြီးနောက် စီမံသူက ပြန်ဖွင့်ရမည်
แตะหน้าจอเพื่อสแกนใบหน้า|Tap to scan your face|轻触屏幕进行人脸扫描|မျက်နှာစကင်ဖတ်ရန် နှိပ်ပါ
ยังมีรายการลงเวลาที่ยังไม่ได้รับการยืนยัน|An attendance record is still unconfirmed|仍有未确认的打卡记录|အတည်မပြုရသေးသော အလုပ်ချိန်မှတ်တမ်း ရှိသည်
เข้าสู่ระบบเพื่อส่งรายการเดิม|Sign in to resend the previous record|登录后重发上次记录|ယခင်မှတ်တမ်း ပြန်ပို့ရန် ဝင်ပါ
วางใบหน้า 1 คนกลางภาพ แล้วตรวจสอบชื่อเล่นก่อนระบบบันทึกเวลา|Center one face and check the nickname before saving|将一张脸对准画面中央，保存前核对昵称|မျက်နှာတစ်ခုကို အလယ်တွင်ထားပြီး မသိမ်းမီ အမည်ပြောင် စစ်ပါ
สแกนใบหน้าไม่สำเร็จ? ยื่นคำขอลงเวลา|Scan failed? Submit a manual attendance request|人脸扫描失败？提交补卡申请|စကင် မအောင်မြင်ပါသလား။ အလုပ်ချိန်တောင်းဆိုချက် ပို့ပါ
เวลาที่อ้างอิง|Reported time|申报时间|တင်ပြထားသောအချိန်
ส่งคำขอให้หัวหน้าพิจารณา|Send request to manager|提交主管审批|ဌာနမှူးထံ တောင်းဆိုချက် ပို့ရန်
ต้องส่งจากพื้นที่ทำงานเท่านั้น และรอหัวหน้างานอนุมัติก่อนบันทึกเวลา|Submit from the workplace. The manager must approve before the time is recorded|请从工作地点提交，主管批准后才会记录|အလုပ်နေရာမှ ပို့ပါ။ အချိန်မမှတ်မီ ဌာနမှူး အတည်ပြုရမည်
ส่งรายการเดิมให้สำเร็จก่อนเริ่มสแกนรายการใหม่|Resolve the previous record before scanning again|请先处理上次记录，再开始扫描|ပြန်စကင်မဖတ်မီ ယခင်မှတ်တမ်းကို ဖြေရှင်းပါ
ต้องตั้งรหัสใหม่ก่อนจัดการวันใช้งานหรือการสแกน|Set a new password before managing access or scanning|管理使用时间或扫描前请设置新密码|အသုံးပြုခွင့် သို့မဟုတ် စကင်ကို မစီမံမီ စကားဝှက်အသစ် သတ်မှတ်ပါ
รหัสผ่านใหม่ 12–64 ตัว|New password (12–64 characters)|新密码（12–64 字符）|စကားဝှက်အသစ် (12–64 လုံး)
บันทึกรหัสผ่านใหม่|Save new password|保存新密码|စကားဝှက်အသစ် သိမ်းရန်
กลับหน้าหลัก|Back to home|返回首页|ပင်မစာမျက်နှာသို့ ပြန်ရန်
รหัสผ่าน Developer|Developer password|开发者密码|Developer စကားဝှက်
การใช้งานระบบ|System access|系统使用|စနစ် အသုံးပြုခွင့်
วันเริ่ม (ไม่บังคับ)|Start date (optional)|开始日期（选填）|စတင်ရက် (မဖြည့်လည်းရ)
วันสิ้นสุด (ไม่บังคับ)|End date (optional)|结束日期（选填）|ပြီးဆုံးရက် (မဖြည့်လည်းရ)
เปิดให้พนักงานใช้งาน|Enable access for employees|允许员工使用|ဝန်ထမ်းများ အသုံးပြုခွင့် ဖွင့်ရန်
บันทึกการตั้งค่า|Save settings|保存设置|ဆက်တင်များ သိမ်းရန်
ออกจากหน้า Developer|Exit Developer page|退出开发者页面|Developer စာမျက်နှာမှ ထွက်ရန်
ใช้รหัสพนักงานและ PIN ที่ผู้ดูแลระบบออกให้ · เข้าสู่ระบบได้ 7 วัน|Use the employee ID and PIN provided by your admin. Sessions last 7 days|请使用管理员提供的员工编号和 PIN，登录有效期为 7 天|စီမံသူ ပေးထားသော ဝန်ထမ်းနံပါတ်နှင့် PIN ကို သုံးပါ။ ၇ ရက်ကြာ ဝင်ရောက်နိုင်သည်
ตั้งค่าการเชื่อมต่อ Apps Script|Apps Script connection settings|Apps Script 连接设置|Apps Script ချိတ်ဆက်မှု ဆက်တင်များ
ตรวจการเชื่อมต่อ|Test connection|测试连接|ချိတ်ဆက်မှု စမ်းသပ်ရန်
พนักงานที่ใช้งาน|Active employees|在职员工|အသုံးပြုနေသော ဝန်ထမ်းများ
รออนุมัติเวลา · ข้อมูลล่าสุด|Pending attendance · Latest|待审批考勤 · 最新|အတည်ပြုရန် စောင့်နေသည့် နောက်ဆုံးအလုပ်ချိန်စာရင်း
รออนุมัติเวลา|Pending attendance|待审批考勤|အလုပ်ချိန် အတည်ပြုရန် စောင့်နေသည်
รออนุมัติลา|Pending leave|待审批请假|ခွင့် အတည်ပြုရန် စောင့်နေသည်
ล้างการเลือก|Clear selection|清除选择|ရွေးထားသည်များ ရှင်းရန်
รายละเอียดการลงเวลา|Attendance details|打卡详情|အလုပ်ချိန် အသေးစိတ်
สาย|Late|迟到|နောက်ကျ
ทำงาน|Worked|工作|အလုပ်လုပ်
บทบาท|Role|角色|အခန်းကဏ္ဍ
เจ้าของกิจการ|Business owner|企业所有者|လုပ်ငန်းပိုင်ရှင်
ลงทะเบียนแล้ว|Enrolled|已登记|စာရင်းသွင်းပြီး
ยังไม่พร้อมใช้งาน|Unavailable|不可用|သုံး၍ မရသေးပါ
ค้นหา|Search|搜索|ရှာဖွေရန်
ยังไม่มีคำขอลา|No leave requests yet|暂无请假申请|ခွင့်တောင်းဆိုချက် မရှိသေးပါ
เลือกประเภท|Select type|选择类型|အမျိုးအစား ရွေးရန်
วันเริ่ม|Start date|开始日期|စတင်ရက်
วันสิ้นสุด|End date|结束日期|ပြီးဆုံးရက်
จำนวนวัน|Number of days|天数|ရက် အရေအတွက်
ข้อมูลพนักงานทั้งหมด|All employees|全部员工资料|ဝန်ထမ်းဒေတာ အားလုံး
หน้านี้สำหรับพนักงานและหัวหน้าแผนก|For employees and department managers|仅供员工和部门主管使用|ဝန်ထမ်းနှင့် ဌာနမှူးများ အတွက်
สแกนเข้า → ออก → เข้า → ออก ได้หลายรอบในวันเดียว ตลอด 24 ชั่วโมง|You can clock in and out multiple times per day, 24 hours a day|全天可多次签到和签退|တစ်နေ့လျှင် အကြိမ်များစွာ ဝင်ထွက်မှတ်နိုင်သည်
สแกนไม่สำเร็จ? ยื่นคำขอลงเวลา|Scan failed? Submit a manual attendance request|扫描失败？提交补卡申请|စကင် မအောင်မြင်ပါသလား။ အလုပ်ချိန်တောင်းဆိုချက် ပို့ပါ
ส่งให้หัวหน้าพิจารณา|Send to manager for approval|提交主管审批|ဌာနမှူးထံ အတည်ပြုရန် ပို့ပါ
สวัสดี|Hello|您好|မင်္ဂလာပါ
ลงเวลาเข้า–ออก|Clock in or out|上下班打卡|အလုပ်ဝင်ထွက် မှတ်ရန်
ไปหน้าสแกนใบหน้า|Go to face scan|前往人脸扫描|မျက်နှာစကင်သို့ သွားရန်
คำขอลาล่าสุด|Recent leave requests|最新请假申请|နောက်ဆုံး ခွင့်တောင်းဆိုချက်များ
เดือน|Month|月份|လ
รวม (ชม.)|Total (hr)|合计（小时）|စုစုပေါင်း (နာရီ)
รวมช่วงวันที่|Date range total|日期范围合计|ရက်အပိုင်းအခြား စုစုပေါင်း
ดูสรุปเวลาทำงานและวันหยุด|View work hours and days off|查看工时和休息日汇总|အလုပ်ချိန်နှင့် နားရက် အနှစ်ချုပ် ကြည့်ရန်
เวลาทำงานสุทธิ (หักพัก)|Net work hours (excluding breaks)|净工时（扣除休息）|အသားတင် အလုပ်ချိန် (နားချိန်မပါ)
วันหยุดประจำ/ที่ขอ|Scheduled / requested days off|固定 / 申请休息日|စီစဉ်ထားသော / တောင်းဆိုထားသော နားရက်
วันหยุดนักขัตฤกษ์|Public holidays|法定节假日|အစိုးရရုံးပိတ်ရက်
ทำงานในวันหยุดประจำ/ที่ขอ|Worked on scheduled / requested days off|固定 / 申请休息日工作|စီစဉ် / တောင်းဆိုထားသော နားရက်တွင် အလုပ်လုပ်
ทำงานวันหยุดนักขัตฤกษ์|Worked on public holidays|节假日工作|အစိုးရရုံးပိတ်ရက်တွင် အလုပ်လုပ်
วันที่ทำงานในวันหยุดรวม|Total days worked on days off|休息日工作天数合计|နားရက်တွင် အလုပ်လုပ်ရက် စုစုပေါင်း
ไม่มีคำขอลารออนุมัติ|No pending leave requests|没有待审批的请假申请|အတည်ပြုရန် ခွင့်တောင်းဆိုချက် မရှိပါ
แสดงประวัติ|Show history|显示记录|မှတ်တမ်း ပြရန်
เฉพาะของฉัน|Mine only|仅我的记录|ကျွန်ုပ်၏ မှတ်တမ်းသာ
ทั้งหมดที่ Admin อนุญาต|All records allowed by admin|管理员允许查看的全部记录|စီမံသူ ခွင့်ပြုသမျှ မှတ်တမ်း
ทำงาน (ชม.)|Worked (hr)|工时（小时）|အလုပ်လုပ်ချိန် (နာရီ)
รวม OT (ชม.)|Total overtime (hr)|加班合计（小时）|အချိန်ပို စုစုပေါင်း (နာရီ)
จัดการ|Manage|管理|စီမံရန်
หยุด|Day off|休息|နားရက်
ลา|Leave|请假|ခွင့်
ไม่พบรายการตามตัวกรอง · ล้างตัวกรองหรือเลือกช่วงวันที่อื่น|No matching records. Clear filters or change the dates|没有匹配记录。清除筛选或更改日期|ကိုက်ညီသော မှတ်တမ်း မရှိပါ။ စစ်ထုတ်ချက် ရှင်းပါ သို့မဟုတ် ရက် ပြောင်းပါ
ยังไม่มีคำขอวันหยุด|No days-off requests|暂无休息日申请|နားရက် တောင်းဆိုချက် မရှိသေးပါ
หมายเหตุการลงเวลา|Attendance notes|打卡备注|အလုပ်ချိန် မှတ်ချက်
บันทึกการแก้ไข|Save changes|保存修改|ပြောင်းလဲချက်များ သိမ်းရန်
ลบรายการลงเวลา|Delete attendance record|删除打卡记录|အလုပ်ချိန် မှတ်တမ်း ဖျက်ရန်
เปิดสแกนต่อเนื่อง 6 ชั่วโมงบนเครื่องที่บริษัทดูแล|Enable continuous scanning for 6 hours on a managed device|在公司管理的设备上启用 6 小时连续扫描|ကုမ္ပဏီ စီမံသောစက်တွင် ဆက်တိုက်စကင် ၆ နာရီ ဖွင့်ရန်
เปิดโหมดสแกนต่อเนื่องบนเครื่องนี้|Enable continuous scanning on this device|在此设备启用连续扫描|ဤစက်တွင် ဆက်တိုက်စကင် ဖွင့်ရန်
PIN เดิม|Current PIN|当前 PIN|လက်ရှိ PIN
PIN ใหม่ 6–12 หลัก|New PIN (6–12 digits)|新 PIN（6–12 位）|PIN အသစ် (6–12 လုံး)
ชื่อและโลโก้บริษัท|Company name and logo|公司名称和标志|ကုမ္ပဏီအမည်နှင့် လိုဂို
โลโก้บริษัท (ภาพ PNG/JPEG/WebP)|Company logo (PNG/JPEG/WebP)|公司标志（PNG/JPEG/WebP）|ကုမ္ပဏီ လိုဂို (PNG/JPEG/WebP)
ลบโลโก้ปัจจุบัน|Remove current logo|删除当前标志|လက်ရှိ လိုဂို ဖယ်ရှားရန်
บันทึกชื่อและโลโก้|Save name and logo|保存名称和标志|အမည်နှင့် လိုဂို သိမ်းရန်
รัศมีที่อนุญาต (กม.)|Allowed radius (km)|允许半径（公里）|ခွင့်ပြု အချင်းဝက် (ကီလိုမီတာ)
บังคับสแกนเฉพาะพื้นที่ทำงาน|Require scanning within the workplace|要求在工作区域内扫描|အလုပ်နေရာအတွင်းသာ စကင်ဖတ်ရန်
บันทึกข้อมูลพนักงาน|Save employee|保存员工资料|ဝန်ထမ်းဒေတာ သိမ်းရန်
ประวัติลงเวลาล่าสุด|Recent attendance|最新考勤记录|နောက်ဆုံး အလုပ်ချိန်မှတ်တမ်း
ยังไม่มีประวัติ|No history yet|暂无记录|မှတ်တမ်း မရှိသေးပါ
เลือกพนักงานแล้วเปิดกล้อง|Select an employee and open the camera|选择员工并打开摄像头|ဝန်ထမ်းရွေးပြီး ကင်မရာ ဖွင့်ပါ
สแกนและลงทะเบียน|Scan and enroll|扫描并登记|စကင်ဖတ်ပြီး စာရင်းသွင်းရန်
ลบใบหน้าที่ลงทะเบียน|Remove enrolled face|删除已登记人脸|စာရင်းသွင်းထားသော မျက်နှာ ဖယ်ရှားရန်
เพิ่มประเภท|Add leave type|添加请假类型|ခွင့်အမျိုးအစား ထည့်ရန်
รหัสประเภทลา|Leave type ID|请假类型编号|ခွင့်အမျိုးအစား နံပါတ်
ชื่อประเภทลา|Leave type name|请假类型名称|ခွင့်အမျိုးအစား အမည်
จำนวนวันต่อปี|Days per year|每年天数|တစ်နှစ်လျှင် ရက်
ได้รับค่าจ้าง|Paid|带薪|လစာ ရသည်
ไม่รับค่าจ้าง|Unpaid|无薪|လစာ မရပါ
วันหมดอายุ (ถ้ามี)|Expiration date (if any)|到期日（如有）|သက်တမ်းကုန်ရက် (ရှိလျှင်)
แผนกและวันหยุดประจำ|Departments and regular days off|部门与固定休息日|ဌာနနှင့် ပုံမှန် နားရက်
ชื่อแผนก|Department name|部门名称|ဌာနအမည်
วันหยุดประจำ|Regular days off|固定休息日|ပုံမှန် နားရက်
ลบแผนก|Delete department|删除部门|ဌာန ဖျက်ရန်
รหัสแผนก|Department ID|部门编号|ဌာနနံပါတ်
ปฏิเสธ|Reject|拒绝|ငြင်းပယ်ရန်
ไม่มีคำขอรอพิจารณา|No requests awaiting review|没有待处理申请|စစ်ဆေးရန် တောင်းဆိုချက် မရှိပါ
PIN ชั่วคราว|Temporary PIN|临时 PIN|ယာယီ PIN
จด PIN นี้ให้พนักงานก่อนปิดหน้าจอ|Give this PIN to the employee before closing|关闭前请将此 PIN 提供给员工|မပိတ်မီ ဤ PIN ကို ဝန်ထမ်းထံ ပေးပါ
รีเซ็ต PIN|Reset PIN|重置 PIN|PIN ပြန်သတ်မှတ်ရန်
ลบ|Delete|删除|ဖျက်ရန်
ไม่พบพนักงานตามตัวกรอง|No matching employees|没有匹配的员工|ကိုက်ညီသော ဝန်ထမ်း မရှိပါ
เพิ่มพนักงานใหม่|Add new employee|添加新员工|ဝန်ထမ်းအသစ် ထည့်ရန်
ค่าพื้นฐาน OT|Overtime defaults|加班默认设置|အချိန်ပို မူလသတ်မှတ်ချက်
ชั่วโมงทำงานมาตรฐาน|Standard work hours|标准工时|ပုံမှန် အလုပ်ချိန်
ผ่อนผันก่อนนับว่าสาย (นาที)|Late grace period (min)|迟到宽限（分钟）|နောက်ကျ ခွင့်ပြုချိန် (မိနစ်)
การปัดเศษ OT|Overtime rounding|加班取整|အချိန်ပို ကိန်းပြည့်ချိန်ညှိမှု
คำนวณตามเวลาจริง|Use actual duration|按实际时间计算|အမှန်တကယ်ကြာချိန် သုံးရန်
ปัดลงทุก 30 นาที|Round down to 30 minutes|向下取整到 30 分钟|မိနစ် ၃၀ အလိုက် အောက်သို့ ချရန်
การมองเห็นประวัติพนักงาน|Employee history visibility|员工记录可见性|ဝန်ထမ်းမှတ်တမ်း မြင်နိုင်မှု
พนักงานเห็นข้อมูลตนเอง|Employees see their own data|员工仅查看自己的数据|ဝန်ထမ်းများ မိမိဒေတာသာ မြင်နိုင်သည်
เปิดข้อมูลพนักงานที่เลือกให้ทุกคน|Share selected employees' records|公开所选员工的记录|ရွေးထားသော ဝန်ထမ်းမှတ်တမ်းများ မျှဝေရန်
รหัสพนักงานที่เปิดให้เห็น (คั่นด้วยจุลภาค)|Visible employee IDs (comma-separated)|可见员工编号（逗号分隔）|မြင်နိုင်သော ဝန်ထမ်းနံပါတ်များ (ကော်မာဖြင့် ခွဲပါ)
ตรวจรายการลงเวลาและคำขอลา|Review attendance and leave requests|审批考勤与请假申请|အလုပ်ချိန်နှင့် ခွင့်တောင်းဆိုချက်များ စစ်ဆေးရန်
ค้นหาและจัดการข้อมูลพนักงาน|Find and manage employee data|搜索和管理员工资料|ဝန်ထမ်းဒေတာ ရှာဖွေ စီမံရန်
ค้นหาช่วงวันที่และส่งออก|Search date ranges and export|按日期查询并导出|ရက်အပိုင်းအခြား ရှာပြီး ထုတ်ယူရန်
วันทำงาน วันหยุด และวันลา|Workdays, days off, and leave|工作日、休息日及请假|အလုပ်ရက်၊ နားရက်နှင့် ခွင့်
ทะเบียนใบหน้า|Face enrollment|人脸登记|မျက်နှာ စာရင်းသွင်းမှု
ลงทะเบียนและตรวจสถานะ|Enroll and check status|登记并查看状态|စာရင်းသွင်းပြီး အခြေအနေ စစ်ရန်
แผนกและนโยบาย|Departments and policies|部门与政策|ဌာနနှင့် မူဝါဒများ
กะ แผนก วันลา และ OT|Shifts, departments, leave, and overtime|班次、部门、请假及加班|အလှည့်၊ ဌာန၊ ခွင့်နှင့် အချိန်ပို
เครื่องสแกน|Scanner|扫描设备|စကင်စက်
คิวลงเวลาและโหมดส่วนกลาง|Attendance queue and shared mode|打卡队列及共享模式|အလုပ်ချိန်တန်းစီစာရင်းနှင့် အများသုံးစနစ်
บัญชีและบริษัท|Account and company|账户与公司|အကောင့်နှင့် ကုမ္ပဏီ
PIN โลโก้ และข้อมูลบริษัท|PIN, logo, and company details|PIN、标志及公司资料|PIN၊ လိုဂိုနှင့် ကုမ္ပဏီအချက်အလက်
บันทึกเวลาเข้า–ออก|Record clock-in and clock-out|记录上下班时间|အလုပ်ဝင်ထွက်ချိန် မှတ်ရန်
สรุป OT|Overtime summary|加班汇总|အချိန်ပို အနှစ်ချုပ်
รายเดือนและช่วงวันที่ที่ต้องการ|By month or selected dates|按月份或指定日期|လအလိုက် သို့မဟုတ် ရွေးထားသည့်ရက်အလိုက်
ประวัติของฉัน|My history|我的记录|ကျွန်ုပ်၏ မှတ်တမ်း
ดูเวลาและสถานะรายการ|View times and record status|查看时间和记录状态|အချိန်နှင့် မှတ်တမ်းအခြေအနေ ကြည့်ရန်
ติดตามและแก้ไขคำขอ|Track and edit requests|跟踪并编辑申请|တောင်းဆိုချက်များ ကြည့်ရှု ပြင်ဆင်ရန်
จัดการ PIN|Manage PIN|管理 PIN|PIN စီမံရန်
ยื่นคำขอและอนุมัติได้ด้วยตนเอง|Submit and approve your own request|提交并审批自己的申请|မိမိတောင်းဆိုချက်ကို ပို့ပြီး အတည်ပြုရန်
ดูยอดรายเดือนและช่วงวันที่|View totals by month or date range|查看按月或日期范围汇总|လ သို့မဟုတ် ရက်အပိုင်းအခြားအလိုက် စုစုပေါင်း ကြည့်ရန်
ยกเลิกแล้ว กรุณานำใบหน้าออกจากกรอบก่อนสแกนใหม่|Cancelled. Move out of the frame before scanning again|已取消。请移出画面后重新扫描|ပယ်ဖျက်ပြီးပါပြီ။ ပြန်စကင်မဖတ်မီ ဘောင်အပြင်သို့ ရွှေ့ပါ`;
  const additional=`ใช่คุณหรือไม่? ระบบจะบันทึกเวลาเมื่อกดยืนยันเท่านั้น|Is this your record? Select Confirm to save it|这是您的记录吗？点击确认后保存|ဤမှတ်တမ်းက သင့်အတွက်လား။ သိမ်းရန် အတည်ပြုပါ
เปิดสแกนใบหน้า|Enable face scan|启用人脸扫描|မျက်နှာစကင် ဖွင့်ရန်
ทุกสถานะใบหน้า|All face enrollment statuses|所有人脸登记状态|မျက်နှာ စာရင်းသွင်းမှု အခြေအနေ အားလုံး
โหมดดูข้อมูลเท่านั้น · ระบบปิดใช้งานหรือนอกช่วงที่กำหนดโดย Developer|Read-only. Access is disabled or outside the configured hours|只读。系统已停用或不在设定时间内|ဖတ်ရှုရန်သာ။ အသုံးပြုခွင့် ပိတ်ထားသည် သို့မဟုတ် သတ်မှတ်ချိန် ပြင်ပဖြစ်သည်
คำขอยังไม่เป็นเวลาที่อนุมัติจนกว่าจะพิจารณา หากสแกนไม่สำเร็จซ้ำ โปรดติดต่อ Admin เพื่อลงทะเบียนใบหน้าใหม่|Requests need approval. If scans keep failing, ask an admin to re-enroll your face|申请需经审批。若扫描反复失败，请联系管理员重新录入人脸|တောင်းဆိုချက်များကို အတည်ပြုရမည်။ စကင် ဆက်တိုက် မအောင်မြင်ပါက မျက်နှာ ပြန်သွင်းရန် စီမံသူကို ဆက်သွယ်ပါ
เลือกได้ครั้งละไม่เกิน 366 วัน · รวมรายการรออนุมัติและอนุมัติ แยกยอดให้ตรวจสอบ ไม่รวมรายการไม่อนุมัติ|Up to 366 days. Pending and approved totals are shown separately|最多 366 天，待审批与已批准的合计分开显示|အများဆုံး ၃၆၆ ရက်။ စောင့်နေသောနှင့် အတည်ပြုပြီး အရေအတွက် သီးသန့်ပြသည်
เลือกเดือนหรือช่วงวันที่ แล้วกดสรุปเพื่อดู OT ของคุณ|Choose a month or date range to view your overtime|请选择月份或日期范围查看加班|အချိန်ပို ကြည့်ရန် လ သို့မဟုတ် ရက်အပိုင်းအခြား ရွေးပါ
อนุมัติคำขอลาของฉัน|Approve my leave request|批准我的请假申请|ကျွန်ုပ်၏ ခွင့်တောင်းဆိုချက် အတည်ပြုရန်
เลือกอนุมัติได้เฉพาะรายการรออนุมัติที่ลงเวลาออกแล้ว และไม่ใช่รายการของตนเอง|You can approve other employees' pending records after they clock out|可审批其他员工已签退的待审批记录|အခြားဝန်ထမ်းများ အလုပ်ထွက်ချိန် မှတ်ပြီးမှ အတည်ပြုနိုင်သည်
แสดงวันที่มาทำงาน วันหยุดและวันลาที่อนุมัติแล้ว|Shows workdays, days off, and approved leave|显示出勤、休息日和已批准请假|အလုပ်ရက်၊ နားရက်နှင့် အတည်ပြုထားသော ခွင့်ရက်များ ပြသည်
คำขอของพนักงานต้องรอหัวหน้าอนุมัติ|Employee requests require manager approval|员工申请需主管审批|ဝန်ထမ်း တောင်းဆိုချက်များကို ဌာနမှူး အတည်ပြုရမည်
คำนวณ OT 1.5x อัตโนมัติ (แก้ช่อง OT 1.5x เพื่อใช้ค่าที่กำหนดเอง)|Calculate 1.5× overtime automatically. Edit the 1.5× field to override|自动计算 1.5 倍加班，可编辑对应字段手动调整|၁.၅ ဆ အချိန်ပို အလိုအလျောက် တွက်ရန်။ တန်ဖိုးပြောင်းရန် ၁.၅ ဆ အကွက်ကို ပြင်ပါ
ข้อมูลลา วันหยุด และวันหยุดบริษัทแสดงจากรายการต้นทาง หลังแก้เวลา ระบบคำนวณชั่วโมงทำงานและรวม OT ใหม่ แล้วส่งรายการกลับไปรออนุมัติ|Leave and holidays come from their original records. Editing time recalculates work and overtime and returns the record to approval|请假和休息日来自原始记录。修改时间会重算工时和加班，并重新提交审批|ခွင့်နှင့် နားရက်များကို မူလမှတ်တမ်းမှ ယူသည်။ အချိန်ပြင်လျှင် အလုပ်ချိန်နှင့် အချိန်ပို ပြန်တွက်ပြီး အတည်ပြုရန် ပြန်ပို့သည်
โลโก้จะถูกย่อและเก็บในชีต Config เพื่อแสดงเหมือนกันทุกเครื่อง|The logo is resized and stored in Config for display on all devices|标志会缩小并保存在 Config 中，以便所有设备显示|စက်အားလုံးတွင် ပြရန် လိုဂိုကို သေးအောင်လုပ်ပြီး Config တွင် သိမ်းသည်
เมื่อเปิดตรวจโลเคชัน ระบบจะปฏิเสธการลงเวลานอกพื้นที่|When location checks are enabled, clock-ins and clock-outs must be within the workplace|启用位置校验时，只能在工作区域内打卡|တည်နေရာစစ်ဆေးမှု ဖွင့်ထားလျှင် အလုပ်နေရာအတွင်းသာ ဝင်ထွက်မှတ်နိုင်သည်
ปิดเพื่อให้พนักงานสแกนจากทุกที่ได้|Turn off to allow scanning from any location|关闭后允许在任意位置扫描|မည်သည့်နေရာမှမဆို စကင်ဖတ်နိုင်ရန် ပိတ်ပါ
บัญชีนี้เปิดดูได้ แต่แก้บทบาท Admin ต้องใช้บัญชีเจ้าของธุรกิจ|You can view this account. Only the owner can change admin roles|可查看此账户。仅所有者可修改管理员角色|အကောင့်ကို ကြည့်နိုင်သည်။ စီမံသူ အခန်းကဏ္ဍကို ပိုင်ရှင်သာ ပြောင်းနိုင်သည်
ลงทะเบียนใบหน้าพนักงาน|Enroll employee face|录入员工人脸|ဝန်ထမ်းမျက်နှာ စာရင်းသွင်းရန်
เลือกพนักงาน|Select employee|选择员工|ဝန်ထမ်း ရွေးရန်
สแกนใบหน้าพนักงานที่เลือกเพียงคนเดียว เวกเตอร์ใบหน้าเก็บในชีต FaceTemplates และไม่เก็บภาพถ่าย|Scan only the selected employee. FaceTemplates stores face vectors|仅扫描所选员工，FaceTemplates 存储人脸向量|ရွေးထားသော ဝန်ထမ်းတစ်ဦးသာ စကင်ဖတ်ပါ။ မျက်နှာဗက်တာများကို FaceTemplates တွင် သိမ်းသည်
ปิดใช้งาน|Inactive|已停用|ပိတ်ထားသည်
บันทึกประเภทการลา|Save leave type|保存请假类型|ခွင့်အမျိုးအစား သိမ်းရန်
เมื่อประเภทลามีคำขอแล้ว ระบบจะไม่ให้เปลี่ยนชื่อ เพื่อรักษาประวัติและยอดสิทธิ์เดิม|Leave type names are locked after the first request to preserve history and balances|请假类型一旦有申请，名称将锁定以保留历史和余额|ပထမဆုံး တောင်းဆိုချက် ရှိပြီးနောက် မှတ်တမ်းနှင့် ခွင့်လက်ကျန် ထိန်းထားရန် ခွင့်အမျိုးအစားအမည် ပြောင်း၍ မရပါ
เพิ่มแผนก|Add department|添加部门|ဌာန ထည့်ရန်
Office เริ่มต้นหยุดเสาร์และอาทิตย์; Warehouse ตั้งวันหยุดได้ตามตารางหน้างาน ย้ายพนักงานก่อนปิดแผนก และลบได้เมื่อไม่มีประวัติใช้งานเท่านั้น|Office defaults to weekends off. Warehouse follows the site schedule. Move employees before deactivating a department|办公室默认周末休息，仓库按现场排班。停用部门前请转移员工|ရုံးတွင် စနေ၊ တနင်္ဂနွေ နားသည်။ ဂိုဒေါင်တွင် လုပ်ငန်းဇယားအတိုင်း ဖြစ်သည်။ ဌာန မပိတ်မီ ဝန်ထမ်းများ ရွှေ့ပါ
ระบบลง OT 1.5x หลังเวลาเลิกกะ OWNER/Admin แก้ OT แต่ละประเภทพร้อมเหตุผลได้ในรายการลงเวลา|1.5× overtime starts after the shift. Owner and admin can adjust overtime with a reason|班次结束后开始计算 1.5 倍加班。所有者或管理员可填写原因后调整|အလှည့်ပြီးလျှင် ၁.၅ ဆ အချိန်ပို စတင်သည်။ ပိုင်ရှင်နှင့် စီမံသူက အကြောင်းပြချက်ဖြင့် ပြင်နိုင်သည်
กำลังตรวจตำแหน่งที่ทำงาน…|Checking workplace location…|正在检查工作地点…|အလုပ်နေရာ စစ်ဆေးနေသည်…
ยังไม่ได้เปิดกล้อง|Camera is closed|摄像头尚未打开|ကင်မရာ ပိတ်ထားသည်
รายการเดิมยังไม่ได้รับการยืนยัน · ส่งซ้ำรายการเดิม|Previous record is unconfirmed. Retry or reset it|上次记录尚未确认。请重试或重置|ယခင်မှတ်တမ်း အတည်မပြုရသေးပါ။ ပြန်ပို့ပါ သို့မဟုတ် ပြန်သတ်မှတ်ပါ
มีรายการลงเวลาที่ยังไม่ได้รับการยืนยัน|Unconfirmed attendance record|有未确认的打卡记录|အတည်မပြုရသေးသော အလုပ်ချိန်မှတ်တမ်း
ยกเลิกแล้ว กำลังสแกนใหม่|Cancelled. Scanning again|已取消，正在重新扫描|ပယ်ဖျက်ပြီး ပြန်စကင်ဖတ်နေသည်
ยืนยันสำรองและลบข้อมูลที่เลือก?|Back up and delete the selected data?|确认备份并删除所选数据？|ရွေးထားသောဒေတာကို အရန်ကူးပြီး ဖျက်မည်လား။
ยืนยันนำเข้าข้อมูลจากไฟล์สำรอง?|Import data from this backup?|确认从此备份导入数据？|ဤအရန်ဖိုင်မှ ဒေတာ သွင်းမည်လား။
ข้อมูลเปลี่ยนแล้ว กรุณาตรวจตัวอย่างใหม่|Data changed. Preview it again|数据已更改，请重新预览|ဒေတာပြောင်းသွားသည်။ အစမ်းပြန်ကြည့်ပါ
ดำเนินการสำเร็จ|Done|操作成功|လုပ်ဆောင်ပြီး
ยืนยันลบกะนี้?|Delete this shift?|确认删除此班次？|ဤအလှည့်ကို ဖျက်မည်လား။
ทุกบทบาท|All roles|所有角色|အခန်းကဏ္ဍ အားလုံး
ยังไม่ลงทะเบียน|Not enrolled|未登记|စာရင်းမသွင်းရသေးပါ
ลาพักร้อน|Annual leave|年假|နှစ်ပတ်လည် ခွင့်
ลาป่วย|Sick leave|病假|ဖျားနာခွင့်
ลากิจ|Personal leave|事假|ကိုယ်ရေးကိုယ်တာ ခွင့်
กรุณาอัปเดต Apps Script เป็นรุ่น 5.4.2.5 ก่อนสแกน|Update Apps Script to 5.4.2.5 before scanning|扫描前请将 Apps Script 更新至 5.4.2.5|စကင်မဖတ်မီ Apps Script ကို 5.4.2.5 သို့ အပ်ဒိတ်လုပ်ပါ
กรุณาอัปเดต Apps Script เป็นรุ่น 5.4.2.5|Update Apps Script to 5.4.2.5|请将 Apps Script 更新至 5.4.2.5|Apps Script ကို 5.4.2.5 သို့ အပ်ဒိတ်လုပ်ပါ`;
  const lookup=new Map((catalog+'\n'+additional).split('\n').map(line=>{
    const [th,en,zh,my]=line.split('|');return [th,{en,zh,my}];
  }));
  const keys=[...lookup.keys()].sort((a,b)=>b.length-a.length);
  const escapeRegex=text=>text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const pattern=new RegExp('(?<![ก-๙])(?:'+keys.map(escapeRegex).join('|')+')(?![ก-๙])','g');
  function t(text){
    if(current==='th'||typeof text!=='string')return text;
    return text.replace(pattern,value=>lookup.get(value)[current]||value);
  }
  function set(language){
    if(!Object.hasOwn(languages,language))return;
    current=language;
    try{localStorage.setItem(key,language);document.documentElement.lang=language==='zh'?'zh-Hans':language;}catch{}
  }
  function select(){
    return `<label class="language-control" data-no-i18n><span class="sr-only">${t('ภาษา')}</span><select data-language aria-label="${t('ภาษา')}">${Object.entries(languages).map(([id,label])=>`<option value="${id}" ${id===current?'selected':''}>${label}</option>`).join('')}</select></label>`;
  }
  function localize(root){
    if(!root?.querySelectorAll||current==='th')return;
    const walker=document.createTreeWalker(root,4);
    for(let node=walker.nextNode();node;node=walker.nextNode()){
      if(node.parentElement?.closest('[data-no-i18n],script,style,textarea'))continue;
      node.nodeValue=t(node.nodeValue);
    }
    root.querySelectorAll('[title],[aria-label],[placeholder]').forEach(element=>{
      if(element.closest('[data-no-i18n]'))return;
      ['title','aria-label','placeholder'].forEach(attribute=>{
        if(element.hasAttribute(attribute))element.setAttribute(attribute,t(element.getAttribute(attribute)));
      });
    });
  }
  return {t,set,select,localize,get:()=>current};
})();
