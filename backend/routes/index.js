var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');

const MoTaModel = require('../models/MoTaModel')
const ThongTinChungModel = require('../models/ThongTinChungModel')
const Model4 = require('../models/Model4');
const Model5 = require('../models/Model5');
const Model9 = require('../models/Model9');
const Model6 = require('../models/Model6');

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

  router.get('/collect-data-1', function(req, res) {
    ThongTinChungModel.collect(function(err, data) {
      if (err) {
        console.log(err);
      } else{
        res.send(data)
      }   
    })   
  })

  router.post('/add-data-1', function(req, res) {
    let description = req.body.data;
    ThongTinChungModel.add(description, function(err, description){
      if (err) {
        console.log(err);
      }
        console.log("done");
    })
    
  })

router.get('/get-data-2', (req, res) => {
  MoTaModel.get((data) => {
    res.send(data)
  })
})

// router.post('/add-data-2', function(req, res) {
//   let description = req.body.data
//   MoTaModel.add(description, function(err, description) {
//     if (err) {
//       console.log(err);
//     }
//       res.end("done");
//   })   
// })

router.post('/save-data-2', function(req, res) {
  let description = req.body.data
  MoTaModel.save(description, function(err, description) {
    if (err) {
      console.log(err);
    }
    res.end("done");
  })   
})

// router.post('/add-data-3', function(req) {
//   let body = req.body
//   console.log(body.data);
// })

// router.post('/delete-data-3', function(req) {
//   let body = req.body
//   console.log(body.data);
// })

router.post('/save-data-3', function(req, res) {
  let body = req.body.data
  body.forEach(element => {
    console.log(element);
    MucTieuModel.save(element, function(err) {
      if (err) {
        console.log(err);
      }
    }) 
  });
})

router.post('/add-data-4', function(req, res) {
  let data = req.body.data
  Model4.add(data, function(err, description) {
    if (err) {
      console.log(err);
    }
      console.log("done");
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


module.exports = router;
