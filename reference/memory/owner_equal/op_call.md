# operator()
* memory[meta header]
* std[meta namespace]
* owner_equal[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class T, class U>
constexpr bool operator()(const shared_ptr<T>& a,
                          const shared_ptr<U>& b) const noexcept; // (1) C++26

template <class T, class U>
constexpr bool operator()(const shared_ptr<T>& a,
                          const weak_ptr<U>& b) const noexcept;   // (2) C++26

template <class T, class U>
constexpr bool operator()(const weak_ptr<T>& a,
                          const shared_ptr<U>& b) const noexcept; // (3) C++26

template <class T, class U>
constexpr bool operator()(const weak_ptr<T>& a,
                          const weak_ptr<U>& b) const noexcept;  // (4) C++26
```
* shared_ptr[link /reference/memory/shared_ptr.md]
* weak_ptr[link /reference/memory/weak_ptr.md]

## 概要
所有権ベースでの等値比較を行う。


## 戻り値
```cpp
return a.owner_equal(b);
```
* owner_equal[link /reference/memory/shared_ptr/owner_equal.md]


## バージョン
### 言語
- C++26


## 関連項目
- [`std::shared_ptr::owner_equal()`](/reference/memory/shared_ptr/owner_equal.md)
- [`std::weak_ptr::owner_equal()`](/reference/memory/weak_ptr/owner_equal.md)


## 参照
- [P1901R2 Enabling the Use of `weak_ptr` as Keys in Unordered Associative Containers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1901r2.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)
