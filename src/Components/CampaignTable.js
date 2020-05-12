import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper'
import '../Containers/Styles/CampaignTable.css'
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */



class CampaignTable extends Component {

    state = {
        height: `${window.innerHeight - 360}px`,
        fixedHeader: true,
        fixedFooter: false,
        selectable: true,
        multiSelectable: true,
        isCheckboxesChecked: false,
        selectedRows: [],
        tableData: []
    }

    componentDidMount() {
        this.setState({
            tableData: this.props.tableData
        })
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.tableData !== this.state.tableData) {
            this.setState({
                tableData: this.props.tableData
            })
            this.handleSelectedRows()
        }
    }

    handleSelectedRows = () => {
        const {
            tableData } = this.state;
        const { selectedRows } = this.state;
        if (selectedRows === 'all') {
            return tableData.length
        } else if (selectedRows === 'none') {
            return 0
        } else { return selectedRows.length }
    }

    handleRowSelection = (selectedRows) => {
        if (selectedRows.length === 0) { // due to a bug in material-ui
            setTimeout(() => {
                this.setState({
                    selectedRows: this.state.selectedRows
                })
            }, 100);
            return;
        };
        this.setState({ selectedRows });
        console.log({ selectedRows })
    }

    handleAddDataToTable = (e) => {
        console.log({ 'data from props': e })
    }




    render() {
        const { tableHeaderData, handleEditModal, handleDeleteItem } = this.props

        const { height,
            fixedHeader,
            fixedFooter,
            selectable,
            multiSelectable,
            isCheckboxesChecked,
            selectedRows,
            tableData
        } = this.state



        return (
            <div style={{ position: 'relative', marginTop: '30px' }}>
                <table
                    onRowSelection={this.handleRowSelection
                    }
                    height={height}
                    fixedHeader={fixedHeader}
                    fixedFooter={fixedFooter}
                    selectable={selectable}
                    multiSelectable={multiSelectable}
                    className="table"
                >
                    <thead
                        className="thead"
                    >
                        <tr
                            className="tr"
                        >
                            {
                                tableHeaderData.map(data => {
                                    return (
                                        <th
                                            style={{ fontSize: '16px', textTransform: 'uppercase' }}
                                            key={data}
                                            tooltip={data}
                                            className="td"
                                            scope="col"
                                        >
                                            {data}
                                        </th>)
                                })
                            }
                        </tr>
                    </thead>
                    <tbody
                        showRowHover={true}
                        className="tbody"
                    >
                        {
                            tableData && tableData.map((item, i) => {
                                const { campaignName, discountType, validTill, totalRedemptions } = item
                                return (<tr key={i}
                                    selected={this.state.selectedRows.indexOf(i) !== -1}
                                >
                                    <td
                                        data-label='CAMPAIGN NAME'
                                    >
                                        {campaignName}
                                    </td>
                                    <td
                                        data-label='DISCOUNT TYPE'
                                    >
                                        {discountType}
                                    </td>
                                    <td
                                        data-label='VALID TILL'
                                    >
                                        {validTill}
                                    </td>
                                    <td
                                        data-label='TOTAL REDEMPTIONS'
                                    >
                                        {totalRedemptions}
                                    </td>
                                    <td
                                        data-label='ACTION'
                                    >
                                        {
                                            <IconButton
                                                touch={true}
                                                onClick={() => handleEditModal({ ...item, dataIndex: i })}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <EditIcon hoverColor="#69E2C7" />
                                            </IconButton>
                                        }
                                        {
                                            <IconButton
                                                touch={true}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => this.props.handleDeleteModal(item)}
                                            // onClick={() => handleDeleteItem(selectedRows)}
                                            >
                                                <DeleteIcon
                                                    color="#000"
                                                    hoverColor="red"
                                                />
                                            </IconButton>
                                        }
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    };
}
export default CampaignTable;
