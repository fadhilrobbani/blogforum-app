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

  const getUserById = async (id: string) => {
    const res = await fetch(`${baseURL}/api/users/${id}`);
    const { success, payload } = await res.json();
    if (!success) {
      return null;
    }
    return payload;
  };
  return {
    createResponse,
    getAllUsers,
    getUserById,
  };
})();

export default api;
