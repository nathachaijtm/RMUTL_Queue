import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StepItem } from "../Components/formfunction";
import PersonalStep from "../Components/Form/1PersonalStep";
import EducationStep from "../Components/Form/2EducationStep";
import AddressStep from "../Components/Form/3AddressStep";
import SummaryStep from "../Components/Form/4SummaryStep";
import { FaUser, FaBook, FaHome, FaCheck } from 'react-icons/fa';
import LayoutBlack from "@/Components/LayoutBlack";

export const Route = createFileRoute("/register" as any)({
  component: RouteComponent,
});

function RouteComponent() {
  const [step, setStep] = useState(1)


  // ฟอร์มเก็บข้อมูลต่างๆ มี หน้าข้อมูลส่วนตัว, ข้อมูลการศึกษา, ข้อมูลที่อยู่, หน้าสรุป
  const initialForm = {

    // 1personal
    prefix: '',
    firstNameTh: '',
    lastNameTh: '',
    firstNameEn: '',
    lastNameEn: '',
    idNumber: '',
    dob: '',


    // 2education
    studentId: '',
    program: '',
    gradYear: '',
    campus: '',
    
    // 3address
    addressLine1: '',
    addressLine2: '',
    contactPhone: '',
    email: '',
  }


  const [form, setForm] = useState(initialForm as any)
  const [errors, setErrors] = useState<Record<string, string>>({})


  function handleChange(field: string, value: string) {
    setForm((prev: any) => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }


  function validateStep(s: number) {
    const newErrors: Record<string, string> = {}


    //ส่วนฟั่งชันตรวจสอบความถูกต้องของข้อมูลในแต่ละขั้นตอน
    // เช็ค 1personal
    if (s === 1) {
      if (!form.prefix) newErrors.prefix = 'กรุณาเลือกคำนำหน้า'
      if (!form.firstNameTh) newErrors.firstNameTh = 'กรุณากรอกชื่อ'
      if (!form.lastNameTh) newErrors.lastNameTh = 'กรุณากรอกนามสกุล'
      if (!form.firstNameEn) newErrors.firstNameEn = 'กรุณากรอกชื่อ'
      if (!form.lastNameEn) newErrors.lastNameEn = 'กรุณากรอกนามสกุล'
      if (!form.idNumber || form.idNumber.length !== 13) newErrors.idNumber = 'กรุณากรอกเลขบัตรประชาชนครบ 13 ตัว'
      if (!form.dob) newErrors.dob = 'กรุณาเลือกวันเดือนปีเกิด'
    }

    // เช็ค 2education
    if (s === 2) {
      if (!form.program) newErrors.program = 'กรุณากรอกหลักสูตร/สาขา'
      if (!form.gradYear) newErrors.gradYear = 'กรุณากรอกปีที่จบ'
      if (!form.campus) newErrors.campus = 'กรุณาเลือกเขตพื้นที่'
      if (!form.studentId) newErrors.studentId = 'กรุณากรอกรหัสนักศึกษา'
    }

    // เช็ค 3address
    if (s === 3) {
      if (!form.addressLine1) newErrors.addressLine1 = 'กรุณากรอกที่อยู่'
      if (!form.addressLine2) newErrors.addressLine2 = 'กรุณากรอกที่อยู่เพิ่มเติม'
      if (!form.contactPhone) newErrors.contactPhone = 'กรุณากรอกเบอร์ติดต่อ'
      if (!form.email) newErrors.email = 'กรุณากรอกอีเมล์ติดต่อ'
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ฟั่งชันขั้นตอนถัดไป
  function handleNext() {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4))
    }
  }

  // ฟั่งชันขั้นตอนย้อนกลับ
  function handleBack() {
    setStep(prev => Math.max(prev - 1, 1))
  }


  const [showPopup, setShowPopup] = useState(false)
  const [isAgree, setIsAgree] = useState(false)


  // ฟังก์ชันเมื่อกดยืนยันใน popup
  function confirmSubmit() {
    console.log('Form submitted:', form)
    setShowPopup(false)
    setIsAgree(false)
    setForm({ ...initialForm })
    setStep(1)
  }

  
  // ฟั่งชันขั้นตอนยืนยัน
  function handleSubmit() {
    const ok1 = validateStep(1)
    const ok2 = validateStep(2)
    const ok3 = validateStep(3)

    if (ok1 && ok2 && ok3) {
      setShowPopup(true)
    } else {
      if (!ok1) setStep(1)
      else if (!ok2) setStep(2)
      else if (!ok3) setStep(3)
    }
  }


  return (
    <LayoutBlack>
    <>

{/* popup */}
{showPopup && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white px-6 py-8 rounded-2xl w-[600px] max-h-[80vh] overflow-y-auto space-y-4 animate-fadeIn">
      <div className="text-lg font-bold text-gray-800">
        ข้อกำหนดในการลงทะเบียน
      </div>
      
      <div className="border border-gray-400 p-4 rounded-md">
        <p className="text-gray-600 text-sm whitespace-pre-line">
          1. ข้าพเจ้าได้ตรวจสอบแล้วและยืนยันว่าข้อมูลที่ข้าพเจ้ากรอกทั้งหมดเป็นข้อมูลที่ถูกต้อง
          {"\n"}2. ข้าพเจ้าจะนำเอกสารแสดงผลการศึกษามาแสดงต่อมหาวิทยาลัยฯในวันสอบสัมภาษณ์
          {"\n"}3. หากมหาวิทยาลัยฯตรวจสอบภายหลังพบว่า ข้าพเจ้ามีคุณสมบัติหรือคุณวุฒิการศึกษาหรือกรอก
          ข้อมูลไม่ถูกต้อง ข้าพเจ้ายินดีให้มหาวิทยาลัยฯเพิกถอนการสมัครเป็นโมฆะ และยินดีสละสิทธิ์ในการ
          สมัครทุกกรณี
          {"\n"}4. ข้าพเจ้าอนุญาตให้นำข้อมูลส่วนตัวข้างต้นไปใช้ได้ ภายใต้การดูแลของสำนักส่งเสริมวิชาการและ
          งานทะเบียน โดยใช้ภายในมหาวิทยาลัยเพื่อเป็นประโยชน์ในทางการศึกษาและทางสถิติ
        </p>
      </div>


      {/* Checkbox state */}
      <div>
        <input 
          type="checkbox" 
          id="agree" 
          name="agree"
          checked={isAgree} 
          onChange={(e) => setIsAgree(e.target.checked)} 
        />
        <label 
        htmlFor="agree" 
        className="text-gray-600 text-sm ml-2">
          ข้าพเจ้ายอมรับข้อกำหนดในการลงทะเบียนดังกล่าวข้างต้น
        </label>
      </div>


      <div className="flex justify-end gap-3 p-5">
        <button
          onClick={() => {
            setShowPopup(false)
            setIsAgree(false)
          }}
          className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100"
        >
          ยกเลิก
      </button>


      <button
          onClick={confirmSubmit}
          disabled={!isAgree} 
          className={`px-6 py-2 rounded-md font-medium transition ${
            isAgree 
              ? 'bg-[#8D6D3E] text-white hover:bg-[#7A5C32]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ยอมรับและลงทะเบียน
      </button>


      </div>
    </div>
  </div>
)}


        {/* div ครอบหลัก */}
      <div className="w-[1200px] h-full mx-auto space-y-10 mt-[140px] ">


      {/* ส่วน Header + Step buttons */}
      <div className="bg-white px-6 py-8 rounded-2xl">


          {/* div ส่วนขั้นตอนเเต่ละstep */}
        <div className="flex items-center justify-between relative">
          <StepItem number={1} label={<span className="text-xl">ข้อมูลส่วนตัว</span>}  icon={<FaUser size={24} />} isActive={step === 1} isCompleted={step > 1} />
          <div className="flex-1 h-1 bg-gray-300 mx-2 mb-8"></div>

          <StepItem number={2} label={<span className="text-xl">ข้อมูลการศึกษา</span>} icon={<FaBook size={24} />} isActive={step === 2} isCompleted={step > 2} />
          <div className="flex-1 h-1 bg-gray-300 mx-2 mb-8"></div>

          <StepItem number={3} label={<span className="text-xl">ข้อมูลที่อยู่</span>} icon={<FaHome size={24} />} isActive={step === 3} isCompleted={step > 3} />
          <div className="flex-1 h-1 bg-gray-300 mx-2 mb-8"></div>

          <StepItem number={4} label={<span className="text-xl">ยืนยันข้อมูล</span>} icon={<FaCheck size={24} />} isActive={step === 4} isCompleted={step > 4} />
        </div>

      </div>


      {/* ส่วนcontentฟอร์มเรียกมาจาก component s */}
      <div className="bg-white rounded-2xl shadow px-6 py-8 space-y-6">
        {step === 1 && <PersonalStep form={form} errors={errors} onChange={(f:string,v:string)=>handleChange(f,v)} />}
        {step === 2 && <EducationStep form={form} errors={errors} onChange={(f:string,v:string)=>handleChange(f,v)} />}
        {step === 3 && <AddressStep form={form} errors={errors} onChange={(f:string,v:string)=>handleChange(f,v)} />}
        {step === 4 && <SummaryStep form={form} />}


      {/* ส่วนปุ่มถัดไป, ย้อนกลับ, ยืนยัน */}
        <div className="flex justify-between">
          <div>
            {step > 1 && (
              <button onClick={handleBack} className="px-6 py-2 bg-[#8D6D3E] text-white rounded-md font-medium hover:bg-[#7A5C32] transition">ย้อนกลับ</button>
            )}
          </div>
          <div>
            {step < 4 ? (
              <button onClick={handleNext} className="px-6 py-2 bg-[#8D6D3E] text-white rounded-md font-medium hover:bg-[#7A5C32] transition">ถัดไป</button>
            ) : (
              <button onClick={handleSubmit} className="px-6 py-2 bg-[#8D6D3E] text-white rounded-md font-medium hover:bg-[#7A5C32] transition">ยืนยัน</button>
            )}
          </div>
        </div>
      </div>


    </div>
    </>
    </LayoutBlack>
  )
}
