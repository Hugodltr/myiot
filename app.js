function app(res) {

    

    res.render('./index.ejs',
    {
        name: "Vincent"
    });
}

module.exports =  {app};