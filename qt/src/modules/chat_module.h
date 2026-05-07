#ifndef CHAT_MODULE_H
#define CHAT_MODULE_H

#include <QString>

class ChatModule
{
public:
    static QString formatUserMessage(const QString &message);
    static QString formatAIMessage(const QString &message);
};

#endif // CHAT_MODULE_H