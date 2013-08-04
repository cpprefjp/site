#future_category(C++11)
```cpp
namespace std {
  const error_category& future_category() noexcept;
}
```
* error_category[link /reference/system_error/error_category.md]

##概要
[`future_errc`](./future_errc.md)のためのエラーカテゴリを取得する。


##戻り値
[`error_category`](/reference/system_error/error_category.md)クラスを継承したクラスオブジェクトへの参照を返す。
この関数を呼び出すことによって返されるオブジェクトは、同じオブジェクトを指す。

この関数によって返されるオブジェクトのクラスは以下の特徴を持つ：
- [`name()`](/reference/system_error/error_category/name.md)関数によって返される文字列は`"future"`
- [`default_error_condition()`](/reference/system_error/error_category/default_error_condition.md)仮想関数および[`equivalent()`](/reference/system_error/error_category/equivalent.md)仮想関数の挙動は、基本クラスである[`error_category`](/reference/system_error/error_category.md)と同じである


##例外
投げない


##例
```cpp
#include <iostream>
#include <future>
#include <string>

int main()
{
  const std::error_category& cat = std::future_category();

  std::cout << cat.name() << std::endl;
  std::cout << cat.message(static_cast<int>(std::future_errc::broken_promise)) << std::endl;
}
```
* future_category[color ff0000]

###出力例
```
future
Broken promise
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0


##参照


