const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  //   handle 401,404, 403,500 errors, here and throw custom error messages if needed
  return res.json();
};
