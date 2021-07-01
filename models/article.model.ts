import {model, Schema} from 'mongoose';
import menuModel from "./menu.model";

interface Article {
    name: string,
    rid: number,
    type: number,
    price: number
}

const articleSchema = new Schema<Article>({
    name: {
        type :String,
        required: true
    },
    rid: {
        type :Number,
        required: true
    },
    type: {
        type :Number,
        required: true
    },
    price: {
        type :Number,
        required: true
    },
})

const articleModel = model('Article', articleSchema)

exports.getAllArticles = async () => {
    const articles = await articleModel.find();
    return articles;
}

exports.getOneArticle = async (req:any) => {
    const article = await articleModel.findOne( {_id: req.params.id})
    return article
}
exports.getArticlebyId = async (id:any) => {
    const article = await articleModel.findOne( {_id: id})
    return article
}

exports.getAllArticlesbyRestaurant = async (rid:number) => {
    const articles = await articleModel.find( {rid: rid});
    return articles;
}

exports.createArticle = (articleData:JSON) => {
    const article = new articleModel(articleData);
    return article.save();
};

exports.updateOneArticle = async (id:any ,body:any) => {
    const article = await articleModel.findOneAndUpdate({_id: id}, body, {
        new: true
    });
    article.save();
}

exports.deleteArticle = (articleID:any) => {
    articleModel.deleteOne({_id:articleID}, function (err){
        if (err) return console.log(err)
    })
};

export default articleModel;
