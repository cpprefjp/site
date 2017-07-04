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
