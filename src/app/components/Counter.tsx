import { Button, Group, NumberInput } from "@mantine/core";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

export function Counter({ value, onChange, min, max }: CounterProps) {
  return (
    <Group gap="xs">
      <Button
        onClick={() => onChange(value - 1)}
        variant="default"
        disabled={value <= min}
      >
        -
      </Button>
      <NumberInput
        min={min}
        max={max}
        value={value}
        onChange={(value) =>
          onChange(typeof value === "number" ? value : parseInt(value))
        }
        readOnly
      />
      <Button
        onClick={() => onChange(value + 1)}
        variant="default"
        disabled={value >= max}
      >
        +
      </Button>
    </Group>
  );
}
