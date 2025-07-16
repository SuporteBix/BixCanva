import React, { useState } from 'react';

export default function CartazEditor() {
  const [produto, setProduto] = useState('');
  const [sugestoesGoogle, setSugestoesGoogle] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState('');

  const buscarImagensGoogle = async (termo) => {
    const API_KEY = 'SUA_API_KEY'; // substitua aqui
    const CX = 'SEU_CX';           // substitua aqui

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      termo + ' png'
    )}&searchType=image&imgColorType=trans&num=4&key=${API_KEY}&cx=${CX}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.items) setSugestoesGoogle(data.items.map((i) => i.link));
    } catch (err) {
      console.error('Erro ao buscar imagem:', err);
    }
  };

  const handleBuscar = () => {
    if (produto.trim()) buscarImagensGoogle(produto);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔎 Buscar Imagem de Produto</h2>

      <input
        placeholder="Digite o nome do produto"
        value={produto}
        onChange={(e) => setProduto(e.target.value)}
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={handleBuscar}>Buscar no Google</button>

      {sugestoesGoogle.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p>📷 Sugestões encontradas:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {sugestoesGoogle.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`sugestao-${i}`}
                width={100}
                height={100}
                style={{
                  cursor: 'pointer',
                  border: imagemSelecionada === src ? '2px solid blue' : '2px solid transparent',
                  borderRadius: 8,
                }}
                onClick={() => setImagemSelecionada(src)}
              />
            ))}
          </div>
        </div>
      )}

      {imagemSelecionada && (
        <div style={{ marginTop: 30 }}>
          <h4>✅ Imagem Selecionada:</h4>
          <img src={imagemSelecionada} alt="selecionada" width={200} />
        </div>
      )}
    </div>
  );
}
