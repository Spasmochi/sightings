import "../styles/normalise.css";
import "@reach/combobox/styles.css";
import "../styles/tailwind.css";
import "../styles/globals.css";
import { Store } from "../contexts/Store";

const App = ({ Component, pageProps }) => {
  Store.setState(pageProps);
  return <Component />;
};

export default App;
