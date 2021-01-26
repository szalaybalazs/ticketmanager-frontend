interface iOptions {
  method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
}

interface iRequestResponse extends Response {
  data: any
}

/**
 * HTTP request
 * @param path server pathname
 * @param options request options to define body and method
 */
const request = async (path: string, options: iOptions = { method: 'GET' }): Promise<iRequestResponse> => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}${path}`, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REACT_APP_API_KEY || '',
    },
    [options.method !== 'GET' ? 'body' : '_']: options.method === 'GET' ? undefined : JSON.stringify(options.body || {}),
  });
  const data = await res.json();

  return { ...res, data };
};

export default request;