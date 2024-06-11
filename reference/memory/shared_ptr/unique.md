# unique
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

```cpp
bool unique() const noexcept;
```

この関数は、C++17から非推奨となり、C++20で削除された。代わりに[`use_count()`](use_count.md)関数を使用すること。

## 概要
同じ所有権を共有する他のユーザーが存在しないかを判定する。


## 戻り値

```cpp
use_count() == 1
```
* use_count()[link use_count.md]


## 備考
この関数は、[`use_count()`](use_count.md)を使用するよりも高速である可能性がある。


## 非推奨・削除の詳細
所有権を持つユーザー数を複数スレッドの状況で取得した場合、その値は参考程度にしかならない。そのため、[`use_count()`](use_count.md)は参考値として使用できるが、この関数は厳密な値を要求してしまう。そのために、複数スレッドで危険なこの関数は非推奨とし、[`use_count()`](use_count.md)を推奨する。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  // 所有権を持つユーザーが1人
  if (p.unique()) {
    std::cout << "unique" << std::endl;
  }

  // 所有権を持つユーザーが2人
  std::shared_ptr<int> q = p;
  if (!p.unique()) {
    std::cout << "non unique" << std::endl;
  }
}
```
* unique()[color ff0000]

### 出力
```
unique
non unique
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
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
