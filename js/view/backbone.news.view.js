define(["backbone"], function(Backbone){
    Backbone.News = Backbone.News || {};
    Backbone.News.View = Backbone.News.View || Backbone.View.extend({
        initialize : function(opt){
            _.extend(this, opt);
        },
        render : function(){
            // show loading
            this.$el.html("loading news....");
            var that = this;
            this.collection.fetch({
                success : that._afterFetching()
            });
        },
        _afterFetching : function(){
            var that = this;
            return function(){
                that.$el.html("");
                that.$el.append("<h3>" + that.collection.count + " News </h3>");
                var newsContents = [];
                for (var idx in that.collection.models){
                    var newsdatum = that.collection.models[idx];
                    var newsContent = that.template({
                        title : newsdatum.get("title"),
                        description : newsdatum.get("description"),
                        link : newsdatum.get("link")
                    });
                    newsContents.push(newsContent);
                }
                that.$el.append(newsContents.join(""));
            };
        }
    });
});
