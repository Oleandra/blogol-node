const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://nodeapp:aRmonY@clusterone.pmd7n.mongodb.net/nodeApp?retryWrites=true&w=majority'
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)

app.listen(5000)