
module.exports = {
	erf(x) {
		var m = 1.00;
		var s = 1.00;
		var sum = x * 1.0;
		for(var i = 1; i < 50; i++){
			m *= i;
			s *= -1;
			sum += (s * Math.pow(x, 2.0 * i + 1.0)) / (m * (2.0 * i + 1.0));
		}
		return 2 * sum / Math.sqrt(Math.PI);
	},
	getZScore(value, L, M, S){
		if (L == 0){
			return Math.log(value / M) / S;
		}else{
			return (Math.pow(value / M, L) - 1) / (L * S);
		}
	},
	getPercentile(z){
		return 50 + this.erf(z / Math.sqrt(2.0)) / 2 * 100;
	},
	getValueFromZScore(Z, L, M, S){
		if (L == 0) {
			return M * Math.exp(S * Z);
		}else{
			return Math.pow(Z * L * S + 1, 1.0 / L) * M;
		}
	}
}
