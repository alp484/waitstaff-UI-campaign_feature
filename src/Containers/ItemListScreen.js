import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { isMobileOnly } from 'react-device-detect'
import FlatButton from 'material-ui/FlatButton'
import './Styles/CategoryListStyles.css'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Spinner from '../Components/Spinner'
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import ItemList from '../Components/ItemList'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import Paper from 'material-ui/Paper'
import Config from '../Config/ApiConfig'
import Search from '../Components/SearchProduct'
import './Styles/ItemListStyles.css'
import Dialog from 'material-ui/Dialog'
import ItemUpdateScreen from './ItemUpdateScreen'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'

class ItemListScreen extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.selectCategoryForUpdating = this.selectCategoryForUpdating.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.fillData = this.fillData.bind(this)

    this.state = {
      showInput: false,
      open: false,
      anchorEl: null,
      search: null,
      openModal: false,
      currentItem: null,
      openDeleteMessage: false
    }
  }

  fillData (refresh) {
    if (!this.props.categoryListStore.categoryList || !this.props.categoryListStore.categoryList.length || refresh) {
      this.props.categoryListStore.loadData().then(() => {
        if (this.props.categoryListStore.allCategories && this.props.categoryListStore.allCategories.length) {
          this.selectCategoryForUpdating(this.props.categoryListStore.allCategories[0])
        }
      })
    } else {
      if (this.props.categoryListStore.allCategories && this.props.categoryListStore.allCategories.length) {
        this.selectCategoryForUpdating(this.props.categoryListStore.allCategories[0])
      }
    }
  }

  handleIconClick (value) {
    this.setState({
      showInput: value
    })

  }

  componentWillMount () {
    const {cookies} = this.props
    if (!this.props.categoryListStore.squareAndLocationId) {
      const locationIdFromCookie = cookies.get('locationId')
      const merchantIdFromCookie = cookies.get('merchantId')
      if (locationIdFromCookie && merchantIdFromCookie) {
        this.props.categoryListStore.setData({squareAndLocationId: `${merchantIdFromCookie}/${locationIdFromCookie}`})
      } else this.props.categoryListStore.setData({squareAndLocationId: `${Config.merchantId}/${Config.locationId}`})
    }
    this.fillData()
  }

  renderProductSelector (allItemsOfSelectedCategoryLenght) {
    const {selectedCategory, allCategories} = this.props.categoryListStore

    if (!isMobileOnly || !this.state.showInput) return <div className="products-selector__group">
      <FlatButton
        primary
        label={selectedCategory.name}
        style={{marginRight: '16px'}}
        labelStyle={{color: '#1d7db9', textTransform: 'none', fontSize: '16px', padding: 0}}
        onClick={(event) => {
          this.openMenu(event.currentTarget)
        }}/>
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={(...e) => {
          this.closeMenu()
        }}
      >
        <Menu
          onChange={(e, category) => {
            this.closeMenu()
            this.selectCategory(category)
          }}
        >
          {allCategories.map((category, index) =>
            <MenuItem
              value={category}
              primaryText={category.name}
              key={index}
            />
          )}
        </Menu>
      </Popover>
      <div>{`${allItemsOfSelectedCategoryLenght} Total`}</div>
    </div>
  }

  render () {
    const {search} = this.state
    const {categoryList, selectedCategory, allCategories, getAllCategories} = this.props.categoryListStore
    let allItemsOfSelectedCategory = []
    let reg = new RegExp(search, 'i')
    getAllCategories(selectedCategory).forEach((c) => {
      if (c.items) {
        c.items.forEach((item) => {
          if (!search) {
            allItemsOfSelectedCategory.push(item)
          }
          else if (item.name.match(reg)) {
            allItemsOfSelectedCategory.push(item)
          }
        })
      }
    })

    const {selectedForUpdatingCategory} = this.state
    // const itemName = currentItem ? currentItem.name : ''

    const content = !categoryList.length
      ? <Spinner/>
      : <div className="products__inner">

        <div className="products-csv__title">Choose a category to upload CSV</div>

        <Paper className="products-csv__wrapper">

          <div className="products-csv__categories">
            <SelectField
              className="products-csv__categories-selector"
              fullWidth={true}
              floatingLabelText=""
              labelStyle={{padding: '0 10px'}}
              underlineStyle={{display: 'none'}}
              value={selectedForUpdatingCategory}
              onChange={(e, index, category) => {
                this.selectCategoryForUpdating(category)
              }}
            >
              {allCategories.map((category, index) =>
                <MenuItem
                  value={category}
                  primaryText={category.name}
                  key={index}
                />
              )}
            </SelectField>
          </div>

        </Paper>

        <div className="products-csv__buttons">
          <Paper className="products-csv-paper__button">
            <FlatButton icon={<FileDownload color={'#4b4947'}/>} label={'CSV Export'}
                        className="products-csv__button"/>
          </Paper>
          <Paper className="products-csv-paper__button">
            <FlatButton icon={<FileCloudDownload color={'#4b4947'}/>} label={'Create'}
                        className="products-csv__button"/>
          </Paper>
        </div>

        <Paper className="products-selector">
          <div className="products-selector__categories">
            <SelectField
              className="products-selector__categories-selector"
              fullWidth={true}
              floatingLabelText=""
              labelStyle={{padding: '0 10px'}}
              underlineStyle={{display: 'none'}}
              value={selectedCategory}
              onChange={(e, index, category) => {
                //this.selectCategoryForUpdating(category)
                this.selectCategory(category)
              }}
            >
              {allCategories.map((category, index) =>
                <MenuItem
                  value={category}
                  primaryText={category.name}
                  key={index}
                />
              )}
            </SelectField>
          </div>


          {/*            <div className="products-selector__group">
              {this.renderProductSelector(allItemsOfSelectedCategory.length)}
              <Search placeholder="Search here"
                      onSearchChange={ this.onSearchChange }/>
            </div>*/}


        </Paper>


        <Paper className="products-search">
          <Search placeholder="Search here"
                  onSearchChange={this.onSearchChange}/>
        </Paper>

        <Paper className="products-list">
          <ItemList
            defaultIds = {this.props.defaultIds}
            data={allItemsOfSelectedCategory}
            onItemDelete={(item) => {
              this.setState({
                openDeleteMessage: true,
                currentItem: item
              })
            }}
            onItemEdit={(item) => {
              this.editItem(item)
            }}
          />
        </Paper>
      </div>
    return (content)
  }
  renderUpdateModal () {
    return (
      <Dialog
        autoDetectWindowHeight={false}
        autoScrollBodyContent={true}
        contentClassName="contentTable"
        bodyClassName="bodyTable"
        modal={true}
        open={this.state.openModal}
      >
        <ItemUpdateScreen
          onClose={() => {
            this.setState({openModal: false})
            return true
          }}
        />
      </Dialog>
    )
  }

  deleteItem (item) {
    this.props.itemStore.delete(item).then((res) => {
      this.fillData(true)
    })
  }

  editItem (item) {
    this.props.itemStore.setData(item)
    this.setState({openModal: true})
    //NavigationStore.changeScreen('itemUpdate', 'item')
  }

  selectCategoryForUpdating (category) {
    this.setState({
      selectedForUpdatingCategory: category
    })
  }

  selectCategory (category) {
    this.props.categoryListStore.selectedCategory = category
  }

  openMenu (anchorEl) {
    this.setState({
      open: true,
      anchorEl
    })
  }

  closeMenu () {
    this.setState({
      open: false
    })
  }

  handleChange (event, index, value) {
    this.props.categoryListStore.selectedCategory = value
  }

  renderList (list) {
    return list.map((item, index) => this.renderRow(item, index))
  }

  renderRow (data, index) {
    return <div key={index}>{data.name}</div>
  }

  onSearchChange = (query) => {
    this.setState({search: query})
  }

}

export default withCookies(inject('categoryListStore', 'itemListStore', 'itemStore')(observer(ItemListScreen)))
