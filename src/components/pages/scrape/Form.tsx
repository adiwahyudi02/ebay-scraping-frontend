import React from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../../ui/Button";

const defaultValues: QueryType = {
  getAll: false,
  scrapeDetails: false,
  search: "nike",
  page: 1,
  size: 10,
};

export const querySchema = z.object({
  getAll: z.boolean().optional(),
  scrapeDetails: z.boolean().optional(),
  search: z.string().optional(),

  page: z.union([z.string(), z.number().min(1)]),
  size: z.union([z.string(), z.number().min(1).max(240)]),
});

export type QueryType = z.infer<typeof querySchema>;

interface IForm {
  startScrape: (url: string) => void;
  stopScrape: () => void;
}

export const Form: React.FC<IForm> = ({ startScrape }) => {
  const { control, handleSubmit, watch, setValue } = useForm<QueryType>({
    resolver: zodResolver(querySchema),
    defaultValues,
  });

  const onSubmit = async (data: QueryType) => {
    const params = new URLSearchParams();

    if (data.getAll) {
      params.append("getAll", String(data.getAll));
      params.append("size", String(data.size));
    } else {
      params.append("page", String(data.page));
      params.append("size", String(data.size));
    }

    if (data.scrapeDetails) {
      params.append("scrapeDetails", String(data.scrapeDetails));
    }

    if (data.search) {
      params.append("search", data.search);
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined");
    }

    const url = `${baseUrl}/api/scrape?${params.toString()}`;
    startScrape(url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl fixed bottom-12 left-1/2 transform -translate-x-1/2"
    >
      <div className="flex gap-4 justify-between items-center">
        <div className="flex-1">
          <Input
            value={`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${watch(
              "search"
            )}&_sacat=0&rt=nc&_pgn=${watch("page")}&_ipg=${watch("size")}`}
            disabled
            className="py-5"
          />
        </div>

        <Button type="submit" size="md" className="!rounded-4xl">
          Scrape
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-3 justify-between items-start gap-2 pb-3">
        <Controller
          name="search"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} label="Search" error={error?.message} />
          )}
        />
        <Controller
          name="page"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label="Pagination"
              type="number"
              error={error?.message}
              disabled={watch("getAll")}
            />
          )}
        />
        <Controller
          name="size"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label="Per Page"
              type="number"
              error={error?.message}
              disabled={watch("getAll")}
            />
          )}
        />
      </div>

      <div className="mt-4 ml-2">
        <Controller
          name="getAll"
          control={control}
          render={({ field }) => (
            <Checkbox
              label={
                <>
                  Get all products across all paginations.{" "}
                  <span className="font-bold text-amber-400">
                    It will be fast if the Scrape Details Checkbox is unchecked!
                  </span>
                </>
              }
              checked={field.value}
              onChange={() => {
                field.onChange(!field.value);
                if (!field.value) {
                  setValue("page", "");
                  setValue("size", "");
                } else {
                  setValue("page", 1);
                  setValue("size", 10);
                }
              }}
            />
          )}
        />
      </div>

      <div className="mt-4 ml-2">
        <Controller
          name="scrapeDetails"
          control={control}
          render={({ field }) => (
            <Checkbox
              label={
                <>
                  Scrape the detail page to get the product description?{" "}
                  <span className="font-bold text-red-400">
                    Important, this will take a long time to scrape!
                  </span>
                </>
              }
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </form>
  );
};
