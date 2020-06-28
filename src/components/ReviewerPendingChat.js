import { Button, Grid, makeStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import RefreshSharpIcon from '@material-ui/icons/RefreshSharp'
import ThumbDownSharpIcon from '@material-ui/icons/ThumbDownSharp'
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp'
import MaterialTable from 'material-table'
import { acceptChat, checkPendingChats, declineChat } from 'models/chat'
import { useSnackbar } from 'notistack'
import React, { createRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    pendingChatListContainer: {
        marginTop: '5em',
        marginBottom: '3em'
    }
}))


const ReviewerPendingChatTable = () => {
    const classes = useStyles()
    const tableRef = createRef()
    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [declineChatInfo, setDeclineChatInfo] = useState({})
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const user = useSelector(state => state.authReducer.postgres_user) 
    const checkPendingChatsForUser = query => checkPendingChats(user.id)
    const columns = [
        { title: 'Customer Name', field: 'name' },
        { title: 'Product Name', field: 'product_name'},
        { 
            title: 'Product Image', 
            field: 'small_image', 
            render: rowData => (
            <img
                style={{ height: 75 }}
                src={rowData.small_image}
            /> 
            )
        }
    ]

    const acceptChatRequest = async ( event, row ) => {
        const action = key => (
            <>
                <Button onClick={() => { history.push('/reviewers/chat') }}>
                    Start Chatting
                </Button>
            </>
        )
        const anchorOrigin = {
            vertical: 'top',
            horizontal: 'center',
        }

        const acceptChatResponse = await acceptChat(user, row.customer_id,  row.review_id, row.name)

        if (!acceptChatResponse) {
            enqueueSnackbar('Network Error. Try again later', {
                variant: 'error',
                anchorOrigin: anchorOrigin
            })
            return
        }

        enqueueSnackbar('You have successfully accepted the chat request. Head to your chat to start chatting!', {
            variant: 'success',
            anchorOrigin: anchorOrigin,
            autoHideDuration: 2500,
            action: action
        })

        // force refresh table
        tableRef.current && tableRef.current.onQueryChange()
    }

    const declineChatRequest = (event, row) => {
        setDeclineChatInfo(row)
        setOpen(true)
    }

    // close decline chat modal
    const handleClose = () => {
        setDeclineChatInfo({})
        setOpen(false)
    }

    const handleDialogDeclineChat = () => {
        declineChat(user.id, declineChatInfo.customer_id,  declineChatInfo.review_id)

        // force refresh table
        tableRef.current && tableRef.current.onQueryChange()
        
        setOpen(false)
    }


    const actions = [
        {
            icon: ThumbUpSharpIcon,
            iconProps: { style: { backgroundColor: '#08415C', color: 'white' }},
            tooltip: 'Accept Chat',
            onClick: acceptChatRequest
        },
        {
            icon: ThumbDownSharpIcon,
            iconProps: { style: { backgroundColor: '#08415C', color: 'white' }},
            tooltip: 'Decline Chat',
            onClick: declineChatRequest
        },
        {
            icon: RefreshSharpIcon,
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        }   
    ]

    return  (
        <>
            <MaterialTable
                title="Pending Chat Requests"
                columns={columns}
                tableRef={tableRef}
                data={query => 
                    new Promise((resolve, reject) => {
                        fetch(`/api/chat/${user.id}`)
                        .then(response => response.json())
                        .then(result =>{
                            resolve({
                                data: result,
                                page: result.page - 1,
                                totalCount: result.length
                            })
                        })
                    })
                }
                options={{
                    search: false,
                    paging: false,
                    actionsCellStyle: {
                        backgroundColor: "#08415C",
                        color: "#F56476",
                    },
                    actionsColumnIndex: -1,
                    headerStyle: {
                        minWidth: '8em'
                    },

                }}
                localization={{
                    header: {
                        actions: "Accept / Decline", 
                    },
                    body: {
                        emptyDataSourceMessage: 'You have no pending chat requests. You need to submit a review first, if you have not already done so.'
                    }
                    
                }}
                actions={actions}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Decline chat?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Declining the chat request will remove it from the list. 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Do Nothing
                    </Button>
                    <Button onClick={handleDialogDeclineChat} color="primary" autoFocus>
                        Decline Chat
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        )
}


export const ReviewerPendingChat = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.pendingChatListContainer}>
            <Grid item xs={12} >
                <ReviewerPendingChatTable/>
            </Grid>
        </Grid>
    )
}