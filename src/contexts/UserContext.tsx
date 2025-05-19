import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUser, updateUserHealth } from '../services/api';

export interface HealthMetrics {
  steps: number;
  waterIntake: number;
  sleepHours: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  healthMetrics: HealthMetrics;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateHealth: (metrics: Partial<HealthMetrics>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulating a user login - in a real app, this would be an authenticated user
        const userData = await getUser(1);
        setUser(userData);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateHealth = async (metrics: Partial<HealthMetrics>) => {
    if (!user) return;
    
    try {
      const updatedMetrics = { ...user.healthMetrics, ...metrics };
      const updatedUser = await updateUserHealth(user.id, updatedMetrics);
      setUser(updatedUser);
    } catch (err) {
      setError('Failed to update health metrics');
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, updateHealth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};