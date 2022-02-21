export default {
    methods: {
        orderSort(arr) {
            return arr.sort(function (a, b) {
                return a.id - b.id;
            });
        },
    }
};

// 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