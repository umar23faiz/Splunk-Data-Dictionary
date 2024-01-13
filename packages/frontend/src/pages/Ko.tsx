import React, { useEffect, useState } from 'react';
import Button from '@splunk/react-ui/Button';
import Chip from '@splunk/react-ui/Chip';
import Table from '@splunk/react-ui/Table';
import ComboBox from '@splunk/react-ui/ComboBox';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';

function Ko({ apiData }) {
    const [value, setValue] = useState('List All');
    const [mergedList, setMergedList]: any = useState();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        if (value == 'List All'||value=="") {
            const mergedData = Object.values(apiData).flat();
            setMergedList(mergedData);
        } else {
            setMergedList(apiData[value] ? apiData[value].filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : []);
        }
        setLoading(false);
    }, [value,apiData]);

    const handleInput = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const originalList = Object.values(apiData).flat();

        const filteredData = originalList.filter((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setMergedList(searchTerm ? filteredData : originalList);
    };

    const handleChange = (e, { value: comboBoxValue }) => {
        setValue(comboBoxValue);
    };
    const toggle = <Button label="Dashboards" isMenu />;
    return (
        <div style={{ marginTop: 20 }}>
            {loading || !mergedList ? (
                <WaitSpinner size="medium" />
            ) : (
                <div>
                    <div>
                        <ComboBox inline onChange={handleChange} value={value}>
                            <ComboBox.Option value="List All" />
                            <ComboBox.Option value="Apps" />
                            <ComboBox.Option value="Dashboards" />
                            <ComboBox.Option value="Reports" />
                            <ComboBox.Option value="Alerts" />
                            <ComboBox.Option value="Lookups" />
                            <ComboBox.Option value="Fields" />
                            <ComboBox.Option value="Index" />
                        </ComboBox>
                        <Chip style={{ marginLeft: 60 }}>All Splunk Instances</Chip>
                        <input
                            style={{
                                marginLeft: 60,
                                padding: '8px',
                                border: '1px solid black',
                                borderRadius: '4px',
                                fontSize: '14px',
                                width: '200px',
                            }}
                            type="text"
                            placeholder="Search..."
                            onChange={handleInput}
                        />
                    </div>

                    <div
                        style={{
                            marginTop: 150,
                            height: '400px',
                            overflowY: 'auto',
                            overflowX: 'auto',
                        }}
                    >
                        <Table style={{ width: '100%' }} stripeRows>
                            <Table.Head>
                                <Table.HeadCell>ID</Table.HeadCell>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>Description</Table.HeadCell>
                                <Table.HeadCell>Owner</Table.HeadCell>
                                <Table.HeadCell>Meta-Label</Table.HeadCell>
                                <Table.HeadCell>Classification</Table.HeadCell>
                                <Table.HeadCell>Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {mergedList.map((row) => (
                                    <Table.Row key={row.id}>
                                        <Table.Cell>{row.index}</Table.Cell>
                                        <Table.Cell>{row.name}</Table.Cell>
                                        <Table.Cell>{row?.content?.label ? row.content.label : ""}</Table.Cell>
                                        <Table.Cell>
                                            {row.author}
                                        </Table.Cell>
                                        <Table.Cell align="right">{row.age}</Table.Cell>
                                        <Table.Cell>{row.email}</Table.Cell>
                                        <Table.Cell>{row.email}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ko;
