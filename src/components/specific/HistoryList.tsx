import {
    AccessTime,
    Visibility
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalLastResults, type StoredInfoResult } from '../../hooks/useLocalLastResults';

const HistoryList: React.FC = () => {
    const { getList } = useLocalLastResults();
    const results = getList();

    if (results.length === 0) {
        return (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No saved results yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Your analysis results will appear here
                </Typography>
            </Paper>
        );
    }

    return (
        <List>
            {results.map((result: StoredInfoResult, index: number) => (
                <React.Fragment key={result.id}>
                    <ListItem
                        secondaryAction={
                            <IconButton
                                component={Link}
                                to={`/result/${result.id}`}
                                color="primary"
                                aria-label={`View result ${result.id}`}
                            >
                                <Visibility />
                            </IconButton>
                        }
                    >
                        <ListItemIcon>
                            <AccessTime color="action" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body1" component="span">
                                        <Link to={`/result/${result.id}`}>Result</Link>
                                    </Typography>
                                    <Chip
                                        label={result.id}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                            }
                        />
                    </ListItem>
                    {index < results.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}
        </List>
    );
};

export default HistoryList;