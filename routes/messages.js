
/*
 * GET users listing.
 */

exports.list = function(db) {
    return function(req, res) {
        var collection = db.get('messagecollection');

        collection.find({},{sort : { timestamp :-1}},function(e,docs){
            res.render('messages', {
                "messages": docs
            });
        });
    };
};