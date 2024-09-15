import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MainPage = () => {
  const navigate = useNavigate();
  const [temp, setTemp] = useState('');
  const [density, setDensity] = useState('');
  const [challanDensity, setChallanDensity] = useState('');
  const [densityCorrection, setDensityCorrection] = useState('');
  const [correctionFactor, setCorrectionFactor] = useState('');
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false); // State for menu visibility

  const saveToHistory = async (record) => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
      history.unshift(record); // Add new record at the start
      if (history.length > 10) history.pop(); // Keep only the latest 10 records
      await AsyncStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };

  const calculateDensity = async () => {
    if (!temp || !density) {
      alert("Please enter both Temperature and Actual Density");
      return;
    }

    const tempValue = parseFloat(temp);
    const densityValue = parseFloat(density);

    if (isNaN(tempValue) || isNaN(densityValue)) {
      alert("Please enter valid numbers for Temperature and Density");
      return;
    }

    const densityCorrectionResult = ((tempValue - 15 )* 0.66 + densityValue).toFixed(2);
    const correctionFactorResult = (parseFloat(densityCorrectionResult) + 1.4).toFixed(2);

    setDensityCorrection(densityCorrectionResult);
    setCorrectionFactor(correctionFactorResult);

    // Save to history
    await saveToHistory({
      temp,
      density,
      densityCorrection: densityCorrectionResult,
      correctionFactor: correctionFactorResult,
    });
  };

  const calculateError = async () => {
    if (!correctionFactor || !challanDensity) {
      alert("Please enter the Challan Density after calculating the Correction Factor");
      return;
    }

    const correctionFactorValue = parseFloat(correctionFactor);
    const challanDensityValue = parseFloat(challanDensity);

    if (isNaN(correctionFactorValue) || isNaN(challanDensityValue)) {
      alert("Please enter valid numbers for Correction Factor and Challan Density");
      return;
    }

    const errorResult = ( correctionFactorValue-challanDensityValue).toFixed(2);

    setError(errorResult);

    // Save to history
    await saveToHistory({
      temp,
      density,
      correctionFactor,
      challanDensity,
      error: errorResult,
    });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Image
          source={require('../../Densify-app/assets/images/logobrpl.png')}
          style={styles.logo}
        />
      </View>

      <Modal visible={menuVisible} transparent={true} animationType="slide">
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => navigate('/')} style={styles.menuItem}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('/history')} style={styles.menuItem}>
            <Text style={styles.menuText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuCloseButton}>
            <Text style={styles.menuText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.content}>
        {/* Input Fields */}
        <View style={styles.inputGroupHorizontal}>
          <Text style={styles.label}>Temperature :</Text>
          <TextInput
            style={styles.inputHorizontal}
            placeholder="Temperature (°C)"
            value={temp}
            onChangeText={setTemp}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroupHorizontal}>
          <Text style={styles.label}>Actual Density :</Text>
          <TextInput
            style={styles.inputHorizontal}
            placeholder="Actual Density (kg/m³)"
            value={density}
            onChangeText={setDensity}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={calculateDensity}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* Display Fields */}
        <View style={styles.displayBox}>
          <Text style={styles.label}>Density Correction @15:</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{densityCorrection}</Text>
          </View>
        </View>

        <View style={styles.displayBox}>
          <Text style={styles.label}>Correction Factor:</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{correctionFactor}</Text>
          </View>
        </View>

        {/* Input for Challan Density */}
        <View style={styles.inputGroupHorizontal}>
          <Text style={styles.label}>Challan Density :</Text>
          <TextInput
            style={styles.inputHorizontal}
            placeholder="Challan Density (kg/m³)"
            value={challanDensity}
            onChangeText={setChallanDensity}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={calculateError}>
            <Text style={styles.buttonText}>Calculate Error</Text>
          </TouchableOpacity>
        </View>

        {/* Display Error */}
        <View style={styles.displayBox}>
          <Text style={styles.label}>Error:</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{error}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#704949',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#6f4d4d',
  },
  menuButton: {
    width: 28,
    height: 23,
  },
  logo: {
    width: 127,
    height: 21,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  inputGroupHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  inputHorizontal: {
    width: 238,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  button: {
    width: 120,
    height: 50,
    backgroundColor: '#903e3e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  displayBox: {
    marginBottom: 20,
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#000',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 18,
  },
  menuCloseButton: {
    padding: 20,
  },
});

export default MainPage;
