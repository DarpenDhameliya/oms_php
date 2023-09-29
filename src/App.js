import "./App.css";
import Index from "./component/Index";
import { theme } from "./component/commonLink/theme";
import { ThemeProvider } from "@material-ui/styles";
import { store } from "./Store";
import { Provider} from "react-redux";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Index />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
