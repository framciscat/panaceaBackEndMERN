import express from 'express';
import controller from '../controller/HistoryController';

const router = express.Router();

router.post('/create', controller.createHistory);
router.get('/get/:historyId', controller.readHistory);
router.get('/get/', controller.readAllHistories);
router.patch('/update/:historyId', controller.updateHistory);
router.delete('/delete/:historyId', controller.deleteHistory);

export = router;