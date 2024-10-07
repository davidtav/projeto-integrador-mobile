import Header from "../Components/Header/Header";

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';
import { NavigationProp, StackActions } from '@react-navigation/native';

export interface LoginProps {
  navigation: NavigationProp<any>;
}
export default function Login({ navigation }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function registerAndLogin() {
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigation.dispatch(StackActions.replace('Routes')); //se o usuário estiver autenticado a pagina redireciona para a tela principal da aplicação
      return;
    } catch (error: any) {
      setLoading(false);
      Alert.alert('insira seus dados para entrar');
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        autoComplete="off"
      />
      <TextInput        
        secureTextEntry={true}
        style={[styles.input, { marginTop: 15 }]}
        placeholder="Password"
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={registerAndLogin}>
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={'white'}
            animating={loading}
          />
        ) : (
          <Text style={{ color: 'white' }}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.register}>
        <Text style={styles.link}>Ainda não tem uma conta ? </Text>
        <Text
          style={[styles.link, { color: 'blue' }]}
          onPress={() => navigation.navigate('Register')}
        >
          clique aqui
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  link: {
    fontSize: 15,
    color: 'gray',
  },
  register: {
    marginTop: 25,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 40,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    height: 45,
    backgroundColor: 'blue',
    borderRadius: 6,
    marginTop: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 45,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});