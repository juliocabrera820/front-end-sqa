import { useSelector } from "react-redux";

export const useUser = (history) => {
  const { currentUser, isLoading, redirectTo, token } = useSelector(
    (state) => state.auth
  );
  return { currentUser, isLoading, redirectTo, token };
};
