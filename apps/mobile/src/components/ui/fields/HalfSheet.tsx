import React from "react";
import { Modal, View, Pressable, ViewProps } from "react-native";

type HalfSheetProps = ViewProps & {
  visible: boolean;
  onClose: () => void;
  backgroundColor: string;
  scrimColor?: string;
  children: React.ReactNode;
  heightPercent?: number;
};

export const HalfSheet: React.FC<HalfSheetProps> = ({
  style,
  visible,
  onClose,
  backgroundColor,
  scrimColor = "rgba(0,0,0,0.4)",
  children,
  heightPercent = 50,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: scrimColor }} onPress={onClose}>
        <View
          style={{
            marginTop: "auto",
            height: `${heightPercent}%`,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor,
            padding: 16,
          }}
        >
          <View
            style={{
              alignSelf: "center",
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: "rgba(127,127,127,0.5)",
              marginBottom: 12,
            }}
          />
          {style && <View style={style}>
            {children}
          </View>}
          {!style && children}
        </View>
      </Pressable>
    </Modal>
  );
};