import { IMeta, IProduct } from "@/types/product";

interface SummaryProps {
  url: string;
  meta: IMeta | null;
  products: IProduct[];
}

export const Summary: React.FC<SummaryProps> = ({ products, url, meta }) => {
  return (
    <>
      {!!products.length && !!url && (
        <div className="flex items-center justify-center gap-3 my-2">
          <pre className="text-xs">Scraped pages count: {meta?.page}</pre>
          <pre className="text-xs">|</pre>
          <pre className="text-xs">
            Number of items scraped: {products.length}
          </pre>
        </div>
      )}
    </>
  );
};
