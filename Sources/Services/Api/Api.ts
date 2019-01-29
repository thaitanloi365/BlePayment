import Network from "../Network/Network";
export type NetworkPromiseResponse = Promise<NetworkResponse>;
export type NetworkResponse = {
  data: object;
  errorCode: number;
  errorMessage: string;
};

function login(email: string, password: string): NetworkPromiseResponse {
  const body = { email, password };
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest<NetworkResponse>("/app/api/login", "POST", body)
      .then(response => {
        const data = response.data;
        const { errorCode, errorMessage } = data;
        if (errorCode) {
          resolve({ data: response.data, errorCode, errorMessage });
        } else {
          resolve({ data: {}, errorCode, errorMessage });
        }
      })
      .catch(error => {
        reject("Login failed");
      });
  });
}

export default {
  login
};
