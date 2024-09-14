import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../Densify-app/assets/images/icon.webp')} 
        style={styles.logo} 
      />
      <Text style={styles.text}>Welcome to Densify</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('/main')}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00aaff',
  },
  logo: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 20,
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
  },
  buttonText: {
    color: '#00aaff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomePage;
