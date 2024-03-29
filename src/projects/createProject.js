import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";

import { ToastMessage } from '../utils/toast_messages'


export default function CreateProjectModalForm(props) {
    const existingProject = props.existingProject
    const titleValue = existingProject ? existingProject.title : ''
    const descriptionValue = existingProject ? existingProject.description : ''
    const managerValue = existingProject ? existingProject.manager : ''
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(titleValue)
    const [description, setDescription] = useState(descriptionValue)
    const [manager, setManager] = useState(managerValue)
    const [success, setSuccess] = useState(false)

    const toastMessageText = existingProject ? 'Project updated!' : 'Project created!'

    const handleSuccessToastClose = () => {
        setSuccess(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
        setTitle(titleValue)
        setDescription(descriptionValue)
        setManager(managerValue)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const newProject = {
            title: title,
            description: description,
            manager: manager,
        }
        console.log(newProject)
        setOpen(false)
        setSuccess(true)
    };
    const submitButtonText = existingProject ? 'Update' : 'Create'
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    };
    const handleManagerChange = (e) => {
        setManager(e.target.value)
    };
    const messageText = existingProject ? 'Update the current project.' : 'Create a new project for the current team.'

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                {props.text}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.text}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {messageText}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={handleTitleChange}
                        value={title}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        multiline
                        rowsMax={10}
                        fullWidth
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                    <TextField
                        id='manager'
                        label='Manager'
                        select
                        fullWidth
                        onChange={handleManagerChange}
                        value={manager}
                    >
                        {props.uniqueManagers.map((manager, index) => {
                            return <MenuItem key={index} value={manager}>{manager}</MenuItem>
                        })}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <SubmitButton title={title} description={description} manager={manager} handleSubmit={handleSubmit} submitButtonText={submitButtonText} />
                </DialogActions>
            </Dialog>
            <ToastMessage message={toastMessageText} trigger={success} onClose={handleSuccessToastClose} />
        </div>
    );
}

function SubmitButton(props) {
    const anyFieldIsEmpty = !(props.title && props.description && props.manager)
    const handleSubmit = props.handleSubmit
    if (anyFieldIsEmpty) {
        return (
            <Tooltip title='All fields are required.'>
                 <span>
                    <Button color="primary" disabled>
                        {props.submitButtonText}
                    </Button>
                 </span>
            </Tooltip>
        )
    } else {
        return (
            <Button onClick={handleSubmit} color="primary">
                {props.submitButtonText}
            </Button>
        )
    }
}
