import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Util/constent/Toast/server';

const useFetch_GET_POST = (method, url, router, postData = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                let response;

                if (method === 'GET') {
                    response = await axios.get(`${BASE_URL}${router}/${url}`);
                } else if (method === 'POST') {
                    response = await axios.post(`${BASE_URL}${router}/${url}`, postData);
                } else {
                    throw new Error('Invalid HTTP method');
                }

                setData(response.data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (method && url) {
            fetchData();
        } else {
            setLoading(false);
            setError('Method and URL must be provided');
        }

    }, [method, url, postData]);

    return { data, loading, error };
};

export default useFetch_GET_POST;
