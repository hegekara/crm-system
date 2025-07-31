using AutoMapper;
using Backend.Dto;
using Backend.Models;

namespace Backend.Mappings
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<Customer, CustomerDto>()
                .ReverseMap();
        }
    }
}
