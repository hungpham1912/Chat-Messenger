import { Injectable, Scope, Logger } from '@nestjs/common';
import { Chat } from 'src/core/chats/entities/chat.entity';
import { Conversation } from 'src/core/conversations/entities/conversation.entity';
import { Manager } from 'src/core/managers/entities/manager.entity';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { Talked } from 'src/core/talkeds/entities/talked.entity';
import { User } from 'src/core/users/entities/user.entity';
import { UserConversation } from 'src/core/user_conversation/entities/user_conversation.entity';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { DataSource, DataSourceOptions } from 'typeorm';

export const SOURCE_CONFIG: DataSourceOptions = {
  type: 'postgres',
  entities: [
    Manager,
    User,
    Chat,
    UserConversation,
    Conversation,
    Talked,
    Merchant,
  ],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: false,
  ...ENV_CONFIG.database.harisPrd,
};

@Injectable({
  scope: Scope.DEFAULT,
})
export class Source {
  public static source: DataSource;

  public static connect() {
    return this.source;
  }

  public static async setConnect() {
    const source = new DataSource(SOURCE_CONFIG);
    await source
      .initialize()
      .then(() => {
        Logger.log('Data Source has been initialized!');
      })
      .catch((err) => {
        Logger.error('Error during Data Source initialization', err);
      });
    this.source = source;
  }
}
