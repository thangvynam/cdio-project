var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');

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


  (async function(){
    try{
      let body = await req.body
      console.log(body)
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const content =await compile('test',body);

      await page.setContent(content);
      await page.emulateMedia('screen');
      await page.pdf({
        path:'mypdf.pdf',
        format:'A4',
        printBackground:true
      });
      await browser.close();
    
      console.log("done")
    }catch(e){
      console.log('error',e);
    }
  })();
    
  })

module.exports = router;
