import { useState } from 'react';
import './App.css';
import TemplateSelector from './components/templateSelector';
import CartazBuilder from './components/cartazBuilder';

function App() {
  const [temaSelecionado, setTemaSelecionado] = useState(null);

  return (
    <div className="App">
      {!temaSelecionado ? (
        <TemplateSelector onSelecionar={setTemaSelecionado} />
      ) : (
        <CartazBuilder tema={temaSelecionado} />
      )}
    </div>
  );
}

export default App;
