import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { cookieCheck, setLoadGate, logout } from '../LoginForm/actions.js';
import { fetchTranslations } from './actions';
import { translate, money, df, numberFormat, checkPermission, setPermissions } from './helpers';
import style from './style.css';

class Gate extends Component {
    constructor(props) {
        super(props);

        this.loadGate = this.loadGate.bind(this);
    }

    getChildContext() {
        return {
            translate: translate(this.props),
            dateFormat: df(this.props),
            numberFormat: numberFormat(this.props),
            checkPermission,
            money
        };
    }

    componentWillMount() {
        let { cookieChecked, cookieCheck, params: {appId} } = this.props;

        if (!cookieChecked) {
            cookieCheck({appId});
        }
    }

    componentWillReceiveProps(nextProps) {
        let { cookieChecked, authenticated, forceLogOut, logout, params: {ssoOrigin, appId} } = this.props;

        // if cookieCheck has passed and the user is authenticated, redirect to LoginPage
        // if the user is authenticated and there is a result from identity.check, load the gate (set permissions and fetch translations)
        // if the session expires, redirect to LoginPage
        let isAuthenticated = !(!cookieChecked && nextProps.cookieChecked && !nextProps.authenticated);
        if (!isAuthenticated && this.context.router.location.pathname !== '/login') {
            if (ssoOrigin) {
                this.context.router.push(`/sso/${appId}/${ssoOrigin}/login`);
            } else {
                this.context.router.push('/login');
            }
        } else if (nextProps.authenticated && !nextProps.gateLoaded && nextProps.result) {
            this.loadGate(nextProps.result.get('permission.get').toJS(), nextProps.result.getIn(['language', 'languageId']));
        } else if (!nextProps.result && authenticated && !nextProps.authenticated) {
            this.context.router.push('/login');
        } else if (!forceLogOut && nextProps.forceLogOut) {
            logout();
        }
    }

    loadGate(permissions, languageId) {
        let { setLoadGate, fetchTranslations } = this.props;

        setPermissions(permissions);

        fetchTranslations({
            languageId,
            dictName: ['text', 'actionConfirmation']
        });
        setLoadGate(true);
    }

    render() {
        let { loaded } = this.props;

        return (
            <div className={style.h100pr}>
                { loaded ? this.props.children : <Loader /> }
            </div>
        );
    }
}

export default connect(
    ({ login, gate }) => ({
        cookieChecked: login.get('cookieChecked'),
        authenticated: login.get('authenticated'),
        gateLoaded: login.get('gateLoaded'),
        result: login.get('result'),
        gate: gate,
        forceLogOut: gate.get('forceLogOut'),
        loaded: gate.get('loaded')
    }),
    { cookieCheck, fetchTranslations, setLoadGate, logout }
)(Gate);

Gate.propTypes = {
    params: PropTypes.object,
    children: PropTypes.object,
    cookieChecked: PropTypes.bool,
    authenticated: PropTypes.bool,
    gateLoaded: PropTypes.bool,
    result: PropTypes.object,
    forceLogOut: PropTypes.bool,
    loaded: PropTypes.bool,
    cookieCheck: PropTypes.func,
    fetchTranslations: PropTypes.func,
    setLoadGate: PropTypes.func,
    logout: PropTypes.func
};

Gate.defaultProps = {
    gateLoaded: false,
    gate: Map(),
    login: Map()
};

Gate.contextTypes = {
    router: PropTypes.object
};

Gate.childContextTypes = {
    translate: PropTypes.func,
    money: PropTypes.func,
    dateFormat: PropTypes.func,
    numberFormat: PropTypes.func,
    checkPermission: PropTypes.func
};
