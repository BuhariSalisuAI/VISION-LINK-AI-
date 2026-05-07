#include "chat_widget.h"
#include "ui_chat_widget.h"

ChatWidget::ChatWidget(QWidget *parent)
    : QWidget(parent),
    ui(new Ui::ChatWidget),
    apiClient(new ApiClient(this))
{
    ui->setupUi(this);

    connect(ui->sendButton, &QPushButton::clicked,
            this, &ChatWidget::onSendClicked);

    connect(ui->chatInput, &QLineEdit::returnPressed,
            this, &ChatWidget::onSendClicked);

    connect(apiClient, &ApiClient::responseReceived,
            this, &ChatWidget::handleResponse);
}

ChatWidget::~ChatWidget()
{
    delete ui;
}

void ChatWidget::onSendClicked()
{
    QString msg = ui->chatInput->text().trimmed();
    if (msg.isEmpty()) return;

    ui->chatOutput->append("<b>You:</b> " + msg);
    ui->chatInput->clear();

    apiClient->sendMessage(msg);
}

void ChatWidget::handleResponse(const QString &response)
{
    ui->chatOutput->append("<b style='color:blue;'>AI:</b> " + response);
}