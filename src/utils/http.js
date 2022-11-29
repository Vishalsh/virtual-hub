export async function post(url, data, options = {}) {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
    ...options,
  });

  return response.json();
}

export async function get(url) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true,
    },
  });

  return response.json();
}
