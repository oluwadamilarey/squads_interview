import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useViewMode = () =>
  useAppSelector((state: any) => state.ui.viewMode);
export const useFilters = () =>
  useAppSelector((state: any) => state.ui.filters);
export const useSelectedMarket = () =>
  useAppSelector((state: any) => state.ui.selectedMarket);

export const useApiState = () => {
  const { isLoading, isError, isFetching } = useAppSelector((state: any) => {
    const apiState = state.squadsApi;
    return {
      isLoading: Object.values(apiState.queries).some(
        (query: any) => query?.status === "pending"
      ),
      isError: Object.values(apiState.queries).some(
        (query: any) => query?.status === "rejected"
      ),
      isFetching: Object.values(apiState.queries).some(
        (query: any) => query?.status === "pending"
      ),
    };
  });

  return { isLoading, isError, isFetching };
};
