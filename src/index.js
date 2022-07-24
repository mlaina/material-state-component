import React, { useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import useMediaQuery from '@mui/material/useMediaQuery';

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const colors = (colorIn, colorOut) =>
  withStyles({
    alternativeLabel: {
      top: 18,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,' + colorIn + ' 0%, ' + colorOut + ' 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,' + colorIn + ' 0%, ' + colorOut + ' 100%)',
      },
    },
    line: {
      height: 15,
      border: 0,
      backgroundColor: '#ccc',
      borderRadius: 1,
    },
  });

const StateComponent = ({
                          states,
                          currentState,
                          orientation = 'horizontal',
                        }) => {
  const [steps, setSteps] = React.useState(states);
  const [active, setActive] = React.useState(-1);
  const matches = useMediaQuery('(min-width:1280px)');
  const [indexF, setIndex] = React.useState(-1);

  useEffect(() => {
    if (states) {
      let s = states.findIndex((e) => e.label === currentState);
      setIndex(s);
      if (matches) {
        setSteps([states[s]]);
      } else {
        setSteps(states);
      }
      setSteps(states);
      setActive({ index: s, value: states[s] });
    }
  }, [currentState, states]);

  const ColorlibStepIcon = (props) => {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    return (
      <div
        style={{
          backgroundColor:
            completed || active ? steps[props.icon - 1].color : '',
        }}
        className={classes.root}
      >
        {steps[props.icon - 1].icon}
      </div>
    );
  };

  const GreyConnector = colors('#ccc', '#ccc')(StepConnector);
  return (
    <div>
      {steps && (
        <Stepper
          alternativeLabel
          activeStep={active.index}
          connector={<GreyConnector />}
          orientation={orientation}
        >
          {steps.map((step, index) => {
            let Connector =
              index !== 0 ? (
                colors(steps[index - 1].color, step.color)(StepConnector)
              ) : (
                <div></div>
              );
            return (
              <Step key={step.label}>
                {index !== 0 && (
                  <Connector
                    last={'false'}
                    expanded={'false'}
                    orientation={orientation}
                  />
                )}
                {orientation === 'horizontal' ? (
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <div
                      style={{
                        color:
                          index <= indexF ? step.color : '#ccc',
                      }}
                    >
                      <b>{step.label}</b>
                    </div>
                  </StepLabel>
                ) : (
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <b>{step.label}</b>
                  </StepLabel>
                )}
              </Step>
            );
          })}
        </Stepper>
      )}
    </div>
  );
};

export default StateComponent;
