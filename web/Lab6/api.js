user_list = [];
for (let i = 0; i < 20; i++){
    user_list.push({first_name: "Roma" + i, last_name: "Vlasiuk" + i, score: i})
}

function fetchUsers(){
    return new Promise(function(resolve){
        setTimeout(() => {
            resolve(getRandom(user_list, 10));
        }, 1000)
    })
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function getNewUsers(){
    return user_list.slice(-5).reverse();
}

function currentUser(){
    return user_list.length;
}
