import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LangChanger from "./components/LangChanger";
import NotesList from "./components/NotesList";
import AddNewNote from "./pages/AddNewNote";
import ErrorPage from "./pages/ErrorPage";
import enMessages from "./languages/en.json";
import ruMessages from "./languages/ru.json";

import './App.css';

const langSet = {
    "en": enMessages,
    "ru": ruMessages
}

function App() {
    const [currentLang, setCurrentLang] = useState(localStorage.getItem("app.lang") || "en");

    return (
        <div className="App">
            <IntlProvider locale={currentLang} messages={langSet[currentLang]}>
                <Router>
                    <Switch className="shownPage">
                        <Route path="/" exact component={NotesList} />
                        <Route path="/addNewNote" exact component={AddNewNote} />
                        <Route path="*" exact component={ErrorPage} />
                    </Switch>
                </Router>
                <LangChanger currentLang={currentLang} setCurrentLang={setCurrentLang} />
            </IntlProvider>
        </div>
    );
}

export default App;
