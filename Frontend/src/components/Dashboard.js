import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles'
import NewEntry from './NewEntry';
import AppContext from '../contexts/AppContext';
import Grid from '@material-ui/core/Grid';

function Dashboard() {

    const { launchData, setLaunchData } = useContext(AppContext)
    const { customerData, setCustomerData } = useContext(AppContext)
    const { userData, setUserData } = useContext(AppContext)

    // const [launchData, setLaunchData] = useState([])
    // const [customerData, setCustomerData] = useState([])
    // const [userData, setUserData] = useState([])

    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const [modalStyle] = React.useState(getModalStyle);

    const [currentId, setCurrentId] = useState(0);

    async function createTable() {
        let newColumns = [
            {
                field: 'id',
                headerName: 'ID',
                flex: .3,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'customer',
                headerName: 'Customer',
                flex: .4,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'vehicle',
                headerName: 'Vehicle',
                flex: .4,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'payload',
                headerName: 'Payload',
                flex: .4,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'launch_date',
                headerName: 'Launch Date',
                flex: .5,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'user',
                headerName: 'Requestor',
                flex: .5,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'commander_approval',
                headerName: 'CC Approval',
                flex: .5,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'request_date',
                headerName: 'Request Date',
                flex: .5,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'approval_date',
                headerName: 'Approval Date',
                flex: .5,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'scrub_reason',
                headerName: 'Scrub Reason',
                flex: .5,
                editable: false,
                headerAlign: 'center'
            },
            {
                field: 'actions',
                headerName: 'Actions',
                flex: .4,
                editable: false,
                headerAlign: 'center',
                renderCell: (params) => {
                    return (
                        <strong>
                            <Button
                                id={params.id}
                                variant="contained"
                                size="small"
                                onClick={() => editButtonClick(params.id)}
                                style={{ marginLeft: 5, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}>
                                ✏️</Button>
                            <Button
                                id={params.id}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => approveButtonClick(params.id)}
                                style={{ marginLeft: 5, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}>
                                ✔️</Button>
                            <Button
                                id={params.id}
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() => deleteButtonClick(params.id)}
                                style={{ marginLeft: 5, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}>
                                🗑️</Button>
                        </strong >)
                }
            }
        ]



        await setColumns([...newColumns])

        function grabName(dataSet, id) {
            let target = dataSet.find(item => item.id === id)
            return target.name
        }

        await setRows(launchData.map(item => {
            return {
                id: item.id,
                customer: grabName(customerData, item.customer_id),
                vehicle: item.vehicle,
                payload: item.payload,
                launch_date: `${item.launch_date} ${item.launch_time}`,
                user: grabName(userData, item.user_id),
                commander_approval: item.commander_approval,
                request_date: item.request_date,
                approval_date: item.approval_date,
                scrub_reason: item.scrub_reason,
                actions: item.id
            }
        })
        )
    }

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const editButtonClick = async (id) => {
        await setCurrentId(id)
        handleOpen()
    }

    const approveButtonClick = (id) => {
        //TO DO: confirm box
        //TO DO: fetch PATCH an entry
    }

    const deleteButtonClick = (id) => {
        //TO DO: confirm box
        //TO DO: fetch DELETE an entry
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }



    const classes = useStyles();

    let body = (

        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit Your Entry</h2>
            <p id="simple-modal-description">
                <NewEntry edit={true} launchData={launchData.find(item => item.id === currentId)}></NewEntry>
            </p>
            <Grid container justifyContent="space-evenly">

                <Button onClick={handleClose} variant="contained"
                    color="secondary"
                    size="small"
                > Cancel </Button>
            </Grid>
        </div>

    );

    useEffect(() => {

        async function fetchData() {
            await fetch('http://localhost:3001/launchschedule')
                .then(res => res.json())
                .then(data => setLaunchData(data))

            await fetch('http://localhost:3001/customers')
                .then(res => res.json())
                .then(data => setCustomerData(data))
            await fetch('http://localhost:3001/users')
                .then(res => res.json())
                .then(data => setUserData(data))
            await createTable()

            loadTable()
        }
        fetchData()
        // eslint-disable-next-line
    }, [loaded])


    const loadTable = () => {
        setLoaded(true)
    }

    return (
        <>
            <div style={{ height: 500, width: 1700 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    //checkboxSelection
                    disableSelectionOnClick
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {body}
                </Modal>
            </div>
        </>
    );
}

export default Dashboard;