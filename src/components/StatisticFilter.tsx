import React, { useState } from 'react'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import styleGuide from '../constants/styleGuide'
import Typography from './Typography'

interface Props {
    reportTime: 'monthly' | 'weekly' | 'daily' | string,
    setReportTime: React.Dispatch<React.SetStateAction<Props['reportTime']>>
}

const StatisticFilter: React.FC<Props> = ({ reportTime, setReportTime }) => {

    return (
        <View>
            <RadioButton.Group
                value={reportTime}
                onValueChange={(v) => setReportTime(v)}
            >
                <View style={{ flexDirection: 'row', marginVertical: 8 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value='Bulanan'
                            status={reportTime === 'Bulanan' ? 'checked' : 'unchecked'}
                            color={styleGuide.colorTertiary}
                        />
                        <Typography>Bulanan</Typography>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value='Mingguan'
                            status={reportTime === 'Mingguan' ? 'checked' : 'unchecked'}
                            color={styleGuide.colorTertiary}
                        />
                        <Typography>Mingguan</Typography>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton
                            value='Harian'
                            status={reportTime === 'Harian' ? 'checked' : 'unchecked'}
                            color={styleGuide.colorTertiary}
                        />
                        <Typography>Harian</Typography>
                    </View>
                </View>
            </RadioButton.Group>
        </View>
    )
}

export default StatisticFilter