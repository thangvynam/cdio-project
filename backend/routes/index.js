var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');

const objKey = {
  key : ''
}
const objValue = {
  value : ''
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
      case "Mục tiêu môn học" : 
        return "3. ";
      case "Mô tả môn học":
        return "2. ";
      case "Danh sách kế hoạch giảng dạy lý thuyết":
        return "5. ";
    }
  }

  (async function(){
    try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      let body = await req.body
      console.log(body);
      let data = new Map();

      let content =await compile('header',null);

      for (let k of Object.keys(JSON.parse(body.data))) {
          let value = JSON.parse(JSON.parse(body.data)[k]);
          objKey.key = k ;
          objValue.value = value;
          data.set(objKey,objValue);         
          if (k === "Mục tiêu môn học" && (value !== [] || value !== "")) {
            dataRender3.title3 = renderNumber(k) +  k.toUpperCase() ;
            dataRender3.value3 = value;
            content += await compile('content',dataRender3);
          } 
          if (k === "Mô tả môn học" && (value !== [] && value !== "")) {
            dataRender2.title2 = renderNumber(k) +  k.toUpperCase() ;
            dataRender2.value2 = value;
            content += await compile('content',dataRender2);
          }
          if (k === "Danh sách kế hoạch giảng dạy lý thuyết" && (value !== [] && value !== "")) {
            dataRender5.title5 = renderNumber(k) +  k.toUpperCase() ;
            dataRender5.value5 = value;
            content += await compile('content',dataRender5);
            console.log(dataRender5);
          }
          
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
