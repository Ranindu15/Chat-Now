import { StyleSheet } from "react-native";
import { appStyle } from "../../utility";

export default StyleSheet.create({
  input: {
    paddingLeft: 16,
    backgroundColor:'#09040C',
    width: "90%",
    color: appStyle.fieldTextColor,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16,
    borderRadius:8
  },
});