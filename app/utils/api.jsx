// src/utils/api.js
import axios from "axios";
const apiBaseUrl = 'https://dynamicpricing.expertvillagemedia.com/public/api'; // Replace with your API base URL

const apiRequest = async (endpoint, method = 'GET', data = null, headers = {}, params = {}) => {
  try {
    const options = {
      method,
      url: `${apiBaseUrl}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      params,
      data,
    };

    const response = await axios(options);

    return response.data;
  } catch (error) {
    console.error(`API request error in ${endpoint}`, error  );
    throw error;
  }
};

export default apiRequest;
