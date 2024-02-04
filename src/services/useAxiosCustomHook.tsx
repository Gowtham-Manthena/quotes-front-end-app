import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface HttpServiceResponse<T = any>
{
    data?: T | null;
    error?: any;
    status?: number;
    message?: string;
}

export const useHttpService = () =>
{
    const [loading, setLoading] = useState("");

    const httpService = async <T = any>(
        method: HttpMethod,
        path: string,
        body: Record<string, any> = {},
        headers: Record<string, string> = {},
        responseType: 'arraybuffer' | undefined = undefined // Add responseType parameter
    ): Promise<HttpServiceResponse<T>> =>
    {
        const BASE_PATH = 'http://localhost:5000';

        const authToken = Cookies.get('authToken');

        try
        {
            // setLoading("check1");

            const axiosConfig: AxiosRequestConfig = {
                method,
                url: BASE_PATH + path,
                data: body,
                headers: {
                    ...headers,
                    mgtoken: authToken,
                },
                responseType
            };


            const response = await axios(axiosConfig);

            // setLoading("check2");

            return { ...response.data };
        } catch (error: any)
        {
            if (error.response)
            {
                // The request was made and the server responded with a status code
                return { data: null, error: error.response.data, status: error.response.status, message: error.response.data?.message };
            } else if (error.request)
            {
                console.log('102')
                // The request was made but no response was received
                return { data: null, message: 'No response received from the server' };
            } else
            {
                console.log('103')
                // Something happened in setting up the request that triggered an Error
                return { data: null, message: 'An error occurred while setting up the request' };
            }
        }
    };

    return { httpService, loading };
};
