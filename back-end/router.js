const { GetSettings, PostSettings2 } = require('./controllers/settings');
const { GetProvider, PutProvider, PostProvider, DeleteProvider } = require('./controllers/provider');

module.exports =
    [
        {
            method: 'GET',
            path: '/settings',
            handler: GetSettings
        },
        {
            method: 'POST',
            path: '/settings2',
            handler: PostSettings2
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