import config from './config';
const baseUrl = config.baseUrl;


class Data {

    api(path, method, body = null) {
        const url = `${baseUrl}${path}`
        const options = {
            method,
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options);
    }

    async getUser() {
        // ...
    } 

    async createUser() {
        // ...
    }

    async getCourses() {
        const response = await this.api(`/courses`, 'GET');
        if (response.status === 200) {
            return await response.json()
        } else if (response.status === 404) {
            // What do we do if not found??
        } else if (response.status === 401) {
            // ??
        } else {
            // Uh oh, we had an unrecognized error!!
        }
    }

    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET')
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            // ??
        }
    }

    async deleteCourse(id, username, password) {
        const credentials = { username, password };
        const response = await this.api(`/courses/${id}`, 'DELETE', credentials)
        if (response.status === 204) {
            return response.json();
        } else if (response.status === 401) {
            // ??
        }
    }

}

export default Data;