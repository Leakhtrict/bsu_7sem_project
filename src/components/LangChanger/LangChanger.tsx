import React, { FC } from 'react';
import { MenuItem, Select } from '@material-ui/core';

import './LangChanger.css';

interface ILangChanger {
    currentLang: string;
    setCurrentLang: (value: string) => void;
}

export const LangChanger: FC<ILangChanger> = ({ currentLang, setCurrentLang }) => (
    <div className="langChanger">
        <Select
            value={currentLang}
            onChange={(e) => {
                const newValue = String(e.target.value);

                localStorage.setItem('notexx_alpha.lang', newValue);
                setCurrentLang(newValue);
            }}
        >
            <MenuItem value="en">
                English
            </MenuItem>
            <MenuItem value="ru">
                Русский
            </MenuItem>
        </Select>
    </div>
);
