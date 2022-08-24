import mongoose from "mongoose";
import slugify from "slugify";
const GrowerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'A grower must have firstname'],
    },
    mname: {
        type: String,
        required: [true, 'A grower must have father name']
    },
    lname: {
        type: String,
        required: [true, 'a grower must have lastname']
    },
    slug: String,

    alias: {
        type: String,
        required: [true, 'A grower must have alias name']
    },
    dob: Date,
    grower_cat: {
        required: true,
        type: Number
    },
    ratings: {
        type: Number,
        required: true,
        default: 5
    },
    // contact_no: [{
    //     message: {
    //         type: String,
    //         maxlength: 10,
    //         required: [true, 'A grower must have contact no'],
    //     }
    // }],
    contact_no: {
        type: String,
        required: [true, 'A grower must have contact no'],
        maxlength: 10,
        minlength: 10,
    },
    village: {
        type: String,
        required: [true, 'A Grower must have village']
    },
    post: {
        type: String,
        required: [true, 'A Grower must have post']
    },
    taluk: {
        type: String,
        required: [true, 'A Grower must have taluk']
    },
    district: {
        type: String,
        required: [true, 'A Grower must have district']
    },
    pincode: {
        type: Number,
        required: [true, 'A grower must have pincode']
    },
    grower_id: {
        type: String,
        required: true,
        unique: [true, 'Must be unique'],
    },
    bank_name: {
        required: [true, 'A grower must have bank name'],
        type: String
    },
    branch_name: {
        required: [true, 'A grower must have branch name'],
        type: String
    },
    account_no: {
        required: [true, 'A grower must have account no.'],
        type: Number,
        unique: [true, 'Must be unique'],
    },
    ifsc_code: {
        required: [true, 'A grower must have ifsc code'],
        type: String
    },
    aadhar_no: {
        required: [true, 'A grower must have aadhar no.'],
        type: Number,
        unique: [true, 'Must be unique']
    },
    loan: {
        type: Boolean
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// tourSchema.virtual('durationWeeks').get(function() {
//   return this.duration / 7;
// });
GrowerSchema.pre('save', function(next) {
    this.slug = slugify(this.fname + this.mname + this.lname, { lower: true });
    next();
});

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
// tourSchema.pre(/^find/, function(next) {
//   this.find({ secretTour: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

// tourSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

// AGGREGATION MIDDLEWARE
// tourSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });


const Grower = mongoose.model('Grower', GrowerSchema);

export default Grower;
