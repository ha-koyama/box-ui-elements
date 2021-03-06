/**
 * @flow
 * @file Comment Text component used by Comment component
 */

import * as React from 'react';
import noop from 'lodash/noop';

import LoadingIndicator from '../../../../components/loading-indicator';

import formatTaggedMessage from '../utils/formatTaggedMessage';
import ShowOriginalButton from './ShowOriginalButton';
import TranslateButton from './TranslateButton';

type Props = {
    getUserProfileUrl?: GetProfileUrlCallback,
    id: string,
    onTranslate?: Function,
    tagged_message: string,
    translatedTaggedMessage?: string,
    translationEnabled?: boolean,
    translationFailed?: ?boolean,
};

type State = {
    isLoading?: boolean,
    isTranslation?: boolean,
};

class CommentText extends React.Component<Props, State> {
    static defaultProps = {
        translationEnabled: false,
    };

    state = {
        isLoading: false,
        isTranslation: false,
    };

    componentWillReceiveProps(nextProps: Props): void {
        const { translatedTaggedMessage, translationFailed } = nextProps;
        if (translatedTaggedMessage || translationFailed) {
            this.setState({ isLoading: false });
        }
    }

    getButton(isTranslation?: boolean): React.Node {
        let button = null;
        if (isTranslation) {
            button = <ShowOriginalButton handleShowOriginal={this.handleShowOriginal} />;
        } else {
            button = <TranslateButton handleTranslate={this.handleTranslate} />;
        }

        return button;
    }

    handleTranslate = (event: SyntheticMouseEvent<>): void => {
        const { id, tagged_message, onTranslate = noop, translatedTaggedMessage } = this.props;
        if (!translatedTaggedMessage) {
            this.setState({ isLoading: true });
            onTranslate({ id, tagged_message });
        }

        this.setState({ isTranslation: true });
        event.preventDefault();
    };

    handleShowOriginal = (event: SyntheticMouseEvent<>): void => {
        this.setState({ isTranslation: false });
        event.preventDefault();
    };

    render(): React.Node {
        const { id, tagged_message, translatedTaggedMessage, translationEnabled, getUserProfileUrl } = this.props;
        const { isLoading, isTranslation } = this.state;
        const commentToDisplay =
            translationEnabled && isTranslation && translatedTaggedMessage ? translatedTaggedMessage : tagged_message;
        return isLoading ? (
            <div className="bcs-comment-text-loading">
                <LoadingIndicator size="small" />
            </div>
        ) : (
            <div className="bcs-comment-text">
                {formatTaggedMessage(commentToDisplay, id, false, getUserProfileUrl)}
                {translationEnabled ? this.getButton(isTranslation) : null}
            </div>
        );
    }
}

export default CommentText;
