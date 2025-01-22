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



const uploadFileWithJson = async (endpoint, jsonData, files) => {
  if (!files || !(files instanceof FileList || files instanceof File)) {
    throw new Error("No valid file provided!");
  }

  let token = localStorage.token
    ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
    : { Authorization: `Bearer ${sessionStorage.getItem("token")}` };

  const formData = new FormData();
  formData.append(
    "json",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );

  // Add the file (only the first file if it's a FileList)
  if (files instanceof FileList) {
    formData.append("files", files[0]); // Backend expects a single file
  } else {
    formData.append("files", files); // Single file
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { ...token },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during file upload:", error.message);
    throw error;
  }
};
export { uploadFileWithJson };


const updateFileWithJson = async (endpoint, jsonData, files) => {

  let token = localStorage.token
    ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
    : { Authorization: `Bearer ${sessionStorage.getItem("token")}` };

  const formData = new FormData();
  formData.append(
    "json",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );

  if (files instanceof FileList) {
    formData.append("files", files[0]); 
  } else {
    formData.append("files", files); 
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT", 
      headers: { ...token },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during file upload:", error.message);
    throw error;
  }
};
export { updateFileWithJson };



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
