import config from './config';
const baseUrl = config.baseUrl;

export default class Data {

    api(path, method, body = null, requiresAuth = false, credentials) {
        const url = `${baseUrl}${path}`
        const options = {
            method,
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            }
        };

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        if (body !== null) {
            options.body = JSON.stringify(body);
        }
            return fetch(url, options);
    }

    async getUser(username, password) {
        const response = await this.api(`/users`, 'GET', null, true, {username, password});
        if (response.status === 200) {
            return await response.json()
        } else if (response.status === 401) {
            return null;
        } else {
            // Uh oh, we had an unrecognized error!!
            console.error(`API call returned status ${response.status}`);
            const error = new Error();
            error.status = response.status;
            throw error;
        }
    } 

    /**
     * Returns a list of errors that occurred (if any) while creating the user
     * @param {*} user 
     */
    async createUser(user) {
        const response = await this.api(`/users`, 'POST') 
        if (response.status === 201) {
           return [];
        } else if (response.status === 400) {
            const responseBody = await response.json();
            return responseBody.errors;
        }
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

    async updateCourse(id, course, emailAddress, password) {
            const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
            if (response.status === 204) {
              return [];
            }
            else if (response.status === 400) {
              return response.json().then(data => {
                return data.errors;
              });
            }
            else {
              throw new Error();
            }
    }
}
