import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: App,
});

function App() {
  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="flex flex-col gap-8 w-[900px] max-w-[80vh] ">
        
        {/* Input Field */}
        <div className="relative w-full">
          <input
            type="text"
            id="studentId"
            placeholder=" "
            className="peer w-full rounded-full p-7 bg-[#B7BECA] border-none focus:outline-none focus:ring-2 focus:ring-[#B7BECA]"
          />
          <label
            htmlFor="studentId"
            className="absolute left-6 top-6 text-black text-2xl transition-all duration-200
            peer-placeholder-shown:top-6 peer-placeholder-shown:text-2x1 peer-placeholder-shown:text-black
            peer-focus:-top-9 peer-focus:text-2x1 peer-focus:text-white px-2 font-extrabold mb-4"
          >
            เลขบัตรประชาชน/รหัสนักศึกษา/ชื่อ-สกุล
          </label>
        </div>

        {/* Next Button */}
        <button className="w-full bg-white/70 rounded-full py-5 text-2xl font-medium text-[#5F320F] hover:bg-orange-500 transition-transform transform hover:scale-105 active:scale-95">
          Next
        </button>

        {/* Bottom Buttons */}
        <div className="w-full flex items-center justify-center">
          <Link 
            to="/register"
            className="flex-1 bg-white/70 rounded-full py-4 text-2xl text-[#5F320F] 
            flex items-center justify-center
                      hover:bg-orange-500 transition-transform hover:scale-105 active:scale-95">
              ศิษย์เก่า/ไม่พบข้อมูล
          </Link>
          <button className="flex-1 bg-purple-700 rounded-full py-4 text-white text-2xl hover:bg-purple-600 transition-transform hover:scale-105 active:scale-95">
            เข้าสู่ระบบด้วย ThaID
          </button>
        </div>

      </div>
    </div>

      );
    }

export default App;

