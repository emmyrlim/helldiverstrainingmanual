<script>
	import Hero from "$lib/components/Hero.svelte"
	import Slider from "$lib/components/Slider.svelte";
	import StratagemLink from "$lib/components/StratagemLink.svelte"
	import { toSlug } from "$lib/utils/route"

  export let data

  $: ({ faction, enemy } = data)
  $: ({ name, appearance, tactics, quicktip, stratagems, images } = enemy)
</script>

<svelte:head>
  <title>{name} | Helldivers Training Manual</title>
</svelte:head>

{#key name}
  <Hero basepath="/images/biomes" filename={faction.biome.slug}>
    {faction.faction.substring(0, faction.faction.length - 1)} {name}

    <div slot="content" class="image">
      <img src="/images/bestiary/{toSlug(name)}.png" alt={name} />
    </div>
  </Hero>

  <strong>Bestiary / {faction.faction}</strong>

  <div class="description">
    <h2 class="mt-1 mb-1/2">Appearance</h2>
    <p>{appearance || ""}</p>

    {#if images?.length}
      {#if images.length === 1}
        <img class="slide single" loading="lazy" width="800" height="500" src={images[0]} alt="" />
      {:else}
        <Slider>
          {#each images as src}
            <img class="slide" loading="lazy" width="800" height="500" {src} alt="" />
          {/each}
        </Slider>
      {/if}
    {/if}

    <h2 class="mt-1 mb-1/2">Battlefield Tactics</h2>
    {#if quicktip}
      <blockquote>{@html quicktip}</blockquote>
    {/if}

    {@html tactics || ""}
  </div>

  {#if stratagems?.length}
    <h2 class="mt-1 mb-1/2">Recommended Stratagems</h2>

    <div class="stratagems">
      {#each stratagems as stratagem}
        <StratagemLink {stratagem} />
      {/each}
    </div>
  {/if}
{/key}

<style lang="scss">
  .image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
      height: 100%;
      width: auto;
      filter: drop-shadow(0 0 1rem rgba($black, 0.25)) drop-shadow(0 0 2rem rgba($black, 0.5)) drop-shadow(0 0 4rem rgba($black, 0.25));
    }
  }

  .description {
    :global(h3) {
      margin: $margin 0 $margin * 0.25;
    }
  }

  .stratagems {
    display: flex;
    flex-direction: column;
    gap: $margin * 0.25;
    max-width: $text-limit;
  }

  .slide {
    max-width: clamp(250px, 50vw, $text-limit);
    height: auto;
    border: 3px solid $primary;

    &.single {
      max-width: $text-limit;
      margin-top: $margin;
    }
  }
</style>
