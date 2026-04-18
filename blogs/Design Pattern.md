---
title: "The Architecture Behind Code: A Technical Dive into Design Patterns"
date: "2025-10-20"
tags: ["Software Design", "Design Patterns", "Architecture", "Engineering"]
---

# The Architecture Behind Code: A Technical Dive into Design Patterns

> "Write code as if the next developer who maintains it is a violent psychopath who knows where you live."

It's 11 PM on a Friday. You're staring at a pull request that adds a new payment method — new provider, same result. It should be simple. But as you scroll through the diff, the charge logic is scattered across six files, the provider is hardcoded in three service classes, and the only way to test it without hitting a real card processor is to pray.

Someone, at some point, decided that a few shortcuts were fine. They weren't.

This is what code without architectural intent looks like in production. Not spaghetti you can see — but the invisible accumulation of small, locally-reasonable decisions that never talked to each other.

Design patterns exist to prevent this. But they're widely misunderstood — memorised for interviews and applied like decorations, rather than internalised as a way of thinking. This post tries to change that.


## What a Design Pattern Actually Is

A design pattern is not a library, not a framework, not a snippet. It is a **named solution to a recurring structural problem in software design**. The word "named" matters more than it looks.

When you name a thing, you can reason about it, debate it, and teach it. The moment you say "we're using a Strategy here," everyone on your team immediately understands the intent: there are multiple algorithms that can be substituted at runtime, probably behind an interface. You don't need to explain the code. The pattern explains itself.

This is why patterns are sometimes described as a **vocabulary** rather than a technique. They compress architectural conversations.

The GoF book — *Design Patterns: Elements of Reusable Object-Oriented Software* (1994) by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides — formalised 23 of them. Decades later, most of the codebases you work in are shaped by these 23 ideas, whether the original authors knew it or not.


## Why the Common Misuse Happens

Before diving into the patterns themselves, it's worth naming the most common failure mode: **applying patterns before you understand the problem they solve**.

The Gang of Four were explicit about this. Every pattern has three parts: a *context* (when does this apply?), a *problem* (what specifically goes wrong without it?), and a *solution* (the structure that resolves it). Most developers only ever learn the solution part.

The result is pattern addiction — the architectural equivalent of buying a hammer and seeing every problem as a nail. A Singleton applied to a class that doesn't need global state. A Factory wrapping a constructor that will never have more than one implementation. An Observer hierarchy built for a system where two classes need to talk, once, at startup.

Over-engineering isn't safer than under-engineering. It's just slower to debug.

The right question before applying a pattern isn't "does this fit?" It's "what would go wrong in six months without it?"


## The Three Families

The 23 GoF patterns fall into three categories, each targeting a different dimension of software design.


### Creational Patterns — Controlling How Objects Come to Life

The core problem creational patterns solve: **your code shouldn't need to know how an object gets built**. The moment a class knows which concrete type it's instantiating, you've created a dependency that makes testing painful, extension messy, and change expensive.

#### Factory Method

The Factory Method pattern defines a method for creating an object, but defers which class gets instantiated to subclasses — or, in modern practice, to configuration.

Consider a notification system that sends via email, SMS, or push depending on user preference. Without a factory:

```java
if (prefs.getChannel().equals("EMAIL")) {
    new EmailNotification().send(message);
} else if (prefs.getChannel().equals("SMS")) {
    new SmsNotification().send(message);
}
```

Every new channel requires editing this logic. Tests for `OrderService` now implicitly test email dispatch. With a factory:

```java
public interface Notification {
    void send(String message);
}

public class NotificationFactory {
    public static Notification create(String channel) {
        return switch (channel) {
            case "EMAIL" -> new EmailNotification();
            case "SMS"   -> new SmsNotification();
            case "PUSH"  -> new PushNotification();
            default      -> throw new IllegalArgumentException("Unknown channel: " + channel);
        };
    }
}

Notification n = NotificationFactory.create(user.getPreferredChannel());
n.send("Your order has shipped.");
```

Adding WhatsApp is a three-line change in one file. `OrderService` tests use a stub `Notification`. The coupling is gone.

**You'll find this pattern in:** Spring's `BeanFactory`, JDBC's `DriverManager.getConnection()`, `LoggerFactory.getLogger()` in SLF4J, every plugin system ever built.

#### Builder

Builder addresses the telescoping constructor problem — the situation where a class has so many optional fields that you end up with constructors like `new HttpRequest(url, method, null, null, null, true, 30)`.

```java
HttpRequest request = new HttpRequest.Builder("https://api.example.com/orders")
    .method("POST")
    .header("Authorization", "Bearer " + token)
    .body(payload)
    .timeout(Duration.ofSeconds(30))
    .retryOnFailure(true)
    .build();
```

The builder validates preconditions before construction, makes optional parameters explicit, and produces immutable objects. Standard practice for any configuration object that lives beyond a prototype.

**Real-world use:** `StringBuilder`, `Lombok @Builder`, `OkHttp.Request.Builder`, every modern HTTP or SQL query builder.

#### Singleton

The most overused pattern in existence, and the most dangerous when misapplied. A Singleton ensures a class has exactly one instance and provides a global access point.

Legitimate uses: a thread pool, a logger, a connection pool, a configuration object loaded once from disk. Illegitimate uses: sharing mutable state between components because you didn't want to inject dependencies properly. This creates hidden global state that makes tests order-dependent, parallelism brittle, and bugs nearly impossible to reproduce.

The modern approach: don't write Singletons manually. Let your IoC container manage the lifecycle. Spring's default `@Bean` scope gives you the guarantee without the global state risk.


### Structural Patterns — Composing Classes Without Breaking Them

Structural patterns govern **how classes and objects are assembled**. Their shared goal: make it possible to add, extend, or wrap behaviour without modifying the original class, and without building an inheritance explosion.

#### Adapter

The Adapter pattern converts the interface of one class into the interface another class expects. It's the bridge between two systems that were never designed to talk to each other — which, in practice, is almost always the situation.

Classic example: you're integrating a third-party payment processor whose API looks nothing like your internal `PaymentGateway` interface.

```java
interface PaymentGateway {
    PaymentResult charge(BigDecimal amount, String currency, String token);
}

// Third-party SDK you can't modify
class StripeClient {
    StripeCharge createCharge(long amountInCents, String currency, String source) { ... }
}

class StripeGatewayAdapter implements PaymentGateway {
    private final StripeClient stripe;

    public StripeGatewayAdapter(StripeClient stripe) {
        this.stripe = stripe;
    }

    @Override
    public PaymentResult charge(BigDecimal amount, String currency, String token) {
        long cents = amount.multiply(BigDecimal.valueOf(100)).longValueExact();
        StripeCharge charge = stripe.createCharge(cents, currency, token);
        return new PaymentResult(charge.getId(), charge.getStatus());
    }
}
```

Swapping Stripe for Braintree means writing a `BraintreeGatewayAdapter`. `OrderService` never changes.

**In the wild:** JDBC drivers, `Arrays.asList()`, every API wrapper ever written.

#### Decorator

Decorator adds behaviour to an object at runtime without modifying its class or creating a subclass. It wraps the object in another object that implements the same interface and extends it.

The critical difference from inheritance: Decorator is **composable**. You can stack decorators and change the combination at runtime. Inheritance bakes the feature into the class hierarchy permanently.

```java
interface DataSource {
    void write(String data);
    String read();
}

class FileDataSource implements DataSource { /* raw file I/O */ }

class EncryptionDecorator implements DataSource {
    private final DataSource wrapped;

    EncryptionDecorator(DataSource source) { this.wrapped = source; }

    public void write(String data) { wrapped.write(encrypt(data)); }
    public String read() { return decrypt(wrapped.read()); }
}

class CompressionDecorator implements DataSource {
    private final DataSource wrapped;
    // compress on write, decompress on read
}

// Encrypted + compressed file storage, composed at runtime
DataSource storage = new CompressionDecorator(
    new EncryptionDecorator(
        new FileDataSource("orders.dat")
    )
);
```

Each decorator does one thing. The combinations are unlimited. No inheritance required.

**Everywhere in Java I/O:** `BufferedInputStream(new FileInputStream(...))` is literally a Decorator. Spring's `@Transactional` and `@Cacheable` are Decorator-flavoured AOP proxies.

#### Facade

Facade provides a simplified interface to a complex subsystem. Instead of every client needing to coordinate five classes to send an email, a `NotificationFacade` does it behind a single method.

The key design principle: the Facade **hides** complexity without eliminating it. Clients who need the full power of the subsystem can still access it directly. The Facade is a convenience, not a constraint.

This is the pattern most commonly used and least commonly named. Every service class that wraps repository, mapper, validator, and queue publishing behind a single `processOrder()` method is a Facade.


### Behavioral Patterns — Managing How Objects Communicate

Behavioral patterns address **how objects collaborate and how responsibilities are distributed**. This is where the real complexity in systems lives — not in data structures, but in the coordination between components.

#### Observer

An object (the subject) maintains a list of dependents (observers) and notifies them automatically when state changes. The subject knows nothing about what the observers do with that notification.

```java
class OrderService {
    private final List<OrderEventListener> listeners = new ArrayList<>();

    public void addListener(OrderEventListener listener) {
        listeners.add(listener);
    }

    public void placeOrder(Order order) {
        // core logic
        listeners.forEach(l -> l.onOrderPlaced(order));
    }
}

class InventoryService implements OrderEventListener {
    public void onOrderPlaced(Order order) { /* reserve stock */ }
}

class EmailService implements OrderEventListener {
    public void onOrderPlaced(Order order) { /* send confirmation */ }
}
```

`OrderService` doesn't know or care about inventory, email, or analytics. Adding a new reaction to an order requires zero changes to `OrderService`.

**In practice:** Spring's `ApplicationEventPublisher`, JavaScript's `addEventListener`, Kafka consumers, RxJava `Observable` — all Observer in structure.

#### Strategy

Strategy externalises an algorithm behind an interface so it can be selected and swapped independently of the client that uses it.

The problem it solves: you have an operation with multiple valid implementations — sorting, pricing, compression — and you want to select the right one at runtime without a wall of conditionals.

```java
interface ShippingStrategy {
    BigDecimal calculateCost(Order order);
}

class StandardShipping implements ShippingStrategy { /* flat rate */ }
class ExpressShipping implements ShippingStrategy { /* weight-based */ }
class FreeShippingStrategy implements ShippingStrategy {
    public BigDecimal calculateCost(Order order) { return BigDecimal.ZERO; }
}

class ShoppingCart {
    private ShippingStrategy shippingStrategy;

    public void setShippingStrategy(ShippingStrategy strategy) {
        this.shippingStrategy = strategy;
    }

    public BigDecimal getTotal() {
        return itemsTotal().add(shippingStrategy.calculateCost(toOrder()));
    }
}
```

Adding `SameDayDelivery` is one new class, zero changes elsewhere.

**In Spring Boot:** `Comparator` implementations, Spring Security's `AuthenticationProvider` chain, transaction isolation levels — all strategies.

#### Command

Command encapsulates a request as an object, allowing it to be queued, logged, undone, or replayed. The call site doesn't execute the operation — it creates a command object and hands it off. This decouples who wants something done from what is actually done and when.

```java
interface Command {
    void execute();
    void undo();
}

class TransferFundsCommand implements Command {
    private final Account source, destination;
    private final BigDecimal amount;

    public void execute() {
        source.debit(amount);
        destination.credit(amount);
    }

    public void undo() {
        destination.debit(amount);
        source.credit(amount);
    }
}

class TransactionQueue {
    private final Deque<Command> history = new ArrayDeque<>();

    public void execute(Command cmd) {
        cmd.execute();
        history.push(cmd);
    }

    public void undoLast() {
        if (!history.isEmpty()) history.pop().undo();
    }
}
```

Transactional undo, audit logging, and retry logic all become structurally straightforward.

**Ubiquitous in:** undo/redo systems, database transaction logs, message queues, Spring Batch steps.


## The Patterns You Already Use Without Knowing It

| Framework / Tool | Pattern in Use |
|---|---|
| Spring `@Bean` with default scope | Singleton |
| Spring `BeanFactory`, `ApplicationContext` | Factory Method |
| Spring `@Transactional`, `@Cacheable` | Decorator (via AOP proxy) |
| Spring `ApplicationEventPublisher` | Observer |
| Spring Security `AuthenticationProvider` chain | Chain of Responsibility |
| Java `BufferedReader(new FileReader(...))` | Decorator |
| JDBC `DriverManager` | Factory Method + Adapter |
| `Comparator.comparing().thenComparing()` | Strategy + Decorator chain |
| React `useState` change notifications | Observer |
| Kafka consumer groups | Observer |
| REST API gateway | Facade |

Patterns aren't academic. They're the structural vocabulary of every serious codebase. You're reading them in the tools you use daily — you just haven't had the names.


## Beyond the GoF: Modern Equivalents

The GoF wrote in the context of mid-90s object-oriented systems. The vocabulary has expanded, but the underlying logic is identical.

| Modern Context | Pattern | GoF Ancestor |
|---|---|---|
| Microservices | API Gateway | Facade |
| Resilience engineering | Circuit Breaker | Proxy / State |
| Event sourcing | Event Store | Command + Memento |
| ML orchestration | Stage processor | Chain of Responsibility |
| Feature flag systems | A/B selector | Strategy |
| Sidecar containers | Transparent extension | Decorator |

The names change. The problems they solve — controlling dependencies, separating concerns, enabling extension without modification — are timeless.


## How to Actually Develop Pattern Intuition

Memorising the 23 patterns doesn't make you a better engineer. Recognising the problems they solve does. A practical heuristic for each family:

**Creational:** Ask this when you're about to write `new SomeClass()` in the middle of a service method — *Do I need to be the one deciding which class gets created? Or should that decision live somewhere else?*

**Structural:** Ask this when a class is getting long and tangled — *Is this class doing something, or is it managing the wiring between things that should be doing something?* If it's mostly wiring, a structural pattern will clean it up.

**Behavioral:** Ask this when you find yourself writing notification code, conditional algorithm selection, or multi-step orchestration — *Who owns this logic, and what changes if I need to add a new case?* If the answer involves touching multiple existing classes, a behavioral pattern is missing.


## Final Thought

The best sign that you've genuinely understood a design pattern isn't that you can implement it from scratch. It's that you can look at a codebase you've never seen and immediately recognise the structure — and more importantly, recognise the absence of structure where a pattern should have been applied.

That recognition is what separates engineers who write features from engineers who shape systems.

Design patterns are not about adding ceremony. They're about uncovering structure that was always there, hidden beneath the code. They turn disconnected logic into cohesive architecture.

So next time you sit down to design something, pause and ask: *Am I solving the problem in front of me — or designing for the one that will come next?*

That is the purpose of learning design patterns.


### Quick Reference

| Category | Common Patterns | Core Intent |
|---|---|---|
| Creational | Factory, Builder, Singleton | Control object creation and lifecycle |
| Structural | Adapter, Facade, Decorator | Compose or extend class structures |
| Behavioral | Observer, Strategy, Command | Manage communication and control flow |