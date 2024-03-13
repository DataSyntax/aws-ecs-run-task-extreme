const core = require("@actions/core");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");

const main = async () => {
    const cluster = core.getInput("cluster", { required: true });
    const taskDefinition = core.getInput("task-definition", { required: true });
    const overrideContainer = core.getInput("override-container", { required: true });
    const overrideBranch = core.getInput("override-branch", { required: true });
    const launchType = core.getInput("launch-type", { required: true });

    const ecsClient = new ECSClient({ region: "us-east-2" });

    const taskParams = {
        taskDefinition,
        cluster,
        launchType,
        count: 1,
        overrides: {
            containerOverrides: [
                {
                    name: overrideContainer,
                    environment: [
                        {
                            name: "BRANCH",
                            value: overrideBranch,
                        },
                    ],
                },
            ],
        },
    };

    // Create the RunTaskCommand
    const runTaskCommand = new RunTaskCommand(taskParams);

    try {
        core.debug("Running task...");

        const task = await ecsClient.send(runTaskCommand);

        // Get taskArn and taskId
        const taskArn = task.tasks[0].taskArn;
        const taskId = taskArn.split("/").pop();
        core.setOutput("task-arn", taskArn);
        core.setOutput("task-id", taskId);
        core.info(`Starting Task with ARN: ${taskArn}\n`);

    } catch (error) {
        core.setFailed(error.message);
        core.debug(error.stack);
    }
};

main();
