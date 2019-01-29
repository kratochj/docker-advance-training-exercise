package main

import (
	"time"
	"fmt"
)

func main() {
	fmt.Println("Sleeping")
	time.Sleep(1000 * time.Second)
	fmt.Println("Cleanup before end")
	return
}

