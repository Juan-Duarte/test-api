require('dotenv').config()
const got = require('got');

class ApiHelper {
    constructor() {
        this.authToken = process.env.AUTH;
        this.hostname = 'private-anon-921f08c954-dictionaryapi.apiary-proxy.com'; //'dictionary.iachieved.it';
        this.http = got.extend({
            hooks: {
                beforeRequest: [
                    options => {
                        options.headers = this.getAuthHeaders();
                    }
                ]
            }
        });
    }

    getAuthHeaders() {
        if (this.authToken) {
            return {'Authorization': 'Basic '+this.authToken}
        } else {
            return undefined;
        }
        
    }

    async postDictionary(payload) {
        try {
            const res = await this.http.post(
                'https://'+this.hostname+'/dictionary',
                {
                    json: payload,
                    reponseType: 'json',
                }
            )

            return res;
        } catch (error) {
            return error;
        }
    }

    async getDictionaryKeys(id) {
        try {
            const res = await this.http.get(
                `https://${this.hostname}/dictionary/${id}/keys`,
                {
                    reponseType: 'json',
                }
            )

            return res;
        } catch (error) {
            return error;
        }
    }

    async postDictionaryKey(id, key, value) {
        try {
            const res = await this.http.post(
                `https://${this.hostname}/dictionary/${id}/keys/${key}`,
                {
                    json: {value},
                    reponseType: 'json',
                }
            )

            return res;
        } catch (error) {
            return error;
        }
    }

    async getDictionaryValue(id, key) {
        try {
            const res = await this.http.get(
                `https://${this.hostname}/dictionary/${id}/keys/${key}`,
                {
                    reponseType: 'json',
                }
            )

            return res;
        } catch (error) {
            return error;
        }
    }

    async deleteDictionary(id) {
        try {
            const res = await this.http.delete(
                'https://'+this.hostname+'/dictionary/'+id,
                {
                    reponseType: 'json',
                }
            )
    
            return res;
        } catch (error) {
            return error;
        }
        
    }
}
  
module.exports = ApiHelper;