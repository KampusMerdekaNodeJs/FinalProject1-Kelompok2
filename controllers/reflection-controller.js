const reflection = require("../models/reflection-model");
const AppError = require("../utils/app.error");

class ReflectionController {
  async getAllData(req, res, next) {
    try {
      const result = await reflection.findAll(req.user.id);

      res.status(200).send({
        message: "Success",
        total: result.length,
        data: result,
      });
    } catch (err) {
      next(new AppError(err.message, 404));
    }
  }

  async postData(req, res, next) {
    try {
      const resultOne = await reflection.insertOne(req.body);

      res.status(201).send({
        status: "success",
        result: {
          data: resultOne.rows,
        },
      });
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  }

  async deleteData(req, res, next) {
    try {
      console.log(req.params.id);
      const data = { id: req.params.id, owner_id: req.user.id };
      await reflection.deleteOne(data);

      res.status(204).send({
        status: "success",
        message: null,
      });
    } catch (err) {
      next(new AppError(err, 404));
    }
  }

  async updateData(req, res, next) {
    console.log(req.params.id);
    try {
      const { id } = req.params;
      req.body.owner_id = req.user.id;
      req.body.id = id;

      const result = await reflection.update(req.body);
      console.log(req.user);
      res.status(200).send({
        status: "ok",
        message: "Data has been updated",
        data: result,
      });
    } catch (error) {
      next(new AppError(error, 400));
    }
  }
}

module.exports = new ReflectionController();
