package repository

import (
	"coeffee/domain"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type userRepository struct {
	database   mongo.Database
	collection string
}

func NewUserRepository(database mongo.Database, collection string) domain.UserRepository {
	return &userRepository{
		database:   database,
		collection: collection}

}

func (r *userRepository) CreateUser(ctx context.Context , user domain.User) (error) {
	// use mongo driver to insert user to database	

	collection := r.database.Collection(r.collection)
	_, err := collection.InsertOne(ctx, user)

	if err != nil {
		return err
	}

	return nil
}


func (r *userRepository) GetAllUser(ctx context.Context) ([]domain.User, error) {

	collection := r.database.Collection(r.collection)
	cursor, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	var users []domain.User
	if err = cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
	
}

func (r *userRepository) GetUserByID(ctx context.Context , id string) (domain.User, error) {
	// tmplment the logic to get user by id from the database

	newid , err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return domain.User{} , err
	}

	collection := r.database.Collection(r.collection)
	filter := bson.M{"_id": newid}

	var user domain.User
	err = collection.FindOne(ctx, filter).Decode(&user)

	if err != nil {
		return domain.User{} , err
	}

	return user, nil

}

// find by email

func (r *userRepository) FindUserByEmail(ctx context.Context, email string) (domain.User, error) {
	collection := r.database.Collection(r.collection)
	filter := bson.M{"email": email}

	var user domain.User
	err := collection.FindOne(ctx, filter).Decode(&user)

	if err != nil {
		return domain.User{} , err
	}

	return user, nil
}


// func (r *userRepository) UpdateUser(ctx context.Context , id string, user domain.User) (domain.User, error) {
// 	return domain.User{}, nil
// }

// func (r *userRepository) DeleteUser(ctx context.Context , id string) (domain.User, error) {
// 	return domain.User{}, nil
// }

// func (r *userRepository) Login(ctx context.Context , user domain.UserLogin) (domain.User, error) {
// 	return domain.User{}, nil
// }

// func (r *userRepository) FindUserByEmail(ctx context.Context, email string) (domain.User, error) {
// 	return domain.User{}, nil
// }

