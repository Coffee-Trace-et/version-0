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

func NewForumRouter(route *gin.RouterGroup, config *config.Config, DB mongo.Database) {

	timeout := time.Duration(config.ContextTimeout) * time.Second

	repo := repository.NewForumRepository(DB, config.BlogCollection)
	replyrepo := repository.NewReplyRepository(DB, config.ReplyCollection)

	usecase := usecase.NewBlogUseCase(repo, replyrepo ,  timeout)

	forumController := controllers.NewForumController(usecase)

	


	forum := route.Group("/forum")
	{
		forum.POST("/post", forumController.CreatePost)
		forum.GET("/getBlogById/:id", forumController.GetBlogByID)
		forum.GET("/getAllBlog", forumController.GetAllBlog)
		forum.POST("/:id/reply", forumController.CreateReply)
	}



}