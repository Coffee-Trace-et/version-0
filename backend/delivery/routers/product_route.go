package routers

import (
	"coeffee/config"
	"coeffee/delivery/controllers"
	"coeffee/repository"
	"coeffee/usecase"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewProductRouter(route *gin.RouterGroup, config *config.Config, DB mongo.Database) {

	timeout := time.Duration(config.ContextTimeout) * time.Second

	repo := repository.NewProductRepository(DB, config.ProductCollection)
	usecase := usecase.NewProductUseCase(repo, timeout)

	productHandler := controllers.ProductController{
		ProductUsecase: usecase,
	}


	route.POST("/products", productHandler.CreateProduct)
	// order the current product
	// route.GET("/products", productHandler.GetAllProduct)
	// route.GET("/products/:id", productHandler.GetProductByID)
	// route.DELETE("/products/:id", productHandler.DeleteProduct)
	// route.PUT("/products/:id", productHandler.UpdateProduct)

	// filter products by category

}