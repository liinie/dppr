import React from "react";

class LogFile extends React.Component {

    getLogFile(){
        const jsObj = JSON.stringify(this.props.keyPressHist);

        var hiddenElement = document.createElement("a");
        hiddenElement.href =
            "data:text/json;charset=utf-8," + encodeURIComponent(jsObj);
        hiddenElement.target = "_blank";
        hiddenElement.download = "logfile.json";
        hiddenElement.click();
    };

    render(){
        return (
            <div>
                {this.getLogFile()}
            </div>
        );

    }
}

export default LogFile;