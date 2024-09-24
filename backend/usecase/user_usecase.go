package usecase

import (
	"coeffee/domain"
	"coeffee/infrastructure"
	"coeffee/utils"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserUseCase struct {
	UserRepository		domain.UserRepository
	contextTimeout  	time.Duration
	
}

func NewUserUseCase(userRepository domain.UserRepository, timeout time.Duration) domain.UserUseCase {
	return &UserUseCase{
		UserRepository: userRepository,
		contextTimeout: timeout,
	}
}

func (uc *UserUseCase) GetAllUser(AdminID string) interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	

	existingUser , err := uc.UserRepository.GetUserByID(ctx, AdminID)

	if err != nil {
		return domain.ErrorResponse{Message: "Admin not found" , Status: 404}
	}

	if existingUser.Role != "admin" {
		return domain.ErrorResponse{Message: "You are not authorized to View this Page", Status: 401}
	}

	defer cancel()

	user, err := uc.UserRepository.GetAllUser(ctx)
	if err != nil {
		return nil
	}
	return user
}

func (uc *UserUseCase) GetUserByID(id string) interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	user, err := uc.UserRepository.GetUserByID(ctx, id)
	if err != nil {
		return domain.User{}
	}
	user.Password = ""

	return user
}

func (uc *UserUseCase) CreateUser(user domain.UserRegister) interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	if user.Email == "" || user.Password == "" || user.Name == "" || user.PhoneNumber == "" || user.Address == "" {
		return domain.ErrorResponse{Message: "Please fill all fields", Status: 400}
	}


	// copy the userRegister data into a new user Datza 
	
	newUser := domain.User{}
	newUser.ID = primitive.NewObjectID()
	newUser.Name = user.Name
	newUser.Email = user.Email
	
	newUser.Role = "merchant"
	newUser.PhoneNumber = user.PhoneNumber
	newUser.Address = user.Address
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()
	
	hashedPassword, err := utils.HashPassword(newUser.Password)

	if err != nil {
		return domain.ErrorResponse{Message: "Failed to hash password", Status: 500}
	}

	newUser.Password = hashedPassword
	

	err = uc.UserRepository.CreateUser(ctx, newUser)
	if err != nil {
		return domain.ErrorResponse{Message: "Failed to create user", Status: 500}
	}

	return domain.SuccessResponse{Message: "User created successfully", Status: 200}

}


// func (uc *UserUseCase) UpdateUser(id string, user domain.User) interface{} {
// 	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
// 	defer cancel()

// 	user, err := uc.UserRepository.UpdateUser(ctx, id, user)
// 	if err != nil {
// 		return domain.User{}, err
// 	}

// 	return user, nil
// }

// func (uc *UserUseCase) DeleteUser(id string) interface{} {
// 	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
// 	defer cancel()

// 	user, err := uc.UserRepository.DeleteUser(ctx , id)
// 	if err != nil {
// 		return domain.User{}, err
// 	}

// 	return user, nil
// }

func (uc *UserUseCase) Login(user domain.UserLogin) interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	// find user by email 
	existingUser , err := uc.UserRepository.FindUserByEmail(ctx, user.Email)

	if err != nil {
		return domain.ErrorResponse{Message: "User not found" , Status: 404}
	}

	fmt.Println(existingUser , "**************************")
	fmt.Println(user.Password , existingUser.Password , "89652489651894651")
	match := utils.ComparePassword(user.Password , existingUser.Password)

	if !match {
		return domain.ErrorResponse{Message: "Invalid email or password", Status: 400}
	}

	token, err := infrastructure.GenerateToken(existingUser.ID.Hex())

	if err != nil {
		return domain.ErrorResponse{Message: "Failed to generate token", Status: 500}
	}

	existingUser.Password = ""

	return domain.LoginSucessResponse{Message: "Login successful", Status: 200, AcessToken: token , UserData: existingUser}  

}

func (uc *UserUseCase) CreateFarmer(AdminID string , user domain.UserRegister) interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	// since only admin can add the farmer we have to get the admin id from the context
	// and then check if the user is an admin before creating the farmer


	// existingUser , err := uc.UserRepository.GetUserByID(ctx, AdminID)

	// if err != nil {
	// 	return domain.ErrorResponse{Message: "Admin not found" , Status: 404}
	// }

	// if existingUser.Role != "admin" {
	// 	return domain.ErrorResponse{Message: "You are not authorized to create a farmer", Status: 401}
	// }


	newUser := domain.User{}
	newUser.ID = primitive.NewObjectID()
	newUser.Name = user.Name
	newUser.Email = user.Email
	newUser.Role = "farmer"
	newUser.Password = user.Password
	newUser.PhoneNumber = user.PhoneNumber
	newUser.Address = user.Address
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()

	err := uc.UserRepository.CreateUser(ctx, newUser)

	if err != nil {
		return domain.ErrorResponse{Message: "Failed to create farmer", Status: 500}
	}

	return domain.SuccessResponse{Message: "Farmer created successfully", Status: 200}

}

func (uc *UserUseCase) CreateDriver(AdminID string , user domain.UserRegister) interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	// existingUser , err := uc.UserRepository.GetUserByID(ctx, AdminID)

	// if err != nil {
	// 	return domain.ErrorResponse{Message: "Admin not found" , Status: 404}
	// }

	// if existingUser.Role != "admin" {
	// 	return domain.ErrorResponse{Message: "You are not authorized to create a farmer", Status: 401}
	// }

	newUser := domain.User{}
	newUser.ID = primitive.NewObjectID()
	newUser.Name = user.Name
	newUser.Email = user.Email
	newUser.Role = "driver"
	newUser.Password = user.Password
	newUser.PhoneNumber = user.PhoneNumber
	newUser.Address = user.Address
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()
	newUser.PlateNumber = user.PlateNumber
	newUser.LicenseNumber = user.LicenseNumber
	newUser.TruckCapacity = user.TruckCapacity

	err := uc.UserRepository.CreateUser(ctx, newUser)
	
	if err != nil {
		return domain.ErrorResponse{Message: "Failed to create driver", Status: 500}
	}

	return domain.SuccessResponse{Message: "Driver created successfully", Status: 200}
}