var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');

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
const dataRender5 ={
  title5 : '',
  data5 : []
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
      case "Kế hoạch giảng dạy lý thuyết":
        return "5. ";
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
        case "Mục tiêu môn học":{
          dataRender3.title3 = renderNumber(key) +  key.toUpperCase() ;
          dataRender3.value3 = value;
          return dataRender3;
        }
        case "Mô tả môn học":{
          dataRender2.title2 = renderNumber(key) +  key.toUpperCase() ;
          dataRender2.value2 = value;
          return dataRender2;
        }
        case "Kế hoạch giảng dạy lý thuyết":{
          dataRender5.title5 = renderNumber(key) +  key.toUpperCase() ;
          dataRender5.value5 = value;
          return dataRender5;
        }
      }
    }
  }

  (async function(){
    try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      let body = await req.body
      let content =await compile('header',null);
      
      for (let k of Object.keys(JSON.parse(body.data))) {
          let value = JSON.parse(JSON.parse(body.data)[k]);
         
           console.log(value);
          content += await compile('content',renderContenByNameTab(k,value));
      }
     
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

module.exports = router;
