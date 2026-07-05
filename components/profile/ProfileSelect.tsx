interface Option {
  value: string | number;
  label: string;
}

interface Props {
  label: string;
  name: string;
  value?: string | number;
  options: Option[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  required?: boolean;
}

export default function ProfileSelect({
  label,
  name,
  value,
  options,
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

      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
      >
        <option value="" className="bg-slate-900">
          -- Select Competition --
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-slate-900"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}