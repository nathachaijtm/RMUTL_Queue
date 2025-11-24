import { FormsummaryItem } from "../formfunction";

// Component สำหรับสรุปข้อมูลในขั้นตอนสุดท้าย
export default function SummaryStep({ form }:{ form:any }){
  return (
    <div className="text-sm">


      <h3 className="font-medium mb-3 text-gray-700">สรุปข้อมูล</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <FormsummaryItem 
          label="คำนำหน้า" 
          value={form.prefix} />

          <FormsummaryItem 
          label="ชื่อ (ไทย)" 
          value={form.firstNameTh} />

          <FormsummaryItem 
          label="นามสกุล (ไทย)" 
          value={form.lastNameTh} />
          
          <FormsummaryItem 
          label="ชื่อ (อังกฤษ)" 
          value={form.firstNameEn} />

          <FormsummaryItem 
          label="นามสกุล (อังกฤษ)" 
          value={form.lastNameEn} />

          <FormsummaryItem 
          label="เลขบัตรประชาชน" 
          value={form.idNumber} />

          <FormsummaryItem 
          label="วันเกิด" 
          value={form.dob} />
        </div>

        <div>
          <FormsummaryItem 
          label="รหัสนักศึกษา" 
          value={form.studentId} />

          <FormsummaryItem 
          label="หลักสูตร/สาขา" 
          value={form.program} />

          <FormsummaryItem 
          label="ปีที่จบ" 
          value={form.gradYear} />

          <FormsummaryItem 
          label="เขตพื้นที่" 
          value={form.campus} />

          <FormsummaryItem 
          label="ที่อยู่" 
          value={form.addressLine1} />

          <FormsummaryItem 
          label="เบอร์ติดต่อ" 
          value={form.contactPhone} />

          <FormsummaryItem 
          label="อีเมล์" 
          value={form.email} />
        </div>
      </div>


    </div>
  )
}
