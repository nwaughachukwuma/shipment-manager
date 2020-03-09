# Shipment Manager
A simple Typescript decorator-based solution for shipment management

## Background/Assumptions

The `ShipmentUpdateListenerInterface` will get updates passed to it (from some external system, REST interface, Queue system or something similar).
It is able to update the `ShipmentSearchIndex` with the new data of the shipment.
(In the implementation below it is abstracted away.)
The code above should is never to be modified.

## Set Restrictions

It is ensured that whenever `receiveUpdate` is called, as a consequence `updateShipment` of the `ShipmentSearchIndex` is also called once, with the corresponding data and id passed to it.

Also the executions of `updateShipment` with the same id never run concurrently (execution always in order and consecutive). Data loss is taken care of and there's an assumption that all the code is running in one NodeJS process (or browser window/tab).

## Improvements
Do you have a better idea how this could be done? Then do one of the following:

- Send a PR
- Create a git bundle: `git bundle create your_name.bundle --all` and email it to me.
