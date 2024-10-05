const express = require('express');
const uuid = require('uuid').v4;

module.exports = function () {

    const router = express.Router();

    router.get('/mscp', function (req, res) {
        const o = require('../data/jobs.json');
        res.json(o);
    });

    router.post('/mscp', function (req, res) {
        const o = require('../data/jobs.json').jobs;
        const j = req.body;
        j.id = uuid();
        o.push(j);

        res.json(j);
    });
    router.put('/mscp/:id', function (req, res) {
        const o = require('../data/jobs.json').jobs;
        const j = req.body;

        const _j = o.find(j => j.id === req.params.id);
        if (_j) {
            Object.assign(_j, j);
        }
        res.json(_j);
    });


    router.get('/mscp/:id', function (req, res) {


        const p = require('../data/details.json');
        const _p = { ...p };
        _p.mscp.name = req.params.id;
        res.json(_p);
    });


    router.post('/mscp/:id/:action', function (req, res) {
        // /action is startTransfer stopTransfer
        // /stop /stopTransfer /startScanner stopScanner
        res.json({
            "result": "Start scanning and transfer"
        });
    });

    router.get('/mscp/:id/state', function (req, res) {
        const p = require('../data/state.json')
        res.json(p);
    });

    router.get('/mscp/:id/summary', function (req, res) {
        const p = require('../data/summary.json')
        res.json(p);
    });


    return router;

}
