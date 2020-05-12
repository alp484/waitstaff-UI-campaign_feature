/* eslint-disable import/no-named-as-default */
import React from 'react';
import HelperService from '../../../utils/HelperService';
import ThemeProvider from '../../../utils/ThemeProvider';
//import Base64 from '../../../utils/Base64Encoder';
import axios from 'axios';
import FileSaver from 'file-saver';

import { OUTPUT_POST_WIDTH, OUTPUT_SMALL_POST_WIDTH, OUTPUT_POST_HEIGHT, OUTPUT_SMALL_POST_HEIGHT, API_URL } from '../constants';

let defaultTheme = ThemeProvider.getThemes()[Object.keys(ThemeProvider.getThemes())[0]];
let initialAnimatedColorsList = HelperService.getAnimatedColorsList();

class DownloadComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            selectedTheme: defaultTheme.name,
            text: 'Sample post',
            textColor: '#fff',
            colors: defaultTheme.colors,
            animatedColors: [initialAnimatedColorsList[0]],
            fontSize: 100,
            title: 'Sample post',
            alignText: 'center',
            customImage: ''
        };
        this.downloadPost = this.downloadPost.bind(this);
        this.props.size = 'small'
    }

    componentDidMount(){
        let stateParams = {};
        if (this.props.size == 'small'){
            stateParams.w = OUTPUT_SMALL_POST_WIDTH;
            stateParams.h = OUTPUT_SMALL_POST_HEIGHT;
        } else {
            stateParams.w = OUTPUT_POST_WIDTH;
            stateParams.h = OUTPUT_POST_HEIGHT;
        }
        this.setState({
            params: stateParams
        });
    }

    downloadPost(){
        this.setState({
            isLoading: true
        }, () => {
            HelperService.renderSVG(this.state, this.props.size)
                .then(svgSting => {
                    return axios({
                        method: 'POST',
                        url: `${API_URL}/convert`,
                        data: {
                            svg: svgSting,
                            colors: this.state.animatedColors,
                            sizes: this.state.params,
                            colorProp: ThemeProvider.getThemes()[this.state.selectedTheme]['colorProp']
                        },
                        responseType: 'blob'
                    });
                })
                .then(res => {
                    let contentType = res.headers['content-type'];
                    let fileExtension = contentType.split('/')[1];
                    let blob = new Blob([res.data], { type: contentType});
                    FileSaver.saveAs(blob, `${this.props.title || 'post'}.${fileExtension}`);
                })
                .catch(() => {})
                .then(() => {
                    this.setState({
                        isLoading: false
                    });
                });
        });

    }

    render() {
        return (
            <button className={`button download ${this.props.className || ''} ${this.state.isLoading ? 'loading' : ''}`} onClick={this.downloadPost} disabled={!this.state.text.replace(/\s+/g, '').length}>
                <span><i className="fas fa-spinner fa-spin" /> {this.props.children}</span>
            </button>
        );
    }
}

export default DownloadComponent;
