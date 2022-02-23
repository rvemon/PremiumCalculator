using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PremiumAPI
{
    public class PremiumPlan
    {
        //attributes
        public string carrier { get; set; }
        public string plan { get; set; }
        public string state { get; set; }
        public string monthOfBirth { get; set; }
        public string ageRange { get; set; }
        public float price { get; set; }

        private Dictionary<string, int> months = new Dictionary<string, int>()
        {
            { "january", 1},
            { "february", 2},
            { "march", 3},
            { "april", 4},
            { "may", 5},
            { "june", 6},
            { "july", 7},
            { "august", 8},
            { "september", 9},
            { "october", 10},
            { "november", 11},
            { "december", 12},
        };

        public bool IsPlan(string date, string state, int age, string plan)
        {
            return (validatePlan(plan) &&
                    validateAgeRange(age) &&
                    validateState(state) &&
                    validateMonthOfBirth(date)
                    );
        }

        public bool validatePlan(string plan)
        {
            string[] arrayPlan = this.plan.Split(',');

            var a = Array.Find(arrayPlan, element => element == plan);

            return a != null;
        }

        public bool validateAgeRange(int age)
        {
            string[] arrayAges = this.ageRange.Split(',');

            return age >= int.Parse(arrayAges[0]) && age <= int.Parse(arrayAges[1]);
        }

        public bool validateState(string state)
        {
            if (this.state == "*") return true;
            else
            {
                return state == this.state;
            }
        }

        public bool validateMonthOfBirth(string date)
        {
            if (this.monthOfBirth == "*") return true;

            DateTime date_ = Convert.ToDateTime(date);

            return date_.Month == months.First(month => month.Key == monthOfBirth.ToLower()).Value;
        }

       
    }
}
