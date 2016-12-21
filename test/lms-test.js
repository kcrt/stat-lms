const assert = require('assert');
const lmsStat = require('..');

function NearlyEqual(a, b){
	const NeedToWithIn = 0.0001
	return assert.ok(Math.abs(a - b) <= NeedToWithIn, `${a} != ${b}`);
}

describe("LMS to z-score", () => {
	it("L == 0", () => {
		NearlyEqual(lmsStat.getZScore(5.00, 0.00, 5.00, 1.00), 0.00);
		NearlyEqual(lmsStat.getZScore(1.00, 0.00, 5.00, 1.00), -1.60944);
		NearlyEqual(lmsStat.getZScore(9.00, 0.00, 5.00, 1.00), 0.58779);
		NearlyEqual(lmsStat.getZScore(100.00, 0.00, 5.00, 1.00), 2.99573);
	})
	it("L == -0.5", () => {
		NearlyEqual(lmsStat.getZScore(5.00, -0.50, 5.00, 1.00), 0.00);
		NearlyEqual(lmsStat.getZScore(1.00, -0.50, 5.00, 1.00), -2.47214);
		NearlyEqual(lmsStat.getZScore(9.00, -0.50, 5.00, 1.00), 0.50929);
		NearlyEqual(lmsStat.getZScore(100.00, -0.50, 5.00, 1.00), 1.55279);
	})
	it("L == 0.5", () => {
		NearlyEqual(lmsStat.getZScore(5.00, 0.50, 5.00, 1.00), 0.00);
		NearlyEqual(lmsStat.getZScore(1.00, 0.50, 5.00, 1.00), -1.10557);
		NearlyEqual(lmsStat.getZScore(9.00, 0.50, 5.00, 1.00), 0.68328);
		NearlyEqual(lmsStat.getZScore(100.00, 0.50, 5.00, 1.00), 6.94427);
	})
});
describe("Error function (ERF)", () => {
	it("erf", () => {
		NearlyEqual(lmsStat.erf(-3), -0.999977909503001);
		NearlyEqual(lmsStat.erf(-1), -0.842700792949715); NearlyEqual(lmsStat.erf(-0.1), -0.112462916018285);
		NearlyEqual(lmsStat.erf(0), 0); NearlyEqual(lmsStat.erf(0.05), 0.0563719777970166);
		NearlyEqual(lmsStat.erf(0.1), 0.112462916018285); NearlyEqual(lmsStat.erf(0.2), 0.222702589210478);
		NearlyEqual(lmsStat.erf(0.3), 0.328626759459127); NearlyEqual(lmsStat.erf(0.4), 0.428392355046668);
		NearlyEqual(lmsStat.erf(0.5), 0.520499877813047); NearlyEqual(lmsStat.erf(0.6), 0.603856090847926);
		NearlyEqual(lmsStat.erf(0.7), 0.677801193837418); NearlyEqual(lmsStat.erf(0.71), 0.684665550217444);
		NearlyEqual(lmsStat.erf(0.8), 0.742100964707661); NearlyEqual(lmsStat.erf(0.9), 0.796908212422832);
		NearlyEqual(lmsStat.erf(1), 0.842700792949715);
	})
});
describe("Z-score -> Percentile", () => {
	it("getPercentile", () => {
		NearlyEqual(lmsStat.getPercentile(-5), 0.00003); NearlyEqual(lmsStat.getPercentile(-4), 0.00317);
		NearlyEqual(lmsStat.getPercentile(-3), 0.13499); NearlyEqual(lmsStat.getPercentile(-2), 2.27501);
		NearlyEqual(lmsStat.getPercentile(-1), 15.86553); NearlyEqual(lmsStat.getPercentile(-0.5), 30.85375);
		NearlyEqual(lmsStat.getPercentile(-0.1), 46.01722); NearlyEqual(lmsStat.getPercentile(0), 50);
		NearlyEqual(lmsStat.getPercentile(0.1), 53.98278); NearlyEqual(lmsStat.getPercentile(0.25), 59.87063);
		NearlyEqual(lmsStat.getPercentile(1), 84.13447); NearlyEqual(lmsStat.getPercentile(2), 97.72499);
		NearlyEqual(lmsStat.getPercentile(3), 99.86501); NearlyEqual(lmsStat.getPercentile(4), 99.99683);
		NearlyEqual(lmsStat.getPercentile(5), 99.99997);
	});
});

describe("Z-score -> value", () => {
	it("Build-in values", () => {
		NearlyEqual(lmsStat.getValueFromZScore(1, 0, 5, 1), 13.59140)
		NearlyEqual(lmsStat.getValueFromZScore(1, 0.5, 5, 1), 11.25000)
		NearlyEqual(lmsStat.getValueFromZScore(1, -0.5, 5, 1), 20.00000)
	});
	it("for loop", () => {
		for(var l = -0.9; l <= 0.9; l += 0.1){
			for(var m = 0.1; m <= 20.0; m += 0.2){
				for(var s = 0.1; s <= 2.0; s += 0.1){
					for(var z = -4.0; z <= 4.0; z += 0.2){
						if(z * l * s < 1.0) continue;
						NearlyEqual(
							lmsStat.getZScore(lmsStat.getValueFromZScore(z, l, m, s), l, m, s),
							z
						);
					}
				}
			}
		}
	});
});
