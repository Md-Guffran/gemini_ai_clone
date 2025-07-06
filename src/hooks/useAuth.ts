import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import type { User, SignupData, LoginData } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    setError(null);

    const { user, error } = await authService.signup(data);
    
    if (error) {
      setError(error);
      setIsLoading(false);
      return { success: false, error };
    }

    setIsLoading(false);
    return { success: true, user };
  }, []);

  const login = useCallback(async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    const { user, error } = await authService.login(data);
    
    if (error) {
      setError(error);
      setIsLoading(false);
      return { success: false, error };
    }

    setIsLoading(false);
    return { success: true, user };
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    const { error } = await authService.logout();
    
    if (error) {
      setError(error);
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
    return { success: !error, error };
  }, []);

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);

    const { user, error } = await authService.verifyOTP(email, otp);
    
    if (error) {
      setError(error);
      setIsLoading(false);
      return { success: false, error };
    }

    setIsLoading(false);
    return { success: true, user };
  }, []);

  const resendOTP = useCallback(async (email: string) => {
    setError(null);
    const { error } = await authService.resendOTP(email);
    
    if (error) {
      setError(error);
      return { success: false, error };
    }

    return { success: true };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user && user.emailVerified,
    signup,
    login,
    logout,
    verifyOTP,
    resendOTP,
    clearError
  };
};