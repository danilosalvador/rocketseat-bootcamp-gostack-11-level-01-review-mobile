import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, FlatList, View, Text, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [ registers, setRegisters ] = useState([]);

  useEffect(() => {
    api.get('register').then(response => {
      setRegisters(response.data);
    })
  }, []);

  async function handlerAdd() {
    const response = await api.post('register', {
      name: `Danilo Salvador ${registers.length}`,
      email: `danilo.salvador${registers.length}@smartlogic.com.br`
    });

    const register = response.data;

    setRegisters([...registers, register]);
  }

  return (
    <>
      <StatusBar barStyle="light-content"backgroundColor="#476b9e"/>
      <SafeAreaView
        style={styles.container}>
        <Text style={styles.title}>The Rocket App 🚀</Text>
        <FlatList
          data={registers}
          keyExtractor={register => register.id}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.rowText}>{item.name}</Text>
            </View>
          )}>
        </FlatList>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handlerAdd}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    height: 30,
    marginBottom: 5,
    paddingLeft: 10,
    backgroundColor: '#c4d2e5',
    justifyContent: 'center'
  },
  rowText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#476b9e',
    margin:20,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff'
  }
});