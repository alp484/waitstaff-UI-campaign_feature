/**
 * Created by Yury-PC on 02.03.2018.
 */
import React, { Component } from 'react'
import { instanceOf, PropTypes } from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'
import CakeIcon from 'material-ui/svg-icons/social/cake'
import Checkbox from 'material-ui/Checkbox'
import './Styles/ItemListStyles.css'
import { withCookies, Cookies } from 'react-cookie'

const maxSelectedNumber = 3

class ItemList extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor (props) {
    // const {cookies} = props;
    super(props)
    //cookies.set('items', '')
    //cookies.remove('products')
    this.state = {
      currentSelectedNumber: 0,
      selectedIds: props.defaultIds,
    }
  }

  addProductToCookie(product){
    const {cookies} = this.props;
    const id = product.id;
    let newNum = 0;
    let selectedIds = cookies.get('items');
    let selectedProducts = cookies.get('products');
    if (selectedIds) {
      selectedIds = decodeURI(selectedIds)
      selectedIds += `,${id}`
      cookies.set('items', encodeURI(selectedIds))

      newNum = selectedIds.split(',').length;
    } else {
      cookies.set('items', encodeURI(id))
      newNum = 1;
    }

    product = {
      image: product.image,
      title: product.name,
      id: product.id,
    }
    if(selectedProducts){
      let temp = selectedProducts;
      temp.push(product);
      cookies.set('products', temp);
    } else{
      let temp = [];
      temp.push(product);
      cookies.set('products', temp);
    }

    this.setState((prev)=>{
      prev.selectedIds.push(id);
      return{
        currentSelectedNumber: (prev.currentSelectedNumber+1),
        selectedIds: prev.selectedIds,
      }
    });

    return newNum;
  }
  removeProductFromCookie(product){
    const {cookies} = this.props;
    const id = product.id;
    let newNum = 0;
    let selected = cookies.get('items')
    if (selected) {
      selected = decodeURI(selected).split(',')
      let acc = ''
      selected.forEach(item => {if (item !== id) acc += `${item},`})
      acc = acc.slice(0, acc.length-1);
      cookies.set('items', encodeURI(acc))
      newNum = selected.length - 1;
    }
    this.setState((prev)=>{
      let temp = prev.selectedIds.filter((item)=>item!==id);
      return{
        currentSelectedNumber: (prev.currentSelectedNumber-1),
        selectedIds: temp,
      }
    });

    let selectedProducts = cookies.get('products');
    let temp = selectedProducts.filter((item)=>item.id!==product.id);
    cookies.set('products', temp);

    return newNum;
  }

  handleCheck (value, product, event) {

    event.preventDefault();

    let newNum = 0;
    if (value) {
      newNum = this.addProductToCookie(product);
    } else {
      newNum = this.removeProductFromCookie(product);
    }
    const elem = window.parent.document.getElementById('products-counter'); //document.getElementById('products-counter');
    if(elem){
      let newCount = document.createElement('span');
      newCount.innerHTML =`(${newNum}/${maxSelectedNumber})`;
      elem.children.item(0).replaceWith(newCount);
    }
  }

  render () {
    const {data, cookies} = this.props
    // const {/*currentSelectedNumber*/ /*selectedIds*/} = this.state;
    const selectedIds = cookies.get('items') ? decodeURI(cookies.get('items')).split(',') : [];
    const currentSelectedNumber = selectedIds.length;

    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn className='column_image'>Image</TableHeaderColumn>
            <TableHeaderColumn className='column'>Name</TableHeaderColumn>
            <TableHeaderColumn className={'column_icon'}/>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {data.map((row, index) => {
            const disabled = ((currentSelectedNumber>=maxSelectedNumber) && (selectedIds.indexOf(row.id)<0))
            const defaultChecked = selectedIds.indexOf(row.id)>=0;
            const avatar = row.image
              ? <Avatar src={row.image} style={{borderRadius: 0}}/>
              : <Avatar
                icon={<CakeIcon/>}
                style={{borderRadius: 0}}
              />
            return <TableRow key={index}>
              <TableRowColumn className={'column_image'}>{avatar}</TableRowColumn>
              <TableRowColumn className={'column'}>{row.name}</TableRowColumn>
              <TableRowColumn className={'column_icon'}>
                <Checkbox onCheck={(e, value) => this.handleCheck(value, row, e)}
                          disabled={disabled} checked={defaultChecked} />
              </TableRowColumn>
            </TableRow>
          })}
        </TableBody>
      </Table>
    )
  }
}

ItemList.propTypes = {
  data: PropTypes.array,
  onRowClick: PropTypes.func,
  onItemEdit: PropTypes.func,
  onItemDelete: PropTypes.func,
}
export default withCookies(ItemList)