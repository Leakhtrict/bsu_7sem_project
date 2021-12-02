import React, { FC, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    AddNewNote,
    ErrorPage,
    EditNote,
    NotesList,
    RandomColumns
} from 'pages';
import { useAppDispatch } from 'store';
import { LangChanger } from 'components';
import { LANG_SET } from 'constants/langSet';
import { getNotesFromLocalStorage } from 'actions';

import './App.css';


export const App: FC = () => {
    const dispatch = useAppDispatch();

    const [currentLang, setCurrentLang] = useState(localStorage.getItem('notexx_alpha.lang') || 'en');

    useEffect(() => {
        dispatch(getNotesFromLocalStorage());
    }, []);

    return (
        <div className="App">
            <IntlProvider locale={currentLang} messages={LANG_SET[currentLang]}>
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
