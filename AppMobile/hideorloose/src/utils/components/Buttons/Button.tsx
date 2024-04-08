import { TouchableOpacity } from "react-native";
import { ButtonProps } from "../../Types/Button/ButtonTypeProps";
import { Text } from "react-native-rapi-ui";
import { memo } from "react";

const Button: React.FC<ButtonProps> = (props) => (
    <TouchableOpacity onPress={() => {
      props.navigation?.navigate("SecondScreen"), 
      props.OnPress(false)
      }} 
      style={
        [props.styles.button, 
          { backgroundColor: props.isDarkmode 
            ? 
            '#5e60ce' 
            : 
            '#7209b7' 
          }
        ]}
    >
      <Text 
      style={props.styles.buttonText}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
);

export default memo(Button)