import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { formatCnpjCpf } from '../utils'

import { List, withTheme, Avatar } from 'react-native-paper'
import Api from '../resources/Api'

function ListaPrestador({ data, navigation, theme }) {
  const { colors } = theme

  async function confirmaExclusaoRegistro() {
    if (Platform.OS === 'web') {
      if (confirm('Deseja mesmo excluir este prestador?') === true) { await excluirPrestador(data) }
    } else {
      Alert.alert('Atenção!', 'Deseja mesmo excluir este prestador?', [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await excluirPrestador(data)
          },
        },
      ])
    }
  }

  const excluirPrestador = async (dadosPrestador) => {
    let excluir = await Api.removePrestador(dadosPrestador._id)
    if (excluir.hasOwnProperty('errors')) {
      Platform.OS === 'web' ? alert(`‼️Erro: ${excluir.errors[0].msg}`) : Alert.alert("‼️Erro", excluir.errors[0].msg)
    } else if (excluir.hasOwnProperty('acknowledged')) {
      Platform.OS === 'web' ? alert(`✅Tudo OK: Registro excluído com sucesso `) : Alert.alert("✅Tudo OK", 'Registro excluído com sucesso')
      navigation.navigate('Inicio')
    }
  }

  const alteraPrestador = async (dadosPrestador) => {
    navigation.navigate('Prestador', { prestador: dadosPrestador })
  }

  function botaoLadoDireito() {
    return (
      <View>
        <TouchableOpacity
          style={styles.buttonExcluir}
          onPress={confirmaExclusaoRegistro}
        >
          <Avatar.Icon size={24} icon="delete" style={{ backgroundColor: colors.background }} />
          <Text style={{ color: colors.background }} >Excluir</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={botaoLadoDireito}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => alteraPrestador(data)}
      >

        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background, borderRadius: 20 }}>
          <List.Item
            title={data.razao_social}
            description={`CNPJ: ${formatCnpjCpf(data.cnpj)}`}
            descriptionStyle={[styles.descricao]}
            right={Platform.OS === 'web' ? botaoLadoDireito : ''}
            left={props => <Avatar.Text label={data.razao_social.substring(0, 2)} />}
          />

        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    height: 80,
    borderRadius: 8,
    marginBottom: 2,
    marginHorizontal: 8,
  },
  buttonExcluir: {
    backgroundColor: '#d9534f',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  descricao: {
    paddingBottom: 16
  }
})

export default withTheme(ListaPrestador)