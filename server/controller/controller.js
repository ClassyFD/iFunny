const moment = require('moment');
module.exports = {
  
  //GET REQUESTS
  getTopComments: (req, res)=>{ // getting top comments by url meme id
    let db = req.app.get('db'),
        meme = req.params.id;
    db.getTopComments([meme]).then((response)=>{ // gets the top comments
      res.status(200).send(response);
    })
  },
  getMainSearches: (req, res)=>{ // getting popular seatches within certain date.
    let db = req.app.get('db'),
        date = req.query.date;
    db.getMainSearches([date]).then((response)=>{ // gets the popular searches.
      res.status(200).send(response);
    })
  },
  getUserSearchResults: (req, res)=>{ // getting usernames by user input
    let db = req.app.get('db'),
        user = req.query.user;
    db.getUserSearchResults([user]).then((response)=>{ // gets the usernames from the search option.
      res.status(200).send(response);
    })
  },
  getRecentSearches: (req, res)=>{ // getting recent searches by user id.
    let db = req.app.get('db'),
        user = req.query.user;
    if (user === 'popular') {
      let date = new Date();
      date = moment(date).subtract(30, 'days').utc().format('MM-DD-YYYY');
      db.getTrendingTags([date]).then((response)=>{ // If user has no searches or there is no user, get the trending tags instead
        res.status(200).send(response);
      });
    } else {
      db.getRecentSearches([user]).then((response)=>{ // If there is a user, get the recent searches by that user.
        res.status(200).send(response);
      })
    }
  },
  getSearchResults: (req, res)=>{ // getting tags by user input.
    let db = req.app.get('db'),
        tag = req.query.tag.replace(/\s/g,'');
    db.getSearchResults([tag]).then((response)=>{ // gets the tags based on the search option.
      res.status(200).send(response);
    })
  },
  getResults: (req, res)=>{ // getting number of results found by tag.
    let db = req.app.get('db'),
        tag = req.query.tag;
    db.getResults([tag]).then((response)=>{ // gets the count of tags.
      res.status(200).send(response);
    })
  },
  getMemesByTag: (req, res)=>{ // getting memes by tag.
    let db = req.app.get('db'),
        tag = req.query.tag,
        limit = req.query.limit;
    db.getMemesByTag([tag, limit]).then((response)=>{ // gets the memes by the tag. (also has a limit depending on how many memes are being displayed.)
      res.status(200).send(response);
    })
  },
  getTrendingTags: (req, res)=>{ // getting tags by number of times they appear within certain date.
    let db = req.app.get('db'),
        date = req.query.date;
    db.getTrendingTags([date]).then((response)=>{ // gets the trending tags. (original date is 30 days, then 90, then it grabs all of the tags.)
      res.status(200).send(response);
    });
  },
  checkLikes: (req, res)=>{ // getting liked memes by user id.
    let db = req.app.get('db'),
        user = req.params.userid,
        offset = req.query.offset;
    db.checkAllLikes([user, offset]).then((response)=>{ // checks to see if multiple memes are liked. (offset is actually a limit.)
      res.status(200).send(response);
    })
  },
  getMemes: (req, res)=>{ // getting memes to display in collective.
    let db = req.app.get('db'),
        limit = req.query.limit;
      db.getMemes([limit]).then((response)=>{ // gets the memes depending on the amount being displayed.
        res.status(200).send(response);
      });
  },
  getFeaturedMemes: (req, res)=>{ // getting memes to display in featured.
    let db = req.app.get('db'),
        limit = req.query.limit;
    db.getFeaturedMemes([limit]).then((response)=>{ // gets the memes with a featured status.
      res.status(200).send(response);
    })
  },
  checkMemeLikes: (req, res)=>{ // getting liked memes by user and meme id.
    let db = req.app.get('db'),
    user = req.params.userid,
        meme = req.params.memeid;
    db.checkLikes([user, meme]).then((response)=>{ // checks to see if the one meme is liked.
      if (response[0]) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    })
  },
  checkCommentLikes: (req, res)=>{ // getting liked comments by user id and meme id
    let db = req.app.get('db'),
        user = req.params.userid,
        meme = req.params.memeid,
        offset = req.query.offset;
    db.checkCommentLikes([user, meme, offset]).then((response)=>{ // checks to see which comments are liked.
      res.status(200).send(response);
    })
  },
  getReplies: (req, res)=>{ // getting replies by comment id.
    let db = req.app.get('db'),
        id = req.params.id,
        limit = req.query.limit;
    db.getReplies([id, limit]).then((response)=>{ // gets the replies from a certain comment. (limit will adjust based on state.)
      res.status(200).send(response);
    })
  },
  getMemeDetails: (req, res)=>{ // getting meme details by meme id. (picture, caption, tags, comments, etc.)
    let db = req.app.get('db'),
        id = req.params.id,
        query = req.query.commentPage,
        obj = {},
        meme_id,
        prev_id,
        next_id;
    let TC1 = 0,
        TC2 = 0;
    if (req.query.tc1 !== 'undefined') {
      TC1 = req.query.tc1;
    }
    if (req.query.tc2 !== 'undefined') {
      TC2 = req.query.tc2;
    }
    db.getMemeDetails([id]).then((response)=>{ // getting the meme itself. (picture, caption, etc.)
      meme_id = response[0].meme_id;
      obj = Object.assign({}, obj, {details:response[0]});
      db.getMemeTags([meme_id]).then((response)=>{ // getting the tags to display for a meme.
        obj = Object.assign({}, obj, {tags:response})
        db.getMemeComments([id, (query-1)*10, TC1, TC2]).then((response)=>{ // getting the (regular & top) comments to display for a meme. (limited by page.)
          obj = Object.assign({}, obj, {}, {comments:response});
          db.getSideMemes([id]).then((response)=>{ // getting memes to display so that users can click arrows to cycle through memes.
            if (response[0].next_id) {
              next_id = response[0].next_id;
            }
            if (response[0].prev_id) {
              prev_id = response[0].prev_id;
            }
            if (prev_id && next_id) {
              obj = Object.assign({}, obj, {prev_id, next_id})
              res.status(200).send(obj);
            } else if (!prev_id) {
              db.getLastMeme().then((response)=>{ // getting the very last meme for whenever a user is on the first meme and they click the back arrow.
                obj = Object.assign({}, obj, {prev_id:response[0].id, next_id});
                res.status(200).send(obj);
              })
            } else {
              db.getFirstMeme().then((response)=>{ // getting the very first meme for whenever a user is on the last meme and they click the forward arrow.
                obj = Object.assign({}, obj, {prev_id, next_id:response[0].id});
                res.status(200).send(obj);
              })
            }
          })
        })
      })
    })
  },
  getUserProfile: (req, res)=>{ // getting profile page by user id.
    let db = req.app.get('db'),
        user = req.params.id;
    db.getUserProfile([user]).then((response)=>{
      res.status(200).send(response);
    })
  },

  // DELETE REQUESTS
  deleteRecentSearches: (req, res)=>{ // deleting recent searches by user.
    let db = req.app.get('db'),
        user = req.query.user;
    db.deleteRecentSearches([user]).then((response)=>{ // deletes the searches. (if they are deleted, popular searches will be displayed instead.)
      res.status(200).send(response);
    })
  },
  deleteComment: (req, res)=>{ // deleting comment by meme and or reply id. (also deletes any comment likes/replies associated with that comment to clean up any extra stuff.)
    let db = req.app.get('db'),
        id = req.query.id,
        type = req.query.type,
        memeid = req.params.memeid,
        replyid = req.params.replyid;
    if (type === 'topreply' || type === 'reply') { // If the comment is a reply, it will only have to delete that reply and its likes.
      db.deleteCommentLike([id]).then((response)=>{ // deletes the reply likes.
        db.deleteComment([id]).then((response)=>{ // deletes the actual reply.
          db.updateMemeRepliesCount([replyid]).then((response)=>{ // updates the comment table's number of replies.
            res.status(200).send(response);
          })
        })
      })
    } else { // If the comment is not a reply, It will have to delete any replies, reply likes, and its own comment likes.
      db.getCommentLikesToDelete([id]).then((response)=>{ // gets all of the replies so that it can delete all of the reply likes.
        if (response) {
          response.map((el, i)=>{ 
            db.deleteCommentLike([el.id]); // maps through all of the replies and deletes all the reply likes.
          })
        }
        db.deleteCommentLike([id]).then((response)=>{ // deletes the actual comment's likes.
          db.deleteReplies([id]).then((response)=>{ // deletes all of the replies.
            db.deleteComment([id]).then((response)=>{ // deletes the actual comment itself.
              db.updateMemeCommentsCount([memeid]).then((response)=>{ // updates the meme table's number of comments.
                res.status(200).send(response);
              })
            })
          })
        });
      })
    }
  },
  deleteMeme: (req, res)=>{ // deleting meme by id (also deletes any likes, comment likes, comments/replies associated with that meme to clean up any extra stuff.)
    let db = req.app.get('db'),
        memeid = req.params.memeid,
        exactid = req.params.exactid;
    db.deleteAllCommentLikes([memeid]).then((response)=>{ // deletes all of the likes on any comment/reply for that meme.
      db.deleteAllComments([memeid]).then((response)=>{ //  deletes all of the comments/replies for that meme.
        db.deleteAllTags([exactid]).then((response)=>{ // deletes all of the tags for that meme.
          db.deleteAllLikes([memeid]).then((response)=>{ // deletes all of the likes for that meme.
            db.deleteMeme([memeid]).then((response)=>{ // deletes the actual meme itself.
              res.status(200).send(response);
            })
          })
        })
      })
    });
  },

  // POST REQUESTS
  likeMeme: (req, res)=>{ // posts a meme like into the db.
    let db = req.app.get('db'),
    user = req.body.user,
    meme = req.params.memeid,
    date = new Date(),
        type = req.body.type,
        obj = {};
        db.likeMeme([date, user.id, meme]).then((response)=>{ // likes the meme. (posts a like row into the db.)
          db.updateMemeLikes([meme]).then((response)=>{ // updates the amount of likes that a meme has
            if (type >= 0) {
              db.getMemes([type]).then((response)=>{ // gets multiple memes instead of only one.
                res.status(200).send(response);
              })
            } else {
              db.getMemeDetails([meme]).then((response)=>{ // gets only the one meme and its details.
            res.status(200).send(response);
          })
        }
      })
    })
  },
  unlikeMeme: (req, res)=>{ // deletes a meme like in the db.
    let db = req.app.get('db'),
        user = req.body.user,
        meme = req.params.memeid,
        type = req.body.type,
        obj = {};
    db.unlikeMeme([user.id, meme]).then((response)=>{ // unlikes the meme. (deletes a like from the db.)
      db.updateMemeUnlikes([meme]).then((response)=>{ // updates the amount of likes that the meme has.
        if (type >= 0) {
          db.getMemes([type]).then((response)=>{ // gets multiple memes instead of only one.
            res.status(200).send(response);
          })
        } else {
          db.getMemeDetails([meme]).then((response)=>{ // gets only the one meme and its details
            res.status(200).send(response);
          })
        }
      })
    })
  },
  profileLikeMeme: (req, res)=>{ // posts a meme like into the db.
    let db = req.app.get('db'),
    user = req.body.user,
    meme = req.params.memeid,
    date = new Date(),
        type = req.body.type,
        obj = {};
        db.likeMeme([date, user.id, meme]).then((response)=>{ // likes the meme. (posts a like row into the db.)
          db.updateMemeLikes([meme]).then((response)=>{ // updates the amount of likes that a meme has
            if (type >= 0) {
              db.getUserProfile([user.id]).then((response)=>{ // gets multiple memes instead of only one.
                res.status(200).send(response);
              })
            } else {
              db.getMemeDetails([meme]).then((response)=>{ // gets only the one meme and its details.
            res.status(200).send(response);
          })
        }
      })
    })
  },
  profileUnlikeMeme: (req, res)=>{ // deletes a meme like in the db.
    let db = req.app.get('db'),
        user = req.body.user,
        meme = req.params.memeid,
        type = req.body.type,
        obj = {};
    db.unlikeMeme([user.id, meme]).then((response)=>{ // unlikes the meme. (deletes a like from the db.)
      db.updateMemeUnlikes([meme]).then((response)=>{ // updates the amount of likes that the meme has.
        if (type >= 0) {
          db.getUserProfile([user.id]).then((response)=>{ // gets multiple memes instead of only one.
            res.status(200).send(response);
          })
        } else {
          db.getMemeDetails([meme]).then((response)=>{ // gets only the one meme and its details
            res.status(200).send(response);
          })
        }
      })
    })
  },
  featuredLikeMeme: (req, res)=>{ // posts a featured meme like.
    let db = req.app.get('db'),
    user = req.body.user,
        meme = req.params.memeid,
        date = new Date(),
        type = req.body.type,
        obj = {};
        db.likeMeme([date, user.id, meme]).then((response)=>{ // likes the meme. (posts like row in the db.)
          db.updateMemeLikes([meme]).then((response)=>{ // updates the amount of likes a meme has.
            if (type >= 0) {
              db.getFeaturedMemes([type]).then((response)=>{ // gets multiple memes instead of only one.
                res.status(200).send(response);
              })
            } else {
              db.getMemeDetails([meme]).then((response)=>{ // gets only one meme and its details. (not sure if this is needed for this endpoint.)
                res.status(200).send(response);
              })
        }
      })
    })
  },
  featuredUnlikeMeme: (req, res)=>{ // deletes a featured meme like.
    let db = req.app.get('db'),
        user = req.body.user,
        meme = req.params.memeid,
        type = req.body.type,
        obj = {};
    db.unlikeMeme([user.id, meme]).then((response)=>{ // deletes the like from the db.
      db.updateMemeUnlikes([meme]).then((response)=>{ // updates the amount of likes a meme has.
        if (type >= 0) {
          db.getFeaturedMemes([type]).then((response)=>{ //gets multiple memes instead of only one.
            res.status(200).send(response);
          })
        } else {
          db.getMemeDetails([meme]).then((response)=>{ // gets only one meme and its details.
            res.status(200).send(response);
          })
        }
      })
    })
  },
  likeComment: (req, res)=>{ // posts a comment like.
    let db = req.app.get('db'),
        user = req.body.user,
        comment = req.params.commentid,
        meme = req.body.meme,
        date = new Date(),
        type = req.body.type,
        TC1 = req.body.TC1, 
        TC2 = req.body.TC2,
        offset = req.body.offset;
    db.likeComment([date, user.id, meme, comment]).then((response)=>{ // adds a row in the db for comment likes.
      db.updateCommentLikes([comment]).then((response)=>{ // updates the amount of likes a comment has in the comments table.
        res.status(200).send(type);
      })
    })
  },
  unlikeComment: (req, res)=>{ // deletes a comment like.
    let db = req.app.get('db'),
        user = req.body.user,
        comment = req.params.commentid,
        meme = req.body.meme,
        type = req.body.type,
        TC1 = req.body.TC1, 
        TC2 = req.body.TC2,
        offset = req.body.offset;
    db.unlikeComment([user.id, comment]).then((response)=>{ // deletes a row in the db for comment likes.
      db.updateCommentUnlikes([comment]).then((response)=>{ // updates the amount of likes a comment has in the comments table.
        res.status(200).send(type)
      })
    })
  },
  submitUsername: (req, res)=>{ // posts a username to check if it is taken, then inserts into the db if it is not.
    let username = (req.body.username).toLowerCase(),
        user = req.body.user,
        db = req.app.get('db');
    db.checkUsername([username]).then((response)=>{ // checks to see if the username already exists.
      if (response.length===0) {
        db.submitUsername([username, user.id]).then((response)=>{ // inserts the username into the user table.
          res.status(200).send(response);
        })
      } else {
        res.status(200).send('Username Taken');
      }
    })
  },
  postMeme: (req, res)=>{ // posts a meme into the db
    let meme = req.body.meme,
        date = req.body.date,
        db = req.app.get('db');
    db.addMeme([meme.image.Location, 0, 0, meme.tags? meme.tags.length : 0, meme.caption, meme.image.key, req.body.user.id, (req.body.user.memes+1)]).then((finish)=>{
      // updates the user table to add +1 memes. also inserts the meme into the memes table
      res.status(200).send(finish);
      if (meme.tags[0]) {
        db.addTags([meme.tags[0].label, meme.image.key, date]).then((response)=>{ // inserts the first tag into the tags table (if exists)
          if (meme.tags[1]) {
            db.addTags([meme.tags[1].label, meme.image.key, date]).then((response)=>{ // inserts the second tag into the tags table (if exists)
              if (meme.tags[2]) {
                db.addTags([meme.tags[2].label, meme.image.key, date]).then((response)=>{ // inserts the third tag into the tags table (if exists)
                  if (meme.tags[3]) {
                    db.addTags([meme.tags[3].label, meme.image.key, date]).then((response)=>{ // inserts the fourth tag into the tags table (if exists)
                      if (meme.tags[4]) {
                        db.addTags([meme.tags[4].label, meme.image.key, date]).then((response)=>{ // inserts the fifth tag into the tags table (if exists)
                           res.status(200).end();
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    });
  },
  featureMeme: (req, res)=>{ // alters a table row to set it to featured.
    let db = req.app.get('db'),
        meme = req.query.id,
        user = req.query.user;
    db.featureMeme([meme, user]).then((response)=>{ // updates the memes table to set the meme to "featured."
      console.log(response)
      res.status(200).send(response);
    })
  },
  unfeatureMeme: (req, res)=>{ // alters a table row to remove featured.
    let db = req.app.get('db'),
        meme = req.query.id, 
        user = req.query.user,
        limit = req.query.limit;
    db.unfeatureMeme([meme, user, limit]).then((response)=>{ // updates the memes table to set the meme to "regular."
      res.status(200).send(response);
    })
  },
  postRecentSearch:(req, res)=>{ // posts search by type (user/tag) on user.
    let db = req.app.get('db'),
        user = req.body.user,
        text = req.body.text,
        date = req.body.date,
        type = req.body.type;
    db.postRecentSearch([text, date, type, user]).then((response)=>{ // posts the search into the db.
      res.status(200).send(response);
    })
  },
  postComment: (req, res)=>{ // posts a comment to a meme.
    let db = req.app.get('db'),
        { user, date, comment, meme } = req.body;
    db.updateMemeComments([meme.details.id]).then((response)=>{ // updates the amount of comments that a meme has in the meme table.
      db.postComment([user.id, meme.details.id, date, comment]).then((response)=>{ // posts the comment into the comments table.
        res.status(200).send(response);
      })
    })
  },
  postReply: (req, res)=>{ // posts a reply to a comment of a meme.
    let db = req.app.get('db'),
        {user, date, comment, replyid, memeid, limit} = req.body,
        obj = {};
    console.log(req.body);
    db.postReply([date, comment, user.id, memeid, replyid]).then((response)=>{ // posts the reply into the comments table with a reply id.
      db.updateCommentReplies([replyid]).then((response)=>{ // updates the comments table to set the number of replies to +=1.
        obj = Object.assign({}, obj, {comment: response});
        db.getReplies([replyid, limit]).then((response)=>{ // gets the replies from the comments table based on the reply id.
          obj = Object.assign({}, obj, {replies: response});
          res.status(200).send(obj);
        })
      })
    })
  },
  postHeadline: (req, res)=>{
    let db = req.app.get('db'),
      {headline, user} = req.body;
    db.updateHeadline([headline, user]).then((response)=>{
      res.status(200).send(response);
    })
  }
}