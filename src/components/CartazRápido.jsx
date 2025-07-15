import { Stage, Layer, Text, Rect } from 'react-konva';
import { useState } from 'react';
import { temas } from './temas';

export default function CartazRápido() {
  const [tema, setTema] = useState('vermelho');
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [gerado, setGerado] = useState(false);

  const temaSelecionado = temas[tema];

  return (
    <div style={{ padding: 20 }}>
      <h3>🪧 Gerador de Cartaz Rápido</h3>

      <div style={{ marginBottom: 10 }}>
        <label>Tema:</label>
        <select value={tema} onChange={(e) => setTema(e.target.value)}>
          {Object.keys(temas).map((key) => (
            <option key={key} value={key}>{key.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <input
        placeholder="Nome do produto"
        value={produto}
        onChange={(e) => setProduto(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <button
        onClick={() => setGerado(true)}
        style={{ marginLeft: 10 }}
      >
        Gerar Cartaz
      </button>

      {gerado && (
        <Stage width={400} height={400} style={{ border: '1px solid #ccc', marginTop: 20 }}>
          <Layer>
            <Rect width={400} height={400} fill={temaSelecionado.bgColor} />
            <Text
              text={produto.toUpperCase()}
              x={20}
              y={temaSelecionado.titleY}
              fontSize={temaSelecionado.fontSize}
              fill={temaSelecionado.fontColor}
              width={360}
              align="center"
            />
            <Text
              text={`R$ ${preco}`}
              x={20}
              y={temaSelecionado.priceY}
              fontSize={48}
              fill={temaSelecionado.priceColor}
              fontStyle="bold"
              width={360}
              align="center"
            />
          </Layer>
        </Stage>
      )}
    </div>
  );
}
