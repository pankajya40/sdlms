module.exports = generateFilterQuery;


/**
 * @function generateFilterQuery;
 * @description generate a mongodb filter query from a config object
 *
 * @param {*} config
 * @param {string[]} events
 * @returns { matchFilterQuery } match query
 */
function generateFilterQuery(config, events) {
    const matchQuery = {};

    const ignoreCollections = [];
    const ignoreDocuments = [];

    for (let [collection, configurations] of Object.entries(config)) {
        if (configurations !== '*' && !Array.isArray(configurations))
        throw Error('Invalid Configuration: Collection\'s value should be \'*\' or an array')
        else if (configurations === '*') ignoreCollections.push(collection);
        else {
            for (let configuration of configurations) {

                const query = [];
                const matchConditions = []
                const filterConditions = []
                const match = { '$nor': [ { '$and': matchConditions } ] };
                const filter = { '$and': filterConditions };

                const { match: matchConfig, filter: filterConfig, invertFilter } = configuration;

                matchConditions.push({ 'ns.coll': collection });
                for ( let [fieldName, values] of Object.entries(matchConfig || {}) ) {
                    matchConditions.push({ ['fullDocument.' + fieldName]: { '$in': values } })
                }

                for ( let [fieldName, values] of Object.entries(filterConfig || {}) ) {
                    if (invertFilter)
                    filterConditions.push({ ['fullDocument.' + fieldName]: { '$not': { '$in': values } } })
                    else
                    filterConditions.push({ ['fullDocument.' + fieldName]: { '$in': values } })
                }

                query.push(match, filter);
                ignoreDocuments.push({
                    '$or': query
                })

            }
        }
    }

	matchQuery['operationType'] = { '$in': events };
    matchQuery['ns.coll'] = { '$not': { '$in': ignoreCollections } };
    matchQuery['$and'] = ignoreDocuments;

    return {
        '$match': matchQuery
    }
}