#include "json_helper.h"
#include <QJsonDocument>
#include <QJsonObject>

QString JsonHelper::extractResponse(const QString &jsonString)
{
    QJsonDocument doc = QJsonDocument::fromJson(jsonString.toUtf8());

    if (!doc.isObject())
        return "Invalid response";

    QJsonObject obj = doc.object();

    if (obj.contains("response"))
        return obj["response"].toString();

    return "No response field found";
}