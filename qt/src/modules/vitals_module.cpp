#include "vitals_module.h"

QString VitalsModule::analyzeVitals(int heartRate, float temperature)
{
    QString result = "Vitals Analysis:\n";

    if (heartRate < 60)
        result += "- Low heart rate\n";
    else if (heartRate > 100)
        result += "- High heart rate\n";
    else
        result += "- Normal heart rate\n";

    if (temperature > 38.0)
        result += "- Fever detected\n";
    else
        result += "- Temperature normal\n";

    return result;
}