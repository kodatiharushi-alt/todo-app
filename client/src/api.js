const API_URL = "/api/todos";

const request = async (url, options) => {
  const res = await fetch(url, options);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }
  return data;
};

// GET /api/todos?page=1&limit=10
export const getTodos = (page = 1, limit = 5) =>
  request(`${API_URL}?page=${page}&limit=${limit}`);

// POST /api/todos
export const createTodo = (title) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

// PUT /api/todos/:id
export const updateTodo = (id, data) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// DELETE /api/todos/:id
export const deleteTodo = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });