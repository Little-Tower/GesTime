import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description: ''
        };
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        console.log(this.state);
        console.log('Connected 11.');
        e.preventDefault();
        e.stopPropagation();
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
                                                <input type="text" placeholder="Task Title"/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                               <textarea placeholder="Description" className="materialize-textarea"></textarea>
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
                        <div className="col s5"></div>
                    </div>
               </div>
            </div>
        )
    }
}

export default App;