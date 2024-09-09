import { useState, useCallback, useEffect } from "react";

const useCopyToClipboard = (resetInterval = 2000) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      setCopyError("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setCopyError(null);

      return true;
    } catch (error) {
      setIsCopied(false);
      setCopyError("Failed to copy text");

      return false;
    }
  }, []);

  useEffect(() => {
    if (isCopied || copyError) {
      const timer = setTimeout(() => {
        setIsCopied(false);
        setCopyError(null);
      }, resetInterval);

      return () => clearTimeout(timer);
    }
  }, [isCopied, copyError, resetInterval]);

  return { isCopied, copyError, copyToClipboard };
};

export default useCopyToClipboard;
