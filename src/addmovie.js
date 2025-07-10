import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import moviemodel from "../../../server/movieserver/models/movie.model";
class AddMovie extends React.Component {
  constructor(props) {
    console.log('constructor')
    super(props);
    //to initialize variables and methods
    this.state = {
      id: '',
      mname: '',
      mtype: '',
      mdesc: '',
      movielist: [],
      isUpdate:false,
      isValidate:false,
      message:''
    }
    //console.log(this.state.mname)-------to print mname
    this.getMovieName = this.getMovieName.bind(this);
    this.getMovieDesc = this.getMovieDesc.bind(this);
    this.getMovieType = this.getMovieType.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.editmovie = this.editmovie.bind(this);
    this.updatemovie = this.updatemovie.bind(this);
    this.getAll = this.getAll.bind(this);
    this.deletemovie = this.deletemovie.bind(this);
    this.deleteConfirm=this.deleteConfirm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    


    console.log('constructor');


  }
  getMovieName(e) {
    this.setState({ mname: e.target.value });//e is a current instance 
  }
  getMovieDesc(e) {
    this.setState({ mdesc: e.target.value });
  }

  getMovieType(e) {
    this.setState({ mtype: e.target.value });
  }
  getAll() {
    fetch('http://localhost:8000/movie/getAll')

      .then((response) => {
        return response.json();
      }).then((result) => {
        this.setState({ movielist: result });
      }).catch((err) => {
        console.log(err);
      })
  }
  saveMovie() {
    if(this.state.mname===''||this.state.mtype===''||this.state.mdesc===''){
      this.setState({
        isValidate:false,
        message:'please fill all the feilds'
      });
      return;
    }
    var movie = {
      "name": this.state.mname,
      'type': this.state.mtype,
      "desc": this.state.mdesc
    }
    //this.setState({movielist:this.state.movielist.concat(movie)});
   

    //CONNECTING API CALL
    fetch('http://localhost:8000/movie/create', { //backend port number
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie) //movie variable which we created in save movie 
    }
    ).then((response) => {
      return response.json();
    })
      .then((result) => {
        if (result.message === 'Inserted'){
          this.setState({
            isValidate:true,
            message:'Movie filled successfully'
          })
          this.resetForm();
          this.getAll();
        }
        else
          alert('error occured while saving movie')
      }).catch((err) => {
        console.log(err)
      });
    //console.log(this.state.movielist);
  }
  editmovie(id) {
    
    fetch('http://localhost:8000/movie/get/' + id)
      .then((response) => {
        return response.json();
      }).then((result) => {
        this.setState({
          id: result[0]._id,
          mname: result[0].name,
          mtype: result[0].type,
          mdesc: result[0].desc
        });
      }).catch((err) => {
        console.log(err)
      })
  }
  deletemovie(id) {
    fetch('http://localhost:8000/movie/delete/' + id,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }}
    )
      .then((response) => {
        return response.json();
      }).then((result) => {
       if(result.message==='deleted'){
        this.getAll();
       }else{
        alert('error occured while deleting movie')
       }
      }).catch((err) => {
        console.log(err)
      })
  }
  deleteConfirm(id){
    this.setState({
      id:id
    })
  }
  updatemovie() {                                                             
    var movie = {
      _id: this.state.id,
      name: this.state.mname,
      type: this.state.mtype,
      desc: this.state.mdesc
    }

    //console.log(this.state.id)
    fetch('http://localhost:8000/movie/update/'+this.state.id,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(movie)
    }).then((response) => {
      return response.json();
    }).then((result) => {
      console.log("server response:",result)
      if (result.message==='updated') {
        //this.setState({ isUpdate: false });
        this.resetForm();
        this.getAll();
      }
      else
        alert('error occured while updating movie')
    }).catch((err) => {
      console.log(err);
    })
  }
  
  resetForm(){
    this.setState({
      mname:'',mtype:'',mdesc:'',isUpdate:false
    });
     console.log(this.state.movielist);
  }
  render() {
    //console.log('render');
    return (
      <div>
        <h2>Add movie-{this.props.title}</h2>
        <hr />
        <form>
          Movie Name:<input type="text" value={this.state.mname} onChange={this.getMovieName} /><br />
          Movie Type:<input type="text" value={this.state.mtype} onChange={this.getMovieType} /><br />
          Movie Desc:<input type="text" value={this.state.mdesc} onChange={this.getMovieDesc} /><br />
         {/* {(this.state.isUpdate)? */}
          <input type="button" value="update" onClick={this.updatemovie} className="btn btn-primary" />
          <input type="button" value="save" onClick={this.saveMovie} className="btn btn-primary" />
          
          <input type="button" value="reset" onClick={this.resetForm} className="btn btn-warning"/>

        </form>
        {(this.state.message!=='')?
        <div>

          {(this.state.isValidate)?
          <div className="alert alert-success">{this.state.message}</div>:
        <div className="alert alert-danger">{this.state.message}</div>}
      
        </div>:''}
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Desc</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movielist.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.type}</td>
                <td><button className='btn btn-primary' onClick={() => this.editmovie(item._id)}>Edit</button></td>
                <td><button className='btn btn-danger' data-target="#confirmModal" data-toggle="modal" onClick={()=>this.deleteConfirm(item._id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <h4>{this.state.mname}</h4> 
            <h4>{this.state.mtype}</h4>
            <h4>{this.state.mdesc}</h4> */}
   <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      
      <div class="modal-body">
        Are you sure you want to delete this movie?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">no</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>this.deletemovie(this.state.id)}>yes</button>
      </div>
    </div>
  </div>
</div>

      </div>
    );
  }
  componentDidMount() {
    //console.log('componentDidMount');
    // to load default data after render
    //this.setState({mname:'Movie ABC'});-------------------will display the latest update
    // setTimeout(()=>{
    //   this.setState({mname:'Movie ABC'});
    // },5000);
    this.getAll();

  }



}
export default AddMovie;