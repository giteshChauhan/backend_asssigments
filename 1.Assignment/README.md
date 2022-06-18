## Problem Statement:

 <img src="https://github.com/giteshChauhan/backend_asssigments/blob/main/1.Assignment/assignmet_1.png" width= 800>
 <br>

## MySolution:

<b>Databases</b> | transactions | users | wallets
<b>Routes</b> | transaction.js | user.js | wallet.js
<b>Models</b> | transaction.js | user.js | wallet.js
<b>Middleware</b>| auth | - | auth

<b>services:<b>

<ol>
    <li>POST/api/user/signup : to create first time user account. It would return user-auth-token.
    Needs: {
        "phoneNumber" : " ",
        "password"    : " "
    }</li>
    <li>POST/api/user.login : for user to login again. It would also return user-auth-token
    Needs: {
        "phoneNumber" : " ",
        "password"    : " "
    }</li>
    <li>POST/api/wallet/activate : the idea is to generate 8-digit pin. pin is important to perform addMoney & transfer operations
    Needs:
        user-auth-token,
        {
            "pin" : " "
        }
    </li>
    <li>POST/api/wallet/addMoney : add money to own account {limit: 2000 at a time, MaxLimit: 10000}
    Needs:
        user-auth-token,
        {
            "pin": " ",
            "balance" : " "
        }
    </li>
    <li>POST/api/wallet/transfer : transfer money to other user.{limit: depends, MaxLimit: 2000}
    Needs:
        user-auth-token,
        {
            "pin" : " ",
            "amount" : " ",
            "reciever" : " "     // phoneNumber
        }
    </li>
    <li>GET/api/wallet/currentBalance : to check balance
    Needs: user-auth-token
    </li>
    <li>GET/api/transaction/ : to get passbook
    Needs: user-auth-token
    </li>
</ol>
