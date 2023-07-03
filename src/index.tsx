import {render} from "react-dom";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "./app/provieders/ThemeProvider/index";


render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
