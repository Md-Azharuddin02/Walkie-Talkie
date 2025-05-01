import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function useSendData(base_URL, data) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentData= useCallback(async (url, data)=> {
    setLoading(true)
    try{
      const response=await axios
      .post(url, {
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.status === 201) {
        throw new Error(`An error occour with status code ${response.status}`)
      }
      setLoading(false)
      return response
    }
    catch(error){
      setError(error || 'failed to fetch data')
    }
    finally{
      setLoading(false)
    }
    return response
  },[])


  return [loading, error, sentData];
}

export default useSendData;
