import { FormInput, FormSelect } from '../formfunction'

//ส่วนของฟอร์มการศึกษา
export default function EducationStep({ form, errors, onChange }:{ form:any, errors:any, onChange:(field:string,value:string)=>void }){
  return (
    <div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
        label="รหัสนักศึกษา (ถ้ามี)" 
        placeholder="กรอกรหัสนักศึกษา" 
        value={form.studentId} 
        onChange={(v)=>onChange('studentId', v)} 
        error={errors.studentId} />

        <FormInput 
        label="หลักสูตร/สาขา" 
        placeholder="กรอกหลักสูตรหรือสาขา" 
        value={form.program} 
        onChange={(v)=>onChange('program', v)} 
        error={errors.program} />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <FormInput 
        label="ปีที่สำเร็จการศึกษา หรือ ปีที่จบ" 
        placeholder="ปีที่สำเร็จ" 
        value={form.gradYear} 
        onChange={(v)=>onChange('gradYear', v)} 
        error={errors.gradYear} />
        
        <FormSelect 
        label="เขตพื้นที่" 
        options={["ส่วนกลาง เชียงใหม่", "ส่วนกลาง กรุงเทพ"]} 
        value={form.campus} 
        onChange={(v)=>onChange('campus', v)} 
        error={errors.campus} />
      </div>


    </div>
  )
}
