const config = {
    name: 'Parisienne',
    fontFamily: "'Parisienne', cursive",
    image: require('../../assets/images/themes/Parisienne.png'),
    colors: [],
    colorProp: 'stroke',
    contrastColorProp: 'fill',
    smallMarkup: (colors) => `
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox="0 0 600 315">
          <rect x="0" y="0" width="600" height="315" class="animatedContrastBG" fill="#FFFFFF" />
          <pattern id="img1" patternUnits="userSpaceOnUse" width="9" height="20">
            <svg xmlns='http://www.w3.org/2000/svg' width='9' height='20' viewBox='0 0 20 40'>
                <circle cx='10' cy='30' r='7.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <circle cx='10' cy='30' r='2.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <rect x='0' y='0' width='20' height='30' class="animatedContrastBG" fill='#fff'/>
                <circle cx='0' cy='10' r='7.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <circle cx='0' cy='10' r='2.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <circle cx='20' cy='10' r='7.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <circle cx='20' cy='10' r='2.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/> 
                <rect x='0' y='10' width='40' height='10' class="animatedContrastBG" fill='#fff'/>
                <line x1='2.5' y1='10' x2='2.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <line x1='7.5' y1='10' x2='7.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <line x1='12.5' y1='10' x2='12.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                <line x1='17.5' y1='10' x2='17.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
            </svg>  
          </pattern>
          <rect x="0" y="0" width="600" height="315" fill="url(#img1)" /> 
      </svg>
    `,
    markup: (colors) => `
            <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox="0 0 500 500">
              <rect x="0" y="0" width="500" height="500" class="animatedContrastBG" fill="#FFFFFF" />
              <pattern id="img1" patternUnits="userSpaceOnUse" width="9" height="20">
                <svg xmlns='http://www.w3.org/2000/svg' width='9' height='20' viewBox='0 0 20 40'>
                    <circle cx='10' cy='30' r='7.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <circle cx='10' cy='30' r='2.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <rect x='0' y='0' width='20' height='30' class="animatedContrastBG" fill='#fff'/>
                    <circle cx='0' cy='10' r='7.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <circle cx='0' cy='10' r='2.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <circle cx='20' cy='10' r='7.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <circle cx='20' cy='10' r='2.5' fill-opacity='0' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <rect x='0' y='10' width='40' height='10' class="animatedContrastBG" fill='#fff'/>
                    <line x1='2.5' y1='10' x2='2.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <line x1='7.5' y1='10' x2='7.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <line x1='12.5' y1='10' x2='12.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                    <line x1='17.5' y1='10' x2='17.5' y2='30' class="animatedBG" stroke='${colors[0]}' stroke-width='3'/>
                </svg>  
              </pattern>
              <rect x="0" y="0" width="500" height="500" fill="url(#img1)" />
          </svg>
    `
};
export default config;