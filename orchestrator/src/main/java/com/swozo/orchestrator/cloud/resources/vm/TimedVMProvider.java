package com.swozo.orchestrator.cloud.resources.vm;

import com.swozo.model.Psm;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

public interface TimedVMProvider {
    CompletableFuture<VMResourceDetails> createInstance(Psm psm) throws InterruptedException, VMOperationFailed;

    Future<Void> deleteInstance(int internalResourceId) throws InterruptedException, VMOperationFailed;

    int getVMCreationTime(Psm psm);
}
