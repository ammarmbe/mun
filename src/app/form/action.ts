"use server";

import * as v from "valibot";
import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

const schema = v.object({
  name: v.string("Name is required"),
  phoneNumber: v.pipe(
    v.string("Phone number is required"),
    v.minLength(11, "Phone number must be 11 characters"),
  ),
  faculty: v.picklist(
    Object.values($Enums.Faculty),
    "Faculty must be one of the options",
  ),
  council: v.picklist(
    Object.values($Enums.Council),
    "Council must be one of the options",
  ),
  day: v.string("Day is required"),
  time: v.string("Time is required"),
});

type FormState = {
  errors: Record<keyof typeof schema.entries | "root", string>;
};

export default async function action(
  _: FormState | undefined,
  formData: FormData,
) {
  const data = v.safeParse(schema, {
    name: formData.get("name"),
    phoneNumber: formData.get("phone-number"),
    faculty: formData.get("faculty"),
    council: formData.get("council"),
    day: formData.get("day"),
    time: formData.get("time"),
  });

  if (!data.success) {
    return {
      errors: Object.fromEntries(
        data.issues.map(({ path, message }) => [path?.[0]?.key, message]),
      ),
    } as FormState;
  }

  if (dayjs(data.output.day).isBefore(dayjs(), "day")) {
    return {
      errors: {
        day: "Day can't be before today",
      },
    } as FormState;
  }

  if (
    dayjs(`${data.output.day} ${data.output.time}`).isBefore(dayjs(), "minute")
  ) {
    return {
      errors: {
        time: "Time can't be before now",
      },
    } as FormState;
  }

  await prisma.interview.create({
    data: {
      delegate: {
        create: {
          name: data.output.name,
          phoneNumber: data.output.phoneNumber,
          council: data.output.council,
          faculty: data.output.faculty,
          status: "PENDING",
        },
      },
      date: dayjs(`${data.output.day} ${data.output.time}`).toDate(),
    },
  });

  redirect("/success");
}
