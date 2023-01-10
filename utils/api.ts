interface CreateResponse {
  success: boolean;
  payload?: any;
  message?: string;
}

const createResponse = ({ success, payload, message }: CreateResponse) => {
  return {
    success,
    payload,
    message,
  };
};

export { createResponse };
