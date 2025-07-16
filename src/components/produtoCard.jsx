// src/components/ProdutoCard.jsx

import React, { useState } from "react";

const ProdutoCard = ({ produto, onChange, posicao }) => {
  const [sugestoesGoogle, setSugestoesGoogle] = useState([]);

  if (!posicao || !posicao.nome || !posicao.preco || !posicao.imagem) return null;

  const buscarImagensGoogle = async (termo) => {
    const API_KEY = 'SUA_API_KEY';
    const CX = 'SEU_CX';
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

  const atualizarCampo = (campo, valor) => {
    const novo = { ...produto, [campo]: valor };
    onChange(novo);
    if (campo === "nome") buscarImagensGoogle(valor);
  };

  return (
    <div>
      {/* Nome fixo */}
      {produto.nome && (
        <div
          style={{
            position: "absolute",
            left: posicao.nome.x,
            top: posicao.nome.y,
            fontSize: posicao.nome.fonte,
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {produto.nome.toUpperCase()}
        </div>
      )}

      {/* Preço fixo */}
      {produto.preco && (
        <div
          style={{
            position: "absolute",
            left: posicao.preco.x,
            top: posicao.preco.y,
            fontSize: posicao.preco.fonte,
            fontWeight: "bold",
            color: "#d60000",
          }}
        >
          R$ {produto.preco}
        </div>
      )}

      {/* Upload manual */}
      <input
        type="file"
        onChange={(e) => atualizarCampo("imagem", URL.createObjectURL(e.target.files[0]))}
        style={{ position: "absolute", left: posicao.imagem.x, top: posicao.imagem.y + posicao.imagem.altura + 10 }}
      />

      {/* Imagem */}
      {produto.imagem && (
        <img
          src={produto.imagem}
          alt="produto"
          style={{
            position: "absolute",
            left: posicao.imagem.x,
            top: posicao.imagem.y,
            width: posicao.imagem.largura,
            height: posicao.imagem.altura,
            objectFit: "contain"
          }}
        />
      )}

      {/* Sugestões do Google */}
      {sugestoesGoogle.length > 0 && (
        <div style={{ position: "absolute", left: posicao.imagem.x, top: posicao.imagem.y + posicao.imagem.altura + 50 }}>
          <p>📷 Sugestões do Google:</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {sugestoesGoogle.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="sugestao"
                width={60}
                height={60}
                style={{ cursor: 'pointer', borderRadius: 6 }}
                onClick={() => atualizarCampo("imagem", src)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProdutoCard;
