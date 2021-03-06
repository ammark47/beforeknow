import { Button, Grid, makeStyles } from '@material-ui/core'
import MessageSharpIcon from '@material-ui/icons/MessageSharp'
import Rating from '@material-ui/lab/Rating'
import MaterialTable from 'material-table'
import { requestChat } from 'models/reviews'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    list: {
        marginTop: '5em',
        marginBottom: '3em'
    }
}))

const ReviewerTable = ({ reviewerList }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [handlingChatRequest, setHandlingChatRequest] = useState(false)
    const history = useHistory()
    const customer = useSelector(state => state.authReducer.postgres_user)
    const columns = [
            { title: 'Name', field: 'name' },
            { title: 'Product Rating', field: 'rating', render: rowData => <Rating readOnly value={rowData.rating}></Rating> },
            { title: 'Review', field: 'review_text' }
        ]

    const handleChatRequest = async (event, review) => {
        // server is handling a previous request
        // avoids duplicate chat requests
        if (handlingChatRequest) {
            return
        }
        setHandlingChatRequest(true)

        const { 
            chatCurrencyNotEnough, 
            chatExistsAlready, 
            serverError, 
            isCustomerAndReviewerSame,
            chatCurrency 
        } = await requestChat(customer.id, review.user_id, review.id)

        setHandlingChatRequest(false)

        let variant = 'success'
        let message = `Chat request sent successfully! You now have ${chatCurrency} tokens remaining. Periodically check \
        your chat page to see if your request has been accepted`
        let action = key => (
            <>
                <Button onClick={() => { history.push('/customers/chat') }}>
                    Check Chats
                </Button>
            </>
        )

        if ( chatCurrencyNotEnough ) {
            variant = 'error'
            message = 'You do not have enough tokens to request a chat. Earn more by submitting reviews and guiding other customers!'
            action = null
        } else if ( chatExistsAlready ) {
            variant = 'error'
            message = `You already have a pending or active chat with ${review.name}`
        } else if ( serverError ) {
            variant = 'error'
            message = 'Network error. Please try again later'
        } else if ( isCustomerAndReviewerSame ) {
            variant = 'error'
            message = 'Talking to yourself is frowned upon. Please choose someone else to chat with.'
            action = null
        }

        const snackbarOptions = {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            variant: variant,
            action: action
        }

        enqueueSnackbar(message, snackbarOptions)
    }

    const actions = [
        {
            icon: MessageSharpIcon,
            iconProps: { style: { backgroundColor: '#08415C', color: 'white' }},
            tooltip: 'Request Chat',
            onClick: handleChatRequest
        }
    ]

    

    return (
        <MaterialTable
            title="Pick a reviewer and click the chat icon to send a request [Requests cost 1 token]"
            columns={columns}
            data={reviewerList}
            actions={actions}
            options={{
                search: false,
                paging: false,
                actionsCellStyle: {
                    backgroundColor: "#08415C",
                    color: "#F56476",
                },
            }}
            localization={{
                header: {
                    actions: "Request Chat",
                }
            }}
        />
    )
}

export const ProductReviewerList = ({ reviewerList }) => {
    const classes = useStyles()

    return (
        <>
            <Grid container className={classes.list} justify="center" >
                <Grid item md={10} className={classes.root}>
                    <ReviewerTable reviewerList={reviewerList} />
                </Grid>
            </Grid>
        </>
    )
}