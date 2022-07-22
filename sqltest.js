// https://devblogs.microsoft.com/azure-sql/promises-node-tedious-azure-sql-oh-my/


const { Connection, Request } = require("tedious");

// rewrite me
const config = {
  authentication: {
    options: {
      userName: "specialistAdmin", // update me
      password: "Pa$$W0rd" // update me
    },
    type: "default"
  },
  server: "yunasugimoto-v2-sql.database.windows.net", // update me
  options: {
    database: "yunasugimoto-v2-db", //update me
    encrypt: true
  }
};

// Create connection to database
// sample
// executeSQLquery("SELECT * FROM dbo.Customers;").then(ok => {console.log("ok:"+ok)});
const executeSQLquery = (query) => new Promise((resolve, reject) => {
    var connection = new Connection(config); 

    function executeStatement() {  
        const result =[];
        request = new Request(query, function(err) {  
        if (err) {  
            console.log(err);
            reject(err);
        }else{
            if ((result == [] || result == null || result == "null")) result = "[]";  
            resolve(result);
        }
        });
    
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result.push(column.value);  
              }  
            });  
            //console.log(result);
        });  
    
        request.on('done', function(rowCount, more) {  
           // console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);
    } 
     
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement();  
    });
    
    connection.connect();
})

exports.executeSQLquery = executeSQLquery;
