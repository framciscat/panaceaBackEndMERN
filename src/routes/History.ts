import express from "express";
import controller from "../controller/historyController";

const router = express.Router();

router.post("/create", controller.createHistory);
router.get("/get/:historyId", controller.readHistory);
router.get("/get", controller.readAllHistories);
router.patch("/update/:historyId", controller.updateHistory);
router.delete("/delete/:historyId", controller.deleteHistory);

export = router;

/**
 * @swagger
 * components:
 *      schemas:
 *          History:
 *          type: object
 *          properties:
 *            symptoms:
 *              type: string
 *              description: Medical History Symptoms
 *            
 *      required:
 *          - symptoms
 *          - medicalApp
 *          - drugs     
 *
 *
 */

/**
 * @swagger
 *     /histories/create:
 *      post:
 *      tags: [History]
 *      summary: Create a Medical History
 *      requestBody:
 *              required: true
 *              content:
 *                   application/json
 *                      schema:
 *                      type: object
 *
 *      responses:
 *          201:
 *              description: A new history has been created.
 */


/**
 * @swagger
 *      /histories/get:
 *      get: 
 *          tags: [History]
 *          summary: Get all histories
 *          description: Get all histories from API
 *          responses:
 *              200:
 *                  description: Return all histories from API.
 *      
 */


/**
 * @swagger
 *      /histories/update/{id}:
 *      put:
 *          tags: [History]
 *          summary: Update history information
 *          description: Update history information
 *          parameters:
 *              - in: path
 *                name: id
 *                description: History ID
 *                required: true
 *                schema:
 *                  type:string
 *          requestBody:
 *                  required: true
 *                  content:
 *                  application/json:
 *                      schema:
 *                      type: object
 *                      $ref: 
 */