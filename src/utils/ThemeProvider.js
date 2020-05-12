import ByTheBell from './themes/ByTheBell';
import InterStellar from './themes/InterStellar';
import Radient from './themes/Radient';
import Rubik from './themes/Rubik';
import Sprinkles from './themes/Sprinkles';
import Italic from './themes/Italic';
import Parisienne from './themes/Parisienne';
import Romanesco from './themes/Romanesco';
import Typewriter from './themes/Typewriter';
import Custom from './themes/Custom';

export default class ThemeProvider{
    static getThemes(){
        return {
            ByTheBell,
            InterStellar,
            Radient,
            Rubik,
            Sprinkles,
            Italic,
            Romanesco,
            Typewriter,
            Parisienne,
            Custom
        };
    }

    static getFontsURL(){
        return 'https://fonts.googleapis.com/css?family=Hind+Siliguri|Nunito|Paytone+One|Roboto+Condensed|Rubik|Bangers|Parisienne|Romanesco|Special+Elite|Lato';
    }
}