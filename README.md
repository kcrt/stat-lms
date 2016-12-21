stat-lms
========================================

Calculate z-scores using LMS method.

What is stat-lms?
----------------------------------------

**stat-lms** is a very simple npm package which calculate z-scores with given LMS values.

LMS (lambda-mu-sigma) values represents skewness, median value, and coefficient of variation. With these values, we can calculate z-scores in a skewed (non-symmetric, non-normal) distribution.

For example, birth weight doesn't follow to normal distribution. So, it is not correct to calculate z-score with standard deviation(σ).

How to Use
----------------------------------------

```javascript
const lmsStat = require('lms-stat');

/*
 * LMS values for:
 * Full-term (40 weeks and 0 days) born Japanese boy from primiparae. 
 */
const L = 0.725;
const M = 3094.186;
const S = 0.109;
const weightOfMyBaby = 2535;

var zScore = lmsStat.getZScore(weightOfMyBaby, L, M, S)
var percentile = lmsStat.getPercentile(zScore)

console.log(`My baby's weight is ${zScore.toFixed(2)} SD`);
if(percentile < 10){
	console.log("He is light for gestational age!")
}else{
	console.log("He is appropriate for gestational age.")
}
```

API
----------------------------------------
### `getZScore(value, L, M, S)`

Calculate z-score for `value` with using `L`, `M`, and `S` values.

### `getPercentile(z)`

Calculate percentile value corresponding to z-score(`z`).

For example, +1.29 SD is equivalent to 90%tile. Baby born with larger than 90%tile weight will be called as *Heavy for date*.

### `getValueFromZScore(Z, L, M, S)`

Calculate value which is corresponding to z-score(`Z`) using `L`, `M`, and `S` values.


Author information
----------------------------------------
Programmed by kcrt (TAKAHASHI, Kyohei)
http://profile.kcrt.net/
	
License
----------------------------------------
	Copyright © 2016 kcrt (TAKAHASHI, Kyohei)
	Released under the MIT license
	http://opensource.org/licenses/mit-license.php

Reference
----------------------------------------
1. Cole TJ. Fitting Smoothed Centile Curves to Reference Data. J R Stat Soc Ser A (Statistics Soc. 1988;151(3):385. doi:10.2307/2982992.
