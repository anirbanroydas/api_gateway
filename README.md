# api_gateway

A full fledged Api Gateway Microservice used to transfer/route/load-balance different api requests to other services written primatrily in  Nodejs.


## Overview

// TODO



## Technical Specs

- **Javascript:** Primary Language
- **Node 7:** The runtime engine
- **Koa 2.x:** The web framework for nodejs, good alternative to express
- **Redis:** The session and cache storage
- **Travis-CI (Optional):** A hosted CI server free for open-source projecs 
- **Docker:** A containerization tool for better devops


## Features

- Microservice
- Api Gateway
- Node Js




## Installation

#### Prerequisite (Optional)

To safegurad secret and confidential data leakage via your git commits to public github repo, check `git-secrets`.

This `git secrets <https://github.com/awslabs/git-secrets>`_ project helps in preventing secrete leakage by mistake.

====================
#### Dependencies

1. Docker
2. Make (Makefile)

See, there are so many technologies used mentioned in the tech specs and yet the dependencies are just two. This is the power of Docker. 

====================
#### Install


* **Step 1 - Install Docker**

  Follow my another github project, where everything related to DevOps and scripts are mentioned along with setting up a development environemt to use Docker is mentioned.

    * **Project:** https://github.com/anirbanroydas/DevOps

    * Go to  ` setup  ` directory and follow the setup instructions for your own platform,  ` linux/macos `

* **Step 2 - Install Make**
        
        # (Mac Os)
        $ brew install automake

        # (Ubuntu)
        $ sudo apt-get update
        $ sudo apt-get install make

* **Step 3 - Install Dependencies**
  
  Install the following dependencies on your local development machine which will be used in various scripts.

  - **openssl**
  - **ssh-keygen**
  - **openssh**

* **Step 4 - Environment Variables/Files**
  
  1. Change file `api_gateway.conf` to `.api_gateway.conf` and update the variables with specific values. (You can ind this file inside `api_gateway/config` directory)
  2. For automated deployments, also change `env` file inside `scripts` directory to `.env` and update the variables with specific values.  


## CI Setup


If you are using the project in a CI setup (like travis, jenkins), then, on every push to github, you can set up your travis build or jenkins pipeline. Travis will use the  ` .travis.yml  ` file and Jenkins will use the  ` Jenkinsfile  ` to do their jobs. Now, in case you are using Travis, then run the Travis specific setup commands and for Jenkins run the Jenkins specific setup commands first. You can also use both to compare between there performance.

The setup keys read the values from a  ` .env  ` file which has all the environment variables exported. But you will notice an example  ` env  ` file and not a  ` .env  ` file. Make sure to copy the  ` env  ` file to  ` .env  ` and **change/modify** the actual variables with your real values.

The  ` .env  ` files are not commited to git since they are mentioned in the  ` .gitignore  ` file to prevent any leakage of confidential data via **environment variables** liek ***api keys***, ***username/password***, ***secret-tokens***.

After you run the setup commands, you will be presented with a number of secure keys. Copy those to your config files before proceeding.

**NOTE:** This is a one time setup.

**NOTE:** Check the setup scripts inside the  ` scripts/  ` directory to understand what are the environment variables whose encrypted keys are provided.

**NOTE:** Don't forget to ***Copy*** the secure keys to your  ` .travis.yml  ` or  ` Jenkinsfile `

**NOTE:** If you don't want to do the copy of  ` env  ` to  ` .env  ` file and change the variable values in  ` .env  ` with your real values then you can just edit the  ` travis-setup.sh  ` or  ` jenknis-setup.sh  ` script and update the values their directly. The scripts are in the  ` scripts/  ` project level directory.


**IMPORTANT:** You have to run the  ` travis-setup.sh  ` script or the  ` jenkins-setup.sh  ` script on your ***local machine*** before deploying to ***remote server***.

==================== 

#### Travis Setup


These steps will encrypt your environment variables to secure your confidential data like api keys, docker based keys, deploy specific keys.

    $ make travis-setup


==================== 
#### Jenkins Setup

These steps will encrypt your environment variables to secure your confidential data like api keys, docker based keys, deploy specific keys.

    $ make jenkins-setup




## Usage

After having installed the above dependencies, and ran the **Optional** (If not using any CI Server) or **Required** (If using any CI Server) **CI Setup** Step, then just run the following commands to use it:


You can run and test the app in your local development machine or you can run and test directly in a remote machine. You can also run and test in a production environment. 


==================== 
#### Run

The below commands will start everythin in development environment. To start in a production environment, suffix  ` -prod  ` to every ***make*** command.

For example, if the normal command is  ` make start `, then for production environment, use  ` make start-prod `. Do this modification to each command you want to run in production environment. 

**Exceptions:** You cannot use the above method for test commands, test commands are same for every environment. Also the   ` make system-prune  ` command is standalone with no production specific variation (Remains same in all environments).

* **Start Applcation**

        $ make clean
        $ make build
        $ make start

        # OR

        $ docker-compose up -d


    
  
* **Stop Application**

        $ make stop

        # OR

        $ docker-compose stop


* **Remove and Clean Application**

        $ make clean

        # OR

        $ docker-compose rm --force -v
        $ echo "y" | docker system prune


* **Clean System**

        $ make system-prune

        # OR

        $ echo "y" | docker system prune



====================
#### Logging


* To check the whole application Logs

        $ make check-logs

        # OR

        $ docker-compose logs --follow --tail=10



* To check just the python app\'s logs

        $ make check-logs-app

        # OR

        $ docker-compose logs --follow --tail=10 identidock






Todo
-----

1. Add Blog post regarding this topic.
2. Add Tests.
