

const {
    createEvent,
    getAllEvent,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    getAllEventByAdmin
} = require('../../../controller/eventController');

const Event = require('../../../models/eventsModels');
const AppError = require('../../../utils/appError');

jest.mock('../../../models/eventsModels');

describe('Event Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    describe('createEvent', () => {
        it('should create a new event', async () => {
            req.body = {
                eventName: 'Birthday',
                dateOfEvent: '2025-09-22',
                timeOfEvent: '8:00 PM',
                seatInEvent: 50,
                description: 'Happy Birthday',
                createdBy: 'user123'
            };

            Event.create.mockResolvedValue(req.body);

            await createEvent(req, res, next);

            expect(Event.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                data: req.body
            });
        });

        it('should return error if fields are missing', async () => {
            req.body = {}; // empty body

            await createEvent(req, res, next);

            expect(next).toHaveBeenCalled();
            const error = next.mock.calls[0][0];
            expect(error.message).toBe('Please fill all the fields');
            expect(error.statusCode).toBe(400);
        });
    });

    describe('getAllEvent', () => {
        it('should return all events', async () => {
            const events = [{ eventName: 'Event1' }, { eventName: 'Event2' }];
            Event.find.mockResolvedValue(events);

            await getAllEvent(req, res, next);

            expect(Event.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                total: events.length,
                data: events
            });
        });

        it('should call next if no events found', async () => {
            Event.find.mockResolvedValue(null);

            await getAllEvent(req, res, next);

            expect(next).toHaveBeenCalled();
            const error = next.mock.calls[0][0];
            expect(error.message).toBe('no event found');
            expect(error.statusCode).toBe(404);
        });
    });

    describe('deleteEvent', () => {
        it('should delete an event', async () => {
            req.params.id = '123';
            Event.findByIdAndDelete.mockResolvedValue({});

            await deleteEvent(req, res, next);

            expect(Event.findByIdAndDelete).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                data: "event deleted"
            });
        });
    });

    describe('updateEvent', () => {
        it('should update an event', async () => {
            req.params.id = '123';
            req.body = { eventName: 'Updated Event' };

            Event.findByIdAndUpdate.mockResolvedValue(req.body);

            await updateEvent(req, res, next);

            expect(Event.findByIdAndUpdate).toHaveBeenCalledWith('123', { eventName: 'Updated Event' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                data: req.body
            });
        });

        it('should throw error if no fields to update', async () => {
            req.params.id = '123';
            req.body = {};

            await updateEvent(req, res, next);

            expect(next).toHaveBeenCalled();
            const error = next.mock.calls[0][0];
            expect(error.message).toBe('please fill atleast one field to update');
            expect(error.statusCode).toBe(400);
        });
    });

    // Add getSingleEvent and getAllEventByAdmin similarly
});
