import ThemeProvider from "./ThemeProvider";
import serialize from "dom-serialize";
import HE from "he";
import tc from "tinycolor2";
import {
  OUTPUT_POST_VIEWBOX_WIDTH,
  OUTPUT_SMALL_POST_VIEWBOX_WIDTH,
  OUTPUT_POST_VIEWBOX_HEIGHT,
  OUTPUT_SMALL_POST_VIEWBOX_HEIGHT,
  OUTPUT_POST_WIDTH,
  OUTPUT_SMALL_POST_WIDTH,
  OUTPUT_POST_HEIGHT,
  OUTPUT_SMALL_POST_HEIGHT,
  OUTPUT_POST_FONTSIZE_COEF,
  OUTPUT_SMALL_POST_FONTSIZE_COEF
} from "../Components/limn/constants";

export default class HelperService {
  static GFontToDataURI(url) {
    return fetch(url)
      .then(resp => resp.text())
      .then(text => {
        let s = document.createElement("style");
        s.innerHTML = text;
        document.head.appendChild(s);
        let styleSheet = Array.prototype.filter.call(
          document.styleSheets,
          sS => sS.ownerNode === s
        )[0];
        let FontRule = rule => {
          let src = rule.style.getPropertyValue("src");
          let url = src
            .split("url(")[1]
            .split(")")[0]
            .replace(/("|')/g, "");
          return {
            rule: rule,
            src: src,
            url: url
          };
        };
        let fontRules = [],
          fontProms = [];

        for (let r of styleSheet.cssRules) {
          let fR = FontRule(r);
          fontRules.push(fR);
          fontProms.push(
            fetch(fR.url)
              .then(resp => resp.blob())
              .then(blob => {
                return new Promise(resolve => {
                  let f = new FileReader();
                  f.onload = e => resolve(f.result);
                  f.readAsDataURL(blob);
                });
              })
              .then(dataURL => {
                return fR.rule.cssText.replace(fR.url, dataURL);
              })
          );
        }

        document.head.removeChild(s);
        return Promise.all(fontProms);
      });
  }

  static renderSVG(options, templateSize = "default", isPreview) {
    let specOptions = {};
    let templateID = `t${Math.random()
      .toString(36)
      .substring(7) +
      Math.random()
        .toString(36)
        .substring(7)}`;

    if (templateSize === "default") {
      specOptions.fontSize = options.fontSize * OUTPUT_POST_FONTSIZE_COEF;
      specOptions.post_width_vb = OUTPUT_POST_VIEWBOX_WIDTH;
      specOptions.post_height_vb = OUTPUT_POST_VIEWBOX_HEIGHT;
      specOptions.post_width = OUTPUT_POST_WIDTH;
      specOptions.post_height = OUTPUT_POST_HEIGHT;
      specOptions.func = "markup";
    } else {
      specOptions.fontSize = options.fontSize * OUTPUT_SMALL_POST_FONTSIZE_COEF;
      specOptions.post_width_vb = OUTPUT_SMALL_POST_VIEWBOX_WIDTH;
      specOptions.post_height_vb = OUTPUT_SMALL_POST_VIEWBOX_HEIGHT;
      specOptions.post_width = OUTPUT_SMALL_POST_WIDTH;
      specOptions.post_height = OUTPUT_SMALL_POST_HEIGHT;
      specOptions.func = "smallMarkup";
    }

    let currentTheme = ThemeProvider.getThemes()[options.selectedTheme];
    let themeLayout = currentTheme[specOptions.func](
      options.colors,
      options.customImage
    );
    return Promise.resolve()
      .then(() => {
        let fontUploaderPromise;
        if (isPreview) {
          fontUploaderPromise = Promise.resolve([]);
        } else {
          fontUploaderPromise = HelperService.GFontToDataURI(
            ThemeProvider.getFontsURL()
          );
        }
        return fontUploaderPromise.then(dataURIFonts => {
          dataURIFonts = dataURIFonts
            .filter(fRule => {
              let fName = currentTheme.fontFamily
                .replace(/('|")/g, "")
                .split(",")[0]
                .trim();
              return new RegExp(fName).test(fRule);
            })
            .map(fRule => {
              return fRule
                .replace(/\s+U\+[a-zA-Z0-9-]+/g, rChunk => rChunk.toUpperCase())
                .replace(
                  // eslint-disable-next-line no-useless-escape
                  /\([^\)]+\)/g,
                  rChunk =>
                    `("${rChunk
                      .substring(1, rChunk.length - 1)
                      .replace(/("|')/g, "")}")`
                );
            });
          let parser = new DOMParser();
          let themeParsed = parser.parseFromString(
            themeLayout,
            "image/svg+xml"
          );
          themeParsed.documentElement.setAttribute("id", templateID);
          let svgStyle = document.createElement("style");
          svgStyle.innerHTML = dataURIFonts.join("\n");

          svgStyle.innerHTML += `
                            #${templateID} .animatedBG{
                                ${currentTheme.colorProp}: ${
            isPreview ? options.currentFrameData.color : "/*bg-color*/"
          };
                            }
                            
                            #${templateID} .animatedContrastBG{
                                fill: ${
                                  isPreview
                                    ? HelperService.getContrastColor(
                                        options.currentFrameData.color
                                      )
                                    : "/*bg-contrast-color*/"
                                };
                            }
                            
                            #${templateID} .post-preview-text *{
                                color: ${
                                  isPreview
                                    ? HelperService.getContrastColor(
                                        options.currentFrameData.color
                                      )
                                    : "/*text-color*/"
                                };
                            }
                        `;

          let defs = themeParsed.querySelector("defs");
          if (!defs) {
            defs = document.createElement("defs");
            themeParsed.documentElement.appendChild(defs);
          }
          defs.appendChild(svgStyle);
          return themeParsed;
        });
      })
      .then(themeParsed => {
        themeParsed.documentElement.setAttribute(
          "width",
          `${specOptions.post_width}px`
        );
        themeParsed.documentElement.setAttribute(
          "height",
          `${specOptions.post_height}px`
        );
        let textArea = document.querySelector(".text-area"),
          areaWrapper = document.createElement("div"),
          clonedArea = textArea.cloneNode(true),
          textFontSize =
            specOptions.fontSize *
            (currentTheme.textCoef ? currentTheme.textCoef : 1),
          predefinedAreaStyles = `
                        padding: 20% 10%;
                        width: 100%; 
                        height: 100%;
                        box-sizing: border-box;
                        overflow: visible;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `,
          predefinedInputStyles = `
                        width: 100%; 
                        height: auto; 
                        word-wrap: normal;
                        word-break: keep-all;
                        line-height: 1.1em;
                        line-break: normal;
                        font-size: ${textFontSize}px !important; 
                        line-height: ${textFontSize * 1.1}px; 
                        font-family: ${currentTheme.fontFamily} !important; 
                        text-align: ${options.alignText};
                        font-weight: 400;
                    `,
          areaWrapperStypes = `
                        width: 100%; 
                        height: 100%;
                    `;

        areaWrapper.classList.add("post-preview-text");

        clonedArea.style.cssText = predefinedAreaStyles;
        clonedArea.classList.remove("text-area");
        if (clonedArea.firstChild) {
          clonedArea.firstChild.style.cssText = predefinedInputStyles;
          clonedArea.firstChild.classList.remove("input");
          clonedArea.firstChild.removeAttribute("contenteditable");
          Array.prototype.forEach.call(
            clonedArea.firstChild.querySelectorAll("*") || [],
            innerEl => {
              if (innerEl.tagName !== "BR") {
                innerEl.removeAttribute("style");
              }
            }
          );
        }

        let FO = document.createElement("foreignObject");
        FO.setAttribute("x", 0);
        FO.setAttribute("y", 0);
        FO.setAttribute(
          "height",
          `${specOptions.post_height_vb * (currentTheme.textCoef || 1)}px`
        );
        FO.setAttribute(
          "width",
          `${specOptions.post_width_vb * (currentTheme.textCoef || 1)}px`
        );

        areaWrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        areaWrapper.style.cssText = areaWrapperStypes;

        areaWrapper.appendChild(clonedArea);
        FO.appendChild(areaWrapper);
        themeParsed.documentElement.appendChild(FO);
        return serialize(themeParsed).replace(/&[^(\s|;)]*;/g, e =>
          HE.encode(HE.decode(e))
        );
      })
      .then(e => {
        e = e
          .replace(/foreignobject/g, "foreignObject")
          .replace(/lineargradient/g, "linearGradient")
          .replace(/<\s*(b|B)(r|R)\s*\/?\s*>/g, "<br/>");

        if (isPreview) {
          e = e
            .replace(/id\s*=\s*('|")([^('|")]+)('|")/gi, function(chunk) {
              chunk = chunk.split("=")[1].replace(/("|")/g, "") + "_preview";
              return `id="${chunk}"`;
            })
            .replace(/#[a-zA-Z][\w:.-]{7,}/gi, function(chunk) {
              chunk = chunk.slice(1);
              return `#${chunk}_preview`;
            });
        }
        return e;
      });
  }

  static renderMainPostSVG(options) {
    let templateID = "main-post";
    let currentTheme = ThemeProvider.getThemes()[options.selectedTheme];
    let themeLayout = currentTheme.markup(options.colors, options.customImage);
    let parser = new DOMParser();
    let themeParsed = parser.parseFromString(themeLayout, "image/svg+xml");
    themeParsed.documentElement.setAttribute("id", templateID);
    let svgStyle = document.createElement("style");
    svgStyle.innerHTML = `
            #${templateID} .animatedBG{
                ${currentTheme.colorProp}: ${options.currentFrameData.color};
            }
            
            
            #${templateID} .animatedContrastBG{
                fill: ${HelperService.getContrastColor(
                  options.currentFrameData.color
                )};
            }
            
            .text-area textarea.input{
                color: ${HelperService.getContrastColor(
                  options.currentFrameData.color
                )};
            }
        `;
    let defs = themeParsed.querySelector("defs");
    if (!defs) {
      defs = document.createElement("defs");
      themeParsed.documentElement.appendChild(defs);
    }
    defs.appendChild(svgStyle);
    return serialize(themeParsed);
  }

  static getContrastColor(bgColor) {
    let rgbColors = tc(bgColor).toRgb();
    return (rgbColors.r + rgbColors.g + rgbColors.b) / 3 > 128
      ? "#000"
      : "#fff";
  }

  static getAnimatedColorsList() {
    let colors = [
      "#ffffff",
      "#000000",
      "#349dff",
      "#74cb4f",
      "#ffda5e",
      "#ff922f",
      "#ff4456",
      "#e1006a",
      "#ac00c8",
      "#ff0008",
      "#ff8897",
      "#ffe2e8",
      "#ffedc4",
      "#ffd18b",
      "#e49445",
      "#a26234",
      "#3e151b",
      "#114321",
      "#1d191e",
      "#302c30",
      "#545055",
      "#777377",
      "#a39fa4",
      "#c0bcc1",
      "#d9d4d9",
      "#f0ecf1",
      "#fefefe"
    ];
    return colors;
  }

  static getWindowParams() {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;
    return { w: x, h: y };
  }
}
