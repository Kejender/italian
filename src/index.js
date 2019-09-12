import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import dictionary from './italian.csv';

const SearchDict = (props) => {
  return (
    <div>
		<input type="text" id="searchfield" onKeyUp={props.onKeyUp} placeholder="Search for italian words"></input>
        <div id="dict-ital"></div>
    </div>
  );
}

class ItalianDictionary extends React.Component {
  
  /*constructor(props) {
    super(props);
    this.state = {
    };
  }*/

  search(){
    console.log("search");
    var input, filter, tabl, tablerow, firstcell, i, txtValue;
    input = document.getElementById('searchfield');
    filter = input.value.toUpperCase();
    tabl = document.getElementById("dict");
    tablerow = tabl.getElementsByTagName('tr');
  
    for (i = 0; i < tablerow.length; i++) {
      firstcell = tablerow[i].getElementsByTagName("td")[0];
      txtValue = firstcell.textContent || firstcell.innerText;
      if (txtValue.toUpperCase().indexOf(filter) === 0) {
        tablerow[i].style.display = "";
      } else {
        tablerow[i].style.display = "none";
      }
    }
  }

  renderSearch(i) {
    return (
      <SearchDict
      onKeyUp={() => this.search()}
      />
    );
  }


  renderDict(i) {
    return (
      <div>
          {this.renderSearch(1)}
      </div>
    );
  }


componentDidMount() {
  
  var masterlist = [];

   fetch(dictionary)
  .then(function(response) {
  return response.text();
  })
  .then(function(string) {
  var dict = string.split(",,");
  console.log(dict.length);
  console.log(dict.length);
  dict.forEach(function(el, ind) {
    var temprow;
    console.log(ind);
    temprow = el.split(",");
    temprow = temprow.splice(1, 2);
    masterlist.push(temprow);
  })
  console.log(masterlist.length);
  masterlist.sort();
  var table = document.createElement("table");
  table.setAttribute("id", "dict");
  var row;
  masterlist.forEach(function(el, ind){
    console.log("master "+ind);
    row = table.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = el[0];
    cell = row.insertCell();
    cell.innerHTML = el[1];
  
  })
  document.getElementById("dict-ital").appendChild(table);
  });

}

  render() {
    return (
      <div>
        {this.renderDict()}
      </div>
    );
  }

} // 

ReactDOM.render(
  <ItalianDictionary />,
  document.getElementById('root')
);