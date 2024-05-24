<script lang="ts">
  import type { Lead } from '../../../lib/types';
  import EmailLink from './EmailLink.svelte';

  export let lead = null as Lead | null;
</script>

{#if lead}
  <div
    class="flex flex-wrap -mx-2 space-x-2 space-y-2 w-full text-xs font-medium"
  >
    <div />
    <EmailLink {lead} />
  </div>
{/if}
