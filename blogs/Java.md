# Java Revision

## 1. Object-Oriented Programming (OOP) in Java

### Encapsulation
Encapsulation means hiding the internal details of a class and exposing only what is necessary. In Java, we achieve this by declaring class variables as private and providing public methods (getters and setters) to access and modify them.

```java
public class BankAccount {
    private double balance; // Private field
    
    public void setBalance(double balance) {
        if (balance >= 0) { // Validation
            this.balance = balance;
        }
    }
    
    public double getBalance() {
        return balance;
    }
}
```

**Impact:** In large applications, direct field access would lead to inconsistent states. Encapsulation makes classes more maintainable, secure, and loosely coupled, which is crucial in frameworks like Spring or Hibernate.

### Inheritance
Inheritance allows a class (child/subclass) to reuse properties and behaviors of another class (parent/superclass). Java supports single inheritance (a class can extend only one class), but multiple inheritance is achieved through interfaces.

```java
class Vehicle {
    protected String brand;
    protected int speed;
}

class Car extends Vehicle {
    private int doors;
    
    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Speed: " + speed);
    }
}
```

**Enterprise Context:** In frameworks, base classes often provide template methods or default functionality (e.g., HttpServlet in Servlets). You extend these and override only what you need, reducing boilerplate code.

### Polymorphism
Polymorphism means one interface, many implementations.

- **Compile-time (Overloading):** Multiple methods in the same class with the same name but different parameter lists.
- **Runtime (Overriding):** A child class provides its own implementation of a method that exists in the parent class.

```java
class Payment {
    void pay() { System.out.println("Generic Payment"); }
    void pay(double amount) { System.out.println("Payment: " + amount); } // Overloading
}

class UpiPayment extends Payment {
    @Override
    void pay() { System.out.println("Paid via UPI"); } // Overriding
}
```

**Framework Foundation:** This is the backbone of dependency injection and interface-driven design. You code to an interface (contract), not an implementation. Spring can inject any Payment implementation without changing client code.

### Abstraction
Abstraction is about hiding implementation details and showing only essential features. Achieved via abstract classes (can have partial implementation) and interfaces (pure contracts).

```java
abstract class Database {
    abstract void connect();
    
    void log() { // Concrete method
        System.out.println("Logging database operation");
    }
}

interface PaymentProcessor {
    void processPayment(double amount);
    default void sendReceipt() { // Default method (Java 8+)
        System.out.println("Receipt sent");
    }
}
```

**Architecture Benefit:** Abstraction allows frameworks to be extensible. JDBC uses abstraction — you work with Connection, Statement, and ResultSet interfaces without worrying about which actual database driver is used.

## 2. Collections Framework

The Java Collections Framework provides ready-made data structures and algorithms to store, retrieve, and manipulate groups of objects. It's Java's toolbox for handling dynamic data.

### Core Interfaces

#### Collection Interface (root of the hierarchy)
- **List** → Ordered, allows duplicates (ArrayList, LinkedList, Vector)
- **Set** → No duplicates, unordered or ordered (HashSet, LinkedHashSet, TreeSet)
- **Queue** → Elements processed in specific order - FIFO/LIFO (PriorityQueue, ArrayDeque)

#### Map Interface (key-value pairs, not part of Collection)
- HashMap, LinkedHashMap, TreeMap, Hashtable

### Performance Trade-offs
- **ArrayList** → fast random access, slower insertions in middle
- **LinkedList** → fast insert/delete, slower random access
- **HashMap** → average O(1) lookup, but unordered
- **TreeMap** → ordered keys, but slower O(log n)

```java
import java.util.*;

// Basic usage
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");

Set<String> set = new HashSet<>(list);
Map<Integer, String> map = new HashMap<>();
map.put(1, "First");

// Iteration
for (String item : list) {
    System.out.println(item);
}

// Stream API (Java 8+)
list.stream()
    .filter(s -> s.startsWith("J"))
    .forEach(System.out::println);
```

**Performance & Scale:**
- **Efficiency:** Built-in optimized data structures
- **Flexibility:** Different behaviors (ordering, uniqueness, priority)
- **Scalability:** Handle millions of records with hashing & tree-based structures
- **Thread safety:** ConcurrentHashMap for multi-threaded applications

## 3. Exception Handling

Java uses exceptions to handle runtime errors gracefully without crashing programs. Exceptions are objects that represent an error condition.

### Types of Exceptions
- **Checked exceptions** (compile-time checked) → must be handled (IOException, SQLException)
- **Unchecked exceptions** (runtime) → don't require explicit handling (NullPointerException, IndexOutOfBoundsException)
- **Errors** (serious issues) → usually not recoverable (OutOfMemoryError)

```java
try {
    int result = 10 / 0;
    FileReader file = new FileReader("nonexistent.txt");
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
} catch (FileNotFoundException e) {
    System.out.println("File not found: " + e.getMessage());
} finally {
    System.out.println("This block always runs");
}

// Custom exception
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}
```

**Production Ready:**
- **Robustness:** Prevents application crashes
- **Readability:** Clean separation of logic and error handling
- **Graceful recovery:** Apps can continue running even if a part fails
- **Enterprise applications:** Spring provides @ControllerAdvice for global exception handling

## 4. Multithreading & Concurrency

Multithreading means running multiple threads (lightweight processes) concurrently within a program. Java was built for multithreading from the start.

### Key Concepts
- **Thread lifecycle:** New → Runnable → Running → Waiting/Blocked → Terminated
- **Thread creation:** Extend Thread or implement Runnable
- **Synchronization:** Ensures thread safety when multiple threads access shared data
- **Executors & Thread Pools:** High-level concurrency APIs for managing tasks efficiently

```java
// Creating threads
class Worker implements Runnable {
    public void run() {
        System.out.println(Thread.currentThread().getName() + " is working");
    }
}

Thread t1 = new Thread(new Worker(), "Thread-1");
t1.start();

// Synchronization
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
}

// Executor Framework
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(new Worker());
executor.shutdown();

// CompletableFuture (Asynchronous programming)
CompletableFuture.supplyAsync(() -> fetchData())
                 .thenApply(data -> process(data))
                 .thenAccept(result -> System.out.println(result));
```

**High-Performance Systems:**
- Improves performance (parallelism on multi-core CPUs)
- Enables responsive applications (UI doesn't freeze)
- Used in servers, simulations, and financial apps handling multiple requests
- Essential for scalable systems handling thousands of requests

## 5. Java I/O (Input/Output)

Java provides APIs for reading/writing files, console, and network streams.

### Stream Types
- **Byte streams** (InputStream, OutputStream) → handle binary data
- **Character streams** (Reader, Writer) → handle text data

```java
import java.io.*;

// File writing
FileWriter writer = new FileWriter("example.txt");
writer.write("Hello, Java I/O!");
writer.close();

// File reading
FileReader reader = new FileReader("example.txt");
BufferedReader bufferedReader = new BufferedReader(reader);
String line = bufferedReader.readLine();
bufferedReader.close();

// Try-with-resources (Java 7+)
try (FileWriter fw = new FileWriter("file.txt")) {
    fw.write("Auto-closeable");
} catch (IOException e) {
    e.printStackTrace();
}

// Serialization
class Person implements Serializable {
    private String name;
    private int age;
}

ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"));
oos.writeObject(new Person());
```

**Universal Necessity:**
- File handling is core to almost every application (logs, configs, reports)
- Network programming (sockets, HTTP communication) builds on I/O streams
- Enables serialization (saving objects as bytes to disk or sending across network)

## 6. JVM Internals (Memory Model)

The Java Virtual Machine (JVM) executes Java bytecode and manages memory automatically using Garbage Collection (GC).

### JVM Memory Areas
- **Heap** → Stores objects (shared across threads)
- **Stack** → Stores method calls & local variables (per thread)
- **Method Area** → Stores class metadata, static fields, constants
- **PC Register & Native Stack** → Tracks execution & native calls

### Garbage Collection
- **Serial GC:** Single-threaded, suitable for small applications
- **Parallel GC:** Multi-threaded, default for server applications
- **G1 GC:** Low-latency collector for large heaps
- **ZGC:** Ultra-low latency collector

```bash
# JVM Tuning parameters
java -Xmx2g -Xms1g -XX:+UseG1GC MyApp
```

**Performance Optimization:**
- Helps avoid memory leaks and optimize performance
- Understanding GC tuning is crucial for enterprise systems
- Debugging issues like OutOfMemoryError or StackOverflowError requires JVM knowledge

## 7. JDBC (Java Database Connectivity)

A standard API that lets Java applications interact with relational databases (e.g., MySQL, PostgreSQL, Oracle).

```java
// Basic JDBC operations
String url = "jdbc:mysql://localhost:3306/mydb";
Connection conn = DriverManager.getConnection(url, user, pass);

// Prepared Statement (prevents SQL injection)
PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id=?");
ps.setInt(1, 5);
ResultSet rs = ps.executeQuery();

while (rs.next()) {
    System.out.println(rs.getString("name"));
}

// Transaction management
conn.setAutoCommit(false);
try {
    // Execute multiple statements
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
}
```

**Data Persistence Foundation:**
- Acts as the foundation of ORM frameworks like Hibernate, JPA, Spring Data
- Enables persistence (storing/retrieving objects in/from databases)
- Essential for enterprise applications dealing with data

## 8. Servlets & JSP (Web Layer Basics)

### Servlets
Java classes that handle HTTP requests/responses. Run inside a servlet container (Tomcat, Jetty).

```java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Process login logic
        response.getWriter().println("Welcome " + username);
    }
}
```

### JSP (JavaServer Pages)
A templating technology that mixes HTML with embedded Java code.

```jsp
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<body>
    <h1>User List</h1>
    <% 
        List<String> users = (List<String>) request.getAttribute("users");
        for (String user : users) {
    %>
        <p><%= user %></p>
    <% } %>
</body>
</html>
```

**Web Development Core:**
- Servlets + JSP = base for building MVC frameworks like Spring MVC, Struts
- They give control over request handling, session management, and response formatting

## 9. Spring Framework

A powerful framework that provides Dependency Injection (DI) and AOP (Aspect-Oriented Programming).

### Core Concepts
- **IoC (Inversion of Control):** Instead of creating objects manually, Spring manages their lifecycle
- **DI:** Classes declare dependencies, and Spring injects them at runtime

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public User findById(Long id) {
        return userRepository.findById(id);
    }
}

@Repository
public class UserRepository {
    // Database operations
}

// Configuration
@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
    
    @Bean
    public DataSource dataSource() {
        // Configure DataSource
        return new HikariDataSource();
    }
}

// Spring Boot Application
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### Spring Modules
- **Spring MVC:** Web framework
- **Spring Data:** Database operations
- **Spring Security:** Authentication and authorization
- **Spring Boot:** Auto-configuration and rapid development

**Developer Productivity:**
- Reduces boilerplate code
- Promotes loosely coupled, testable applications
- Industry standard for enterprise development

## 10. Hibernate (ORM)

An Object-Relational Mapping (ORM) tool that maps Java classes to database tables.

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false)
    private String username;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;
    
    // Constructors, getters, setters
}

// Repository operations
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

User user = new User();
user.setUsername("john_doe");
session.save(user);

tx.commit();
session.close();

// HQL Query
Query<User> query = session.createQuery("FROM User WHERE username = :username", User.class);
query.setParameter("username", "john_doe");
List<User> users = query.list();
```

**Development Efficiency:**
- Eliminates manual SQL writing (uses HQL/JPQL)
- Handles caching, lazy loading, transaction management
- Abstracts database differences
- Works well with Spring (via JPA)

## 11. RESTful Services & Microservices

### REST (Representational State Transfer)
Architectural style using HTTP methods (GET, POST, PUT, DELETE). Resources are exposed as URLs.

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.update(id, user);
        return ResponseEntity.ok(updatedUser);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Microservices
Breaking applications into small, independently deployable services. Each service handles one business capability.

```java
// Service Discovery with Eureka
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

// Microservice client
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    
    @LoadBalanced
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

**Modern Architecture:**
- Scalability, independent deployment, easier maintenance
- Spring Boot + Spring Cloud = perfect combo for microservices
- Fault isolation and technology diversity

## 12. Messaging & Distributed Systems

### JMS (Java Message Service)
Standard API for message-oriented middleware.

```java
@Component
public class MessageProducer {
    
    @Autowired
    private JmsTemplate jmsTemplate;
    
    public void sendMessage(String destination, String message) {
        jmsTemplate.convertAndSend(destination, message);
    }
}

@JmsListener(destination = "order.queue")
public void receiveMessage(String message) {
    System.out.println("Received: " + message);
    // Process message
}
```

### Apache Kafka
```java
// Producer
@Service
public class OrderEventProducer {
    
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;
    
    public void publishOrderEvent(OrderEvent event) {
        kafkaTemplate.send("order-events", event);
    }
}

// Consumer
@KafkaListener(topics = "order-events")
public void handleOrderEvent(OrderEvent event) {
    // Process event
    System.out.println("Processing order: " + event.getOrderId());
}
```

**Distributed Communication:**
- Enables asynchronous, decoupled communication between services
- Essential for microservices, streaming, and real-time analytics
- Improves system resilience and scalability

## 13. Security in Advanced Java

### Spring Security
Provides authentication (who are you?) and authorization (what can you do?).

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2Login()
            .jwt();
        return http.build();
    }
}

// Method-level security
@PreAuthorize("hasRole('ADMIN') or #username == authentication.name")
public void updateUser(@Param("username") String username, User user) {
    // Update user logic
}
```

### JWT (JSON Web Tokens)
```java
@Component
public class JwtUtil {
    
    private String secret = "mySecret";
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}
```

**Enterprise Security:**
- Enterprise apps must safeguard data, users, and compliance requirements
- JWT enables stateless authentication in REST APIs
- Spring Security provides comprehensive security framework

## 14. Advanced Concurrency Patterns

### Fork/Join Framework
Splits tasks into smaller subtasks and merges results.

```java
public class SumTask extends RecursiveTask<Long> {
    private final int[] array;
    private final int start, end;
    private static final int THRESHOLD = 1000;
    
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            return computeDirectly();
        } else {
            int mid = (start + end) / 2;
            SumTask leftTask = new SumTask(array, start, mid);
            SumTask rightTask = new SumTask(array, mid, end);
            
            leftTask.fork();
            long rightResult = rightTask.compute();
            long leftResult = leftTask.join();
            
            return leftResult + rightResult;
        }
    }
}

ForkJoinPool pool = new ForkJoinPool();
SumTask task = new SumTask(array, 0, array.length);
Long result = pool.invoke(task);
```

### Reactive Programming
```java
// Using Project Reactor
Flux<String> dataStream = Flux.just("A", "B", "C")
    .map(String::toLowerCase)
    .filter(s -> !s.equals("b"))
    .subscribe(System.out::println);

// Spring WebFlux
@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> streamData() {
    return Flux.interval(Duration.ofSeconds(1))
               .map(sequence -> "Data " + sequence);
}
```

**Scalable Systems:**
- Critical for scalable systems handling thousands of requests
- Basis for reactive programming (Spring WebFlux, RxJava)
- Enables non-blocking, asynchronous operations

## Key Takeaways for Java Mastery

1. **Strong OOP Foundation:** Master encapsulation, inheritance, polymorphism, and abstraction as they're fundamental to all advanced concepts.

2. **Collections Expertise:** Choose the right data structure for performance-critical applications.

3. **Exception Handling:** Build robust applications that handle errors gracefully.

4. **Concurrency Skills:** Essential for scalable, high-performance applications.

5. **Framework Knowledge:** Spring and Hibernate are industry standards for enterprise development.

6. **Database Integration:** JDBC, JPA, and ORM concepts are crucial for data-driven applications.

7. **Web Services:** REST APIs and microservices architecture for modern distributed systems.

8. **Security Awareness:** Authentication, authorization, and secure coding practices.

9. **JVM Understanding:** Performance tuning and memory management for production systems.

10. **Modern Java Features:** Stay updated with latest Java versions (Streams, Lambda, Modules, Records, etc.).