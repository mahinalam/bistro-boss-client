import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMenu = () => {
  const { data: menu = [], refetch,isLoading: menuLoading=false } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      // const res = await axios.get(`${import.meta.env.VITE_API_URL}/menu`)
      // return res.data
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/menu`)
      return res.data
    }
  })
  return [menu, refetch,menuLoading]

};

export default useMenu;