import { useSelector } from "react-redux";

export const useUser = (history) => {
  const { currentUser, isLoading, redirectTo } = useSelector((state) => state);
  return { currentUser, isLoading, redirectTo };
};
