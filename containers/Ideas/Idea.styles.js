import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  actionsContainer: {
    height:60,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  titleContainer: {
    marginVertical: 5
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginVertical: 5
  },
  infoContainer: {
    marginVertical: 15
  },
  title: {
    fontSize: 20,
    lineHeight: 60,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
  },
  bottomActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 32,
  },
  ratingButtons: {
    width: 80,
    flexDirection: 'row',
  },
  ideaImage: {
    marginRight: 5,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});
