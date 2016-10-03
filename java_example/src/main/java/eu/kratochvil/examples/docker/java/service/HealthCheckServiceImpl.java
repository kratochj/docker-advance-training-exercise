package eu.kratochvil.examples.docker.java.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@Service
@PropertySource("classpath:/app.properties")
public class HealthCheckServiceImpl implements HealthCheckService {

    @Value("${application.version}")
    private String version = "N/A";


    public String getVersion() {
        return version;
    }
}
