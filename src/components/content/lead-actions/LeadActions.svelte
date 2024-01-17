<script lang="ts">
  import { onMount } from 'svelte';
  import InitialCall from './InitialCall.svelte';
  import type { Lead } from '../../../lib/types';
  import NewLead from './NewLead.svelte';
  import Signing from './Signing.svelte';
  import Engagement from './Engagement.svelte';

  export let lead: Lead | null = null;

  $: stage = 'New Leads';

  onMount(async () => {
    // https://subscriptionberlintechai.kommo.com/leads/detail/9781682?tab_id=statistic
    // lead id is 9781682

    const stageNode = document.querySelector(
      '.pipeline-select__dropdown__item_selected',
    );
    if (stageNode) {
      // @ts-expect-error - innerText is not defined on Element
      stage = stageNode.innerText;
    }
  });
</script>

{#if stage === 'New Leads'}
  <div class="w-full p-4 pt-2 border rounded shadow-md bg-slate-50">
    <NewLead {lead} />
  </div>
{/if}

{#if stage === 'Initial call'}
  <div
    class="w-[96%] p-4 pt-2 border border-black rounded shadow-md shadow-black bg-slate-50"
  >
    <InitialCall {lead} />
  </div>
{/if}
<!-- 
{#if stage === 'Contract signing'}
  <div class="w-full p-4 pt-2 border rounded shadow-md bg-slate-50">
    <Signing {lead} />
  </div>
{/if} -->
<!-- {#if stage === 'Engagement'}
  <div class="w-full p-4 pt-2 border rounded shadow-md bg-slate-50">
    <Engagement {lead} />
  </div>
{/if} -->

<!-- {#if stage === 'Meeting'}
  <div class="w-full p-4 pt-2 border rounded shadow-md bg-slate-50">
    <Engagement {lead} />
  </div>
{/if} -->

<!-- 
 -->
