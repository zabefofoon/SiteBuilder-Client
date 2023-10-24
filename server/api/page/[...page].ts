import {createRouter, defineEventHandler, getQuery, useBase} from "h3"
import {serverSupabaseClient} from "#supabase/server"
import {Database} from "~/modes/Database"

const router = createRouter()

router.get('/detail', defineEventHandler(async (event) => {
  const {id} = await getQuery(event)
  const client = await serverSupabaseClient<Database>(event)
  const {data} = await client
      .from('pages')
      .select('id,detail')
      .eq('id', Number(id))
      .limit(1)
      .single()

  return data
}))

export default useBase('/api/page', router.handler)