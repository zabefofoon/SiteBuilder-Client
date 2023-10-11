import {createRouter, defineEventHandler, useBase} from "h3"
import {serverSupabaseClient} from "#supabase/server"
import {Database} from "~/modes/Database"

const router = createRouter()

router.get('/pages', defineEventHandler(async (event) => {

  const client = await serverSupabaseClient<Database>(event)
  const {data, error} = await client
      .from('pages')
      .select('activate, authorized, dynamic, id, lock, name, url')

  if (error) console.error(error)


  return data
}))
export default useBase('/api/config', router.handler)