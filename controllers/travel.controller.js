const BaseController = require('./base.controller');
const travelService = require('../services/travel.service');

class TravelController extends BaseController {
    async getTour(req, res) {
        try {
            const from = req.query.from;
            const to = req.query.to;
            const response = travelService.getTour(from, to);
            res.json(response);
        } catch (err) {
            res.json(travelService.getDefaultTour());
        }
    }

    async getTourById(req, res) {
        try {
            const id = req.params.id;
            const response = travelService.getTourById(id);
            res.json(response);
        } catch (err) {
            res.json(travelService.getDefaultTour());
        }
    }

    async getLocation(req, res) {
        try {
            const name = req.query.name;
            const response = travelService.getLocation(name);
            res.json(response);
        } catch (err) {
            res.json(travelService.getDefaultLocation());
        }
    }

    async getLocationById(req, res) {
        try {
            const id = req.params.id;
            const response = travelService.getLocationById(id);
            res.json(response);
        } catch (err) {
            res.json(travelService.getDefaultLocation());
        }
    }
}

module.exports = new TravelController();