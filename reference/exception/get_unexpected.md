# get_unexpected
* exception[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* cpp11deprecated[meta cpp]
* cpp17removed[meta cpp]

```cpp
namespace std {
  using unexpected_handler = void(*)();
  unexpected_handler get_unexpected() noexcept;
}
```

この関数はC++11から非推奨となり、C++17で削除された。`throw`キーワードの代わりに使用する[`noexcept`キーワード](/lang/cpp11/noexcept.md)では、指定外の例外が発生することによるエラーは起こらない。

## 概要
予想外の例外が発生した場合の処理を行う関数を取得する。


## 戻り値
予想外の例外が発生した場合の処理を行う関数へのポインタ。
(デフォルトではおそらくヌルになる)


## 例
```cpp example
#include <iostream>
#include <stdexcept>

void on_expected()
{
  std::cout << "on expected" << std::endl;
}

int main()
{
  std::unexpected_handler handler1 = std::get_unexpected();
  if (!handler1) {
    std::cout << "null handler" << std::endl;
  }

  std::set_unexpected(on_expected);
  std::unexpected_handler handler2 = std::get_unexpected();
  if (handler2) {
    handler2();
  }
}
```
* std::get_unexpected()[color ff0000]
* std::set_unexpected[link set_unexpected.md]

### 出力
```
on expected
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [C++17 非推奨だった古い例外仕様を削除](/lang/cpp17/remove_deprecated_exception_specifications.md)
