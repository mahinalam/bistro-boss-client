import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import useAxiosSecure from "./useAxiosSecure"
import axios from "axios"

const useBooking = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const { data: bookings = [], refetch, isLoading: bookingsLoading = false } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings`)
            console.log(res.data)
            return res.data
        }
    })

    return [bookings,refetch,bookingsLoading]
}

export default useBooking

