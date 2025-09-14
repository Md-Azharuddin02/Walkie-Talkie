import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (base_URL) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); 

  useEffect(() => {
    const fetchData = async (url) => {
      setLoader(true);
      try {
        const response = await fetch(url, {
          credentials: "include",
           mode: 'cors',
        });

        // console.log("Fetch response:", response);
        if (response.status !== 200) {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
        const responseData = await response.json();
        if (!responseData) {
          throw new Error("No data found (possibly user not in DB)");
        }

        setData(responseData);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "User not found."
            : err.message || "Failed to fetch data"
        );
        setData(null); // Reset data if error occurs
      } finally {
        setLoader(false);
      }
    };

    if (base_URL) {
      fetchData(base_URL);
    }
  }, [base_URL]);

  return [loader, error, data];
};

export default useFetchData;
