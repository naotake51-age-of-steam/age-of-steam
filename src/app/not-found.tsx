import { Error } from "@/app/components/Errot";

export default function NotFound() {
  return (
    <Error
      status={404}
      title="ページが見つかりません"
      description="お探しのページが見つかりませんでした。"
    />
  );
}
