import { MenuItem, Select } from '@material-ui/core';

export const LangChanger = ({
    currentLang,
    setCurrentLang
}) => {

    return (
        <div className="langChanger">
            <Select
                value={currentLang}
                onChange={(e) => {
                    localStorage.setItem("bsu_project.lang", e.target.value);
                    setCurrentLang(e.target.value);
                }}
                style={{ marginBottom: "8px" }}
            >
                <MenuItem value="en">
                    English
                </MenuItem>
                <MenuItem value="ru">
                    Русский
                </MenuItem>
            </Select>
        </div>
    )
}
