using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Transactions;

namespace AbonentPlus.PaySystem.Server.PaySystemORM
{
    partial class PaySystemDataBase
    {
        partial void OnCreated()
        {
            CommandTimeout = 3*60; // 3 минуты
        }

        public void EnableDebugTextWriter(bool parseParams = false)
        {
            Log = new PaySystemServer.Common.DebugTextWriter(parseParams);
        }
    }

    // ...
}