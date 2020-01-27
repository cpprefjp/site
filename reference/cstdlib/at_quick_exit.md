# at_quick_exit
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  extern "C"   int at_quick_exit(void (*f)(void)) noexcept; // (1)
  extern "C++" int at_quick_exit(void (*f)(void)) noexcept; // (2)
}
```

## 概要
[`quick_exit`](quick_exit.md)関数でプ�グラムが終了するときに呼ばれる関数を登録する。


## 効果
この関数に指定した関数は、[`std::quick_exit()`](quick_exit.md)関数が呼び出された際に呼び出される。

指定された関数の�で例外が送出された場合、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プ�グラムが異常終了する。


## 戻り値
関数の登録に成功した場合は`0`が返り、失敗した場合は非`0`が返る。


## 備考
この関数では、複数の関数を登録できる。

登録できる上限数は実装定義だが、32個以上は登録できることが実装に要求される。


## 例
```cpp example
#include <iostream>
#include <cstdlib>

void on_exit()
{
  std::cout << "on exit" << std::endl;
}

int main()
{
  std::at_quick_exit(on_exit);
  std::quick_exit(0);
}
```
* std::at_quick_exit[color ff0000]
* std::quick_exit[link quick_exit.md]

### 出力
```
on exit
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.8
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照
- [N2440 Abandoning a Process](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2440.htm)

