

const dateFormat = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = date.getDay()

    return `${days}-${month}-${year}`

}


export default dateFormat
