import { Provider } from "react-redux";
import { store } from "./store";
import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/providers/UserProvider/UserProvider";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
