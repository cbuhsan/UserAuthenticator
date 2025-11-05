import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Input from '../components/Input';
import {useAuth} from '../context/AuthContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {eyeClosed, kLoudiusLogo, openEye} from '../assets/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const {signup} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setError(null);
  }, [name, email, password]);

  const handleSignup = async () => {
    setError(null);
    setLoading(true);
    const res = await signup(name.trim(), email.trim(), password);
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? 'Signup error');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <Image source={kLoudiusLogo} style={styles.logo} />
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Input
            label="Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{position: 'relative'}}>
            <Input
              label="Password"
              placeholder="At least 6 characters"
              secureTextEntry={!visible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setVisible(v => !v)}
              style={{position: 'absolute', right: 12, top: 36}}>
              <Image source={!visible ? eyeClosed : openEye} />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Signing up...' : 'Signup'}
            </Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#007AFF'}}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    position: 'absolute',
    top: 20,
    marginHorizontal: 16,
    resizeMode: 'contain',
    height: 200,
    width: 200,
    borderRadius: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  title: {fontSize: 22, fontWeight: '600', marginBottom: 12},
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  row: {flexDirection: 'row', marginTop: 12, justifyContent: 'center'},
  errorText: {color: '#e74c3c', marginTop: 8},
});
