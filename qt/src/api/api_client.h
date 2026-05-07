#ifndef API_CLIENT_H
#define API_CLIENT_H

#include <QObject>

#include <QNetworkAccessManager>
#include <QNetworkReply>

#include <QString>


class ApiClient : public QObject
{
    Q_OBJECT

public:
    explicit ApiClient(QObject *parent = nullptr);

    // Send message to backend
    void sendMessage(
        const QString &message,
        const QString &language = "en"
        );

signals:
    // AI response received
    void responseReceived(
        const QString &response
        );

    // Network/API errors
    void errorOccurred(
        const QString &error
        );

private slots:
    void onReplyFinished(
        QNetworkReply *reply
        );

private:
    // HTTP manager
    QNetworkAccessManager *manager;

    // Backend endpoint
    QString baseUrl =
        "http://127.0.0.1:8000/api/chat/";
};

#endif // API_CLIENT_H