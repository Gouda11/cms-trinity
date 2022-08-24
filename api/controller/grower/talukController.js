import Taluk from '../../models/talukModel.js';


// const checkID = (req, res, next, val) => {
//     console.log('id - ' + val);
//     if (req.params.id * 1 > taluk.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     next();
// }

// const checkBody = (req, res, next) => {
//     console.log('id - ' + req);
//     if (!req.body.name) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name'
//         })
//     }
//     next();
// }
const createTaluk = async(req, res) => {
    try {
        const newTaluk = await Taluk.create(req.body);
        res.status(201).json({
            status: true,
            data: {
                taluk: newTaluk,
                message: 'Taluk Created Successfully.'
            }
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error

        })
    }

}
const getAllTaluk = async(req, res) => {
    try {
        const taluks = await Taluk.find();
        res.status(200).json({
            status: true,
            results: taluks.length,
            data: {
                taluks
            }
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error
        });
    }

}
const getTaluk = async(req, res) => {
    try {
        const taluks = await Taluk.findById(req.params.id);
        //Taluk.findOne({ id: req.params.id });
        res.status(200).json({
            status: true,
            results: taluks.length,
            data: {
                taluks
            }
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error
        });
    }

}

const updateTaluk = async(req, res) => {
    try {
        const taluks = await Taluk.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            upsert: true
        });
        res.status(200).json({
            status: true,
            results: taluks.length,
            data: {
                taluks
            }
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error
        });
    }
}

const deleteTaluk = async(req, res) => {
    try {
        const taluks = await Taluk.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: true,
            message: "Taluk Deleted Successfully!"
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error
        });
    }
}

export {
    createTaluk,
    getAllTaluk,
    getTaluk,
    updateTaluk,
    deleteTaluk,
    // checkID,
    // checkBody
}
