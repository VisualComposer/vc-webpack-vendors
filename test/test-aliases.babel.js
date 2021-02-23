var vendors = require('../index')

vendors().forEach((item) => {
    var library = require(item)
    console.log({name:item, library:library})
})