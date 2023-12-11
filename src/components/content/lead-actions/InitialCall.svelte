<script lang='ts'>
  import { CameraIcon, Clock, PhoneForwarded, PhoneMissed, PhoneOff, UserX } from 'lucide-svelte';
  import type { Lead } from '../../../lib/types';
  import { apiUrl } from '../../../lib/utils';

  export let lead = null as Lead | null;
</script>

{#if lead}
  <p class='text-xl text-secondary-foreground font-semibold'>What was the result of the call?</p>
  <p class='text-sm text-secondary-foreground'>
    This will do some magic and update the lead status
  </p>

  <div class='flex flex-wrap -mx-2 space-x-2 space-y-2 text-xs font-medium'>
    <div />
    <button
      on:click={() => {
        if (!lead) return;
        fetch(`${apiUrl}/call-result`, {
          method:"POST",
          body: JSON.stringify({
            status: "proceed_to_verification",
            lead_id: lead.lead_id,
            contact_id: lead.contact_id,
            email: lead.email,
            name: lead.name,
            responsible_user_id: lead.responsible_user_id,
            responsible_user_name: lead.responsible_user_name,
          }),
        });
      }}
      class='px-2 py-1 bg-blue-600 border rounded font-semibold shadow text-white'
    >
      <CameraIcon class='inline-block w-3 h-3 mr-1' />
      Ready to proceed
    </button>
    <button
      on:click={() => {
        if (!lead) return;
        fetch(`${apiUrl}/call-result`, {
          method:"POST",
          body: JSON.stringify({
            status: "not_interested",
            lead_id: lead.lead_id,
            contact_id: lead.contact_id,
            email: lead.email,
            name: lead.name,
            responsible_user_id: lead.responsible_user_id,
            responsible_user_name: lead.responsible_user_name,
          }),
        });
      }}
      class='px-2 py-1 bg-red-500 border rounded shadow text-primary-foreground'
    >
      <UserX class='inline-block w-3 h-3 mr-1' />
      Not interested
    </button>
    <div class='flex-1' />

    <button
      on:click={() => {
        if (!lead) return;
        fetch(`${apiUrl}/call-result`, {
          method:"POST",
          body: JSON.stringify({
            status: "no_answer",
            lead_id: lead.lead_id,
            contact_id: lead.contact_id,
            email: lead.email,
            name: lead.name,
            responsible_user_id: lead.responsible_user_id,
            responsible_user_name: lead.responsible_user_name,
          }),
        });
      }}
      class='px-2 py-1 border rounded shadow bg-slate-200 text-secondary-foreground bg-secondary'
    >
      <PhoneMissed class='inline-block w-3 h-3 mr-1' />
      No answer
    </button>

    <button
      on:click={() => {
        if (!lead) return;
        fetch(`${apiUrl}/call-result`, {
          method:"POST",
          body: JSON.stringify({
            status: "needs_info",
            lead_id: lead.lead_id,
            contact_id: lead.contact_id,
            email: lead.email,
            name: lead.name,
            responsible_user_id: lead.responsible_user_id,
            responsible_user_name: lead.responsible_user_name,
          }),
        });
      }}
      class='px-2 py-1 border rounded shadow bg-slate-200 text-secondary-foreground bg-accent'
    >
      <PhoneForwarded class='inline-block w-3 h-3 mr-1' />
      Needs info
    </button>
    <button
      on:click={() => {
        if (!lead) return;
        fetch(`${apiUrl}/call-result`, {
          method:"POST",
          body: JSON.stringify({
            status: "needs_time",
            lead_id: lead.lead_id,
            contact_id: lead.contact_id,
            email: lead.email,
            name: lead.name,
            responsible_user_id: lead.responsible_user_id,
            responsible_user_name: lead.responsible_user_name,
          }),
        });
      }}
      class='px-2 py-1 border rounded shadow bg-slate-200 text-secondary-foreground bg-accent'
    >
      <Clock class='inline-block w-3 h-3 mr-1' />
      Needs time
    </button>

    <button
      on:click={() => {
        if (!lead) return;
        fetch(`${apiUrl}/call-result`, {
          method:"POST",
          body: JSON.stringify({
            status: "invalid_number",
            lead_id: lead.lead_id,
            contact_id: lead.contact_id,
            email: lead.email,
            name: lead.name,
            responsible_user_id: lead.responsible_user_id,
            responsible_user_name: lead.responsible_user_name,
          }),
        });
      }}
      class='px-2 py-1 bg-orange-400 border rounded shadow text-primary-foreground'
    >
      <PhoneOff class='inline-block w-3 h-3 mr-1' />
      Invalid number
    </button>
  </div>
{/if}
