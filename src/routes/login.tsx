import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="bg-white shadow-lg rounded-xl p-6  flex flex-col gap-4 w-lg h-auto">
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-lg">
            เลขบัตรประชาชน/รหัสนักศึกษา/ชื่อ-สกุล
          </label>
          <input
            type="text"
            placeholder="กรอกข้อมูล"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <label className="text-gray-600 border rounded-lg text-center cursor-pointer py-2 mt-5">
          Next
        </label>

        <div className="flex justify-between w-full">
          <button className="text-gray-600 border rounded-lg text-center cursor-pointer py-2 mt-5">
            ศิษย์เก่า/ไม่พบข้อมูล
          </button>
          <button className=" text-gray-600 border rounded-lg text-center cursor-pointer py-2 mt-5">
            เข้าสู่ระบบด้วย ThaID
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
