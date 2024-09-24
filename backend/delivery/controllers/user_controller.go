package controllers

import (
	"coeffee/domain"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	UserUsecase domain.UserUseCase
}


func NewUserController(userUsecase domain.UserUseCase) *UserController {
	return &UserController{UserUsecase: userUsecase}
}


func(uc *UserController) CreateAccount(c *gin.Context) {
	var user domain.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result,err := uc.UserUsecase.CreateAccount(user)
	if err.Message != "" {
		c.JSON(400, gin.H{
			"status": err.Status,
			"message": err.Message,
		})
		return
	}
	c.JSON(200, gin.H{"data": result})
}




func(uc *UserController) Login(c *gin.Context) {
	var user domain.User
	
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result,err := uc.UserUsecase.Login(user)
	if err.Message != "" {
		c.JSON(400, gin.H{
			"status": err.Status,
			"message": err.Message,
	})
		return
	}

	c.JSON(200, gin.H{"data": result})
}

func(uc *UserController) GetByID(c *gin.Context) {
	id := c.Param("id")

	result,err := uc.UserUsecase.GetByID(id)

	if err.Message != "" {
		c.JSON(400, gin.H{
			"status": err.Status,
			"message": err.Message,
		})
		return
	}

	c.JSON(200, gin.H{"data": result})
}

func (uc *UserController) UpdateProfile(c *gin.Context) {
	var req struct {
		ID   string      `json:"id"`
		User domain.User `json:"user"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	result, err := uc.UserUsecase.UpdateProfile(req.ID, req.User)

	if  err.Message != "" {
		c.JSON(400, gin.H{
			"status":  err.Status,
			"message": err.Message,
		})
		return
	}

	c.JSON(200, gin.H{"data": result})
}
















// // create a user 
// func (uc *UserController) CreateUser( c *gin.Context) {
// 	var user domain.UserRegister
	
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

// 	result := uc.UserUsecase.CreateUser(user)

// 	HandleResponse(c, result)

// }

// // login a user

// func (uc *UserController) Login(c *gin.Context) {
// 	var user domain.UserLogin

// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

// 	result := uc.UserUsecase.Login(user)

// 	HandleResponse(c, result)
// }

// // create a farmer

// func (uc *UserController) CreateFarmer(c *gin.Context) {
// 	var user domain.UserRegister

// 	// get the current logged in user id from the context

// 	adminID := c.GetString("userID")

// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

// 	result := uc.UserUsecase.CreateFarmer(adminID , user)

// 	HandleResponse(c, result)
// }

// // // create a driver

// func (uc *UserController) CreateDriver(c *gin.Context) {
// 	var user domain.UserRegister

// 	adminID := c.GetString("userID")
// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}

// 	result := uc.UserUsecase.CreateDriver(adminID, user)

// 	HandleResponse(c, result)
// }


// func (uc *UserController) GetMyProfile(c *gin.Context) {
// 	userID := c.GetString("userID")

// 	result := uc.UserUsecase.GetUserByID(userID)

// 	HandleResponse(c, result)
// }

// func (uc *UserController) GetAllUser(c *gin.Context) {
// 	AdminID := c.GetString("userID")

// 	// check if the user is an admin before getting all the users
// 	result := uc.UserUsecase.GetAllUser(AdminID)

// 	HandleResponse(c, result)


// }

// func (uc *UserController) GetUserByID(c *gin.Context) {
// 	id := c.Param("id")

// 	result := uc.UserUsecase.GetUserByID(id)

// 	HandleResponse(c, result)
// }



