import { useRef, useState } from 'react'
import { useAppSelector } from './redux'
import * as FileSystem from 'expo-file-system'
import Constant from 'expo-constants'

export const excelMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

const useDownloadLatenessReport = () => {
    const SAFPermission = useRef({ granted: false, uri: '' })
    const fileContentUri = useRef('')
    const [info, setInfo] = useState<{
        isLoading: boolean,
        isSuccess: boolean,
        isError: boolean,
        errorMessage: string
    }>({ isLoading: false, isSuccess: false, isError: true, errorMessage: '' })
    const auth = useAppSelector(state => state.auth)

    const requestPermission = async () => {
        const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
        if (permission.granted) {
            SAFPermission.current = { granted: true, uri: permission.directoryUri }
            return true
        } else {
            setInfo({ isLoading: false, isSuccess: false, isError: true, errorMessage: 'Gagal mendownload akses file tidak diberikan' })
            return false
        }
    }

    const download = async (start: string, end: string) => {
        const granted = await requestPermission()
        if (!granted) return;


        setInfo(prev => ({ ...prev, isLoading: true, isSuccess: false, isError: false }))
        try {
            const { uri } = await FileSystem.downloadAsync(
                Constant.manifest?.extra?.backend_url + `/keterlambatan/download?start=${start}&end=${end}`,
                FileSystem.documentDirectory + 'data-keterlambatan.xlsx',
                { headers: { authorization: 'Bearer ' + auth.token } }
            )

            const excel = await FileSystem.StorageAccessFramework.createFileAsync(
                SAFPermission.current.uri,
                'data-keterlambatan.xlsx',
                excelMimeType
            )

            const excelData = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' })
            await FileSystem.writeAsStringAsync(excel, excelData, { encoding: 'base64' })
            await FileSystem.deleteAsync(uri)
            const { uri: excelFileUri } = await FileSystem.getInfoAsync(excel)
            fileContentUri.current = excelFileUri

            setInfo(prev => ({ ...prev, isLoading: false, isSuccess: true, isError: false }))
        } catch (error) {
            setInfo(prev => ({ ...prev, isLoading: false, isSuccess: false, isError: true, errorMessage: 'Gagal mendownload coba lagi nanti' }))
        }



    }

    return {
        download,
        isLoading: info.isLoading,
        isSuccess: info.isSuccess,
        isError: info.isError,
        fileContentUri: fileContentUri.current,
    }
}

export default useDownloadLatenessReport