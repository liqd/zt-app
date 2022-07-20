import React from 'react'
import {View} from 'react-native'

import {TextSourceSans} from '../../components/TextSourceSans'
import { styles } from './Phase.styles'

export const Phase = props => {
  const {activePhase, futurePhases, pastPhases} = props
  const startDate = futurePhases ? futurePhases[0].start_date : null
  const endDate = pastPhases ? pastPhases[pastPhases.length-1].end_date : null

  function getInactivePhaseText() {
    if(!pastPhases){
      return `It starts on ${startDate}`
    }
    if(futurePhases){
      return `It continues on ${startDate}.`
    }
    return `It ended on ${endDate}.`
  }

  return (
    activePhase ? (
      <View style={styles.phaseContainer}>
        <TextSourceSans style={styles.phaseText}>
          {activePhase.name + ' (active)'}
        </TextSourceSans>
        <TextSourceSans style={styles.phaseDate}>
          {activePhase.start_date} – {activePhase.end_date}
        </TextSourceSans>
        <TextSourceSans style={styles.phaseText}>
          {activePhase.description}
        </TextSourceSans>
      </View>
    ) : (
      <View style={styles.phaseContainer}>
        <TextSourceSans>
          Participation is not possible at the moment.
        </TextSourceSans>
        <View>
          <TextSourceSans>
            {getInactivePhaseText()}
          </TextSourceSans>
        </View>
      </View>
    )
  )
}
