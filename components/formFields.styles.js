import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

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
  formImagePicker: {
    alignItems: 'center'
  },
  formImagePreview: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  formImage: {
    width: '30%',
    height: '30%'
  },
  imageButton: {
    width: '100%',
    backgroundColor: COLORS.text.main,
    color: COLORS.paper.inverted
  }
});
