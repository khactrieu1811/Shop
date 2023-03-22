using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Data.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        // Marks an entity as new
        T Add(T entity);

        // Marks an entity as modified
        void Update(T entity);

        // Marks an entity to be removed
        T Delete(T entity);

        T Delete(int id);

        //Xóa Nhiều bản ghi
        void DeleteMulti(Expression<Func<T, bool>> where);

        // lấy một thực thể bằng int id
        T GetSingleById(int id);
        //Lấy theo điều kiện
        T GetSingleByCondition(Expression<Func<T, bool>> expression, string[] includes = null);
        //Lấy tất cả
        IEnumerable<T> GetAll(string[] includes = null);
        //lấy nhiều
        IEnumerable<T> GetMulti(Expression<Func<T, bool>> predicate, string[] includes = null);

        IEnumerable<T> GetMultiPaging(Expression<Func<T, bool>> filter, out int total, int index = 0, int size = 50, string[] includes = null);

        int Count(Expression<Func<T, bool>> where);

        bool CheckContains(Expression<Func<T, bool>> predicate);
    }
}