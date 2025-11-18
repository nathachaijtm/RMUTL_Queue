import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/menu")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-[800px] max-w-[900px] p-10 rounded-4xl">
        <h1 className="text-4xl text-center font-bold mb-4">
          ต้องการติดต่อเรื่องอะไร
        </h1>

        {/* กล่องปุ่มตรงกลาง */}
        <div className="rounded-xl p-6 flex flex-col gap-4 w-full max-w-[700px] mx-auto">
          <div className="flex gap-4">
            <button className="bg-white flex-1 min-w-[300px] text-gray-700 border rounded-full cursor-pointer 
              py-8 mt-6 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 
              active:scale-95 font-extrabold mb-4 text-2xl">
              ข้อความเรื่องที่ 1
            </button>
            <button className="bg-white flex-1 min-w-[300px] text-gray-700 border rounded-full cursor-pointer 
              py-8 mt-6 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 
              active:scale-95 font-extrabold mb-4 text-2xl">
              ข้อความเรื่องที่ 2
            </button>
          </div>

          <div className="flex gap-4">
            <button className="bg-white flex-1 min-w-[300px] text-gray-700 border rounded-full cursor-pointer 
              py-8 mt-6 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 
              active:scale-95 font-extrabold mb-4 text-2xl">
              ข้อความเรื่องที่ 3
            </button>
            <button className="bg-white flex-1 min-w-[300px] text-gray-700 border rounded-full cursor-pointer 
              py-8 mt-6 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 
              active:scale-95 font-extrabold mb-4 text-2xl">
              ข้อความเรื่องที่ 4
            </button>
          </div>

          <div className="flex gap-4">
            <button className="bg-white flex-1 min-w-[300px] text-gray-700 border rounded-full cursor-pointer 
              py-8 mt-6 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 
              active:scale-95 font-extrabold mb-4 text-2xl">
              ข้อความเรื่องที่ 5
            </button>
            <button className="bg-white flex-1 min-w-[300px] text-gray-700 border rounded-full cursor-pointer 
              py-8 mt-6 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 
              active:scale-95 font-extrabold mb-4 text-2xl">
              ข้อความเรื่องที่ 6
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
