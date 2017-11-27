# unique
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]

```cpp
bool unique() const noexcept;
```

この関数は、C++17から非推奨となった。代わりに[`use_count()`](use_count.md)関数を使用すること。

## 概要
有効なリソースを所有しているかを判定する。


## 戻り値

```cpp
use_count() == 1
```
* get()[link get.md]


## 備考
この関数は、[`use_count()`](use_count.md)を使用するよりも高速である可能性がある。


## 非推奨の詳細
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
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0


## 参照
- [P0521R0 Proposed Resolution for CA 14 (`shared_ptr` `use_count`/`unique`)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0521r0.html)
