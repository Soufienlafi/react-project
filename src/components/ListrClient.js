import React, { useEffect, useState } from 'react';
import axios from 'axios';
function ListrClient() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/Client")
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container-fluid mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Client List</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            clients.length === 0 ? (
              <p className="text-center">No clients available.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">Prenom</th>
                      <th scope="col">Adresse</th>
                      <th scope="col">Email</th>
                      <th scope="col">Tel</th>
                      <th scope="col">Avatar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td>{client.nom}</td>
                        <td>{client.prenom}</td>
                        <td>{client.adresse}</td>
                        <td>{client.email}</td>
                        <td>{client.tel}</td>
                        <td>
                          {client.avatarUrl && (
                            <img
                              src={client.avatarUrl}
                              alt={`Avatar for ${client.nom} ${client.prenom}`}
                              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ListrClient;
