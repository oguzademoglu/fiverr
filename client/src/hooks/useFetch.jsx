import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const BaseURL = 'http://localhost:8800/api'

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(BaseURL+url)
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [url])
    const reFetch = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(BaseURL+url)
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setIsLoading(false)
    }
    return { data, isLoading, error, reFetch }
}

export default useFetch;