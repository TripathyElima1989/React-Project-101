import React from 'react';

class Item extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      clikcs: 0,
      totalRemainig: 100,
    }
  }

  clickMe(){
    this.setState({
      clikcs: this.state.clikcs + 1,
      totalRemainig: this.state.totalRemainig - 1
    })
  }
  
  render(){
    return(
      <div>
 <h1 onClick={() => this.clickMe()}>Hello from {this.props.name}</h1>
 <span>{this.state.clikcs} is the number of clicks. {this.state.totalRemainig}</span>
      </div>
    )
  }
  
}

export default Item;