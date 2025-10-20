import React, { useEffect, useState } from 'react'
import { api } from './api'

function Section({ title, children }) {
  return (
    <section
      style={{
        border: '1px solid #ddd',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
      }}
    >
      <h2>{title}</h2>
      {children}
    </section>
  )
}

/* --------------------- PRODUTOS --------------------- */
function Produtos() {
  const [lista, setLista] = useState([])
  const [form, setForm] = useState({ nome: '', preco: '', descricao: '', codigoBarras: '' })
  const [editId, setEditId] = useState(null)

  const carregar = async () => setLista(await api.listProdutos())
  useEffect(() => { carregar() }, [])

  const salvar = async (e) => {
    e.preventDefault()
    const payload = { ...form, preco: parseFloat(form.preco) }
    if (editId) await api.updateProduto(editId, payload)
    else await api.createProduto(payload)
    setForm({ nome: '', preco: '', descricao: '', codigoBarras: '' })
    setEditId(null)
    carregar()
  }

  const editar = (p) => {
    setForm({ nome: p.nome, preco: p.preco, descricao: p.descricao, codigoBarras: p.codigoBarras })
    setEditId(p.id)
  }

  const deletar = async (id) => {
    if (confirm('Excluir produto?')) {
      await api.deleteProduto(id)
      carregar()
    }
  }

  return (
    <Section title="Produtos">
      <form onSubmit={salvar} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
        <input placeholder="Preço" value={form.preco} onChange={e => setForm({ ...form, preco: e.target.value })} required />
        <input placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
        <input placeholder="Código de Barras" value={form.codigoBarras} onChange={e => setForm({ ...form, codigoBarras: e.target.value })} />
        <div style={{ gridColumn: '1 / span 4', display: 'flex', gap: 8 }}>
          <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
          {editId && (
            <button type="button" onClick={() => { setForm({ nome: '', preco: '', descricao: '', codigoBarras: '' }); setEditId(null) }}>Cancelar</button>
          )}
        </div>
      </form>

      <table width="100%" cellPadding="8" style={{ marginTop: 12, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th>ID</th><th>Nome</th><th>Preço</th><th>Descrição</th><th>Código</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(p => (
            <tr key={p.id} style={{ borderTop: '1px solid #eee' }}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.preco}</td>
              <td>{p.descricao || '-'}</td>
              <td>{p.codigoBarras || '-'}</td>
              <td>
                <button onClick={() => editar(p)}>Editar</button>{' '}
                <button onClick={() => deletar(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {!lista.length && <tr><td colSpan="6">Nenhum produto</td></tr>}
        </tbody>
      </table>
    </Section>
  )
}

/* --------------------- FORNECEDORES --------------------- */
function Fornecedores() {
  const [lista, setLista] = useState([])
  const [form, setForm] = useState({ nome: '', cnpj: '' })
  const [editId, setEditId] = useState(null)

  const carregar = async () => setLista(await api.listFornecedores())
  useEffect(() => { carregar() }, [])

  const salvar = async (e) => {
    e.preventDefault()
    if (editId) await api.updateFornecedor(editId, form)
    else await api.createFornecedor(form)
    setForm({ nome: '', cnpj: '' })
    setEditId(null)
    carregar()
  }

  const editar = (f) => { setForm({ nome: f.nome, cnpj: f.cnpj }); setEditId(f.id) }
  const deletar = async (id) => { if (confirm('Excluir fornecedor?')) await api.deleteFornecedor(id); carregar() }

  return (
    <Section title="Fornecedores">
      <form onSubmit={salvar} style={{ display: 'flex', gap: 8 }}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
        <input placeholder="CNPJ" value={form.cnpj} onChange={e => setForm({ ...form, cnpj: e.target.value })} />
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
        {editId && <button type="button" onClick={() => { setForm({ nome: '', cnpj: '' }); setEditId(null) }}>Cancelar</button>}
      </form>

      <table width="100%" cellPadding="8" style={{ marginTop: 12, borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#f5f5f5' }}><th>ID</th><th>Nome</th><th>CNPJ</th><th>Ações</th></tr></thead>
        <tbody>
          {lista.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td><td>{f.nome}</td><td>{f.cnpj || '-'}</td>
              <td>
                <button onClick={() => editar(f)}>Editar</button>{' '}
                <button onClick={() => deletar(f.id)}>Excluir</button>
              </td>
            </tr>
          ))}
          {!lista.length && <tr><td colSpan="4">Nenhum fornecedor</td></tr>}
        </tbody>
      </table>
    </Section>
  )
}

/* --------------------- ASSOCIAÇÃO --------------------- */
function Associacao() {
  const [produtos, setProdutos] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [selecionado, setSelecionado] = useState({ produtoId: '', fornecedorId: '' })
  const [produtosDoFornecedor, setProdutosDoFornecedor] = useState([])
  const [fornecedorView, setFornecedorView] = useState('')

  const carregar = async () => {
    setProdutos(await api.listProdutos())
    setFornecedores(await api.listFornecedores())
  }
  useEffect(() => { carregar() }, [])

  const associar = async (e) => {
    e.preventDefault()
    if (!selecionado.produtoId || !selecionado.fornecedorId) return alert('Selecione produto e fornecedor')
    await api.associar(Number(selecionado.produtoId), Number(selecionado.fornecedorId))
    alert('Associação criada com sucesso!')
  }

  const listar = async () => {
    if (!fornecedorView) return
    const itens = await api.produtosPorFornecedor(Number(fornecedorView))
    setProdutosDoFornecedor(itens)
  }

  return (
    <Section title="Associação Produto ↔ Fornecedor">
      <form onSubmit={associar} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <select value={selecionado.produtoId} onChange={e => setSelecionado(s => ({ ...s, produtoId: e.target.value }))}>
          <option value="">Produto</option>
          {produtos.map(p => <option key={p.id} value={p.id}>{p.id} — {p.nome}</option>)}
        </select>
        <select value={selecionado.fornecedorId} onChange={e => setSelecionado(s => ({ ...s, fornecedorId: e.target.value }))}>
          <option value="">Fornecedor</option>
          {fornecedores.map(f => <option key={f.id} value={f.id}>{f.id} — {f.nome}</option>)}
        </select>
        <button type="submit">Associar</button>
      </form>

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <select value={fornecedorView} onChange={e => setFornecedorView(e.target.value)}>
          <option value="">Ver produtos do Fornecedor...</option>
          {fornecedores.map(f => <option key={f.id} value={f.id}>{f.id} — {f.nome}</option>)}
        </select>
        <button onClick={listar}>Listar</button>
      </div>

      <ul style={{ marginTop: 12 }}>
        {produtosDoFornecedor.map(p => <li key={p.id}>{p.id} — {p.nome}</li>)}
        {!produtosDoFornecedor.length && <li>Nenhum produto listado</li>}
      </ul>
    </Section>
  )
}

/* --------------------- APP PRINCIPAL --------------------- */
export default function App() {
  const [tab, setTab] = useState('produtos')
  const tabs = [
    { id: 'produtos', label: 'Produtos', comp: <Produtos /> },
    { id: 'fornecedores', label: 'Fornecedores', comp: <Fornecedores /> },
    { id: 'associacao', label: 'Associação', comp: <Associacao /> },
  ]

  return (
    <div style={{ maxWidth: 1000, margin: '20px auto', fontFamily: 'system-ui' }}>
      <h1 style={{ textAlign: 'center' }}>Gestão de Produtos & Fornecedores</h1>
      <nav style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #ccc',
              background: tab === t.id ? '#e9f5ff' : 'white',
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {tabs.find(t => t.id === tab)?.comp}
      <footer style={{ textAlign: 'center', marginTop: 24, color: '#666' }}>
        API: {import.meta.env.VITE_API_URL || 'http://localhost:3000'}
      </footer>
    </div>
  )
}
