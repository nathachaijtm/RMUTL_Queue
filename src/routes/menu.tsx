import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/menu")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const topics = [
    "ข้อความเรื่องที่ 1",
    "ข้อความเรื่องที่ 2",
    "ข้อความเรื่องที่ 3",
    "ข้อความเรื่องที่ 4",
    "ข้อความเรื่องที่ 5",
    "ข้อความเรื่องที่ 6",
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

  const rows = [] as string[][];
  for (let i = 0; i < topics.length; i += 2) rows.push(topics.slice(i, i + 2));

  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-[800px] max-w-[900px] p-10 rounded-4xl">
        <h1 className="text-4xl text-center font-bold mb-4">ต้องการติดต่อเรื่องอะไร</h1>

        <div className="rounded-xl p-6 flex flex-col gap-4 w-full max-w-[700px] mx-auto">
          {rows.map((row, rowIndex) => (
            <div className="flex gap-4" key={rowIndex}>
              {row.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => createQueueAndNavigate(topic)}
                  className="bg-white flex-1 min-w-[300px] text-gray-700 border rounded-full cursor-pointer py-8 mt-6 hover:bg-[#F69522] hover:text-white transition-transform transform hover:scale-105 active:scale-95 font-extrabold mb-4 text-2xl"
                >
                  {topic}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
