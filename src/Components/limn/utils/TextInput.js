/* eslint-disable import/no-named-as-default */
import React from "react";
import { SHOWN_POST_WIDTH } from "../constants";
import _ from "lodash";
import $ from "jquery";

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      fontSize: props.fontSize,
      alignText: props.alignText,
      windowCoef: 1,
      activeAlignmentControl: false,
      lastSizeUpdatedBy: "input",
      autocomplete: {
        active: false,
        x: 0,
        y: 0,
        options: ["{{first_name}}", "{{last_name}}"],
        sign: "{{"
      }
    };

    this.timer = null;

    this.updateParams = this.updateParams.bind(this);
    this.onInput = this.onInput.bind(this);
    this.checkFontSize = this.checkFontSize.bind(this);
    this.changeTextAlignment = this.changeTextAlignment.bind(this);
    this.showAlignmentControl = this.showAlignmentControl.bind(this);
    this.hideAlignmentControl = this.hideAlignmentControl.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.checkAutocomplete = this.checkAutocomplete.bind(this);
    this.hideAutocomplete = this.hideAutocomplete.bind(this);
    this.recalculateAutocompletePosition = this.recalculateAutocompletePosition.bind(
      this
    );
    this.pasteAutocomplete = this.pasteAutocomplete.bind(this);
  }

  pasteAutocomplete(text) {
    text = text.replace(new RegExp(`^${this.state.autocomplete.sign}`), "");
    let cCursor = this.$input.caret("pos");
    let sel = window.getSelection && window.getSelection(),
      range;
    if (sel) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
      }
    } else if (document.selection && document.selection.createRange) {
      document.selection.createRange().text = text;
    }
    this.$input.focus();
    this.$input.caret("pos", cCursor + text.length);
    this.checkFontSize();
    this.checkAutocomplete();
  }

  recalculateAutocompletePosition() {
    let caretWinPos = this.$input.caret("offset");
    if (caretWinPos) {
      this.setState({
        autocomplete: {
          ...this.state.autocomplete,
          y:
            caretWinPos.height +
            caretWinPos.top -
            document.documentElement.scrollTop,
          x:
            caretWinPos.left > window.innerWidth / 2
              ? caretWinPos.left - this.acPopup.offsetWidth
              : caretWinPos.left
        }
      });
    }
  }

  checkAutocomplete(e, onlyHide) {
    let countOfNewlines = 0;
    let nv = this.state.value.replace(/\n(\r)?/g, e => {
      countOfNewlines++;
      return " ";
    });
    let caretPos = this.$input.caret("pos");
    if (
      caretPos > 1 &&
      nv.substr(
        caretPos - 2 + (countOfNewlines > 0 ? countOfNewlines - 1 : 0),
        2
      ) === this.state.autocomplete.sign
    ) {
      if (!onlyHide) {
        this.setState(
          {
            autocomplete: {
              ...this.state.autocomplete
            }
          },
          () => {
            this.setState(
              {
                autocomplete: {
                  ...this.state.autocomplete,
                  active: true
                }
              },
              this.recalculateAutocompletePosition
            );
          }
        );
      }
    } else if (this.state.autocomplete.active) {
      this.setState({
        autocomplete: {
          ...this.state.autocomplete,
          active: false
        }
      });
    }
  }

  hideAutocomplete() {
    if (this.state.autocomplete.active) {
      this.setState({
        autocomplete: {
          ...this.state.autocomplete,
          active: false
        }
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateParams);
    window.addEventListener("scroll", this.recalculateAutocompletePosition);
    document.addEventListener("click", this.handleClickOutside);
    this.$input = $(this.input);
    this.updateParams();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateParams);
    document.addEventListener("click", this.handleClickOutside);
    window.removeEventListener("scroll", this.recalculateAutocompletePosition);
  }

  componentDidUpdate(pProps, pState) {
    if (!_.isEqual(pState, this.state)) {
      if (!this.checkFontSize()) {
        this.checkAutocomplete();
      }
    }
  }

  handleClickOutside(e) {
    if (!(this.container && this.container.contains(e.target))) {
      this.hideAlignmentControl();
      this.hideAutocomplete();
    }
  }

  updateParams() {
    this.recalculateAutocompletePosition();
    // clearTimeout(this.updateParamsTimer);
    // console.log(
    //   "this.container.scrollWidth / SHOWN_POST_WIDTH",
    //   this.container.scrollWidth,
    //   SHOWN_POST_WIDTH
    // );
    // this.updateParamsTimer = setTimeout(() => {
    //   if (this.container) {
    //     this.setState({
    //       windowCoef: this.container.scrollWidth / SHOWN_POST_WIDTH
    //     });
    //   }
    // }, 200);
  }

  onInput() {
    this.props.updateText(this.input.innerHTML);
    this.setState(
      {
        value: this.input.innerText,
        lastSizeUpdatedBy: "input"
      },
      () => {
        if (!this.checkFontSize()) {
          this.checkAutocomplete();
        }
      }
    );
  }

  checkFontSize() {
    if (
      (this.input.innerText.length &&
        this.inputArea.offsetWidth + 1 < this.input.scrollWidth) ||
      this.inputArea.offsetHeight < this.input.scrollHeight
    ) {
      let newFS = this.state.fontSize * 0.99;
      //   this.props.updateFontsize(newFS);
      this.setState({
        fontSize: newFS,
        lastSizeUpdatedBy: "reducing"
      });
      return true;
    } else {
      if (
        this.state.fontSize < 100 &&
        this.state.lastSizeUpdatedBy !== "reducing" &&
        (this.inputArea.offsetWidth > this.input.scrollWidth ||
          this.inputArea.offsetHeight > this.input.scrollHeight)
      ) {
        let newFS = this.state.fontSize * 1.01;
        // this.props.updateFontsize(newFS);
        this.setState({
          fontSize: newFS
        });
        return true;
      }
    }

    return false;
  }

  changeTextAlignment(value) {
    this.props.updateAlignment(value);
    this.setState({
      alignText: value
    });
  }

  componentWillUpdate(nProps) {
    if (this.props.fontFamily !== nProps.fontFamily) {
      this.setState({
        lastSizeUpdatedBy: "theme"
      });
    }
  }

  showAlignmentControl() {
    clearTimeout(this.timer);
    this.setState({
      activeAlignmentControl: true
    });
  }

  hideAlignmentControl() {
    if (this.input && this.input.innerText.replace(/\s/g, "") === "") {
      this.input.innerHTML = "";
    }

    let newState = {
      activeAlignmentControl: false
    };

    this.setState(newState);
  }

  render() {
    return (
      <div
        ref={e => (this.container = e)}
        className={`${this.props.className || ""}`}
      >
        <div
          ref={e => (this.acPopup = e)}
          className={`autocomplete-popup ${
            this.state.autocomplete.active && this.state.activeAlignmentControl
              ? "active"
              : ""
          }`}
          style={{
            left: this.state.autocomplete.x,
            top: this.state.autocomplete.y
          }}
        >
          <ul>
            {this.state.autocomplete.options.map((opt, i) => (
              <li
                onMouseDown={e => {
                  e.preventDefault();
                  this.pasteAutocomplete(opt);
                }}
                key={i}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`controls ${
            this.state.activeAlignmentControl ? "active" : ""
          }`}
        >
          <span
            className={`${this.state.alignText === "left" ? "active" : ""}`}
            onClick={() => this.changeTextAlignment("left")}
          >
            <i className="fas fa-align-left" />
          </span>
          <span
            className={`${this.state.alignText === "center" ? "active" : ""}`}
            onClick={() => this.changeTextAlignment("center")}
          >
            <i className="fas fa-align-center" />
          </span>
          <span
            className={`${this.state.alignText === "right" ? "active" : ""}`}
            onClick={() => this.changeTextAlignment("right")}
          >
            <i className="fas fa-align-right" />
          </span>
        </div>
        <div className="text-area" ref={e => (this.inputArea = e)}>
          <div
            onKeyPress={this.checkAutocomplete}
            onKeyUp={e => this.checkAutocomplete(null, true)}
            onFocus={this.showAlignmentControl}
            onChange={this.checkFontSize}
            className="input"
            ref={e => (this.input = e)}
            onInput={this.onInput}
            style={{
              fontSize: `${this.state.fontSize * this.state.windowCoef}px`,
              textAlign: this.state.alignText,
              fontFamily: this.props.fontFamily,
              color: this.props.currentFrameData.textColor
            }}
            contentEditable
            placeholder="Add your text here"
          />
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//     return {
//         alignText: state.post.alignText,
//         fontSize: state.post.fontSize,
//         value: state.post.text,
//         textColor: state.post.textColor,
//         fontFamily: state.post.fontFamily,
//         currentFrameData: state.post.currentFrameData
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         updateAlignment,
//         updateFontsize,
//         updateText
//     }, dispatch);
// };

export default TextInput;
