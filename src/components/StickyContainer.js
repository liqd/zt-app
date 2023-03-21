import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'

export const StickyContainer = (props) => {
  return (
    <View style={styles.stickyPosition}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  stickyPosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
})
