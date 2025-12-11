import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LayoutBlack from "@/Components/LayoutBlack";


// ---------------------------------------------------------
// queue router
// ---------------------------------------------------------
export const Route = createFileRoute("/queue")({
  component: QueuePage,
});

///////////
// ---------------------------------------------------------
// queue-code type
// ---------------------------------------------------------
type QueueResponse = {
  queue_code: string;
};



// ---------------------------------------------------------
// hook: ดึงรหัสคิวจาก API
// ---------------------------------------------------------
function QueuePage() {
  const [queueResult, setQueueResult] = useState<QueueResponse | null>(null);

  const payload = JSON.parse(localStorage.getItem("queue_payload") || "{}");

  const createQueue = useMutation<QueueResponse, Error, any>({
    mutationFn: async (payload) => {
      const res = await fetch(
        "https://queue.devregis.com/api/v1/getQueueNumber",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      return json.data; 
    },
  });

  useEffect(() => {
    if (payload.std_id_pri && payload.queue_id) {
      createQueue.mutate(payload, {
        onSuccess(data) {
          setQueueResult(data);
          localStorage.removeItem("queue_payload");
        },
      });
    }
  }, []);

  return (
    <LayoutBlack>
    <div className="h-[95vh] flex items-center justify-center">
      <div className="p-12 flex flex-col items-center gap-8">

        <div className="w-[800px] max-w-[95%] p-12 rounded-4xl flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-center">คิวของคุณ</h1>

          <div className="bg-gray-100 w-full max-w-[700px] p-6 rounded-2xl flex flex-col items-center gap-4">

            {createQueue.isPending && (
              <div className="text-3xl">⏳ กำลังโหลด...</div>
            )}

            {createQueue.isError && (
              <div className="text-2xl text-red-500">เกิดข้อผิดพลาด</div>
            )}

            {queueResult?.queue_code && (
              <div className="text-9xl font-extrabold text-[#000000]">
                {queueResult.queue_code}
              </div>
            )}

          </div>

            {/* Back Button Center */}
          <Link
            to="/"
            className="bg-[#F69522] text-white font-bold py-4 px-8 rounded-full hover:bg-orange-500 transition-transform transform hover:scale-105 active:scale-95"
          >
            กลับหน้าหลัก
          </Link>
        </div>

      </div>
    </div>
    </LayoutBlack>
  );
}
