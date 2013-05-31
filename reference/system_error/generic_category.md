#generic_category
```cpp
namespace std {
  const error_category& generic_category() noexcept;
}
```
* error_category[link ./error_category.md]

##概要
汎用エラーに関する`error_category`を返す。
ここでの「汎用」とは、`<cerrno>`ヘッダで定義される環境依存しないエラー値、およびそれに対応する[`std::errc`](./errc.md)列挙値によるエラー情報を指す。


##戻り値
[`error_category`](./error_category.md)クラスを継承したクラスオブジェクトへの参照を返す。 
この関数を呼び出すことによって返されるオブジェクトは、同じオブジェクトを指す。 
この関数によって返されるオブジェクトのクラスは以下の特徴を持つ：

- [`name()`](./error_category/name.md)関数によって返される文字列は`"generic"`
- [`default_error_condition()`](./error_category/default_error_condition.md)仮想関数および[`equivalent()`](./error_category/equivalent.md)仮想関数の挙動は、基本クラスである[`error_category`](./error_category.md)と同じである


##例外
投げない


##例
```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  const std::error_category& cat = std::generic_category();

  std::cout << cat.name() << std::endl;
  std::cout << cat.message(static_cast<int>(std::errc::invalid_argument)) << std::endl;
}
```
* generic_category[color ff0000]

###出力
```
generic
Invalid argument
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


##参照
