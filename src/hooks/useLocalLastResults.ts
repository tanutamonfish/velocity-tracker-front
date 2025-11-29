import { useCallback } from 'react'
import type { DataResponse } from '../types/DataResponse'

export interface StoredResultForHistory {
    id: string
    data: DataResponse
    created_at: number
}

export interface StoredInfoResult {
    id: string
    created_at: number
}

const STORAGE_INFO_KEY = 'results-info-store'
const STORAGE_DATA_PREFIX = 'result-data-'

export const useLocalLastResults = () => {
    const add = useCallback((result: StoredResultForHistory) => {
        try {
            const dataKey = `${STORAGE_DATA_PREFIX}${result.id}`
            localStorage.setItem(dataKey, JSON.stringify(result.data))

            const infoList = getStoredInfoList()
            const newInfo: StoredInfoResult = {
                id: result.id,
                created_at: result.created_at
            }

            const filteredList = infoList.filter(item => item.id !== result.id)
            const updatedList = [newInfo, ...filteredList]

            localStorage.setItem(STORAGE_INFO_KEY, JSON.stringify(updatedList))

            // console.log('saved data ', result);
            
        } catch (error) {
            console.error('Failed to save result:', error)
        }
    }, [])

    const get = useCallback((id: string): DataResponse | null => {
        try {
            const dataKey = `${STORAGE_DATA_PREFIX}${id}`
            const storedData = localStorage.getItem(dataKey)
            return storedData ? JSON.parse(storedData) : null
        } catch (error) {
            console.error('Failed to get result data:', error)
            return null
        }
    }, [])

    const getList = useCallback((): StoredInfoResult[] => {
        try {
            return getStoredInfoList().sort((a, b) =>
                b.created_at - a.created_at
            )
        } catch (error) {
            console.error('Failed to get results list:', error)
            return []
        }
    }, [])

    const remove = useCallback((id: string) => {
        try {
            const dataKey = `${STORAGE_DATA_PREFIX}${id}`
            localStorage.removeItem(dataKey)

            const infoList = getStoredInfoList()
            const updatedList = infoList.filter(item => item.id !== id)
            localStorage.setItem(STORAGE_INFO_KEY, JSON.stringify(updatedList))
        } catch (error) {
            console.error('Failed to remove result:', error)
        }
    }, [])

    const getStoredInfoList = (): StoredInfoResult[] => {
        try {
            const stored = localStorage.getItem(STORAGE_INFO_KEY)
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    }

    return {
        add, get, getList, remove
    }
}