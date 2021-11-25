import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import enMessages from './languages/en.json';
import ruMessages from './languages/ru.json';
import { LangChanger, NotesList } from './components';
import { AddNewNote, ErrorPage, EditNote } from './pages';

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
                        <Route path="/editNote/:index" exact component={EditNote} />
                        <Route path="*" exact component={ErrorPage} />
                    </Switch>
                </Router>
                <LangChanger currentLang={currentLang} setCurrentLang={setCurrentLang} />
            </IntlProvider>
        </div>
    );
}

export default App;
