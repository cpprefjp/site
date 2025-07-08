# operator==
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::iterator[meta class]
* cpp23[meta cpp]

```cpp
friend bool operator==(const iterator& i, default_sentinel_t);

// operator==により、以下の演算子が使用可能になる
friend bool operator!=(const iterator& i, default_sentinel_t);
```

## 概要
ジェネレータコルーチンのイテレータが終端まで到達したか否かを判定する。


## 効果
以下と等価

```cpp
return i.coroutine_.done();
```
* done()[link /reference/coroutine/coroutine_handle/done.md]


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`generator::end()`](../end.md)
