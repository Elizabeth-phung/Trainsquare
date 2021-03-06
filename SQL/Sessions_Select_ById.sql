-- Author:		Elizabeth Phung
-- Create date: 3/23/22
-- Description:	Returns a single record from dbo.Session that matches the given @Id
ALTER proc [dbo].[Sessions_Select_ById]
					@Id int

as

/*
		Declare @Id int = 194
		
		Execute dbo.Sessions_Select_ById @Id

*/

BEGIN
		Select s.Id
				,s.TotalSlots
				,s.OpenSlots
				,s.[Date]
				,s.StartTime
				,s.EndTime
				,s.DateCreated
				,s.DateModified
				,s.CreatedBy
				,u.FirstName
				,u.LastName
				,u.AvatarUrl
				,s.ModifiedBy
				,up.FirstName
				,up.LastName
				,up.AvatarUrl
				,s.WorkShopId
		From dbo.Sessions as s inner join dbo.WorkShop as w
			on s.WorkShopId = w.Id
			inner join dbo.UserProfiles as u
				on u.UserId = s.CreatedBy
			inner join dbo.UserProfiles as up
				on up.UserId = s.ModifiedBy
		Where s.Id = @Id
END
