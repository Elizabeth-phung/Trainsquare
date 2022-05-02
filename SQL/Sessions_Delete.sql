USE [Trainsquare]
GO
/****** Object:  StoredProcedure [dbo].[Sessions_Delete]    Script Date: 5/2/2022 11:39:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author:		Elizabeth Phung
-- Create date: 3/23/22
-- Description:	Deletes a record from dbo.Sessions by its Id
-- Code Reviewer:


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
ALTER proc [dbo].[Sessions_Delete]
				@Id int

as 

/*   
		Declare @Id int = 2

		Execute dbo.Sessions_Select_ById @Id

		Execute dbo.Sessions_Delete
					@Id 
	
		Execute dbo.Sessions_Select_ById @Id
*/

BEGIN

		Delete
		From dbo.Sessions
		Where Id = @Id

END
