import { FormInput } from '../formfunction'

//ส่วนของฟอร์มที่อยู่
export default function AddressStep({ form, errors, onChange, formatPhoneNumber }:{ form:any, errors:any, onChange:(field:string,value:string)=>void, formatPhoneNumber:(s:string)=>string }){
  return (
    <div>


      <FormInput 
      label="ที่อยู่ (สำหรับจัดส่งเอกสาร)" 
      placeholder="บ้านเลขที่  11/1 หมู่บ้าน ซอย ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด รหัสไปรษณีย์" 
      required={true}
      value={form.addressLine1} 
      onChange={(v)=>onChange('addressLine1', v)} 
      error={errors.addressLine1} />
      
      <div className="mt-2">
        <FormInput 
        label="ที่อยู่ (เพิ่มเติม)" 
        placeholder="รายละเอียดที่อยู่เพิ่มเติม (ถ้ามี)" 
        value={form.addressLine2} 
        onChange={(v)=>onChange('addressLine2', v)} 
        error={errors.addressLine2}/>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <FormInput 
        label="เบอร์ติดต่อ" 
        required={true}
        placeholder="กรอกเบอร์โทร" 
        value={formatPhoneNumber(form.contactPhone)}
        onChange={(v)=>{
          const numericValue = v.replace(/\D/g, "").slice(0, 10);
          onChange('contactPhone', numericValue);
        }}
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
