const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Erro ${res.status}: ${msg}`);
  }
  return res.json();
}

export const api = {
  listProdutos: () => request('/produtos'),
  createProduto: (d) => request('/produtos', { method: 'POST', body: JSON.stringify(d) }),
  updateProduto: (id, d) => request(`/produtos/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  deleteProduto: (id) => request(`/produtos/${id}`, { method: 'DELETE' }),

  listFornecedores: () => request('/fornecedores'),
  createFornecedor: (d) => request('/fornecedores', { method: 'POST', body: JSON.stringify(d) }),
  updateFornecedor: (id, d) => request(`/fornecedores/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  deleteFornecedor: (id) => request(`/fornecedores/${id}`, { method: 'DELETE' }),

  associar: (produtoId, fornecedorId) => request('/associar', {
    method: 'POST',
    body: JSON.stringify({ produtoId, fornecedorId }),
  }),
  produtosPorFornecedor: (fornecedorId) => request(`/fornecedores/${fornecedorId}/produtos`),
};
