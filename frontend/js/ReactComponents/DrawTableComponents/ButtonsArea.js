import React from 'react';

export default class ButtonsArea extends React.Component{       
    
    render(){
        const {data, rowData} = this.props;
        return(
            <>
            {data.map((btn) => (
                <button type="button" className="btn btn-primary" key={`btn-${btn.name}`} onClick={() => btn.handler(rowData)} style={btn.style}>
                    {btn.name}
                </button>
            ))}
            </>
        )
    }
}