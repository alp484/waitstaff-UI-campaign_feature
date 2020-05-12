import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import FlatButton from 'material-ui/FlatButton'
import './Styles/CategoryListStyles.css'
import MenuItem from 'material-ui/MenuItem'
import Spinner from '../Components/Spinner'
import FbPostLogo from '../facebook_white.svg'
import FbMessageLogo from '../messenger_white.svg'
import FbPostLogoBlue from '../facebook_blue.svg'
import FbMessageLogoBlue from '../messenger_blue.svg'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import Selector from './ItemListScreen'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Close from 'material-ui/svg-icons/navigation/close'
import Paper from 'material-ui/Paper'
import Calendar from 'rc-calendar'
import moment from 'moment'
import testData from './testSchedule'
import './Styles/rcCalendar.css'
import './Styles/rcTimePicker.css'
import './Styles/Schedule.css'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import TimePicker from 'rc-time-picker'
import ScheduleQueueBanner from '../Components/ScheduleQueueBanner';

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'h:mma'
const FACEBOOK_POST = 'Facebook Post'
const FACEBOOK_MESSAGE = 'Facebook Message'
const SAVE = 'Save'
const REMOVE = 'Remove'
const EMPTY_IMAGES = 'Press \'Image Set\' to select products and submit'
const IMAGE_SET = 'Image Set'
const OK = 'OK'
const SELECT_TIME = 'select time'
const PRODUCTS_IN_COOKIE = 'products'
const IDS_IN_COOKIE = 'items'
const PRIMARY_COLOR = '#177eba'
const REMOVE_COLOR = '#ccc'
const REPEAT_SCOPE = ['No Repeat','3 days', '1 week', '2 week', '3 week', '4 week']
const WARNING_MESSAGE = 'Warning! Past Date/Time.'

const BUTTON_LABEL_STYLE = {
    color: '#ffffff',
    textTransform: 'none',
    fontSize: '16px',
    padding: 0,
}

const noImage = `'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 300.167 300.167"><rect width="100%" height="100%" fill="#ffffff"></rect><g fill="#212121"><path d="M251.39 157.505c-1.362-1.559-2.517-3.26-3.469-5.056-.468 48.27-39.875 87.398-88.254 87.398-48.669 0-88.265-39.596-88.265-88.265s39.596-88.265 88.265-88.265c41.868 0 77.02 29.304 86.027 68.477l7.993-59.42.18-1.336c-22.76-26.581-56.544-43.457-94.2-43.457-29.378 0-56.398 10.276-77.667 27.414v28.586c0 16.811-8.713 32.159-22.5 40.929v100.073c22.574 30.89 59.063 50.998 100.167 50.998 43.192 0 81.291-22.203 103.5-55.79V165.28c-4.506-1.466-8.589-4.129-11.777-7.775z"/><path d="M159.667 78.318c-40.398 0-73.265 32.866-73.265 73.265s32.866 73.265 73.265 73.265 73.265-32.866 73.265-73.265-32.867-73.265-73.265-73.265zm140.166-63.842c0-6.384-5.175-11.559-11.559-11.559-5.788 0-10.684 4.281-11.455 10.018l-16.89 125.549c-.445 3.305.56 6.64 2.754 9.15 2.195 2.51 5.366 3.949 8.701 3.949h6.782V286.25c0 6.075 4.925 11 11 11s11-4.925 11-11l-.333-271.774zM67 16.917c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v41.499H41V16.917c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v41.499H15V16.917c0-4.143-3.357-7.5-7.5-7.5S0 12.774 0 16.917v67.666c0 14.619 9.417 27.073 22.5 31.636V286.25c0 6.075 4.925 11 11 11s11-4.925 11-11V116.219C57.583 111.656 67 99.202 67 84.583V16.917z"/></g></svg>'`

class ScheduleScreen extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor (props) {
        super(props)
        const {cookies} = props

        const tempImg = (cookies.get('pageId')) ? `http://graph.facebook.com/${cookies.get('pageId')}/picture?width=200` : noImage;

        this.state = {
            anchorElFirst: null,
            anchorElShare: null,
            anchorElSecond: null,
            channel: FACEBOOK_POST,
            defaultIds: [],
            modalOpened: false,
            openFirst: false,
            openSecond: false,
            openShare: false,
            prodSelectorOpened: false,
            segments: [],
            selectedDates: [],
            selectedDate: moment(),
            selectedDatesDays: [],
            selectedRepeatLabel: 'Schedule:',
            selectedSegmentUser: 'Users:',
            selectedSegmentValue: '',
            selectedRepeatValue: 'No Repeat',
            selectedTime: moment(),
            selectedText: 'Custom message to users',
            shareType: FACEBOOK_POST,
            upcoming: {},
            upcomingNumber: 0,
            noImageUrl: tempImg,
            suggestiveButtons:  ['Get it while its hot! 🔥😋',
                'NEW ARRIVAL! nom nom 😋', 'We know, its hard to resist 😬'],
            placeholderText: 'Custom message to users'

        }
        cookies.remove(PRODUCTS_IN_COOKIE)
        cookies.remove(IDS_IN_COOKIE)

        this.selectDate = this.selectDate.bind(this);
    }

    componentWillMount() {
        // Necessary?
        // this.setUpcoming();
    }

    loadEventData () {
      // Sort by date and update next to be posted, and number in queue
      if (process.env.NODE_ENV === 'development') {
        let sortedData = testData.sort((a, b) => a.date - b.date);
          this.setState({
            selectedDates: sortedData,
            selectedDatesDays: testData.reduce((acc, item) => { return [...acc, item.date] }, []),
            upcoming: sortedData[0],
            upcomingNumber: sortedData.length
          });
      } else {
        fetch('/scheduler/read',{ credentials: "same-origin"})
          .then(res => res.json())
          .then((eventData) =>{
            let sortedData = eventData.sort((a, b) => a.date - b.date);
            this.setState({
                selectedDates: sortedData,
                selectedDatesDays: sortedData.reduce((acc, item) => { return [...acc, item.date] }, []),
                upcoming: sortedData[0],
                upcomingNumber: sortedData.length
            });
        });
      }
    }

    getAllSegments() {
        const URL = process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:4000/getSegments'
          : '/getSegments';

        fetch(URL)
          .then(res => res.json())
          .then(data => this.setState({ segments: data }))
          .catch(err => console.log(err))
    }

    componentDidMount () {
       this.loadEventData();
       this.getAllSegments();
    }

    setSelectedText(text){
        this.setState({
            selectedText:text,
        })
    }
    setUpcoming(){
        this.setState((prev)=>{
            let tempDates = prev.selectedDates.filter((item)=>item.time>moment().valueOf())
            tempDates.sort((a,b)=>{
                return a.time-b.time;
            });

            if(tempDates){
                return{
                    upcoming: tempDates[0],
                    upcomingNumber: tempDates.length,
                }
            }
            return {
                upcoming: {},
                upcomingNumber: 0,
            }

        })
    }

    removeProductFromCookie (product) {
        const {cookies} = this.props
        const id = product.id
        let newNum = 0
        let selected = cookies.get(IDS_IN_COOKIE)
        if (selected) {
            selected = decodeURI(selected).split(',')
            let acc = ''
            selected.forEach(item => {if (item !== id) acc += `${item},`})
            acc = acc.slice(0, acc.length - 1)
            cookies.set(IDS_IN_COOKIE, encodeURI(acc))
            newNum = selected.length - 1
        }

        let selectedProducts = cookies.get(PRODUCTS_IN_COOKIE)
        let temp = selectedProducts.filter((item) => item.id !== product.id)
        cookies.set(PRODUCTS_IN_COOKIE, temp)

        this.forceUpdate()

        const defaultIds = []
        const ids = cookies.get(PRODUCTS_IN_COOKIE)
        if (ids && ids.length) ids.forEach(item => {defaultIds.push(item.id)})

        this.setState({
            defaultIds,
        })
        return newNum
    }

    renderCalendarTile (current, value) {

        const {selectedDates, selectedDatesDays} = this.state
        const date = moment(current.format(DATE_FORMAT)).valueOf();

        let classNames = ''
        let time = ''
        let shareType = ''
        let shareTypeMix = ''

        let idx = selectedDatesDays.indexOf(date);
        let index = idx;

        var indices = [];

        while (idx != -1) {
            if (indices.indexOf(selectedDates[idx].channel) == -1) {
                indices.push(selectedDates[idx].channel);
            }
            idx = selectedDatesDays.indexOf(date, idx + 1);
        }

        if (index >= 0) {
           
            classNames = selectedDates[index].date > Date.now()
              ? 'tile tile-busy'
              : 'tile tile-expired'
            // classNames = 'tile  tile-busy'
            time = <label className=' time_label'>{moment(selectedDates[index].time).format(TIME_FORMAT)}</label>;

            if (indices.length == 1) {
                const shareTypeSvg = (selectedDates[index].channel === FACEBOOK_POST.toUpperCase()) ? FbPostLogoBlue :
                    (selectedDates[index].channel === FACEBOOK_MESSAGE.toUpperCase()) ?  FbMessageLogoBlue : '';

                shareType = <div className=' share_type_label' style={{backgroundSize: 'contain', backgroundImage: `url(${shareTypeSvg})`}}/>
            } else {
                shareType = <div className=' share_type_label' style={{backgroundSize: 'contain', backgroundImage: `url(${FbPostLogoBlue})`}}/>
                shareTypeMix = <div className=' share_type_label' style={{marginLeft: '18px', backgroundSize: 'contain', backgroundImage: `url(${FbMessageLogoBlue})`}}/>
            }
            /*if (current > moment()) {
              marker = <div className=' event_marker'/>
            } else {
              marker = <div className=' event_marker event_marker_fill'/>
            }*/
        } else {
            classNames = 'tile'
        }
        if (current.format(DATE_FORMAT) === moment().format(DATE_FORMAT)) classNames = 'tile  tile-selected'
        return <div className={classNames}>{/*marker*/} {time} {shareType} {shareTypeMix}<label
            style={{margin: '0.25em', fontSize: '16px'}}>{current.date()}</label></div>
    }

    /*renderToggle () {
      const leftButtonSelected = (this.state.shareType === FACEBOOK_MESSAGE);
      const rightButtonSelected = !leftButtonSelected;
      const leftLabelColor = leftButtonSelected ? PRIMARY_COLOR  : '#fff';
      const rightLabelColor = !leftButtonSelected ? PRIMARY_COLOR  : '#fff';
      return (
        <div className='toggle-container'>
          <FlatButton
            label='Message'
            labelStyle={{
              color:leftLabelColor,
              ...TOGGLE_LABEL_STYLE,
            }}
            onClick={()=>this.setShareType(FACEBOOK_MESSAGE)}
            style={{
            backgroundImage: `url(${FbMessageLogo})`,
            backgroundColor: (leftButtonSelected ? REMOVE_COLOR : 'transparent'),
          }}
                      className='toggle_button left_toggle_button'/>
          <FlatButton
            label='Post'
            labelStyle={{
              color:rightLabelColor,
              ...TOGGLE_LABEL_STYLE,
            }}
            onClick={()=>this.setShareType(FACEBOOK_POST)}
            style={{
            backgroundImage: `url(${FbPostLogo})`,
            backgroundColor: (rightButtonSelected ? REMOVE_COLOR : 'transparent'),
          }}
                      className='toggle_button right_toggle_button'/>
        </div>
      )
    }*/
    renderShareTypePopover () {
        const logo = (this.state.channel === FACEBOOK_MESSAGE.toUpperCase()) ? FbMessageLogo : FbPostLogo
        return (
            <div className='buttons_wrapper' key='buttons_wrapper'>
                <FlatButton
                    primary
                    children={
                        <div
                            className='share-type-popover'
                            style={{
                                backgroundImage: `url(${logo})`,
                            }}>
                            <label key={'ShareTypeLabel'}
                                   style={{marginLeft: '40px', color: '#fff', lineHeight: 1,}}>{this.state.shareType}</label>
                            <Arrow color='#fff'/>
                        </div>
                    }
                    className=' modal_popover'
                    labelStyle={BUTTON_LABEL_STYLE}
                    onClick={(event) => {
                        this.sharePopoverOpen(event)
                    }}/>
                <Popover
                    open={this.state.openShare}
                    anchorEl={this.state.anchorElShare}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={() => {
                        this.sharePopoverClose()
                    }}
                >
                    <Menu
                        onChange={(e, type) => {
                            this.sharePopoverClose()
                            this.selectShareType(type)
                        }}
                    >
                        <MenuItem primaryText={FACEBOOK_MESSAGE}
                                  value={FACEBOOK_MESSAGE}/>
                        <MenuItem primaryText={FACEBOOK_POST}
                                  value={FACEBOOK_POST}/>
                    </Menu>
                </Popover>
            </div>
        )
    }

    renderSelectedImage (product, key) {
        const imgStyle = {backgroundImage: `url(${product.image || this.state.noImageUrl})`}
        return (
            <div className="image_container_modal" key={key}>
                <div className="image" style={imgStyle}></div>
                <div className='remove-icon'>
                    <DeleteIcon color={REMOVE_COLOR}
                                onClick={() => {this.removeProductFromCookie(product)}}/>
                </div>
            </div>
        )
    }

    renderSelectedImages () {

        const {cookies} = this.props
        const products = cookies.get(PRODUCTS_IN_COOKIE)
        if (!products || !products.length) return <h3>{EMPTY_IMAGES}</h3>
        return (
            <div style={{flex: 1}}>
                <div style={{flex: '0 1', flexWrap: 'wrap', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                    {products.map((prod, index) => {
                        return this.renderSelectedImage(prod, index)
                    })}
                </div>
            </div>

        )
    }

    renderRepeatItems () {
        return (
            REPEAT_SCOPE.map((item) => (
                <MenuItem primaryText={item}
                          value={item}
                          key={item}/>
            ))
        )
    }

    setDefaultValue (event) {

        this.setState({
            selectedTime: event.time,
            shareType: event.shareType,
            selectedRepeatValue: event.repeat,
            selectedRepeatLabel: event.repeat,
            selectedText: event.text,
        })
        this.props.cookies.set(PRODUCTS_IN_COOKIE, event.products)
        const productsIds = event.products.map(item => item.id).toString()
        this.props.cookies.set(IDS_IN_COOKIE, encodeURI(productsIds))
    }

    renderModal () {
        const {selectedDate, prodSelectorOpened, selectedDatesDays, selectedSegmentValue} = this.state
        // const {cookies} = this.props
        // const selectedProducts = cookies.get(PRODUCTS_IN_COOKIE)
        const prodSelectorDisplay = prodSelectorOpened ? 'block' : 'none'
        const userUnselectDisplay = selectedSegmentValue == "" ? 'none' : 'inline-flex'

        const removeButton = selectedDatesDays.includes(selectedDate) ? <FlatButton
            primary
            label={REMOVE}
            className=' bottom_button'
            labelStyle={BUTTON_LABEL_STYLE}
            onClick={() => this.removeDate()}/> : ''

        return <div className=' highlight-container' onClick={this.closeModal}>

            <div className='prod_selector-container' style={{display: prodSelectorDisplay}}
                 onClick={(e) => {e.stopPropagation()}}>

                <FlatButton className='selector_ok_button' label={OK} labelStyle={{color: '#177eba'}}
                            onClick={() => this.closeProdSelector()}/>

                <div style={{marginBottom: '2em'}}>
                    <Selector defaultIds={this.state.defaultIds}/>
                </div>

            </div>


            <div className=' action_selector_container ' onClick={(e) => {e.stopPropagation()}}>
                <div style={{paddingBottom: '1em'}}>
                    <h1>{moment(selectedDate).format('dddd')}</h1>
                    <h1>{moment(selectedDate).format('MMMM D')}</h1>
                    <div>
                        <div>
                            <h3 style={{color: '#ffffff'}}>{SELECT_TIME}</h3>
                            <TimePicker
                                clearText=''
                                showSecond={false}
                                defaultValue={moment(this.state.selectedTime)}
                                className=" xxx "
                                allowEmpty={false}
                                onChange={this.changeTime}
                                format={TIME_FORMAT}
                                use12Hours
                                inputReadOnly
                                focusOnOpen={false}
                            />
                        <div style={{marginLeft: 26, display: 'inline-flex'}}>
                            <FlatButton
                                primary
                                label={this.state.selectedRepeatLabel}
                                labelPosition="before"
                                icon={<Arrow color='#ffffff' style={{margin: 0}}/>}
                                className=' modal_popover'
                                labelStyle={BUTTON_LABEL_STYLE}
                                onClick={(event) => {
                                    this.firstPopoverOpen(event)
                                }}/>
                            <Popover
                                open={this.state.openFirst}
                                anchorEl={this.state.anchorElFirst}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={() => {
                                    this.firstPopoverClose()
                                }}
                            >
                                <Menu
                                    onChange={(e, type) => {
                                        this.firstPopoverClose()
                                        this.selectType(type)
                                    }}
                                >
                                    {this.renderRepeatItems()}
                                </Menu>
                            </Popover>
                        </div>
                        <div style={{marginLeft: 26, display: 'inline-flex'}}>
                            <FlatButton
                                primary
                                label={this.state.selectedSegmentUser}
                                labelPosition="before"
                                icon={<Arrow color='#ffffff' style={{margin: 0}}/>}
                                className=' modal_popover'
                                labelStyle={BUTTON_LABEL_STYLE}
                                onClick={(event) => {
                                    this.secondPopoverOpen(event)
                                }}/>
                            <Popover
                                open={this.state.openSecond}
                                anchorEl={this.state.anchorElSecond}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={() => {
                                    this.secondPopoverClose()
                                }}
                            >
                                <Menu
                                    onChange={(e, type) => {
                                        this.secondPopoverClose()
                                        this.selectUser(type)
                                    }}
                                >
                                    {this.state.segments.map((item) => (
                                        <MenuItem primaryText={item.name}
                                            value={item.name}
                                            key={item.name}/>
                                    ))}
                                </Menu>
                            </Popover>
                        </div>
                        <div style={{marginLeft: 10, display: userUnselectDisplay}}>
                            <div className=''>
                                <FlatButton
                                    primary
                                    icon={<Close color='#ffffff' style={{margin: 0, height:'20px', width:'20px'}}/>}
                                    style={{minWidth: '24px'}}
                                    onClick={()=>this.unselectUser()}/>
                            </div>
                        </div>
                        </div>
                        {this.renderWarningMessage()}
                        {/*<label>{WARNING_MESSAGE}</label>*/}

                        <div style={{paddingTop: '15px', paddingBottom: '10px'}}>
                            <RadioButtonGroup name="shipSpeed"
                                              onChange={this.changeShareType}
                                              style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
                                              defaultSelected={FACEBOOK_POST}>
                                <RadioButton
                                    labelStyle={{color: 'white', fontSize: '12px', lineHeight: '1.1'}}
                                    iconStyle={{marginRight: 8}}
                                    style={{flex: 0, marginRight: '20px', width:'auto'}}
                                    value={FACEBOOK_POST}
                                    label={FACEBOOK_POST}



                                />
                                <RadioButton
                                    labelStyle={{color: 'white', fontSize: '12px', lineHeight: '1.1'}}
                                    iconStyle={{marginRight: 8}}
                                    style={{flex: 0, width:'auto'}}
                                    value={FACEBOOK_MESSAGE}
                                    label={FACEBOOK_MESSAGE}
                                />
                            </RadioButtonGroup>
                        </div>
                        {/*<TextField
              value={this.state.selectedText}
              onChange={(e,text)=>this.setSelectedText(text)}
              hintText="Custom text..."
              inputStyle={{color:'white'}}
            />*/}
                        <span className='rc-time-picker xxx' style={{display:'flex', flexWrap:'wrap'}}>
            <input className='rc-time-picker-input margin_bottom ' placeholder={this.state.placeholderText}
                   value={this.state.selectedText}
                   onChange={(e)=>this.setSelectedText(e.target.value)}/>
                            {this.state.suggestiveButtons.map((item, i)=><FlatButton
                                ket={i}
                                onClick={()=>this.setSelectedText(item)}
                                className='text_chip'
                                label={item}/>)}
            </span>
                    </div>
                    {/*<div style={{display: 'flex', lineHeight: 2, flexWrap: 'wrap'}}>
            {this.renderShareTypePopover()}
            <div className='buttons_wrapper'>
              <FlatButton className='modal_popover image_set_button_margin' label={IMAGE_SET}
                          onClick={() => this.openProdSelector()}
                          labelStyle={BUTTON_LABEL_STYLE}/>
              <div style={{marginLeft: 16}}>
                <FlatButton
                  primary
                  label={this.state.selectedRepeatLabel}
                  labelPosition="before"
                  icon={<Arrow color='#ffffff' style={{margin: 0}}/>}
                  className=' modal_popover'
                  labelStyle={BUTTON_LABEL_STYLE}
                  onClick={(event) => {
                    this.firstPopoverOpen(event)
                  }}/>
                <Popover
                  open={this.state.openFirst}
                  anchorEl={this.state.anchorElFirst}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={() => {
                    this.firstPopoverClose()
                  }}
                >
                  <Menu
                    onChange={(e, type) => {
                      this.firstPopoverClose()
                      this.selectType(type)
                    }}
                  >
                    {this.renderRepeatItems()}
                  </Menu>
                </Popover>
              </div>
            </div>
                </div>*/}
                <h1> Here is need to put the lin editor</h1>
                </div>
                {this.renderSelectedImages()}
                <div>
                    <div style={{display: 'flex', lineHeight: 2, flexWrap: 'wrap'}}>
                        {/*{this.renderShareTypePopover()}*/}
                        <div className='buttons_wrapper'>
                            <FlatButton className='modal_popover image_set_button_margin' label={IMAGE_SET}
                                        onClick={() => this.openProdSelector()}
                                        labelStyle={BUTTON_LABEL_STYLE}/>

                        </div>
                    </div>
                    <div className=' modal_submit_button'>

                        <FlatButton
                            primary
                            label={SAVE}
                            className=' bottom_button'
                            labelStyle={BUTTON_LABEL_STYLE}
                            onClick={this.saveEvent}/>

                        {removeButton}
                    </div>
                </div>
            </div>
        </div>
    }

    changeShareType = (e, value) => {

        var firstType = (value==FACEBOOK_MESSAGE) ?
            'Get it while its hot! 🔥😋' : 'Get it while its hot! 🔥😋'

            var selectedText = "check this out";

        selectedText = (value==FACEBOOK_MESSAGE) ?
                'Hey, ' + selectedText: selectedText;

        this.setState({
            suggestiveButtons:  [firstType, 'NEW ARRIVAL! nom nom 😋', 'We know, its hard to resist 😬'],
            shareType: value,
            channel: value,
            selectedText:selectedText
        })
    }

    setShareType (value) {
        this.setState({
            shareType: value,
            channel: value
        })
    }

    renderWarningMessage () {
        if (this.state.selectedTime < moment().valueOf()) {
            return <label style={{margin: '0.5em', fontSize: '12px', color: '#ff9283'}}>{WARNING_MESSAGE}</label>
        }
        return ''
    }

    selectDate (value) {
      // console.log('SELECT DATE VALUE: ', value);
        const {selectedDates, selectedDatesDays} = this.state
        const date = moment(moment(value).format(DATE_FORMAT)).valueOf();
        let index = selectedDatesDays.indexOf(date)
        if (index >= 0) {
            this.setDefaultValue(selectedDates[index])
        }

        this.setState({
            selectedDate: date,
            selectedTime: value.valueOf(),
            modalOpened: true,
            channel: FACEBOOK_POST
        })
    }

    changeTime = (value) => {
        this.setState({
            selectedTime: value.valueOf(),
        })
    }

    openModal () {
        this.setState({
            modalOpened: true,
        })
    }

    selectType (type) {
        this.setState({
            selectedRepeatLabel: type,
            selectedRepeatValue: type,
        })
    }

    selectUser (type) {
        this.setState({
            selectedSegmentUser: type,
            selectedSegmentValue: type,
        })
    }

    unselectUser () {
        this.setState({
            selectedSegmentUser: 'Users:',
            selectedSegmentValue: '',
        })
    }

    selectShareType (type) {
        this.setState({
            shareType: type,
        })
    }

    render () {

        const content = !this.state.selectedDates
            ? <Spinner/>
            : <div className="schedule_inner">
                {this.state.modalOpened ? this.renderModal() : ''}

                <Paper className="paper_wrapper">
                    <ScheduleQueueBanner
                      allEvents={this.state.selectedDates}
                      PRIMARY_COLOR={PRIMARY_COLOR}
                      nextEvent={this.state.upcoming}
                      openSelectDateModal={this.selectDate}
                    />
                </Paper>

                <Paper className="paper_wrapper" style={{flex: 1}}>
                    <Calendar
                        showDateInput={false}
                        onSelect={(date) => this.selectDate(date)}
                        dateRender={(current, value) => this.renderCalendarTile(current, value)}/>
                </Paper>
            </div>
        return (content)
    }

    addSelectedDate (value) {
        this.setState({
            selectedDate: value,
        })
    }

    firstPopoverOpen (event) {
        this.setState({
            openFirst: true,
            anchorElFirst: event.currentTarget,
        })
        event.preventDefault()
        event.stopPropagation()
    }

    firstPopoverClose () {
        this.setState({
            openFirst: false,
        })
    }

    secondPopoverOpen (event) {
        this.setState({
            openSecond: true,
            anchorElSecond: event.currentTarget,
        })
        event.preventDefault()
        event.stopPropagation()
    }

    secondPopoverClose () {
        this.setState({
            openSecond: false,
        })
    }

    sharePopoverOpen (event) {
        this.setState({
            openShare: true,
            anchorElShare: event.currentTarget,
        })
        event.preventDefault()
        event.stopPropagation()
    }

    sharePopoverClose () {
        this.setState({
            openShare: false,
        })
    }

    openProdSelector () {
        this.setState({
            prodSelectorOpened: true,
        })
    }

    closeProdSelector () {
        this.setState({
            prodSelectorOpened: false,
        })
    }

    addNewEvent () {
        const {selectedDate,selectedTime, shareType, selectedRepeatValue, selectedText } = this.state;
        let newEvent = {
            date: selectedDate,
            time: selectedTime,
            shareType: shareType,
            repeat: selectedRepeatValue,
            text: selectedText,
            products: this.props.cookies.get(PRODUCTS_IN_COOKIE),
        }

        this.setState((prev) => {
            const newArray = prev.selectedDates
            const newArrayDates = prev.selectedDatesDays
            const {selectedDate, selectedDatesDays} = prev;
            const date = selectedDate;
            let index = selectedDatesDays.indexOf(date)
            if (index >= 0) {
                newArray[index] = newEvent
                return {
                    selectedDates: newArray
                }
            }

            newArray.push(newEvent)

            newArrayDates.push(this.state.selectedDate)
            return {
                selectedDates: newArray,
                selectedDatesDays: newArrayDates
            }
        }, ()=>this.setUpcoming())
    }

    closeModal = () => {
        const {cookies} = this.props
        this.setState({modalOpened: false})

        cookies.remove(PRODUCTS_IN_COOKIE)
        cookies.remove(IDS_IN_COOKIE)
    }


    saveEvent  = () => {
        const {selectedDate, selectedTime, selectedRepeatValue, selectedText, channel, selectedSegmentValue } = this.state;
        const segment = this.state.segments.filter((item) => item.name === selectedSegmentValue);
        let newEvent = {
            date: selectedDate,
            time: selectedTime,
            channel: channel || FACEBOOK_POST,
            repeat: selectedRepeatValue,
            text: selectedText,
            products: this.props.cookies.get(PRODUCTS_IN_COOKIE),
            segment: segment.length > 0 ? segment[0] : ""
        }

        fetch('/scheduler/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "same-origin",
            body: JSON.stringify(newEvent)} )
        .then(()=>{
            this.loadEventData();
        });
            // setTimeout(()=>{
            //     document.location.reload()
            // }, 500)


        // })
        // .then(res => res.json())
        //   .then((eventData) => {
        //     this.loadEventData();
        // });



        const {cookies} = this.props;
        this.setState({modalOpened: false})

        if(cookies.get(PRODUCTS_IN_COOKIE) && cookies.get(PRODUCTS_IN_COOKIE).length)
            this.addNewEvent();

        cookies.remove(PRODUCTS_IN_COOKIE)
        cookies.remove(IDS_IN_COOKIE)



    }

    removeDate () {
        fetch('/scheduler/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            credentials: "same-origin",
            body: JSON.stringify({date: this.state.selectedDate})
        })

        const {cookies} = this.props
        this.setState((prev) => {

            const newArray = prev.selectedDates.filter((item) => item.date !== this.state.selectedDate)
            const newArrayDates = prev.selectedDatesDays.filter((item) => item !== this.state.selectedDate)

            return {
                modalOpened: false,
                selectedDates: newArray,
                selectedDatesDays: newArrayDates
            }
        },()=>this.setUpcoming())

        cookies.remove(PRODUCTS_IN_COOKIE)
        cookies.remove(IDS_IN_COOKIE)
    }
}

export default withCookies(inject('categoryListStore', 'itemListStore', 'itemStore')(observer(ScheduleScreen)));
