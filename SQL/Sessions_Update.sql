-- Author:		Elizabeth Phung
-- Create date: 3/23/22
-- Description:	Updates a given record from dbo.Sessions
ALTER proc [dbo].[Sessions_Update]
				@Id int
				,@WorkShopId int
				,@TotalSlots int
				,@OpenSlots int
				,@Date datetime2(7)
				,@StartTime time(0)
				,@EndTime time(0)
				,@User int
as 

/*
		Declare @Id int = 195
				,@WorkShopId int = 10
				,@TotalSlots int = 20
				,@OpenSlots int = 10
				,@Date datetime2(7) = '2022-04-13'
				,@StartTime time(0) = '12:00:00'
				,@EndTime time(0) = '13:00:00'
				,@CreatedBy int = 9

		Execute dbo.Sessions_Update
					@Id 
					,@WorkShopId 
					,@TotalSlots
					,@OpenSlots
					,@Date 
					,@StartTime 
					,@EndTime 
					,@CreatedBy

		Select	Id
					,WorkShopId
					,TotalSlots
					,OpenSlots
					,[Date]
					,StartTime 
					,EndTime
					,DateCreated
					,CreatedBy
					,ModifiedBy
			From dbo.Sessions
			Where Id = @Id
*/

BEGIN
		Declare @dateMod datetime2(7) = getutcdate()

		Update dbo.Sessions 
		Set WorkShopId = @WorkShopId
			,TotalSlots = @TotalSlots
			,OpenSlots = @OpenSlots 
			,[Date] = @Date 
			,StartTime = @StartTime 
			,EndTime = @EndTime 
			,ModifiedBy = @user
			,DateModified = @dateMod
		Where Id = @Id

END
