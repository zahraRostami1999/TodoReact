// Api interface
export default class Interface {
	Auth = {
		init() {},
		async usernameExist(username) {},
		async login(username, password) {},
		async register(username, password) {},
		async logout() {},
		isLogedIn() {},
	}

	Task = {
		async create(text) {},
		async getAll(page, per_page) {},
		async toggleDone(id) {},
		async moveUp(id) {},
		async moveDown(id) {},
		async delete(id) {},
	}
}
