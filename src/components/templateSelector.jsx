import React, { useState } from "react";
import { temas } from "./temas";
import "../App.css";

const TemplateSelector = ({ onSelecionar }) => {
  const [formatoSelecionado, setFormatoSelecionado] = useState("feed");

  return (
    <div className="template-selector">
      <h2>Escolha um Tema</h2>

      <div style={{ marginBottom: 16 }}>
        <label>Formato:</label>
        <select
          value={formatoSelecionado}
          onChange={(e) => setFormatoSelecionado(e.target.value)}
        >
          <option value="feed">Feed</option>
          <option value="story">Story</option>
          <option value="tv">TV</option>
        </select>
      </div>

      <div className="grid">
        {temas.map((tema) => (
          <div key={tema.id} className="template-card">
            <img
              src={`/thumbs/${tema.id}-${formatoSelecionado}.jpg`}
              alt={tema.nome}
              className="thumb"
            />
            <p>{tema.nome} ({formatoSelecionado})</p>
            <button
              onClick={() => onSelecionar({ ...tema, formatoSelecionado })}
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
