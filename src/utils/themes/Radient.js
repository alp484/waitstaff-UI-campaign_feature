const config = {
    name: 'Radient',
    fontFamily: "'Hind Siliguri', sans-serif",
    image: require('../../assets/images/themes/Radient.png'),
    colors: ['#3F5EFB', '#FC466B'],
    colorProp: 'stop-color',
    smallMarkup: (colors) => ` 
    <svg width="600" height="315" viewBox="0 0 600 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="facebook-Canvas" transform="translate(423 -12988)">
          <clipPath id="facebook-clip-0" clip-rule="evenodd">
             <path d="M -423 12988L 777 12988L 777 13618L -423 13618L -423 12988Z" fill="#FFFFFF"></path>
          </clipPath>
          <g id="facebook-gradient-facebook" clip-path="url(#facebook-clip-0)">
             <g id="facebook-Rectangle">
                <use xlink:href="#facebook-path0_fill" transform="translate(-423 12988)" fill="url(#facebook-paint0_linear)"></use>
             </g>
          </g>
       </g>
       <defs>
          <linearGradient id="facebook-paint0_linear" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(7.34788e-14 630 -1200 3.85764e-14 1200 -3.85764e-14)">
             <stop offset="0" class="color-0 animatedBG" stop-color="${colors[0]}"></stop>
             <stop offset="1" class="color-1" stop-color="${colors[1]}"></stop>
          </linearGradient>
          <path id="facebook-path0_fill" d="M 0 0L 1200 0L 1200 630L 0 630L 0 0Z"></path>
       </defs>
    </svg>
    `,
    markup: (colors) => `
   <svg width="100%" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
   <g id="instagram-Canvas" transform="translate(1077 -12988)">
      <clipPath id="instagram-clip-0" clip-rule="evenodd">
         <path d="M -1077 12988L -537 12988L -537 13528L -1077 13528L -1077 12988Z" fill="#FFFFFF"></path>
      </clipPath>
      <g id="instagram-gradient-instagram" clip-path="url(#instagram-clip-0)">
         <g id="instagram-Rectangle">
            <use xlink:href="#instagram-path0_fill" transform="translate(-1077 12988)" fill="url(#instagram-paint0_linear)"></use>
         </g>
      </g>
   </g>
   <defs>
      <linearGradient id="instagram-paint0_linear" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(3.30655e-14 540 -540 3.30655e-14 540 -3.30655e-14)">
         <stop offset="0" class="color-0 animatedBG" stop-color="${colors[0]}"></stop>
         <stop offset="1" class="color-1" stop-color="${colors[1]}"></stop>
      </linearGradient>
      <path id="instagram-path0_fill" d="M 0 0L 540 0L 540 540L 0 540L 0 0Z"></path>
   </defs>
</svg>`
};
export default config;