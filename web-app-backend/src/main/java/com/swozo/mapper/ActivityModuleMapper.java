package com.swozo.mapper;

import com.swozo.databasemodel.ActivityLink;
import com.swozo.databasemodel.ActivityModule;
import com.swozo.databasemodel.ServiceModule;
import com.swozo.dto.activity.ServiceConnectionDetailsDto;
import com.swozo.dto.activitymodule.ActivityModuleDetailsDto;
import com.swozo.model.links.ActivityLinkInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ActivityModuleMapper {

    @Autowired
    protected ServiceModuleMapper serviceModuleMapper;

    public abstract ActivityLink toPersistence(ActivityLinkInfo activityLinkInfo);

    public ActivityModule fromServiceModule(ServiceModule serviceModule) {
        var activityModule = new ActivityModule(serviceModule);
        activityModule.setInstruction("TODO");
        return activityModule;
    }

    @Mapping(target = "serviceName", expression = "java(activityModule.getModule().getScheduleType().toString())")
    @Mapping(target = "connectionInstruction", source = "activityModule.instruction")
    @Mapping(target = "url", source = "activityLink.url")
    @Mapping(target = "connectionInfo", source = "activityLink.connectionInfo")
    public abstract ServiceConnectionDetailsDto toDto(ActivityLink activityLink, ActivityModule activityModule);

    @Mapping(target = "module", expression = "java(serviceModuleMapper.toModel(activityModule.getModule()))")
    @Mapping(target = "connectionDetails", expression = "java(activityModule.getLinks().stream().map(link -> toModel(link, activityModule)).toList())")
    public abstract ActivityModuleDetailsDto toDto(ActivityModule activityModule);
}

