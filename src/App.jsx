import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    AddNewNote,
    ErrorPage,
    EditNote,
    NotesList,
    RandomColumns
} from './pages';
import { langSet } from './constants';
import { useAppDispatch } from './store';
import { LangChanger } from './components';
import { getNotesFromLocalStorage } from './actions';

import './App.css';


export const App = () => {
    const dispatch = useAppDispatch();

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
