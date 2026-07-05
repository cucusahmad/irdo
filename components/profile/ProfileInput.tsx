interface Props {
  label: string;
  name: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
}

export default function ProfileInput({
  label,
  name,
  value,
  onChange,
  required,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {required && (
          <span className="text-red-400"> *</span>
        )}
      </label>

      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
      />
    </div>
  );
}