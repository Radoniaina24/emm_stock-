import { useQuery } from "@tanstack/react-query"
import { getProductsOptions } from "@/api/products"

export const productsOptionsKeys = {
  list: ["products", "options"] as const,
}

export function useProductsOptionsQuery() {
  return useQuery({
    queryKey: productsOptionsKeys.list,
    queryFn: () => getProductsOptions(),
  })
}