"use client";

import { useActionState } from "react";
import { submitShareEnquiry, type FormState } from "@/app/actions";
import { Field } from "@/components/Field";

const initial: FormState = { ok: false, message: "" };

export function ShareForm() {
  const [state, action, pending] = useActionState(submitShareEnquiry, initial);

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
      <Field label="Phone" name="phone" type="tel" />
      <Field label="Share size" name="share" required error={state.errors?.share}>
        <option value="" disabled>
          Choose one
        </option>
        <option value="Whole cow">Whole cow</option>
        <option value="Half cow">Half cow</option>
        <option value="Not sure yet">Not sure yet</option>
      </Field>
      <div className="full">
        <Field label="When would you like it?" name="timing" placeholder="e.g. this fall" />
      </div>
      <div className="full">
        <Field label="Questions or notes" name="message" textarea />
      </div>
      <div className="full">
        <button className="btn btn-primary" disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
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
