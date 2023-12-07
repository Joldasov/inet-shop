import { useMutation } from "@tanstack/react-query";
import { $authHost, $api } from "../../services/Service";

interface IText {
  id: string;
}
export function useAddCart() {
  return useMutation(async (id: IText) => {
    const res = await $authHost.post("/users/cart", id);
    return res.data;
  });
}

export function useAddFavorite() {
  return useMutation(async (id: IText) => {
    const res = await $authHost.post("/users/favorites", id);
    return res.data;
  });
}

interface IBuy {
  items: [
    {
      id: string;
      amount: number;
    }
  ];
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
}
export function useBuy() {
  return useMutation(async (data: IBuy) => {
    const res = await $authHost.post("/users/order", data);
    return res.data;
  });
}

export function useDeleteCart() {
  return useMutation(async (id: IText) => {
    const res = await $authHost.delete(`users/cart?id=${id}`);
    return res.data;
  });
}

export function useDeleteOrder() {
  return useMutation(async (id: IText) => {
    const res = await $authHost.delete(`/users/order?id=${id}`);
    return res.data;
  });
}

interface ILogin {
  login: string;
  password: string;
}
export function useLogin() {
  return useMutation(async ({login, password}: ILogin) => {
    const res = await  $api.post('/users/login', {
      login: login, 
      password: password
    });
    localStorage.setItem('token', res.data.token)
    return res.data;
  });
}
interface IRegister{
  name: string,
  surname: string,
  login: string,
  password: string
}
export function useRegister() {
  return useMutation(async ({login, password, name, surname}: IRegister) => {
    const res = await  $api.post('/users/register', {
      name: name,
      surname: surname,
      login: login, 
      password: password
    });
   
    return res.data;
  });
}
