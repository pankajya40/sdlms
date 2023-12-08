module.exports = {
    objects: [
        {
            match: { type: ['session'] },
            filter: { state: ['stop'], isLive: [false] }
        },
		{
			match: { type: ['attendance'] },
			filter: { state: ['stop'] }
		},
        {
            match: { type: ['article'] },
            filter: { title: ['Testing'] },
            invertFilter: true
        },
        {
            filter: {
                _key: [
                    /^user:\d*$/
                ]
            },
            invertFilter: true
        }
    ],
    sessions: '*'
}
