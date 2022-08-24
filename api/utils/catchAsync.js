export default fn => {
    return (req, res, next) => {
        // console.log(next)
        // console.log(res)
        // console.log(req)
        fn(req, res, next).catch(next);
    };
};
