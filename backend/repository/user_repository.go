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

func (ur *userRepository) CreateAccount(user domain.User) (domain.User, error) {
	ctx := context.Background()
	user.ID = primitive.NewObjectID()

	_, err := ur.database.Collection(ur.collection).InsertOne(ctx, user)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (ur *userRepository) Login(user domain.User) (domain.User, error) {
	ctx := context.Background()

	filter := bson.M{"email": user.Email}
	err := ur.database.Collection(ur.collection).FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (ur *userRepository) GetAllUserByEmial(email string) (domain.User, error) {
	ctx := context.Background()
	var user domain.User

	filter := bson.M{"email": email}
	err := ur.database.Collection(ur.collection).FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}


func (ur *userRepository) GetByID(id string) (domain.User, error) {
	ctx := context.Background()
	var user domain.User

	objectID, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": objectID}
	err := ur.database.Collection(ur.collection).FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}

func (ur *userRepository) UpdateProfile(id string, user domain.User) (domain.User, error) {
	ctx := context.Background()

	objectID, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": user}

	_, err := ur.database.Collection(ur.collection).UpdateOne(ctx, filter, update)
	if err != nil {
		return domain.User{}, err
	}

	return user, nil
}	