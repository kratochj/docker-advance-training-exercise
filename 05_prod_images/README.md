# Labeling Docker objects #

## Adding label to image ##

**Exercise:** Create docker image with label `com.example.label-with-value="foo"` and prove that image contains the label.

**Hint:** Use Dockerfile to create image and `docker images --help`

Check images with label:
```
docker images --filter label=com.example.label-with-value
# OR
docker images --filter label=com.example.label-with-value=foo
```

**Adding label to container**

**Exercise:** Override container labels at runtime.
**Hint:** Alter label - `docker run --help`, Check label - `docker ps --help`.
