# Frequently Asked Questions

### What is the authorization password for?

The authorization password is used to encrypt and decrypt the sensitive data that is stored
in the browser's storage. It is also used in the intermediate JSON files used for importing
/ exporting configurations.

### What if I lose this password?

If you have lost your old password you can use the reset button to configure a new password. Keep in mind that you will have to re-enter the credentials for each node.

### What do all these icons mean?

![Play Icon](./assets/icon-play.png) Node is online, forging is enabled  
![Pause Icon](./assets/icon-pause.png) Node is online, forging is disabled (standby)  
![Question Icon](./assets/icon-question.png) Node is online, forging status could not be fetched  
![Stop Icon](./assets/icon-stop.png) Node is unreachable

### Lisk Manager can't detect the Lisk Core version of my node

- Check if the protocol is correct (eg: http:// instead of https://)
- Check if the IP address is correct
- Check if the port number is correct (eg: 8000 for mainnet, 7000 for testnet, no port number for SSL domains)
- Check if your IP address is whitelisted
- **Non-secure node addresses do not work on websites with a secure https:// domain**. This is caused by browsers blocking so called mixed content. Read more about it [here](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content). To avoid the blocking of mixed content, run the tool locally or use the [non-SSL version of this website](http://manager.lisktools.eu/).

### Is it safe to enter sensitive node data in a tool like this?

All node data is stored in an encrypted manner on your local own device. If you prefer to run the tool locally as well, you can find instructions on how to do so [here](https://github.com/lemii/lisk-manager).

### Can I add a node without adding a public key and / or password?

Yes, if no public key and password are entered you can still monitor some elements of the node. However, toggling the forging status will be disabled.

### I keep getting the error 'Could not toggle forging.'

This means that your public key and / or password (used to encrypt your passphrase) is incorrect. Press the ![Bars Icon](./assets/icon-bars.png) icon to open up the node menu, enter the correct credentials, and try again.

### Can I contribute to this software?

Lisk Manager is open source software licensed under MIT. Feel free to submit issues, pull requests, or fork the codebase and modify it to your own needs. You can find the repository [here](https://github.com/lemii/lisk-manager).

### How can I support the creator of this tool?

You can support my work by voting for my delegate, or by donating to 13679271214820914646L.
