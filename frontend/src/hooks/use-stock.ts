import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import * as stockApi from "@/api/stock"

export const stockKeys = {
  all: ["stock"] as const,
  levels: (query?: stockApi.StockQuery) => ["stock", "levels", query ?? {}] as const,
  summary: () => ["stock", "summary"] as const,
  level: (id: string) => ["stock", "level", id] as const,
  moves: (query?: stockApi.StockMoveQuery) => ["stock", "moves", query ?? {}] as const,
  reorderRules: (query?: stockApi.ReorderRuleQuery) => ["stock", "reorder-rules", query ?? {}] as const,
  reorderRule: (id: string) => ["stock", "reorder-rule", id] as const,
}

export function useStockLevelsQuery(query?: stockApi.StockQuery) {
  return useQuery({
    queryKey: stockKeys.levels(query),
    queryFn: () => stockApi.getStockLevels(query),
  })
}

export function useStockSummaryQuery() {
  return useQuery({
    queryKey: stockKeys.summary(),
    queryFn: () => stockApi.getStockSummary(),
  })
}

export function useStockLevelQuery(id: string) {
  return useQuery({
    queryKey: stockKeys.level(id),
    queryFn: () => stockApi.getStockLevel(id),
    enabled: Boolean(id),
  })
}

function invalidateStockLists(queryClient: ReturnType<typeof useQueryClient>) {
  void queryClient.invalidateQueries({ queryKey: stockKeys.levels() })
  void queryClient.invalidateQueries({ queryKey: stockKeys.summary() })
  void queryClient.invalidateQueries({ queryKey: stockKeys.moves() })
}

export function useAdjustStockMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: stockApi.AdjustStockPayload }) =>
      stockApi.adjustStock(id, payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: stockKeys.level(variables.id) })
      invalidateStockLists(queryClient)
    },
  })
}

export function useStockMovesQuery(query?: stockApi.StockMoveQuery) {
  return useQuery({
    queryKey: stockKeys.moves(query),
    queryFn: () => stockApi.getStockMoves(query),
  })
}

export function useReorderRulesQuery(query?: stockApi.ReorderRuleQuery) {
  return useQuery({
    queryKey: stockKeys.reorderRules(query),
    queryFn: () => stockApi.getReorderRules(query),
  })
}

export function useReorderRuleQuery(id: string) {
  return useQuery({
    queryKey: stockKeys.reorderRule(id),
    queryFn: () => stockApi.getReorderRule(id),
    enabled: Boolean(id),
  })
}

export function useCreateReorderRuleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: stockApi.CreateReorderRulePayload) => stockApi.createReorderRule(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: stockKeys.reorderRules() })
    },
  })
}

export function useUpdateReorderRuleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: stockApi.UpdateReorderRulePayload }) =>
      stockApi.updateReorderRule(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: stockKeys.reorderRules() })
    },
  })
}

export function useDeleteReorderRuleMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => stockApi.deleteReorderRule(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: stockKeys.reorderRules() })
    },
  })
}

export function useTransferStockMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: stockApi.TransferStockPayload) => stockApi.transferStock(payload),
    onSuccess: () => {
      invalidateStockLists(queryClient)
    },
  })
}
