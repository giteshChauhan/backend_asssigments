## Problem Statement:

 <img src="https://github.com/giteshChauhan/backend_asssigments/blob/main/1.Assignment/assignmet_1.png" width= "400" height="412">
 
## MySolution:
<table>
    <tr>
        <th>Databases</th>
        <td>Transactions</td>
        <td>Users</td>
        <td>Wallets</td>
    </tr>
    <tr>
        <th>Models</th>
        <td>transaction.js</td>
        <td>user.js</td>
        <td>wallet.js</td>
    </tr>
    <tr>
        <th>Routes</th>
        <td>transaction.js</td>
        <td>user.js</td>
        <td>wallet.js</td>
    </tr>
    <tr>
        <th>Middleware</th>
        <td>auth</td>
        <td>-</td>
        <td>auth</td>
    </tr>
</table>

<b>services:<b>

<ol>
    <li><pre>POST/api/user/signup : to create first time user account. It would return user-auth-token.
    Needs: {
        "phoneNumber" : " ",
        "password"    : " "
    }</pre></li>
    <li><pre>POST/api/user.login : for user to login again. It would also return user-auth-token
    Needs: {
        "phoneNumber" : " ",
        "password"    : " "
    }</pre></li>
    <li><pre>POST/api/wallet/activate : the idea is to generate 8-digit pin. pin is important to perform addMoney & transfer operations
    Needs:
        user-auth-token,
        {
            "pin" : " "
        }</pre>
    </li>
    <li><pre>POST/api/wallet/addMoney : add money to own account {limit: 2000 at a time, MaxLimit: 10000}
    Needs:
        user-auth-token,
        {
            "pin": " ",
            "balance" : " "
        }</pre>
    </li>
    <li><pre>POST/api/wallet/transfer : transfer money to other user.{limit: depends, MaxLimit: 2000}
    Needs:
        user-auth-token,
        {
            "pin" : " ",
            "amount" : " ",
            "reciever" : " "     // phoneNumber
        }</pre>
    </li>
    <li><pre>GET/api/wallet/currentBalance : to check balance
    Needs: user-auth-token</pre>
    </li>
    <li><pre>GET/api/transaction/ : to get passbook
    Needs: user-auth-token</pre>
    </li>
</ol>
