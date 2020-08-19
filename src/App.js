import React, { useState, useEffect } from 'react';

import RepositoryItem from './components/RepositoryItem';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: `https://github.com/Leonardo-Rocha`,
      techs: ['Node.js', 'Typescript'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter(
      repository => repository.id !== id
    );
    
    api.delete(`/repositories/${id}`);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <RepositoryItem
              key={repository.id}
              repository={repository}
              handleRemoveRepository={handleRemoveRepository}
            />
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
