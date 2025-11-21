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
        backgroundColor: '#000000ff',
      }}
    >
      
      {/* 🔹 Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/bg.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* 🔹 Logo */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <img
          src="/logo.png"
          alt="RMUTI Logo"
          style={{ height: '90px', opacity: 1.0 }}
        />
      </div>

      {/* 🔹 Content */}
      <div style={{ position: 'relative', padding: '20px', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
