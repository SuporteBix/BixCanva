// src/components/CartazBuilder.jsx

import React, { useState } from "react";
import Produto from "./produto";
import ProdutoCard from "./produtoCard";

const cartazBuilder = ({ tema }) => {
  const formato = tema.formatoSelecionado;
  const config = tema.formatos[formato];

  const [produtos, setProdutos] = useState([]);

const adicionarProduto = (produto) => {
  console.log("🧩 Produto recebido:", produto); // adicione isso para ver se a imagem vem
  if (produtos.length >= config.posicoes.length) return;
  setProdutos([...produtos, produto]);
};

  const atualizarProduto = (index, novo) => {
    const atualizados = [...produtos];
    atualizados[index] = novo;
    setProdutos(atualizados);
  };

  return (
    <div>
      {/* Formulário acima do cartaz */}
      <Produto onAdicionar={adicionarProduto} />

      <div
        className="cartaz"
        style={{
          position: "relative",
          width: config.largura,
          height: config.altura,
          backgroundImage: `url(${config.imagemFundo})`,
          backgroundSize: "cover",
          margin: "0 auto",
          border: "2px solid #000",
        }}
      >
        {produtos.map((produto, i) => (
          <ProdutoCard
            key={i}
            produto={produto}
            onChange={(novo) => atualizarProduto(i, novo)}
            posicao={config.posicoes[i]}
          />
        ))}
      </div>
    </div>
  );
};

export default cartazBuilder;
