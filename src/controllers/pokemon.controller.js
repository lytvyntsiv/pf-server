import Pokemon from "../models/pokemon.schema";

class PokemonController {
  static async getAllPokemons(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const skip = (page - 1) * limit;

      const [pokemons, totalPokemons] = await Promise.all([
        Pokemon.find().skip(skip).limit(limit),
        Pokemon.countDocuments(),
      ]);

      res.status(200).json({
        pokemons,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalPokemons / limit),
          totalItems: totalPokemons,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default PokemonController;
