## Waitstaff UI 
### Schedule component for MVP



In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

Rename files from ```build```  and copy to ```dist/public``` of **MVP**:

```
main.*.js --> schedule_selector.js,  
main.*.css --> schedule_selector.css
``` 


## Get schedule data structure:
 
 ```
 GET SCHEDULE
 
 {
 
 	events:[
 		{
 			date:1528146000000,  // date in milliseconds 
 			time:1525860627575, //date with time in milliseconds 
 			text:"Get it While its hot",
 			repeat:"1 weak",
 			products: 
 				[
 					{
         					id: 'JFPUWWNCQC7YATKXMUQXKEP7',
         					image: '',
         					title: 'Walnut Levain Mini Batard',
 					},
 					{
         					id: 'JFPUWWNCQC7YATKXMUQXKEP7',
         					image: '',
         					title: 'Walnut Levain Mini Batard',
 					},
 					{
         					id: 'JFPUWWNCQC7YATKXMUQXKEP7',
         					image: '',
         					title: 'Walnut Levain Mini Batard',
 					},
 				]
 		},
 
 		{
 			date:1528146000000,
 			time:1525860627575,
 			text:"Get it While its hot",
 			repeat:"2 weak",
 			products: 
 				[
 					{
         					id: 'JFPUWWNCQC7YATKXMUQXKEP7',
         					image: '',
         					title: 'Walnut Levain Mini Batard',
 					},
 					{
         					id: 'JFPUWWNCQC7YATKXMUQXKEP7',
         					image: '',
         					title: 'Walnut Levain Mini Batard',
 					},
 					{
         					id: 'JFPUWWNCQC7YATKXMUQXKEP7',
         					image: '',
         					title: 'Walnut Levain Mini Batard',
 					},
 				]
 		}
 	]
 
 }
 ```


## Cofiguration

All configuration parameters in   *src/Config/ApiConfig.js* 

Backend API host: 
 ```baseUrl: 'http://localhost:3000/',```
 
 
