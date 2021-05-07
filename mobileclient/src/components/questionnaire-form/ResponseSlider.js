import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '20%'
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const marks = [
  { value: 1, label: 'Never' },
  { value: 2, label: '' },
  { value: 3, label: '' },
  { value: 4, label: 'Choose an option' },
  { value: 5, label: '' },
  { value: 6, label: '' },
  { value: 7, label: 'Always' }
];

function valuetext(value) {
  return value;
}

function getLabel(val) {
  switch(val) {
    case 1:
      marks[3].label = 'Never';
      break;
    case 2:
      marks[3].label = 'Rarely';
      break;
    case 3:
      marks[3].label = 'Sometimes';
      break;
    case 4:
      marks[3].label = 'Faily Often';
      break;
    case 5:
      marks[3].label = 'Often';
      break;
    case 6:
      marks[3].label = 'Almost Always';
      break;
    case 7:
      marks[3].label = 'Always';
      break;
  };
}

function testCallback(val) {
  console.log("value: ", val);
  
}

const ReponseSlider = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        {props.questionText}
      </Typography>
      <Slider 
        defaultValue={4}
        getAriaValueText={valuetext}
        step={1}
        min={1}
        max={7}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={
          (event, value) => {
            props.onChange(value)
            getLabel(value)
          }
        }
      />
    </div>
  )
}

export default ReponseSlider;
