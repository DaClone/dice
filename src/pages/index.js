import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
} from '@material-ui/core'
import { Casino as CasinoIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  rollIcon: {
    marginRight: theme.spacing(1),
  },
}))

const rollDice = (number, sides, cascading) => {
  return Array.from(
    Array(number),
    () => Math.floor(sides * Math.random()) + 1
  ).flatMap(val => (val === sides && cascading ? rollDice(2, sides) : val))
}

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

  const [rollResult, setRollResult] = useState([])
  const handleRollDice = () => {
    const results = rollDice(diceNumber, diceSides, useCascading)
    setRollResult(results)
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleRollDice}
              >
                <CasinoIcon className={classes.rollIcon} />
                Roll dice
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h5">Results</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                All results
              </Typography>
              <Typography variant="body2">
                {rollResult.sort().join(',')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                Total value
              </Typography>
              <Typography variant="body2">
                {rollResult.reduce((total, result) => total + result, 0)}
              </Typography>
            </Grid>
            {Array.from(Array(diceSides), (v, i) => {
              const num = i + 1
              const resultNumber = rollResult.filter(result => result === num)
                .length
              return !!resultNumber ? (
                <Grid key={`${num}s`} item>
                  <Typography variant="body1" color="textSecondary">
                    {`Number of ${num}'s`}
                  </Typography>
                  <Typography variant="body2">{resultNumber}</Typography>
                </Grid>
              ) : null
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default IndexPage
