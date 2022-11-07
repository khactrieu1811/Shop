using AutoMapper;
using Shop.Model.Models;
using Shop.Service;
using Shop.Web.Infrastructure.Core;
using Shop.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Shop.Web.Infrastructure.Extensions;

namespace Shop.Web.Api
{
    [RoutePrefix("api/postcategory")]
    public class PostCategoryController : ApiControllerBase
    {
        IPostCategoryService _postCategoryService;
        //phương thức này chuyển vào errorservice phải khởi tạo như sau
            // cái base cần thiết controller truyền vào     
        public PostCategoryController(IErrorService errorService, IPostCategoryService postCategoryService) : // truyền từ contrller con sang cha
            base(errorService)
        {
            this._postCategoryService = postCategoryService;
        }
        [Route("getall")]
        public HttpResponseMessage Get(HttpRequestMessage request)
        {
            // hàm đạt danh 
            return CreateHttpResponse(request, () =>
            {
                var listCategory = _postCategoryService.GetAll();
                            //phương thức map      //list truyền vào //trả về PostCateVM //Truyền vào ListCategory      
                var listPostCategoryVm = Mapper.Map<List<PostCategoryViewModel>>(listCategory);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPostCategoryVm);

                return response;
            });
        }
        [Route("add")]
        public HttpResponseMessage Post(HttpRequestMessage request, PostCategoryViewModel postcategoryVm)
        {
            // hàm đạt danh 
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    //khởi tạo đê đồi tượng lấy phương thức mở rộng
                    PostCategory newPostCategory = new PostCategory();
                    newPostCategory.UpdatePostCategory(postcategoryVm);

                    var category = _postCategoryService.Add(newPostCategory);
                    _postCategoryService.Save();
                    response = request.CreateResponse(HttpStatusCode.Created, category);
                }
                return response;
            });
        }
        [Route("update")]
        public HttpResponseMessage Put(HttpRequestMessage request, PostCategoryViewModel postcategoryVm)
        {
            // hàm đạt danh 
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    //láy từ Db(postcategorydb  //dùng postSV.Getbyid
                    var postCategoryDb = _postCategoryService.GetById(postcategoryVm.ID);
                    //update nó sẻ copy vào postcategyvm
                    postCategoryDb.UpdatePostCategory(postcategoryVm);
                    //update vào 
                    _postCategoryService.Update(postCategoryDb);
                    _postCategoryService.Save();
                    response = request.CreateResponse(HttpStatusCode.OK);
                }
                return response;
            });
        }
        public HttpResponseMessage Datele(HttpRequestMessage request, int id)
        {
            // hàm đạt danh 
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (ModelState.IsValid)
                {
                    request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    _postCategoryService.Delete(id);
                    _postCategoryService.Save();
                    response = request.CreateResponse(HttpStatusCode.OK);
                }
                return response;
            });
        }
    }
}