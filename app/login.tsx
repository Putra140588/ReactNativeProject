import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // <- Tambahan icon
import { login } from '../lib/authService'; // <<< Import service login
import { useUserStore } from '../lib/userStore'; // <<< Tambah ini


export default function LoginScreen() {
  const router = useRouter();
  const {setEmail:setUserEmail } = useUserStore(); // <<< Ambil dari store
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try{
        setLoading(true);
        const res: any = await login({ email, password });
        setUserEmail(res.user.email); // <<< Simpan email ke store
        console.log('Login success:', res);
        Alert.alert('Success', `Welcome, ${res.user.email}!`);
        router.replace('/dashboard'); // Nanti kita buat dashboard
    }catch(error: any){
        Alert.alert('Error', error.message);
    }finally {
        setLoading(false);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>


      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Link href="/register" style={styles.footerLink}>
          Sign Up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#111827',
  },
  input: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  footerText: {
    color: '#6b7280',
  },
  footerLink: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});
