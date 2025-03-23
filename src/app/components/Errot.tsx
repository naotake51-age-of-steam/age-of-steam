import { Button } from "@mantine/core";

export function Error({
  status,
  title,
  description,
}: {
  status: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">{status}</h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-700">{title}</h2>
        <p className="mb-8 text-xl text-gray-600">{description}</p>
        <Button onClick={() => window.location.reload()}>再読み込み</Button>
      </div>
    </div>
  );
}
