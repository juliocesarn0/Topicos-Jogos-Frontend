import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import {
  withTheme,
  Caption,
  TextInput,
  FAB,
  Snackbar,
} from "react-native-paper";
import Header from "../components/Header";
import ApiJogos from "../resources/ApiJogos";

function AdicionaJogos({ navigation, theme, route }) {
  const { colors } = theme;

  const registroInicial = route.params
    ? route.params.Jogos
    : {
        nome_jogo: "",
        valor_jogo: "",
        Ano_De_Lançamento: "",
        classificação_indicativa: "",
        codigo_Jogo: "",
      };
  const [Jogos, setJogos] = useState(registroInicial);
  const [salvando, setSalvando] = useState(false);

  const salvarJogos = async (dadosJogos) => {
    setSalvando(true);
    let salvar = dadosJogos.hasOwnProperty("_id")
      ? await ApiJogos.alteraJogos(dadosJogos)
      : await ApiJogos.incluiJogos(dadosJogos);
    if (salvar.hasOwnProperty("errors")) {
      Platform.OS === "web"
        ? alert(`❗Erro: ${salvar.errors[0].msg}`)
        : Alert.alert("❗Erro", salvar.errors[0].msg);
      setSalvando(false);
    } else if (salvar.hasOwnProperty("acknowledged")) {
      Platform.OS === "web"
        ? alert(`✅Tudo Ok: Registro salvo com sucesso`)
        : Alert.alert("✅Tudo Ok", "Registro salvo com sucesso");
      setSalvando(false);
      navigation.navigate("TelaInicial");
    }
  };

  return (
    <>
      <View style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 0 }}>
        <Header
          titulo="Cadastro de Jogos"
          voltar={true}
          navigation={navigation}
        />
        {/* <Text style={{color: colors.text}}>
                             ${JSON.stringify(registroInicial)}
                       </Text> */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}
        >
          <Caption style={{ fontSize: 20, marginBottom: 16, marginTop: 16 }}>
            Cadastro de Jogos
          </Caption>
          <Text style={{ color: colors.text, paddingLeft: 8 }}>Nome</Text>
          <TextInput
            name="nome_jogo"
            style={{ margin: 8 }}
            keyboardType="default"
            placeholder="Nome do Jogos"
            maxLength={50}
            value={Jogos.nome_jogo}
            onChangeText={(text) => setJogos({ ...Jogos, nome_jogo: text })}
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>Preço</Text>
          <TextInput
            name="valor_jogo"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="Digite o preço"
            maxLength={100}
            value={Jogos.valor_jogo}
            onChangeText={(text) => setJogos({ ...Jogos, valor_jogo: text })}
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>
            Ano De Lançamento
          </Text>
          <TextInput
            name="Ano de Lançamento"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="Digite o ano de lançamento"
            maxLength={50}
            value={Jogos.ano_de_lançamento}
            onChangeText={(text) =>
              setJogos({ ...Jogos, Ano_De_Lançamento: text })
            }
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>
            Classificação Indicativa
          </Text>
          <TextInput
            name="Classificação Indicativa"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="Digite a classificação indicativa"
            maxLength={7}
            value={Jogos.classificação_indicativa}
            onChangeText={(text) =>
              setJogos({ ...Jogos, classificação_indicativa: text })
            }
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>
            Código do produto
          </Text>
          <TextInput
            name="Código do jogo"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="Digite o codigo do jogo"
            maxLength={7}
            value={Jogos.codigo_Jogo}
            onChangeText={(text) => setJogos({ ...Jogos, codigo_Jogo: text })}
          />
        </View>
        <FAB
          style={styles.fab}
          icon="content-save"
          loading={salvando}
          onPress={() => salvarJogos(Jogos)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 4,
    bottom: 8,
  },
});
export default withTheme(AdicionaJogos);
