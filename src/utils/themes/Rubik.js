const config = {
    name: 'Rubik',
    fontFamily: "'Rubik', sans-serif",
    image: require('../../assets/images/themes/Rubik.png'),
    colors: ['#2B3238', '#D04048', '#59CCD0', '#E0D546', '#000000'],
    colorProp: 'fill',
    smallMarkup: (colors) => `
    <svg width="600" height="315" viewBox="0 0 600 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <g id="facebook-Canvas" transform="translate(555 -6915)">
          <clipPath id="facebook-clip-0" clip-rule="evenodd">
             <path d="M -555 6915L 45 6915L 45 7230L -555 7230L -555 6915Z" fill="#FFFFFF"></path>
          </clipPath>
          <g id="facebook-rubik-facebook" clip-path="url(#facebook-clip-0)">
             <g id="facebook-color-0">
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path0_fill" transform="translate(-555 6915)" class="animatedBG" fill="${colors[0]}"></use>
                </g>
             </g>
             <g id="facebook-color-1">
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path1_fill" transform="translate(8.46143 7101.08)" fill="${colors[1]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path2_fill" transform="translate(-503.758 7154.23)" fill="${colors[1]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path3_fill" transform="translate(-38 6915)" fill="${colors[1]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path4_fill" transform="translate(-555 7010.05)" fill="${colors[1]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path5_fill" transform="translate(-501.062 6915)" fill="${colors[1]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path6_fill" transform="translate(-453.426 7172.24)" fill="${colors[1]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path7_fill" transform="translate(-509.952 7220.87)" fill="${colors[1]}"></use>
                </g>
             </g>
             <g id="facebook-color-2">
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path8_fill" transform="translate(-3.84406 7101.08)" fill="${colors[2]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path9_fill" transform="translate(-533.559 7154.23)" fill="${colors[2]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path10_fill" transform="translate(-121 6915)" fill="${colors[2]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path11_fill" transform="translate(-544.062 6915)" fill="${colors[2]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path12_fill" transform="translate(8.46143 7121.06)" fill="${colors[2]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path13_fill" transform="translate(-466.117 7172.24)" fill="${colors[2]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path14_fill" transform="translate(-518.615 7220.87)" fill="${colors[2]}"></use>
                </g>
             </g>
             <g id="facebook-color-3">
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path15_fill" transform="translate(-3.84406 7094)" fill="${colors[3]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path16_fill" transform="translate(-533.559 7136.92)" fill="${colors[3]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path17_fill" transform="translate(-544.062 6915)" fill="${colors[3]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path18_fill" transform="translate(8.46143 7100.03)" fill="${colors[3]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path19_fill" transform="translate(-466.117 7164.89)" fill="${colors[3]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path20_fill" transform="translate(-518.615 7215.86)" fill="${colors[3]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path21_fill" transform="translate(-108 7162.98)" fill="${colors[3]}"></use>
                </g>
                <g id="facebook-Vector">
                   <use xlink:href="#facebook-path22_fill" transform="translate(-555 7002)" fill="${colors[3]}"></use>
                </g>
             </g>
             <g id="facebook-Group">
                <g id="facebook-Vector" opacity="0.2">
                   <use xlink:href="#facebook-path23_fill" transform="translate(-503.758 7185.64)"></use>
                </g>
                <g id="facebook-Vector" opacity="0.2">
                   <use xlink:href="#facebook-path24_fill" transform="translate(-38 6938.02)"></use>
                </g>
                <g id="facebook-Vector" opacity="0.2">
                   <use xlink:href="#facebook-path25_fill" transform="translate(-555 7065.02)"></use>
                </g>
                <g id="facebook-Vector" opacity="0.2">
                   <use xlink:href="#facebook-path26_fill" transform="translate(-501.062 6960.31)"></use>
                </g>
                <g id="facebook-Vector" opacity="0.2">
                   <use xlink:href="#facebook-path27_fill" transform="translate(-453.426 7185.64)"></use>
                </g>
             </g>
          </g>
       </g>
       <defs>
          <path id="facebook-path0_fill" d="M 600 0L 0 0L 0 315L 600 315L 600 0Z"></path>
          <path id="facebook-path1_fill" d="M 0 7.12042L 0 20.0209L 12.3055 12.9005L 12.3055 5.11289e-06L 0 7.12042Z"></path>
          <path id="facebook-path2_fill" d="M 1.32187e-06 17.2675L 1.32187e-06 48.7142L 29.8441 31.4033L 29.8441 -5.30943e-06L 1.32187e-06 17.2675Z"></path>
          <path id="facebook-path3_fill" d="M 0 71.0362L 83 23.0205L 83 0L 0 0L 0 71.0362Z"></path>
          <path id="facebook-path4_fill" d="M 0 62.8066L 13.8608 54.76L 13.8608 -5.30943e-06L 0 8.04654L 0 62.8066Z"></path>
          <path id="facebook-path5_fill" d="M 1.90735e-06 24.875L 1.90735e-06 70L 43.0625 45.125L 43.0625 0L 1.90735e-06 24.875Z"></path>
          <path id="facebook-path6_fill" d="M 0 7.39413L 0 20.7905L 12.6913 13.3964L 12.6913 5.30943e-06L 0 7.39413Z"></path>
          <path id="facebook-path7_fill" d="M 0 9.13392L 8.66303 9.13392L 8.66303 0L 0 5.04539L 0 9.13392Z"></path>
          <path id="facebook-path8_fill" d="M 12.3055 7.12042L 12.3055 20.0209L 5.12675e-06 12.9005L 5.12675e-06 5.11289e-06L 12.3055 7.12042Z"></path>
          <path id="facebook-path9_fill" d="M 29.8008 17.2675L 29.8008 48.7142L 0 31.4033L 0 -5.30943e-06L 29.8008 17.2675Z"></path>
          <path id="facebook-path10_fill" d="M 0 0L 0 23.0205L 83 71.0362L 83 0L 0 0Z"></path>
          <path id="facebook-path11_fill" d="M 43 24.875L 43 70L 0 45.125L 0 0L 43 24.875Z"></path>
          <path id="facebook-path12_fill" d="M 36.5386 21.0681L 0 1.02258e-05L 0 42.0105L 36.5386 63.0367L 36.5386 21.0681Z"></path>
          <path id="facebook-path13_fill" d="M 12.6913 7.39413L 12.6913 20.7905L -1.32187e-06 13.3964L -1.32187e-06 5.30943e-06L 12.6913 7.39413Z"></path>
          <path id="facebook-path14_fill" d="M 0 9.13392L 8.66303 9.13392L 8.66303 5.04539L 0 0L 0 9.13392Z"></path>
          <path id="facebook-path15_fill" d="M 12.3055 -5.11289e-06L 5.12675e-06 7.07854L 12.3055 14.199L 24.611 7.07854L 12.3055 -5.11289e-06Z"></path>
          <path id="facebook-path16_fill" d="M 29.8008 0L 0 17.3109L 29.8008 34.5784L 59.645 17.3109L 29.8008 0Z"></path>
          <path id="facebook-path17_fill" d="M 86.0625 0L 0 0L 43 24.875L 86.0625 0Z"></path>
          <path id="facebook-path18_fill" d="M 36.5386 5.11289e-06L 0 21.0262L 36.5386 42.0942L 36.5386 5.11289e-06Z"></path>
          <path id="facebook-path19_fill" d="M 12.6913 -5.30943e-06L -1.32187e-06 7.35063L 12.6913 14.7448L 25.3827 7.35063L 12.6913 -5.30943e-06Z"></path>
          <path id="facebook-path20_fill" d="M 8.66303 0L 0 5.00191L 8.66303 10.0473L 17.3261 5.00191L 8.66303 0Z"></path>
          <path id="facebook-path21_fill" d="M 5.12675e-06 67.0157L 153 67.0157L 153 21.0681L 116.377 0L 5.12675e-06 67.0157Z"></path>
          <path id="facebook-path22_fill" d="M 0 16.0931L 13.8608 8.04654L 0 -5.30943e-06L 0 16.0931Z"></path>
          <path id="facebook-path23_fill" d="M 29.8441 0L 1.32187e-06 17.3109L 29.8441 34.5784L 59.645 17.3109L 29.8441 0Z"></path>
          <path id="facebook-path24_fill" d="M 0 48.0157L 83 95.9795L 83 -3.96462e-07L 0 48.0157Z"></path>
          <path id="facebook-path25_fill" d="M 0 8.00305L 0 52.2373L 13.8608 60.2404L 65.839 30.0984L 13.8608 5.30943e-06L 0 8.00305Z"></path>
          <path id="facebook-path26_fill" d="M 43.0625 0L 1.90735e-06 24.8125L 43.0625 49.6875L 86.0625 24.8125L 43.0625 0Z"></path>
          <path id="facebook-path27_fill" d="M 12.6913 0L 0 7.39412L 12.6913 14.7448L 25.426 7.39412L 12.6913 0Z"></path>
       </defs>
    </svg>
    `,
    markup: (colors) => `
   <svg width="100%" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
   <g id="instagram-Canvas" transform="translate(1135 -6915)">
      <clipPath id="instagram-clip-0" clip-rule="evenodd">
         <path d="M -1135 6915L -635 6915L -635 7415L -1135 7415L -1135 6915Z" fill="#FFFFFF"></path>
      </clipPath>
      <g id="instagram-rubik-insta" clip-path="url(#instagram-clip-0)">
         <path d="M -1135 6915L -635 6915L -635 7415L -1135 7415L -1135 6915Z" fill="#FBA8FA"></path>
         <g id="instagram-color-0">
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path0_fill" transform="translate(-1135 6915)" class="animatedBG" fill="${colors[0]}"></use>
            </g>
         </g>
         <g id="instagram-color-1">
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path1_fill" transform="translate(-689.375 7222.62)" fill="${colors[1]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path2_fill" transform="translate(-1061.06 7306.12)" fill="${colors[1]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path3_fill" transform="translate(-735 6915)" fill="${colors[1]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path4_fill" transform="translate(-1135 7098.94)" fill="${colors[1]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path5_fill" transform="translate(-1081.06 6915)" fill="${colors[1]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path1_fill" transform="translate(-988.438 7332)" fill="${colors[1]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path6_fill" transform="translate(-1070 7401.88)" fill="${colors[1]}"></use>
            </g>
         </g>
         <g id="instagram-color-2">
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path7_fill" transform="translate(-707.688 7222.62)" fill="${colors[2]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path8_fill" transform="translate(-1104.06 7306.12)" fill="${colors[2]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path9_fill" transform="translate(-835 6915)" fill="${colors[2]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path10_fill" transform="translate(-1124.06 6915)" fill="${colors[2]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path11_fill" transform="translate(-689.375 7252.44)" fill="${colors[2]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path12_fill" transform="translate(-1006.75 7332)" fill="${colors[2]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path13_fill" transform="translate(-1082.5 7401.88)" fill="${colors[2]}"></use>
            </g>
         </g>
         <g id="instagram-color-3">
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path14_fill" transform="translate(-707.688 7212.06)" fill="${colors[3]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path15_fill" transform="translate(-1104.06 7281.25)" fill="${colors[3]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path16_fill" transform="translate(-1124.06 6915)" fill="${colors[3]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path17_fill" transform="translate(-689.375 7221.06)" fill="${colors[3]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path18_fill" transform="translate(-1006.75 7321.44)" fill="${colors[3]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path19_fill" transform="translate(-1082.5 7394.69)" fill="${colors[3]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path20_fill" transform="translate(-862.688 7315)" fill="${colors[3]}"></use>
            </g>
            <g id="instagram-Vector">
               <use xlink:href="#instagram-path21_fill" transform="translate(-1135 7087.38)" fill="${colors[3]}"></use>
            </g>
         </g>
         <g id="instagram-Group">
            <g id="instagram-Vector" opacity="0.2">
               <use xlink:href="#instagram-path22_fill" transform="translate(-1061.06 7351.25)"></use>
            </g>
            <g id="instagram-Vector" opacity="0.2">
               <use xlink:href="#instagram-path23_fill" transform="translate(-735 6942.69)"></use>
            </g>
            <g id="instagram-Vector" opacity="0.2">
               <use xlink:href="#instagram-path24_fill" transform="translate(-1135 7177.94)"></use>
            </g>
            <g id="instagram-Vector" opacity="0.2">
               <use xlink:href="#instagram-path25_fill" transform="translate(-1081.06 6960.31)"></use>
            </g>
            <g id="instagram-Vector" opacity="0.2">
               <use xlink:href="#instagram-path26_fill" transform="translate(-988.438 7351.25)"></use>
            </g>
         </g>
      </g>
   </g>
   <defs>
      <path id="instagram-path0_fill" d="M 500 0L 0 0L 0 500L 500 500L 500 0Z"></path>
      <path id="instagram-path1_fill" d="M 0 10.625L 0 29.875L 18.3125 19.25L 18.3125 7.62939e-06L 0 10.625Z"></path>
      <path id="instagram-path2_fill" d="M 1.90735e-06 24.8125L 1.90735e-06 70L 43.0625 45.125L 43.0625 -7.62939e-06L 1.90735e-06 24.8125Z"></path>
      <path id="instagram-path3_fill" d="M 0 85.4375L 100 27.6875L 100 0L 0 0L 0 85.4375Z"></path>
      <path id="instagram-path4_fill" d="M 0 90.25L 20 78.6875L 20 -7.62939e-06L 0 11.5625L 0 90.25Z"></path>
      <path id="instagram-path5_fill" d="M 1.90735e-06 24.875L 1.90735e-06 70L 43.0625 45.125L 43.0625 0L 1.90735e-06 24.875Z"></path>
      <path id="instagram-path6_fill" d="M 0 13.125L 12.5 13.125L 12.5 0L 0 7.24998L 0 13.125Z"></path>
      <path id="instagram-path7_fill" d="M 18.3125 10.625L 18.3125 29.875L 7.62939e-06 19.25L 7.62939e-06 7.62939e-06L 18.3125 10.625Z"></path>
      <path id="instagram-path8_fill" d="M 43 24.8125L 43 70L 0 45.125L 0 -7.62939e-06L 43 24.8125Z"></path>
      <path id="instagram-path9_fill" d="M 0 0L 0 27.6875L 100 85.4375L 100 0L 0 0Z"></path>
      <path id="instagram-path10_fill" d="M 43 24.875L 43 70L 0 45.125L 0 0L 43 24.875Z"></path>
      <path id="instagram-path11_fill" d="M 54.375 31.4375L 0 1.52588e-05L 0 62.6875L 54.375 94.0625L 54.375 31.4375Z"></path>
      <path id="instagram-path12_fill" d="M 18.3125 10.625L 18.3125 29.875L -1.90735e-06 19.25L -1.90735e-06 7.62939e-06L 18.3125 10.625Z"></path>
      <path id="instagram-path13_fill" d="M 0 13.125L 12.5 13.125L 12.5 7.24998L 0 0L 0 13.125Z"></path>
      <path id="instagram-path14_fill" d="M 18.3125 -7.62939e-06L 7.62939e-06 10.5625L 18.3125 21.1875L 36.625 10.5625L 18.3125 -7.62939e-06Z"></path>
      <path id="instagram-path15_fill" d="M 43 0L 0 24.875L 43 49.6875L 86.0625 24.875L 43 0Z"></path>
      <path id="instagram-path16_fill" d="M 86.0625 0L 0 0L 43 24.875L 86.0625 0Z"></path>
      <path id="instagram-path17_fill" d="M 54.375 7.62939e-06L 0 31.375L 54.375 62.8125L 54.375 7.62939e-06Z"></path>
      <path id="instagram-path18_fill" d="M 18.3125 -7.62939e-06L -1.90735e-06 10.5625L 18.3125 21.1875L 36.625 10.5625L 18.3125 -7.62939e-06Z"></path>
      <path id="instagram-path19_fill" d="M 12.5 0L 0 7.1875L 12.5 14.4375L 25 7.1875L 12.5 0Z"></path>
      <path id="instagram-path20_fill" d="M 7.62939e-06 100L 227.688 100L 227.688 31.4375L 173.187 0L 7.62939e-06 100Z"></path>
      <path id="instagram-path21_fill" d="M 0 23.125L 20 11.5625L 0 -7.62939e-06L 0 23.125Z"></path>
      <path id="instagram-path22_fill" d="M 43.0625 0L 1.90735e-06 24.875L 43.0625 49.6875L 86.0625 24.875L 43.0625 0Z"></path>
      <path id="instagram-path23_fill" d="M 0 57.75L 100 115.437L 100 -4.76837e-07L 0 57.75Z"></path>
      <path id="instagram-path24_fill" d="M 0 11.5L 0 75.0625L 20 86.5625L 95 43.25L 20 7.62939e-06L 0 11.5Z"></path>
      <path id="instagram-path25_fill" d="M 43.0625 0L 1.90735e-06 24.8125L 43.0625 49.6875L 86.0625 24.8125L 43.0625 0Z"></path>
      <path id="instagram-path26_fill" d="M 18.3125 0L 0 10.625L 18.3125 21.1875L 36.6875 10.625L 18.3125 0Z"></path>
   </defs>
</svg>`
};
export default config;