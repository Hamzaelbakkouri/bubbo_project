import { Router } from "express";
import {
    createBook,
    deleteBook,
    getAllBooks,
    getOneBook,
    updateBook
} from "../controllers/bookController";

const router = Router();

/**
 * @GET
 * @desc // get all books
 * @access public
 */

router.get("/", getAllBooks);

/**
 * @GET
 * @desc // get one book
 * @access public
 */

router.get("/:id", getOneBook);

/**
 * @POST
 * @desc // create book
 * @access public
 */

router.post("/", createBook);

/**
 * @PUTCH
 * @desc // update Admin
 * @access private
 */

router.patch("/:id", updateBook);

/**
 * @DELETE
 * @desc // delete admin
 * @access private
 */

router.delete("/:id", deleteBook);

export default router;
