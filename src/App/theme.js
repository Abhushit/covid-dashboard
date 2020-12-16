import { default as ColorPalette } from "./colors";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: ColorPalette,
  typography: {
    fontFamily: "Open Sans",
  }
});

export default theme;