"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/app/actions";
import { Field } from "@/components/Field";

const initial: FormState = { ok: false, message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="form-status ok" role="status">
        {state.message}
      </div>
    );
  }

  return (
    <form action={action} className="form-grid two">
      <Field label="Name" name="name" required error={state.errors?.name} />
      <Field label="Email" name="email" type="email" required error={state.errors?.email} />
      <div className="full">
        <Field label="Subject" name="subject" />
      </div>
      <div className="full">
        <Field label="Message" name="message" textarea required error={state.errors?.message} />
      </div>
      <div className="full">
        <button className="btn btn-primary" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.message && (
          <p className="form-status err" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
