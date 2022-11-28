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
  const hoje = new Date().toISOString().split("T")[0];
  const registroInicial = route.params
    ? route.params.Jogos
    : {
        Nome: "",
        Idade: "",
        sexo: "",
        telefone: "",
        data_inicio_atividade: hoje,
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
      navigation.navigate("Inicio");
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
            name="Nome"
            style={{ margin: 8 }}
            keyboardType="default"
            placeholder="Nome do Jogos"
            maxLength={14}
            value={Jogos.nome}
            onChangeText={(text) => setJogos({ ...Jogos, nome: text })}
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>Idade</Text>
          <TextInput
            name="Idade"
            style={{ margin: 8 }}
            keyboardType="default"
            placeholder="Digite sua idade"
            maxLength={100}
            value={Jogos.razao_social}
            onChangeText={(text) => setJogos({ ...Jogos, Idade: text })}
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>Sexo</Text>
          <TextInput
            name="Sexo"
            style={{ margin: 8 }}
            keyboardType="default"
            placeholder="Sexo (opcional)"
            maxLength={50}
            value={Jogos.nome_fantasia}
            onChangeText={(text) => setJogos({ ...Jogos, Sexo: text })}
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>Telefone</Text>
          <TextInput
            name="Telefone"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="Seu Telefone"
            maxLength={7}
            value={Jogos.cnae_fiscal}
            onChangeText={(text) => setUsuarios({ ...Jogos, Telefone: text })}
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>
            Início da Atividade
          </Text>
          <TextInput
            name="data_inicio_atividade"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="AAAA-MM-DD"
            maxLength={10}
            value={Jogos.data_inicio_atividade}
            onChangeText={(text) =>
              setJogos({ ...Jogos, data_inicio_atividade: text })
            }
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
