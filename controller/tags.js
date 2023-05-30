const Event = require("../models/Events");
const Tag = require("../models/Tags")


const tagsManagement = {
createTag: async function(req,res){
    try{
        const data = req.body
        const newTag = await new Tag({
            name: data.name,
        })
        newTag.save()
        res.status(200).send(newTag)
    }
    catch(error){
        res.status(500).send(error)
    }
},
getAllTags: async function(req,res){
  try{
    const tag = await Tag.find()
    res.status(200).send(tag)
  }
  catch(error){
    res.status(500).send(error)
  }
},
clearEventsTag: async function(req,res){
  try{
    await Event.updateOne({_id: req.params.id}, {tags: []})
    res.status(200).send("Borrados")
  }
  catch{}
},
addEvent: async function(req,res){
    try{
      const events = await Event.find({tags: {$in:{id: req.body.id}}})
      if(events.length === 0){
        await Event.updateOne(
            { _id: req.params.id },
            { $push: { tags: {
                id: req.body.id
            }} }
          );

          await Tag.updateOne(
            {_id: req.body.id},
            {$push: {events: req.params.id}}
          )
          res.status(200).send("Agregados")
      }
      else{res.status(200).send("El tag ya fue agregado.")}
    }
    catch(error){
        res.status(500).send(error)
    }
},
filterByTag: async function(req,res){
  try{

    const events = await Event.find({tags: {$in:{id: req.body.id}}})

    res.status(200).send(events)
  }
  catch{
    res.status(500).send(error)
  }
}
}

module.exports = tagsManagement