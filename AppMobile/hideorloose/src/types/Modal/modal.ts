export type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedProduct: { title: string, unit_price: number } | null | undefined; 
    selectedQuantity: number;
    setSelectedQuantity: (quantity: number) => void;
    handleConfirmQuantity: () => void;
    setTotal:(quantity: number) => void;
    total: number;
  }