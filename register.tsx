import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6 p-4">
      <h1 className="text-gray-950 text-2xl font-semibold">ลงทะเบียน</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 w-full max-w-lg">
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-lg">เลขบัตรประชาชน</label>
          <input
            type="text"
            placeholder="กรอกข้อมูล"
            className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-lg">ชื่อ นามสกุล</label>
          <input
            type="text"
            placeholder="กรอกข้อมูล"
            className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end w-full">
          <button className="w-16 text-gray-600 border rounded-lg text-center cursor-pointer py-2 mt-5">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
