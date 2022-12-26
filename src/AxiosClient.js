import axios from "axios";
export async function getUsernameResponse(userName) {
  var resp;
  try {
    resp = await axios.get(
      `https://api.github.com/users/${userName}`
    );
  } catch (error) {
    resp = error.response;
    console.log("Axios request threw an error", error);
    console.log(error.response.status);
    console.log(error.response.data);
    console.log(error.response.headers);
  }
  return resp
}
