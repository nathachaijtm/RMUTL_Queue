import { FormInput, FormSelect } from '../formfunction'


//ส่วนของฟอร์มข้อมูลส่วนตัว
export default function PersonalStep({ form, errors, onChange }:{ form:any, errors:any, onChange:(field:string,value:string)=>void }){
  return (
    <div>


      <FormSelect 
      label="คำนำหน้าชื่อ" 
      options={["นาย", "นางสาว", "นาง"]} 
      value={form.prefix} 
      onChange={(v)=>onChange('prefix', v)} 
      error={errors.prefix} />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <FormInput 
        label="ชื่อ ภาษาไทย" 
        placeholder="กรอกชื่อภาษาไทย" 
        value={form.firstNameTh} 
        onChange={(v)=>onChange('firstNameTh', v)} 
        error={errors.firstNameTh} />

        <FormInput 
        label="นามสกุล ภาษาไทย" 
        placeholder="กรอกนามสกุลภาษาไทย" 
        value={form.lastNameTh} 
        onChange={(v)=>onChange('lastNameTh', v)} 
        error={errors.lastNameTh} />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <FormInput 
        label="ชื่อ ภาษาอังกฤษ" 
        placeholder="กรอกชื่อภาษาอังกฤษ" 
        value={form.firstNameEn} 
        onChange={(v)=>onChange('firstNameEn', v)} 
        error={errors.firstNameEn} />
        <FormInput 
        label="นามสกุล ภาษาอังกฤษ" 
        placeholder="กรอกนามสกุลภาษาอังกฤษ" 
        value={form.lastNameEn} 
        onChange={(v)=>onChange('lastNameEn', v)} 
        error={errors.lastNameEn} />
      </div>


      <div className="mt-2">
        <FormInput
          label="เลขบัตรประชาชน"
          placeholder="กรอกเลขบัตรประชาชน"
          value={form.idNumber}
          onChange={(v) => {
            const numericValue = v.replace(/\D/g, "");
            onChange("idNumber", numericValue.slice(0, 13));
          }}
          error={form.idNumber.length > 0 && form.idNumber.length < 13 ? "กรุณากรอกเลขบัตรประชาชนครบ 13 ตัว" : errors.idNumber}
        />
      </div>


      <div className="mt-2">
        <FormInput 
        label="วันเดือนปีเกิด" 
        type="date" 
        value={form.dob} 
        onChange={(v)=>onChange('dob', v)} 
        error={errors.dob} />
      </div>


    </div>
  )
}
