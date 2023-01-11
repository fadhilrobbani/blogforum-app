import { baseURL } from './base-url';

type CreateResponse = {
  success: boolean;
  payload?: any;
  message?: string;
};
const api = (() => {
  const createResponse = ({ success, payload, message }: CreateResponse) => {
    return {
      success,
      payload,
      message,
    };
  };

  const getAllUsers = async () => {
    const res = await fetch(`${baseURL}/api/users`);
    const { success, payload } = await res.json();
    if (!success) {
      return null;
    }
    return payload;
  };
  return {
    createResponse,
    getAllUsers,
  };
})();

export default api;
