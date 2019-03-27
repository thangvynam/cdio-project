var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');
const CircularJSON = require('circular-json');
const MoTaModel = require('../models/MoTaModel')
const ThongTinChungModel = require('../models/ThongTinChungModel')
const Model4 = require('../models/Model4');
const Model5 = require('../models/Model5');
const Model9 = require('../models/Model9');
const Model6 = require('../models/Model6');
const LogModel = require('../models/LogModel');
const MatrixModel = require('../models/MatrixModel');


const MucTieuModel = require('../models/MucTieuModel')

const dataRender1 ={
  title1 : '',
  data1 : []
}
const dataRender2 ={
  title2 : '',
  data2 : []
}
const dataRender3 ={
  title3 : '',
  data3 : []
}
const dataRender4 ={
  title4 : '',
  data4 : []
}
const dataRender5 ={
  title5 : '',
  data5 : []
}
const dataRender6 ={
  title6 : '',
  data6 : []
}
const dataRender7 ={
  title7 : '',
  data7 : []
}
const dataRender8 ={
  title8 : '',
  data8 : []
}
const dataRender9 ={
  title9 : '',
  data9 : []
}

const compile = async function(templateName,data){
  const filePath = path.join(process.cwd(),'templates',`${templateName}.hbs`);
  const html = await fs.readFile(filePath,'utf-8');
  return hbs.compile(html)(data);
}
hbs.registerHelper('dateFormat',function(value,format){
  return moment(value).format(format);
});
/* GET export file page. */
router.post('/exportfile', function(req, res, next) {

  function renderNumber(str){
    switch(str){
      case "Thông tin chung":
        return "1. ";
      case "Mô tả môn học":
        return "2. ";
      case "Mục tiêu môn học" : 
        return "3. ";
      case "Chuẩn đầu ra môn học" : 
        return "4. ";
      case "Kế hoạch giảng dạy lý thuyết":
        return "5. ";
      case "Kế hoạch giảng dạy thực hành":
        return "6. ";
      case "Đánh giá":
        return "7. ";
      case "Tài nguyên môn học":
        return "8. ";
      case "Các quy định chung":
        return "9. ";
      default:
        return "";
    }
  }
  function renderContenByNameTab(key,value){
    if(value !== [] || value !== ""){
      switch(key){
        case "Thông tin chung":{
          dataRender1.title1 = renderNumber(key) +  key.toUpperCase() ;
          dataRender1.value1 = value;
          
          return dataRender1;
        }
        case "Mô tả môn học":{
          dataRender2.title2 = renderNumber(key) +  key.toUpperCase() ;
          dataRender2.value2 = value;
          return dataRender2;
        }
        case "Mục tiêu môn học":{
          dataRender3.title3 = renderNumber(key) +  key.toUpperCase() ;
          dataRender3.value3 = value;
          return dataRender3;
        }
        case "Chuẩn đầu ra môn học":{
          dataRender4.title4 = renderNumber(key) +  key.toUpperCase() ;
          dataRender4.value4 = value;
          return dataRender4;
        }
        case "Kế hoạch giảng dạy lý thuyết":{
          dataRender5.title5 = renderNumber(key) +  key.toUpperCase() ;
          dataRender5.value5 = value;
          return dataRender5;
        }
        case "Kế hoạch giảng dạy thực hành":{
          dataRender6.title6 = renderNumber(key) +  key.toUpperCase() ;
          dataRender6.value6 = value;
          return dataRender6;
        }
        case "Đánh giá":{
          dataRender7.title7 = renderNumber(key) +  key.toUpperCase() ;
          dataRender7.value7 = value;
          return dataRender7;
        }
        case "Tài nguyên môn học":{
          dataRender8.title8 = renderNumber(key) +  key.toUpperCase() ;
          dataRender8.value8 = value;
          return dataRender8;
        }
        case "Các quy định chung":{
          dataRender9.title9 = renderNumber(key) +  key.toUpperCase() ;
          dataRender9.value9 = value;
          return dataRender9;
        }
      }
    }
  }

  (async function(){
    try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      let body = await req.body
      //header
      let content =await compile('header',null);
      //body
      for (let k of Object.keys(JSON.parse(body.data))) {
          let value = JSON.parse(JSON.parse(body.data)[k]);
          content += await compile('content',renderContenByNameTab(k,value));
      }
      //footer
      content += await compile('footer',renderContenByNameTab('Thông tin chung',JSON.parse(JSON.parse(body.data)['Thông tin chung'])));
      await page.setContent(content);
      await page.emulateMedia('screen');
      await page.pdf({
        path:'../mypdf.pdf', // edit path
        format:'A4',
        printBackground:true
      });
      await browser.close();
    
      res.end("1");
    }catch(e){
      console.log('error',e);
    }
  })();
    
  })

  router.get('/collect-data/:id', function(req, res) {
    let id = req.params
    ThongTinChungModel.collect(id, (resData) => {
      res.send(resData);
    })  
  })

  router.post('/update-data/:id', function(req, res) {
    let id = req.params
    let description = req.body;
    ThongTinChungModel.add(id, description, function(err, description){
      if (err) {
        console.log(err);
      }
        console.log("done");
    })
    
  })

router.get('/get-data-2/:id', (req, res) => {
  let id = req.params
  MoTaModel.get(id, (resData) => {
    res.send(resData);
  })  
})

router.post('/save-data-2', function(req, res) {
  let description = req.body.data
  let data = {
    description: description,
    id: req.body.id
  }
  MoTaModel.save(data, function(err, description) {
    if (err) {
      console.log(err);
    }
    res.end("done");
  })   
})

router.get('/get-data-3/:id', (req, res) => {
  let id = req.params
  MucTieuModel.get(id, (resData) => {    
    res.send(resData);
  })
})

router.get('/get-muc-tieu-3/:id', (req, res) => {
  let id = req.params
  MucTieuModel.getMucTieu(id, (resData) => {
    res.send(resData);
  })
})

router.post('/get-mtmh-cdr-3', (req, res) => {
  let data = req.body  
  MucTieuModel.getMTMH_HAS_CDR(data, (resData) => {
    res.send(resData);
  });  
})

router.post('/get-cdr-3', (req, res) => {  
  let data = req.body
  MucTieuModel.getCDR(data, (resData) => {    
    res.send(resData[0].cdr);
  }) 
})

router.post('/save-data-3', function(req, res) {
  let body = req.body.data
  let data = {
    body: body,
    id: req.body.id
  }
  MucTieuModel.save(data, function(err) {
    if (err) {
      console.log(err);
    }
  }) 
  res.end("done")
})

// 4
router.post('/collect-data-4', function(req, res) {
  let data = req.body.data
  Model4.collectdata(data, function(err, data) {
    if (err) {
      console.log(err);
    } else{
      res.send(data)
    }   
  })   
})

router.get('/collect-cdrmdhd-4', function(req, res) {
  Model4.collectcdrmdhd(function(err, data) {
    if (err) {
      console.log(err);
    } else{
      res.send(data)
    }   
  })   
})

router.post('/save-data-4', function(req, res) {
  let data = req.body.data
  Model4.save(data, function(err, description) {
    if (err) {
      console.log(err);
    }
      console.log("done");
  })   
})

router.get('/collect-subjectlist', function(req, res) {
  Model4.collectsubjectlist(function(err, data) {
    if (err) {
      console.log(err);
    } else{
      res.send(data)
    }   
  })   
})

router.post('/add-subject', function(req, res) {
  let data = req.body.data
  Model4.addsubject(data, function(err, description) {
    if (err) {
      console.log(err);
    }
      console.log("done");
  })   
})

router.post('/delete-subject', function(req, res) {
  let data = req.body.data
  Model4.deletesubject(data, function(err, description) {
    if (err) {
      console.log(err);
    }
      console.log("done");
  })   
})

router.post('/edit-subject', function(req, res) {
  let data = req.body.data
  Model4.editsubject(data, function(err, description) {
    if (err) {
      console.log(err);
    }
      console.log("done");
  })   
})

router.post('/collect-subjectid', function(req, res) {
  let data = req.body.data
  Model4.collectsubjectid(data, function(err, data) {
    if (err) {
      console.log(err);
    } else{
      res.send(data)
    }   
  })   
})

router.post('/collect-mtmh', function(req, res) {
  let data = req.body.data
  Model4.collectmtmh(data, function(err, data) {
    if (err) {
      console.log(err);
    } else{
      res.send(data)
    }   
  })   
})

router.post('/add-data-5', function(req, res) {
  let data = req.body.data
  Model5.add(data, function(err) {
    if(err == null){
      res.end("1")
    }else{
      res.end("0")
    }
  })   
})

router.get('/collect-data-5', function(req, res) {
  Model5.collect(function(err, data) {
    if (err) {
      console.log(err);
    } else{
      //console.log(data)
      res.send(data);
    }   
  })   
})

router.post('/add-data-9', function(req, res) {
  const body = req.body;
  
  Model9.add(body, function(err, result) {
    if (err) {
      res.end("0");
    }
    res.end("1");
  })   
})
/* get data layout 9 */ 
router.get('/get-data-9', function(req, res) {
  
  Model9.get(function(err, result) {
    if (err) {
      res.end("0");
    }
    res.end(JSON.stringify(result));
  })   
})




router.post('/add-data-6', function(req, res) {
  const data = req.body;
  
  Model6.add(data, function(err, result) {
    if (err) {
      res.end("0");
    }
    console.log("done");
    res.end("1");
  })   
})

/* get teaching arts for layout 5+6*/ 
router.get('/get-teachingarts', function(req, res) {
  
  Model6.getTeachingArts(function(err, result) {
    if (err) {
      res.end("0");
    }
    console.log("done");
    res.end(JSON.stringify(result));
  })   
})

router.get('/get-reality-matrix', function(req, res) {
  
  MatrixModel.getRealityMatrix().then(result => {
    return res.end(JSON.stringify(result));
  })
  .catch(err => {
    return res.end(JSON.stringify(err))
  });
});

router.get('/get-cdr-cdio', function(req, res) {
  
  MatrixModel.getCdrCDIO().then(result => {
    return res.end(JSON.stringify(result));
  })
  .catch(err => {
    return res.end(JSON.stringify(err))
  });
});

router.get('/get-standard-matrix', function(req, res) {
  
  MatrixModel.getStandardMatrix().then(result => {
    return res.end(JSON.stringify(result));
  })
  .catch(err => {
    return res.end(JSON.stringify(err))
  });
});
router.post('/update-standard-matrix', function(req, res) {
  const body = req.body;
  
  MatrixModel.updateStandardMatrix(body, function(err, result) {
    if (err) {
      res.end("0");
    }
    res.end("1");
  })   
})


router.post('/save-log', function(req, res) {  
  const body = req.body.data
  LogModel.save(body, (result) => {
    res.end("done")
  })
})

router.post('/get-log', function(req, res) {
  const body = req.body.data
  LogModel.get(body, (result) => {
    res.send(result)
  })
})

module.exports = router;