import React, {Component} from 'react';
import './Styles/RootStyles.css';
import {observer, inject} from 'mobx-react'

export default inject('navigationStore')(observer(
    class  extends Component {
        render() {
            const { activeScreen} = this.props.navigationStore;
            return (
                <div className="prod_container">
{/*                    <div className="header__wrapper">
                    <AppBar
                        className="header" style={{backgroundColor: '#69e2c7'}}
                        onLeftIconButtonClick={openMenu}
                    >
                        <div className="header__inner">
                            <Avatar src={"/assets/avatar.png"}/>
                        </div>
                        <div style={{flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
                            <FlatButton icon={ <ActionHome color="white"/>} />
                        </div>
                    </AppBar>
                    </div>*/}

{/*                    <Drawer open={isOpenMenu} docked={false} containerStyle={{paddingTop:'3em'}}>
                        <MenuItem onClick={() => {
                            this.props.navigationStore.changeScreen('category')
                        }}>Categories</MenuItem>
                        <MenuItem onClick={() => {
                            this.props.navigationStore.changeScreen('item')
                        }}>Products</MenuItem>

                    </Drawer>*/}
                    {activeScreen}
                </div>
            )
        }
    }))