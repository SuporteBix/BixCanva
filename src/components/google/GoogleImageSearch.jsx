import { useState } from "react";

const API_KEY = "AIzaSyBaFaNtQBVG-zjoT6-fC3eUl6RDtf88Yl0";
const CX = "e3956579c2f444620"; // Seu ID do mecanismo

export default function GoogleImageSearch({ onImageSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query + " png")}&searchType=image&imgColorType=trans&num=10&cx=${CX}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setResults(data.items || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <h3>🔍 Buscar imagens no Google (transparente)</h3>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="text"
          placeholder="Ex: queijo prato"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {loading && <p>Carregando...</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12, marginTop: 20 }}>
        {results.map((item, i) => (
          <img
            key={i}
            src={item.link}
            alt={item.title}
            style={{ width: "100%", cursor: "pointer", borderRadius: 6 }}
            onClick={() => onImageSelect(item.link)}
          />
        ))}
      </div>
    </div>
  );
}
