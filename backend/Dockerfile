# Dockerfile

# Stage 1: Build the Go application
FROM golang:

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files first to leverage Docker's caching mechanism
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the Go application (assuming the entry point is cmd/main.go)
RUN go build -o /app/main ./cmd

# Stage 2: Create the final minimal image to run the app
FROM alpine:latest

# Set up working directory in the final image
WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Copy .env file into the container
COPY .env .env

# Expose the application's port
EXPOSE 8080

# Run the application
CMD ["./main"]
