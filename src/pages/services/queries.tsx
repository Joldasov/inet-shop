import { useQueries, useQuery } from "@tanstack/react-query";
import { $api, $authHost } from "../../services/Service";

export function useFetchGetUserInfo() {
  return useQuery(["userInfo"], async () => {
    const res = await $authHost.get("/users/userInfo");
    return res;
  });
}

export function useFetchCategories() {
  return useQuery(["categories"], async () => {
    const res = await $api.get("/categories");
    return res;
  });
}
interface ISearch {
  text: string;
}
export function useSearch({ text }: ISearch) {
  return useQuery(["search", text], async () => {
    const res = await $api.get(`/goods/search?text=${text}`);
    return res.data;
  });
}

interface IText {
  category: string;
  id: string;
  sort: string;
}
export function useFetchSubItems({ category, id, sort }: IText) {
  return useQuery(["subItems", category, id, sort], async () => {
    const res = await $api.get(
      `http://localhost:3004/goods/category/${id}/${category}?start=startPosition&count=20&sortBy=${sort}&reverse=boolean`
    );
    return res;
  });
}
interface IGetItem {
  id: string;
}
export function useFetchGetItem({ id }: IGetItem) {
  return useQuery(["subItems", id], async () => {
    const res = await $api.get(`/goods/item/${id}`);
    return res.data;
  });
}

interface Iitems {
  arr: string[];
  sort: string;
}

export function useGetItems({ arr, sort }: Iitems) {
  const userQueries = useQueries({
    queries: arr.map((id: string) => {
      return {
        queryKey: ["user", id, sort],
        queryFn: async () => {
          const res = await $api.get(
            `/goods/category/${id}?reverse=boolean&start=0&count=5&sortBy=${sort}`
          );
          return res;
        },
      };
    }),
  });
  return userQueries;
}

interface ICartItems {
  arr: string[];
}
export function useGetCartItems({ arr }: ICartItems) {
  const userQueries = useQueries({
    queries: arr.map((id: string) => {
      return {
        queryKey: ["user", id, arr],
        queryFn: async () => {
          const res = await $api.get(`/goods/item/${id}`);
          return res;
        },
      };
    }),
  });
  return userQueries;
}
