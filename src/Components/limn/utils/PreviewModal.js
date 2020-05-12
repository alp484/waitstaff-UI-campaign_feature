/* eslint-disable import/no-named-as-default */
import React from "react";
import HelperService from "../../../utils/HelperService";
import Loader from "react-loaders";
import _ from "lodash";

class PreviewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultPreview: null,
      smallPreview: null
    };

    this.refreshImages = this.refreshImages.bind(this);
  }

  componentWillMount() {
    this.refreshImages();
  }

  componentDidUpdate(pProps) {
    if (!_.isEqual(this.props.currentFrameData, pProps.currentFrameData)) {
      this.refreshImages();
    }
  }

  refreshImages() {
    Promise.all([
      HelperService.renderSVG(this.props, "default", true),
      HelperService.renderSVG(this.props, "small", true)
    ]).then(images => {
      this.setState({
        defaultPreview: images[0],
        smallPreview: images[1]
      });
    });
  }

  render() {
    return (
      <div>
        {!(this.state.defaultPreview && this.state.smallPreview) ? (
          <Loader type="line-scale" active />
        ) : (
          <div onClick={e => e.stopPropagation()} className="modal-content">
            <div className="content-wrapper">
              <div className="content">
                <div className="post instagram">
                  <div className="preview">
                    <div
                      className="img"
                      dangerouslySetInnerHTML={{
                        __html: this.state.smallPreview || ""
                      }}
                    />
                    <div
                      className="btn-delete-image"
                      onClick={this.props.onDelete}
                    >
                      X
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//     return {
//         selectedTheme: state.post.theme,
//         text: state.post.text,
//         textColor: state.post.textColor,
//         colors: state.post.colors,
//         fontSize: state.post.fontSize,
//         title: state.post.title,
//         alignText: state.post.alignText,
//         animatedColors: state.post.animatedColors,
//         currentFrameData: state.post.currentFrameData,
//         customImage: state.post.customImage
//     };
// };

export default PreviewModal;
