<script lang="ts">
  import { onMount } from "svelte";
  import "../../app.css";
  import LeadActions from "./lead-actions/LeadActions.svelte";
  import type { User } from "@supabase/supabase-js";

  $: user = null as User | null;

  onMount(() => {
    chrome.storage.sync.get(["user"], (result) => {
      console.log("Value currently is ", result.user);
      user = result.user;
    });

    // watch for changes
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === "user") user = newValue;
      }
    });
  });
</script>

<div id="bta-inegration">
  {#if user}
    <LeadActions />
  {/if}
</div>
