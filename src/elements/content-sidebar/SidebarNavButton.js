/**
 * @flow
 * @file Preview sidebar nav button component
 * @author Box
 */

import * as React from 'react';
import { Route } from 'react-router-dom';
import NavButton from '../common/nav-button';
import Tooltip from '../../components/tooltip/Tooltip';
import './SidebarNavButton.scss';

type Props = {
    children: React.Node,
    interactionTarget: string,
    isOpen?: boolean,
    onNavigate?: (SyntheticEvent<>, NavigateOptions) => void,
    sidebarView: string,
    tooltip: React.Node,
};

const SidebarNavButton = ({ children, interactionTarget, isOpen, onNavigate, sidebarView, tooltip }: Props) => {
    const sidebarPath = `/${sidebarView}`;

    return (
        <Route path={sidebarPath}>
            {({ match }) => {
                const isMatch = !!match;
                const isActive = () => isMatch && !!isOpen;
                const isToggle = isMatch && match.isExact;

                return (
                    <Tooltip position="middle-left" text={tooltip}>
                        <NavButton
                            activeClassName="bcs-is-selected"
                            className="bcs-NavButton"
                            data-resin-target={interactionTarget}
                            data-testid={interactionTarget}
                            isActive={isActive}
                            onClick={event => {
                                if (onNavigate) {
                                    onNavigate(event, { isToggle });
                                }
                            }}
                            replace={isToggle}
                            to={sidebarPath}
                            type="button"
                        >
                            {children}
                        </NavButton>
                    </Tooltip>
                );
            }}
        </Route>
    );
};

export default SidebarNavButton;
