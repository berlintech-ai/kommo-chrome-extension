<script lang="ts">
  import {
    Calendar,
    CameraIcon,
    Clock,
    PhoneForwarded,
    PhoneMissed,
    PhoneOff,
    UserX,
  } from 'lucide-svelte';
  import type { Lead } from '../../../lib/types';
  import { apiUrl } from '../../../lib/utils';

  export let lead = null as Lead | null;

  $: loading = false;
  $: error = null as string | null;
  $: message = null as string | null;

  const postCallResult = async (status: string) => {
    if (!lead) return;

    loading = true;

    fetch(`${apiUrl}/call-result`, {
      method: 'POST',
      body: JSON.stringify({
        status,
        lead_id: lead.lead_id,
        contact_id: lead.contact_id,
        email: lead?.email,
        name: lead.name,
        responsible_user_id: lead.responsible_user_id,
        responsible_user_name: lead.responsible_user_name,
      }),
    })
      .then(async res => {
        console.log('Call updated', res);
        message = 'Call result updated';
      })
      .catch(err => {
        error = err.message;
      })
      .finally(() => {
        loading = false;
        setTimeout(() => {
          error = null;
          message = null;
        }, 2000);
      });
  };

  $: {
    console.log({ message });
  }
</script>

{#if lead && !loading}
  <p class="text-xl font-semibold text-black">
    What was the result of the call?
  </p>
  <p class="text-sm text-black">
    This will do some magic and update the lead status
  </p>

  <div
    class="flex flex-wrap w-full -mx-2 space-x-2 space-y-2 text-xs font-medium"
  >
    <div />
    <button
      on:click={() => {
        postCallResult('to_meeting');
      }}
      class="flex items-center px-2 py-1 font-semibold text-white bg-blue-600 border rounded shadow"
    >
      <Calendar class="inline-block w-3 h-3 mr-1" />
      Ready for meeting
    </button>
    <button
      on:click={() => {
        postCallResult('not_interested');
      }}
      class="flex items-center px-2 py-1 bg-red-500 border rounded shadow text-primary-foreground"
    >
      <UserX class="inline-block w-3 h-3 mr-1" />
      Not interested
    </button>
    <div class="flex-1" />

    <button
      on:click={() => {
        postCallResult('no_answer');
      }}
      class="flex items-center px-2 py-1 border rounded shadow bg-slate-200 text-secondary-foreground bg-secondary"
    >
      <PhoneMissed class="inline-block w-3 h-3 mr-1" />
      No answer
    </button>

    <button
      on:click={() => {
        postCallResult('needs_info');
      }}
      class="flex items-center px-2 py-1 border rounded shadow bg-slate-200 text-secondary-foreground bg-accent"
    >
      <PhoneForwarded class="inline-block w-3 h-3 mr-1" />
      Needs info
    </button>
    <button
      on:click={() => {
        postCallResult('needs_time');
      }}
      class="flex items-center px-2 py-1 border rounded shadow bg-slate-200 text-secondary-foreground bg-accent"
    >
      <Clock class="inline-block w-3 h-3 mr-1" />
      Needs time
    </button>

    <button
      on:click={() => {
        postCallResult('invalid_number');
      }}
      class="flex items-center px-2 py-1 bg-orange-400 border rounded shadow text-primary-foreground"
    >
      <PhoneOff class="inline-block w-3 h-3 mr-1" />
      Invalid number
    </button>
  </div>
{/if}

{#if loading}
  <div
    class="flex items-center justify-center w-full h-full mt-2 text-lg font-semibold animate-pulse"
  >
    Doing the magic 🪄
  </div>
{/if}

{#if error}
  <div class="w-[90%] p-4 mt-2 bg-red-500 border rounded shadow-md">
    <p class="text-lg font-semibold text-white">Error: {error}</p>
  </div>
{/if}

{#if message}
  <div class="w-[90%] p-4 mt-2 bg-green-500 border rounded shadow-md">
    <p class="text-lg font-semibold text-white">Success: {message}</p>
  </div>
{/if}
