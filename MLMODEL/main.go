package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Struct to hold the predict request
type PredictRequest struct {
  Days int `json:"days"`
}

// Struct to hold the predict response
type Prediction struct {
  Date  string  `json:"ds"`
  Price float64 `json:"yhat"`
}

func callTrainEndpoint() {
  // Call the /train endpoint (assuming Flask server is running locally on port 5000)
  url := "http://localhost:5000/train"
  resp, err := http.Get(url) // Adjust according to the training endpoint implementation
  if err != nil {
    fmt.Println("Error calling /train:", err)
    return
  }
  defer resp.Body.Close()
  fmt.Println("Train endpoint called, status code:", resp.StatusCode)
}

func callPredictEndpoint(days int) ([]Prediction, error) {
  // Prepare the request body
  reqBody, err := json.Marshal(PredictRequest{Days: days})
  if err != nil {
    return nil, fmt.Errorf("error creating request body: %v", err)
  }

  // Call the /predict endpoint
  url := "http://localhost:5000/predict"
  resp, err := http.Post(url, "application/json", bytes.NewBuffer(reqBody))
  if err != nil {
    return nil, fmt.Errorf("error calling /predict: %v", err)
  }
  defer resp.Body.Close()

  // Parse the response
  var predictions []Prediction
  err = json.NewDecoder(resp.Body).Decode(&predictions)
  if err != nil {
    return nil, fmt.Errorf("error parsing response: %v", err)
  }

  return predictions, nil
}

func main() {
  r := gin.Default()

  // Schedule a cron-like job for training daily (use a proper cron package for production environments)
  go func() {
    for {
      callTrainEndpoint()
      time.Sleep(24 * time.Hour) // Wait 24 hours before calling again
    }
  }()

  // Endpoint to trigger predictions
  r.POST("/predict", func(c *gin.Context) {
    var req PredictRequest
    if err := c.ShouldBindJSON(&req); err != nil {
      c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
      return
    }

    predictions, err := callPredictEndpoint(req.Days)
    if err != nil {
      c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
      return
    }

    c.JSON(http.StatusOK, predictions)
  })

  // Endpoint to trigger the training manually if needed
  r.GET("/train", func(c *gin.Context) {
    callTrainEndpoint()
    c.JSON(http.StatusOK, gin.H{"status": "Training initiated"})
  })

  // Start the Gin server
  r.Run(":8080")
}
