import { Box, Divider, Paper, Typography } from "@mui/material"
import HistoryList from "../components/specific/HistoryList"
import { useLocalLastResults } from "../hooks/useLocalLastResults"

function HistoryPage() {
  const { getList } = useLocalLastResults()
  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="h2">
          Results ({getList().length})
        </Typography>
      </Box>
      <Divider />

      <HistoryList />
    </Paper>
  )
}

export default HistoryPage
