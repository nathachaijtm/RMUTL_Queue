import { FormsummaryItem } from "../formfunction";

// Component สำหรับสรุปข้อมูลในขั้นตอนสุดท้าย
export default function SummaryStep({ form, formatIdNumber, formatPhoneNumber }:{
  form:any,
  formatIdNumber:(s:string)=>string,
  formatPhoneNumber:(s:string)=>string
}){
  return (
    <div className="text-sm space-y-6">
      
      {/* กลุ่มข้อมูลส่วนบุคคล */}
      <div>
{/* ข้อมูลส่วนตัว */}
        <h3 className="text-lg font-semibold mb-3 text-gray-900">ข้อมูลส่วนตัว</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <FormsummaryItem 
              label="คำนำหน้า" 
              required 
              value={form.prefix} 
            />
          </div>
          <FormsummaryItem 
            label="ชื่อ (ไทย)" 
            required 
            value={form.firstNameTh} 
          />
          <FormsummaryItem 
            label="นามสกุล (ไทย)" 
            required 
            value={form.lastNameTh} 
          />

          {/* ชื่อ + นามสกุลอังกฤษ */}
          <FormsummaryItem 
            label="ชื่อ (อังกฤษ)" 
            required 
            value={form.firstNameEn} 
          />
          <FormsummaryItem 
            label="นามสกุล (อังกฤษ)" 
            required 
            value={form.lastNameEn} 
          />

          {/* ขยายให้เลขบัตร & วันเกิดอยู่แถวเดียวกัน */}
          <FormsummaryItem 
            label="เลขบัตรประชาชน" 
            required 
            value={formatIdNumber(form.idNumber)} 
          />
          <FormsummaryItem 
            label="วันเกิด" 
            required 
            value={form.dob} 
          />

        </div>
      </div>

      {/* กลุ่มข้อมูลการศึกษา */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">ข้อมูลการศึกษา</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

          <FormsummaryItem label="รหัสนักศึกษา" value={form.studentId} />
          <FormsummaryItem label="หลักสูตร/สาขา" value={form.program} />
          <FormsummaryItem label="ปีที่จบ" value={form.gradYear} />
          <FormsummaryItem label="เขตพื้นที่" value={form.campus} />

        </div>
      </div>

      {/* กลุ่มข้อมูลการติดต่อ */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">ข้อมูลติดต่อ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

          <FormsummaryItem label="ที่อยู่" required value={form.addressLine1} />
          <FormsummaryItem label="เบอร์ติดต่อ" required value={formatPhoneNumber(form.contactPhone)} />
          <FormsummaryItem label="อีเมล์" value={form.email} />

        </div>
      </div>

    </div>
  )
}
