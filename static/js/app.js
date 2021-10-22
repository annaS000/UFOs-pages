// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

  var filters = {};

function updateFilters() {
    let changed = d3.select(this)
    let value = changed.property("value");
    console.log(value);

    let filterId = changed.attr('id');
    console.log(filterId);

    if (value){
        filters[filterId] = value;
    }

    else {
        delete filters[filterId];
    }

    updateTable(filters);
  }

function updateTable(filters) {
    let filteredData = tableData
    //if filters is empty
    if (Object.values(filters).length == 0){
        buildTable(data)
    }
    else{
        //filter the table data
        filteredData = filteredData.filter(row => 
            //checks each row in the table if it contains some values of the filters object
            Object.values(filters).some(i => Object.values(row).includes(i)));
    }
    buildTable(filteredData);
} 

d3.selectAll('input').on('change', updateFilters);

buildTable(tableData);