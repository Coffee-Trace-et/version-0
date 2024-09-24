package controllers

import (
	"coeffee/domain"

	"github.com/gin-gonic/gin"
)

type OrderController struct {
	OrderUseCase domain.OrderUseCase
}

func NewOrderController(oc domain.OrderUseCase) *OrderController {
	return &OrderController{
		OrderUseCase: oc,
	}
}

func (oc *OrderController) CreateOrder(c *gin.Context) {
	var order domain.Order
	c.BindJSON(&order)

	userId := c.Param("user_id")
	// productId := c.Param("productId")

	// response := oc.OrderUseCase.CreateOrder(userId, productId, order)
	order.MerchantID = userId

	response, err := oc.OrderUseCase.CreateOrder(order)
	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON( 200, gin.H{
		"message": "Order created successfully",
		"data": response,
	})
}