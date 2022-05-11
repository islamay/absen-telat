

export const endOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export const firstOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
} 