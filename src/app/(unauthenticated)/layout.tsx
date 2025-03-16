import { Divider, Group } from "@mantine/core";
import { Logo } from "@/app/components/Logo";

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header style={{ height: 60 }}>
        <Group h="100%" px="md">
          <Logo />
        </Group>
      </header>
      <Divider />
      <main className="h-[calc(100vh-60px)]">{children}</main>
    </>
  );
}
