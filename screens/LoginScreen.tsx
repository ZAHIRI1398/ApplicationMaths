import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSizes, spacing, radius, shadows } from '../lib/theme';
import { useAuth } from '../components/AuthContext';
import { RootStackParamList } from '../App';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = name.trim().length > 0 && password.length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const success = await login(name.trim(), password);
        if (success) {
          navigation.replace('Home');
        } else {
          setError('Nom ou mot de passe incorrect.');
        }
      } else {
        await register(name.trim(), password);
        navigation.replace('Home');
      }
    } catch (e: any) {
      setError(e.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['#7C3AED', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.logoCircle}>
              <Ionicons name="school" size={48} color={colors.white} />
            </View>
            <Text style={styles.title}>Math-Sainte Bernadette</Text>
            <Text style={styles.subtitle}>{isLogin ? 'Connecte-toi' : 'Crée ton compte'}</Text>
          </LinearGradient>

          <View style={styles.card}>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, isLogin && styles.toggleActive]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Connexion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, !isLogin && styles.toggleActive]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Nouveau</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ton prénom / nom</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ex : Sami"
                placeholderTextColor={colors.textLight}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Ton mot de passe"
                placeholderTextColor={colors.textLight}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, !isValid && styles.submitDisabled]}
              onPress={handleSubmit}
              disabled={!isValid || loading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={isValid ? ['#7C3AED', '#EC4899'] : [colors.textLight, colors.textLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <>
                    <Text style={styles.submitText}>
                      {isLogin ? 'Se connecter' : 'Créer mon compte'}
                    </Text>
                    <Ionicons name="arrow-forward" size={22} color={colors.white} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Text style={styles.hint}>
              {isLogin
                ? 'Chaque élève a son propre nom et mot de passe.'
                : 'Choisis un nom unique pour ton profil.'}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scroll: { flexGrow: 1 },
  hero: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: { fontSize: fontSizes.xxl, fontWeight: '900', color: colors.white },
  subtitle: { fontSize: fontSizes.lg, color: 'rgba(255,255,255,0.9)', marginTop: spacing.xs },
  card: {
    flex: 1,
    marginTop: -spacing.xl,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.lg,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.md,
  },
  toggleActive: { backgroundColor: colors.primary },
  toggleText: { fontWeight: '700', color: colors.textLight },
  toggleTextActive: { color: colors.white },
  inputGroup: { marginBottom: spacing.md },
  label: { fontSize: fontSizes.sm, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  submitBtn: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginTop: spacing.md,
    ...shadows.md,
  },
  submitDisabled: { opacity: 0.7 },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  submitText: { color: colors.white, fontWeight: '800', fontSize: fontSizes.lg, marginRight: spacing.sm },
  errorBox: {
    backgroundColor: colors.errorLight,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  errorText: { color: colors.error, fontWeight: '700', fontSize: fontSizes.sm, textAlign: 'center' },
  hint: { textAlign: 'center', color: colors.textLight, marginTop: spacing.lg, fontSize: fontSizes.sm },
});
