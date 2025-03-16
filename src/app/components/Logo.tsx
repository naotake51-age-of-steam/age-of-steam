import { Title } from "@mantine/core";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <Title order={2}>蒸気の時代 Online</Title>
    </Link>
  );
}
