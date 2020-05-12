import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import './Styles/CampaignScreen.css';
import CampaignTable, { MultipleActions } from '../Components/CampaignTable';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { TableData, cardDetails, categories, tableHeaderData } from './constants'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Add from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import { addDays, format } from 'date-fns'
import uuid from 'uuid'
import { Dialog } from 'material-ui';
import axios from 'axios';
const TEXTFIELDS = [
    {
        value: 'minItemCount',
        name: 'minItemCount',
        floatingLabelText: "Minimum Item Count",
        isOpen: true
    },
    {
        value: 'discountPrice',
        name: 'discountPrice',
        floatingLabelText: "Discount Price",
        isOpen: true
    },
    {
        value: 'numOfDays',
        name: 'numOfDays',
        floatingLabelText: "Number Of Days",
        isOpen: true
    }
]

export default class CampaignScreen extends Component {
    state = {
        campaignName: '',
        itemCategories: '',
        isModalOpen: false,
        campaignType: '',
        minItemCount: { isOpen: false, value: '' },
        discountPrice: { isOpen: false, value: '' },
        numOfDays: { isOpen: false, value: '' },
        inputFields: TEXTFIELDS,
        campaignTableData: [],
        isTableDataLoading: true,
        open: false,
    }

    componentDidMount() {

        //mocking getting data, this populates the table data
       /* setTimeout(() => {
            this.setState({
                campaignTableData: [...TableData],
                isTableDataLoading: true
            })
        }, 2000);*/
        axios.get('/api/campaign')
            .then( (response) =>{
                console.log(response.data.data);
                this.setState({
                    campaignTableData: response.data.data,
                    isTableDataLoading: true
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log("初始化")
    }


    /**
     * handles the campaign name value change
     * @param {object}  event -  the event object from which we can get the value of the target input
     */
    handleCampaignNameChange = (event) => {
        this.setState({
            campaignName: event.target.value
        })
    }


    /**
     * handles the campaign name value change
     * @param {object}  event - the event object from which we can get the value of the target input
     *
     *
     */


    /**
     * This function helps inselecting an item from the categories
     *@param {object}  event - the event object from which we can get the value of the target input
     *@param {object}  index - The index of the selected item
     *@param {object}  value - The selected item Value
     *@param {object}  type - The category that the item belogs to
     */
    handleSelectFieldChange = (event, index, value, type) => {
        this.setState({ [type]: value })
    }


    /**
     * This function handles the change of the input values (minimum item count, discount price and number of days)
     * @param {object}  event - the event object from which we can get the value of the target input
     */
    handleChange = (event) => {
        return this.setState({
            [event.target.name]: { ...this.state[event.target.name], value: event.target.value }
        });
    }




    handleOpenModal = (detail) => {
        this.setState({
            campaignType: detail,
            isModalOpen: true,
            dataIndex:-1
        })
        console.log("新增窗口")
    }

    handleDeleteModal = (selectedItem) => {
        this.setState({
            open: true,
            itemToDelete: selectedItem
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleEditModal = (item) => {
        const {
            campaignName,
            discountType,
            validTill,
            numOfDays,
            itemCategories,
            minItemCount,
            discountPrice,
            id,
            dataIndex,
            isCategoryMenuOpen,
        } = item

        this.setState({
            campaignType: discountType,
            campaignName,
            isModalOpen: true,
            validTill,
            numOfDays,
            itemCategories,
            minItemCount,
            discountPrice,
            id,
            dataIndex,
            isCategoryMenuOpen
        })
    }

    handleCloseModal = () => {
        this.setState({
            campaignName: '',
            itemCategories: '',
            isModalOpen: false,
            campaignType: '',
            minItemCount: "",
            discountPrice: "",
            numOfDays: "",
            inputFields: TEXTFIELDS,
            isCategoryMenuOpen: false
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { campaignName,
            itemCategories,
            isModalOpen,
            campaignType,
            minItemCount,
            discountPrice,
            numOfDays,
            id,
            dataIndex
        } = this.state
        // if it has an id, is to edit else it is to create
        console.log({ 'TIME': typeof (numOfDays.value) })
        console.log({ 'TIME': typeof (numOfDays) })
        // remove the 'create' word from campaign name
        let dataToAddToTable = {
            campaignName: campaignName,
            discountType: campaignType.replace("Create ", ""),
            validTill: !numOfDays || numOfDays.value === '' || typeof (numOfDays.value) === "string" ? format(addDays(new Date(), 10), 'dd/MM/yyyy') : format(addDays(new Date(), numOfDays.value), 'dd/MM/yyyy'),
            numOfDays: numOfDays.value === '' || typeof (numOfDays.value) === "string" ? { value: 10, isOpen: true } : { value: numOfDays, isOpen: true },
            itemCategories,
            minItemCount: minItemCount.value === '' || typeof (minItemCount.value) === "string" ? { value: 10, isOpen: true } : { value: minItemCount, isOpen: true },
            discountPrice: discountPrice.value === '' || typeof (discountPrice.value) === "string" ? { value: 10, isOpen: true } : { value: discountPrice, isOpen: true },
            totalRedemptions: 0,
            id: id ? id : uuid(),
            isCategoryMenuOpen: true
        }
        console.log(dataIndex)
        const addData = { campaignName,
            itemCategories,
            isModalOpen,
            campaignType,
            minItemCount,
            discountPrice,
            numOfDays,
            discountType: campaignType.replace("Create ", ""),
            validTill: !numOfDays || numOfDays.value === '' || typeof (numOfDays.value) === "string" ? format(addDays(new Date(), 10), 'dd/MM/yyyy') : format(addDays(new Date(), numOfDays.value), 'dd/MM/yyyy')}

        console.log("打印ID",id);
        if (id && dataIndex!=-1) {
            axios.put(`/api/campaign/${id}`, addData)
                .then( (response) => {
                    const { campaignTableData } = this.state;
                    const newData = [...campaignTableData]
                    newData[dataIndex] = dataToAddToTable
                    this.setState({
                        campaignTableData: [...newData],
                    })
                    this.handleCloseModal()
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });


        } else {

            axios.post('/api/campaign',addData)
                .then((response) =>{
                    console.log(response);
                    dataToAddToTable.id = response.data.data.id
                    this.setState({
                        campaignTableData: [...this.state.campaignTableData, dataToAddToTable],
                    })
                    this.handleCloseModal()
                })
                .catch(function (error) {
                    console.log(error);
                });


        }
        console.log("保存")
    }

    handleShowCategoryMenu = () => {
        this.setState({
            isCategoryMenuOpen: !this.state.isCategoryMenuOpen,
            itemCategories: '',
        })
    }

    handleShowTextFieldMenus = (item) => {
        this.setState({
            [item]: { isOpen: !this.state[item].isOpen, value: '' }
        })
    }

    handleDeleteItem = () => {
        const { itemToDelete, campaignTableData } = this.state;
        const { id } = itemToDelete;


        axios.delete(`/api/campaign/${id}`)
            .then( (response) => {
                const res = campaignTableData.filter(item => item.id !== id);
                this.setState({
                    campaignTableData: [...res],
                    open: false
                })
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {

        const { campaignName,
            itemCategories,
            isModalOpen,
            campaignType,
            minItemCount,
            discountPrice,
            numOfDays,
            campaignTableData,
            isTableDataLoading
        } = this.state

        const handleEnableButton = () => {
            if (campaignName !== "" &&
                (itemCategories !== "") ||
                (minItemCount.value && !isNaN(minItemCount.value)) ||
                (discountPrice.value && !isNaN(discountPrice.value)) ||
                numOfDays.value && !isNaN(numOfDays.value)) {
                return false
            } else { return true }
        }

        const actions = [
            <FlatButton
                label="No"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onClick={this.handleDeleteItem}
            />,
        ];

        return (
            <React.Fragment>
                <main className="schedule-page" >
                    <section className="schedule-container">
                        {
                            cardDetails.map(detail => {
                                return <Paper
                                    className="card-button"
                                    key={detail}
                                    onClick={() => this.handleOpenModal(detail)}
                                >
                                    {detail}
                                </Paper>
                            })
                        }
                    </section>
                    <CampaignTable
                        tableData={campaignTableData}
                        tableHeaderData={tableHeaderData}
                        isTableDataLoading={isTableDataLoading}
                        handleEditModal={this.handleEditModal}
                        handleDeleteItem={this.handleDeleteItem}
                        handleDeleteModal={this.handleDeleteModal}
                    />
                </main>

                {/* delete modal */}
                <div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Do you really want to delete this?
                    </Dialog>
                </div>


                <section
                    className={isModalOpen ? 'modal_section modal_section__open' : 'modal_section modal_section__close'}
                >
                    <Paper
                        className="modal_content"
                    >
                        <Close color="black" hoverColor="red" onClick={this.handleCloseModal} />

                        <div>
                            <h1 className="modal__header_text">{campaignType}</h1>
                            <form action="">
                                <div className="modal__campaign_name">
                                    <TextField
                                        id="CampaignName"
                                        value={this.state.campaignName}
                                        name='campaignName'
                                        onChange={this.handleCampaignNameChange}
                                        floatingLabelText="Campaign Name"
                                        floatingLabelStyle={{ fontSize: '20px', color: "#69E2C7" }}
                                        underlineFocusStyle={{ borderColor: "#69E2C7", }}
                                        fullWidth={true}
                                        required={true}
                                        errorText={this.state.campaignName === "" && `You must Have  name for your  campaign`}
                                    />
                                </div>

                                {/* we pass a type to the handle function so that we do not need to write multiple functions to handle other dropdown on change events. this type would correspond to the state value */}
                                {/* <p>Rules</p> */}
                                <div style={{ position: 'relative', height: '72px' }}>
                                    {!this.state.isCategoryMenuOpen && <p style={{ position: 'absolute', fontSize: '20px', color: "#69E2C7", top: '16px' }}
                                        onClick={this.handleShowCategoryMenu}
                                    >Category</p>
                                    }
                                    <SelectField
                                        floatingLabelText="Category"
                                        value={this.state.itemCategories}
                                        name={this.state.itemCategories}
                                        onChange={(event, index, value, ) => { this.handleSelectFieldChange(event, index, value, 'itemCategories') }}
                                        floatingLabelStyle={{ fontSize: '20px', color: "#69E2C7" }}
                                        underlineFocusStyle={{ borderColor: "#69E2C7" }}
                                        required="required"
                                        errorText={(itemCategories === null || itemCategories === "") && `You must Select an Item`}
                                        style={this.state.isCategoryMenuOpen ? { opacity: 1, visibility: 'visible', height: '100%' } : { opacity: 0, visibility: 'hidden', height: '0' }}
                                    >
                                        <MenuItem
                                            value="All"
                                            primaryText="All" />
                                        {
                                            categories.map(category => {
                                                return <MenuItem
                                                    value={category} primaryText={category}
                                                    key={category}
                                                    name={category}
                                                />
                                            })
                                        }
                                    </SelectField>

                                    <IconButton
                                        touch={true}
                                        onClick={this.handleShowCategoryMenu}
                                        style={{ fontSize: '25px', position: 'absolute', top: '25px', right: '1%', marginRight: '5px', cursor: 'pointer' }}
                                    >
                                        {
                                            this.state.isCategoryMenuOpen ? <Close hoverColor="red" /> : <Add hoverColor="#69e2c7" />
                                        }
                                    </IconButton>
                                    {/* <Add color="black" hoverColor="#69e2c7"
                                    disabled={true}
                                    style={{ fontSize: '25px',position:'absolute', bottom:'10px', marginRight:'5px', cursor:'pointer' }} tag="Add More Rule" /> */}
                                </div>

                                {
                                    this.state.inputFields.map(items => {
                                        const { value, name, floatingLabelText, isOpen } = items;

                                        return <div style={isOpen ? { height: '72px', opacity: '1', visibility: 'visible', transition: 'all .3s ease-in-out', position: 'relative', height: '72px' } : { height: '0px', opacity: '0', visibility: 'hidden', transition: 'all .3s ease-in-out' }}
                                            key={floatingLabelText}
                                        >

                                            {this.state[value].isOpen ? null : <p style={{
                                                position: 'absolute',
                                                fontSize: '20px',
                                                color: "#69E2C7",
                                                top: '16px'
                                            }}
                                                onClick={() => { this.handleShowTextFieldMenus(value) }}
                                            >{floatingLabelText}</p>}

                                            <TextField
                                                key={name}
                                                value={this.state[value].value}
                                                name={name}
                                                onChange={this.handleChange}
                                                errorText={(this.state[value].value && isNaN(this.state[value].value)) && `This must be a number`}
                                                floatingLabelText={floatingLabelText}
                                                floatingLabelStyle={{ fontSize: '20px', color: "#69E2C7" }}
                                                underlineFocusStyle={{ borderColor: "#69E2C7", }}
                                                fullWidth={false}
                                                style={this.state[value].isOpen ? { opacity: 1, visibility: 'visible', height: '100%' } : { opacity: 0, visibility: 'hidden', height: '0' }}
                                            />

                                            {
                                                <IconButton
                                                    touch={true}
                                                    onClick={() => { this.handleShowTextFieldMenus(value) }}
                                                    style={{
                                                        fontSize: '25px',
                                                        position: 'absolute',
                                                        top: '25px',
                                                        right: '1%',
                                                        marginRight: '5px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {
                                                        this.state[value].isOpen ? <Close hoverColor="red" /> : <Add hoverColor="#69e2c7" />
                                                    }
                                                </IconButton>}
                                        </div>
                                    })
                                }
                                <div style={{
                                    margin: '20px 0',
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <FlatButton
                                        label="Cancel"
                                        secondary={true}
                                        style={{ marginRight: 12 }}
                                        onClick={this.handleCloseModal}
                                    />
                                    <RaisedButton
                                        label="Save"
                                        backgroundColor="#69E2C7"
                                        labelColor="#fff"
                                        type="submit"
                                        disabled={handleEnableButton()}
                                        onClick={this.handleFormSubmit}
                                    />
                                </div>
                            </form>

                        </div>
                    </Paper>
                </section>
            </React.Fragment>
        )
    }
}
