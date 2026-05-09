#include "sidebar.h"
#include "src/ui/components/ui_sidebar.h"

Sidebar::Sidebar(QWidget *parent)
    : QWidget(parent),
      ui(new Ui::Sidebar)
{
    ui->setupUi(this);

    connect(ui->btnChat, &QPushButton::clicked,
            this, &Sidebar::chatClicked);

    connect(ui->btnMaternity, &QPushButton::clicked,
            this, &Sidebar::maternityClicked);

    connect(ui->btnVitals, &QPushButton::clicked,
            this, &Sidebar::vitalsClicked);
}

Sidebar::~Sidebar()
{
    delete ui;
}