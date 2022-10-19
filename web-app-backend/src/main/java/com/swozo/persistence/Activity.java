package com.swozo.persistence;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.LinkedList;

@Entity
@Table(name = "Activities")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Activity extends BaseEntity {
    private String name;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "activity_module_id")
    @ToString.Exclude
    private Collection<ActivityInstruction> instructionsFromTeacher;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "activity_module_id")
    @ToString.Exclude
    private Collection<ActivityModule> modules = new LinkedList<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "file.id")
    @ToString.Exclude
    private Collection<RemoteFile> publicFiles = new LinkedList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Course course;

    public void addActivityModule(ActivityModule newModuleMetadata) {
        modules.add(newModuleMetadata);
    }

    public void removeActivityModule(ActivityModule activityModule) {
        modules.remove(activityModule);
    }

    public void addPublicFile(RemoteFile file) {
        publicFiles.add(file);
    }
}
