const {
  createUserService,
  listUserService,
  updateUserService,
  deleteUserService,
} = require('../services/userServices');

class User {
  async create(req, res) {
    const { nome, email, password } = req.body;

    try {
      const user = await createUserService.handle({ nome, email, password });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(409).json({ error: error.message });
    }
  }

  async list(req, res) {
    const { skip, limit } = req.query;
    try {
      const users = await listUserService.handle(skip, limit);

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { nome, oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
      await updateUserService.handle(id, nome, oldPassword, newPassword);
      return res
        .status(200)
        .json({ sucesso: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await deleteUserService.handle(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new User();
