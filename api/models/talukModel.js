import mongoose from "mongoose";

const TalukSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A taluk must have name'],
        unique: [true, 'A taluk must be unique']
    }
});

const Taluk = mongoose.model('Taluk', TalukSchema);

export default Taluk;
// const testTaluk = new Taluk({
//     name: ""
// })
// testTaluk.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log('ERR -' +
//         err);
// })
