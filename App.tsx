import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import TopicScreen from './screens/TopicScreen';
import ExerciseListScreen from './screens/ExerciseListScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import DailyChallengeScreen from './screens/DailyChallengeScreen';
import LoginScreen from './screens/LoginScreen';
import { ProgressProvider } from './components/ProgressContext';
import { AuthProvider } from './components/AuthContext';
import { Level, Topic, Exercise } from './lib/types';
import { colors } from './lib/theme';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Topic: { levelId: Level };
  ExerciseList: { levelId: Level; topicId: Topic };
  Exercise: { exerciseId: string; exercise?: Exercise };
  Progress: undefined;
  Profile: undefined;
  DailyChallenge: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
  animation: 'slide_from_right' as const,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ProgressProvider>
            <NavigationContainer>
              <StatusBar style="light" />
              <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Topic" component={TopicScreen} />
                <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
                <Stack.Screen name="Exercise" component={ExerciseScreen} />
                <Stack.Screen name="Progress" component={ProgressScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="DailyChallenge" component={DailyChallengeScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </ProgressProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}