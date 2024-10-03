const express = require('express');
const uuid = require('uuid').v4;

module.exports = function () {

    const router = express.Router();

    router.get('/mscp', function (req, res) {
        const o = require('../data/jobs.json');
        res.json(o);
    });


    router.get('/mscp/:id', function (req, res) {
        
        
        const p = require('../data/details.json');
        const _p = {...p};
        _p.mscp.name = req.params.id;
        res.json(_p);
    });

    
    router.post('/mscp/:id/:action', function (req, res) {
        
        res.json({
            "result": "Start scanning and transfer"
        });
    });

    // get ingrdients
    router.get('/mscp/:id/state', function (req, res) {
        const p = require('../data/state.json')
        res.json(p);
    });

    // get ingrdients
    router.get('/mscp/:id/summary', function (req, res) {
        const p = require('../data/summary.json')
        res.json(p);
    });


    return router;

}
