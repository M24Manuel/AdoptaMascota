const API_URL = 'http://127.0.0.1:8005/api';

const getCsrfToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return null;
};

const apiRequest = async (endpoint, options = {}) => {
  const csrfToken = getCsrfToken();

  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(csrfToken && { 'X-CSRFToken': csrfToken }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error en la petición');
  }

  return response.json();
};

export const authService = {
  register: async (userData) => {
    return apiRequest('/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiRequest('/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiRequest('/logout/', {
      method: 'POST',
    });
  },
};

export const mascotasService = {
  getAll: async () => {
    return apiRequest('/mascotas/');
  },

  getById: async (id) => {
    return apiRequest(`/mascotas/${id}/`);
  },

  create: async (mascotaData) => {
    const csrfToken = getCsrfToken();
    const formData = new FormData();

    for (const key in mascotaData) {
      formData.append(key, mascotaData[key]);
    }

    const response = await fetch(`${API_URL}/mascotas/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...(csrfToken && { 'X-CSRFToken': csrfToken }),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear mascota');
    }

    return response.json();
  },

  update: async (id, mascotaData) => {
    return apiRequest(`/mascotas/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(mascotaData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/mascotas/${id}/`, {
      method: 'DELETE',
    });
  },

  adoptar: async (id) => {
    return apiRequest(`/mascotas/${id}/adoptar/`, {
      method: 'POST',
    });
  },
};

export const especiesService = {
  getAll: async () => {
    return apiRequest('/especies/');
  },

  create: async (especieData) => {
    return apiRequest('/especies/', {
      method: 'POST',
      body: JSON.stringify(especieData),
    });
  },
};
