# operator()
* memory[meta header]
* std[meta namespace]
* owner_less[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// shared_ptr特殊化版
bool operator()(const shared_ptr<T>& a, const shared_ptr<T>& b) const;          // (1) C++11
bool operator()(const shared_ptr<T>& a, const shared_ptr<T>& b) const noexcept; // (1) C++17

bool operator()(const shared_ptr<T>& a, const weak_ptr<T>& b) const;            // (2) C++11
bool operator()(const shared_ptr<T>& a, const weak_ptr<T>& b) const noexcept;   // (2) C++17

bool operator()(const weak_ptr<T>& a, const shared_ptr<T>& b) const;            // (3) C++11
bool operator()(const weak_ptr<T>& a, const shared_ptr<T>& b) const noexcept;   // (3) C++17

// weak_ptr特殊化版
bool operator()(const weak_ptr<T>& a, const weak_ptr<T>& b) const;              // (4) C++11
bool operator()(const weak_ptr<T>& a, const weak_ptr<T>& b) const noexcept;     // (4) C++17

bool operator()(const shared_ptr<T>& a, const weak_ptr<T>& b) const;            // (5) C++11
bool operator()(const shared_ptr<T>& a, const weak_ptr<T>& b) const noexcept;   // (5) C++17

bool operator()(const weak_ptr<T>& a, const shared_ptr<T>& b) const;            // (6) C++11
bool operator()(const weak_ptr<T>& a, const shared_ptr<T>& b) const noexcept;   // (6) C++17

// void特殊化版
template<class T, class U>
bool operator()(const shared_ptr<T>&, const shared_ptr<U>&) const noexcept;     // (7) C++17

template<class T, class U>
bool operator()(const shared_ptr<T>&, const weak_ptr<U>&) const noexcept;       // (8) C++17

template<class T, class U>
bool operator()(const weak_ptr<T>&, const shared_ptr<U>&) const noexcept;       // (9) C++17

template<class T, class U>
bool operator()(const weak_ptr<T>&, const weak_ptr<U>&) const noexcept;         // (10) C++17
```
* shared_ptr[link /reference/memory/shared_ptr.md]
* weak_ptr[link /reference/memory/weak_ptr.md]

## 概要
所有権ベースでの小なり比較を行う。


## 戻り値
```cpp
a.owner_before(b)
```
* owner_before[link /reference/memory/shared_ptr/owner_before.md]


## バージョン
### 言語
- C++11


## 関連項目
- [`shared_ptr::owner_before()`](/reference/memory/shared_ptr/owner_before.md)


## 参照
- [LWG Issue 2873. Add `noexcept` to several `shared_ptr` related functions](https://wg21.cmeerw.net/lwg/issue2873)
- [P0074R0 Making `std::owner_less` more flexible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0074r0.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)
- [LWG Issue 4557. Remove `constexpr` from `owner_less` and `owner_before`](https://cplusplus.github.io/LWG/issue4557)
    - C++26で、P3037R6により一旦付与された`constexpr`指定が取り消され、`owner_before`と`owner_less`の`operator()`は`constexpr`ではなくなった
