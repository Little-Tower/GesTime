import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        if(this.state.id){
            fetch(`/api/task/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then( res => res.json())
            .then( data => {
                console.log(data);
                M.toast({html: 'Tasked Saved.'});
                this.setState({title: '', description: '', id: ''});
                this.fetchTasks();
            });
        } else{
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then( res => res.json())
                .then( data => {
                    console.log(data);
                    M.toast({html: 'Tasked Saved.'});
                    this.setState({title: '', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }
        e.preventDefault();
        e.stopPropagation();
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });
    }

    deleteTask(id){
        if(confirm('Are you sure?')){
            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then( data => {
                console.log(data);
                M.toast({html: 'Task deleted.'});
                this.fetchTasks();
            });
        }
    }

    editTask(id){
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: 
                })
            });
    }
    
    handleChange(e){
       const {name, value} = e.target;
       this.setState({
            [name]: value
       });
    }


    render(){
        return(
            <div>
                {/* NAVEGATION*/}
               <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Mern Stack</a>
                    </div>
               </nav>

                {/*MAIN APP*/}
               <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                               <textarea name="description" onChange={this.handleChange} placeholder="Description" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col s12">
                                                <button type="submit" className="btn waves-effect waves-light light-blue darken-4">
                                                    Send<i className="material-icons right">send</i>
                                                </button>
                                            </div>
                                        </div>
                                       
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.tasks.map( task => {
                                            return (
                                                <tr key={task._id} >
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => this.editTask(task._id) }>
                                                            <i className="material-icons">edit</i>
                                                        </button>

                                                        <button  className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
               </div>
            </div>
        )
    }
}

export default App;