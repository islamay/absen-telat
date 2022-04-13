
const format0x = (date: number) => {
    if (date < 10) {
        return `0${date}`
    }

    return date
}

const dateFormat = (date: Date, toClient: boolean) => {
    const year = date.getFullYear()
    let month: number | string = date.getMonth()
    let days: number | string = date.getDate()

    if (toClient) return `${format0x(days)}-${format0x(month + 1)}-${year}`
    else {
        return `${year}-${format0x(month)}-${format0x(days)}`
    }


}


export default dateFormat
