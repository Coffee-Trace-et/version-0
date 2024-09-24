package controllers

import (
	"coeffee/domain"

	"github.com/gin-gonic/gin"
)

type OrderController struct {
	OrderUseCase domain.OrderUseCase
}


func (oc *OrderController) CreateOrder(c *gin.Context) {
	var order domain.Order
	
	userID := c.GetString("user_id")
	productId := c.Param("id")
	err := c.ShouldBindJSON(&order)
	if err != nil {
		HandleResponse(c, domain.ErrorResponse{Message: err.Error(), Status: 400})
		return
	}

	response := oc.OrderUseCase.CreateOrder(userID, productId,  order)
	
	HandleResponse(c, response)
}

// Accept Order 
func (oc *OrderController) AcceptOrder(c *gin.Context) { 

	orderID := c.Param("id")
	userID := c.GetString("user_id")



	response := oc.OrderUseCase.UpdateOrder(userID, orderID , "accepted")
	HandleResponse(c, response)

}

// Reject Order

func (oc *OrderController) RejectOrder(c *gin.Context) {
	orderID := c.Param("id")
	userID := c.GetString("user_id")

	response := oc.OrderUseCase.UpdateOrder(userID, orderID , "rejected")
	HandleResponse(c, response)
}

// /getm order/

func (oc *OrderController) GetMyOrders(c *gin.Context) { 

	id := c.GetString("user_id")

	response := oc.OrderUseCase.GetMyOrders(id)

	HandleResponse(c, response)

}

// GetCurrentLocation

func (oc *OrderController) GetCurrentLocation(c *gin.Context) {


}

// choose driver

func (oc *OrderController) ChooseDriver(c *gin.Context) { 
	
	orderID := c.Param("orderid")
	driverID := c.Param("driverid")
	userid := c.GetString("user_id")

	response := oc.OrderUseCase.ChooseDriver(userid , orderID, driverID)

	HandleResponse(c, response)
}

// approve driver

func (oc *OrderController) ApproveDriver(c *gin.Context) {

}

// reject driver

func (oc *OrderController) RejectDriver(c *gin.Context) {

}