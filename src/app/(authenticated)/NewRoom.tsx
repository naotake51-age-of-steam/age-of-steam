"use client";

import { Button, Modal, TextInput, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";
import { createRoom } from "@/app/actions/rooms";

const schema = z.object({
  name: z.string().min(1).max(255),
});

export function NewRoom() {
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  function handleNewRoom() {
    openModal();
  }

  async function handleCreateRoom(values: typeof form.values) {
    setIsLoading(true);

    try {
      const response = await createRoom(values);

      notifications.show({
        color: response.status === "success" ? "teal" : "red",
        title: response.title,
        message: response.message,
      });

      form.reset();

      closeModal();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button variant="outline" onClick={handleNewRoom}>
        新規ルーム
      </Button>
      <Modal opened={openedModal} onClose={closeModal} title="新規ルーム">
        <form onSubmit={form.onSubmit(handleCreateRoom)}>
          <Stack>
            <TextInput
              data-autofocus
              required
              label="名前"
              placeholder="蒸気会"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name}
              radius="md"
            />
          </Stack>
          <Group justify="end" mb="md" mt="xl">
            <Button type="submit" loading={isLoading}>
              作成
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
