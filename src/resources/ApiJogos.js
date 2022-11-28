const BASE_API = "https://topicos-jogos.vercel.app";

export default {
  getJogos: async () => {
    const req = await fetch(`${BASE_API}/jogos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await req.json();
    return json;
  },
  getJogo: async (id) => {
    const req = await fetch(`${BASE_API}/jogos/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await req.json();
    return json;
  },
  incluiJogo: async (dadosjogo) => {
    console.log(dadosjogo);
    const req = await fetch(`${BASE_API}/jogos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosjogo),
    });
    const json = await req.json();
    return json;
  },
  alteraJogo: async (dadosJogo) => {
    const req = await fetch(`${BASE_API}/jogos`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosJogos),
    });
    const json = await req.json();
    return json;
  },
  removeJogo: async (idjogo) => {
    const req = await fetch(`${BASE_API}/jogos/${idjogo}`, {
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
