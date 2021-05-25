import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    padding: 32,
    marginVertical: 10
  },
  actionsContainer: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  titleContainer: {
    flex: 2,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
  }
});
