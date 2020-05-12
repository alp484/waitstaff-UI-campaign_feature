/**
 * Created by Yury-PC on 02.03.2018.
 */
import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';


export default class Spinner extends Component {
  render () {
    return (
      <div style = {{height:'95vh', width:'100%', display:'flex',justifyContent:'space-around', alignItems:'center'}}>
      <CircularProgress />
      </div>
    )
  }
}