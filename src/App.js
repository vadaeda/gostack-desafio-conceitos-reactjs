import React from "react";

import "./styles.css";
import { useEffect } from "react";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const { data } = await api.get('repositories')
    setRepositories(data);
  }

  async function handleAddRepository() {
    // TODO
    const { data } = await api.post('repositories', {
      title: 'titulo',
      url: 'url',
      techs: ['uma', 'duas']
    })
    setRepositories([...repositories, data])

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if (response) { console.log(`Repository ${id} successfully deleted.`) }
    const newRepos = repositories.filter(repository => repository.id !== id )
    setRepositories(newRepos)
  }

  useEffect(() => {
    loadRepositories();
  }, [])


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
