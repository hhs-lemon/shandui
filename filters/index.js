module.exports = {
	// 越南币显示
	viMoney: function(v) {
		if (!isNaN(v)) {
			if (v >= 1000000000) {
				return v / 1000000000 + "B"
			} else if (v >= 1000000) {
				return v / 1000000 + "M"
			} else if (v >= 1000) {
				return v / 1000 + "K"
			} else {
				return v
			}
		} else throw new Error("检查孙子!必须输入数字才能用viMoney管道!")
	}
}
