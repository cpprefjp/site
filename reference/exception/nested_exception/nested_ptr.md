# nested_ptr
* exception[meta header]
* std[meta namespace]
* nested_exception[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
exception_ptr nested_ptr() const noexcept;
```
* exception_ptr[link /reference/exception/exception_ptr.md]

## 概要
入れ�になった例外へのポインタを取得する


## 戻り値
メンバとして保持している、入れ�になった例外へのポインタを返す。


## 例外
投げない


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
      std::rethrow_exception(e.nested_ptr());
    }
  }
  catch (int& x) {
    std::cout << "3rd caught: " << x << std::endl;
  }
}
```
* nested_ptr()[color ff0000]
* std::rethrow_exception[link /reference/exception/rethrow_exception.md]

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


