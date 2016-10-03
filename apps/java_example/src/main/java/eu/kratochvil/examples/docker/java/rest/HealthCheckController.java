package eu.kratochvil.examples.docker.java.rest;

import eu.kratochvil.examples.docker.java.rest.response.HealthCheckResponse;
import eu.kratochvil.examples.docker.java.service.HealthCheckService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/health")
public class HealthCheckController {

	private static final Logger logger = LoggerFactory.getLogger(HealthCheckController.class);

	@Autowired
	private HealthCheckService healthCheckService;


	@RequestMapping(method = RequestMethod.GET)
	public HealthCheckResponse healthCheck() {
		logger.debug("Checking system status");
		return new HealthCheckResponse(true, healthCheckService.getVersion());
	}
}
