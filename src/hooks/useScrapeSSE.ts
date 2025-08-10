import { IMeta, IProduct } from "@/types/product";
import { useState, useRef, useCallback, useEffect } from "react";

export const useScrapeSSE = () => {
  const [meta, setMeta] = useState<IMeta | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const eventSourceRef = useRef<EventSource | null>(null);

  const start = useCallback((url: string) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setUrl(url);
    setMeta(null);
    setProducts([]);
    setDone(false);
    setIsLoading(true);

    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.addEventListener("meta", (event: MessageEvent) => {
      try {
        setMeta(JSON.parse(event.data));
      } catch (err) {
        console.error("meta parse error", err);
      }
    });

    es.addEventListener("batch", (event: MessageEvent) => {
      try {
        const batch: IProduct[] = JSON.parse(event.data);
        setProducts((prev) => [...prev, ...batch]);
      } catch (err) {
        console.error("batch parse error", err);
      }
    });

    es.addEventListener("done", () => {
      setDone(true);
      setIsLoading(false);
      es.close();
      eventSourceRef.current = null;
    });

    es.onerror = () => {
      setIsLoading(false);
      es.close();
      eventSourceRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setDone(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, []);

  return { meta, products, done, isLoading, url, start, stop };
};
