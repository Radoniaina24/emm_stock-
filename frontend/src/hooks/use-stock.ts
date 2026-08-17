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
  receptions: (query?: stockApi.ReceptionQuery) => ["stock", "receptions", query ?? {}] as const,
  reception: (id: string) => ["stock", "reception", id] as const,
  exits: (query?: stockApi.ExitQuery) => ["stock", "exits", query ?? {}] as const,
  exit: (id: string) => ["stock", "exit", id] as const,
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

export function useReceptionsQuery(query?: stockApi.ReceptionQuery) {
  return useQuery({
    queryKey: stockKeys.receptions(query),
    queryFn: () => stockApi.getReceptions(query),
  })
}

export function useReceptionQuery(id: string) {
  return useQuery({
    queryKey: stockKeys.reception(id),
    queryFn: () => stockApi.getReception(id),
    enabled: Boolean(id),
  })
}

export function useReceiveStockMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: stockApi.ReceptionInput) => stockApi.createReception(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: stockKeys.receptions() })
      invalidateStockLists(queryClient)
    },
  })
}

export function useExitsQuery(query?: stockApi.ExitQuery) {
  return useQuery({
    queryKey: stockKeys.exits(query),
    queryFn: () => stockApi.getExits(query),
  })
}

export function useExitQuery(id: string) {
  return useQuery({
    queryKey: stockKeys.exit(id),
    queryFn: () => stockApi.getExit(id),
    enabled: Boolean(id),
  })
}

export function useExitStockMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: stockApi.ExitInput) => stockApi.createExit(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: stockKeys.exits() })
      invalidateStockLists(queryClient)
    },
  })
}
