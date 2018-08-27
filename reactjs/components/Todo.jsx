
import moment from 'moment';
import React from "react"


import DatePicker from 'react-datepicker';


import  {Container,Row,Col ,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap/lib';
import Background from "./Background";
import Addform from "./Addform"
require("../../node_modules/react-datepicker/dist/react-datepicker.min.css");
require("../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.min.css");
require("../../pylady/static/css/main.css")



export default class Todo extends React.Component {
 constructor(props) {
     super(props);

        this.state={startDate:moment().format("YYYY-MM-DD"),formDisplay:false}
  this.handleChange = this.handleChange.bind(this);


  }
  handleChange(date) {
    this.setState({
      startDate: moment(date).format("YYYY-MM-DD")
    });

  }

addFormHandler(display){

 this.setState({formDisplay: !display})
}


    render() {

      return (
<div>

 <div>
             <Container className="" id="container" >
                 <h1 id="welcome">WELCOME</h1>
                 <Row>

                      <Col lg="4" id="fetch_column">
                      <Background startDate={this.state.startDate}/>
                     <Button id="add_button" className="btn  btn-xl" color="primary" onClick={() =>this.addFormHandler(this.state.formDisplay)}>{this.state.formDisplay?'-':'+'}</Button>
                      </Col>

                    
					<Col lg="4" id="Calendar_column">
                          <div id ="calendardiv">
                          <DatePicker  showYearDropdown scrollableYearDropdown   dropdownMode="select"  showMonthDropdown yearDropdownItemNumber={15} todayButton="Welcome"  inline calendarClassName="rasta-stripes"
                                      dateFormat="DD-MM-YYYY"
                        selected={moment(this.state.startDate)}
                        onChange={this.handleChange}
                    />

                          </div>
                     </Col>



                <Col lg="4" className={this.state.formDisplay?'formClass':'thought'} id="form_column">
                     <Addform startDate={this.state.startDate}  formDisplay={this.state.formDisplay}></Addform>


                </Col>

          </Row>


          </Container>

        </div>
          </div>




      );
    }
}
