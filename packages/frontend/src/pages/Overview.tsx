import React from "react";
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Heading from '@splunk/react-ui/Heading';
import { useSplunkTheme } from '@splunk/themes';


function Overview(){

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
                n Custom Apps
            </div>
            <ColumnLayout  style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column gutter={5} span={3} style={colStyle}>
                        Dashboards
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                        Reports
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                        Searches
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                        Lookups
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
            <ColumnLayout  style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={4} style={colStyle}>
                       Unique fields
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                       n Index | n1 Metrics | n2 Events
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                        X SourceTypes | y Sources | Z Hosts 
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