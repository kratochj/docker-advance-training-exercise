FROM golang:1.11

WORKDIR /go/src/app
COPY . .

RUN go build -o /go/bin/app

CMD ["/go/bin/app"]
