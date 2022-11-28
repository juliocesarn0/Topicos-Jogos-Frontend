import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContext } from "../themes/ThemeProvider";

const Stack = createStackNavigator();

import TelaInicial from "../screens/TelaInicial";
import AdicionarJogos from "../screens/AdicionarJogos";
import Configuracoes from "../screens/Configuracoes";
import ListaPrestadores from "../screens/ListaPrestadores";
import Prestador from "../screens/Prestador";
import Jogos from "../screens/Jogos";

export default function Navigation() {
  const { tema } = useContext(AppContext);
  return (
    <NavigationContainer theme={tema}>
      <Stack.Navigator
        initialRouteName="TelaInicial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="AdicionarJogos" component={AdicionarJogos} />
        <Stack.Screen name="Configuracoes" component={Configuracoes} />
        <Stack.Screen name="ListaPrestadores" component={ListaPrestadores} />
        <Stack.Screen name="Prestador" component={Prestador} />
        <Stack.Screen name="Jogos" component={Jogos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
