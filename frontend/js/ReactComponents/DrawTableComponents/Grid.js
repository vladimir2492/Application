import React from 'react';
import {Spinner} from 'react-bootstrap';
import Row  from './Row'


export default class Grid extends React.Component{
    constructor(props){
        super(props);                
    }
   
    render(){
        const {options, isLoading, data, butAccess, component} = this.props   
        let {columns, buttons} = options;
        if(!butAccess && component === 'users'){
            buttons =[];
        }
        if (!isLoading) {
            return <Spinner animation="border" />;
        }
        return(
            <table className="table">
                 <thead className="theadArea">
                    <tr className="headerTr">  
                        {
                            columns.map(
                                colName => <th scope="col" key={`header-${colName}`}>{colName.toUpperCase()}</th>
                            )
                        }
                        {   buttons && buttons.length!=0 && //if buttons exist, then print column for buttons
                            <th scope="col" className="buttonsArea"></th>
                        }
                    </tr>
                </thead>
                <tbody>
                {data.map(
                    (data) => (<Row rowData={data} columns ={columns} key={'grid-row' + data.id} buttons={buttons}/>)
                )}
                </tbody>                
            </table>                
        )
    }
}

