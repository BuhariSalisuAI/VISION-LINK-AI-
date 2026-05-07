#include "mainwindow.h"
#include "ui/ui_mainwindow.h"

#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent),
    ui(new Ui::MainWindow),
    apiClient(new ApiClient(this))
{
    ui->setupUi(this);

    setupConnections();

    // Optional: welcome message
    ui->chatOutput->append("🟢 VISION-LINK AI Ready");
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::setupConnections()
{
    // Send button
    connect(ui->sendButton, &QPushButton::clicked,
            this, &MainWindow::onSendClicked);

    // Enter key in input field
    connect(ui->chatInput, &QLineEdit::returnPressed,
            this, &MainWindow::onSendClicked);

    // API response
    connect(apiClient, &ApiClient::responseReceived,
            this, &MainWindow::handleApiResponse);
}

void MainWindow::onSendClicked()
{
    QString message = ui->chatInput->text().trimmed();

    if (message.isEmpty())
        return;

    // Show user message
    ui->chatOutput->append("👤 You: " + message);

    // Clear input
    ui->chatInput->clear();

    // Send to backend
    apiClient->sendMessage(message);
}

void MainWindow::handleApiResponse(const QString &response)
{
    // You can parse JSON here if backend returns structured data
    ui->chatOutput->append("🤖 AI: " + response);
}