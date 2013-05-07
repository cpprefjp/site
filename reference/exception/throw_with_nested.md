#throw_with_nested
```cpp
namespace std {
  [[noreturn]] template <class T>
  void throw_with_nested(T&& t);
}
```

##概要
現在処理中の例外を入れ子にした例外を送出する


##要件
型`T`がコピーコンストラクト可能であること。


##戻り値
この関数は決して返らない


##例
```cpp
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

// 入れ子になってる例外を取得
template <class T>
std::shared_ptr<T> get_nested_exception(std::nested_exception& ex)
{
  try {
    std::rethrow_if_nested(ex); // 入れ子になってる例外を送出
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
      // inner_errorを入れ子にしてouter_errorを送出
      std::throw_with_nested(outer_error());
    }
  }
  catch (...) {
    // 外側の例外を取得
    if (std::shared_ptr<outer_error> outer = get_exception<outer_error>(std::current_exception())) {
      std::cout << "outer" << std::endl;

      // 入れ子になった例外を取得
      if (std::shared_ptr<inner_error> inner = get_nested_exception<inner_error>(*outer)) {
        std::cout << "inner" << std::endl;
      }
    }
  }
}
```
* nested_exception[color ff0000]
* rethrow_if_nested[color ff0000]
* throw_with_nested[color ff0000]

###出力
```
outer
inner
```

##バージョン
###言語
- C++11

###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


