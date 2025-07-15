 
export default function Toolbar({ onAddElement }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button onClick={() => onAddElement('text')}>➕ Adicionar Texto</button>
      <button onClick={() => onAddElement('rect')}>📦 Adicionar Produto</button>
      <button onClick={() => onAddElement('image')}>🖼️ Adicionar Imagem</button>
    </div>
  );
}
