package controllers

import (
	"coeffee/domain"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	UserUsecase domain.UserUseCase
}

// create a user 
func (uc *UserController) CreateUser( c *gin.Context) {
	var user domain.UserRegister
	
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result := uc.UserUsecase.CreateUser(user)

	HandleResponse(c, result)

}

// login a user

func (uc *UserController) Login(c *gin.Context) {
	var user domain.UserLogin

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result := uc.UserUsecase.Login(user)

	HandleResponse(c, result)
}

// create a farmer

func (uc *UserController) CreateFarmer(c *gin.Context) {
	var user domain.UserRegister

	// get the current logged in user id from the context

	adminID := c.GetString("userID")

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result := uc.UserUsecase.CreateFarmer(adminID , user)

	HandleResponse(c, result)
}

// // create a driver

func (uc *UserController) CreateDriver(c *gin.Context) {
	var user domain.UserRegister

	adminID := c.GetString("userID")
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result := uc.UserUsecase.CreateDriver(adminID, user)

	HandleResponse(c, result)
}


func (uc *UserController) GetMyProfile(c *gin.Context) {
	userID := c.GetString("userID")

	result := uc.UserUsecase.GetUserByID(userID)

	HandleResponse(c, result)
}

func (uc *UserController) GetAllUser(c *gin.Context) {
	AdminID := c.GetString("userID")

	// check if the user is an admin before getting all the users
	result := uc.UserUsecase.GetAllUser(AdminID)

	HandleResponse(c, result)


}

func (uc *UserController) GetUserByID(c *gin.Context) {
	id := c.Param("id")

	result := uc.UserUsecase.GetUserByID(id)

	HandleResponse(c, result)
}



