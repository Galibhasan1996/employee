import axios from "axios"


export const PORT = 223
export const BASE_URL = `http://192.168.187.${PORT}:3000/api/v1/`
export const AUTH = "auth"
export const ATTENDANCE = "Attendance"


export const getAllTypeDATA = async (method, endPoint, url, data = null) => {
    try {
        let response;
        if (method === 'GET') {
            response = await axios.get(`${BASE_URL}${endPoint}/${url}`);
        } else if (method === 'POST') {
            response = await axios.post(`${BASE_URL}${endPoint}/${url}`, data);
        } else {
            throw new Error('Invalid HTTP method');
        }
        return response.data;
    } catch (error) {
        console.log("🚀 ~ file: server.js:22 ~ getAllTypeDATA ~ error:", error.message)
        throw error; // Re-throw the error to handle it outside
    }
};


export const styleConsole = (message, data) => {
    const now = new Date().toLocaleTimeString();
    console.log(`\x1b[31m ${message} ${now} \x1b[0m`, data);
}


