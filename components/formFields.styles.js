import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formLabel: {
    fontSize: 15,
    lineHeight: 20,
    paddingTop: 10,
  },
  textInput: {
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 18,
  },
  checkBox: {
    flex: 1,
  },
  checkBoxContainer: {
    flexDirection: 'row',
  },
  formTitle: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: 'bold'
  },
  formError: {
    fontSize: 10,
    color: 'red'
  },
});
