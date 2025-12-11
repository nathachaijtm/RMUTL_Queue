import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// ---------------------------------------------------------
// menu Route
// ---------------------------------------------------------
export const Route = createFileRoute("/menu")({
  component: RouteComponent,
});


// ---------------------------------------------------------
// ID-TOPIC ID-NAME Type
// ---------------------------------------------------------
type QueueTopic = {
  queue_id: string;
  queue_name: string;
};


// ---------------------------------------------------------
// Hook: ดึงหัวข้อบริการจาก API
// ---------------------------------------------------------
function useQueueTopics() {
  const { data, isLoading } = useQuery<QueueTopic[]>({
    queryKey: ["topics"],
    queryFn: async () => {
      const res = await fetch(
        "https://queue.devregis.com/api/v1/getQueueTopic"
      );
      const json = await res.json();
      return json.data?.items || [];
    },

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return {
    topics: data || [],
    loading: isLoading,
  };
}


// ---------------------------------------------------------
// app Component
// ---------------------------------------------------------
function RouteComponent() {
  const navigate = useNavigate();
  const { topics, loading } = useQueueTopics();
  const [isCreating, setCreating] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);



  // -------------------------------------------------------
  // Create Queue + Navigate
  // -------------------------------------------------------
  const createQueueAndNavigate = async (topic: QueueTopic) => {
    if (isCreating) return;
    setCreating(true);

    const user = JSON.parse(localStorage.getItem("queue_user") || "{}");

    localStorage.setItem(
      "queue_payload",
      JSON.stringify({
        std_id_pri: user.std_id_pri,
        queue_id: topic.queue_id,
      })
    );

    const id = `${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
    const all = JSON.parse(localStorage.getItem("rm_queue") || "[]");

    all.push({
      id,
      topic,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("rm_queue", JSON.stringify(all));

    navigate({ to: "/queue" });
    setCreating(false);
  };



  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("selected_user");
      if (stored) setUserInfo(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);


  // -------------------------------------------------------
  // ส่วนเเสดงผล
  // -------------------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8 pt-10">
          ต้องการติดต่อเรื่องอะไร
        </h1>

        {/* ส่วนเเสดงข้อมูลผู้ใช้*/}
        {userInfo && (
          <div className="bg-[#FFF8E6] border-2 border-[#F69522] rounded-xl p-3 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-[#5F320F] mb-4">
              ข้อมูลผู้ใช้
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-1  text-[#5F320F]">
              <div>
                <span className="font-semibold">ชื่อ:</span>{" "}
                {userInfo.std_name_th}
              </div>
              <div>
                <span className="font-semibold">เลขบัตรประชาชน:</span>{" "}
                {userInfo.std_id_pri}
              </div>
              <div>
                <span className="font-semibold">รหัสนักศึกษา:</span>{" "}
                {userInfo.std_id}
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-xl py-6">⏳ กำลังโหลดหัวข้อ...</div>
        )}

        {/* ปุ่มเลือกบริการ  1-6 */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {topics.map((topic) => (
              <button
                key={topic.queue_id}
                onClick={() => createQueueAndNavigate(topic)}
                disabled={isCreating}
                className="
          bg-white rounded-full py-8 px-4 shadow-sm 
          text-xl font-semibold text-gray-700
          hover:bg-[#F69522] hover:text-white hover:scale-[1.03]
          active:scale-95 transition-all
        "
              >
                {topic.queue_name}
              </button>
            ))}
          </div>
        )}

        {/* ปุ่มย้อนกลับ */}
        <div className="flex justify-center mt-4">
          <Link
            to="/"
            className="bg-[#F69522] text-white font-bold py-4 px-8 rounded-full hover:bg-orange-500 transition-transform transform hover:scale-105 active:scale-95"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
