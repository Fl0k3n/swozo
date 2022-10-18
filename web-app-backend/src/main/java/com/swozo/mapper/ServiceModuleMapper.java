package com.swozo.mapper;

import com.swozo.api.web.activitymodule.ActivityModuleRepository;
import com.swozo.api.web.servicemodule.ServiceModuleRepository;
import com.swozo.api.web.servicemodule.dto.ServiceModuleDetailsDto;
import com.swozo.api.web.servicemodule.dto.ServiceModuleReservationDto;
import com.swozo.api.web.servicemodule.dto.ServiceModuleSummaryDto;
import com.swozo.api.web.servicemodule.request.ReserveServiceModuleRequest;
import com.swozo.persistence.ServiceModule;
import com.swozo.persistence.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Mapper(componentModel = "spring")
public abstract class ServiceModuleMapper {
    @Autowired
    protected ServiceModuleRepository serviceModuleRepository;
    @Autowired
    protected ActivityModuleRepository activityModuleRepository;
    @Autowired
    protected UserMapper userMapper;

    @Mapping(target = "creator", expression = "java(userMapper.toDto(serviceModule.getCreator()))")
    @Mapping(target = "serviceName", source = "scheduleTypeName")
    @Mapping(target = "usedInActivitesCount", expression = "java(activityModuleRepository.countActivityModulesByModuleId(serviceModule.getId()))")
    public abstract ServiceModuleDetailsDto toDto(ServiceModule serviceModule);

    @Mapping(target = "creator", expression = "java(userMapper.toDto(serviceModule.getCreator()))")
    @Mapping(target = "serviceName", source = "scheduleTypeName")
    @Mapping(target = "usedInActivitesCount", expression = "java(activityModuleRepository.countActivityModulesByModuleId(serviceModule.getId()))")
    public abstract ServiceModuleSummaryDto toSummaryDto(ServiceModule serviceModule);

    @Mapping(target = "dynamicProperties", ignore = true)
    @Mapping(target = "ready", expression = "java(false)")
    @Mapping(target = "name", source = "request.name")
    @Mapping(target = "creator", expression = "java(creator)")
    @Mapping(target = "instructionUntrustedHtml", source = "request.instructionHtml")
    public abstract ServiceModule toPersistenceReservation(ReserveServiceModuleRequest request, User creator);

    public ServiceModuleReservationDto toReservationDto(ServiceModule serviceModule, Map<String, Object> dynamicFieldAdditionalData) {
        return new ServiceModuleReservationDto(serviceModule.getId(), dynamicFieldAdditionalData);
    }
}
