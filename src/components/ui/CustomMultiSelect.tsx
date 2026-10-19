import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface CustomMultiSelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (val: string[]) => void;
}

export const CustomMultiSelect = ({
  id,
  label,
  placeholder,
  options,
  value = [],
  onChange,
}: CustomMultiSelectProps) => {
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

  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="block font-label-sm text-label-sm text-on-surface-variant">
          {label}
        </label>
        {value.length > 0 && (
          <span className="font-label-sm text-[11px] text-magnet-red font-medium">
            {value.length} selected
          </span>
        )}
      </div>

      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`w-full min-h-[46px] bg-white rounded px-4 py-2 font-body-md text-on-surface border text-left flex items-center justify-between gap-2 transition-all duration-200 outline-none ${
          open
            ? "border-secondary ring-1 ring-secondary"
            : "border-outline-variant/40 hover:border-outline"
        }`}
      >
        <div className="flex-grow overflow-hidden">
          {value.length === 0 ? (
            <span className="text-on-surface-variant/60">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1.5 items-center">
              {value.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-surface-container text-on-surface font-medium border border-outline-variant/40"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-on-surface-variant transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-outline-variant/40 rounded-lg shadow-lg overflow-hidden divide-y divide-outline-variant/20">
          <div className="p-1">
            {options.map((option) => {
              const isChecked = value.includes(option);
              return (
                <div
                  key={option}
                  onClick={() => handleToggle(option)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded cursor-pointer transition-colors duration-150 select-none ${
                    isChecked ? "bg-surface-container/60" : "hover:bg-surface-container-low"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                      isChecked
                        ? "bg-magnet-red border-magnet-red text-white"
                        : "border-outline-variant/70 bg-white"
                    }`}
                  >
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span
                    className={`font-body-md text-sm text-on-surface ${
                      isChecked ? "font-medium text-secondary" : ""
                    }`}
                  >
                    {option}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="px-3 py-2 bg-surface-container-lowest flex items-center justify-between text-xs font-label-sm">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-magnet-red hover:underline font-medium"
            >
              {value.length === options.length ? "Deselect All" : "Select All"}
            </button>
            {value.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange([]);
                }}
                className="text-on-surface-variant hover:text-on-surface"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
