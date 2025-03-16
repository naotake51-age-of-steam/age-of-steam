"use client";

import {
  Stack,
  Group,
  Paper,
  Title,
  TextInput,
  Button,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { z } from "zod";
import { auth } from "@/app/lib/firebase";

const schema = z.object({
  name: z.string().min(1).max(16),
});

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  if (!auth.currentUser) {
    throw new Error("User is not signed in");
  }

  const currentUser = auth.currentUser;

  const form = useForm({
    initialValues: {
      name: currentUser.displayName ?? "",
    },
    validate: zodResolver(schema),
  });

  async function handleSubmit(values: typeof form.values) {
    try {
      setIsLoading(true);

      await updateProfile(currentUser, {
        displayName: values.name,
      });

      notifications.show({
        title: "ユーザー名更新",
        message: "ユーザー名を更新しました。",
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        notifications.show({
          color: "red",
          title: "ユーザー名更新",
          message: "ユーザー名の更新に失敗しました。",
        });
      } else {
        throw e;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Center h="100%">
      <Paper radius="md" p="xl" withBorder miw={400}>
        <Group justify="center" mb="xl">
          <Title order={2}>ユーザー設定</Title>
        </Group>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              name="name"
              required
              label="名前"
              placeholder="蒸太郎"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name}
              radius="md"
            />
          </Stack>
          <Group grow mb="md" mt="xl">
            <Button type="submit" radius="xl" loading={isLoading}>
              更新
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
}
