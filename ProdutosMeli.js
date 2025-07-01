// (trecho gerado anteriormente, simplificado para build - você deve ajustar os tokens)
import React, { useEffect, useState } from 'react';

export default function ProdutosMeli() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const USER_ID = 'SEU_USER_ID_AQUI';
  const ACCESS_TOKEN = 'SEU_ACCESS_TOKEN_AQUI';

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await fetch(
          `https://api.mercadolibre.com/users/${USER_ID}/items/search?access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();

        const detalhes = await Promise.all(
          data.results.slice(0, 8).map(async (id) => {
            const res = await fetch(`https://api.mercadolibre.com/items/${id}`);
            return await res.json();
          })
        );

        setProdutos(detalhes);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      }
    };

    buscarProdutos();
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  }, []);

  return (
    <div>
      <h1>TopOfertasML</h1>
      {loading ? <p>Carregando...</p> : (
        <ul>
          {produtos.map((prod) => (
            <li key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} width={100} />
              <p>{prod.title}</p>
              <p>R$ {(prod.price).toFixed(2)}</p>
              <a href={prod.permalink} target="_blank" rel="noopener noreferrer">Ver no ML</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
