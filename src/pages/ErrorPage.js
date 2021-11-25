import { FormattedMessage } from "react-intl";

export default function ErrorPage() {
    return <div>
        <h2>
            <FormattedMessage id="errorPage.titleMessage" />
        </h2>
        <h4>
            <FormattedMessage id="errorPage.bodyMessage">
                {(id) =>
                    <a href="/">{id}</a>
                }
            </FormattedMessage>
        </h4>
    </div>
}
