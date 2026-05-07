#ifndef VITALS_MODULE_H
#define VITALS_MODULE_H

#include <QString>

class VitalsModule
{
public:
    static QString analyzeVitals(int heartRate, float temperature);
};

#endif // VITALS_MODULE_H