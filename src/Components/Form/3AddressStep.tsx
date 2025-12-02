import { FormInput } from '../formfunction'

//ส่วนของฟอร์มที่อยู่
export default function AddressStep({ form, errors, onChange }:{ form:any, errors:any, onChange:(field:string,value:string)=>void }){
  return (
    <div>


      <FormInput 
      label="ที่อยู่ (สำหรับจัดส่งเอกสาร)" 
      placeholder="กรอกที่อยู่" 
      required={true}
      value={form.addressLine1} 
      onChange={(v)=>onChange('addressLine1', v)} 
      error={errors.addressLine1} />
      
      <div className="mt-2">
        <FormInput 
        label="ที่อยู่ (เพิ่มเติม)" 
        placeholder="บรรทัดที่ 2" 
        value={form.addressLine2} 
        onChange={(v)=>onChange('addressLine2', v)} 
        error={errors.addressLine2}/>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <FormInput 
        label="เบอร์ติดต่อ" 
        required={true}
        placeholder="กรอกเบอร์โทร" 
        value={form.contactPhone} 
        onChange={(v)=>onChange('contactPhone', v)} 
        error={errors.contactPhone} />

        <FormInput 
        label="อีเมล์ติดต่อ" 
        placeholder="กรอกอีเมล์" 
        value={form.email} 
        onChange={(v)=>onChange('email', v)} 
        error={errors.email} />
      </div>


    </div>
  )
}
