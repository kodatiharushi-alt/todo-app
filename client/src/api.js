const API_URL = "/api/todos";

// Helper function to handle fetch requests and error checking
const request = async (url, options) => {
  const res = await fetch(url, options);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  
  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }
  return data;
};

// GET /api/todos - Fetch all todo items
export const getTodos = () => request(API_URL);

// POST /api/todos - Create a new todo item
export const createTodo = (title) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

// PUT /api/todos/:id - Update an existing todo item
export const updateTodo = (id, data) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// DELETE /api/todos/:id - Delete a todo item
export const deleteTodo = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });