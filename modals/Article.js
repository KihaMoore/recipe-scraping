var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    link: {
        type: String,
        require: true
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;