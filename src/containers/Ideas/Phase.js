import React from 'react'
import { useTranslation } from 'react-i18next'
import {View} from 'react-native'

import {TextSourceSans} from '../../components/TextSourceSans'

import { styles } from './Phase.styles'

export const Phase = props => {
  const { t } = useTranslation()
  const {activePhase, futurePhases, pastPhases} = props
  const startDate = futurePhases ? futurePhases[0].start_date : null
  const endDate = pastPhases ? pastPhases[pastPhases.length-1].end_date : null

  function getInactivePhaseText() {
    if(!pastPhases){
      return t('It starts on {{startDate}}.', {startDate: startDate})
    }
    if(futurePhases){
      return t('It continues on {{startDate}}}.', {startDate: startDate})
    }
    return t('It ended on {{endDate}}.', { endDate: endDate})
  }

  return (
    activePhase ? (
      <View style={styles.phaseContainer}>
        <TextSourceSans style={styles.phaseText}>
          {t('{{activePhase}} (active)', {activePhase: activePhase.name})}
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
          {t('Participation is not possible at the moment.')}
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
