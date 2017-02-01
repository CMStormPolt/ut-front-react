import React, { PropTypes } from 'react';
import { Portal } from 'react-overlays';
import classnames from 'classnames';
import Overlay from '../Overlay';
import ActionButtons from '../ActionButtons';
import StandardButton from '../StandardButton';
import popupStyles from './styles.css';

const Popup = ({
    isOpen,
    headerClass,
    headerText,
    footerClass,
    buttonsClass,
    hasOverlay,
    closeOnOverlayClick,
    actionButtons,
    closePopup,
    children
}) => (
    <Portal container={() => { return document.getElementById('controls'); }}>
        { isOpen ? <div className={popupStyles.modalContainer}>
            { hasOverlay ? <Overlay onClick={closeOnOverlayClick ? closePopup : null} /> : false }
            <div className={popupStyles.popupContainer}>
                <div className={classnames(popupStyles.popupSection, popupStyles.popupHeader, headerClass)}>
                    <span className={popupStyles.headerText}>{headerText}</span>
                    <StandardButton className={popupStyles.closeBtn} onClick={closePopup} />
                </div>
                <div className={popupStyles.popupBody}>
                    {children}
                </div>
                <div className={classnames(popupStyles.popupSection, popupStyles.popupFooter, footerClass)}>
                    <ActionButtons className={buttonsClass} buttons={actionButtons} />
                </div>
            </div>
        </div> : false }
    </Portal>
);

Popup.propTypes = {
    isOpen: PropTypes.bool,
    headerClass: PropTypes.string,
    headerText: PropTypes.string,
    footerClass: PropTypes.string,
    hasOverlay: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    actionButtons: PropTypes.array,
    closePopup: PropTypes.func,
    children: PropTypes.object
};

export default Popup;