"use client";

import { Divider, Group } from "@mantine/core";
import { Logo } from "@/app/components/Logo";
import { UserButton } from "@/app/components/UserButton";
import { AuthProvider } from "@/app/providers/AuthProvider";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <header style={{ height: 60 }}>
        <Group h="100%" px="md" justify="space-between">
          <Logo />
          <UserButton />
        </Group>
        <Divider />
      </header>
      <main style={{ height: "calc(100vh - 60px)" }}>{children}</main>
    </AuthProvider>
  );
}
