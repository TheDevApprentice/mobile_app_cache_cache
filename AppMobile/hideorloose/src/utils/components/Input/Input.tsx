import { Image, TextInput, View } from "react-native";
import { Text, useTheme } from "react-native-rapi-ui";
import { InputProps } from "../../Types/Input/inputProps";
import { InputType } from "../../Types/Input/InputType";
import { inputStyles } from "../../styles/Input/InputStyle";
import { memo } from "react";

const Input: React.FC<InputProps> = (props) => {
  const { isDarkmode } = useTheme(); 
    const { type = InputType.Text, placeholder = props.placeholder } = props; 
    return (
      <View style={[inputStyles.input, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
        <Text style={inputStyles.label}>{props.label}</Text>
        <View style={[inputStyles.inputField, { backgroundColor: isDarkmode ? '#000000' : '#FFFFFF' }]}>
          <TextInput 
            placeholder={placeholder} 
            style={[inputStyles.inputText, { color: isDarkmode ? '#FFFFFF' : '#000000' }]}
            keyboardType={
              type === InputType.Date 
              ? 
              'numeric' 
              : 
              'default'
            }
          />
          {props.imgSrc && <Image source={{uri: props.imgSrc}} style={inputStyles.image} />}
        </View>
      </View>
    );
  };
  
export default memo(Input); 