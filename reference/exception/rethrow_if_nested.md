# rethrow_if_nested
* exception[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class E>
  void rethrow_if_nested(const E& e);
}
```

## 概要
入れ�になった例外が�在する場合に、入れ�になった例外を送出する



## 効果
型`E`が[`nested_exception`](/reference/exception/nested_exception.md)を継承した型だった場合、以下の処理を行う：

```cpp
dynamic_cast<const nested_exception&>(e).rethrow_nested()
```
* nested_exception[link nested_exception.md]
* rethrow_nested()[link nested_exception/rethrow_nested.md]

そうでなければ何もしない。


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <exception>
#include <memory>

struct inner_error : public std::exception {};
struct outer_error : public std::nested_exception {};

// 現在の例外を取得
template <class T>
std::shared_ptr<T> get_exception(std::exception_ptr ep)
{
  try {
    std::rethrow_exception(ep);
  }
  catch (T& e) {
    return std::shared_ptr<T>(new T(e));
  }
  catch (...) {}
  return nullptr;
}

// 入れ�になってる例外を取得
template <class T>
std::shared_ptr<T> get_nested_exception(std::nested_exception& ex)
{
  try {
    std::rethrow_if_nested(ex); // 入れ�になってる例外を送出
  }
  catch (T& e) {
    return std::shared_ptr<T>(new T(e));
  }
  catch (...) {}
  return nullptr;
}

int main()
{
  try {
    try {
      throw inner_error();
    }
    catch (...) {
      // inner_errorを入れ�にしてouter_errorを送出
      std::throw_with_nested(outer_error());
    }
  }
  catch (...) {
    // 外側の例外を取得
    if (std::shared_ptr<outer_error> outer = get_exception<outer_error>(std::current_exception())) {
      std::cout << "outer" << std::endl;

      // 入れ�になった例外を取得
      if (std::shared_ptr<inner_error> inner = get_nested_exception<inner_error>(*outer)) {
        std::cout << "inner" << std::endl;
      }
    }
  }
}
```
* std::rethrow_if_nested[color ff0000]
* std::exception[link exception.md]
* std::nested_exception[link nested_exception.md]
* std::exception_ptr[link exception_ptr.md]
* std::throw_with_nested[link throw_with_nested.md]
* std::current_exception()[link current_exception.md]

### 出力
```
outer
inner
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


