import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  Fab,
} from '@material-ui/core'
import { Casino as CasinoIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  rollIcon: {
    marginRight: theme.spacing(1),
  },
}))

const IndexPage = () => {
  const classes = useStyles()

  const [diceNumber, setDiceNumber] = useState(3)
  const handleChangeDiceNumber = event => {
    const {
      target: { value: number },
    } = event
    setDiceNumber(number)
  }

  const [diceSides, setDiceSides] = useState(6)
  const handleChangeDiceSides = event => {
    const {
      target: { value: sides },
    } = event
    setDiceSides(sides)
  }

  const [useCascading, setUseCascading] = useState(true)
  const toggleUseCascading = () => {
    setUseCascading(!useCascading)
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Dice roller</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                value={diceNumber}
                onChange={handleChangeDiceNumber}
                label="Number of dice"
                variant="outlined"
                inputProps={{ type: 'number' }}
              />
            </Grid>
            <Grid item>
              <TextField
                value={diceSides}
                onChange={handleChangeDiceSides}
                label="Number of side per die"
                variant="outlined"
                inputProps={{ type: 'number' }}
              />
            </Grid>
            <Grid item>
              <Typography variant="caption">Use cascading dice</Typography>
              <Switch checked={useCascading} onChange={toggleUseCascading} />
            </Grid>
            <Grid item variant="extended">
              <Button variant="contained" color="primary">
                <CasinoIcon className={classes.rollIcon} />
                Roll dice
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Results</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default IndexPage
