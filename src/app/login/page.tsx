"use client";

import { useActionState } from "react";
import serverAction from "./action";
import buttonStyles from "@/utils/styles/button";
import {
  helperTextStyles,
  inputStyles,
  labelStyles,
} from "@/utils/styles/input";
import Spinner from "@/components/spinner";

export default function Page() {
  const [state, action, pending] = useActionState(serverAction, undefined);

  return (
    <form action={action} className="mt-6 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className={labelStyles({ required: true })}>
          Username
        </label>
        <input
          name="username"
          id="username"
          className={inputStyles({
            size: "sm",
            variant: state?.errors.username ? "error" : "primary",
          })}
        />
        {state?.errors.username ? (
          <p className={helperTextStyles({ error: true })}>
            {state?.errors.username}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className={labelStyles({ required: true })}>
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          className={inputStyles({
            size: "sm",
            variant: state?.errors.password ? "error" : "primary",
          })}
        />
        {state?.errors.password ? (
          <p className={helperTextStyles({ error: true })}>
            {state?.errors.password}
          </p>
        ) : null}
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
        <span>Sign in</span>
      </button>
    </form>
  );
}
