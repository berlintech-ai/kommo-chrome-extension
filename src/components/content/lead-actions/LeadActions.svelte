<script lang='ts'>
  import { onMount } from 'svelte';
  import InitialCall from './InitialCall.svelte';
  import type { Lead } from '../../../lib/types';

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

{#if stage === "New Leads" || stage === "Initial call"}
  <div class='p-4 pt-2 w-full rounded shadow bg-secondary  text-secondary-foreground'>
    <InitialCall {lead} />
  </div>
{/if}

{#if stage === "Verification"}
  <div class='p-4 pt-2 w-full rounded shadow bg-secondary  text-secondary-foreground'>
    <p>Placeholder for Verification</p>
  </div>
{/if}

{#if stage === "Contract signing"}
  <div class='p-4 pt-2 w-full rounded shadow bg-secondary text-secondary-foreground'>
    <p>Placeholder for Contract Signing</p>
  </div>
{/if}
