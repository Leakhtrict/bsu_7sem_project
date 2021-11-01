import { useState } from "react";
import ReactMde from "react-mde";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { addNote } from '../actions/notes';
import * as Showdown from "showdown";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default function AddNewNote() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [freeText, setFreeText] = useState("");
    const [selectedTab, setSelectedTab] = useState("write");

    const sumbitNote = () => {
        dispatch(addNote({
            title: "added from another page",
            body: freeText,
        }));
        history.push("/");
    };

    return (
        <div className="add-new-note-page">
            <div style={{ width: "90vw", maxWidth: 800 }}>
                <ReactMde
                    value={freeText}
                    onChange={setFreeText}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    childProps={{
                        writeButton: {
                            tabIndex: -1
                        }
                    }}
                />
            </div>
            <Button onClick={sumbitNote}>
                SUBMIT
            </Button>
        </div>
    );
}