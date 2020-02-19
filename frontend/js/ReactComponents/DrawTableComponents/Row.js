import React from 'react';
import ButtonsArea from './ButtonsArea';


export default class Row extends React.Component{
  
    render(){
        const {rowData, columns} = this.props; 

        return(
            <tr className="tableSrting">
                {
                    columns.map(
                        function(col){
                            return <th className={col} scope="col" key={`data-${rowData.id}-${col}`}>{rowData[col]}</th>
                        }
                    )
                }
               {!!(this.props.buttons && this.props.buttons.length) &&
                <th className="buttonsArea" scope="col">
                    <ButtonsArea data={this.props.buttons} rowData={rowData}/>                   
                </th>
                }
            </tr>
        )
    }
}




