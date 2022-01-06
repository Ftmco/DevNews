import * as express from 'express'
import { Request, Response } from 'express-serve-static-core'
import ISearch from '../../service/rule/ISearch'
import Search from '../../service/service/Search'
const router = express.Router()
const _search: ISearch = new Search()

router.get("/Get", async (req: Request, res: Response) => {
    let query = req.query.q.toString()
    let search = await _search.search(query)
    res.json(search)
    res.end()
})

export default router