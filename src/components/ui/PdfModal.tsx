import { useEffect } from "react";
import { X, ExternalLink, Download } from "lucide-react";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export const PdfModal = ({ isOpen, onClose, pdfUrl, title }: PdfModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-outline-variant/30 bg-surface-container-low flex-shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[20px] text-magnet-red"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              description
            </span>
            <h3 className="font-headline-md text-base sm:text-lg text-primary">{title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-label-md text-on-surface hover:bg-surface-container transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Open in new tab</span>
            </a>

            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-label-md text-on-surface hover:bg-surface-container transition-colors"
              title="Download PDF"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors ml-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 w-full h-full bg-[#525659] relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&view=FitH`}
            title={title}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
