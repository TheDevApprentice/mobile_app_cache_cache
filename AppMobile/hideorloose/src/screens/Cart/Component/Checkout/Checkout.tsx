// ModalComponent.tsx
import React, { memo } from 'react';
import { View, Modal } from 'react-native';
import { CheckoutComponentProps } from '../../Types/Checkout/checkout';
import { checkoutStyles } from '../../Styles/CheckoutStyles';
import Bill from './Bill/Bill';

const CheckoutModal: React.FC<CheckoutComponentProps> = ({
  navigation,  
  cartList,
  modalVisible, 
  setModalVisible, 
  selectedProduct, 
  selectedQuantity, 
  setSelectedQuantity, 
  handleConfirmQuantity, 
  total,
  setTotal,
  taxRate,
}) => {
  return (
    <Modal
      animationType="slide"
      style={checkoutStyles.modalContainer}
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
      <View style={checkoutStyles.modalContent}> 
        <Bill setModalVisible={setModalVisible} navigation={navigation} items={cartList} taxRate={taxRate}/>
      </View>
    </Modal>
  );
};

export default memo(CheckoutModal);
