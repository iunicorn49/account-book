class PE {
	constructor({age, name}) {
		this.age = age
		this.name = name
	}
	view = () => {
		console.log(this)
	}
}

let a = new PE({age: 23, name: 'hehe'})

console.log(a)
a.view()