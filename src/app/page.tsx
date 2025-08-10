"use client";
import { Form } from "@/components/pages/scrape/Form";
import { Illustration } from "@/components/ui/Illustration";
import { VirtualizedJsonViewer } from "@/components/ui/VirtualizedJsonViewer";
import { useScrapeSSE } from "@/hooks/useScrapeSSE";
import { Actions } from "@/components/pages/scrape/Actions";
import { Summary } from "@/components/pages/scrape/Summary";

export default function Main() {
  const { products, isLoading, url, meta, start, stop } = useScrapeSSE();

  return (
    <div className="max-w-3xl mx-auto my-6">
      {!!products.length ? (
        <VirtualizedJsonViewer data={products} />
      ) : (
        <div className="mt-20 mb-16">
          <Illustration
            title="Welcome to eBay Scraper"
            message="This is a simple eBay scraper that allows you to search for products and view the results."
            imageSrc="/illustration-scraper.webp"
          />
        </div>
      )}
      <Summary products={products} url={url} meta={meta} />
      <Actions
        url={url}
        isLoading={isLoading}
        products={products}
        stop={stop}
      />
      <Form startScrape={start} stopScrape={stop} />
    </div>
  );
}
