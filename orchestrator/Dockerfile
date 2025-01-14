FROM eclipse-temurin:18.0.2.1_1-jre

RUN ["apt","update"]
RUN ["apt","install","sshpass","-y"]
RUN ["apt","install","python3","-y"]
RUN ["curl","https://bootstrap.pypa.io/get-pip.py","-o","get-pip.py"]
RUN ["python3","get-pip.py","--user"]
RUN ["python3","-m","pip","install","--user","ansible"]
RUN ["python3","-m","pip","uninstall","-y","pip"]

ARG JAR_FILE=build/libs/\*.jar
ENV GCP_SSH_KEY_PATH /auth/orchestrator_id_rsa
ENV GOOGLE_APPLICATION_CREDENTIALS /auth/orchestrator-key.json

ENV ANSIBLE_HOME=/provisioning
ENV JUPYTER_PLAYBOOK_PATH=/provisioning/software/jupyter/prepare-and-run-jupyter.yml
ENV SOZISEL_PLAYBOOK_PATH=/provisioning/software/sozisel/prepare-and-run-sozisel.yml
ENV LOG_LEVEL=INFO
COPY ./src/main/resources/provisioning/administration /provisioning/administration
COPY ./src/main/resources/provisioning/software /provisioning/software

COPY ${JAR_FILE} /app/orchestrator.jar
ENTRYPOINT [ \
    "java", \
    "--enable-preview", \
    "-Duser.timezone=UTC", \
    "-Djava.util.concurrent.ForkJoinPool.common.parallelism=20", \
    "-Dspring.profiles.active=prod", \
    "-jar", \
    "/app/orchestrator.jar" \
]
