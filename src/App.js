import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, Container, Grid, Paper, Box, Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Todo from './component/Todo';
import db from './firebase';
import firebase from 'firebase';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      console.log(snapshot.docs.map(doc => doc.data().todo))
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, [])

  const handleSubmitTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("")

  }
  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box m={4}>
              <Typography variant="h4">
                Hello Muhammad Basit Maqsood
            </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <form>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Grid item xs={8}>
                  <Box m={2}>
                    <FormControl fullWidth>
                      <InputLabel>Write a Todo </InputLabel>
                      <Input value={input} onChange={(e) => setInput(e.target.value)} fullWidth />
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box m={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!input}
                      onClick={handleSubmitTodo}> Add Todo </Button>

                  </Box>

                </Grid>
              </Grid>

            </form>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <List>
                {todos.map(todo => (
                  <Todo key={todo.id} todo={todo} />
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default App;
