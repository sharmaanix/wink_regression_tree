// Load wink-regression-tree.
var regressionTree = require( 'wink-regression-tree' );

//loading the adult information dataset
var adult = require('./adult.json');

//vizualizing the json data
//console.log(adult);

//creating the sample for valuation and prediction
var input_data = {
	workclass : 'Without-pay',
	education : 'Bachelors',
	marital_status : 'Never-married',
	occupation : 'Tech-support',
	relationship : 'Own-child',
	race : 'Other',
	sex : 'Male',
	native_country : 'India',
	income : '<=50K'
};

// Above record is not the part of training data.
// Create an instance of the regression  tree.
var rt = regressionTree();

//specifying the columns of training dataset
var columns = [
  { name: 'age', categorical : false, target : true },
  { name: 'workclass', categorical: true, exclude: false },
  { name: 'fnlwgt', categorical: false, exclude : true },
  { name: 'education', categorical: true, exclude: false },
  { name: 'education_num', categorical: false, exclude: true },
  { name: 'marital_status', categorical: true, exclude: false },
  { name: 'occupation', categorical: true, exclude: false },
  { name: 'relationship', categorical: true, exclude: false },
  { name: 'race', categorical: true, exclude: false  },
  { name: 'sex', categorical: true, exclude: false },
  { name: 'capital_gain',categorical: false,exclude: true},
  { name: 'capital_loss',categorical: false,exclude: true},
  { name: 'hours_per_week', categorical: false, exclude : true},
  { name: 'native_country', categorical: true, exclude: false},
  { name : 'income',categorical: true, exclude: false }

];

// Specify configuration for learning.
var treeParams = {
  maxDepth: 500,
  minPercentVarianceReduction: 0.5,
  minLeafNodeItems: 10,
  minSplitCandidateItems: 10,
  minAvgChildrenItems: 2
};
// Define the regression tree configuration using
// `columns` and `treeParams`.
rt.defineConfig( columns, treeParams );

// Ingest the data.
adult.forEach( function ( row ) {
  rt.ingest( row );
} );


// Data ingested! Now time to learn from data!!
console.log("number of rules learned");
console.log( rt.learn() );
console.log("\n")
// -> 1559 (Number of Rules Learned)

// Predict the mean value.
var mean = rt.predict(input_data);
console.log("predicted age is :");
console.log( +mean.toFixed( 1 ) );
//  ( Actual age of a person is 39) and predicted value is 38.6







