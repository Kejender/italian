import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'react-bootstrap/Nav';
import './index.css';
import './bootstrap.min.css';
import dictionary from './italian.csv';

const Navi = (props) => {

/*
onClick={props.toggleVisible}
toggleVisible={this.toggleVisibleContent}
*/

    return (
      <Nav variant="tabs" defaultActiveKey="home" toggleVisible={props.toggleVisibleContent} className="justify-content-left" >
      <Nav.Link href="#" onClick={props.toggleVisible} eventKey="home">Search</Nav.Link>
      <Nav.Link href="#" onClick={props.toggleVisible} >About</Nav.Link>
    </Nav>
    );
}


const SearchDict = (props) => {
  return (
    <div>
    <div id="home">
		<input type="text" id="searchfield" onKeyUp={props.onKeyUp} placeholder="Search for italian words"></input>
    <div id="dict-ital"></div>
    </div>
    </div>
  );
}

const DictList = (props) => {

  let mastertable = props.value;
  console.log(mastertable.length);

  function createMarkup(){
     return {__html: mastertable};
  }

  return (
    <div id="home">
    <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

const About = (props) => {
    return (
      <div id="about">{props.value}</div>
    );
  }

class ItalianDictionary extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        dictionaryTable: "1",
        about: "joo",
        isEmptyState: true
    };
  }

  toggleVisibleContent = () => {

    console.log("toggling");
    if (this.state.isEmptyState){
        this.setState({
        ...this.state,
        isEmptyState: false,
        isVisibleState: true,
        about: "etta"
        })
    }
    else {
        this.setState({
            ...this.state,
            isEmptyState: true,
            isVisibleState: false
        })

    }

  }

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

    /*{this.state.isEmptyState && <SearchDict onKeyUp={() => this.search()} />}
    {this.state.isEmptyState && <DictList value={this.state.dictionaryTable}/>}
    {this.state.isVisibleState && <About value={this.state.about}/>}
    
    <SearchDict onKeyUp={() => this.search()} />
    <DictList value={this.state.dictionaryTable}/>
    <About value={this.state.about}/>
    */


    return (
    <div>
    <Navi toggleVisible={this.toggleVisibleContent}/>
    {this.state.isEmptyState && <SearchDict onKeyUp={() => this.search()} />}
    {this.state.isEmptyState && <DictList value={this.state.dictionaryTable}/>}
    {this.state.isVisibleState && <About value={this.state.about}/>}
    </div>
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
  
  let dictionaryTable = this.state.dictionaryTable;
  //let asia = this.state.asia;
  var masterlist = [];

  fetch(dictionary)
  .then(response => {
  return response.text();
  })
  .then(string => {
  var dict = string.split(",,");
  console.log(dict.length);

  dict.forEach(el => {
    var temprow;
    temprow = el.split(",");
    temprow = temprow.splice(1, 2);

    if (temprow[0].toUpperCase() !== temprow[1].toUpperCase()){
        masterlist.push(temprow);
    }
    else{
        console.log("SAMA "+temprow[0]);
    }
  }); // dict foreach

  console.log(masterlist.length);
  masterlist.sort();
  let table = document.createElement("table");
  table = document.createElement("table");
  table.setAttribute("id", "dict");
  let row;


  masterlist.forEach(el => {
    //console.log("master "+ind);
    row = table.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = el[0];
    cell = row.insertCell();
    cell.innerHTML = el[1];
  });

  return table;
  })
  .then(table => {

    let texttable = "<table id=\"dict\"><tbody>";
    masterlist.forEach(function(el) {
      texttable = texttable +"<tr><td>"+el[0]+"</td><td>"+el[1]+"</td></tr>";
    });

    return texttable;
  }).then(texttable => {
    texttable = texttable + "</tbody></table>";
    dictionaryTable = texttable;
    this.setState({dictionaryTable});

  });
    
    
  // fetch then

} // componentDidMount

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