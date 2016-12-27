const statLms = require('.');

/*
 * LMS values for:
 * Full-term (40 weeks and 0 days) born Japanese boy from primiparae. 
 */
const L = 0.725;
const M = 3094.186;
const S = 0.109;
const weightOfMyBaby = 2535;

var zScore = statLms.getZScore(weightOfMyBaby, L, M, S);
var percentile = statLms.getPercentile(zScore);

console.log(`My baby's weight is ${zScore.toFixed(2)} SD`);
if(percentile < 10){
	console.log('He is light for gestational age!');
}else{
	console.log('He is appropriate for gestational age.');
}

