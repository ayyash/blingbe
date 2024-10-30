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

        const _j = o.find(n => n === req.params.id);
        if (_j) {
            Object.assign(_j, j);
        }
        res.json(j);
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

        // const p = require('../data/state.json');
        // const _p = structuredClone(p);
        // const _state = req.params.action;
        // // guessing
        // switch (_state) {
        //     case 'startTransfer':
        //         _p.transfer.state = 'starting';
        //         _p.transfer.workers.forEach(w => {
        //             w.state = 'starting';
        //         });
        //         break;
        //     case 'stopTransfer':
        //         _p.transfer.state = 'stopping';
        //         // also all worksers
        //         _p.transfer.workers.forEach(w => {
        //             w.state = 'stopping';
        //         });
        //         break;
        //     case 'startScan':
        //         _p.scan.state = 'starting';
        //         break;
        //     case 'stopScan':
        //         _p.scan.state = 'stopping';
        //         break;
        // }

        // res.json(_p);

        res.json({
            "result": "Start scanning and transfer"
        });
    });
    router.post('/mscp/workers/:id/:action', function (req, res) {
        const p = require('../data/state.json');
        const _p = structuredClone(p);
        const _w = _p.transfer.workers.find(w => w.id === req.params.id);
        const _state = req.params.action;
        if (_state === 'start') {
            _w.state = 'starting';
        }
        if (_state === 'stop') {
            _w.state = 'stopping';
        }

        res.json(_p);
    });

    router.get('/mscp/:id/state', function (req, res) {
        const p = require('../data/state.json');
        res.json(p);
        // res.status(400).json({
        //     "error": "Not implemented"
        // });
    });

    router.get('/mscp/:id/summary', function (req, res) {
        const p = require('../data/summary.json');
        res.json(p);
        // res.status(400).json({
        //     "error": "Not implemented"
        // });
    });


    return router;

}
