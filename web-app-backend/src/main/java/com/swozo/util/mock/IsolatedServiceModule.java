package com.swozo.util.mock;

import com.swozo.persistence.vminfo.PimVmInfo;
import lombok.*;

@Getter
@Setter
@ToString
public class IsolatedServiceModule extends ServiceModule{

    public IsolatedServiceModule(Long id, Integer baseVcpu, Integer baseRam, Integer baseDisk, Integer baseBanwidth){
        super(id,baseVcpu, baseRam, baseDisk, baseBanwidth);
    }
    public PimVmInfo getPimVmInfo(Integer studens){
        PimVmInfo translation = new PimVmInfo();
        translation.addModule(id);
        translation.setVCPUs(baseVcpu);
        translation.setRam(baseRam);
        translation.setDisk(baseDisk);
        translation.setBandiwth(baseBanwidth);

        return translation;
    }

    @Override
    public Boolean isIsolated() {
        return true;
    }
}