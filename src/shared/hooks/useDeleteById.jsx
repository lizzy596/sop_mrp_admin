import { useQueryClient, useMutation } from "react-query";

const useDeleteById = (queryKey, deleteById) => {
  const queryClient = useQueryClient();
  return useMutation((id) => deleteById(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(queryKey);

      const previousValue = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) => ({
        ...old,
        results: [...old.results.filter((result) => result.id !== id)],
      }));

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(queryKey, previousValue),
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useDeleteById;
