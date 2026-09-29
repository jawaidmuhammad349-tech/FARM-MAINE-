type Props = {
  label: string;
  name: string;
  error?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  children?: React.ReactNode; // options for a <select>
};

export function Field({ label, name, error, type = "text", required, textarea, placeholder, children }: Props) {
  const id = `f-${name}`;
  const common = {
    id,
    name,
    required,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-err` : undefined,
  };
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children ? (
        <select {...common} defaultValue="">
          {children}
        </select>
      ) : textarea ? (
        <textarea rows={5} {...common} />
      ) : (
        <input type={type} {...common} />
      )}
      {error && (
        <p className="field-error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
