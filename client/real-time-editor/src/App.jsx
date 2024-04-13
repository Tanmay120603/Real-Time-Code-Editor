import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements} from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import HomePage from "./Pages/HomePage"
import EditorPage from "./Pages/EditorPage"
import ErrorPage from "./Pages/ErrorPage"
import SocketContext, { socketConn } from "./context/socket"

function App(){
  
  const router=createBrowserRouter(createRoutesFromElements(<Route element={<RootLayout></RootLayout>}>
    <Route element={<HomePage></HomePage>} path="/"></Route>
    <Route element={<EditorPage></EditorPage>} path="/join/:roomID"></Route>
    <Route element={<ErrorPage></ErrorPage>} path="*"></Route>
  </Route>))

  return(
    <SocketContext.Provider value={socketConn}>
    <RouterProvider router={router}>
    <RootLayout></RootLayout>
    </RouterProvider>
    </SocketContext.Provider>
    
  )
}

export default App