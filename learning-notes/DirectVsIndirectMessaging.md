# Direct Messaging: HTTP
The sender sends a message directly to the recipient. The recipient must respond immediately, and a response will be sent back to the sender (e.g. success or failure). Direct messaging is typically more easy to implement than indirect messaging. It's like feeding your own domestic cat - you fill their bowl with cat food and immediately observe how your cat responds to it.

## Some use cases
+ **You are sending messages to a particular microservice by name or id.** This is like pouring cat food in a specific cat's bowl.
+ **You need confirmation that the message was handled successfully or not.** This is like watching your cat successfully eat or unfortunately reject their food.
+ **You need to orchestrate a sequence of messages among multiple microservices.** This would be useful for controlling the flow of your program, like deciding whether or not you need to go out and buy a different brand of cat food based on how your cat responds to their initial bowl of food.



# Indirect Messaging: RabbitMQ
The sender sends a message to a middle-man. The recipient can read or "consume" the messages from the middle-man. The sender does not directly communicate with the recipient - in fact, the sender doesn't even know if the recipient exists! The recipient can consume the messages at their own pace. It's like leaving a bowl of milk out for stray cats - you send out your message (aka milk), yet you don't have any idea what will happen to that milk. The stray cats will come by and consume the milk on their own time.

## Some use cases
+ **You need to broadcast the same message to *zero* or more recipients, and you don't care who is listening.** Yes, you can still leave milk out, even if *zero* cats show up. Anyhow, all those strays cats will receive the same milk (and the same message of "I love you and I care about you <3").
+ **You want to decouple the sender and the recipient.** This allows the sender and the recipient to become more scalable and all the other benefits of low coupling... Think of it like this: you won't have to get in trouble when the cats sudden breed a giant litter, and the cats won't threaten you when you forget to feed them!
+ **You want the sender and the recipent to be independent.** The sender can send as many messages as they please, and the recipient can process those messages as slowly as they want. *There is no direct response with indirect messaging.* So you can leave out as many (or as few) bowls as you'd like, and the cats will consume the food at their own pace as they please.
+ **You want "workers" to respond to your message in parallel.** You can have multiple cats drink from your bowl of milk at once, assuming that the bowl is large enough. 

## When either method is acceptable
+ **You need load-balancing of one message such that it is handled by exactly one worker out of a pool of workers.** It's like having exactly one serving of cat food for exactly one cat. My guess is that there are benefits and problems to implementing this using either method. You could sequentially send direct messages to every worker in the pool until you hit a worker who is free; you would be disturbing a lot of workers in the process, and sequential traversal might take a long time. On the other hand, you could send an indirect message to every worker in the pool, but then you'd need to check to see if a worker actually listened to your message - since it's an indirect message, workers consume messages on their own accord. Plus, it's possible that two or more workers end up working on the message simulatenously, which could cause some issues...
