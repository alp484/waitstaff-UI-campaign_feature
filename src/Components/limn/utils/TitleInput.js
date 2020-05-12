/* eslint-disable import/no-named-as-default */
import React from 'react';

class TitleInput extends React.Component {
    render() {
        return (
            <input type="text" value={this.props.title} onChange={e => this.props.updateTitle(e.target.value)} className="form-input title-input" placeholder="Add text to your post" />
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         value: state.post.title
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         updateTitle
//     }, dispatch);
// };

export default TitleInput;
