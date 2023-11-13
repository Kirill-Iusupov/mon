const db = require('../utils/db');

async function logDB (message, type, action, json, user, is_staff) {
    const sql = `INSERT INTO public.logs
                  (text_log, type_log, action_name,  id_user, json_log, execution_time, is_staff)
                VALUES($1, $2, $3, $4, $5::jsonb, current_timestamp, $6);`;
    const result = await db.query(sql, [
        message,
        type,
        action,
        user,
        JSON.stringify(json),
        is_staff
    ]);
    console.log('public.logs', result);
    return 1;
}

module.exports = {
    logDB
};
