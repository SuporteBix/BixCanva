import { useState, useRef } from 'react';
import { Stage, Layer, Text, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

// Mapas de temas (cores e estilos)
const temas = {
  calu: {
    bgColor: '#fff176',
    textColor: 'black',
    priceColor: 'red',
  },
  quintadacarne: {
    bgColor: '#ffcc80',
    textColor: '#4e342e',
    priceColor: '#c62828',
  },
};

const formatos = {
  tv: { nome: 'TV Full HD (1920x1080)', view: { width: 800, height: 450 }, export: { width: 1920, height: 1080 } },
  stories: { nome: 'Stories (1080x1920)', view: { width: 450, height: 800 }, export: { width: 1080, height: 1920 } },
  feed: { nome: 'Feed (1080x1080)', view: { width: 600, height: 600 }, export: { width: 1080, height: 1080 } },
};

export default function CanvasEditor() {
  const stageRef = useRef();
  const fileInputRef = useRef();

  const [canvasSize, setCanvasSize] = useState(formatos.tv.view);
  const [exportSize, setExportSize] = useState(formatos.tv.export);
  const [temaSelecionado, setTemaSelecionado] = useState('calu');
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [elements, setElements] = useState([]);

  const handleGerarCartaz = () => {
    const tema = temas[temaSelecionado];
    setElements([
      { id: 'bg', type: 'rect', x: 0, y: 0, width: canvasSize.width, height: canvasSize.height, fill: tema.bgColor },
      { id: 'produto', type: 'text', x: 30, y: 50, text: produto, fontSize: 32, fill: tema.textColor },
      { id: 'preco', type: 'text', x: 30, y: 120, text: `R$ ${preco}`, fontSize: 36, fill: tema.priceColor, fontStyle: 'bold' },
    ]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setElements([...elements, { id: `img-${Date.now()}`, type: 'image', src: reader.result, x: 150, y: 150 }]);
    };
    reader.readAsDataURL(file);
  };

  const handleFormatoChange = (e) => {
    const f = formatos[e.target.value];
    setCanvasSize(f.view);
    setExportSize(f.export);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label>Tema: </label>
        <select value={temaSelecionado} onChange={(e) => setTemaSelecionado(e.target.value)}>
          <option value="calu">CALU</option>
          <option value="quintadacarne">Quinta da Carne</option>
        </select>

        <label style={{ marginLeft: 16 }}>Formato: </label>
        <select onChange={handleFormatoChange}>
          <option value="tv">TV</option>
          <option value="stories">Stories</option>
          <option value="feed">Feed</option>
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input placeholder="Nome do Produto" value={produto} onChange={(e) => setProduto(e.target.value)} />
        <input placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} style={{ marginLeft: 8 }} />
        <button onClick={handleGerarCartaz} style={{ marginLeft: 8 }}>Gerar Cartaz</button>
        <button onClick={() => fileInputRef.current.click()} style={{ marginLeft: 8 }}>+ Imagem</button>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} />
      </div>

      <Stage ref={stageRef} width={canvasSize.width} height={canvasSize.height} style={{ border: '1px solid #ccc' }}>
        <Layer>
          {elements.map((el) => {
            if (el.type === 'rect') return <Rect key={el.id} {...el} />;
            if (el.type === 'text') return <Text key={el.id} {...el} />;
            if (el.type === 'image') return <CanvasImage key={el.id} {...el} />;
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
}

function CanvasImage({ src, x, y }) {
  const [image] = useImage(src);
  return <KonvaImage image={image} x={x} y={y} draggable />;
}
