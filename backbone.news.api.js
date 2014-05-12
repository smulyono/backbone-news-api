// Main definition file
define(["./js/model/backbone.news.model",
        "./js/collection/backbone.news.collection",
        "./js/view/backbone.news.view"],
    function(){
        return {
            /** Constant **/
            SOURCE_GOOGLE : "google",
            SOURCE_YAHOO  : "yahoo",
            SOURCE_ALL    : "all",
            /**
                source : "google", "yahoo", "all"
                query  : <text>,
                callback: Callback function
            */
            getNews : function(_source, _query, _callback){
                console.log("source", _source);
                console.log("query", _query);
                var newsCollection = new Backbone.News.Collection({
                    source : _source,
                    query  : _query
                }).fetch({
                    success : _callback
                });
            },
            getGeoNews : function(_source, _query, _lat, _lang){

            },
            draw : function(opt){
                // create new backbone view representation
                var nview = new Backbone.News.View(opt);
                return nview;
            }
        };
});
