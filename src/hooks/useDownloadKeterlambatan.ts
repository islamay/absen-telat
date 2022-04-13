import { useRef, useState } from 'react'
import { BACKEND_URI } from '../helpers/env'
import dateFormat from '../helpers/dateFormat'
import * as FileSystem from 'expo-file-system'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const { StorageAccessFramework } = FileSystem

const excelMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

const getDownloadKeterlambatanUrl = (start: string, end: string) => {
    return `${BACKEND_URI}/keterlambatan/download?start=${start}`
}

const getBearerToken = (token: string) => {
    return `Bearer ${token}`
}

const useDownloadKeterlambatan = () => {
    const SAFRequestResult = useRef({ granted: false, directoryUri: '' })
    const [isDownloading, setIsDownloading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [fileContentUri, setFileContentUri] = useState('')
    const auth = useSelector((state: RootState) => state.auth)

    const download = async (start: Date, end: Date) => {
        if (!SAFRequestResult.current.granted) {
            const result = await StorageAccessFramework.requestDirectoryPermissionsAsync()
            if (result.granted) {
                SAFRequestResult.current = {
                    granted: true,
                    directoryUri: result.directoryUri
                }
            } else {
                setIsError(true)
                setErrorMessage('Gagal mendownload karena akses folder tidak diberikan')
                return;
            }
        }

        const validStartDate = dateFormat(start, false)
        const validEndDate = dateFormat(end, false)
        const downloadUrl = getDownloadKeterlambatanUrl(validStartDate, validEndDate)

        try {
            console.log(SAFRequestResult.current);

            setIsDownloading(true)
            const downloadResult = await FileSystem.downloadAsync(downloadUrl, FileSystem.documentDirectory + 'data.xlsx', { headers: { Authorization: getBearerToken(auth.token) } })
            const newFileSAFUri = await StorageAccessFramework.createFileAsync(SAFRequestResult.current.directoryUri, 'data.xlsx', excelMimeType)

            if (downloadResult.status !== 200) throw new Error()

            const downloadedFileData = await FileSystem.readAsStringAsync(downloadResult.uri, { encoding: 'base64' })
            await FileSystem.writeAsStringAsync(newFileSAFUri, downloadedFileData, { encoding: 'base64' })
            await FileSystem.deleteAsync(downloadResult.uri)

            const fileInfo = await FileSystem.getInfoAsync(newFileSAFUri)

            setFileContentUri(fileInfo.uri)
            setIsSuccess(true)
        } catch (error) {
            console.log(error);
            setIsError(true)
            setErrorMessage('Gagal mendownload')
        } finally {
            setIsDownloading(false)
        }


    }


    return { isDownloading, isSuccess, isError, errorMessage, fileContentUri, download }
}

export default useDownloadKeterlambatan