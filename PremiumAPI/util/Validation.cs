using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PremiumAPI
{
    public class Validation
    {
        //attributes
        //lista de estados
        //lista de meses

        //methods -> puedo volverlo un validates
        public bool ValidateDateAge(string date, int age)
        {
            var today = DateTime.Today;

            DateTime date_ = Convert.ToDateTime(date);

            int age_ = today.Year - date_.Year;

            if (today.Month < date_.Month || (today.Month == date_.Month && today.Day < date_.Day)) age_--;

            return (age == age_);
        }

    }
}
