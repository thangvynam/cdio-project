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
const dataRender ={
  title : '',
  data : []
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
    }
  }

  (async function(){
    try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      let body = await req.body
      let data = new Map();

      let content =await compile('header',null);

      for (let k of Object.keys(JSON.parse(body.data))) {
          let value = JSON.parse(JSON.parse(body.data)[k]);
          objKey.key = k ;
          objValue.value = value;
          data.set(objKey,objValue);
          dataRender.title = renderNumber(k) +  k.toUpperCase() ;
          dataRender.value = value;
          console.log(dataRender.value);
          content += await compile('content',dataRender);
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
