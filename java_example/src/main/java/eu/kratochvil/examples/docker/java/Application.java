package eu.kratochvil.examples.docker.java;
	
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

@SpringBootApplication
public class Application {

	private static final Logger logger = LoggerFactory.getLogger(Application.class);

	@Bean
	protected ServletContextListener listener() {
		return new ServletContextListener() {

			public void contextInitialized(ServletContextEvent sce) {
				logger.info("ServletContext initialized");
			}

			public void contextDestroyed(ServletContextEvent sce) {
				logger.info("ServletContext destroyed");
			}
		};
	}

	public static void main(String[] args) throws Exception {
		Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				logger.info("Application is exiting");
			}
		});

		SpringApplication.run(Application.class, args);
	}
}
