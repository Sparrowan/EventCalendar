import React from "react"
import  {Container,Row,Col ,Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap/lib';
import DjangoCSRFToken from 'django-react-csrftoken'
require("../../pylady/static/css/main.css")

export default  class Addform extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: this.props.startDate,
            formDisplay: this.props.formDisplay,
            description: '',
            time:'',
            preference:'Low',
            successMessage:'',
            failureMessage:''
    }

    this.onSubmit=this.handleSubmit.bind(this);
this.handlePreferenceChange=this.handlePreferenceChange.bind(this);
  }
  handleDescriptionChange(e) {
    this.setState({
      description:e.target.value,
        successMessage:""
    })

  }
componentWillReceiveProps(nextProps) {

        this.setState({
            successMessage: ""
        });


}
  handlePreferenceChange(e) {
    this.setState({
      preference:e.target.value,

    })

  }


  handleTimeChange(e) {
    this.setState({
      time:e.target.value,
        failureMessage:''
    })


  }




handleSubmit (e)  {
    e.preventDefault();
    console.log("niraj");
    console.log(this.state.description);
    console.log(this.state.preference);

     fetch("http://localhost:8000/Event/api/addevent",{
     method: 'POST',
     body: JSON.stringify({description:this.state.description,date:this.state.startDate,time:this.state.time,preference:this.state.preference}),
         headers:{"Content-Type":"application/json"}
     })
.then(result=>{
    return result.json()
}).then(data=>{
                if(this.state.description==data.description){
                    this.setState({successMessage:"Event successfully added. Add another Event or minimize this Eventform",description:'',time:''})
                }
                else {
                    this.setState({failureMessage:"You already scheduled event for this time,please reschedule your event",time:''})
                }
            })
}


    componentWillReceiveProps(nextProps) {
        if (this.props.startDate != nextProps) {
            this.setState({
                startDate: nextProps.startDate, formDisplay: nextProps.formDisplay, successMessage:"",failureMessage:""
            });
        }


    }

    componentDidMount() {

    }


    render() {
 if (this.state.formDisplay==true) {
     return (

         <div>


             {/*  <Form enctype="multipart/form-data"  action='http://localhost:8000/Event/api/addevent' method="post"
                   id="add_form"  >*/}
              <Form enctype="multipart/form-data" onSubmit={this.onSubmit}  ref="form" id="add_form" method="post">
                  <DjangoCSRFToken/>
                 <FormGroup>
                     <Label class="required" for="id_description">Description:</Label>
                     <Input name="description"  className="vTextField" value={this.state.description} onChange={(e)=>this.handleDescriptionChange(e)}maxlength="1000" id="id_description"
                            size="lg" required placeholder="enter task" ref="description">
                     </Input>
                     <FormText color="muted">Please give short description of event</FormText>
                 </FormGroup>

                 <FormGroup>
                     <Label class="required" for="id_date">Date:</Label>
                     <Input type="date" name="date" value={this.state.startDate} size="lg" readOnly={true}
                            id="id_date"></Input>
                 </FormGroup>
                 <FormGroup>
                     <Label class="required" for="id_time">Time:</Label>
                     <Input type="time" name="time" id="id_time" value ={this.state.time} onChange={(e)=>this.handleTimeChange(e)}size="lg" required/>
                 </FormGroup>
                 <FormGroup>
                     <Label for="exampleSelect">Priority</Label>
                     <Input type="select" name="select" size="lg" onChange={(e)=>this.handlePreferenceChange(e)} id="exampleSelect">
                         <option>Low</option>
                         <option>High</option>

                     </Input>
                 </FormGroup>
                 <FormGroup>
                     <Button color="primary" type="submit" >ADD EVENT</Button>
                 </FormGroup>
             </Form>
        <h4 id="successMessage">{this.state.successMessage}</h4>
               <h4 id="failureMessage">{this.state.failureMessage}</h4>

         </div>
     )


 }
 else{
     return(

        <div >












        </div>
     )
 }

        }






}
