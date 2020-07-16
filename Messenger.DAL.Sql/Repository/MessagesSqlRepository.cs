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

            var queryable = this.DbSet.Where(t => t.Room != null && t.User != null).Include(t => t.Room).Include(t => t.User).ToList();
        }

        public MessagesResponseModel GetMessages(string roomId, int count, int page)
        {
            var messageQuery = this.Query.Where(m => m.Room.Id == roomId)
                .OrderByDescending(m => m.Date);

            var totalMessages = messageQuery.Count();

            var totalPages = (int)Math.Ceiling((double)totalMessages / count);

            return new MessagesResponseModel(totalPages, totalMessages, messageQuery.Skip((page - 1) * count).Take(count).ToArray().Reverse());
        }
    }
}