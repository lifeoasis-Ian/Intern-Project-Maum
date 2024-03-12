import React, {useState} from "react";
import {View, Text, TouchableOpacity, Modal} from "react-native";
import RoundedButton from "./RoundedButton.tsx";
import color from "../styles/color.ts";
import colors from "../styles/color.ts";

interface ModalPopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopupModal: React.FC<ModalPopupProps> = ({
  visible,
  onClose,
  children,
}) => {
  const [showModal, setShowModal] = useState(visible);
  if (!visible) {
    return null;
  } else {
    return (
      <Modal transparent visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}>
          {children}
        </View>
      </Modal>
    );
  }
};

export default PopupModal;
