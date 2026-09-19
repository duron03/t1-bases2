-- Descripción: Query #1 para devolver a los empleados cuya condición civil es 'soltero'.
 CREATE PROC p_getSingleEmployees
 AS
 BEGIN
    SELECT * FROM HumanResources.Employee E
    WHERE E.MaritalStatus = 'S';
END
GO

-- Descripción: Query #2 para devolver un producto y el nombre de subcategoría utilizando un INNER JOIN.
CREATE PROC p_getSubcategoryProductsName
AS
BEGIN
    SELECT P.ProductID, P.Name, PS.Name as Subcategory_Name FROM Production.Product P
    INNER JOIN Production.ProductSubcategory PS ON P.ProductSubcategoryID = PS.ProductSubcategoryID;
END
GO

-- Descripción: Insertar un nuevo tipo de número de teléfono.
CREATE PROC Person.p_insertPhoneNumberType
    @Name NVARCHAR(50),
    @NewPhoneNumberTypeID INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Person.phoneNumberType (Name, ModifiedDate)
    VALUES (@Name, GETDATE());

    SET @NewPhoneNumberTypeID = SCOPE_IDENTITY();
END
GO

-- Descripción: Actualizar un tipo de número de teléfono
CREATE PROC Person.p_updatePhoneNumberType
    @PhoneNumberTypeID INT,
    @Name NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Person.PhoneNumberType
    SET Name = @Name,
        ModifiedDate = GETDATE()
    WHERE PhoneNumberTypeID = @PhoneNumberTypeID;
END
GO

-- Descripción: Eliminar un tipo de número de teléfono.
CREATE PROC Person.p_deletePhoneNumberType
    @PhoneNumberTypeID INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Person.PhoneNumberType
    WHERE PhoneNumberTypeID = @PhoneNumberTypeID;
END
GO