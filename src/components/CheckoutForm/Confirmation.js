import { Divider, Typography } from '@material-ui/core'
import React from 'react'

const Confirmation = ({ message }) => {
    console.log(message)
    return (
        <>
            <Typography variant="h6">{message}</Typography>
            <Divider />
        </>
    )
}

export default Confirmation
