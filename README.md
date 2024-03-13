<!-- action-docs-description -->
## Description

Run a task on ECS (optionally providing overrides) and waits for ECS task to finish.
<!-- action-docs-description -->

### Details
This action makes it possible to run an AWS ECS EC2 or Fargate task with overrides. If the task definition
is configured to log to CloudWatch, this action will try to tail the output of container, providing instant feedback inside
the GitHub Workflow.

## Usage

## License Summary

This code is made available under the MIT license.

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| --- | --- | --- | --- |
| cluster | The name of the ECS service's cluster.  Will default to the 'default' cluster | `false` | default |
| task-definition | The name of the task-definition | `true` |  |
| launch-type | Launch type: EC2 or FARGATE | `false` | EC2 |
| override-container | The container names to override | `false` |  |
| override-branch | Branch name to oveeride | `false` |  |
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| --- | --- |
| task-arn | The ARN for the task that finished running |
| status | The status of the task, success for sucesssful tasks. |
<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node20` action.
<!-- action-docs-runs -->
