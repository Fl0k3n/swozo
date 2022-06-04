package com.swozo.orchestrator.cloud.resources.gcloud.compute;

import com.swozo.model.Psm;
import com.swozo.orchestrator.cloud.resources.gcloud.compute.model.VMAddress;
import com.swozo.orchestrator.cloud.resources.gcloud.compute.model.VMSpecs;
import com.swozo.orchestrator.cloud.resources.vm.VMDeleted;
import com.swozo.orchestrator.cloud.resources.vm.VMDetails;
import com.swozo.orchestrator.cloud.resources.vm.VMOperationFailed;
import com.swozo.orchestrator.cloud.resources.vm.VMProvider;
import com.swozo.orchestrator.configuration.EnvNames;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeoutException;

@Service
public class GCloudVMProvider implements VMProvider {
  private static final String DEFAULT_NETWORK = "default";
  private final String project;
  private final String zone;
  private final String imageFamily;
  private final GCloudVMLifecycleManager manager;
  private final Logger logger;

  public GCloudVMProvider(
      @Value("${" + EnvNames.GCP_PROJECT + "}") String project,
      @Value("${" + EnvNames.GCP_ZONE + "}") String zone,
      @Value("${" + EnvNames.GCP_VM_IMAGE_FAMILY + "}") String imageFamily,
      GCloudVMLifecycleManager manager) {
    this.project = project;
    this.zone = zone;
    this.imageFamily = imageFamily;
    this.manager = manager;
    this.logger = LoggerFactory.getLogger(this.getClass());
  }

  @Async
  @Override
  public Future<VMDetails> createInstance(Psm psm) throws InterruptedException, VMOperationFailed {
    try {
      // TODO: create unique name
      var vmAddress = getVMAddress("uniqueName");
      var vmSpecs = getVMSpecs(psm);
      manager.createInstance(vmAddress, vmSpecs);
      var externalIPAddress = manager.getInstanceExternalIP(vmAddress);
      return new AsyncResult<>(new VMDetails(externalIPAddress));
    } catch (IOException | ExecutionException | TimeoutException e) {
      logger.error(e.getMessage());
      var newException = new VMOperationFailed(e.getMessage());
      newException.setStackTrace(e.getStackTrace());
      throw newException;
    }
  }

  @Async
  @Override
  public Future<VMDeleted> deleteInstance(String vmName)
      throws InterruptedException, VMOperationFailed {
    try {
      var vmAddress = getVMAddress(vmName);
      manager.deleteInstance(vmAddress);
      return new AsyncResult<>(new VMDeleted());
    } catch (IOException | ExecutionException | TimeoutException e) {
      throw new VMOperationFailed(e.getMessage());
    }
  }

  private VMAddress getVMAddress(String name) {
    return new VMAddress(project, zone, DEFAULT_NETWORK, name);
  }

  private VMSpecs getVMSpecs(Psm psm) {
    return new VMSpecs(psm.machineType(), imageFamily, psm.discSizeGB());
  }
}
