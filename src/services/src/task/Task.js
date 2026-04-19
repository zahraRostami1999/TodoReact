import Api from "../Inheritator.js"

/**
 * --------------------------------------------------------------
 * 	frontend accessible interface
 * --------------------------------------------------------------
 *
 */

export default class Task {
	#sendTaskRequest = async (ep, method, body = {}, headers = {}) => {
		if (!Api.Auth.isLogedIn()) return null
		headers = { ...Api.Auth.getAuthHeader() }
		const result = await Api._sendRequest(ep, method, body, headers)
		if (!result.ok) return null // error
		return result // result
	}

	getAll = async (page = 1, per_page = Api._MAX_PER_PAGE) => {
		const ep = `tasks?page=${page}&per_page=${per_page}`
		const method = "GET"
		const result = await this.#sendTaskRequest(ep, method)
		if (result === null) return null
		return {
			"x-current-page": Number(result.headers["x-current-page"]) || 0,
			"x-total-items": Number(result.headers["x-total-items"]),
			"x-total-pages": Number(result.headers["x-total-pages"]),
			content: result.body,
		} // tasks
	}

	toggleDone = async (id) => {
		const ep = `task/${id}`
		const body = { toggle: true }
		const method = "PUT"
		const result = await this.#sendTaskRequest(ep, method, body)
		if (result === null) return null
		return result.body.id
	}

	moveUp = async (id) => {
		const ep = `task/${id}`
		const body = { move: "up" }
		const method = "PUT"
		const result = await this.#sendTaskRequest(ep, method, body)
		if (result === null) return null
		return result.body.id
	}

	moveDown = async (id) => {
		const ep = `task/${id}`
		const body = { move: "down" }
		const method = "PUT"
		const result = await this.#sendTaskRequest(ep, method, body)
		if (result === null) return null
		return result.body.id
	}

	create = async (text) => {
		const ep = `task`
		const method = "POST"
		const body = { description: text.trim() }
		const result = await this.#sendTaskRequest(ep, method, body)
		if (result === null) return null
		return result.body.task_id
	}

	delete = async (id) => {
		const ep = `task/${id}`
		const method = "DELETE"
		const result = await this.#sendTaskRequest(ep, method)
		if (result === null) return null
		return result.body.id
	}
}
