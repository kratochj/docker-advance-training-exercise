package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

var (
	shutdownSignals = []os.Signal{os.Interrupt, syscall.SIGTERM}
)

func main() {
	fmt.Println("Starting application")
	stopChannel := SetupSignalHandler()

	fmt.Println("Waiting for receiving event to stop")

	<-stopChannel
	time.Sleep(2 * time.Second)
	fmt.Println("Cleanup finished, exiting")

	return
}

func SetupSignalHandler() (stopCh <-chan struct{}) {
	fmt.Println("Creating signal handler")

	stop := make(chan struct{})
	c := make(chan os.Signal, 2)
	signal.Notify(c, shutdownSignals...)
	go func() {
		s := <-c
		fmt.Printf("Received stop signal and starting Cleanup: %+v\n", s)
		close(stop)
		<-c
		fmt.Println("Exiting now")
		os.Exit(1) // second signal. Exit directly.
	}()

	return stop
}
