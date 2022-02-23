using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PremiumAPI
{
    public class Response
    {
        public List<ResponsePlan> responsePlan { get; set; }

        public string message { get; set; }

        public Response()
        {
            responsePlan = new List<ResponsePlan>();
            message = "";
        }
    }
}
