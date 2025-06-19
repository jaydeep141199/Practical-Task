import React from "react";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

const EventForm = ({ date, onSubmit, onDelete, isEdit = false, initialValues = {} }) => {
  const formattedDate = date.toLocaleDateString();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: initialValues.title || "",
      start: initialValues.start || "",
      end: initialValues.end || "",
    },
    validate: {
      title: (value) => (value.trim() ? null : "Title is required"),
      start: (value) => (value ? null : "Start time is required"),
      end: (value, values) => {
        if (!value) return "End time is required";
        if (!values.start) return null;
        return value > values.start
          ? null
          : "End time must be after start time";
      },
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Title"
          placeholder="Enter event title"
          required
          {...form.getInputProps("title")}
        />
        <TextInput label="Date" value={formattedDate} disabled />
        <TimeInput label="Start Time" required {...form.getInputProps("start")} />
        <TimeInput label="End Time" required {...form.getInputProps("end")} />
        <Group position="apart" mt="md">
          <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
          {isEdit && (
            <Button color="red" onClick={onDelete}>
              Delete
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
};

export default EventForm;
