import { FormInput, FormSelect } from '../formfunction'

//ส่วนของฟอร์มข้อมูลส่วนตัว
export default function PersonalStep({ form, errors, onChange, formatIdNumber }:{ form:any, errors:any, onChange:(field:string,value:string)=>void, formatIdNumber:(s:string)=>string }){
  return (
    <div>


        <div className="w-full">
        <FormSelect 
        label="คำนำหน้าชื่อ" 
        required={true}
        options={["นาย", "นางสาว", "นาง"]} 
        value={form.prefix} 
        onChange={(v)=>onChange('prefix', v)} 
        error={errors.prefix}
        className="w-full"
        />
        </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <FormInput 
        label="ชื่อ ภาษาไทย" 
        required={true}
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
        required={true}
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
          required={true}
          placeholder="กรอกเลขบัตรประชาชน"
          value={formatIdNumber(form.idNumber)}
          onChange={(v) => {
            const numericValue = v.replace(/\D/g, "").slice(0, 13);
            onChange("idNumber", numericValue);
          }}
          error={form.idNumber.length > 0 && form.idNumber.length < 13 ? "กรุณากรอกเลขบัตรประชาชนครบ 13 ตัว" : errors.idNumber}
        />
      </div>


      <div className="mt-2">
        <FormInput 
        label="วันเดือนปีเกิด" 
        required={true}
        type="date" 
        value={form.dob} 
        onChange={(v)=>onChange('dob', v)} 
        error={errors.dob} />
      </div>


    </div>
  )
}
