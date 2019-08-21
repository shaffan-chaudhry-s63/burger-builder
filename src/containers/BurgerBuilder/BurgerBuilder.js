import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasing: false
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = this.state.ingredients[type] + 1;

    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    })
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }

    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = this.state.ingredients[type] - 1;

    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    return (<Aux>
      <Modal 
        show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
        <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice} />
      </Modal>
      <Burger ingredients={this.state.ingredients} />
      <BuildControls 
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        ordered={this.purchaseHandler}
        price={this.state.totalPrice} />
    </Aux>)
  }
}

export default BurgerBuilder;
