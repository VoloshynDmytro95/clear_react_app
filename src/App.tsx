import { Provider } from "react-redux";
import { store } from "./store";
import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import { UserProvider } from "@/providers/UserProvider/UserProvider";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container mx-auto">
          <UserProvider>
            <Header />
            <AppRoutes />
          </UserProvider>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
