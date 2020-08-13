const {
  createRatingService,
  averageMenuRatingService,
  listCommentsMenuService,
} = require('../services/ratingServices/');

class RatingController {
  async create(req, res) {
    const { avaliacao, student_id, comentario } = req.body;
    const { id: menuId } = req.params;

    try {
      const result = await createRatingService.handle(
        menuId,
        student_id,
        avaliacao,
        comentario
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async average(req, res) {
    try {
      const { id } = req.params;
      const average = await averageMenuRatingService.handle(id);
      return res.status(200).json(average);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listComments(req, res) {
    try {
      const { id } = req.params;
      const { skip, limit } = req.query;
      const comments = await listCommentsMenuService.handle(id, skip, limit);

      return res.status(200).json(comments);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new RatingController();
