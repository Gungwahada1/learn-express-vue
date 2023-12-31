// USING JOI NEW VERSION
const Joi = require("joi");

module.exports = {
  async register(req, res, next) {
    try {
      const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      });

      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      if (error.details) {
        const errorDetails = error.details[0];

        if (errorDetails.context.key === "email") {
          res.status(400).send({
            error: "You must provide a valid email address",
          });
        } else if (errorDetails.context.key === "password") {
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length`,
          });
        } else {
          res.status(400).send({
            error: "Invalid registration information",
          });
        }
      } else {
        res.status(400).send({
          error: "Invalid registration information",
        });
      }
    }
  },
};

// USING JOI OLDER VERSION
// const Joi = require("joi");

// module.exports = {
//   register(req, res, next) {
//     const schema = {
//       email: Joi.string().email(),
//       password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
//     };

//     const { error, value } = Joi.validate(req.body, schema);

//     if (error) {
//       switch (error.details[0].context.key) {
//         case "email":
//           res.status(400).send({
//             error: "You must provide a valid email address",
//           });
//           break;
//         case "password":
//           res.status(400).send({
//             error: `The password provided failed to match the following rules:
//           <br>
//           1. It must contain ONLY the following characters: lower case, upper case, numerics
//           <br>
//           2. It must be at least 8 characters in length and not greater than 32 characters in length
//         `,
//           });
//         default:
//           res.status(400).send({
//             error: "Invalid registration information",
//           });
//           break;
//       }
//     } else {
//       next();
//     }
//   },
// };
