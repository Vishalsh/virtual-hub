export async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = response.json();
  if (jsonResponse.status > 400) {
    throw jsonResponse.error;
  }
  return jsonResponse;
}

export async function get(url) {
  const response = await fetch(url, {
    method: '',
  });

  return response.json();
}
