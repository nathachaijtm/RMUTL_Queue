import type { ReactNode } from 'react';

type LayoutBlackProps = {
  children: ReactNode;
};

export default function LayoutBlack({ children }: LayoutBlackProps) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        color: '#fff',
        overflow: 'hidden',
        backgroundColor: '#000000ff', // 🔹 สีพื้นหลังหลักกรณีรูปโปร่ง
      }}
    >
      {/* 🔹 ชั้นภาพพื้นหลัง (โปร่ง 50%) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("../public/bg.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6, // ✅ ความโปร่งใส 50%
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          zIndex: 3,
        }}
      >
        <img
          src="../public/logo.png"
          alt="RMUTI Logo"
          style={{ height: '90px', opacity: 1.0 }}
        />
      </div>
      
      {/* 🔹 ชั้นเนื้อหา */}
      <div style={{ position: 'relative', padding: '20px', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
