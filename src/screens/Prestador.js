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
import Api from "../resources/Api";

function AdicionaPrestador({ navigation, theme, route }) {
  const { colors } = theme;
  const hoje = new Date().toISOString().split("T")[0];
  const registroInicial = route.params
    ? route.params.prestador
    : {
        cnpj: "",
        razao_social: "",
        nome_fantasia: "",
        cnae_fiscal: "",
        data_inicio_atividade: hoje,
      };
  const [prestador, setPrestador] = useState(registroInicial);
  const [salvando, setSalvando] = useState(false);

  const salvarPrestador = async (dadosPrestador) => {
    setSalvando(true);
    let salvar = dadosPrestador.hasOwnProperty("_id")
      ? await Api.alteraPrestador(dadosPrestador)
      : await Api.incluiPrestador(dadosPrestador);
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
          titulo="Cadastro de Prestadores"
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
            Prestadores de Serviços
          </Caption>
          <Text style={{ color: colors.text, paddingLeft: 8 }}>CNPJ</Text>
          <TextInput
            name="cnpj"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="Número do CNPJ (sem pontos)"
            maxLength={14}
            value={prestador.cnpj}
            onChangeText={(text) => setPrestador({ ...prestador, cnpj: text })}
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>
            Razão Social
          </Text>
          <TextInput
            name="razao_social"
            style={{ margin: 8 }}
            keyboardType="default"
            placeholder="Razão Social"
            maxLength={100}
            value={prestador.razao_social}
            onChangeText={(text) =>
              setPrestador({ ...prestador, razao_social: text })
            }
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>
            Nome Fantasia
          </Text>
          <TextInput
            name="nome_fantasia"
            style={{ margin: 8 }}
            keyboardType="default"
            placeholder="Nome Fantasia (opcional)"
            maxLength={50}
            value={prestador.nome_fantasia}
            onChangeText={(text) =>
              setPrestador({ ...prestador, nome_fantasia: text })
            }
          />
          <Text style={{ color: colors.text, paddingLeft: 8 }}>CNAE</Text>
          <TextInput
            name="cnae_fiscal"
            style={{ margin: 8 }}
            keyboardType="number-pad"
            placeholder="Cód. Nacional de Atividade Econômica"
            maxLength={7}
            value={prestador.cnae_fiscal}
            onChangeText={(text) =>
              setPrestador({ ...prestador, cnae_fiscal: text })
            }
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
            value={prestador.data_inicio_atividade}
            onChangeText={(text) =>
              setPrestador({ ...prestador, data_inicio_atividade: text })
            }
          />
          
        </View>
        <FAB
          style={styles.fab}
          icon="content-save"
          loading={salvando}
          onPress={() => salvarPrestador(prestador)}
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
export default withTheme(AdicionaPrestador);
