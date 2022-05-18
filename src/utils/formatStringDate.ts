
const monthInStringMap = {
    0: 'Januari',
    1: 'Februari',
    2: 'Maret',
    3: 'April',
    4: 'Mei',
    5: 'Juni',
    6: 'Juli',
    7: 'Agustus',
    8: 'September',
    9: 'Oktober',
    10: 'November',
    11: 'Desember'
}

const formatStringDate = (dateProp: Date) => {

    const year = dateProp.getFullYear()
    const month = dateProp.getMonth()
    const date = dateProp.getDate()

    const monthInString = monthInStringMap[month]

    return `${date} ${monthInString} ${year}`
}

export default formatStringDate



