package controllers

import (
	"coeffee/domain"

	"github.com/gin-gonic/gin"
)

type ProductController struct {
	ProductUsecase domain.ProductUseCase
}
// create a product

func (pc *ProductController) CreateProduct(c *gin.Context) {
	var product domain.Product

	// get the id of the current logged in user from the context
	userID := c.GetString("userID")

	
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result := pc.ProductUsecase.CreateProduct(userID, product)

	HandleResponse(c, result)
}

