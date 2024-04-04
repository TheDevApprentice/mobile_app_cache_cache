// ModalComponent.tsx
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modalStyles } from '../Styles/ModalStyle';
import { ModalComponentProps } from '../../../types/Modal/modal';
import { useTheme } from 'react-native-rapi-ui';

const ModalComponent: React.FC<ModalComponentProps> = ({ 
  modalVisible, 
  setModalVisible, 
  selectedProduct, 
  selectedQuantity, 
  setSelectedQuantity, 
  handleConfirmQuantity, 
  total,
  setTotal
}) => {
  const { isDarkmode } = useTheme();
  return (
    <Modal
      animationType="slide"
      style={modalStyles.modalContainer}
      transparent={true}
      visible={modalVisible}
      onShow={
        () => {
          setTotal(selectedQuantity)
        }
      }
      onRequestClose={
        () => setModalVisible(false)
      }
    >
      <View style={modalStyles.modalContent}> 
        <Text style={modalStyles.modalTitle}>{selectedProduct?.title}</Text> 
        <View style={modalStyles.quantitySelector}>
          <TouchableOpacity onPress={() => {
              setSelectedQuantity(Math.max(1, selectedQuantity - 1))
              setTotal(selectedQuantity - 1 * selectedProduct.unit_price / 100 )
              }
            }
          >
            <Ionicons name="remove" size={24} color="black" />
          </TouchableOpacity>
          <Text style={modalStyles.selectedQuantity}>{selectedQuantity}</Text>
          <TouchableOpacity onPress={() => {
              setSelectedQuantity(selectedQuantity + 1)
              setTotal(selectedQuantity + 1 * selectedProduct.unit_price / 100 )
              }}
          >
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Pressable style={[modalStyles.confirmButton, 
                      { backgroundColor: selectedQuantity === 0 ? '#da1e37' : '#63c132' }
                    ]} 
                   onPress={() => {
                      if(selectedQuantity !== 0){
                        handleConfirmQuantity();   
                      }
                    }
                  }
        >
          <Text style={[modalStyles.confirmButtonText, 
                          { color: isDarkmode ? '#f4f3ee' : '#f8f9fa' }]}>Confirm</Text>
        </Pressable>
        <View style={modalStyles.selectedQuantityTotalContainer}>
          <Text style={modalStyles.selectedQuantityTotalText}>Total</Text>
          <Text style={modalStyles.selectedQuantityTotalQuantity}>{total} $</Text>
        </View>
        <View style={modalStyles.selectedPriceTotalContainer}>
          <Text style={modalStyles.selectedPriceTotalText}>Price</Text>
          <Text style={modalStyles.selectedPriceTotalQuantity}>{selectedProduct.unit_price / 100} $</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
