import React from "react";
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import Heading from '@splunk/react-ui/Heading';
import { useSplunkTheme } from '@splunk/themes';


function Overview({ apiData }){

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
        width: 190,
        marginBottom:19,
        marginLeft:5,
        borderRadius: 6

    };
    const divStyles = {
        marginLeft: '15%',
        fontWeight: 'bolder',
        fontSize: 'x-large',
      };
      const nbrStyles = {
        marginLeft: '28%',
        fontWeight: 'bolder',
        fontSize: '3rem',
        padding:8
      };



return(
   <div className="rounded-md" style={padding}>
            <div style={buttonWidth}>
            <div style={nbrStyles}> {apiData.customApps}  </div> <br /> <div  style={divStyles}>  Custom Apps </div>
            </div>
            <ColumnLayout  style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column gutter={5} span={3} style={colStyle}>
                    <div style={nbrStyles}>{apiData.dashboard}</div> <br/><div style={divStyles}>
                        Dashboards
                        </div>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                    <div style={nbrStyles}>
                        {apiData.report} 
                        </div>
                        <br />
                    <div  style={divStyles}>
                         Reports
                        </div>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                    <div style={nbrStyles}>{apiData.report} </div> <br /> <div  style={divStyles}>Searches</div>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={3} style={colStyle}>
                    <div style={nbrStyles}>{apiData.lookup}  </div> <br /> <div  style={divStyles}> Lookups</div>
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
            <ColumnLayout  style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    <div style={nbrStyles}>{apiData.fields}   </div> <br /> <div  style={divStyles}>  Unique fields </div>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    <div style={nbrStyles}>{apiData.index}  </div> <br /> <div  style={divStyles}>  Index</div>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    <div style={nbrStyles}>{apiData.sourceType}   </div> <br /> <div  style={divStyles}> SourceTypes </div>
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
             <ColumnLayout style={rowLayout} >
                <ColumnLayout.Row>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    <div></div> <br /> <div  style={divStyles}>  meta </div>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    <div></div> <br /> <div  style={divStyles}>  eventtype / tags </div>
                    </ColumnLayout.Column>
                    <ColumnLayout.Column span={4} style={colStyle}>
                    <div></div> <br /> <div  style={divStyles}>  labeling / Classification </div>
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </ColumnLayout>
   </div> 
)
}

export default Overview;