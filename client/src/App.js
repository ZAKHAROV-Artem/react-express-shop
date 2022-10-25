import "./App.css";
import { useState, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import Loading from "./components/UI/Loading";
import { fetchBasketDevices, getBasketId } from "./http/basketAPI";
const App = observer(() => {
  const { user, basket } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .then(() => {
        getBasketId(user.user.id)
          .then((data) => basket.setBasketId(data.id))
          .then(() =>
            fetchBasketDevices(basket.basketId).then((data) => {
              basket.setBasketDevices(data);
            })
          );
      }, [])
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
