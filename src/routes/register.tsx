import { createFileRoute } from "@tanstack/react-router";

// สร้าง route ของหน้า register
export const Route = createFileRoute("/register" as any)({
  component: RouteComponent,
});

// Component สำหรับจัด layout ของ row input/ select ให้ responsive
function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full">
      {/* Label ของ input */}
      <label className="md:w-1/4 text-gray-600 font-light text-sm md:text-right">
        {label}
      </label>
      {/* Input / select จะมาอยู่ใน div นี้ */}
      <div className="flex-1">{children}</div>
    </div>
  );
}

// Component หลักของหน้า register
function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  gap-6 h-auto p-4">
      <br/>
      

      {/* Header / Logo */}
      <div className="shrink-0 text-center p-4 ">
        <p className="text-green-500 mt-1">ระบบทะเบียนกลาง</p>
        <p className="text-xl mt-1">
          มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
        </p>
        <p className="text-sm mt-1">
          (สำหรับลงทะเบียนใช้บริการ เพื่อขอเอกสารการศึกษา)
        </p>
      </div>


      {/* Form Container */}
      <div className="bg-white shadow-lg p-6 flex flex-col gap-5 w-full max-w-5xl">
        {/* คำนำหน้า */}
        <FormRow label="คำนำหน้า :*">
          <select className="text-gray-600 w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500">
            <option>นาย</option>
            <option>นางสาว</option>
            <option>นาง</option>
          </select>
        </FormRow>


        {/* ชื่อภาษาไทย */}
        <FormRow label="ชื่อภาษาไทย :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* นามสกุลภาษาไทย */}
        <FormRow label="นามสกุลภาษาไทย :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* ชื่อภาษาอังกฤษ */}
        <FormRow label="ชื่อภาษาอังกฤษ :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* นามสกุลภาษาอังกฤษ */}
        <FormRow label="นามสกุลภาษาอังกฤษ :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* เลขประจำตัวประชาชน */}
        <FormRow label="เลขประจำตัวประชาชน (ใช้เป็น Username) :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* รหัสนักศึกษา */}
        <FormRow label="รหัสนักศึกษา (หากจำได้) :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* หลักสูตร/สาขาวิชา */}
        <FormRow label="หลักสูตร/สาขาวิชา :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* ปีที่สำเร็จการศึกษา */}
        <FormRow label="ปีที่สำเร็จการศึกษา :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* เขตพื้นที่ */}
        <FormRow label="เขตพื้นที่ :*">
          <select className="text-gray-600 w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500">
            <option>ส่วนกลาง เชียงใหม่</option>
            <option>ส่วนกลาง กรุงเทพ</option>
          </select>
        </FormRow>


        {/* ที่อยู่ */}
        <FormRow label="ที่อยู่สำหรับจัดส่งเอกสาร :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* เบอร์ติดต่อ */}
        <FormRow label="เบอร์โทรติดต่อ :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* อีเมล์ */}
        <FormRow label="อีเมล์ติดต่อ :*">
          <input
            type="text"
            placeholder=""
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>


        {/* รหัสผ่าน */}
        <FormRow label="รหัสผ่านสำหรับใช้เข้าระบบ :*">
          <input
            type="text"
            placeholder="รหัสผ่านต้องประกอบด้วยตัวเลขและตัวอักษรไม่น้อยกว่า 8 ตัว"
            className="w-full border p-2 rounded-md border-gray-400 focus:ring-1 focus:ring-blue-500"
          />
        </FormRow>

      <div className="h-0.5 bg-black/25 my-4 rounded-full"></div>

      <div className="text-left">
      <p className="text-red-500 text-sm mt-2"> หมายเหตุ </p>
      <p className="text-red-500 text-sm mt-2"> * ต้องระบุข้อมูลให้ถูกต้อง </p>
      </div>  


        {/* ปุ่มลงทะเบียน */}
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 cursor-pointer">
            ลงทะเบียน
          </button>
        </div>
      </div>
    </div>
  );
}
