import React, { useState } from 'react';
import { Avatar, FormControl, InputLabel, Input, ListItem, ListItemAvatar, ListItemText, Button, Grid, Box } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import db from '../firebase';

import './Todo.css'

const Todo = ({ todo }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const updateTodo = (event) => {
        event.preventDefault();
        setOpen(true);
        db.collection("todos").doc(todo.id).set({
            todo: input
        }, { merge: true })

        setOpen(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={e => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form>
                            <Grid
                                container
                                direction="column"
                                justify="space-around"
                                alignItems="center">
                                <Grid item>
                                    <Box m={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>{todo.todo} </InputLabel>
                                            <Input value={input} onChange={(e) => setInput(e.target.value)} fullWidth />
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box m={4}>
                                        <Button onClick={updateTodo} variant="contained" fullWidth type="submit">Update Todo</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center">
                <Grid item>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={todo.todo} secondary="Dummy Deadlihne" />
                    </ListItem>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justify="space-between">
                        <Grid item>
                            <Box component="span" m={2}>
                                <EditIcon
                                    onClick={e => setOpen(true)}
                                    style={{ color: '#24a0ed', cursor: 'pointer' }} fontSize="large" />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component="span" m={2}>
                                <DeleteForeverIcon
                                    onClick={event => db.collection("todos").doc(todo.id).delete()}
                                    style={{ color: '#d11a2a', cursor: 'pointer' }} fontSize="large" />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Todo;