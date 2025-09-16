import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useFetchData = (key: string, url: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });
};

export const usePostData = (url: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to post data');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useUpdateData = (url: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update data');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useDeleteData = (url: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};