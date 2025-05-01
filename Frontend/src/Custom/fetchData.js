import React, { useEffect, useState } from "react";
import axios from "axios";


const useFetchData =  (base_URL) => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    console.log(loader)

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                setLoader(true);
                const response = await axios.get(url);
                if (!response.status === 200) {
                    throw new Error(`An error occour with status code ${response.status}`)
                }
                setData(response.data);
                setLoader(false)
            } catch (error) {
                 setError(error || 'failed to fetch data')
            }
            finally {
                setLoader(false);
            }
        }
        fetchData(base_URL)
    }, [])

    return [loader, error, data];
};
export default useFetchData



