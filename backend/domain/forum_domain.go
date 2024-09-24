package domain

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Blog struct {
	ID          primitive.ObjectID `bson:"_id,omitempity" json:"id" `
	UserID      string             `json:"user_id"`
	Title       string             `json:"title"`
	Description string             `json:"description"`
	Tags        []string           `json:"tags"`
}

type Reply struct {
	ID    primitive.ObjectID `bson:"_id,omitempity" json:"id" `
	UserID string `json:"user_id"`
	Reply string `json:"reply"`
	BlogID string `json:"blog_id"`
}

type BlogRepository interface {
	CreateBlog(ctx context.Context , blog Blog) (Blog, error)
	GetAllBlog(ctx context.Context , bytag , pagesize , limit string) ([]Blog, error)
	GetBlogByID(ctx context.Context  , id string) (Blog, error)
	
}

type BlogUseCase interface {
	CreateBlog(blog Blog) (SuccessResponse, ErrorResponse)
	GetAllBlog(bytag , pagesize , limit string) ([]Blog, error)
	GetBlogByID(id string) (Blog, error)
	CreateReply(reply Reply)(Reply, error)
}

type ReplyRepository interface {
	CreateReply(ctx context.Context, reply Reply)(Reply, error)
}
