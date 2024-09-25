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

func NewChatRouter(route *gin.RouterGroup, config *config.Config, DB mongo.Database) {

	timeout := time.Duration(config.ContextTimeout) * time.Second

	chatRepo := repository.NewChatRepository(DB, "chat")

	chatUseCase := usecase.NewChatUseCase(chatRepo, timeout)

	chatHandler := controllers.NewChatController(chatUseCase)

	route.POST("/chat", chatHandler.CreateChat)
	// get all chat
	route.GET("/chat/:id", chatHandler.GetAllChat)


	


}