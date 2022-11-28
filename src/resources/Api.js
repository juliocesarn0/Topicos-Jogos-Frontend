const BASE_API = "https://backendmobile.vercel.app/api";

export default {
  getPrestadores: async () => {
    const req = await fetch(`${BASE_API}/prestadores`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await req.json();
    return json;
  },
  getPrestador: async (id) => {
    const req = await fetch(`${BASE_API}/prestadores/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await req.json();
    return json;
  },
  incluiPrestador: async (dadosPrestador) => {
    console.log(dadosPrestador);
    const req = await fetch(`${BASE_API}/prestadores`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosPrestador),
    });
    const json = await req.json();
    return json;
  },
  alteraPrestador: async (dadosPrestador) => {
    const req = await fetch(`${BASE_API}/prestadores`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosPrestador),
    });
    const json = await req.json();
    return json;
  },
  removePrestador: async (idPrestador) => {
    const req = await fetch(`${BASE_API}/prestadores/${idPrestador}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await req.json();
    return json;
  },
};
