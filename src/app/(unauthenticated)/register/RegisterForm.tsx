"use client";

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Modal,
} from "@mantine/core";
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { zodResolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { match } from "ts-pattern";
import { z } from "zod";

import { Term } from "@/app/components/Term";
import { auth } from "@/app/lib/firebase";

const schema = z.object({
  name: z.string().min(1).max(16),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export function RegisterForm(props: PaperProps) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const [terms, toggleTerms] = useToggle();

  const [openedTerm, { open: openTerm, close: closeTerm }] =
    useDisclosure(false);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    try {
      setIsLoading(true);

      await createUserWithEmailAndPassword(auth, values.email, values.password);

      await updateProfile(auth.currentUser!, {
        displayName: values.name,
      });

      // NOTE:: createUserWithEmailAndPasswordで発行されたトークンにはupdateProfileで設定したdisplayNameが含まれていない。
      //        トークンのdisplayNameを参照するロジックがあるため、トークンを再発行しておく。
      await auth.currentUser!.getIdToken(true);

      notifications.show({
        title: "登録完了",
        message: "ユーザーの登録が完了しました。🎉",
      });

      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const message = match(e.code)
          .with(
            "auth/email-already-in-use",
            () => "このメールアドレスは既に使用されています。"
          )
          .with("auth/weak-password", () => "パスワードが弱すぎます。")
          .with("auth/invalid-email", () => "メールアドレスが無効です。")
          .otherwise(() => "登録に失敗しました。");

        notifications.show({
          color: "red",
          title: "登録失敗",
          message,
        });
      } else {
        throw e;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props} miw={350}>
      <Group justify="center" mb="xl">
        <Title order={2}>新規登録</Title>
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
          <TextInput
            name="email"
            required
            label="メールアドレス"
            placeholder="user@example.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />
          <PasswordInput
            name="password"
            autoComplete="on"
            required
            label="パスワード"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />
          <Group mt="sm" gap={6}>
            <Checkbox checked={terms} onChange={() => toggleTerms()} />
            <Text size="sm">
              <Anchor onClick={openTerm}>利用規約</Anchor>
              に同意
            </Text>
            <Modal
              opened={openedTerm}
              onClose={closeTerm}
              title="利用規約"
              size="xl"
            >
              <Term />
            </Modal>
          </Group>
        </Stack>

        <Group grow mb="md" mt="xl">
          <Button
            type="submit"
            radius="xl"
            loading={isLoading}
            disabled={!terms}
          >
            登録
          </Button>
        </Group>
      </form>
      <Divider label="その他" labelPosition="center" my="lg" />
      <Stack gap="xs">
        <Link href={`/sign-in`}>
          <Anchor component="button" type="button" c="dimmed" size="xs">
            すでにアカウントをお持ちですか？
          </Anchor>
        </Link>
      </Stack>
    </Paper>
  );
}
