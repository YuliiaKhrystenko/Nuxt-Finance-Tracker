export const useAppToast = () => {
  const toast = useToast();

  return {
    toastSuccess: ({ title, description = null }) => {
      toast.add({
        title,
        icon: "i-heroicons-check-circle",
        description,
        color: "green",
      });
    },
    toastError: ({ title, description = null }) => {
      toast.add({
        title,
        icon: "i-heroicons-exclamation-circle",
        description,
        color: "red",
      });
    },
  };
};
