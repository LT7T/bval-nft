import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeConfig } from '../Theme';

type Props = React.HtmlHTMLAttributes<HTMLSpanElement> & {
  navTo?: string;
  externalNavTo?: string;
  disabled?: boolean;
};

const useStyles = makeStyles<ThemeConfig, Props>((theme) => {
  return {
    inner: {
      '&:hover': (props) => {
        if (props.disabled) {
          return {
            opacity: 0.75,
          };
        }
        return {
          background: theme.palette.accent.main,
          color: theme.palette.foreground.main,
        };
      },
    },
    button: {
      cursor: (props) => (!props.disabled ? 'pointer' : 'not-allowed'),
      opacity: (props) => (!props.disabled ? 1 : 0.5),
    },
  };
});

export const Button: FunctionComponent<Props> = (props) => {
  const classes = useStyles(props);
  const history = useHistory();

  const { navTo, externalNavTo, ...attr } = props;
  const className = `${props.className ?? ''} ${classes.button}`;

  if (!props.disabled) {
    if (navTo) {
      attr.onClick = () => {
        history.push(navTo);
      };
    } else if (externalNavTo) {
      attr.onClick = () => window.open(externalNavTo, '_blank');
    }
  }

  return (
    <span {...attr} className={className}>
      [<span className={classes.inner}>{props.children}</span>]
    </span>
  );
};
