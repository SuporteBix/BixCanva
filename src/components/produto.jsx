import React, { useState } from 'react';

const imagensDisponiveis = [
  '/produtos/agua.png',
  '/produtos/arroz.png',
  '/produtos/leite.png'
];

const Produto = ({ onAdicionar }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const [observacao, setObservacao] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagem(url);
    }
  };

 const handleAdicionar = () => {
  if (!nome || !preco) return alert('Preencha nome e preço');

  const produtoFinal = {
    nome,
    preco,
    imagem: imagem || '',  // garante que vai tentar usar alguma imagem
    observacao
  };

  onAdicionar(produtoFinal);
  setNome('');
  setPreco('');
  setImagem('');
  setObservacao('');
};


  return (
    <div style={{ marginBottom: 20, padding: 12, border: '1px solid #000', borderRadius: 8 }}>
      <h3>📦 Cadastro do Produto</h3>

      <div style={{ marginBottom: 8 }}>
        <label>Escolher imagem padrão:</label>
        <select value={imagem} onChange={(e) => setImagem(e.target.value)}>
          <option value="">Selecione uma imagem</option>
          {imagensDisponiveis.map((img, i) => (
            <option key={i} value={img}>{img.split('/').pop()}</option>
          ))}
        </select>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: 8 }}
      />

      {imagem && <img src={imagem} alt="preview" width={80} style={{ marginBottom: 8 }} />}

      <div>
        <input
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: 8 }}
        />

        <input
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={{ marginRight: 8 }}
        />

        <input
          placeholder="Observação (opcional)"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          style={{ marginRight: 8 }}
        />

        <button onClick={handleAdicionar}>Adicionar ao Cartaz</button>
      </div>
    </div>
  );
};

export default Produto;
