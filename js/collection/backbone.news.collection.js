define(["backbone"], function(Backbone){
    Backbone.News = Backbone.News || {};
    Backbone.News.Collection = Backbone.News.Collection || Backbone.Collection.extend({
        // ** YQL template
        YQL_URL : "https://query.yahooapis.com/v1/public/yql?q=<%=query%>&format=<%=outputformat%>",
        YQL_SQL : "select * from rss where url=\"<%= qcondition %>\" <%= limits %>",
        // ** static top news rss url
        YAHOO_TOP_NEWS_URL : "http://news.yahoo.com/rss/",
        GOOGLE_TOP_NEWS_URL: "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss",

        // **
        model : Backbone.News.Model,
        /**
        {
            source : <google, yahoo, all>,
            text   : <query>,
            lat    : Latitude,
            lang   : Langitude
        }
        */
        initialize : function(opt){
            _.extend(this, opt);
            // construct query url
            var _url = _.template(this.YQL_URL);

            var _qcondition = "";

            if (this.source == "google"){
                _qcondition += this.GOOGLE_TOP_NEWS_URL;
            } else {
                _qcondition += this.YAHOO_TOP_NEWS_URL;
            }

            var _sql = _.template(this.YQL_SQL);
            // Apply template
            var _outputSQL = _sql({
                qcondition : _qcondition,
                limits : ""
            });

            this.url = _url({
                query : encodeURIComponent(_outputSQL),
                outputformat : "json"
            });
        },
        parse : function(data){
            console.log(data);
        }
    });
});
