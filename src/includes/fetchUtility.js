import axios from "axios";
export default async function fetchUtility(api, defaultValue) {
  try {
    const data = await axios(api);
    if (data && data.data) {
      return data.data;
    }
    return defaultValue;
  } catch (error) {
    // console.error(error);
    return defaultValue;
  }
}
