import { API_HOST } from "../config/apiConfig";
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
    if (localStorage.token) {
      token = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    } else {
      token = { Authorization: `Bearer ${sessionStorage.getItem("token")}` };
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...token,
        ...headers,
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
    if (localStorage.token) {
      token = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    } else {
      token = { Authorization: `Bearer ${sessionStorage.getItem("token")}` };
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
    if (localStorage.token) {
      token = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    } else {
      token = { Authorization: `Bearer ${sessionStorage.getItem("token")}` };
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
// uploadService.js
async function uploadFileWithJson(endpoint, jsonData, file) {
  if (!file || file.length === 0) {
    throw new Error("No files provided!");
  }
  let token;
  if (localStorage.token) {
    token = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  } else {
    token = { Authorization: `Bearer ${sessionStorage.getItem("token")}` };
  }
  // Create FormData object
  const formData = new FormData();
  formData.append(
    "json",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );
  formData.append(`files`, file); // Using "files" as the key

  try {
    // Send POST request using fetch
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        ...token, // Merge the headers passed as argument with any default headers
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return the response JSON
    return await response.json();
  } catch (error) {
    console.error("Error during file upload:", error.message);
    throw error; // Rethrow the error for caller to handle
  }
}

export { uploadFileWithJson };

async function uploadMultiFileWithJson(endpoint, jsonData, files1, files2) {
  let token;
  if (localStorage.token) {
    token = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  } else {
    token = { Authorization: `Bearer ${sessionStorage.getItem("token")}` };
  }

  const formData = new FormData();
  formData.append(
    "json",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );
  formData.append(`bannerImage`, files1);
  formData.append(`thumbImage`, files2);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        ...token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during file upload:", error.message);
    throw error;
  }
}

export { uploadMultiFileWithJson };

async function updateMultiFileWithJson(endpoint, jsonData, files1, files2) {
    let token;
    if (localStorage.token) {
      token = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    } else {
      token = { Authorization: `Bearer ${sessionStorage.getItem("token")}` };
    }
  
    const formData = new FormData();
    formData.append(
      "json",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );
    if (files1) {
      formData.append("bannerImage", files1);
    }
    if (files2) {
      formData.append("thumbImage", files2);
    }
  
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT", // Use PUT or PATCH based on your API
        headers: {
          ...token,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error during file update:", error.message);
      throw error;
    }
  }
  
  export { updateMultiFileWithJson };
  