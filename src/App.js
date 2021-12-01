import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    AddNewNote,
    ErrorPage,
    EditNote,
    NotesList,
    RandomColumns
} from './pages';
import { LangChanger } from './components';
import enMessages from './languages/en.json';
import ruMessages from './languages/ru.json';
import { getNotesFromLocalStorage } from './actions';

import './App.css';

const langSet = {
    'en': enMessages,
    'ru': ruMessages
}

function App() {
    const dispatch = useDispatch();

    const [currentLang, setCurrentLang] = useState(localStorage.getItem('bsu_project.lang') || 'en');

    useEffect(() => {
        dispatch(getNotesFromLocalStorage());
    }, []);

    return (
        <div className="App">
            <IntlProvider locale={currentLang} messages={langSet[currentLang]}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={NotesList} />
                        <Route path="/addNewNote" exact component={AddNewNote} />
                        <Route path="/editNote/:index" exact component={EditNote} />
                        <Route path="/forFun" exact component={RandomColumns} />
                        <Route path="*" exact component={ErrorPage} />
                    </Switch>
                </Router>
                <LangChanger currentLang={currentLang} setCurrentLang={setCurrentLang} />
            </IntlProvider>
        </div>
    );
}

export default App;
