import Grower from "../../models/growerModel.js";
import APIFeature from "../../utils/apiFeatures.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";

const createGrower = catchAsync(async(req, res) => {
    const newGrower = await Grower.create(req.body);
    res.status(201).json({
        status: true,
        data: {
            taluk: newGrower,
            message: "Grower Created Successfully.",
        },
    });

});


const getAllGrower = catchAsync(async(req, res) => {
    // EXECUTE QUERY
    console.log(req);
    const features = new APIFeature(Grower.find(), req.query)
        .filter()
        .limitField()
        .paginate()
        .sort();
    const growerlist = await features.query;
    console.log(growerlist);
    // SEND RESPONSE
    res.status(200).json({
        status: true,
        results: growerlist.length,
        data: {
            growerlist,
        },
    });
});
const getGrower = catchAsync(async(req, res) => {
    const grower = await Grower.findById(req.params.id);
    //Taluk.findOne({ id: req.params.id });
    console.log(grower)
    if (!grower) {
        return next(new AppError('No grower found with that ID', 404));
    }
    res.status(200).json({
        status: true,
        results: grower.length,
        data: {
            grower,
        },
    });

});

const updateGrower = catchAsync(async(req, res) => {
    const grower = await Grower.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        upsert: true,
    });
    if (!grower) {
        return next(new AppError('No grower found with that ID', 404));
    }
    res.status(200).json({
        status: true,
        data: {
            grower,
        },
    });
});

const deleteGrower = catchAsync(async(req, res) => {
    const grower = await Grower.findByIdAndDelete(req.params.id);
    if (!grower) {
        return next(new AppError('No grower found with that ID', 404));
    }
    res.status(204).json({
        status: true,
        message: "Grower Deleted Successfully!",
    });

});

// const getTourStats = catchAsync(async(req, res, next) => {
//     const stats = await Tour.aggregate([{
//             $match: { ratingsAverage: { $gte: 4.5 } }
//         },
//         {
//             $group: {
//                 _id: { $toUpper: '$difficulty' },
//                 numTours: { $sum: 1 },
//                 numRatings: { $sum: '$ratingsQuantity' },
//                 avgRating: { $avg: '$ratingsAverage' },
//                 avgPrice: { $avg: '$price' },
//                 minPrice: { $min: '$price' },
//                 maxPrice: { $max: '$price' }
//             }
//         },
//         {
//             $sort: { avgPrice: 1 }
//         }
//         // {
//         //   $match: { _id: { $ne: 'EASY' } }
//         // }
//     ]);

//     res.status(200).json({
//         status: 'success',
//         data: {
//             stats
//         }
//     });
// });

// const getMonthlyPlan = catchAsync(async(req, res, next) => {
//     const year = req.params.year * 1; // 2021

//     const plan = await Tour.aggregate([{
//             $unwind: '$startDates'
//         },
//         {
//             $match: {
//                 startDates: {
//                     $gte: new Date(`${year}-01-01`),
//                     $lte: new Date(`${year}-12-31`)
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: { $month: '$startDates' },
//                 numTourStarts: { $sum: 1 },
//                 tours: { $push: '$name' }
//             }
//         },
//         {
//             $addFields: { month: '$_id' }
//         },
//         {
//             $project: {
//                 _id: 0
//             }
//         },
//         {
//             $sort: { numTourStarts: -1 }
//         },
//         {
//             $limit: 12
//         }
//     ]);

//     res.status(200).json({
//         status: 'success',
//         data: {
//             plan
//         }
//     });
// });



export {
    createGrower,
    getAllGrower,
    getGrower,
    updateGrower,
    deleteGrower,
    // checkID,
    // checkBody
};
