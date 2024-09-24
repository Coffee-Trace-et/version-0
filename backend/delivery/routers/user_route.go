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


func NewUserRouter(route *gin.RouterGroup, config *config.Config, DB mongo.Database){

	timeout := time.Duration(config.ContextTimeout) * time.Second
	
	repo := repository.NewUserRepository(DB, config.UserCollection)
	usecase := usecase.NewUserUseCase(repo , timeout)

	userHandler := controllers.UserController{
		UserUsecase: usecase,
	}

	route.POST("/login", userHandler.Login)
	route.POST("/users", userHandler.CreateUser)
	// route.Use(infrastructure.AuthMiddleware(config.AccessTokenSecret))
	
	route.GET("/users/:id", userHandler.GetUserByID)
	route.GET("/Profile", userHandler.GetMyProfile)


	route.Group("admin")
	route.GET("/users", userHandler.GetAllUser)
	route.POST("/add-farmer", userHandler.CreateFarmer)
	route.POST("/add-driver", userHandler.CreateDriver)

	// route.DELETE("/users/:id", userHandler.DeleteUser)
	// route.PUT("/users/:id", userHandler.UpdateUser)

	// route where a buyer send a request to the current product and the owner will notidied

	

	


}