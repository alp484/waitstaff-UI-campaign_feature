/* eslint-disable import/no-named-as-default */
import React from "react";
import HelperService from "../../../utils/HelperService";
import Slider from "react-slick";

class ColorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorList: [...HelperService.getAnimatedColorsList()],
      sliderConfig: {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: HelperService.getWindowParams().w <= 767,
        arrows: true,
        nextArrow: (
          <div className="next">
            <i className="fas fa-chevron-right" />
          </div>
        ),
        prevArrow: (
          <div className="prev">
            <i className="fas fa-chevron-left" />
          </div>
        )
      }
    };

    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize() {
    let newConfig = {};
    if (
      HelperService.getWindowParams().w > 767 &&
      this.state.sliderConfig.swipe
    ) {
      newConfig.swipe = false;
    }
    if (
      HelperService.getWindowParams().w <= 767 &&
      !this.state.sliderConfig.swipe
    ) {
      newConfig.swipe = true;
    }
    if (!Object.keys(newConfig).length) return;

    this.setState({
      sliderConfig: {
        ...this.state.sliderConfig,
        ...newConfig
      }
    });
  }

  render() {
    return (
      <div className={`color-input-component ${this.props.className || ""}`}>
        <Slider {...this.state.sliderConfig}>
          {this.state.colorList
            .reduce((res, current, index) => {
              let setNumber = parseInt(index / 9, 10);
              if (!res[setNumber]) {
                res[setNumber] = [];
              }
              res[setNumber].push(current);
              return res;
            }, [])
            .map((singleSet, indx) => {
              return (
                <div key={indx} className="color-list">
                  <div className="colors-wrapper">
                    {singleSet.map((color, i) => {
                      let selectionIndex = this.props.animatedColors.indexOf(
                        color
                      );
                      if (selectionIndex === -1) {
                        return (
                          <div
                            className="single-color"
                            key={i}
                            onClick={() =>
                              this.props.updateAnimatedColors(color)
                            }
                            style={{
                              borderColor: color,
                              backgroundColor: color
                            }}
                          />
                        );
                      } else {
                        return (
                          <div
                            className="single-color active"
                            key={i}
                            onClick={() =>
                              this.props.updateAnimatedColors(color)
                            }
                            style={{ backgroundColor: color }}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    );
  }
}

export default ColorSelector;
