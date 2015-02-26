#operator() (C++11)
* memory[meta header]
* std[meta namespace]

```cpp
// shared_ptr版
bool operator()(const shared_ptr<T>& a, const shared_ptr<T>& b) const;
bool operator()(const shared_ptr<T>& a, const weak_ptr<T>& b) const;
bool operator()(const weak_ptr<T>& a, const shared_ptr<T>& b) const;

// weak_ptr版
bool operator()(const weak_ptr<T>& a, const weak_ptr<T>& b) const;
bool operator()(const shared_ptr<T>& a, const weak_ptr<T>& b) const;
bool operator()(const weak_ptr<T>& a, const shared_ptr<T>& b) const;
```
* shared_ptr[link /reference/memory/shared_ptr.md]
* weak_ptr[link /reference/memory/weak_ptr.md]

##概要
所有権ベースでの小なり比較を行う。


##戻り値
`a.owner_before(b)`


##バージョン
###言語
- C++11

##参照
- [`shared_ptr::owner_before()`](/reference/memory/shared_ptr/owner_before.md)

