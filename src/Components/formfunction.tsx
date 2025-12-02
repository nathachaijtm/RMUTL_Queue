import type { ReactNode } from 'react';

export function StepItem({
  number,
  label,
  icon,
  isActive = false,
  isCompleted = false
}: {
  number: number;
  label: React.ReactNode;
  icon: ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
}) {
  return (
    <div className="flex flex-col items-center w-24"> {/* กำหนด width ให้เท่ากัน */}
      {/* วงกลมเลข */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold mb-2 ${
        isActive ? 'bg-[#8D6D3E] text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
      }`}>
        {isCompleted ? '✔' : number}
      </div>

      {/* ไอคอน */}
      <div className="text-gray-600 mb-1 flex justify-center">
        {icon}
      </div>

      {/* Label */}
      <div className="text-xs text-gray-600 text-center truncate">
        {label}
      </div>
    </div>
  )
}

// Component สำหรับแสดงข้อมูลสรุป
export function FormsummaryItem({ label, value, required = false }: { label: string; value?: string; required?: boolean }) {
  return (
    <div className="mb-2">


      <p className="text-gray-600 text-sm">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>

      <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800">
        {value || "-"}
      </div>


    </div>
  );
}



// Component สำหรับ Input (ช่องinput)
export function FormInput({ label, placeholder, type = "text", value, onChange, error, required = false }: { label: string; placeholder?: string; type?: string; value?: string; onChange?: (v: string) => void; error?: string; required?: boolean }) {
  return (
    <div>


      <label className="block text-gray-600 font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-400 rounded-md text-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
      />

      {error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}

      
    </div>
  )
}



// Component สำหรับ Select (ช่องselect)
export function FormSelect({ label, options, value, onChange, error, required = false }: { label: string; options: string[]; value?: string; onChange?: (v: string) => void; error?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-gray-600 font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full p-2 border border-gray-400 rounded-md text-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none">
        <option value="">-- กรุณาเลือก --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}
    </div>
  )
}
