### intelehealth-fhir-core-docker

#pre-requisite
1. sudo-less docker

#steps

step-1:

        git clone --depth=1 https://github.com/Intelehealth/intelehealth-fhir-core-docker

step-2:

        cd intelehealth-fhir-core-docker

step-3:

        docker compose build openmrs

step-4:

        docker compose up -d

step-5: to stop instances

        docker compose down