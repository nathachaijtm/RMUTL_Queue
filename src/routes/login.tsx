import { useEffect, useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: App,
});

function App() {
  useEffect(() => {
    const callInit = () => {
      const p = (globalThis as any).Preline;
      if (p && typeof p.init === "function") {
        try {
          p.init();
        } catch (e) {
          // ignore init errors
        }
        return true;
      }
      return false;
    };

    if (!callInit()) {
      const iv = setInterval(() => {
        if (callInit()) clearInterval(iv);
      }, 100);
      return () => clearInterval(iv);
    }
  }, []);

  // Combo box state
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<any | null>(null);


  useEffect(() => {
    let mounted = true;
    fetch("/assets/data/searchbox.json")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setItems(data || []);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      setHighlight(-1);
      return;
    }
    const q = query.toLowerCase();
    const f = items.filter((it) => (it.name || "").toLowerCase().includes(q));
    setFiltered(f);
    setHighlight(f.length ? 0 : -1);
  }, [query, items]);

  // close on outside click
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

  

  return (
    <div className="h-[95vh] flex items-center justify-center">
      <div className="flex flex-col gap-8 w-[900px] max-w-[80vh]">

        {/* Combo Box */}
        <div className="relative w-full" ref={boxRef}>
          <input
            type="text"
            id="studentId"
            placeholder=" "
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (!open) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlight((h) => (filtered.length ? Math.min(filtered.length - 1, h + 1) : -1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlight((h) => (filtered.length ? Math.max(0, h - 1) : -1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                if (highlight >= 0 && filtered[highlight]) {
                  setQuery(filtered[highlight].name);
                  setOpen(false);
                }
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className="peer w-full rounded-full p-7 bg-[#B7BECA] border-none text-2xl font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#B7BECA]"
          />

          <label
            htmlFor="studentId"
            className="absolute left-8 text-2xl font-extrabold text-black transition-all duration-200 peer-placeholder-shown:top-6 peer-focus:-top-9 peer-focus:text-white peer-not-placeholder-shown:-top-9 peer-not-placeholder-shown:text-white"
          >
            เลขบัตรประชาชน/รหัสนักศึกษา/ชื่อ-สกุล
          </label>

          {open && filtered.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-3xl shadow-lg">
              <div className="max-h-72 overflow-y-auto rounded-3xl" role="list">
                {filtered.map((it, idx) => (
                  <div
                    key={idx}
                    role="listitem"
                    onMouseDown={(e) => {
                      // use onMouseDown to select before blur
                      e.preventDefault();
                      setQuery(it.name);
                        setSelected(it);
                      setOpen(false);
                    }}
                    onMouseEnter={() => setHighlight(idx)}
                    className={`flex items-center gap-4 p-3 cursor-pointer ${highlight === idx ? "bg-gray-100" : ""}`}
                  >
                    {it.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.image} alt="" className="w-10 h-10 rounded-full" />
                    )}
                    <div className="flex flex-col">
                      <div className="font-semibold text-black">{it.name}</div>
                      <div className="text-sm text-gray-500">{it.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
<Link
  to="/menu"
  className={`w-full max-w-[900px] rounded-full py-7 text-3xl font-semibold flex items-center justify-center
    ${selected
      ? "bg-white/70 text-[#5F320F] hover:bg-orange-500 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
  onClick={(e) => {
    if (!selected) e.preventDefault();
  }}
>
  Next
</Link>

        </div>

        {/* Bottom Buttons */}
        <div className="w-full flex items-center justify-center gap-4">
          <Link 
            to="/register"
            className="flex-1 bg-white/70 rounded-full py-4 text-2xl text-[#5F320F] 
                      flex items-center justify-center
                      hover:bg-orange-500 transition-transform hover:scale-105 active:scale-95"
          >
            ศิษย์เก่า/ไม่พบข้อมูล
          </Link>

          <button className="flex-1 bg-purple-700 rounded-full py-4 text-white text-2xl
                            hover:bg-purple-600 transition-transform hover:scale-105 active:scale-95">
            เข้าสู่ระบบด้วย ThaID
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
