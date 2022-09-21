import { useRoutes } from "react-router-dom"
import { Login, Register } from './pages/';





export const UnauthorizedApp = () => useRoutes([
    {path: "/", element: <Login />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />}
])
