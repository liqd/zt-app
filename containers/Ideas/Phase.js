import React from 'react'
import {View} from 'react-native'

import {TextSourceSans} from '../../components/TextSourceSans'
import { styles } from './Phase.styles'

export const Phase = props => {
  const {activePhase, futurePhases, pastPhases} = props
  const startDate = futurePhases ? futurePhases[0].start_date : null
  const endDate = pastPhases ? pastPhases[pastPhases.length-1].end_date : null

  return (
    activePhase ?  (
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
        {pastPhases ? (
          <View>
            {futurePhases ? (
              <TextSourceSans>
                It continues on {startDate}.
              </TextSourceSans>
            ) : (
              <TextSourceSans>
                  It ended on {endDate}.
              </TextSourceSans>
            )}
          </View>
        ) : (
          <View>
            <TextSourceSans>
              It starts on {startDate}.
            </TextSourceSans>
          </View>
        )}
      </View>
    )
  )
}
