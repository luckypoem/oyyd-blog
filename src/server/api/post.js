const router = require('koa-router')();

const post = require('../model/post');
const verify = require('../utils/verify');

const timeFormat = require('../utils/time_format');

router.get('/post/title', function*(next){
  var titles = [];

  yield function(cb){
    post.db.findAll({
      attributes: ['id', 'title']
    }).then(function(data){
      for(var i=0;i<data.length;i++){
        titles.push(data[i].dataValues);
      }
      cb();
    });
  };

  this.body = titles;

  yield next;
});

router.get('/post/:id', function*(next){
  var thePost = null;
  var id = this.params.id;

  yield function(cb){
    post.db.findOne({
      where:{
        id: id
      }
    }).then(function(data){
      if(data){
        thePost = data.dataValues;        
      }
      cb();
    });
  }

  this.body = thePost;
  yield next;
});

router.post('/post', function*(next){
  var params = this.request.body;
  if(!verify(params.key)){
    this.response.status = 403;
    return;
  }
  
  yield function(cb){
    console.log(params.id);
    if(params.id){
      // find and update
      post.db.findOne({
        where:{
          id: params.id
        }
      }).then(function(data){
        if(data){
          data.updateAttributes({
            title: params.title,
            content: params.content,
            tags: params.tags,
          }).then(function(){
            cb();
          });
        }
      });
    }else{
      // create
      post.db.create({
        title: params.title,
        content: params.content,
        tags: params.tags,
        createdTime: timeFormat(new Date())
      }).then(function(){
        cb();
      });
    }
  };

  this.response.status = 200;
  yield next;
});

module.exports = router;