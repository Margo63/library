const router = require('express').Router();
const groups = [{id: 1, name: "5381", students: 15, rating: 4.1},
    {id: 12, name: "5303", students: 13, rating: 4.7},];
router.get('/', (req, res)=>{
    res.json(groups);
});

router.get('/:id([0-9]{1,})', (req, res)=>{
    const group = groups.filter((g)=>{
        if(g.id == req.params.id) return true;
    });
    res.send(group)
});

router.post('/', (req, res)=>{
    let body = req.body;

    if(!body.name || !body.students.toString().match(/^[0-9]{1,}$/g) ||
        !body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        res.status(201)
        res.json({message: "Ok"})
    }
});

module.exports = router;