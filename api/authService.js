export default class AuthService {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  

    async register({ email, password, username, firstname, lastname }) {
      try {
        const response = await fetch(`${this.baseURL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            username,
            firstname,
            lastname,
          }),
        });
  
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Registration error:', error.message);
        throw error;
      }
    }
  }
  