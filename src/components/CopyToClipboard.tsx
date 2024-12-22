import React, { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

interface CopyToClipboardProps {
  onCopy: () => Promise<void>;
}

export default function CopyToClipboard({ onCopy }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <ClipboardCopy className="w-4 h-4" />
          Copy to Spreadsheet
        </>
      )}
    </button>
  );
}