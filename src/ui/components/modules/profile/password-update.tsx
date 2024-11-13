"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { updatePassword } from "@/server/actions/auth";
import { PasswordField } from "@/ui/components/common/form/input-fields";
import { ErrorField } from "@/ui/components/common/form/error-field";
import classes from "./profile.module.scss";

export function PasswordUpdate() {
  const [state, formAction, pending] = useActionState(updatePassword, {});
  const formRef = useRef<HTMLFormElement>(null);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);

  function checkPassword() {
    if (formRef.current) {
      const password = formRef.current?.elements.namedItem(
        "currentPassword"
      ) as HTMLInputElement;
      const newPassword = formRef.current?.elements.namedItem(
        "newPassword"
      ) as HTMLInputElement;
      setIsPasswordFilled(
        password.value.length > 0 && newPassword.value.length > 0
      );
    }
  }

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className={classes.updateForm}
      onChange={checkPassword}
      ref={formRef}
    >
      <Label htmlFor="password">Password</Label>
      <div>
        <PasswordField field="currentPassword" placeHolder="Current password" />
        <ErrorField error={state.fieldErrors?.password?.[0]} />
      </div>

      <div>
        <PasswordField field="newPassword" placeHolder="New password" />
        <ErrorField error={state.fieldErrors?.newPassword?.[0]} />
      </div>

      <div className={classes.submission}>
        <ErrorField error={state.error} />
        <Button type="submit" loading={pending} disabled={!isPasswordFilled}>
          Update Password
        </Button>
      </div>
    </form>
  );
}
