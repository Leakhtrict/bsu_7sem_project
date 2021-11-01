import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LangChanger from "./components/LangChanger";
import NotesList from "./components/NotesList";
import { addNote } from './actions/notes';
import AddNewNote from "./pages/AddNewNote";
import enMessages from "./languages/en.json";
import ruMessages from "./languages/ru.json";

import './App.css';

const langSet = {
    "en": enMessages,
    "ru": ruMessages
}

function App() {
    const [currentLang, setCurrentLang] = useState(localStorage.getItem("app.lang") || "en");
    const dispatch = useDispatch();

    return (
        <div className="App">
            <IntlProvider locale={currentLang} messages={langSet[currentLang]}>
                <Router>
                    <Button onClick={() => dispatch(addNote({
                        title: "string qwertyuqreqwer гагаггнаннг",
                        body: "dafujhbilabhvurljhwervhjioleh wbvhrbgrhsdafdsafsafdsafbhytr hvurljhwtr dafujhbilabhvurljhwervhjiolehwrujhretivbhirhblhvurljhwervhjiolehwruj dafujhbilabhvurljhwervhjiolehwbvhrbgrhbhyt ehwbvhrbgrhbhytrr hvurljhwtr dafujhbilabhvurljhwervhjiolehwrujhretivbhirhblhvurljhwervhjiolehwruj",
                    }))} >
                        Add red title
                    </Button>
                    <Button onClick={() => dispatch(addNote({
                        title: "string",
                        body: "morkovka - 1 kg\nkartoshka - 0.5kg\nmorkovka - 1 kg\nkartoshka - 0.5kg\nmorkovka - 1 kg\nkartoshka - 0.5kg\nmorkovka - 1 kg\nkartoshka - 0.5kg\n",
                    }))} >
                        Add green/red with title and body
                    </Button>

                    <Switch className="shownPage">
                        <Route path="/" exact component={NotesList} />
                        <Route path="/addNewNote" exact component={AddNewNote} />
                    </Switch>
                </Router>
                <LangChanger currentLang={currentLang} setCurrentLang={setCurrentLang} />
            </IntlProvider>
        </div>
    );
}

export default App;
