import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import { Toaster } from "sonner";

function App() {
  return <>
  <RouterProvider router={router} />
  <Toaster richColors position="bottom-right"/>
  </>;
}

export default App;
