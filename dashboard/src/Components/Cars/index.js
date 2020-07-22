import ntc from 'ntc'
import axios from "axios";
import cssClasses from './style.css'
import config from "../../config/config";
import React, { Component } from 'react';
import { SketchPicker } from 'react-color'
import { GoogleLogout } from 'react-google-login';
import _ from 'lodash'


export default class Cars extends Component {
    constructor() {
        super();
        const user = localStorage.getItem('user')
        this.state = {
            user: JSON.parse(user),
            cars: [],
            redirect: null,
            showPopap: false,
            selectColor: false,
            car: {
                brand: '',
                model: '',
                year: 0,
                color: ''
            },
            updateCar: {
                id: 0,
                brand: '',
                model: '',
                year: 0,
                color: ''
            },
            showUpdateCarPopap: false,
            showDeleteButton: false
        }
    }
    logout = (data) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload(true);
    }
    componentDidMount() {
        axios(config.URLS.cars, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                this.setState({cars: data})
            })
            .catch(err => console.error(err))

    }
    addCar = () => {
        this.setState({showPopap: !this.state.showPopap})
    }
    handleInputChange = event => {
        const newCar = {
            ...this.state.car,
            [event.target.name]: event.target.value
        }
        this.setState({car: newCar})
    }
    handleUpdateInputChange = event => {
        const newUpdateCar = {
            ...this.state.updateCar,
            [event.target.name]: event.target.value
        }
        this.setState({updateCar: newUpdateCar})
    }
    handleSelectColor = event => {
        const newCar = {
            ...this.state.car,
            color: event.hex
        }
        this.setState({car: newCar})
        this.changeSelectColor()
    }

    handleUpdateSelectColor = event => {
        const newCar = {
            ...this.state.updateCar,
            color: event.hex
        }
        this.setState({updateCar: newCar})
        this.changeSelectColor()
    }
    changeSelectColor = () => {
        this.setState({selectColor: !this.state.selectColor})
    }
    handleCarSelect = (event) => {
        const index = event.currentTarget.parentNode.getAttribute("id");
        const cars = [...this.state.cars]
        cars[index].selected = !cars[index].selected
        this.setState({ cars })
        const isSelecctedCar = !!_.find(this.state.cars, car => {
            return car.selected;
        })
        this.setState({ showDeleteButton: isSelecctedCar })

    }
    createCar = async () => {
        await axios(config.URLS.cars, {
            method: 'post',
            data: { ...this.state.car },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        this.addCar()
        this.setState({car: {
                brand: '',
                model: '',
                year: 0,
                color: ''
            }})
        this.updateCarList()
    }
    updateCarList = () => {
        axios(config.URLS.cars, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(({data}) => {
                this.setState({cars: data})
            })
            .catch(err => console.error(err))

    }
    deleteCars = async () => {
        const carIds = _.map(_.filter(this.state.cars, car => car.selected), car => car.id)
        const deleteResponce = await axios(config.URLS.cars, {
            method: 'delete',
            data: { carIds },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        this.setState({ showDeleteButton: false })
        this.updateCarList()
    }
    openUpdateCarPopap = (event) => {
        const index = event.currentTarget.parentNode.getAttribute("id");
        this.setState({
            showUpdateCarPopap: !this.state.showUpdateCarPopap,
            updateCar: this.state.cars[index]
        })
    }
    updateCar = async () => {
        const updateResponce = await axios(config.URLS.cars, {
            method: 'put',
            data: { ...this.state.updateCar },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        this.setState({showUpdateCarPopap: !this.state.showUpdateCarPopap})
        this.updateCarList()
    }
    render() {
        return (<div>
            <div className={cssClasses.topDiv}>
                <GoogleLogout
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                    className={cssClasses.logout}
                />
                <button className={cssClasses.addButton} onClick={this.addCar}>add</button>
            </div>
            {
                this.state.showPopap ? <div className={cssClasses.addCarPopap}>
                        <label style={{'marginLeft': '120px'}}>
                            brand
                            <input type="text" name="brand" className={cssClasses.input}  value={this.state.car.brand} onChange={this.handleInputChange} />
                        </label>
                        <label style={{'marginLeft': '120px'}}>
                            model
                            <input type="text" name="model" className={cssClasses.input}  value={this.state.car.model} onChange={this.handleInputChange} />
                        </label>
                        <label style={{'marginLeft': '120px'}}>
                            year
                            <input type="number" name="year" className={cssClasses.input} value={this.state.car.year} onChange={this.handleInputChange} />
                        </label>
                        <label style={{'marginLeft': '120px'}}>
                            color
                            {
                                this.state.selectColor ? <SketchPicker color={ this.state.background } onChangeComplete={ this.handleSelectColor } /> :
                                    <button style={{'display': 'block', 'marginLeft': '32%'}}
                                        onClick={this.changeSelectColor}> select color </button>

                            }
                        </label>
                        <button className={cssClasses.createButton} onClick={this.createCar}>create</button>
                </div>
                    : null
            }
            <div style={{'marginTop': '20px'}}>
                {
                    this.state.showDeleteButton ? <button className={cssClasses.deleteButton} onClick={this.deleteCars}>DELETE</button> : null
                }
                <div className={cssClasses.headDiv}>

                    <div className={cssClasses.smallColumn}>id</div>
                    <div className={cssClasses.column}>brand</div>
                    <div className={cssClasses.column}>model</div>
                    <div className={cssClasses.smallColumn}>year</div>
                    <div className={cssClasses.smallColumn} style={{'marginLeft': '7%'}}>color</div>
                </div>
                {
                    this.state.cars.map((value, index) => {
                        return <div className={cssClasses.corners} key={index} id={index}>
                            <input type="checkbox" key={index} style={{'float': 'left'}} defaultChecked={(!!value.selected)} onChange={this.handleCarSelect} />
                            <div className={cssClasses.smallColumn} style={{'marginLeft': '7%'}}>{value.id}</div>
                            <div className={cssClasses.column} >{value.brand}</div>
                            <div className={cssClasses.column} >{value.model}</div>
                            <div className={cssClasses.smallColumn} >{value.year}</div>
                            <div className={cssClasses.smallColumn} style={{'marginLeft': '7%'}}>{ntc.name(value.color)[1]}</div>
                            <button className={cssClasses.updateButton} onClick={this.openUpdateCarPopap}>Edit</button>
                            {
                                this.state.showUpdateCarPopap ? <div className={cssClasses.addCarPopap}>
                                    <label style={{'marginLeft': '120px'}}>
                                        id
                                        <input type="text" name="id" className={cssClasses.input} readOnly = {true} value={this.state.updateCar.id} />
                                    </label>
                                    <label style={{'marginLeft': '120px'}}>
                                        brand
                                        <input type="text" name="brand" className={cssClasses.input}  value={this.state.updateCar.brand} onChange={this.handleUpdateInputChange} />
                                    </label>
                                    <label style={{'marginLeft': '120px'}}>
                                        model
                                        <input type="text" name="model" className={cssClasses.input}  value={this.state.updateCar.model} onChange={this.handleUpdateInputChange} />
                                    </label>
                                    <label style={{'marginLeft': '120px'}}>
                                        year
                                        <input type="number" name="year" className={cssClasses.input} value={this.state.updateCar.year} onChange={this.handleUpdateInputChange} />
                                    </label>
                                    <label style={{'marginLeft': '120px'}}>
                                        color
                                        {
                                            this.state.selectColor ? <SketchPicker color={ this.state.background } onChangeComplete={ this.handleUpdateSelectColor } /> :
                                                <button style={{'display': 'block', 'marginLeft': '32%'}}
                                                        onClick={this.changeSelectColor}> select color </button>

                                        }
                                    </label>
                                    <button className={cssClasses.createButton} onClick={this.updateCar}>update</button>
                                </div> : null
                            }
                        </div>
                    })
                }
            </div>


        </div>
        )
    }
}