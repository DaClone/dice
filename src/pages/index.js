import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  IconButton,
} from '@material-ui/core'
import {
  Casino as CasinoIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  rollIcon: {
    marginRight: theme.spacing(1),
  },
}))

const rollDice = (number, sides, cascading) => {
  console.log('roll', number, sides, cascading)
  return Array.from(Array(Number(number)), () => {
    const result = Math.floor(sides * Math.random()) + 1
    return result
  }).flatMap(val =>
    val === sides && cascading ? rollDice(2, sides, cascading) : val
  )
}

const IndexPage = () => {
  const classes = useStyles()

  const [diceNumber, setDiceNumber] = useState(3)
  const handleChangeDiceNumber = event => {
    const {
      target: { value: number },
    } = event
    setDiceNumber(Math.max(Number(number), 1))
  }
  const handleRemoveDiceNumber = () => {
    setDiceNumber(Math.max(diceNumber - 1, 1))
  }
  const handleAddDiceNumber = () => {
    setDiceNumber(diceNumber + 1)
  }

  const [diceSides, setDiceSides] = useState(6)
  const handleChangeDiceSides = event => {
    const {
      target: { value: sides },
    } = event
    setDiceSides(Math.max(Number(sides), 2))
  }
  const handleRemoveDiceSide = () => {
    setDiceSides(Math.max(diceSides - 1, 2))
  }
  const handleAddDiceSide = () => {
    setDiceSides(diceSides + 1)
  }

  const [rollResult, setRollResult] = useState([])
  const resultValues = Array.from(new Set(rollResult)).sort((a, b) => a - b)

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
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">Dice roller</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <IconButton onClick={handleRemoveDiceNumber}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={diceNumber}
                onChange={handleChangeDiceNumber}
                label="Number of dice"
                variant="outlined"
              />
              <IconButton onClick={handleAddDiceNumber}>
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleRemoveDiceSide}>
                <RemoveIcon />
              </IconButton>
              <TextField
                value={diceSides}
                onChange={handleChangeDiceSides}
                label="Number of side per die"
                variant="outlined"
              />
              <IconButton onClick={handleAddDiceSide}>
                <AddIcon />
              </IconButton>
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
        <Grid item xs={12} sm={6}>
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
            {resultValues.map(value => {
              const resultNumber = rollResult.filter(result => result === value)
                .length
              return !!resultNumber ? (
                <Grid key={`${value}s`} item>
                  <Typography variant="body1" color="textSecondary">
                    {`Number of ${value}'s`}
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
