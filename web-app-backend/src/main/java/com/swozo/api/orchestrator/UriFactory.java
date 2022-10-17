package com.swozo.api.orchestrator;

import com.swozo.config.Config;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;

@Component
public class UriFactory {
    private final String orchestratorServerUrl;
    private static final String SEPARATOR = "/";

    @Autowired
    public UriFactory(@Value("${orchestrator.server.url}") String orchestratorServerUrl) {
        this.orchestratorServerUrl = orchestratorServerUrl;
    }

    public URI createActivityLinksURI(Long moduleActivityID) {
        return createURI(orchestratorServerUrl +
                Config.LINKS +
                SEPARATOR +
                moduleActivityID);
    }

    public URI createSchedulesUri() {
        return createURI(orchestratorServerUrl +
                Config.SCHEDULES);
    }

    public URI createAggregatedSchedulesUri() {
        return createURI(orchestratorServerUrl +
                Config.SCHEDULES + Config.AGGREGATED);
    }

    public URI createServiceConfigurationUri() {
        return createURI(orchestratorServerUrl +
                Config.SCHEDULES + Config.CONFIGURATION);
    }

    public URI createServiceConfigurationUri(String scheduleType) {
        return createURI(orchestratorServerUrl +
                Config.SCHEDULES + Config.CONFIGURATION + SEPARATOR + scheduleType);
    }

    @SneakyThrows(URISyntaxException.class)
    private URI createURI(String uri) {
        return new URI(uri);
    }
}
