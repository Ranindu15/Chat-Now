import {StyleSheet} from 'react-native';
import {appStyle} from '../../../utility';

export default StyleSheet.create({
  btn: {
    backgroundColor: appStyle.fieldBgColor, 
    width: '60%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
  },
  text: {fontSize: 26, fontWeight: 'bold', color: appStyle.fieldTextColor},
});