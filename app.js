function app(res, data) {

    // TODO: get data from DB
    
    res.render('./index.ejs',
    {
        name: "Vincent",
        data
    });
}

module.exports =  {app};