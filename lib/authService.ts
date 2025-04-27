export async function login({ email, password }: { email: string; password: string }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === '123') {
          resolve({ token: 'dummy-token', user: { email } });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Delay 1 detik untuk simulasi loading
    });
  }
  
  export async function register({ email, password }: { email: string; password: string }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ message: 'Account created successfully', user: { email } });
        } else {
          reject(new Error('Missing email or password'));
        }
      }, 1000); // Delay 1 detik
    });
  }
  