import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useViewMode = () =>
  useAppSelector((state: RootState) => state.ui.viewMode);

export const useFilters = () =>
  useAppSelector((state: RootState) => state.ui.filters);

export const useSelectedMarket = () =>
  useAppSelector((state: RootState) => state.ui.selectedMarket);

export const useApiState = () => {
  //const apiState = useAppSelector((state: RootState) => state.squadsApi);

  const { isLoading, isError, isFetching } = useAppSelector(
    (state: RootState) => {
      const queries = state.squadsApi.queries || {};

      // Type-safe query status checking
      const queryEntries = Object.values(queries) as Array<{
        status?: "pending" | "fulfilled" | "rejected";
        error?: unknown;
      }>;

      return {
        isLoading: queryEntries.some((query) => query.status === "pending"),
        isError: queryEntries.some((query) => query.status === "rejected"),
        isFetching: queryEntries.some((query) => query.status === "pending"),
      };
    }
  );

  return { isLoading, isError, isFetching };
};

export const useUIState = () => useAppSelector((state: RootState) => state.ui);

export const useQueryState = (queryName: string) => {
  return useAppSelector((state: RootState) => {
    const query = state.squadsApi.queries?.[queryName] as
      | {
          status?: "pending" | "fulfilled" | "rejected";
          error?: unknown;
          data?: unknown;
        }
      | undefined;

    return {
      isLoading: query?.status === "pending",
      isError: query?.status === "rejected",
      error: query?.error,
      data: query?.data,
    };
  });
};

export const useActiveQueries = () => {
  return useAppSelector((state: RootState) => {
    const queries = state.squadsApi.queries || {};
    const activeQueries = Object.keys(queries).filter((key) => {
      const query = queries[key] as { status?: string };
      return query.status === "pending";
    });

    return {
      activeQueries,
      hasActiveQueries: activeQueries.length > 0,
      activeCount: activeQueries.length,
    };
  });
};

export const useApiErrors = () => {
  return useAppSelector((state: RootState) => {
    const queries = state.squadsApi.queries || {};
    const errors: Array<{ queryName: string; error: unknown }> = [];

    Object.entries(queries).forEach(([queryName, query]) => {
      const typedQuery = query as { status?: string; error?: unknown };
      if (typedQuery.status === "rejected" && typedQuery.error) {
        errors.push({ queryName, error: typedQuery.error });
      }
    });

    return {
      errors,
      hasErrors: errors.length > 0,
      errorCount: errors.length,
    };
  });
};

// Type-safe selector for accessing specific parts of state
export const useStateSelector = <T>(selector: (state: RootState) => T): T => {
  return useAppSelector(selector);
};
