// Main definition file
define(["./js/model/backbone.news.model",
        "./js/collection/backbone.news.collection",
        "./js/view/backbone.news.view"],
    function(){
        return {
            /** Constant **/
            SOURCE_GOOGLE : "google",
            SOURCE_YAHOO  : "yahoo",
            SOURCE_ALL    : "all", // NOT SUPPORTED
            /**
                source : "google", "yahoo", "all"
                query  : <text>
            */
            getNews : function(opt){
                var newsCollection = new Backbone.News.Collection({
                    source : opt.source || SOURCE_YAHOO,
                    query  : opt.query || "",
                    limits : opt.limits || ""
                });

                return newsCollection;
            },
            // simple draw using backbone view
            draw : function(opt){
                // create new backbone view representation
                var newsCollection = this.getNews(opt);

                var nview = new Backbone.News.View({
                    collection : newsCollection,
                    template : opt.template
                });
                return nview;
            }
        };
});
