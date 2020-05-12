import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";

import ThemeSelector from "./utils/ThemeSelector";
import ThemeProvider from "../../utils/ThemeProvider";
import ColorSelector from "./utils/ColorSelector";
import TextInput from "./utils/TextInput";
import TitleInput from "./utils/TitleInput";
import HelperService from "../../utils/HelperService";

class LimnEditor extends Component {
  constructor(props) {
    super(props);

    let defaultTheme = ThemeProvider.getThemes()[
      Object.keys(ThemeProvider.getThemes())[0]
    ];
    let initialAnimatedColorsList = HelperService.getAnimatedColorsList();

    this.state = {
      isPreviewModalOpened: false,
      fontSize: 100,
      alignText: "center",
      title: "",
      text: "",
      textColor: "#fff",
      theme: defaultTheme.name,
      colors: defaultTheme.colors,
      animatedColors: [initialAnimatedColorsList[0]],
      currentFrameData: {
        color: initialAnimatedColorsList[0],
        textColor: HelperService.getContrastColor(initialAnimatedColorsList[0])
      },
      fontFamily: defaultTheme.fontFamily,
      customImage: "",
      selectedTheme: "ByTheBell",
      value: ""
    };

    this.getRenderedTemplate = this.getRenderedTemplate.bind(this);
  }

  componentDidMount() {
    this.changeBg = setInterval(this.changeBackground, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.changeBg);
  }

  getRenderedTemplate() {
    return HelperService.renderMainPostSVG(this.state);
  }

  changeBackground = () => {
    if (this.state.animatedColors.length > 1) {
      // const currentColor = this.state.currentFrameData.color;
      const currentColorIndex = this.state.animatedColors.findIndex(
        color => color === this.state.currentFrameData.color
      );

      const nextColor =
        this.state.animatedColors[currentColorIndex + 1] ||
        this.state.animatedColors[0];

      this.setState({
        currentFrameData: {
          color: nextColor,
          textColor: HelperService.getContrastColor(nextColor)
        }
      });
    }

    if (
      this.state.animatedColors.length === 1 &&
      this.state.currentFrameData.color !== this.state.animatedColors[0]
    ) {
      this.setState({
        currentFrameData: {
          color: this.state.animatedColors[0],
          textColor: HelperService.getContrastColor(
            this.state.animatedColors[0]
          )
        }
      });
    }
  };

  openModal = () => {
    this.setState({
      isPreviewModalOpened: true
    });
  };

  closeModal = () => {
    this.setState({
      isPreviewModalOpened: false
    });
  };

  updateAnimatedColors = color => {
    let newColors = [...this.state.animatedColors];
    let colorIndex = newColors.indexOf(color);
    if (colorIndex !== -1) {
      if (newColors.length > 1) {
        newColors.splice(colorIndex, 1);
      }
    } else {
      newColors.push(color);
    }
    this.setState({ animatedColors: newColors });
  };

  updateTheme = theme => {
    this.setState({ selectedTheme: theme });
  };

  updateTitle = title => {
    this.setState({ title });
  };

  updateAlignment = () => {};
  updateFontsize = () => {};
  updateText = text => {
    this.setState({ text });
  };

  handleOk = () => {
    this.props.closeLimnEditor();
    this.props.customAnimationImage(this.state);
  };

  render() {
    return (
      <div className="main-content editor editor-section-container">
        <div className="edited-post">
          <div className={`post-wrapper ${this.state.selectedTheme}-post`}>
            <div
              className="post"
              dangerouslySetInnerHTML={{ __html: this.getRenderedTemplate() }}
            />
            <TextInput
              updateText={this.updateText}
              updateFontsize={this.updateFontsize}
              updateAlignment={this.updateAlignment}
              className="text-input"
              {...this.state}
            />
          </div>
          <TitleInput updateTitle={this.updateTitle} title={this.state.title} />
        </div>
        <div className="tools-wrapper">
          <div className="tools">
            <div className="row">
              <div className="section">
                <div className="title">Themes</div>
                <ThemeSelector
                  updateTheme={this.updateTheme}
                  className="content themes"
                  {...this.state}
                />
              </div>
            </div>
            <div className="row">
              <div className="section">
                <div className="title">Colors</div>
                <ColorSelector
                  updateAnimatedColors={this.updateAnimatedColors}
                  className="content colors"
                  {...this.state}
                />
              </div>
              {/* <div className="section">
                <div className="title">Share</div>
                <div className="content preview">
                  <button
                    disabled={!this.state.text.length}
                    onClick={this.openModal}
                    className="button"
                  >
                    Save / Preview
                  </button>
                </div>
              </div> */}
              <FlatButton
                className="selector_ok_button"
                label={"OK"}
                labelStyle={{ color: "#177eba" }}
                onClick={this.handleOk}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LimnEditor;
