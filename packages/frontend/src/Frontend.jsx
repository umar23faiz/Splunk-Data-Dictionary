import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Overview from './pages/Overview';
import { StyledContainer, StyledGreeting } from './FrontendStyles';
import Ko from './pages/Ko';
import DataInventory from './pages/DataInventory';
import RadioBar from '@splunk/react-ui/RadioBar';
import axios from 'axios';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';

const propTypes = {
    name: PropTypes.string,
};

const Frontend = ({ name = 'User' }) => {
    const [apiData, setApiData] = useState();
    const [loading, setLoading] = useState(false);
    const [disabledRadioBar,setDisabledRadio] = useState(false)

    const customStyle = {
        width: 1400,
        height: 768,
    };
    const [value, setValue] = useState();

    const handleChange = (e, { value: radioValue }) => {
        setValue(radioValue);
    };
    const fetchData = async () => {
        try {
            const req={
                username:"umar23faiz",
                password:"umar23faiz"
            }
            setLoading(true);
            const response = await axios.post('http://localhost:3001/api/cached-overview',req); // replace with your backend API endpoint
            setApiData(response.data);
            setValue(1);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (apiData && apiData.userRole === 'admin') {
            setDisabledRadio(false);
        } else {
            setDisabledRadio(true);
        }
    }, [apiData]);

    return (
        <StyledContainer style={customStyle}>
            {loading && !apiData ? (
                <WaitSpinner size="medium" />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <RadioBar onChange={handleChange} value={value} style={{ width: 500 }}>
                        <RadioBar.Option value={1} label="OVERVIEW" />
                        <RadioBar.Option value={2} label="KOs" />
                        <RadioBar.Option disabled={disabledRadioBar} value={3} label="Data Inventory" />
                    </RadioBar>
                    <div>
                        {value == 1 && (
                            <div>
                                <Overview apiData={apiData.Overview} />
                            </div>
                        )}
                        {value == 2 && (
                            <div>
                                <Ko apiData={apiData.KO} />
                            </div>
                        )}
                        {value == 3 && (
                            <div>
                                <DataInventory apiData={apiData.Lookup} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </StyledContainer>
    );
};

Frontend.propTypes = propTypes;

export default Frontend;
