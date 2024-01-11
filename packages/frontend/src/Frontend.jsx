import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Overview from './pages/Overview';
import { StyledContainer, StyledGreeting } from './FrontendStyles';
import Ko from './pages/Ko';
import DataInventory from './pages/DataInventory';
import RadioBar, { RadioBarChangeHandler } from '@splunk/react-ui/RadioBar';


const propTypes = {
    name: PropTypes.string,
};

const Frontend = ({ name = 'User' }) => {
    const customStyle = {
        width: 1400,
        height: 768,
    };
    const [value, setValue] = useState(1);

    const handleChange = (e, { value: radioValue }) => {
        setValue(radioValue);
    };
    return (
        <StyledContainer style={customStyle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <RadioBar onChange={handleChange} value={value} style={{ width: 500 }}>
                <RadioBar.Option value={1} label="OVERVIEW" />
                <RadioBar.Option value={2} label="KOs" />
                <RadioBar.Option value={3} label="Data Inventory" />
            </RadioBar>
            {value == 1 && (
                <div>
                    <Overview />
                </div>
            )}
            {value == 2 && (
                <div>
                    <Ko />
                </div>
            )}
            {value == 3 && (
                <div>
                    <DataInventory />
                </div>
            )}
        </div>
    </StyledContainer>
    );
};

Frontend.propTypes = propTypes;

export default Frontend;
