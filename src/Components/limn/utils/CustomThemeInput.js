/* eslint-disable import/no-named-as-default */
import React from 'react';
import loadImage from 'blueimp-load-image';

class CustomThemeInput extends React.Component {
    constructor(props){
        super(props);
        this.onImageFileChange = this.onImageFileChange.bind(this);
    }

    onImageFileChange(e, file) {
        file = file || e.target.files[0];
        let pattern = /image-*/,
            imgReader = new FileReader();

        if (!file.type.match(pattern)) {
            return;
        }

        imgReader.onload = (e) => {
            loadImage(
                imgReader.result,
                (canvas) => {
                    this.props.onChange(canvas.toDataURL('image/jpeg', 0.5));
                },
                {
                    maxWidth: 600,
                    maxHeight: 600,
                    canvas: true,
                    orientation: true
                }
            );
        };

        imgReader.readAsDataURL(file);
    }

    render() {
        return (
        <div className="single-theme-wrapper custom">
            <div  className={`single-theme custom ${this.props.className}`} >
                <i className="fas fa-upload" />
                <input type="file" accept="image/*" onChange={this.onImageFileChange} />
            </div>
        </div>
        );
    }
}

export default CustomThemeInput;
