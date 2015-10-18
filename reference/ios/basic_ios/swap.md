#swap
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
protected:
  void swap(basic_ios& rhs) noexcept;
```
* basic_ios[link ../basic_ios.md]


##概要
ストリームオブジェクトを交換する。


##効果
`*this` の状態と、本関数が呼びだされる前の引数 `rhs` の状態を交換する。ただし、[`rdbuf`](rdbuf.md)`()` と `rhs.`[`rdbuf`](rdbuf.md)`()` は呼び出し前と変わらない。


##戻り値
無し


##例外
投げない


##バージョン
###言語
- C++11


##参照
- [`basic_ios`](../basic_ios.md)`::`[`move`](swap.md)
