const menu_validations = []

// does menu contain a valid restaurant
menu_validations.push((menu) => {
    if (typeof menu.rest === 'undefined'){
        throw new Error('no restaurant id provided')
    }
    if (!restExists(menu.rest)){
        throw new Error('invalid restaurant id')
    }
});



function restExists(rest_id) {
    // return rest-service.getRest(rest_id) != false;
    return true;
}
module.exports = menu_validations