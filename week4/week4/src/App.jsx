import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pokemon/:pokeName",
    element: <PokemonDetail />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
