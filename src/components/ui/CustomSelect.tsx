import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export const CustomSelect = ({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <label htmlFor={id} className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full bg-white rounded px-4 py-3 font-body-md text-on-surface border text-left flex items-center justify-between gap-2 transition-all duration-200 outline-none ${
          open
            ? "border-secondary ring-1 ring-secondary"
            : "border-outline-variant/40 hover:border-outline"
        }`}
      >
        <span className={value ? "text-on-surface" : "text-on-surface-variant/60"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-on-surface-variant transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-outline-variant/40 rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 font-body-md text-on-surface transition-colors duration-150 ${
                value === option
                  ? "bg-surface-container text-secondary font-semibold"
                  : "hover:bg-surface-container-low"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
