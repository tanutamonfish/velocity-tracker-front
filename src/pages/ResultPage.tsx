import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartCollection from '../components/charts/ChartCollection';
import { ProgressStepper } from '../components/common/ProgressStepper';
import { useLocalLastResults } from '../hooks/useLocalLastResults';
import type { DataResponse } from "../types/DataResponse";

function ResultPage() {
  const { get } = useLocalLastResults()
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DataResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!id) {
      setError('No ID provided')
      setLoading(false)
      return
    }

    try {
      const resultData = get(id)
      if (resultData) {
        setData(resultData)
      } else {
        setError(`Result with ID "${id}" not found`)
      }
    } catch (err) {
      setError('Failed to load result data')
    } finally {
      setLoading(false)
    }
  }, [id, get])

  return (
    <>
      <ProgressStepper />
      {loading && <div>Loading</div>}
      {error && <Alert severity='error'>{error}</Alert>}
      {data && <ChartCollection data={data} />}
    </>
  )
}

export default ResultPage