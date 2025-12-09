import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import LayoutBlack from '@/Components/LayoutBlack';

export const Route = createFileRoute('/scan')({
  component: ScanPage,
});

function ScanPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    setScanning(true);
    setError('');
    
    // Mock scanning - in real implementation, this would use an ID card reader API
    setTimeout(() => {
      try {
        // Simulate successful scan
        const mockData = {
          citizenId: '1234567890123',
          firstNameTh: 'สมชาย',
          lastNameTh: 'ใจดี',
          dob: '1990-01-15',
        };
        setScannedData(mockData);
        setScanning(false);
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาดในการอ่านบัตร');
        setScanning(false);
      }
    }, 2000);
  };

  const handleUseScannedData = () => {
    if (scannedData) {
      // Store scanned data in sessionStorage and navigate to index
      try {
        sessionStorage.setItem('scanned_user', JSON.stringify(scannedData));
        navigate({ to: '/' });
      } catch (e) {
        setError('ไม่สามารถบันทึกข้อมูลได้');
      }
    }
  };

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return (
    <LayoutBlack>
      <div className="h-[95vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-8 w-full max-w-[600px] p-10">
          
          <h1 className="text-5xl text-center font-bold text-white mb-4">สแกนบัตรประชาชน</h1>

          <div className="bg-white rounded-3xl p-12 w-full shadow-lg">
            {/* Scan Area */}
            {!scannedData ? (
              <div className="flex flex-col items-center gap-6">
                <div className="w-full h-64 border-4 border-dashed border-gray-400 rounded-2xl flex items-center justify-center bg-gray-50">
                  {scanning ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 font-medium">กำลังอ่านบัตร...</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-lg text-center px-4">
                      วางบัตรประชาชนลงบนเครื่องอ่าน
                    </p>
                  )}
                </div>

                {error && (
                  <div className="w-full bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleScan}
                  disabled={scanning}
                  className={`w-full rounded-full py-4 text-2xl font-bold transition-transform ${
                    scanning
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#F69522] text-white hover:bg-orange-600 hover:scale-105 active:scale-95'
                  }`}
                >
                  {scanning ? 'กำลังอ่าน...' : 'เริ่มอ่านบัตร'}
                </button>

                <button
                  onClick={handleBack}
                  className="w-full rounded-full py-4 text-xl font-bold bg-gray-400 text-white hover:bg-gray-500 transition-transform hover:scale-105 active:scale-95"
                >
                  กลับไป
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 text-center">
                  <p className="text-green-700 font-bold text-lg">✓ อ่านบัตรสำเร็จ</p>
                </div>

                {/* Scanned Data Display */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-medium mb-2">เลขบัตรประชาชน</label>
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 font-mono">
                      {scannedData.citizenId}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">ชื่อ</label>
                      <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800">
                        {scannedData.firstNameTh}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-600 font-medium mb-2">นามสกุล</label>
                      <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800">
                        {scannedData.lastNameTh}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-2">วันเกิด</label>
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800">
                      {scannedData.dob}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleUseScannedData}
                  className="w-full rounded-full py-4 text-2xl font-bold bg-[#8D6D3E] text-white hover:bg-[#7A5C32] transition-transform hover:scale-105 active:scale-95"
                >
                  ใช้ข้อมูลนี้
                </button>

                <button
                  onClick={() => {
                    setScannedData(null);
                    setError('');
                  }}
                  className="w-full rounded-full py-4 text-xl font-bold bg-gray-400 text-white hover:bg-gray-500 transition-transform hover:scale-105 active:scale-95"
                >
                  สแกนใหม่
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </LayoutBlack>
  );
}
