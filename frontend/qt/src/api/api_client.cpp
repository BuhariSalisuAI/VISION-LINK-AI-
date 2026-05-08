#include "api_client.h"

#include <QNetworkRequest>
#include <QJsonDocument>
#include <QJsonObject>
#include <QUrl>

// ApiClient::ApiClient(QObject *parent)
//     : QObject(parent),
//     manager(new QNetworkAccessManager(this)),
//     baseUrl("http://127.0.0.1:8000")   // 🔥 Change when deploying
// {
//     connect(manager, &QNetworkAccessManager::finished,
//             this, &ApiClient::onReplyFinished);
// }

ApiClient::ApiClient(QObject *parent)
    : QObject(parent),
    manager(new QNetworkAccessManager(this))
{
    connect(
        manager,
        &QNetworkAccessManager::finished,
        this,
        &ApiClient::onReplyFinished
        );
}

// void ApiClient::sendMessage(const QString &message)
// {
//     QUrl url(baseUrl + "/chat");

//     QNetworkRequest request(url);
//     request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

//     // Create JSON payload
//     QJsonObject json;
//     json["message"] = message;

//     QJsonDocument doc(json);

//     // Send POST request
//     manager->post(request, doc.toJson());
// }

void ApiClient::sendMessage(
    const QString &message,
    const QString &language
    )
{
    // Backend endpoint
    QUrl url(baseUrl);

    QNetworkRequest request(url);

    request.setHeader(
        QNetworkRequest::ContentTypeHeader,
        "application/json"
        );

    // JSON payload
    QJsonObject json;

    json["message"] = message;
    json["language"] = language;

    QJsonDocument doc(json);

    QByteArray data = doc.toJson();

    // Send POST request
    manager->post(request, data);
}

void ApiClient::onReplyFinished(QNetworkReply *reply)
{
    // Network error check
    if (reply->error() != QNetworkReply::NoError) {
        emit errorOccurred("Network error: " + reply->errorString());
        reply->deleteLater();
        return;
    }

    // HTTP status check
    int statusCode = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();

    QByteArray responseData = reply->readAll();

    if (statusCode != 200) {
        emit errorOccurred("HTTP Error " + QString::number(statusCode) + ": " + responseData);
        reply->deleteLater();
        return;
    }

    // Emit raw response (UI can parse JSON)
    emit responseReceived(QString::fromUtf8(responseData));

    reply->deleteLater();
}