import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../lib/userStore'; // <<< Import user store


export default function DashboardScreen() {
  const router = useRouter();
  const { email, clearEmail } = useUserStore();

  const handleLogout = () => {
    // Untuk dummy, logout langsung ke login
    clearEmail(); // <<< Clear email from store
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard 🏠</Text>
      <Text style={styles.subtitle}>
        {email ? `Logged in as: ${email}` : 'No user info'}
     </Text>


      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
