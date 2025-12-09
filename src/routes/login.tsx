import { useEffect, useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

// ----------------------------------------
// Define route
// ----------------------------------------
export const Route = createFileRoute("/login")({
  component: App,
});

// ----------------------------------------
// Student Type
// ----------------------------------------
interface Student {
  std_id_pri: string;
  std_id: string;
  std_name_th: string;
  std_name_en: string;
  photo_url: string;
}

// ----------------------------------------
// Hook: Search User via API
// ----------------------------------------
function useSearchUser(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchUser", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) return [];
      const res = await fetch(
        `https://queue.devregis.com/api/v1/searchUser?query=${debouncedQuery}`
      );
      const json = await res.json();
      return json.data?.items || [];
    },
    enabled: debouncedQuery.length >= 2,
  });

  return {
    data: data ?? [],
    loading: isLoading,
    error,
  };
}

// ----------------------------------------
// App Component
// ----------------------------------------
function App() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [selected, setSelected] = useState<Student | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const { data: filtered, loading } = useSearchUser(query);

  // ---------------------------------------------------------
  // Close dropdown on outside click
  // ---------------------------------------------------------
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // ---------------------------------------------------------
  // Handle keyboard navigation
  // ---------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) =>
        filtered.length ? Math.min(filtered.length - 1, h + 1) : -1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (filtered.length ? Math.max(0, h - 1) : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && filtered[highlight]) {
        const item = filtered[highlight];
        setSelected(item);
        setQuery(item.std_name_th);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="flex flex-col gap-8 w-[900px] max-w-[80vh]">
        {/* Input + Dropdown */}
        <div className="relative w-full" ref={boxRef}>
          <input
            type="text"
            id="studentId"
            placeholder=" "
            value={query}
            
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setHighlight(0);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            
            className="peer w-full rounded-full p-7 bg-[#B7BECA] border-none text-2xl font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#B7BECA]"
          />
          <label
            htmlFor="studentId"
            className="absolute left-8 text-2xl font-extrabold text-black transition-all duration-200 peer-placeholder-shown:top-6 peer-focus:-top-9 peer-focus:text-white peer-not-placeholder-shown:-top-9 peer-not-placeholder-shown:text-white"
          >
            เลขบัตรประชาชน/รหัสนักศึกษา/ชื่อ-สกุล
          </label>

          {/* Loading */}
          {open && loading && (
            <div className="absolute z-50 w-full mt-2 bg-white p-4 text-center border rounded-3xl">
              ⏳ กำลังค้นหา...
            </div>
          )}

          {/* No result */}
          {open && !loading && filtered.length === 0 && query && (
            <div className="absolute z-50 w-full mt-2 bg-white p-4 text-center border rounded-3xl">
              ❌ ไม่พบข้อมูล
            </div>
          )}

          {/* Suggestion list */}
          {open && filtered.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white shadow-lg border rounded-3xl max-h-72 overflow-y-auto">
              {filtered.map((item: Student, idx: number) => (
                <div
                  key={item.std_id_pri}
                  className={`flex items-center gap-4 p-3 cursor-pointer ${
                    highlight === idx ? "bg-gray-100" : ""
                  }`}
                  onMouseDown={() => {
                    setSelected(item);
                    setQuery(item.std_name_th);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setHighlight(idx)}
                >
                  <img
                    src={item.photo_url || "/default.jpg"}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-black">
                      {item.std_name_th}
                    </div>
                    <div className="text-sm text-gray-600">
                      รหัสนักศึกษา: {item.std_id}
                    </div>
                    <div className="text-sm text-gray-600">
                      เลขบัตรประชาชน: {item.std_id_pri}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center justify-center gap-4">
          <button className="flex-1 bg-blue-700 rounded-full py-4 text-white text-2xl hover:bg-blue-600 transition-transform hover:scale-105 active:scale-95">
            สแกนบัตรประชาชน
          </button>
          <button className="flex-1 bg-purple-700 rounded-full py-4 text-white text-2xl hover:bg-purple-600 transition-transform hover:scale-105 active:scale-95">
            เข้าสู่ระบบด้วย ThaID
          </button>
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <Link
            to="/menu"
            className={`w-full max-w-[900px] rounded-full py-7 text-3xl font-semibold flex items-center justify-center
              ${
                selected
                  ? "bg-white/70 text-[#5F320F] hover:bg-orange-500 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            onClick={(e) => {
              if (!selected) {
                e.preventDefault();
                return;
              }
              localStorage.setItem("queue_user", JSON.stringify(selected));
              sessionStorage.setItem("selected_user", JSON.stringify(selected));
            }}
          >
            ถัดไป
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
