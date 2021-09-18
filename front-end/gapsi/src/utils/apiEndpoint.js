const baseUrl = 'http://localhost:4000';

function settingsGet() {
    return {
        method: 'GET',
        url: baseUrl + '/settings',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

function settingsPost2(data) {
    return {
        method: 'POST',
        url: baseUrl + '/settings2',
        data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

function providerGet(page) {
    return {
        method: 'GET',
        url: baseUrl + '/provider?page=' + page,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}
function providerDelete(id) {
    return {
        method: 'DELETE',
        url: baseUrl + '/provider/' + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}
function providerCreate(data) {
    return {
        method: 'POST',
        url: 'http://localhost:4000/provider',
        data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

module.exports = {
    settingsGet, settingsPost2, providerGet,
    providerDelete,providerCreate
}