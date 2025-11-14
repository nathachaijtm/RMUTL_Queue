import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/queue")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6 p-4">
      <h1 className="text-gray-950 text-2xl font-semibold">คิวของคุณคือ</h1>


      <div className="flex bg-white shadow-lg rounded-xl flex-col gap-4  p-6 w-64 h-64 text-center items-center justify-center">
        08กล้วย23หน่วย
      </div>
    </div>
  );
}
