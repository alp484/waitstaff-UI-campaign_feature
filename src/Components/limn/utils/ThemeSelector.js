/* eslint-disable import/no-named-as-default */
import React from 'react';
import ThemeProvider from '../../../utils/ThemeProvider';
import CustomThemeInput from '../utils/CustomThemeInput';

class ThemeSelector extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            themes: ThemeProvider.getThemes()
        };
    }


    render() {
        return (
            <div className={`${this.props.className || ''}`}>
                <CustomThemeInput onChange={img => this.props.updateTheme('Custom', img)} className={`${this.props.selectedTheme === 'Custom' ? 'active' : ''}`}/>
                {
                    Object.keys(this.state.themes).filter(e => !this.state.themes[e].invisible).map(key => (
                        <div onClick={() => this.props.updateTheme(key)} className="single-theme-wrapper" key={key}>
                            <div  className={`single-theme ${this.props.selectedTheme === key ? 'active' : ''}`}>
                                <img src={this.state.themes[key].image} alt={this.state.themes[key].name}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         selectedTheme: state.post.theme
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         updateTheme
//     }, dispatch);
// };

export default ThemeSelector;
