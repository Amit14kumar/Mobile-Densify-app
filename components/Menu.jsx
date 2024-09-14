import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';

const Menu = ({ visible, onClose }) => {
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.menuItem} onPress={() => {
        navigate('/history');
        onClose();
      }}>
        <Text style={styles.menuItemText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
        <Text style={styles.menuItemText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 50, // Adjust as needed
    left: 0, // Position menu on the left side
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: 150,
    elevation: 5,
    zIndex: 10, // Ensure menu appears on top
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Menu;
