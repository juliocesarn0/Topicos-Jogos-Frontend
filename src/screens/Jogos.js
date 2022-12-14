import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import {
  Text,
  withTheme,
  List,
  FAB,
  ActivityIndicator,
  IconButton,
  Avatar,
} from "react-native-paper";
import Header from "../components/Header";
import ListaJogo from "./ListaJogo";
import ApiJogos from "../resources/ApiJogos";

function Jogos({ navigation, theme }) {
  const [Jogo, setJogo] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = theme;

  useEffect(() => {
    getJogo();
  }, []);

  const getJogo = async () => {
    setCarregando(true);
    let retorno = await ApiJogos.getJogo();
    retorno.ok === 0
      ? Alert.alert("Erro!", "Não foi possível obter a lista!")
      : setJogo(retorno);
    setCarregando(false);
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await getJogo();
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  }, [refreshing]);

  return (
    <>
      <View style={{ backgroundColor: colors.surface, flex: 1 }}>
        <Header
          titulo="Jogos"
          subtitulo="Relação de Jogos"
          voltar={true}
          navigation={navigation}
        />
        {carregando && (
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.primary}
          />
        )}
        <List.Subheader>
          <Avatar.Icon size={24} icon="refresh" /> Para atualizar os Jogos
        </List.Subheader>
        {Jogo.length === 0 && !carregando ? (
          <View>
            <Text style={{ fontSize: 20 }}>
              Ainda não há nenhum prestador de serviço cadastrado.
            </Text>
          </View>
        ) : (
          <FlatList
            data={Jogo}
            keyExtractor={(item) => item._id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <ListaJogo data={item} navigation={navigation} />
            )}
          />
        )}
        <FAB
          style={styles.fab}
          icon="plus"
          label=""
          onPress={() => navigation.navigate("AdicionarJogos")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  /*fab - float action button  */
  fab: {
    position: "absolute",
    margin: 16,
    right: 4,
    bottom: 8,
  },
});

export default withTheme(Jogos);
