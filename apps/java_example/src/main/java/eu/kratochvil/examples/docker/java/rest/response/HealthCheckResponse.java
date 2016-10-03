package eu.kratochvil.examples.docker.java.rest.response;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class HealthCheckResponse {

	boolean healthStatus;

	String version;

	public HealthCheckResponse(boolean healthStatus) {
		this(healthStatus, null);
	}

	public HealthCheckResponse(boolean healthStatus, String version) {
		this.healthStatus = healthStatus;
		this.version = version;
	}

	public boolean isHealthStatus() {
		return healthStatus;
	}

	public void setHealthStatus(boolean healthStatus) {
		this.healthStatus = healthStatus;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return new ToStringBuilder(this)
				.append("healthStatus", healthStatus)
				.append("version", version)
				.toString();
	}
}
