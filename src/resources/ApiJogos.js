const BASE_API = "https://topicos-jogos-beckend.vercel.app";

export default {
  getJogo: async () => {
    const req = await fetch(`${BASE_API}/api/jogos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await req.json();
    return json;
  },
  getJogos: async (_id) => {
    const req = await fetch(`${BASE_API}/api/jogos/${_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await req.json();
    return json;
  },
  incluiJogos: async (dadosJogos) => {
    console.log(dadosJogos);
    const req = await fetch(`${BASE_API}/api/jogos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosJogos),
    });
    const json = await req.json();
    return json;
  },
  alteraJogos: async (dadosJogos) => {
    const req = await fetch(`${BASE_API}/api/jogos`, {
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
  removeJogos: async (idjogos) => {
    const req = await fetch(`${BASE_API}/api/jogos/${idjogos}`, {
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
