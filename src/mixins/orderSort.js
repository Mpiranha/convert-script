export default {
    methods: {
        orderSort(arr) {
            return arr.sort(function (a, b) {
                return a.id - b.id;
            });
        },
    }
};