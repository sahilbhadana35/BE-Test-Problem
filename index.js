const csv = require('csv');
const fs = require('fs');
const inputPath = process.argv[2]
let rows = []
fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data.split('\n').forEach((row, index) => {
        row = row.replace('\r', '')
        if(index === 0){
            let headers = row.split('|')
            headers.push('Flag')
            headers.push('Description')
            rows.push(headers.join(','))
        }
        else{
            let rowData = row.split('|')
            if(rowData[4].indexOf("AEPS") !== -1)
            {
                rowData.push("AEPS")
            }
            else if(rowData[4].indexOf("FEE CHG") !== -1)
            {
                rowData.push("FEE CHG")
            }
            else{
                rowData.push("")
            }
            rowData.push(rowData[4].split('/')[0])
            rows.push(rowData.join(','))
        }
    })

    let csvData = rows.join('\n')
    fs.writeFile("output2.csv", csvData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
});