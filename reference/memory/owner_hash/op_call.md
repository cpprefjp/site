# operator()
* memory[meta header]
* std[meta namespace]
* owner_hash[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class T>
size_t operator()(const shared_ptr<T>& key) const noexcept; // (1) C++26

template <class T>
size_t operator()(const weak_ptr<T>& key) const noexcept;   // (2) C++26
```
* shared_ptr[link /reference/memory/shared_ptr.md]
* weak_ptr[link /reference/memory/weak_ptr.md]

## 概要
所有権ベースでのハッシュ値を取得する。


## 戻り値
```cpp
return key.owner_hash();
```
* owner_hash[link /reference/memory/shared_ptr/owner_hash.md]


## バージョン
### 言語
- C++26


## 関連項目
- [`std::shared_ptr::owner_hash()`](/reference/memory/shared_ptr/owner_hash.md)
- [`std::weak_ptr::owner_hash()`](/reference/memory/weak_ptr/owner_hash.md)


## 参照
- [P1901R2 Enabling the Use of `weak_ptr` as Keys in Unordered Associative Containers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1901r2.html)
