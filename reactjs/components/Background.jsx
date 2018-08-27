import React from "react"
import  {Container,Row,Col ,Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap/lib';
import moment from 'moment';
export default  class Background extends React.Component {
    constructor(props){
        super(props);

        this.state={
            startDate:this.props.startDate,
            eventArray:[],
            highEventArray:[]

        };
        this.dateHandler=this.dateHandler.bind(this);
        this.handlePriority=this.handlePriority.bind(this);
        this.commonGet=this.commonGet.bind(this);
        this.deleteEvent=this.deleteEvent.bind(this);
        this.commonHigh=this.commonHigh.bind(this);
        this.handleTodaysEvent=this.handleTodaysEvent.bind(this);
    }
deleteEvent(event){
fetch("http://localhost:8000/Event/api/"+event.date+"/"+event.time, {method: 'DELETE',
      
    })
            .then(result=>{
                return result.json()
            }).then(data=>{
    
console.log("success")

            })
			this.commonGet();
    this.commonHigh()


}

commonGet(){
    fetch("http://localhost:8000/Event/api/"+this.state.startDate+".json")
            .then(result=>{
                return result.json()
            }).then(data=>{
                console.log(data);
           this.setState({eventArray:data});
            })
        }

commonHigh(){

    fetch("http://localhost:8000/Event/api/High.json")
            .then(result=>{
                return result.json()
            }).then(data=>{
                console.log(data);
           this.setState({highEventArray:data});
            })

}
handlePriority(){
    console.log(this.state.highEventArray.length)
        if (this.state.highEventArray.length==0){
            return <h4>No high priority Event scheduled.</h4>;
        }
        else{
            return <div>
                <h4 id="reminder">Reminder!!!Upcoming High Priority Events</h4><br></br>
                <Table ><thead><tr><th>Date</th><th>Time</th><th>Description</th><th>Priority</th><th></th></tr></thead><tbody>
               {this.state.highEventArray.map(function (event) {
                   return <tr><th>{moment(event.date).format("DD MMM").toString()}</th><th>{event.time}</th><th>{event.description}</th><th>{event.preference}</th></tr>;
               },this)
               }
               </tbody>
                </Table>
                </div>
        }

    }



    handleTodaysEvent(){

        if (this.state.eventArray.length==0){
            return<h4> No Events for {this.dateHandler()}</h4>;
        }
        else{
            return  <div>
                <h4>Event scheduled for {this.dateHandler()}</h4>
               <div>
                   <Table ><thead><tr><th>Time</th><th>Description</th><th>Priority</th><th>Delete</th></tr></thead><tbody>
               {this.state.eventArray.map(function (event) {
                   return <tr><th>{event.time}</th><th>{event.description}</th><th>{event.preference}</th><th><Button className="btn  btn-circle" color="danger" onClick={()=>this.deleteEvent(event)}>X</Button></th></tr>;
               },this)
               }
               </tbody>
                </Table>
               </div>

            </div>
        }

    }






    dateHandler(){
        let eventDateString=this.state.startDate.toString();
        let eventDate=moment(this.state.startDate).format("DD MMM YYYY");
        if (eventDateString==moment().format("YYYY-MM-DD").toString()) {
            return "Today";
        }
        else {
            return eventDate;
        }

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.startDate!=nextProps) {
            this.setState({
                startDate: nextProps.startDate
            });

            fetch("http://localhost:8000/Event/api/"+nextProps.startDate+".json")
            .then(result=>{
                return result.json()
            }).then(data=>{
           this.setState({eventArray:data});
            })
            this.commonHigh();

        }
}



componentDidMount(){
        this.commonGet();
        this.commonHigh();



}



    render(){

       return(
           <div>

               <div>
                   <div>{this.handleTodaysEvent()}</div>
                   <div>{this.handlePriority()}</div>

               </div>



           </div>
       )

    }

}

