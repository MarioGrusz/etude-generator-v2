"use client";

import { useFormStatus, useFormState } from "react-dom";
import { login } from "./actions";
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <section className={styles.container}>
      <form action={formAction} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles.errorWrapper}>
          {state?.errors?.email && (
            <p className={styles.textRed}>{state.errors.email}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={styles.errorWrapper}>
          {state?.errors?.password && (
            <p className={styles.textRed}>{state.errors.password}</p>
          )}
        </div>

        <SubmitButton />
      </form>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.submitButton} disabled={pending} type="submit">
      Login
    </button>
  );
}

export default LoginForm;
