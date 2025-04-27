# contract_violation
* contracts[meta header]
* std::contracts[meta namespace]
* class[meta id-type]

```cpp
namespace std::contracts {
  class contract_violation {
  public:
    const char* comment() const noexcept;
    contracts::detection_mode detection_mode() const noexcept;
    exception_ptr evaluation_exception() const noexcept;
    bool is_terminating() const noexcept;
    assertion_kind kind() const noexcept;
    source_location location() const noexcept;
    evaluation_semantic sematic() const noexcept;
  }
}
```
