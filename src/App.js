import React, { useState, useEffect } from "react";

import api  from './services/api'

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    const repositorie = {
      "title": `Desafio ${Math.random().toString(36).substring(7)}`,
      "url": "http://github.com",
      "techs": ["NodeJS","Express","UUID","CORS"]
    }

    const response = await api.post('repositories',repositorie);
    setRepositories([...repositories,response.data]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if ( response.status === 204 ) {
      setRepositories(repositories.filter(repositorie => repositorie.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories && repositories.map(repositorie =>
          <li key={repositorie.id}>
              {repositorie.title}
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
