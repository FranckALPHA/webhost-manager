const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:9990";

export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Une erreur est survenue");
    }

    return response.json();
  },

  auth: {
    async login(username: string, password: string) {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Identifiants invalides");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      return data;
    },
    async me() {
      return api.fetch("/api/auth/me");
    },
    logout() {
      localStorage.removeItem("access_token");
    },
  },

  dashboard: {
    async getStats() {
      return api.fetch("/api/dashboard/stats");
    },
  },

  clients: {
    async getAll() {
      return api.fetch("/api/clients/");
    },
    async getById(id: number) {
      return api.fetch(`/api/clients/${id}`);
    },
    async create(data: any) {
      return api.fetch("/api/clients/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    async update(id: number, data: any) {
      return api.fetch(`/api/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    async delete(id: number) {
      return api.fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });
    },
  },

  hebergements: {
    async getAll(status?: string) {
      const query = status ? `?statut=${status}` : "";
      return api.fetch(`/api/hebergements/${query}`);
    },
    async getExpiresSoon(days: number = 30) {
      return api.fetch(`/api/hebergements/expires-soon?days=${days}`);
    },
    async create(data: any) {
      return api.fetch("/api/hebergements/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    async renew(id: number, months: number = 12) {
      return api.fetch(`/api/hebergements/${id}/renouveler?mois=${months}`, {
        method: "POST",
      });
    },
  },

  paiements: {
    async getAll(clientId?: number, status?: string) {
      const params = new URLSearchParams();
      if (clientId) params.append("client_id", clientId.toString());
      if (status) params.append("statut", status);
      const query = params.toString() ? `?${params.toString()}` : "";
      return api.fetch(`/api/paiements/${query}`);
    },
    async getHistory(clientId: number) {
      return api.fetch(`/api/paiements/historique/${clientId}`);
    },
    async create(data: any) {
      return api.fetch("/api/paiements/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  },

  relances: {
    async getAll() {
      return api.fetch("/api/relances/");
    },
  },

  notifications: {
    async getAll() {
      // On simule des notifications à partir des relances et paiements récents
      const relances = await api.relances.getAll();
      const paiements = await api.paiements.getAll();
      
      const notifications = [
        ...relances.map((r: any) => ({
          id: `r-${r.id}`,
          type: "warning",
          titre: "Relance envoyée",
          message: `Une relance a été envoyée pour l'hébergement #${r.hebergement_id}`,
          date: r.date_relance
        })),
        ...paiements.map((p: any) => ({
          id: `p-${p.id}`,
          type: p.statut_paiement === "payé" ? "success" : "info",
          titre: "Activité de paiement",
          message: `Paiement de ${p.montant} FCFA : ${p.statut_paiement}`,
          date: p.date_paiement
        }))
      ];
      
      return notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  },

  users: {
    async getAll() {
      return api.fetch("/api/users/");
    },
    async create(data: any) {
      return api.fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    async update(id: number, data: any) {
      return api.fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    async delete(id: number) {
      return api.fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
    },
  },

  vms: {
    async getAll() {
      return api.fetch("/api/vms/");
    },
    async create(data: any) {
      return api.fetch("/api/vms/", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    async action(id: number, action: "start" | "stop" | "restart" | "suspend") {
      return api.fetch(`/api/vms/${id}/action?action=${action}`, {
        method: "POST",
      });
    },
    async delete(id: number) {
      return api.fetch(`/api/vms/${id}`, {
        method: "DELETE",
      });
    },
  },
};
