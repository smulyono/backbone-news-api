define(["backbone"], function(Backbone){
    Backbone.News = Backbone.News || {};
    Backbone.News.Model = Backbone.News.Model || Backbone.Model.extend({
        title : "",
        description: "",
        link : "",
        pubDate:"",
        source : {}
    });
});
