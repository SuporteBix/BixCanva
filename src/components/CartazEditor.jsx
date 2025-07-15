import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import Toolbar from './Toolbar';
import { temas } from './temas';

const formatos = {
  tv: { nome: 'TV Full HD', width: 800, height: 450 },
  stories: { nome: 'Stories', width: 450, height: 800 },
  feed: { nome: 'Feed Quadrado', width: 600, height: 600 },
  a4: { nome: 'A4', width: 530, height: 750 },
};

export default function CartazEditor() {
  const stageRef = useRef();
  const fileInputRef = useRef();

  const [formato, setFormato] = useState('tv');
  const [canvasSize, setCanvasSize] = useState(formatos.tv);
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [temaSelecionado, setTemaSelecionado] = useState('amarelo');
  const [elements, setElements] = useState([]);
  const [sugestoesGoogle, setSugestoesGoogle] = useState([]);

  const handleChangeFormato = (e) => {
    const key = e.target.value;
    setFormato(key);
    setCanvasSize(formatos[key]);
  };

  const handleGerarCartaz = () => {
    const tema = temas[temaSelecionado];
    const novosElementos = [
      { id: 'titulo', type: 'text', text: produto.toUpperCase(), x: 20, y: 30, fontSize: 32, fill: tema.corTexto },
      { id: 'preco', type: 'text', text: `R$ ${preco}`, x: 20, y: 80, fontSize: 36, fill: tema.corPreco },
      { id: 'fundo', type: 'rect', x: 0, y: 0, width: canvasSize.width, height: canvasSize.height, fill: tema.fundo },
    ];
    setElements(novosElementos);
    buscarImagensGoogle(produto);
  };

  const buscarImagensGoogle = async (termo) => {
    const API_KEY = 'AIzaSyBaFaNtQBVG-zjoT6-fC3eUl6RDtf88Yl0';
    const CX = 'e3956579c2f444620';
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      termo + ' png'
    )}&searchType=image&imgColorType=trans&num=4&key=${API_KEY}&cx=${CX}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("🧠 Resultado da API Google:", data); 
      if (data.items) setSugestoesGoogle(data.items.map((i) => i.link));
    } catch (err) {
      console.error('Erro ao buscar imagem:', err);
    }
  };

  const inserirImagem = (url) => {
    const id = `img-${Date.now()}`;
    setElements([...elements, { id, type: 'image', src: url, x: 200, y: 120 }]);
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    const a = document.createElement('a');
    a.download = `cartaz-${Date.now()}.png`;
    a.href = uri;
    a.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎯 Cartaz Inteligente</h2>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <label>Formato:</label>
        <select value={formato} onChange={handleChangeFormato}>
          {Object.keys(formatos).map((key) => (
            <option value={key} key={key}>{formatos[key].nome}</option>
          ))}
        </select>

        <label>Tema:</label>
        <select value={temaSelecionado} onChange={(e) => setTemaSelecionado(e.target.value)}>
          {Object.keys(temas).map((t) => (
            <option key={t} value={t}>{temas[t].nome}</option>
          ))}
        </select>

        <input value={produto} onChange={(e) => setProduto(e.target.value)} placeholder="Produto" />
        <input value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
        <button onClick={handleGerarCartaz}>Gerar Cartaz</button>
        <button onClick={handleDownload}>Baixar</button>
      </div>

      <Stage ref={stageRef} width={canvasSize.width} height={canvasSize.height} style={{ border: '1px solid #555' }}>
        <Layer>
          {elements.map((el) => {
            if (el.type === 'rect') return <Rect key={el.id} {...el} draggable />;
            if (el.type === 'text') return <Text key={el.id} {...el} draggable />;
            if (el.type === 'image') return <DynamicImage key={el.id} {...el} draggable />;
            return null;
          })}
        </Layer>
      </Stage>

      {sugestoesGoogle.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <p>📷 Sugestões do Google:</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {sugestoesGoogle.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="sugestao"
                width={80}
                height={80}
                style={{ cursor: 'pointer', borderRadius: 8 }}
                onClick={() => inserirImagem(src)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DynamicImage({ src, x, y, draggable }) {
  const [image] = useImage(src);
  return <KonvaImage image={image} x={x} y={y} draggable={draggable} />;
}
