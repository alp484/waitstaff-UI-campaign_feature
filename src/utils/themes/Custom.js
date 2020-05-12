const config = {
    name: 'Custom',
    fontFamily: "'Rubik', sans-serif",
    image: '',
    colors: [],
    invisible: true,
    colorProp: 'stop-color',
    smallMarkup: (colors, img) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox="0 0 600 315">
        <foreignObject x="0" y="0" width="600" height="315">
          <div style="height: 100%; width: 100%; background-position: center; background-size: cover; background-image: url(${img})"></div>
        </foreignObject>
        <rect x="0" y="0" width="600" height="315" style="fill:url(#lgrad1);"/>
        <rect x="0" y="0" width="600" height="315" style="fill:url(#lgrad2);"/>
        <rect x="0" y="0" width="600" height="315" style="fill:url(#lgrad3);"/>
        <rect x="0" y="0" width="600" height="315" style="fill:url(#lgrad4);"/>
        <rect x="0" y="0" width="600" height="315" style="fill:url(#lgrad5);"/>
        <defs>
            <linearGradient id="lgrad1" x1="50%" y1="100%" x2="50%" y2="0%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad2" x1="0%" y1="50%" x2="100%" y2="50%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad3" x1="50%" y1="0%" x2="50%" y2="100%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad4" x1="100%" y1="50%" x2="0%" y2="50%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad5" x1="100%" y1="50%" x2="0%" y2="50%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0.4" />
            <stop offset="50%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0.4" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0.4" />
            </linearGradient> 
        </defs>
    </svg>
    `,
    markup: (colors, img) => `
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox="0 0 500 500">
        <foreignObject x="0" y="0" width="500" height="500">
         <div style="height: 100%; width: 100%; background-position: center; background-size: cover; background-image: url(${img})"></div>
     </foreignObject>
        <rect x="0" y="0" width="500" height="500" style="fill:url(#lgrad1);"/>
        <rect x="0" y="0" width="500" height="500" style="fill:url(#lgrad2);"/>
        <rect x="0" y="0" width="500" height="500" style="fill:url(#lgrad3);"/>
        <rect x="0" y="0" width="500" height="500" style="fill:url(#lgrad4);"/>
        <rect x="0" y="0" width="500" height="500" style="fill:url(#lgrad5);"/>
        <defs>
            <linearGradient id="lgrad1" x1="50%" y1="100%" x2="50%" y2="0%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad2" x1="0%" y1="50%" x2="100%" y2="50%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad3" x1="50%" y1="0%" x2="50%" y2="100%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad4" x1="100%" y1="50%" x2="0%" y2="50%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="75%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="1" />
            </linearGradient> 
            <linearGradient id="lgrad5" x1="100%" y1="50%" x2="0%" y2="50%" > 
            <stop offset="0%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0.4" />
            <stop offset="50%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0.4" />
            <stop offset="100%" class="animatedBG" stop-color="rgb(0,0,0)" stop-opacity="0.4" />
            </linearGradient> 
        </defs>
    </svg>
    `
};
export default config;