using System;
using System.Collections.Generic;
using System.Linq;
using Messenger.Core.DAL.Infrastructure;
using Messenger.Core.DAL.Interfaces;
using Messenger.Core.DAL.Models;
using Messenger.DAL.Sql.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.DAL.Sql.Repository
{
    internal class MessagesSqlRepository : GenericSqlRepository<Message>, IMessagesRepository
    {
        public MessagesSqlRepository(ApplicationContext context)
            : base(context)
        {
            this.Query = this.DbSet
                .Include(m => m.Room)
                .Include(m => m.User);
        }

        public MessagesResponseModel GetMessages(Room room, int count, int page)
        {
            var messageQuery = this.Query.Where(m => m.Room.Id == room.Id)
                .OrderBy(m => m.Date);
            var totalMessages = messageQuery.Count();

            if (totalMessages == 0)
            {
                return new MessagesResponseModel(0, 0, new List<Message>());
            }
            else if (totalMessages <= count)
            {
                return new MessagesResponseModel(1, totalMessages, messageQuery.AsEnumerable());
            }

            var totalPages = (int)Math.Ceiling((double)totalMessages / count);

            if (page > totalPages)
            {
                return new MessagesResponseModel(totalPages, totalMessages, null);
            }

            var taking = messageQuery
                .Take(totalMessages - ((page - 1) * count));
            var takingCount = taking.Count();
            var filteredMessages = taking
                .Skip(takingCount - count).ToArray();
            return new MessagesResponseModel(totalPages, totalMessages, filteredMessages);
        }
    }
}