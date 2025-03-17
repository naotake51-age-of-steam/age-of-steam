"use client";

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PaperProps,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { zodResolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

import { auth } from "@/app/lib/firebase";

const schema = z.object({
  email: z.string().email(),
});

export function ForgetPasswordForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(schema),
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    try {
      setIsLoading(true);

      await sendPasswordResetEmail(auth, values.email);

      setIsRegistered(true);
    } catch (e) {
      if (e instanceof FirebaseError) {
        notifications.show({
          color: "red",
          title: "送信失敗",
          message: "パスワードリセットメールの送信に失敗しました。",
        });
      } else {
        throw e;
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isRegistered) {
    return <Completed />;
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props} miw={350}>
      <Group justify="center" mb="xl">
        <Title order={2}>パスワード再設定</Title>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            name="email"
            required
            label="メールアドレス"
            placeholder="mail@example.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />
        </Stack>

        <Group grow mb="md" mt="xl">
          <Button type="submit" radius="xl" loading={isLoading}>
            再設定メールを送信
          </Button>
        </Group>
      </form>
      <Divider label="その他" labelPosition="center" my="lg" />
      <Stack gap="xs">
        <Link href={`/sign-in`}>
          <Anchor component="button" type="button" c="dimmed" size="xs">
            ログイン画面へ
          </Anchor>
        </Link>
      </Stack>
    </Paper>
  );
}

function Completed() {
  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      miw={400}
      style={{ textAlign: "center" }}
    >
      <Title order={3} mb="md">
        パスワード再設定メールを送信しました。
      </Title>
      <Text>
        メール本文に記載されているリンクから、パスワードを再設定をお願いします。
      </Text>
      <Divider labelPosition="center" my="lg" />
      <Link href={`/sign-in`}>
        <Anchor component="button" type="button" c="dimmed">
          ログイン画面へ
        </Anchor>
      </Link>
    </Paper>
  );
}
