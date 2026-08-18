import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { User } from './types';

const USERS_KEY = '@mathcenter_users_v1';
const CURRENT_USER_KEY = '@mathcenter_current_user_v1';
const PASSWORD_PREFIX = '@mathcenter_password_';

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

async function savePassword(userId: string, password: string): Promise<void> {
  const key = `${PASSWORD_PREFIX}${userId}`;
  try {
    await SecureStore.setItemAsync(key, password);
  } catch {
    await AsyncStorage.setItem(key, password);
  }
}

async function getPassword(userId: string): Promise<string | null> {
  const key = `${PASSWORD_PREFIX}${userId}`;
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return await AsyncStorage.getItem(key);
  }
}

export async function loadUsers(): Promise<User[]> {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

async function saveUsers(users: User[]): Promise<void> {
  try {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users', e);
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const userId = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (!userId) return null;
    const users = await loadUsers();
    return users.find(u => u.id === userId) || null;
  } catch (e) {
    return null;
  }
}

async function setCurrentUser(user: User | null): Promise<void> {
  try {
    if (user) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, user.id);
    } else {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Failed to set current user', e);
  }
}

export async function register(name: string, password: string): Promise<User> {
  const users = await loadUsers();
  const existing = users.find(u => u.name.toLowerCase() === name.trim().toLowerCase());
  if (existing) {
    throw new Error('Ce nom est déjà utilisé');
  }

  const user: User = {
    id: generateId(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await saveUsers(users);
  await savePassword(user.id, password);
  await setCurrentUser(user);
  return user;
}

export async function login(name: string, password: string): Promise<User | null> {
  const users = await loadUsers();
  const user = users.find(u => u.name.toLowerCase() === name.trim().toLowerCase());
  if (!user) return null;

  const stored = await getPassword(user.id);
  if (stored !== password) return null;

  await setCurrentUser(user);
  return user;
}

export async function logout(): Promise<void> {
  await setCurrentUser(null);
}
