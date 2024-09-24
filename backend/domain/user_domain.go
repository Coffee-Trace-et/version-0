package domain

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// id	UUID	Unique identifier for each user
// name	VARCHAR	Full name of the user
// email	VARCHAR	User's email address
// password	VARCHAR	Hashed password
// role	ENUM	FARMER, BUYER, DRIVER, ADMIN
// phone_number	VARCHAR	User's phone number
// address	VARCHAR	Physical address
// created_at	TIMESTAMP	Time when the user was created
// updated_at	TIMESTAMP	Last update time

// User represents the user model.

type LocationType struct {
	Longtiude float64 `bson:"longtiude" json:"longtiude"`
	Latitude float64 `bson:"latitude" json:"latitude"`
	Description string `bson:"description" json:"description"`
}

type User struct {
	ID primitive.ObjectID `bson:"_id,omitempity" json:"id" `
	Name string `bson:"name" json:"name"`
	Email string `bson:"email" json:"email"`
	Password string `bson:"password" json:"password"`
	Role string `bson:"role" json:"role"`
	PhoneNumber string `bson:"phone_number" json:"phone_number"`
	Address string `bson:"address" json:"address"`
	CreatedAt	time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time`bson:"updated_at" json:"updated_at"`
	PlateNumber string `bson:"plate_number" json:"plate_number"`
	LicenseNumber string `bson:"license_number" json:"license_number"`
	TruckCapacity int `bson:"truck_capacity" json:"truck_capacity"`
	Location []LocationType `bson:"location" json:"location"`
	
}



type UserUseCase interface {
	GetAllUser(AdminID string) interface{}
	GetUserByID(id string) interface{}
	CreateUser(user UserRegister) interface{}
	// UpdateUser(id string, user User) interface{}
	// DeleteUser(id string) interface{}
	Login(user UserLogin) interface{}
	CreateFarmer(AdminID string , user UserRegister) interface{}
	CreateDriver(AdminID string , user UserRegister) interface{}
}

type UserRepository interface {
	GetAllUser(ctx context.Context) ([]User, error)
	GetUserByID(ctx context.Context ,id string) (User, error)
	CreateUser(ctx context.Context , user User) (error)
	// UpdateUser(ctx context.Context ,id string, user User) (User, error)
	// DeleteUser(ctx context.Context ,id string) (User, error)
	// Login(ctx context.Context ,user UserLogin) (User, error)
	FindUserByEmail(ctx context.Context, email string) (User, error)
}

type JwtCustomClaims struct {
	UserID string `json:"user_id"`
}

type LocationUpdateRequest struct {
	Longtiude float64 `json:"longtiude"`
	Latitude float64 `json:"latitude"`
	Description string `json:"description"`
	Color string `json:"color"`
	Time time.Time `json:"time"`
}