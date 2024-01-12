import React from "react";
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Heading from '@splunk/react-ui/Heading';
import { useSplunkTheme } from '@splunk/themes';


function Overview({ apiData }){

    console.log(apiData)
    const { syntaxBlue } = useSplunkTheme();
    const colStyle: React.CSSProperties = {
        border: `1px solid ${syntaxBlue}`,
        padding: 10,
        minHeight: 80,
        borderRadius: 6
    };
    const rowLayout: React.CSSProperties = {
        paddingTop: 50,
        minHeight: 80,
    };
    const padding: React.CSSProperties = {
        padding: 40,
    };
    const buttonWidth: React.CSSProperties = {
        border: `1px solid ${syntaxBlue}`,
        padding: 10,
        minHeight: 30,
        width: 90,
        marginBottom:19,
        marginLeft:5,
        borderRadius: 6

    };

return(
   <div className="rounded-md" style={padding}>
            <div style={buttonWidth}>
                {apiData.customApps} Custom Apps
            </div>
            <ColumnLayout  style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column gutter={5} span={3} style={colStyle}>
                    {apiData.dashboard} Dashboards
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                    {apiData.report} Reports
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                    {apiData.report}  Searches
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                    {apiData.lookup}  Lookups
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
            <ColumnLayout  style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    {apiData.fields}   Unique fields
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    {apiData.index}  Index
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    {apiData.sourceType}  SourceTypes 
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
             <ColumnLayout style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={4} style={colStyle}>
                        meta
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                       eventtype / tags
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                        labeling / Classification
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
   </div> 
)
}

export default Overview;