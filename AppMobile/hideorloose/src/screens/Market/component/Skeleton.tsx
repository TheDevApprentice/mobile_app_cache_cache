import { View } from "react-native";
import { skellettonStyle } from "../Styles/SkellettonStyle";

 export const SkeletonItem: React.FC = () => (
    <View style={skellettonStyle.skeletonItemContainer}>
      <View style={skellettonStyle.skeletonImage} />
      <View style={skellettonStyle.skeletonCardBody}>
        <View style={skellettonStyle.skeletonTitle} />
        <View style={skellettonStyle.skeletonDescription} />
      </View>
      <View style={skellettonStyle.skeletonCardFooter}>
        <View style={skellettonStyle.skeletonPrice} />
        <View style={skellettonStyle.skeletonQuantity} />
      </View>
    </View>
  );