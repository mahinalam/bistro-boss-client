import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import useAxiosSecure from "./useAxiosSecure"

const useCart = () => {
    const { user,isLoading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
   

    const { data: cart = [], refetch,isLoading: cardLoading = false } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data;

        }
    })
    return [cart, refetch,cardLoading]





}
export default useCart