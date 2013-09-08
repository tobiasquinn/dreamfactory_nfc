Template.namedetail.details = function() {
    return MATRIX.findOne({name: Session.get('namedetail')});
}

