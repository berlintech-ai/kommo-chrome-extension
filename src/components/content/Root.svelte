<script lang="ts">
  import { onMount } from 'svelte';
  import LeadActions from './lead-actions/LeadActions.svelte';
  import type { User } from '@supabase/supabase-js';
  import type { Lead } from '../../lib/types';
  import { apiUrl } from '../../lib/utils';

  export let callback: () => void;
  // $: user = null as User | null;
  $: lead = null as Lead | null;

  const loadLead = async () => {
    const leadId = window.location.href.split('/').pop()?.split('?')[0];

    lead = (await (
      await fetch(`${apiUrl}/lead/${leadId}`)
    ).json()) as unknown as Lead;

    callback();
  };

  onMount(async () => {
    loadLead();
  });

  $: {
    console.log(lead);
  }
</script>

<div id="bta-integration" class="w-full">
  {#if lead}
    <LeadActions {lead} />
  {/if}
</div>
