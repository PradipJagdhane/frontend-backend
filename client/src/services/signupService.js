// const signKey = process.env.REACT_APP_SIGN_API_KEY;

import AppDataService from "./AppDataService"

// const signupService = async (signupData) => {
//   const response = await fetch(`${signKey}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(signupData),
//   });

//   console.log("response from sigh up seriv=ces::::");
//   const data = await response.json();
//   return data;
// };

// export default signupService;


const signupService = async (signupData) => {
  const response = await AppDataService.post('signup', signupData);
  console.log("response from DataSErvices", response);
  return response;
};

export default signupService;
