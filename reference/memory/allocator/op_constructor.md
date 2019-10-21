# コンストラクタ
* memory[meta header]
* std[meta namespace]
* allocator[meta class]
* function[meta id-type]

```cpp
allocator() throw();                                    // (1) C++03 まで
allocator() noexcept;                                   // (1) C++11 から C++17 まで
constexpr allocator() noexcept;                         // (1) C++20 から

allocator(const allocator&) throw();                    // (2) C++03 まで
allocator(const allocator&) noexcept;                   // (2) C++11 から C++17 まで
constexpr allocator(const allocator&) noexcept;         // (2) C++20 から

template <class U>
allocator(const allocator<U>&) throw();                 // (3) C++03 まで

template <class U>
allocator(const allocator<U>&) noexcept;                // (3) C++11 から C++17 まで

template <class U>
constexpr allocator(const allocator<U>&) noexcept;      // (3) C++20 から
```

## 概要
`allocator`オブジェクトを構築する。


## 例外
投げない。


## 例
```cpp example
#include <memory>

int main()
{
  std::allocator<int> alloc;
}
```

### 出力
```
```


## 参照
- [LWG3035 std::allocator's constructors should be constexpr](https://wg21.cmeerw.net/lwg/issue3035)
