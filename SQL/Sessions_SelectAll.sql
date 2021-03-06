-- Author:		Elizabeth Phung
-- Create date: 3/23/22
-- Description:	Returns a paginated selection of records from dbo.Sessions
ALTER proc [dbo].[Sessions_SelectAll]
						@pageIndex int
						,@pageSize int
					

as

/*
		Declare @pageIndex int = 0
				,@pageSize int = 10
		
		Execute dbo.Sessions_SelectAll 
						@pageIndex
						,@pageSize

*/

BEGIN
		Declare @offset int = @pageIndex * @pageSize
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
				,totalCount = Count(1) Over()
		From dbo.Sessions as s inner join dbo.WorkShop as w
			on s.WorkShopId = w.Id
			inner join dbo.UserProfiles as u
				on u.UserId = s.CreatedBy
			inner join dbo.UserProfiles as up
				on up.UserId = s.ModifiedBy
		Order by Id
		Offset @offset Rows
		Fetch Next @pageSize Rows Only

END
