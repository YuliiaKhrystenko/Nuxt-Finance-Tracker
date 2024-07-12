export const useRedirectIfAuthenticated = (url = "/") => {
  const user = useSupabaseUser();

  watch(
    user,
    (user) => {
      if (user) {
        return navigateTo(url);
        console.log("You're logged in to your account!");
      }
    },
    { immediate: true }
  );
  return { user };
};
