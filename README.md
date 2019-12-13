# FreightHub Coding Challenge

Thank you for taking the time to face this coding challenge.
It should take approximately one hour to complete this challenge.
_Use Typescript code to solve these challenges._
If you need to look up something for this, mark it clearly.
Inform codingchallenge@freighthub.com as soon as you are done.
Good luck!

Task: Write a class that implements `ShipmentUpdateListenerInterface` from `challenge.ts` file.

## Background

The `ShipmentUpdateListenerInterface` will get updates passed to it (from some external system, REST interface, Queue system or something similar).
It has to update the `ShipmentSearchIndex` with the new data of the shipment.
(In the implementation below it is abstracted away.)
The code above should be not modified.

## Restrictions

Ensure that whenever `receiveUpdate` is called, as a consequence `updateShipment` of the `ShipmentSearchIndex` is also called once, with the corresponding data and id passed to it.
Also make sure that the executions of `updateShipment` with the same id never run concurrently (execution always in order and consecutive). Data loss should never happen. Assume all the code is running in one NodeJS process (or browser window/tab).

## Hint

Think about _scalable_ and _maintainable_ ways to implement the restrictions.
You can implement additional classes/interfaces/functions if you need to structure functionality further.

## Deliverables

- Clone this repository.
- Complete your project as described above within your local repository.
- Ensure everything you want to commit is committed.
- Create a git bundle: `git bundle create your_name.bundle --all`
- Email the bundle file to your point of contact.

## Notes

- We aim to test your programming and analytic skills. Please DO NOT use external libraries.
- Please DO NOT create pull requests. Just follow the guidelines and send us the bundle.
