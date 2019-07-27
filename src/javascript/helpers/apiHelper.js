// const url = '../../../userlist.json';
const API_URL = 'https://street-fighter-demo.herokuapp.com';

function getAllFighters(endpoint) {
  const url = API_URL + endpoint;
  const options = {
    method: 'GET',
    // mode: 'no-cors',
    // headers: {
    //   'Content-Type': 'application/json',
    // }
  };

  return fetch(url, options)
    .then(response =>{
      console.log('response: ', response);
      return response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    }
    )
    .catch(error => {
      throw error;
    });
};

function getFighter (endpoint) {
  const url = API_URL + endpoint;
  const options = {
    method: 'GET',
  };
  
  return fetch(url, options)
    .then(response =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
};

function update (endpoint, body) {
  const url = API_URL + endpoint;
  const options = {
    method: 'PUT',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, options)
    .then(response => 
      response.ok ? response.statusText : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
};

function create (endpoint, body) {
  const url = API_URL + endpoint;
  const options = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, options)
    .then(response => 
      response.ok ? response.statusText : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
};

function remove (endpoint) {
  const url = API_URL + endpoint;
  const options = {
    method: 'DELETE',
  };

  return fetch(url, options)
    .then(response => 
      response.ok ? response.statusText : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
};

export { 
  getAllFighters, 
  getFighter, 
  update,
  create,
  remove
}
