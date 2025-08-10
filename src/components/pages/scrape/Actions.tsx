import { IProduct } from "@/types/product";
import { Loader } from "../../ui/Loader";
import { Button } from "../../ui/Button";
import { CopyButton } from "../../ui/CopyButton";
import { DownloadButton } from "../../ui/DownloadButton";
import { downloadJson } from "@/utils/download";
import { copyJsonToClipboard } from "@/utils/copy";
import { useState } from "react";

interface ActionsProps {
  url: string;
  isLoading: boolean;
  products: IProduct[];
  stop: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  url,
  isLoading,
  products,
  stop,
}) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const fileName = `scrape-${url}.json`;
    console.log(fileName);

    downloadJson(products, fileName);
  };

  const handleCopy = async () => {
    const success = await copyJsonToClipboard(products);
    setCopied(success);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center gap-2 mt-2">
          <Loader />
          <Button size="sm" onClick={stop}>
            Stop Processing
          </Button>
        </div>
      )}
      {!isLoading && !!products.length && (
        <div className="flex justify-center gap-2 mt-2">
          <CopyButton onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </CopyButton>
          <DownloadButton onClick={handleDownload} />
        </div>
      )}
    </>
  );
};
