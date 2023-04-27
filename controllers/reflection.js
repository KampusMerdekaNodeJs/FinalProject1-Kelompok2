const model = require("../models/reflection");

const getlist = async (req, res, next) => {
    try {
        const data = req.body.UserId;
        const result = await model.getall(data);
        const reflections = result.rows;
        res.json(reflections);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};



const postData = async (req, res, next) => {
    const data = req.body;
    console.log(req.body.UserId);
    data.UserId = req.body.UserId;
    console.log(data);
    const result = await model.insertref(data);
    try {
        return res.status(201).json({
            status: 201,
            message: "reflections added successfully",
            data: result.rows
        });
    } catch (error) {
        return next(error);
    }
};

const updateDataById = async (req, res, next) => {
    const data = req.body;
    data.id = req.params.id;
    data.UserId = req.body.UserId;
    const result = await model.updateref(data);
    try {
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Data not found or unauthorized to update' });
        }

        return res.json({
            status: 200,
            message: 'Data updated successfully',
            data: result.rows,
        });
    } catch (error) {
        return next(error);
    }
};
const deleteDataById = async (req, res, next) => {
    const data = req.body;
    data.id = req.params.id;
    data.UserId = req.body.UserId;
        const result = await model.deleteref(data);
    try {
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Data not found or unauthorized to delete' });
        }

        return res.json({
            status: 200,
            message: 'Data deleted successfully',
            data: result.rows,
        });
    } catch (error) {
        return next(error);
    }
};



module.exports = { getlist, postData, updateDataById, deleteDataById }