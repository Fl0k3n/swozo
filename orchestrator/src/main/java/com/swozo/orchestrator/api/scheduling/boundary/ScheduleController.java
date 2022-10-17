package com.swozo.orchestrator.api.scheduling.boundary;

import com.fasterxml.jackson.core.type.TypeReference;
import com.swozo.communication.http.RequestSender;
import com.swozo.config.Config;
import com.swozo.model.scheduling.ParameterDescription;
import com.swozo.model.scheduling.ScheduleRequest;
import com.swozo.model.scheduling.ScheduleResponse;
import com.swozo.model.scheduling.ServiceConfig;
import com.swozo.model.scheduling.properties.ScheduleType;
import com.swozo.orchestrator.api.scheduling.control.ScheduleService;
import com.swozo.utils.SupportedLanguage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
//@RequiredArgsConstructor
@RequestMapping(Config.SCHEDULES)
public class ScheduleController {
    private final RequestSender requestSender;
    private final ScheduleService service;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public ScheduleController(@Qualifier("web-server") RequestSender requestSender, ScheduleService service) {
        this.requestSender = requestSender;
        this.service = service;
    }

    @PostMapping
    public ScheduleResponse schedule(@RequestBody ScheduleRequest request) {
        logger.info("Serving request: {}", request);
        return service.schedule(request);
    }

    @GetMapping(Config.CONFIGURATION)
    public List<ServiceConfig> getSupportedServices() {
        logger.info("Serving config request.");
//        return service.getSupportedServices();
        // TODO: mock for testing multiple services, remove this
        var s = new LinkedList<>(service.getSupportedServices());
        s.addLast(new ServiceConfig(ScheduleType.DOCKER.toString(), "1.0.0",
                List.of(
                        ParameterDescription.builder("dockerImageUrl")
                                .withTranslatedLabel(Map.of(SupportedLanguage.PL, "Link do publicznego obrazu"))
                                .ofText().build(),
                        ParameterDescription.builder("resultFilePath", false)
                                .withTranslatedLabel(Map.of(SupportedLanguage.PL, "Ścieżka do pliku wynikowego"))
                                .ofText().build()
                )));
        return s;
    }

    @GetMapping(Config.CONFIGURATION + "/{scheduleType}")
    public ServiceConfig getServiceConfig(@PathVariable String scheduleType) {
        logger.info("Serving config request for " + scheduleType);
        return service.getServiceConfig(ScheduleType.valueOf(scheduleType));
    }

    @PostMapping(Config.AGGREGATED)
    public List<ScheduleResponse> schedule(@RequestBody Collection<ScheduleRequest> requests) {
        logger.info("Serving aggregated request: {}", requests);
        return requests.stream().map(service::schedule).toList();
    }

    @GetMapping("/test-request-to-server")
    public void testRequestToServer() throws URISyntaxException, ExecutionException, InterruptedException {
        // TODO remove this one day
        requestSender.sendGet(new URI("http://localhost:5000/orchestrator-test"), new TypeReference<Void>(){}).get();
        System.out.println("DONE");
    }
}
