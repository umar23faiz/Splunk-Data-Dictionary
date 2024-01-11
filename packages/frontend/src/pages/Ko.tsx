import React, { useState } from 'react';
import Button from '@splunk/react-ui/Button';
import Chip from '@splunk/react-ui/Chip';
import Table from '@splunk/react-ui/Table';
import ComboBox from '@splunk/react-ui/ComboBox';

function Ko() {
    const [value, setValue] = useState('');

    const handleChange = (e, { value: comboBoxValue }) => {
        setValue(comboBoxValue);
    };
    const toggle = <Button label="Dashboards" isMenu />;
    const data = [
        { id: '123', name: 'Rylan', age: 42, email: 'Angelita_Weimann42@gmail.com' },
        { name: 'Amelia', age: 24, email: 'Dexter.Trantow57@hotmail.com' },
        { name: 'Estevan', age: 56, email: 'Aimee7@hotmail.com' },
        { name: 'Florence', age: 71, email: 'Jarrod.Bernier13@yahoo.com' },
        { name: 'Tressa', age: 38, email: 'Yadira1@hotmail.com' },
    ];
    return (
        <div style={{ marginTop: 20 }}>
            <div>
                <ComboBox inline onChange={handleChange} value={value}>
                    <ComboBox.Option value="List All" />
                    <ComboBox.Option value="Apps(KO)" />
                    <ComboBox.Option value="Dashboards(KO)" />
                    <ComboBox.Option value="Reports/Saved Searches(KO)" />
                    <ComboBox.Option value="Alerts(KO)" />
                    <ComboBox.Option value="Lookups(Data Inventory)" />
                    <ComboBox.Option value="Fields(Data Inventory)" />
                    <ComboBox.Option value="Index(Data Inventory)" />
                </ComboBox>
                <Chip style={{ marginLeft: 60 }}>All Splunk Instances</Chip>
            </div>
            <div style={{ marginTop: 150 }}>
                <Table stripeRows>
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
                        {data.map((row) => (
                            <Table.Row key={row.email}>
                                <Table.Cell>{row.name}</Table.Cell>
                                <Table.Cell align="right">{row.age}</Table.Cell>
                                <Table.Cell>{row.email}</Table.Cell>
                                <Table.Cell>{row.name}</Table.Cell>
                                <Table.Cell align="right">{row.age}</Table.Cell>
                                <Table.Cell>{row.email}</Table.Cell>
                                <Table.Cell>{row.email}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default Ko;
