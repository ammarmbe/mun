"use server";

import * as v from "valibot";
import prisma from "@/utils/db";
import { $Enums } from "@prisma/client";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { sendNotification } from "@/utils/server";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const schema = v.object({
  name: v.string("Name is required"),
  phoneNumber: v.pipe(
    v.string("Phone number is required"),
    v.trim(),
    v.minLength(10, "Phone number must be correct"),
    v.maxLength(13, "Phone number must be correct"),
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

  if (
    dayjs(data.output.day)
      .tz("Africa/Cairo")
      .isBefore(dayjs().tz("Africa/Cairo"), "day")
  ) {
    return {
      errors: {
        day: "Day can't be before today",
      },
    } as FormState;
  }

  if (
    dayjs(`${data.output.day} ${data.output.time}`)
      .tz("Africa/Cairo")
      .isBefore(dayjs().tz("Africa/Cairo"), "minute")
  ) {
    return {
      errors: {
        time: "Time can't be before now",
      },
    } as FormState;
  }

  if (
    !(
      data.output.phoneNumber.startsWith("01") &&
      data.output.phoneNumber.length === 11
    ) &&
    !(
      data.output.phoneNumber.startsWith("1") &&
      data.output.phoneNumber.length === 10
    ) &&
    !(
      data.output.phoneNumber.startsWith("+20") &&
      data.output.phoneNumber.length === 13
    )
  ) {
    return {
      errors: {
        phoneNumber: "Phone number must be correct",
      },
    } as FormState;
  }

  const interview = await prisma.interview.create({
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
      date: dayjs(`${data.output.day} ${data.output.time}`)
        .tz("Africa/Cairo")
        .toDate(),
    },
  });

  const users = await prisma.user.findMany({
    where: {
      council: data.output.council,
    },
    select: {
      id: true,
      notificationSubscription: true,
      newInterviewNotification: true,
    },
  });

  for (const user of users) {
    if (user.newInterviewNotification && user.notificationSubscription) {
      await sendNotification({
        subscription: user.notificationSubscription,
        name: data.output.name,
        date: dayjs(`${data.output.day} ${data.output.time}`)
          .tz("Africa/Cairo")
          .toDate(),
        type: "NEW",
      });
    }

    await prisma.notification.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        interview: {
          connect: {
            id: interview.id,
          },
        },
        title: "New interview",
        body: `You have an interview with ${data.output.name} on ${dayjs(
          `${data.output.day} ${data.output.time}`,
        )
          .tz("Africa/Cairo")
          .format("dddd, MMMM DD")} at ${dayjs(
          `${data.output.day} ${data.output.time}`,
        )
          .tz("Africa/Cairo")
          .format("hh:mm A")}`,
      },
    });
  }

  redirect("/success");
}
