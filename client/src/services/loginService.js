import axios from "axios";

const loginKey = process.env.REACT_APP_LOGIN_API_KEY;

const loginService = async (email, password) => {
  const response = await axios.post(
    `${loginKey}`,
    {
      email,
      password,
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer token',
      },
    }
  );
  console.log("response from login servicesssss..//./.,", response);

  return response.data;
};

export default loginService;
