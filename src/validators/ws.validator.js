import Joi from "joi";

export const connectSchema = Joi.object({
  user_id: Joi.string().length(24).hex().required(),
});

export const startGameSchema = Joi.object({
  user_id: Joi.string().length(24).hex().required(),
  pokemon: Joi.object({
    name: Joi.object({
      english: Joi.string().required(),
      japanese: Joi.string().required(),
      chinese: Joi.string().required(),
      french: Joi.string().required(),
    }).required(),
    base: Joi.object({
      Sp: Joi.object().optional(),
      HP: Joi.number().integer().required(),
      Attack: Joi.number().integer().required(),
      Defense: Joi.number().integer().required(),
      Speed: Joi.number().integer().required(),
    }).required(),
    evolution: Joi.object({
      prev: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    profile: Joi.object({
      height: Joi.string().required(),
      weight: Joi.string().required(),
      egg: Joi.array().items(Joi.string()).optional(),
      ability: Joi.array()
        .items(
          Joi.array().ordered(
            Joi.string().required(),
            Joi.string().valid("true", "false").required(),
          ),
        )
        .optional(),
      gender: Joi.string().optional(),
    }).required(),
    image: Joi.object({
      sprite: Joi.string().uri().required(),
      thumbnail: Joi.string().uri().required(),
      hires: Joi.string().uri().required(),
    }).required(),
    _id: Joi.string().length(24).hex().required(),
    pokemon_id: Joi.number().integer().required(),
    type: Joi.array().items(Joi.string()).required(),
    species: Joi.string().required(),
    description: Joi.string().required(),
    __v: Joi.number().integer().required(),
  }).required(),
});

export const attackSchema = Joi.object({
  user_id: Joi.string().length(24).hex().required(),
  attacker: Joi.object({
    pokemon_id: Joi.number().integer().required(),
  }).required(),
  defender: Joi.object({
    pokemon_id: Joi.number().integer().required(),
  }).required(),
  playerHP: Joi.number().integer().min(0).required(),
  computerHP: Joi.number().integer().min(0).required(),
});
