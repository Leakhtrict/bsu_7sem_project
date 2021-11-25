import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

export const ErrorPage = () => {
    let history = useHistory();

    return <div>
        <h2>
            <FormattedMessage id="errorPage.titleMessage" />
        </h2>
        <h4>
            <FormattedMessage id="errorPage.bodyMessage">
                {(id) =>
                    <div className="error-page" onClick={() => history.push("/")}>{id}</div>
                }
            </FormattedMessage>
        </h4>
    </div>
}
