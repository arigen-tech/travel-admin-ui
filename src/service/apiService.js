import {API_HOST} from "../config/apiConfig"
const BASE_URL = API_HOST;

/**
 * Function to call GET API
 * @param {string} endpoint - The API endpoint
 * @param {object} headers - Optional headers
 * @returns {Promise<object>} - API response
 */
export const getRequest = async (endpoint, headers = {}) => {
    try {
        let token;
        if(localStorage.token){
            token={"Authorization":`Bearer ${localStorage.getItem('token')}`};
        }
        else{
            token={"Authorization":`Bearer ${sessionStorage.getItem('token')}`};
        }
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...token,...headers,
            },
        });
        if (!response.ok) {
            throw new Error(`GET request failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("GET Error:", error);
        throw error;
    }
};

/**
 * Function to call POST API
 * @param {string} endpoint - The API endpoint
 * @param {object} data - Request body
 * @param {object} headers - Optional headers
 * @returns {Promise<object>} - API response
 */
export const postRequest = async (endpoint, data, headers = {}) => {
    try {
        let token;
        if(localStorage.token){
            token={"Authorization":`Bearer ${localStorage.getItem('token')}`};
        }
        else{
            token={"Authorization":`Bearer ${sessionStorage.getItem('token')}`};
        }
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...token,
                ...headers,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`POST request failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST Error:", error);
        throw error;
    }
};

/**
 * Function to call PUT API
 * @param {string} endpoint - The API endpoint
 * @param {object} data - Request body
 * @param {object} headers - Optional headers
 * @returns {Promise<object>} - API response
 */
export const putRequest = async (endpoint, data, headers = {}) => {
    try {
        let token;
        if(localStorage.token){
            token={"Authorization":`Bearer ${localStorage.getItem('token')}`};
        }
        else{
            token={"Authorization":`Bearer ${sessionStorage.getItem('token')}`};
        }
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...token,
                ...headers,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`PUT request failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("PUT Error:", error);
        throw error;
    }
};
