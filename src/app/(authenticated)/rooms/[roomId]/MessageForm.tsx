import { Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";
import { sendMessage } from "@/app/actions/rooms";

const schema = z.object({
  text: z.string().min(1).max(255),
});

export default function MessageForm({ roomId }: { roomId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      text: "",
    },
    validate: zodResolver(schema),
  });

  async function handleSendMessage(values: typeof form.values) {
    try {
      setIsLoading(true);
      await sendMessage({
        roomId,
        text: values.text,
      });

      form.reset();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSendMessage)}>
      <Textarea
        w="100%"
        minLength={1}
        maxLength={255}
        autosize
        {...form.getInputProps("text")}
      />
      <Button
        mt="xs"
        fullWidth
        type="submit"
        disabled={!form.values.text}
        loading={isLoading}
      >
        送信
      </Button>
    </form>
  );
}
