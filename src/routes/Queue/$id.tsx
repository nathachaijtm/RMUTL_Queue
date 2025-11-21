import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";


let lastQueueNumber = 0;

export const Route = createFileRoute("/Queue/$id")({
  component: QueuePage,
});

function QueuePage() {
  const [queueNumber, setQueueNumber] = useState("");

  useEffect(() => {
    // เพิ่มเลขคิวทีละ 1 จากครั้งก่อนหน้า
    lastQueueNumber += 1;
    setQueueNumber(`AB${String(lastQueueNumber).padStart(2, "0")}`);
  }, []);

  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="w-[800px] max-w-[95%] p-12 rounded-4xl flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center">คิวของคุณ</h1>
        <div className="bg-gray-100 w-full max-w-[700px] p-6 rounded-2xl flex flex-col items-center gap-4">
          <div className="text-9xl font-extrabold text-[#000000]">{queueNumber}</div>
        </div>

          <div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Link
            to="/menu"
            className="bg-[#F69522] text-white font-bold py-4 px-8 rounded-full hover:bg-orange-500 transition-transform transform hover:scale-105 active:scale-95"
          >
            กลับหน้าเลือกหัวข้อ
          </Link>
          
          <Link
            to="/"
            className="bg-[#F69522] text-white font-bold py-4 px-8 rounded-full hover:bg-orange-500 transition-transform transform hover:scale-105 active:scale-95"
          >
            กลับหน้าหลัก
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
