package main

import (
	"coeffee/config"
	"coeffee/delivery/routers"
	"fmt"

	"github.com/gin-gonic/gin"
)


func main() {

	server := gin.Default()

	
	env, err := config.LoadEnv()

	if err != nil {
		fmt.Print("Error in env.load")
	}
	
	DB, client, err := config.ConnectDB(env.DatabaseUrl, env.DbName)
	
	if err != nil {
		fmt.Print("Error in connectDB")
	}
	
	defer config.CloseDB(client)

	routers.Router(server.Group("api/v0"), env, DB)
	server.Run(fmt.Sprintf(":%d", env.Port))

}
