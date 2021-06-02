import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formTitle: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: 'bold'
  },
  formLabel: {
    fontSize: 15,
    lineHeight: 20,
    paddingTop: 10,
    width: '100%'
  },
  textInput: {
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 18,
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  checkBoxContainer: {
    width: '45%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 0
  },
  checkBoxFormFieldContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dropdownFormField: {
    borderBottomColor: '#d8d8d8',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
  },
  formError: {
    fontSize: 10,
    color: 'red'
  },
});
