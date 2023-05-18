import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Typography variant='h2' >Page Not Found</Typography>
            </Box>
        </Box>
    )
}

export default NotFound