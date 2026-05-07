#ifndef JSON_HELPER_H
#define JSON_HELPER_H

#include <QString>

class JsonHelper
{
public:
    static QString extractResponse(const QString &jsonString);
};

#endif // JSON_HELPER_H