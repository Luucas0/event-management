const { validateToken } = require("../config/auth");
const jwt = require('jsonwebtoken');


const validations = {
    bodyValidation: async function(data){

        const requiredFields = ['title', 'shortDescription', 'description', 'date', 'organizer', 'location'];
        const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) return false
    else return true
    },
    checkAvailableEvent: function(data){
      const date = new Date()

      const month = parseInt(data.month)
      const day = parseInt(data.day)
      const year = parseInt(data.year)

        if(month >= date.getUTCMonth() + 1 && year >= date.getFullYear()){
          if(month === date.getUTCMonth()){
            if(day >= date.getDate()){
              return true
            }
          }

          return true
        }
        else{
          return false
        }
    },
    validateAuth: async function(req, res, next) {
        if (!req.headers.cookie) return res.sendStatus(401);
        
        const cookies = req.headers.cookie.split('; ');
        let token = '';
        
        cookies.forEach(cookie => {
          if (cookie.startsWith('token=')) {
            token = cookie.replace('token=', '');
          }
        });
        
        try {
          const decoded = jwt.verify(token, process.env.SECRET);
          props = decoded;
          
          if (!props) return res.sendStatus(401);
          next();
        } catch (error) {
          return res.sendStatus(401);
        }
      },
      validateAdmin: async function(req, res, next) {
        if (props.user.role === "admin") {
          next();
        } else {
          return res
            .status(401)
            .send("You need to be an administrator to perform this task");
        }
      }
}

module.exports = validations;

