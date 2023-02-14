﻿using BMICalculator.Models;
using BMICalculator.Services;
using Microsoft.AspNetCore.Mvc;

namespace BMICalculator.Controllers
{
    public class BmiCalculationController : ControllerBase
    {
        private readonly IBmiCalculationService _bmiCalculationService;

        public BmiCalculationController(IBmiCalculationService bmiCalculationService)
        {
            _bmiCalculationService = bmiCalculationService;
        }

        [HttpPost]
        public ActionResult<BmiResult> Calculate([FromBody] int unitSystem, [FromBody] double weight, [FromBody] double height)
        {
            double bmi;
            BmiClassification bmiClassification;
            string summary;

            if (weight < 1) { return BadRequest("Weight is not a valid number"); }
            if (weight < 1) { return BadRequest("Height is not a valid number"); }

            if (unitSystem == 1)
            {
                bmi = _bmiCalculationService.MetricCalculate(weight, height);
                bmiClassification = GetBmiClassification(bmi);
                return Ok(bmi);
            }
            else
            {
                bmi = _bmiCalculationService.ImperialCalculate(weight, height);
                bmiClassification = GetBmiClassification(bmi);
                summary = GetSummary(bmiClassification);
                return Ok(new BmiResult() { Bmi = bmi, BmiClassification = bmiClassification, Summary = summary});
            }
        }

        private string GetSummary(BmiClassification bmiClassification)
        {
            string summary;
            switch (bmiClassification)
            {
                case BmiClassification.ExtremeUnderweight:
                    summary = "You are extremely underweight, it may cause some health issues. Please contact your doctor.";
                    break;
                case BmiClassification.Underweight:
                    summary = "You are underweight, learn about gaining a healthy weight.";
                    break;
                case BmiClassification.SlightlyUnderweight:
                    summary = "You are a bit underweight.";
                    break;
                case BmiClassification.Normal:
                    summary = "Your weight is normal, keep it up.";
                    break;
                case BmiClassification.Overweight:
                    summary = "You are a bit overweight, try to eat healthier.";
                    break;
                case BmiClassification.ObesityClassI:
                    summary = "You should take care of your obesity.";
                    break;
                case BmiClassification.ObesityClassII:
                    summary = "Your obesity is dangerous to your health, you need to do something about it.";
                    break;
                case BmiClassification.ObesityClassIII:
                    summary = "Extreme obesity may cause serious health problems. Please contact your doctor.";
                    break;
                default:
                    summary = "Something went wrong.";
                    break;
            }
            return summary;
        }

        private BmiClassification GetBmiClassification(double bmi)
        {
            if (bmi <= 16) { return BmiClassification.ExtremeUnderweight; }
            else if (bmi > 16 || bmi <= 17 ) { return BmiClassification.Underweight; }
            else if (bmi > 17 || bmi <= 18.5) { return BmiClassification.SlightlyUnderweight; }
            else if (bmi > 18.5 || bmi <= 25) { return BmiClassification.Normal; }
            else if (bmi > 25 || bmi <= 30) { return BmiClassification.Overweight; }
            else if (bmi > 30 || bmi <= 35) { return BmiClassification.ObesityClassI; }
            else if (bmi > 35 || bmi <= 40) { return BmiClassification.ObesityClassII; }
            else { return BmiClassification.ObesityClassIII; }
        }
    }
}