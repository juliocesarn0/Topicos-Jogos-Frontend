import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { withTheme, List, Switch } from 'react-native-paper'
import Header from '../components/Header'
import { AppContext } from '../themes/ThemeProvider'
import { Light, Dark } from '../themes/Themes'

function Configuracoes({ navigation, theme }) {
    const { colors } = theme
    const { tema, setTema } = useContext(AppContext)
    return (
        <>
            <Header titulo='Configurações' subtitulo='Tema de Cores' voltar={true} navigation={navigation} />
            <View style={{ background: colors.background, paddingHorizontal: 10, paddingVertical: 20, flex: 1 }}>
                <List.Item
                    title={tema === Dark ? 'Tema Escuro' : 'Tema Claro'}
                    onPress={() => setTema(tema === Dark ? Light : Dark)}
                    left={() => <List.Icon icon={tema === Dark ? 'brightness-3' : 'brightness-5'} />}
                    right={() => <Switch value={tema === Dark ? true : false}
                        onValueChange={() => setTema(tema === Dark ? Light : Dark)} />}
                />
            </View>
        </>
    )
}

export default withTheme(Configuracoes)