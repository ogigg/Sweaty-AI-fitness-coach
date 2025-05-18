import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const AUTH_KEY = '@auth_status';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authStatus = await AsyncStorage.getItem(AUTH_KEY);
      setIsAuthenticated(authStatus === 'true');
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  const setAuthStatus = async (status: boolean) => {
    try {
      await AsyncStorage.setItem(AUTH_KEY, status.toString());
      setIsAuthenticated(status);
    } catch (error) {
      console.error('Error setting auth status:', error);
    }
  };

  return {
    isAuthenticated,
    setAuthStatus,
  };
};
