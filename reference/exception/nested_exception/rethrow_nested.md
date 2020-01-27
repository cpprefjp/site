# rethrow_nested
* exception[meta header]
* std[meta namespace]
* nested_exception[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
[[noreturn]] void rethrow_nested() const;
```

## 概要
入れ�になった例外を送出する


## 効果
[`nested_ptr()`](/reference/exception/nested_exception/nested_ptr.md)メンバ関数`がヌルポインタを返した場合、`std::terminate()を呼び出してプ�グラムを終了させる。そうでなければ、[`nested_ptr()`](/reference/exception/nested_exception/nested_ptr.md)によって返された例外を送出する。


## 戻り値
この関数は決して返らない


## 例外
入れ�になった例外を送出する


## 例
```cpp example
#include <exception>
#include <iostream>

class my_exception : public std::nested_exception {};

int main()
{
  try {
    try {
      try {
        throw 1; // int値を送出
      }
      catch (int& x) {
        std::cout << "1st caught: " << x << std::endl;
        throw my_exception(); // 現在の例外(int)を入れ�にしてmy_exceptionを送出
      }
    }
    catch (my_exception& e) {
      std::cout << "2nd caught: my_exception(nested_exception)." << std::endl;
      // 入れ�になっている例外(int)を送出
      e.rethrow_nested();
    }
  }
  catch (int& x) {
    std::cout << "3rd caught: " << x << std::endl;
  }
}
```
* rethrow_nested()[color ff0000]

### 出力
```
1st caught: 1
2nd caught: my_exception(nested_exception).
3rd caught: 1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照


