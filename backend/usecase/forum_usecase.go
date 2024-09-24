package usecase

import (
	"coeffee/domain"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BlogUseCase struct {
	BlogRepository		domain.BlogRepository
	ReplyRepository    domain.ReplyRepository
	contextTimeout  	time.Duration
}

func NewBlogUseCase(blog domain.BlogRepository, reply domain.ReplyRepository , timeout time.Duration ) domain.BlogUseCase {
	return &BlogUseCase{
		BlogRepository: blog,
		ReplyRepository: reply,
		contextTimeout: timeout,
	}
}

func (uc *BlogUseCase) CreateBlog(blog domain.Blog) (domain.SuccessResponse, domain.ErrorResponse) {
	
	ctx , cancel := context.WithTimeout(context.Background(), uc.contextTimeout)

	defer cancel()	

	if blog.Title == "" || blog.Description == "" {
		return domain.SuccessResponse{}, domain.ErrorResponse{Message: "Title or Description cannot be empty", Status: 400}
	}
	blog.ID = primitive.NewObjectID()
	_, err := uc.BlogRepository.CreateBlog(ctx, blog)

	if err != nil {
		return domain.SuccessResponse{}, domain.ErrorResponse{Message: "Failed to create blog", Status: 500}
	}

	return domain.SuccessResponse{Message: "Blog created successfully" , Status: 200}, domain.ErrorResponse{}
}

//  get all blog implementation

func (uc *BlogUseCase) GetAllBlog(tag, limit, page string) ([]domain.Blog, error) {
	ctx , cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()
	return uc.BlogRepository.GetAllBlog(ctx , tag, limit, page)
}

// get blog by id


func (uc *BlogUseCase) GetBlogByID(id string) (domain.Blog, error) {
	ctx , cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()
	return uc.BlogRepository.GetBlogByID(ctx, id)
}

func (uc *BlogUseCase) CreateReply(reply domain.Reply) (domain.Reply, error) {
	ctx , cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()
	reply.ID = primitive.NewObjectID()	
	return uc.ReplyRepository.CreateReply(ctx, reply)
}

