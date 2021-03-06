-- Author:		Elizabeth Phung
-- Create date: 3/23/22
-- Description:	Deletes a record from dbo.Sessions by its Id

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
