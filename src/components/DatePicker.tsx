import React, { useState, useRef, useEffect, useMemo, Dispatch, SetStateAction } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from './Typography'
import { Picker } from '@react-native-picker/picker'
import styleGuide from '../constants/styleGuide'
import { endOfMonth } from '../utils/date'

interface Props {
    choose: 'month' | 'week' | 'day',
    year: number,
    month: number,
    week: number,
    date: number,
    setYear: Dispatch<SetStateAction<number>>,
    setMonth: Dispatch<SetStateAction<number>>,
    setWeek: Dispatch<SetStateAction<number>>,
    setDate: Dispatch<SetStateAction<number>>,
}

const getDayInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
}

const DatePicker: React.FC<Props> = ({ choose, year, month, week, date, setYear, setMonth, setWeek, setDate }) => {

    const currentDateRef = useRef(new Date())


    const avaibleDay = useMemo(() => {
        return getDayInMonth(year, month)
    }, [month, year])

    const avaibleWeek = Math.ceil(avaibleDay / 7)

    const pickerWidthStyle = (choose === 'day' || choose === 'week') ? styles.threeWidth : styles.twoWidth

    const handleChange = (setState: Dispatch<SetStateAction<number>>) => {
        return (v: number) => {
            setState(v)
        }
    }

    return (
        <View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={year}
                    mode={'dropdown'}
                    style={[styles.basePicker, styles.yPicker, pickerWidthStyle]}
                    onValueChange={handleChange(setYear)}
                >
                    {
                        [...Array(3)].map((v, index) => {

                            return (
                                <Picker.Item key={index} value={currentDateRef.current.getFullYear() + index - 1} label={`${currentDateRef.current.getFullYear() + index - 1}`} />
                            )
                        })
                    }
                </Picker>
                <Picker
                    selectedValue={month}
                    mode={'dropdown'}
                    style={[styles.basePicker, pickerWidthStyle]}
                    onValueChange={handleChange(setMonth)}

                >
                    {
                        [...Array(12)].map((v, i) => {


                            return <Picker.Item key={i} value={i} label={`${i + 1}`} />
                        })
                    }
                </Picker>
                {
                    choose === 'week' &&
                    <Picker
                        selectedValue={week}
                        mode={'dropdown'}
                        style={[styles.basePicker, styles.dPicker, pickerWidthStyle]}
                        onValueChange={handleChange(setWeek)}
                    >
                        {
                            [...Array(avaibleWeek)].map((v, i) => {
                                const week = i + 1
                                return <Picker.Item key={i} label={'Minggu ' + week} value={week} />
                            })
                        }
                    </Picker>
                }
                {
                    choose === 'day' &&
                    <Picker
                        selectedValue={date}
                        mode={'dropdown'}
                        style={[styles.basePicker, styles.dPicker, pickerWidthStyle]}
                        onValueChange={handleChange(setDate)}
                    >
                        {
                            [...Array(avaibleDay)].map((v, i) => {
                                const value = i + 1
                                return <Picker.Item key={i} value={value} label={`${value}`} />
                            })
                        }
                    </Picker>
                }


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    basePicker: {
        backgroundColor: styleGuide.colorPrimary,
        color: styleGuide.colorWhite,
        height: 44
    },
    pickerContainer: {
        height: 34,
        alignItems: 'center',
        borderRadius: 14,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    yPicker: {
        backgroundColor: styleGuide.colorTertiary,
    },
    dPicker: {
        backgroundColor: styleGuide.colorSecondary
    },
    threeWidth: {
        width: `${1 / 3 * 100}%`
    },
    twoWidth: {
        width: `${1 / 2 * 100}%`
    }
})

export default DatePicker