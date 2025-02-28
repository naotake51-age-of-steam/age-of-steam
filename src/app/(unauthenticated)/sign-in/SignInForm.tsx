"use client";

import {
  Anchor,
  Button,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { zodResolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { GoogleButton } from "@/app/components/GoogleButton";
import { auth } from "@/firebase";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export function SignInForm(props: PaperProps) {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(auth, values.email, values.password);

      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        notifications.show({
          color: "red",
          title: "ログイン失敗",
          message:
            "ログインに失敗しました。メールアドレスかパスワードに誤りがあります。",
        });
      } else {
        throw e;
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        login_hint: "user@example.com",
      });

      await signInWithPopup(auth, provider);

      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const ignoreCodes = [
          "auth/popup-closed-by-user",
          "auth/cancelled-popup-request",
        ];
        if (!ignoreCodes.includes(e.code)) {
          notifications.show({
            color: "red",
            title: "ログイン失敗",
            message: "ログインに失敗しました。",
          });
        }
      } else {
        throw e;
      }
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props} miw={400}>
      <Group justify="center" mb="xl">
        <Title order={2}>ログイン</Title>
      </Group>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={handleGoogleSignIn}>
          Google
        </GoogleButton>
      </Group>

      <Divider label="またはメールで続行" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
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
        </Stack>

        <Group grow mb="md" mt="xl">
          <Button type="submit" radius="xl" w="80%" loading={isLoading}>
            ログイン
          </Button>
        </Group>
      </form>

      <Divider label="その他" labelPosition="center" my="lg" />

      <Stack>
        <Link href={`/forget-password`}>
          <Anchor component="button" type="button" c="dimmed" size="xs">
            パスワードをお忘れですか？
          </Anchor>
        </Link>
        <Link href={`/register`}>
          <Anchor component="button" type="button" c="dimmed" size="xs">
            まだアカウントをお持ちでないですか？
          </Anchor>
        </Link>
      </Stack>
    </Paper>
  );
}
