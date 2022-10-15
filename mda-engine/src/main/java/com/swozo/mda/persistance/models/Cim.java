package com.swozo.mda.persistance.models;

import com.swozo.mda.util.mock.ModuleMock;
import lombok.*;

import java.util.ArrayList;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Cim{
    private ArrayList<ModuleMock> selectedModules = new ArrayList<>();
    private Long userId;
    private Integer studentsNumber;
}
