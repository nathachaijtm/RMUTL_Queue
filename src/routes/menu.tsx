import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/menu")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("selected_user");
      if (stored) {
        setUserInfo(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const topics = [
    "ข้อความเรื่องที่ 1",
    "ข้อความเรื่องที่ 2",
    "ข้อความเรื่องที่ 3",
    "ข้อความเรื่องที่ 4",
    "ข้อความเรื่องที่ 5",
    "ข้อความเรื่องที่ 6",
    "ข้อความเรื่องที่ 7",
    "ข้อความเรื่องที่ 8",
    "ข้อความเรื่องที่ 9",
  ];

  const createQueueAndNavigate = (topic: string) => {
    const id = `${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
    try {
      const all = JSON.parse(localStorage.getItem("rm_queue") || "[]");
      all.push({ id, topic, createdAt: new Date().toISOString() });
      localStorage.setItem("rm_queue", JSON.stringify(all));
    } catch {
      // ignore
    }
    navigate({ to: "/Queue/$id", params: { id } });
  };

  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-[1200px] p-10 rounded-4xl">
        <h1 className="text-5xl text-center font-bold mb-4">ต้องการติดต่อเรื่องอะไร</h1>

        {/* แสดงข้อมูลผู้ใช้ */}
        {userInfo && (
          <div className="bg-">
            <h2 className="text-xl font-bold  mb-2">ข้อมูลผู้ใช้</h2>
            <div className="space-y-1 text-sm ">
              <div><span className="font-semibold">ชื่อ:</span> {userInfo.name || "-"}</div>
              <div><span className="font-semibold">เลขบัตรประชาชน:</span> {userInfo.idNumber || userInfo.citizenId || "-"}</div>
              <div><span className="font-semibold">รหัสนักศึกษา:</span> {userInfo.studentId || "-"}</div>
            </div>
          </div>
        )}

        <div className="rounded-xl p-6 grid grid-cols-3 gap-4 w-full">
          {topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => createQueueAndNavigate(topic)}
              className="bg-white text-gray-700 border rounded-full cursor-pointer py-10 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 active:scale-95 font-extrabold text-3xl"
            >
              {topic}
            </button>
          ))}
        </div>
            <Link
              to="/"
              className="bg-[#F69522] text-white font-bold py-6 px-10 rounded-full hover:bg-orange-500 transition-transform transform hover:scale-105 active:scale-95 text-xl">
              กลับหน้าหลัก
            </Link>
      </div>
    </div>
  );
}
