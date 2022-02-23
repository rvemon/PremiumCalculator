using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;


namespace PremiumAPI
{
    public class PremiumCalculator
    {
        public List<PremiumPlan> premiumPlans = new List<PremiumPlan>();
        public List<State> states = new List<State>();
        public List<Plan> plans = new List<Plan>();
        public Response response = new Response();

        //lista de meses
        //lista de estados
        Validation validation = new Validation();

        public PremiumCalculator()
        {
            SetPremium();
        }

        public void SetPremium()
        {
            premiumPlans = JsonSerializer.Deserialize<List<PremiumPlan>>(File.ReadAllText("files/premium_table.json"));
            states = JsonSerializer.Deserialize<List<State>>(File.ReadAllText("files/states.json"));
            plans = JsonSerializer.Deserialize<List<Plan>>(File.ReadAllText("files/plans.json"));

        }

        public Response getResult(string date, string state, int age, string plan)
        {
            //if the age validation is correct
            if (validation.ValidateDateAge(date, age))
            {
                return findPlans(date, state, age, plan);
            }
            else
            {
                response.message = "Date and age not equal";
                return response ;
            }
        }

        private Response findPlans(string date, string state, int age, string plan)
        {

            foreach (PremiumPlan premiumPlan in premiumPlans)
            {
                if (premiumPlan.IsPlan(date, state, age, plan))
                {
                    response.responsePlan.Add(new ResponsePlan(premiumPlan.carrier, premiumPlan.price.ToString()));
                }
            }

            if (response.responsePlan.Any()) response.message = "Ok";
            else response.message = "Plan not found";

            return response;
        }

    }
}
