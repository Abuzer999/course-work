export const usePhoto = () => {
  const preview = useState<string | null>("preview", () => null);

  return {
    preview,
  };
};
