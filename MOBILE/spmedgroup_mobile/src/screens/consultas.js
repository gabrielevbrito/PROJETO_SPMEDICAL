import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class consultas extends Component{
  constructor(props){
    super(props);
    this.state = {
      listaConsultas : []
    };
  }

  buscarConsultas = async () => {
    const resposta = await api.get ('/Consultas');

    this.setState({ listaConsultas : resposta.data })
    console.log(this.state.listaEventos)
  };

  componentDidMount(){
    this.buscarConsultas();
  };

  inscrever = async (item) => {
    console.warn(item);

    try{
        const valorToken = await AsyncStorage.getItem('userToken');
        
        await api.post('/consultas/' + item.idConsulta, {}, {
            headers : {
                'Authorizations' : 'Bearer' + valorToken
            }
        });
    } catch (error) {
        console.log(error);
    }
  };

  render () {
  return(
    <View style={styles.main}>
        <View style={styles.mainHeader}>
            <View style={styles.mainHeaderRow}>
                <Image
                    style={styles.mainHeaderImg}
                    source={require('../../assets/img/logo_spmedgroup.png')}
                />
                <Text style={styles.mainHeaderText}>{"Consultas".toUpperCase()}</Text>
            </View>
            <View style={styles.mainHeaderLine} />
        </View>
        <View style={styles.mainBody}>
            <FlatList
                contentContainerStyle={styles.mainBodyConteudo}
                data={this.state.listaConsultas}
                keyExtractor={ item => item.idConsulta }
                renderItem={this.renderItem}
            />
        </View>
    </View>
  );
  }

  renderizaItem = ({item}) => (
    <View style={styles.flatItemRow}>

        <View style={styles.flatItemContainer}>
            <Text style={styles.flatItemInfo}>{item.idConsulta}</Text>
            <Text style={styles.flatItemInfo}>{item.idStatusConsulta}</Text>
            <Text style={styles.flatItemInfo}>{Intl.DateTimeFormat('pt-BR').format(new Date(item.item.DataConsulta))}</Text>
            <Text style={styles.flatItemInfo}>{item.HorarioConsulta}</Text>
            <Text style={styles.flatItemInfo}>{item.DescricaoAtendimento}</Text>
        </View>

        <TouchableOpacity
            onPress={ () => this.inscrever(item) }
            style={styles.flatItemImg}
        >
            <View>
                <Image 
                    style={styles.flatItemImg}
                    source={require('../../assets/img/view.png')}
                />
            </View>

        </TouchableOpacity>

    </View>
  );

}//fim

const styles = StyleSheet.create({
  
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },

    mainHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainHeaderRow: {
        flexDirection: 'row'
    },

    mainHeaderImg: {
        width: 22,
        height: 22,
        tintColor: '#ccc',
        marginRight: -5,
        marginTop: -12
    },
      
    mainHeaderText: {
        fontSize: 16,
        letterSpacing: 5,
        color: '#999',
        fontFamily: 'Open Sans'
    },
      
    mainHeaderLine: {
        width: 220,
        paddingTop: 10,
        borderBottomColor: '#999',
        borderBottomWidth: 1
    },
    
    mainBody: {
        flex: 4,
    },

    mainBodyContent: {
        paddingTop: 30,
        paddingRight: 50,
        paddingLeft: 50
    },

    flatItemRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 30
    },

    flatItemContainer: {
        flex: 1
    },

    flatItemTitle: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Open Sans Light'
    },

    flatItemInfo: {
        fontSize: 12,
        color: '#999',
        lineHeight: 20
    },

    flatItemImg: {
        justifyContent: 'center'
    },

    flatItemImgIcon: {
        width: 26,
        height: 26,
        tintColor: '#B727FF'
    }

});
