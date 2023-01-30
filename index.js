const app=require('express')();
const bodyParser=require('body-parser');
const userCtrl=require('./controller/userCtrl')
const cors=require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/post',userCtrl.postFunc);
app.get('/get',userCtrl.getFunc);
app.put('/update/:id',userCtrl.updateFunc);
app.delete('/delete/:id',userCtrl.deleteFunc);
app.get('/pagination',userCtrl.paginationFunc);

app.use(cors());
app.listen(5001,()=> console.log("Server is running on port number : 5001 "))
