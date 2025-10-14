# use_count
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
long
  use_count() const noexcept; // (1) C++11
constexpr long
  use_count() const noexcept; // (1) C++26
```

## 概要
所有権を持つユーザー数を取得する。


## 戻り値
`*this`が持つリソースを共有している`shared_ptr`のオブジェクト数を返す。

`0`が返る場合、`*this`は空の状態となる。


## 同期操作
しない


## 備考
複数スレッドが`use_count()`の戻り値に影響を与える場合、その戻り値は、おおよその値として扱われるべきである。この関数はスレッド間での同期をしないため、正確な値を求めてはならない。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));
  std::shared_ptr<int> q = p;

  long count = p.use_count();
  std::cout << count << std::endl;
}
```
* use_count()[color ff0000]

### 出力
```
2
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P0521R0 Proposed Resolution for CA 14 (`shared_ptr` `use_count`/`unique`)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0521r0.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)