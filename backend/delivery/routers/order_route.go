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

func NewOrderRouter(route *gin.RouterGroup, config *config.Config, DB mongo.Database) {

	timeout := time.Duration(config.ContextTimeout) * time.Second

	repo := repository.NewOrderRepository(DB, config.OrderCollection)
	Notifyrepo := repository.NewNotificationRepository(DB, config.NotificationCollection)
	Userrepo := repository.NewUserRepository(DB, config.UserCollection)
	prodrepo := repository.NewProductRepository(DB, config.ProductCollection)
	usecase := usecase.NewOrderUseCase(repo,Notifyrepo , Userrepo ,prodrepo,  timeout)

	orderController := controllers.NewOrderController(usecase)


	order := route.Group("/order")
	{
		order.POST("/create", orderController.CreateOrder)
		// order.GET("/getmyorders", usecase.GetMyOrders)
	}



}