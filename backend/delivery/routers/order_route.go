package routers

import (
	"coeffee/config"
	"coeffee/delivery/controllers"
	"coeffee/infrastructure"
	"coeffee/repository"
	"coeffee/usecase"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewOrderRouter(route *gin.RouterGroup, config *config.Config, DB mongo.Database) {

	timeout := time.Duration(config.ContextTimeout) * time.Second

	repo := repository.NewOrderRepository(DB, config.OrderCollection)
	Notifyrepo := repository.NewNotificationRepository(DB, config.NotificationCollection)
	Userrepo := repository.NewUserRepository(DB, config.UserCollection)
	prodrepo := repository.NewProductRepository(DB, config.ProductCollection)
	usecase := usecase.NewOrderUseCase(repo,Notifyrepo , Userrepo ,prodrepo,  timeout)

	orderHandler := controllers.OrderController{
		OrderUseCase: usecase,
	}

	// order the current product
	route.Use(infrastructure.AuthMiddleware())
	route.POST("/products/:id/order",  orderHandler.CreateOrder)
	//  route to approve the order and reject
	route.POST("/orders/:id/accept", orderHandler.AcceptOrder)
	route.POST("/orders/:id/reject", orderHandler.RejectOrder)
	route.GET("/orders/my", orderHandler.GetMyOrders)
	route.POST("/updatelocation" , orderHandler.GetCurrentLocation)

	route.POST("/orders/:orderid/choose-driver/:driverid", orderHandler.ChooseDriver)
	route.POST("/orders/:orderid/approve", orderHandler.ApproveDriver)
	route.POST("/orders/:orderid/reject", orderHandler.RejectDriver)
	



	// route.GET("/orders/:id", orderHandler.GetOrderById)



	// route.GET("/products", productHandler.GetAllProduct)
	// route.GET("/products/:id", productHandler.GetProductByID)
	// route.DELETE("/products/:id", productHandler.DeleteProduct)
	// route.PUT("/products/:id", productHandler.UpdateProduct)

	// filter products by category


}