using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PremiumAPI
{
    public class ResponsePlan
    {
        public string carrier { set; get; }
        public string price { set; get; }

        public ResponsePlan(string carrier, string price)
        {
            this.carrier = carrier;
            this.price = price;
        }
    }
}
