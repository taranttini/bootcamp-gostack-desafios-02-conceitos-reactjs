import React, { useState, useEffect } from 'react';
import api from 'services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: 'novo repositorio' + new Date().toISOString(),
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    // tempos antigos 2015-04
    // var newRepositories = [];
    // for (var i = 0; i < repositories.length; i++) {
    //   var repository = repositories[i];
    //   if (repository.id === id) continue;
    //   newRepositories.push(repository);
    // }
    const newRepositories = repositories.filter((q) => q.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
