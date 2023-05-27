import { Routes, Route, BrowserRouter } from "react-router-dom"
import Error from "../Error";
import Home from "../Home";
import Root from "../Root";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Error />} />
                <Route path="/" element={<Home />} />
                <Route path="/root" element={
                    <Root wss={new WebSocket(localStorage.getItem("url") || "ws://localhost/")} />} />
            </Routes>
        </BrowserRouter>
    )
}
