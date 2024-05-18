// fetch api calls

const apiBaseUrl = 'https://your-api.com';

const makeApiCall = async (endpoint, method = 'GET', body = null) => {
  const url = `${apiBaseUrl}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        // You can include additional headers, such as authentication token
        // 'Authorization': `Bearer ${yourAuthToken}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
};

export { makeApiCall };
