import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: green[800],
    },
    secondary: {
      main: green[500],
    },
  },
});

export const animationVariants = {
  exit: {
    x: -2000,
    transition: {
      ease: "easeInOut",
    },
  },
};

export default theme;
