"use client";

import { useActionState, useState } from "react";
import serverAction from "./action";
import buttonStyles from "@/utils/styles/button";
import {
  helperTextStyles,
  inputStyles,
  labelStyles,
} from "@/utils/styles/input";
import { $Enums } from "@prisma/client";
import InputWrapper from "@/components/input-wrapper";
import { ChevronsUpDown } from "lucide-react";
import dayjs from "dayjs";
import { faculties, generateTimes } from "@/utils";
import Spinner from "@/components/spinner";

const days = [
  "2024-10-15",
  "2024-10-16",
  "2024-10-17",
  "2024-10-18",
  "2024-10-19",
  "2024-10-20",
];

const times = generateTimes("10:00", "17:00", 15);

export default function Page() {
  const [day, setDay] = useState<string>(days[0]);

  const [state, action, pending] = useActionState(serverAction, undefined);

  return (
    <form action={action} className="mt-6 flex w-full flex-col gap-5 md:w-auto">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="first-name" className={labelStyles({ required: true })}>
          First name
        </label>
        <input
          name="first-name"
          id="first-name"
          className={inputStyles({
            size: "sm",
            variant: state?.errors.firstName ? "error" : "primary",
          })}
        />
        {state?.errors.firstName ? (
          <p className={helperTextStyles({ error: true })}>
            {state?.errors.firstName}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="last-name" className={labelStyles({ required: true })}>
          Last name
        </label>
        <input
          name="last-name"
          id="last-name"
          className={inputStyles({
            size: "sm",
            variant: state?.errors.lastName ? "error" : "primary",
          })}
        />
        {state?.errors.lastName ? (
          <p className={helperTextStyles({ error: true })}>
            {state?.errors.lastName}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="phone-number"
          className={labelStyles({ required: true })}
        >
          Phone number
        </label>
        <input
          name="phone-number"
          id="phone-number"
          type="tel"
          pattern="01[0-9]{9}"
          className={inputStyles({
            size: "sm",
            variant: state?.errors.phoneNumber ? "error" : "primary",
          })}
        />
        {state?.errors.phoneNumber ? (
          <p className={helperTextStyles({ error: true })}>
            {state?.errors.phoneNumber}
          </p>
        ) : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="faculty" className={labelStyles({ required: true })}>
            Faculty
          </label>
          <InputWrapper size="sm" Icon={ChevronsUpDown}>
            <select
              name="faculty"
              id="faculty"
              className={inputStyles(
                {
                  size: "sm",
                  variant: state?.errors.faculty ? "error" : "primary",
                },
                "md:!w-[16.25rem]",
              )}
            >
              {Object.keys(faculties).map((faculty) => (
                <option value={faculty} key={faculty}>
                  {faculties[faculty as $Enums.Faculty]}
                </option>
              ))}
            </select>
          </InputWrapper>
          {state?.errors.faculty ? (
            <p className={helperTextStyles({ error: true })}>
              {state?.errors.faculty}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="council" className={labelStyles({ required: true })}>
            Council
          </label>
          <InputWrapper size="sm" Icon={ChevronsUpDown}>
            <select
              name="council"
              id="council"
              className={inputStyles(
                {
                  size: "sm",
                  variant: state?.errors.council ? "error" : "primary",
                },
                "md:!w-[16.25rem]",
              )}
            >
              {Object.values($Enums.Council).map((council) => (
                <option value={council} key={council}>
                  {council}
                </option>
              ))}
            </select>
          </InputWrapper>
          {state?.errors.council ? (
            <p className={helperTextStyles({ error: true })}>
              {state?.errors.council}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="day" className={labelStyles({ required: true })}>
            Day
          </label>
          <InputWrapper size="sm" Icon={ChevronsUpDown}>
            <select
              name="day"
              id="day"
              className={inputStyles(
                {
                  size: "sm",
                  variant: state?.errors.day ? "error" : "primary",
                },
                "md:!w-[16.25rem]",
              )}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {days
                .filter((day) => !dayjs(day).isBefore(dayjs(), "day"))
                .map((day) => (
                  <option value={day} key={day}>
                    {dayjs(day).format("dddd, MMMM D")}
                  </option>
                ))}
            </select>
          </InputWrapper>
          {state?.errors.day ? (
            <p className={helperTextStyles({ error: true })}>
              {state?.errors.day}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="time" className={labelStyles({ required: true })}>
            Time
          </label>
          <InputWrapper size="sm" Icon={ChevronsUpDown}>
            <select
              name="time"
              id="time"
              className={inputStyles(
                {
                  size: "sm",
                  variant: state?.errors.time ? "error" : "primary",
                },
                "md:!w-[16.25rem]",
              )}
            >
              {times
                .filter(
                  (time) =>
                    !dayjs(
                      `${dayjs(day).format("YYYY-MM-DD")} ${time}`,
                    ).isBefore(dayjs(), "minute"),
                )
                .map((time) => (
                  <option value={time} key={time}>
                    {dayjs(`1970-01-01 ${time}`).format("hh:mm A")}
                  </option>
                ))}
            </select>
          </InputWrapper>
          {state?.errors.time ? (
            <p className={helperTextStyles({ error: true })}>
              {state?.errors.time}
            </p>
          ) : null}
        </div>
      </div>
      {state?.errors.root ? (
        <p className={helperTextStyles({ error: true })}>
          {state?.errors.root}
        </p>
      ) : null}
      <button
        type="submit"
        className={buttonStyles(
          {
            variant: "primary",
            size: "lg",
          },
          "mt-1",
        )}
        disabled={pending}
      >
        {pending ? <Spinner size={20} /> : null}
        <span>Save</span>
      </button>
    </form>
  );
}
