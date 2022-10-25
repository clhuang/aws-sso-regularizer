# AWS SSO Regularizer

When you log into AWS CLI using `aws sso login`, you must first authenticate to AWS SSO using your browser, federating through your IDP of choice. Logging in in this fashion, you are given a browser session that is valid for anywhere from 1 hour to 7 days, depending on the settings of the IDP and the settings configured in AWS SSO.

The resulting session from `aws sso login` has a lifetime that is dependent on the browser session lifetime -- if there is >8 hours left in the browser session, the CLI session has a lifetime of 8 hours; however, if there is less, the CLI session has a lifetime no longer than that of the browser session used to log in.

Due to the reuse of the existing browser session for `aws sso login` calls, this can lead to unpredictable and unintuitive behavior: consider the situation where AWS SSO settings are configured for a 24 hour browser session lifetime. A user runs `aws sso login` one morning at 9:15AM: they receive a session token that is valid for 8 hours, lasting until the end of their workday. The next day, they run `aws sso login` again -- but the resulting session could be either valid for 8 hours or less than a minute, depending on if they ran it at 9:16AM or 9:14AM! Worse yet, there is no obvious indication to the user about how long their session is valid for either before or after running `aws sso login`.

Having `aws sso login` produce consistent session lifetimes is a far more predictable and user-friendly experience. One could tell the user to always log out of the AWS SSO portal before running `aws sso login`, or to do so in an incognito window, but this is a very clunky solution.

*AWS SSO Regularizer* attempts to remediate this, by automatically detecting if your AWS SSO browser session is expiring soon -- which will result in a shorter-than-expected session lifetime -- and logs you out of the AWS SSO portal automatically. Therefore `aws sso login` always results in consistently long session times.
