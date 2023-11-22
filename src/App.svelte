<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./lib/supabase";
  import type { User } from "@supabase/supabase-js";
  import { cn } from "./lib/utils";

  // get user data
  $: user = null as User | null;
  $: error = null as string | null;
  $: loading = false;

  const handleSubmit = async (event: SubmitEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // set loading state
    loading = true;

    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (err) {
      error = err.message;
    } else {
      user = data.user;
      chrome.storage.sync.set({ user: data.user });
      error = null;
      (event.target as HTMLFormElement).reset();
    }

    // reset form
    loading = false;
  };

  onMount(async () => {
    chrome.storage.sync.get(["user"], (result) => {
      console.log("Value currently is " + result.user);
      user = result.user;
    });
  });
</script>

<main class="min-w-[320px] p-4">
  {#if !user}
    <h1 class="text-xl font-semibold">Sign in</h1>
    <p class="opacity-80">
      Get magic links sent to your email to sign in to the extension.
    </p>

    <form
      class={cn("flex flex-col mt-4 space-y-4", loading && "animate-pulse")}
      on:submit|preventDefault={handleSubmit}
    >
      <input
        disabled={loading}
        required
        type="email"
        name="email"
        placeholder="Email"
        class="px-4 py-2 border rounded shadow"
      />

      <input
        disabled={loading}
        required
        type="password"
        name="password"
        placeholder="Password"
        class="px-4 py-2 border rounded shadow"
      />

      {#if error}
        <p>
          <small class="text-red-500">{error}</small>
        </p>
      {/if}

      <button class="w-full py-2 rounded bg-primary text-primary-foreground">
        Sign in
      </button>
    </form>
  {:else}
    <h1 class="text-lg font-semibold">Welcome back, {user.email}</h1>
    <p class="opacity-80">You are now signed in to the extension.</p>

    <div>
      <!-- svelte-ignore missing-declaration -->
      <button
        class="w-full py-1 mt-4 rounded bg-primary text-primary-foreground"
        on:click={() => {
          supabase.auth.signOut();
          chrome.storage.sync.remove(["user"]);
          user = null;
        }}
      >
        Sign out
      </button>
    </div>
  {/if}
</main>
