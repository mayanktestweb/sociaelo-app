// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserSubscriptionsVerifier {
    mapping(uint256 => mapping(uint256 => bool)) public userSubscribers;

    event SubscriptionSet(uint256 indexed creator, uint256 indexed subscriber);

    constructor() {}

    // reason why we are using uint256 instead of address is because it
    // represents user unique nullifier

    // see if user is subscriber
    function isUserSubscriber(uint256 creator, uint256 subscriber) public view returns(bool) {
        return userSubscribers[creator][subscriber];   
    }

    // set subscription
    function subscribe(uint256 creator, uint256 subscriber) public {
        userSubscribers[creator][subscriber] = true;
        emit SubscriptionSet(creator, subscriber);
    }
}