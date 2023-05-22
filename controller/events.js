const Event = require("../models/Events");
const {bodyValidation, checkAvailableEvent} = require("../middleware/validations");
const Users = require("../models/Users");

const eventsManagement = {
    createEvent: async function (req,res){
        try{
            const data = req.body
            const date = new Date()
        if(await bodyValidation(data) === true){
            const newEvent = new Event({
                title: data.title,
                shortDescription: data.shortDescription,
                description: data.description,
                date: data.date,
                organizer: data.organizer,
                location: data.location,
                active: true,
                createdAt: `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`,
            })
            newEvent.save()

            return res.status(200).send(newEvent)
        }
        else return res.status(500).send("Faltan campos por llenar.")
    }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }

    },
    getEvents: async function (req,res){
        try{
            const events = await Event.find()
            res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }
    },
    getEventsById: async function(req,res){
        try{
            const events = await Event.findOne({_id: req.params.id})
            res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
    },
    getMonthlyEvents: async function(req,res){
        try{
            if(!req.body.month)return res.status(200).send("Seleccione un mes (número)")
            const events = await Event.find({'date.month': req.body.month})
            return res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
    },
    getDailyEvents: async function(req,res){
        try{
            if(!req.body.day) return res.status(200).send("Seleccione un día")
            const events = await Event.find({'date.day': req.body.day})
            return res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
    },
    setPublicEvent: async function(req,res){
        try{
        const data = req.body
        if(!data.id) return "Debe ingresar un ID."

        const event = await Event.updateOne({_id: data.id}, {status: "public"})
        res.status(200).send(event)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
    },
    unsubscribeEvent: async function(req,res){
        try{
        const data = req.body
        if(!data.id) return "Debe ingresar un ID."

        const event = await Event.updateOne({_id: data.id}, {active: false})
        res.status(200).send(event)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
    },
    getActiveEvents: async function(req,res){
        try{
        const events = await Event.find({active: true, status: "public"})
        res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  

    },
    getUnactiveEvents: async function(req,res){
        try{
        const events = await Event.find({active: false})
        res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  

    },
    updateEvent: async function(req,res){
        try{
        const data = req.body
        if(!data.id) return "Ingrese un ID."
        if(bodyValidation(data) === true){
        const event = await Event.updateOne({_id: data.id}, {
            title: data.title,
            shortDescription: data.shortDescription,
            description: data.description,
            date: data.date,
            organizer: data.organizer,
            location: data.location,
        })
        return res.status(200).send(event)
    }
    else return res.status(500).send("Faltan campos por llenar.")
}
catch(error){
    console.error(error)
    return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
}  
    },
    assistEvent: async function(req,res){
        try{
        if(!req.params.id) return res.status(404).send("Ingrese un ID.")
        const events = await Event.findOne({_id: req.params.id})
          
        if(checkAvailableEvent(events.date) === true){

            await Event.updateOne(
                { _id: req.params.id },
                { $push: { assist: {
                    userId: props.user.id,
                    userMail: props.user.email
                }} }
              );
              await Users.updateOne({_id: props.user.id}, {
                $push:{
                    events: req.params.id
                }
              })
              return res.status(200).send("Assist confirmed!")
        }
        return res.status(500).send("no ingreso al if.")
        
       res.status(200).send(events)
    }
    catch(error){
        console.error(error)
        return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
    }  
    },
    searchEvent: async function (req, res) {
        const user = await Event.find();
        let filterEvent = [];
    
        user.forEach((events) => {
          if (
            events.shortDescription.toLowerCase().includes(req.params.search.toLowerCase())
          )
          filterEvent.push(events);
          else if (
            events.organizer.toLowerCase().includes(req.params.search.toLowerCase())
          )
          filterEvent.push(events);
          else if (
            events.location.toLowerCase().includes(req.params.search.toLowerCase())
          )
          filterEvent.push(events);
          else if (
            events.title.toLowerCase().includes(req.params.search.toLowerCase())
          )
          filterEvent.push(events);
        });
    
        res.send(filterEvent);
      },
      getPublicEvents: async function(req,res){
        try{
        const events = await Event.find({status: "public"})
        return res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
      },
      getPrivateEvents: async function(req,res){
        try{
        const events = await Event.find({status: "private"})
        return res.status(200).send(events)
        }
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
      },
      getUserEvents: async function(req,res){
        try{const events = await Event.find({ "assist.userId": props.user.id, status: "public"})
        return res.status(200).send(events)}
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        }  
      },
      getUserActiveEvents: async function(req,res){
        try{const events = await Event.find({ "assist.userId": props.user.id, active: true, status: "public"})
        return res.status(200).send(events)}
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        } 

      },
      getUserUnactiveEvents: async function(req,res){
        try{const events = await Event.find({ "assist.userId": props.user.id, active: false, status: "public"})
        return res.status(200).send(events)}
        catch(error){
            console.error(error)
            return res.status(500).json({error: 'Ha ocurrido un error en el servidor.'})
        } 

      },
      deleteAll: async function(req,res){
        try {
            const events = await Event.deleteMany();
      
            res.status(200).send("Deleted!");
          } catch (error) {
            res.status(500).send(error);
          }
      }
}

module.exports = eventsManagement