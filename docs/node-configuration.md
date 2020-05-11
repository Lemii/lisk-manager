# How to configure a node

If you want to manage a node in Lisk Manager, a few things must be configured:

- To be able to monitor node data, your IP must be whitelisted for API access, or it must be set to public (not recommended)
- To be able to toggle forging status, your IP must be whitelisted for forging access, or it must be set to public (not recommended)
- To be able to monitor additional system data such as load averages, disk usage, memory usage, you must install the [Lisk Daemon](https://github.com/Lemii/lisk-daemon)

### Whitelisting your IP

As user `lisk`, open up the Lisk Core config in the nano editor:

> Change folder `lisk-main` to `lisk-test` for Testnet nodes.

```
cd ~
nano lisk-main/config.json
```

To whitelist your IP for both API and forging access, copy and paste the template below and change the `yourencryptedpassphrase`, `yourpublickey` and `youriphere` values with your personal data.

```json
{
  "modules": {
    "chain": {
      "forging": {
        "delegates": [
          {
            "encryptedPassphrase": "yourencryptedpassphrase",
            "publicKey": "yourpublickey"
          }
        ]
      }
    },
    "http_api": {
      "access": {
        "public": false,
        "whiteList": ["127.0.0.1", "youriphere"]
      },
      "forging": {
        "access": {
          "whiteList": ["127.0.0.1", "youriphere"]
        }
      }
    }
  }
}
```

Save and close with `CTRL + X` and then confirm with `Y`.

### Using Lisk Daemon

To install Lisk Daemon please refer to its extensive [README](https://github.com/lemii/lisk-daemon).
