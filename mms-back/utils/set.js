// perform union operation
// contain elements of both sets
function union(a, b) {
    let unionSet = new Set(a);
    for (let i of b) {
        unionSet.add(i);
    }
    return unionSet;
}

// perform difference operation
// perform intersection operation
// elements of set a that are also in set b
function intersection(setA, setB) {
    let intersectionSet = new Set();

    for (let i of setB) {
        if (setA.has(i)) {
            intersectionSet.add(i);
        }
    }
    return intersectionSet;
}

// elements of set a that are not in set b
function difference(setA, setB) {
    let differenceSet = new Set(setA);
    for (let i of setB) {
        differenceSet.delete(i);
    }
    return differenceSet;
}

// perform subset operation
// true if all elements of set b is in set a
function subset(setA, setB) {
    for (let i of setB) {
        if (!setA.has(i)) {
            return false;
        }
    }
    return true;
}
module.exports = { union, intersection, difference, subset };
