export const useMessage = () => {
  const messageError = useState<string | null>("messageError", () => null);
  const messageSuccess = useState<string | null>("messageSuccess", () => null);

  return {
    messageError,
    messageSuccess,
  };
};
