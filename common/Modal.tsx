import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const ModalComponent = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.eject}>
            <Text style={styles.ejectText}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.ejectCrosses}>X</Text>
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 400,
    backgroundColor: "white",
  },
  modalContent: {
    borderRadius: 10,
  },
  ejectText: {
    fontSize: 18,
  },
  eject: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  ejectCrosses: {
    color: "gray",
    fontSize: 22,
  },
});

export default ModalComponent;
