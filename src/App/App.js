import { ThemeProvider } from "@material-ui/core";
import Routing from "../components/Routing/Routing";
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routing />

    </ThemeProvider>
  );
}

export default App;
