import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useReview = () => {
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`)
            console.log(res.data)
            return res.data
        }
    })

    return [reviews, refetch]
}

export default useReview;