import { createClient } from "@/lib/supabase/client";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const supabase = createClient();

    const { id } = await context.params;

    console.log("Fetching user by id:", id);

    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: `User: ${id} not found` }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ sucess: "ok" }), { status: 200 });
  } catch (e) {
    console.error("Error fetching user by id:", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
    });
  }
}