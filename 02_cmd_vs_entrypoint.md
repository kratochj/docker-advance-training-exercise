Test difference between CMD and ENTRYPOINT
===========================================

Create Dockerfiles for these variations and check how command is executed in container:

- plain string
  ```
  CMD ping localhost
  ```

- array of commands
  ```
  CMD["ping", "localhost"]
  ```

- separate entrypoint
  ```
  ENTRYPOINT ["ping"]
  CMD ["localhost"]
  ```

- Specify Environemnt variables in different forms and observe behavior
