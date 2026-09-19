import { getConnection, sql } from '../database/connection.js';

/** Devuelve los empleados cuyo estado civil es soltero mediante el procedimiento p_getSingleEmployees. */
export const getSingleEmployees = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute('p_getSingleEmployees');
    res.json(result.recordset);
    
  } catch (error) {
    console.error('Error founded:', error);
    res.status(500).json({ error: error.message });
  }
};

/** Devuelve productos junto con el nombre de su subcategoría mediante un INNER JOIN almacenado. */
export const getSubcategoryProductsName = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute('p_getSubcategoryProductsName');
    res.json(result.recordset);
    
  } catch (error) {
    console.error('Error founded:', error);
    res.status(500).json({ error: error.message });
  }
};

/** Crea un tipo de número telefónico con `name` en el cuerpo y devuelve su identificador generado. */
export const createPhoneNumberType = async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    const pool = await getConnection();
    
    const result = await pool.request()
      .input('Name', name)
      .output('NewPhoneNumberTypeID')
      .execute('Person.p_insertPhoneNumberType');
      
    res.json({ 
      message: 'Registry created', 
      newId: result.output.NewPhoneNumberTypeID 
    });
    
  } catch (error) {
    console.error('Error founded:', error);
    res.status(500).json({ error: error.message });
  }
};

/** Actualiza el nombre de un tipo telefónico identificado por `req.params.id`. */
export const updatePhoneNumberType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const pool = await getConnection();
    
    await pool.request()
      .input('PhoneNumberTypeID', id)
      .input('Name', name)
      .execute('Person.p_updatePhoneNumberType');
      
    res.json({ message: 'Registry updated' });
    
  } catch (error) {
    console.error('Error founded:', error);
    res.status(500).json({ error: error.message });
  }
};

/** Elimina el tipo telefónico identificado por `req.params.id`. */
export const deletePhoneNumberType = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pool = await getConnection();
    
    await pool.request()
      .input('PhoneNumberTypeID', id)
      .execute('Person.p_deletePhoneNumberType');
      
    res.json({ message: 'Registry deleted' });
    
  } catch (error) {
    console.error('Error founded:', error);
    res.status(500).json({ error: error.message });
  }
};
