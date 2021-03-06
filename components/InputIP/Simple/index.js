import React, { PropTypes, Component } from 'react';
import Iput from './IPut';
import classnames from 'classnames';
import style from './style.css';

class IPInput extends Component {
    render() {
        let zeroHeightStyle = this.props.isValid || this.props.errorMessage.trim() === '' ? style.hh : '';
        let placeholderValue = (this.props.value === '...') ? this.props.placeholder : '';
        let clearState = this.props.value === '...';
        return (
            <div className={style.inputWrap}>
                <Iput
                    className={style.ipInput}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    isError={() => (!this.props.isValid)}
                    placeholder={placeholderValue}
                    readonly={this.props.readonly}
                    clear={clearState}
                />
                <div className={classnames(style.errorWrap, zeroHeightStyle)}>{!this.props.isValid && <div className={style.errorMessage}>{this.props.errorMessage}</div>}</div>
            </div>
        );
    }
}

IPInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    isValid: PropTypes.bool,
    readonly: PropTypes.bool,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
};

IPInput.defaultProps = {
    isValid: true,
    errorMessage: '',
    placeholder: '...'
};

export default IPInput;
