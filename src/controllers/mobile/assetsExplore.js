"use-strict";

const assetsExplore = module.exports;
var {assetstypes} = require('./config')
assetsExplore.get = async function (req, res, next) {
    const assets = {}; 
    assets.title = 'Assets';
    assets.icons={
        threadbuilder: "fa-calculator fas fa-2x",
        eaglebuilder: "fab fa-twitter fa-2x",
        articles: "fas fa-newspaper fa-2x",
        reflection:"fas fa-file-excel fa-2x",
        events:"fa fa-calendar",
    };
    assets.assetstypes = assetstypes

    assets.type = req.params;
    console.log(assets);
    

    // same as const assets = {title:'ASSETS, type : type, id: id}
	res.render('mobile/assetsExplore/index', assets);

};

assetsExplore.showassets = async function (req, res, next) {

    const assets = {};
    assets.assetstypes = assetstypes;
    assets.icons={
        threadbuilder: "fa-calculator fas fa-2x",
        eaglebuilder: "fab fa-twitter fa-2x",
        articles: "fas fa-newspaper fa-2x",
        reflection:"fas fa-file-excel fa-2x",
        events:"fa fa-calendar",
    };
    assets.type = req.params;
    res.render('mobile/assetsExplore/assets', assets);


}





// assetssController.showAssets = async function(req,res,next){

//     console.log(req.body);
//     const asset = {};
//     asset.title = "Divyansh";

//     res.render('mobile/assetsExplore/asset',asset);
// }
