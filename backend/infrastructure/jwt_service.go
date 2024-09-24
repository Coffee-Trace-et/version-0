package infrastructure

import (
	"coeffee/domain"

	"github.com/dgrijalva/jwt-go"
)

func GenerateToken(id string) (string, error) {
	
	claims := &domain.JwtCustomClaims{
		UserID: id,
	}
	
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{"claims": claims})

	tokenString, err := token.SignedString([]byte("secret"))

	if err != nil {
		return "", err
	}

	return tokenString, nil

}	