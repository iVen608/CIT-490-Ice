const x = [
    {name: "Fedex", price:1.5, ice:7},
    {name: "UPS", price:1.25, ice:7},
    {name: "Chevron", price:2.25, ice:16},
    {name: "Core", price:10.5, ice:40},
]

function sortFunction(array, key, order){
    order = order === "ascend" ? 1 : -1;
    const sorted = array.sort((x,y) => {
        if(x[key] > y[key]){
            return 1 * order;
        }else if(x[key] < y[key]){
            return -1 * order;
        }
        return 0;
    })
    return sorted;
}

function filterArrayFunction(array, key, value){
    const filtered = array.filter(element => element[key] === value)
    return filtered;
}

console.log(parseFloat("a"))
/*
//console.log(reverseAlpha)
console.log(`\nName ascending\n`);
console.log(sortFunction(x, "name", "ascend"));
console.log(`\nName descending\n`);
console.log(sortFunction(x, "name", "descend"));
console.log(`\nPrice ascending\n`);
console.log(sortFunction(x, "price", "ascend"));
console.log(`\nPrice descending\n`);
console.log(sortFunction(x, "price", "descend"));
console.log(`\nIce descending\n`);
console.log(sortFunction(x, "ice", "descend"));
console.log(`\nIce ascending\n`);
console.log(sortFunction(x, "ice", "ascend"));
console.log("\n\n\n")
console.log("Filtered")
console.log(filterArrayFunction(x, "price", 1.5))*/