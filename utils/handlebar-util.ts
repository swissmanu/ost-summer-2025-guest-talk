import moment from 'moment'

export const helpers = {
    'if_eq': function (a, b, opts) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },
    '?': function (a, b, c) {
        return a ? b : c;
    },
    'eq': function (a, b, c, d) {
        return a == b ? c : d;
    },
    'times': function (n, block) {
        let accum = '';
        for (let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    },
    'date': function (a) {
        return a == undefined || a == "" ? "Someday" : moment(a).fromNow();
    }
}
