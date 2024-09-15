import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient'; 
const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <LinearGradient
      colors={['#131217', '#535255']}
      style={styles.container}
    >
      <Image 
        source={require('../../Densify-app/assets/images/petrol.webp')} 
        style={styles.logo} 
      />
      <Text style={styles.text}>Welcome To Densify</Text>
      <Text style={styles.text}>Samir</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('/main')}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#ccc', 
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 }, 
    shadowOpacity: 0.5,
    shadowRadius: 10, 
    elevation: 10, 
    transform: [{ scale: 1.05 }], 
  },
  text: {
    fontSize: 23,
    color: '#fff',
    marginVertical: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomePage;
