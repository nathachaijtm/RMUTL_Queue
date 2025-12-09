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
        } catch (e) {}
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

  // เมื่อ query เปลี่ยน ให้ clear selected หาก query ไม่ตรงกับ selected
  useEffect(() => {
    // ถ้ามี selected อยู่ ให้ตรวจสอบว่า query ยังตรงกับชื่อนั้นหรือไม่
    if (selected && query !== selected.name) {
      setSelected(null);
    }
  }, [query, selected]);

  // โหลดข้อมูล
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

  // ❗❗ Debounce 400ms (แก้ปัญหา search ยิงบ่อย)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query) {
        setFiltered([]);
        setHighlight(-1);
        return;
      }

      const q = query.toLowerCase().trim();
      const queryWords = q.split(" ").filter(Boolean);

      const f = items.filter((it) => {
        const name = (it.name || "").toLowerCase().trim();
        const citizenId = (it.citizenId || "").toLowerCase().trim();
        const studentId = (it.studentId || "").toLowerCase().trim();
        const nameWords = name.split(" ").filter(Boolean);

        // 1️⃣ ตรวจสอบชื่อ + นามสกุล
        let matchesName = false;
        if (queryWords.length > 0 && nameWords.length > 0) {
          if (nameWords[0].startsWith(queryWords[0])) {
            matchesName = true;
            for (let i = 1; i < queryWords.length; i++) {
              if (!nameWords[i] || !nameWords[i].startsWith(queryWords[i])) {
                matchesName = false;
                break;
              }
            }
          }
        }

        // 2️⃣ ตรวจสอบเลขบัตรประชาชน / รหัสนักศึกษา
        const matchesId = citizenId.startsWith(q) || studentId.startsWith(q);

        return matchesName || matchesId;
      });

      setFiltered(f);
      setHighlight(f.length ? 0 : -1);
    }, 400); // ← Debounce 400ms

    return () => clearTimeout(handler);
  }, [query, items]);

  // ปิดเมื่อคลิกด้านนอก
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
                setHighlight((h) =>
                  filtered.length ? Math.min(filtered.length - 1, h + 1) : -1
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlight((h) =>
                  filtered.length ? Math.max(0, h - 1) : -1
                );
              } else if (e.key === "Enter") {
                // 🔒 ปิดการใช้ Enter — บังคับให้ใช้เมาคลิกเลือกจาก dropdown
                e.preventDefault();
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className="peer w-full rounded-full p-9 bg-[#B7BECA] border-none text-4xl font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#B7BECA]"
          />

          <label
            htmlFor="studentId"
           className="
            absolute left-9 text-3xl font-extrabold text-black
            transition-all duration-200
            peer-placeholder-shown:top-9
            peer-focus:-top-13
            peer-focus:text-white
            peer-not-placeholder-shown:-top-9
            peer-not-placeholder-shown:text-white
          ">
            เลขบัตรประชาชน/รหัสนักศึกษา/ชื่อ-สกุล
          </label>

          {/* รายการผลลัพธ์ */}
          {open && filtered.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-3xl shadow-lg">
              <div className="max-h-72 overflow-y-auto rounded-3xl" role="list">
                {filtered.map((it, idx) => (
                  <div
                    key={idx}
                    role="listitem"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setQuery(it.name);
                      setSelected(it);
                      setOpen(false);
                    }}
                    onMouseEnter={() => setHighlight(idx)}
                    className={`flex items-center gap-4 p-3 cursor-pointer ${
                      highlight === idx ? "bg-gray-100" : ""
                    }`}
                  >
                    {it.image && (
                      <img src={it.image} alt="" className="w-12 h-12 rounded-full" />
                    )}
                    <div className="flex flex-col">
                      <div className="font-semibold text-black text-2xl">{it.name}</div>
                      <div className="text-xs text-gray-500">เลขบัตร: {it.citizenId} | รหัสนักศึกษา: {it.studentId}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ไม่พบข้อมูล */}
          {open && query && filtered.length === 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-3xl shadow-lg">
              <div className="p-4 text-center text-gray-500">❌ ไม่พบข้อมูล</div>
            </div>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="w-full flex items-center justify-center gap-4">
          <Link
            to="/scan"
            className="flex-1 bg-blue-700 rounded-full py-4 text-white text-2xl hover:bg-blue-600 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center font-semibold"
          >
            สแกนบัตรประชาชน
          </Link>

          <button className="flex-1 bg-purple-700 rounded-full py-4 text-white text-2xl hover:bg-purple-600 transition-transform hover:scale-105 active:scale-95">
            เข้าสู่ระบบด้วย ThaID
          </button>
        </div>

        {/* Next Button */}
        <div className="flex justify-center">
          <Link
            to="/menu"
            className={`w-full max-w-[900px] rounded-full py-7 text-3xl font-semibold flex items-center justify-center ${
              selected && selected.name && (selected.idNumber || selected.studentId || selected.citizenId)
                ? "bg-white/70 text-[#5F320F] hover:bg-orange-500 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={(e) => {
              // ตรวจสอบว่า selected มีข้อมูลครบถ้วน
              if (!selected || !selected.name || (!selected.idNumber && !selected.studentId && !selected.citizenId)) {
                e.preventDefault();
              } else {
                // บันทึกข้อมูลผู้ใช้ลง sessionStorage
                try {
                  sessionStorage.setItem("selected_user", JSON.stringify(selected));
                } catch (e) {
                  // ignore
                }
              }
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
