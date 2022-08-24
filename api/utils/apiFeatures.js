 export default class APIFeature {
     constructor(query, queryString) {
         this.query = query;
         this.queryString = queryString;
     }
     filter() {
         // 1. Filtering
         const queryObj = {...this.queryString };
         const excludedFields = ["page", "sort", "limit", "fields"];
         excludedFields.forEach((el) => delete queryObj[el]);
         // console.log(req.query, queryObj)
         // 2.Advanced Filtering
         let queryStr = JSON.stringify(queryObj);
         queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`);
         // console.log(JSON.parse(queryStr));
         this.query = this.query.find(JSON.parse(queryStr));
         return this;
     }
     sort() {
         // 3. Sorting
         if (this.queryString.sort) {
             // query = query.sort(req.query.sort);
             // sort("Ratings worthy")
             // http://localhost:8000/api/v1/growers?village=Ukkunda&grower_cat[gt]=1&sort=-grower_cat
             let sortBy = this.queryString.sort.split(",").join(" ");
             this.query = this.query.sort(sortBy);
         } else {
             this.query = this.query.sort("-created_at");
         }
         return this;
     }
     limitField() {
         // 4 Field limiting
         if (this.queryString.fields) {
             //http://localhost:8000/api/v1/growers?fields=lname,fname,village
             const fields = this.queryString.fields.split(",").join(" ");
             this.query = this.query.select(fields);
         } else {
             this.query = this.query.select("-__v");
         }
         return this;
     }

     paginate() {
         const page = this.queryString.page * 1 || 1;
         const limit = this.queryString.limit * 1 || 20;
         const skip = (page - 1) * limit;
         this.query = this.query.skip(skip).limit(limit);
         return this;
         // if (this.queryString.page) {
         //     const numGrowers = await Grower.countDocuments();
         //     if (skip >= numGrowers) throw new Error('This page does not exist');
         // }
     }
 }
 //export default APIFeature;
