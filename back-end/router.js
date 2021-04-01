const { GetSettings } = require('./controllers/settings');
const { GetProvider, PutProvider, PostProvider, DeleteProvider } = require('./controllers/provider');

module.exports =
    [
        {
            method: 'GET',
            path: '/',
            handler: GetSettings
        },
        {
            method: 'GET',
            path: '/provider',
            handler: GetProvider
        },
        {
            method: 'GET',
            path: '/provider/{id}',
            handler: GetProvider
        },
        {
            method: 'PUT',
            path: '/provider/{id}',
            handler: PutProvider
        },
        {
            method: 'POST',
            path: '/provider',
            handler: PostProvider
        },
        {
            method: 'DELETE',
            path: '/provider/{id}',
            handler: DeleteProvider
        }
    ]