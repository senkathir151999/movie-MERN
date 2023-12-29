export const baseURL = "http://localhost:7007/v1";
export const getData = async (url = "", headers = {}) => {
  try {
    const response = await fetch(`${baseURL+url}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        
      },
    });
    const responseData = await response.json();
    if (responseData.statusCode === 401) {
     
      localStorage.clear();
      window.location = "/";
    }
    return responseData;
  } catch (e) {
    return e;
  }
};