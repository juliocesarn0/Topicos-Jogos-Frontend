import { Appbar, withTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";

function Header(props) {
  const { colors } = props.theme;
  return (
    <>
      <StatusBar backgroundColor={colors.accent} />
      <Appbar.Header style={{ paddingTop: 8, marginBottom: 16 }}>
        {props.voltar && (
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        )}
        <Image
          style={{
            width: 70,
            height: 70,
            justifyContent: "center",
            alignself: "center",
          }}
          source={require("../img/ricardo.jpg")}
        />
        <Appbar.Content
          title={props.titulo}
          subtitle={props.subtitulo}
          style={{
            justifyContent: "center",
            alignItems: "center",
            color: colors.primary,
          }}
        />
      </Appbar.Header>
    </>
  );
}

export default withTheme(Header);
