import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './index.css';
import dictionary from './italian.csv';
import about from './about.md';

const Navi = (props) => {
  return (
    <Nav variant="tabs" defaultActiveKey="home" toggleVisible={props.toggleVisibleContent} className="justify-content-left" >
    <Nav.Link href="#" onClick={props.toggleVisible} eventKey="home">Search</Nav.Link>
    <Nav.Link href="#" onClick={props.toggleVisible} >About</Nav.Link>
  </Nav>
  );
}

const SearchDict = (props) => {
  return (
    <div id="search">
		  <InputGroup className="mb-3">
    <FormControl
      id='searchfield'
      onKeyUp={props.onKeyUp}
      placeholder="Search italian words"
      aria-label="Search italian words"
      aria-describedby="basic-addon2"
    />
  </InputGroup>
      <div id="dict-ital"></div>
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
    <div id="list">
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
        abouttext: "joo",
        isEmptyState: true
    };
  }

  toggleVisibleContent = () => {

    console.log("toggling");
    if (this.state.isEmptyState){
        this.setState({
        ...this.state,
        isEmptyState: false,
        isVisibleState: true
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
    let input, filter, tabl, tablerow, firstcell, i, txtValue;
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
    <div>
    <Navi toggleVisible={this.toggleVisibleContent}/>
    {this.state.isEmptyState && <SearchDict onKeyUp={() => this.search()} />}
    {this.state.isEmptyState && <DictList value={this.state.dictionaryTable}/>}
    {this.state.isVisibleState && <About value={this.state.abouttext}/>}
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
  let abouttext = this.state.abouttext;
  var masterlist = [];
  
  fetch(about) // md file imported in the beginning containing about-text
  .then(response => {
    return response.text();
  })
  .then(string => {
    console.log(string);
    abouttext = string;
    this.setState({abouttext});
  }); // about

  fetch(dictionary) // dictionary csv file
  .then(response => {
    return response.text();
  })
  .then(string => {
    let dict = string.split(",,");
    console.log(dict.length);

  dict.forEach(el => {
    let temprow;
    temprow = el.split(",");
    temprow = temprow.splice(1, 2);

    if (temprow[0].toUpperCase() !== temprow[1].toUpperCase()){
      masterlist.push(temprow);
    }
    else{
      console.log(`SAMA ${temprow[0]}`);
    }
  }); // dict foreach

  console.log(masterlist.length);
  masterlist.sort();
  let texttable = "<table id=\"dict\"><tbody>";
  masterlist.forEach(function(el) {
    texttable = `${texttable} <tr><td>${el[0]}</td><td>${el[1]}</td></tr>`;
  });
  return texttable;

  }).then(texttable => {
    texttable = `${texttable}</tbody></table>`;
    dictionaryTable = texttable;
    this.setState({dictionaryTable});
  });

} // componentDidMount

  render() {
    return (
      <div>
        {this.renderDict()}
      </div>
    );
  }

} // class ItalianDictionary 

ReactDOM.render(
  <ItalianDictionary />,
  document.getElementById('root')
);