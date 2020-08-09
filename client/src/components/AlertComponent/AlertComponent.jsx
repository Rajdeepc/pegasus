import React from 'react';
import {comingsoon} from '../../assets/images';
import t from 'prop-types';

import './alerts.scss';

const AlertComponent = ({message}) => {
    return (
        <div className="alert-component">
            <div className="not-found">
            <img src={comingsoon} alt="comingsoon"/>
            <p>{message}</p>
            </div>
        </div>
    )
}

AlertComponent.propTypes = {
    /**
     * This is a description for this prop.
     * Button type.
     */
    message: t.string
  }
  AlertComponent.defaultProps = {
    message: ''
  }


export default AlertComponent;