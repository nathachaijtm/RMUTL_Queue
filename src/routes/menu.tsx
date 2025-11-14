import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/menu")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6 p-4">
      <h1 className="text-gray-950 text-2xl font-semibold">
        ต้องการติดต่อเรื่องอะไร
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 w-full max-w-lg">
        <div className="flex gap-4">
          <button className="flex-1 text-gray-700 border rounded-lg cursor-pointer py-2 mt-5">
            ข้อความเรื่องที่ 1
          </button>
          <button className="flex-1 text-gray-700 border rounded-lg cursor-pointer py-2 mt-5">
            ข้อความเรื่องที่ 2
          </button>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 text-gray-700 border rounded-lg cursor-pointer py-2 mt-5">
            ข้อความเรื่องที่ 3
          </button>
          <button className="flex-1 text-gray-700 border rounded-lg cursor-pointer py-2 mt-5">
            ข้อความเรื่องที่ 4
          </button>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 text-gray-700 border rounded-lg cursor-pointer py-2 mt-5">
            ข้อความเรื่องที่ 5
          </button>
          <button className="flex-1 text-gray-700 border rounded-lg cursor-pointer py-2 mt-5">
            ข้อความเรื่องที่ 6
          </button>
        </div>
      </div>
    </div>
  );
}
