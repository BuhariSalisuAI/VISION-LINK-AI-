#ifndef CHAT_WIDGET_H
#define CHAT_WIDGET_H

#include <QWidget>
#include "api/api_client.h"

namespace Ui {
class ChatWidget;
}

class ChatWidget : public QWidget
{
    Q_OBJECT

public:
    explicit ChatWidget(QWidget *parent = nullptr);
    ~ChatWidget();

private slots:
    void onSendClicked();
    void handleResponse(const QString &response);

private:
    Ui::ChatWidget *ui;
    ApiClient *apiClient;
};

#endif