export async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });

  return response.json();
}
