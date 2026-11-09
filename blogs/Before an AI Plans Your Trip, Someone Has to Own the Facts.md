---
title: "Before an AI Plans Your Trip, Someone Has to Own the Facts"
date: "2026-11-09"
tags: ["Data Engineering", "Artificial Intelligence", "Open Source", "Travel"]
externalUrl: "https://medium.com/@prajwalamte/before-an-ai-plans-your-trip-someone-has-to-own-the-facts-6c4feefb7cc6"
coverImage: "/images/blogs/trustworthy-travel-data-cover.jpg"
excerpt: "A restaurant description with no source, date or licence is hard to trust, and harder still when an AI assistant turns it into a confident answer. What trustworthy travel data needs: provenance, freshness, licensing, and the courage to say \"unknown\"."
---

Take a restaurant description: *One of the very old traditional breakfast places in Bengaluru.* It is the listing for Mavalli Tiffin Room, and it might well be right. But who wrote it, and when? Is the place still open? Has anyone checked it since? Can you reuse it, and on what terms?

A sentence on its own cannot answer any of that. It matters more when a program is reading it, because an AI assistant can turn a pile of listings into a smooth, confident answer without showing how old the facts underneath are. Anyone can generate an answer. Someone has to own the facts.

## A fact is a sentence plus its receipt

In Saarthi, the open travel dataset I am building for India, every fact has to answer four questions:

- **Time:** when was it observed, and when should it be checked again?
- **Trust:** has anyone actually confirmed it?
- **Evidence:** where did it come from?
- **Rights:** what am I allowed to do with it?

The Mavalli record carries a source revision, an observation date (29 March 2026), a review date, a licence (CC BY-SA 4.0) and a verification count of 0. A source backs it, no person has checked it, and the record says so. Two dates are easy to confuse: `observedAt` is when the source showed the fact, while `sourceRefreshedAt` is only when the page was last fetched. Fetching again does not make a fact newer.

## A source can be authoritative and still be wrong

Wikivoyage, OpenStreetMap and Wikidata are sensible places to look, but none guarantees every record is correct or current. So the dataset keeps "a source says so" separate from "a person has checked it". A fact is always in one of five states: source-backed, community-reported, community-verified, needs re-verification, or conflicting reports. These are not permanent badges. A confirmation only counts inside its review window.

## Information gets old at different speeds

Opening hours change next week; a description of a building can stay accurate for years. Each fact gets a volatility class and a review window: 120 days for prices and opening hours, 365 for descriptions, 1,095 for things that rarely change. Freshness is worked out when a fact is read, so nothing depends on a nightly job. Old information is labelled, not passed off as current.

## Licences are part of the data

Open data is not free for any use. Wikivoyage text is CC BY-SA 4.0; OpenStreetMap is under the ODbL. The licence travels with the evidence for every fact, so I can see which records came from a source, what its terms are, or stop publishing that source's data without reconstructing history from memory.

## The pipeline has to be able to say no

Every source goes through the same lifecycle: fetch, validate, parse, normalize, resolve identities, persist, and run a quality gate. Only what passes the critical checks is published. When an OpenStreetMap import could not reach the files that identify its release, no release version was stored. The gate requires at least 99% of records to keep it, the result was 0%, and the data stayed withheld until a later run read the version from the file's own header. A check that cannot fail is decoration.

These checks measure import health, not truth. They say nothing about whether a restaurant is any good.

## What the coverage numbers say

On 9 November 2026, of 901 destinations with a coverage status, 233 were indexed with no guide content, 405 were still being built, 236 needed a refresh, and 27 were rated usable. None was rated well covered. I would rather report a small number with a clear definition than "thousands of destinations indexed". Where data does not exist, the field stays empty instead of being guessed.

## Trust is maintenance

A travel dataset rarely fails loudly. A restaurant closes, a price moves, a licence changes, an import quietly stops working. Sources refresh on a schedule (weekly for Wikivoyage and OpenStreetMap, monthly for Wikidata and Overture, yearly for climate), each fact has its own review window, and readers can confirm or correct a fact with "Still true?".

I started with one restaurant description. The hard part was making sure that, months later, someone could still ask where it came from and get an honest answer.
