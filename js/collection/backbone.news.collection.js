define(["backbone"], function(Backbone){
    Backbone.News = Backbone.News || {};
    Backbone.News.Collection = Backbone.News.Collection || Backbone.Collection.extend({
        // ** YQL template
        YQL_URL : "https://query.yahooapis.com/v1/public/yql?q=<%=query%>&format=<%=outputformat%>",
        YQL_SQL : "select * from rss where url=\"<%= qcondition %>\" <%= limits %>",
        // ** static top news rss url
        YAHOO_TOP_NEWS_URL : "http://news.yahoo.com/rss/<%=topic%>",
        GOOGLE_TOP_NEWS_URL: "http://news.google.com/news?q=<%=query%>&geo=<%=geo%>&topic=<%=topic%>&hl=en&output=rss&",

        // **
        model : Backbone.News.Model,
        // ** Header items information
        /**
        {
            source : <google, yahoo>,
            query  : <query>,
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
            var _tqcondition = _.template(_qcondition);
            var _outCondition = _tqcondition({
                query : this.query || "",
                geo : this.geo || "",
                topic : this.topic || ""
            });

            var _sql = _.template(this.YQL_SQL);
            // Apply template
            var _outputSQL = _sql({
                qcondition : _outCondition,
                limits : this.limits || ""
            });
            console.log(_outputSQL);

            this.url = _url({
                query : encodeURIComponent(_outputSQL),
                outputformat : "json"
            });
        },
        parse : function(data){
            this.count  = data.query.count;
            this.created= data.query.created;
            this.lang = data.query.lang;

            return data.query.results.item;
        }
    });
});
