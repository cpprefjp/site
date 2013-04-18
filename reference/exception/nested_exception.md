#nested_exception
```cpp
namespace std {
  class nested_exception;
}
```

##概要

`nested_exception`クラスは、例外を階層構造として処理する場合に、元の例外を一時的に保持した状態で、別の例外として送出するための使用する。入れ子になった例外を補足した場合、`[rethrow_nested()](./nested_exception/rethrow_nested.md)メンバ関数`を呼び出すことで、元の例外を送出できる。

###メンバ関数

| | |
|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| [`(constructor)`](./nested_exception/nested_exception.md) | コンストラクタ |
| `~virtual nested_exception() = default;` | デストラクタ |
| `nested_exception& operator=(const nested_exception&) = default;` | 代入演算子 |
| [`rethrow_nested`](./nested_exception/rethrow_nested.md) | 入れ子になった例外を送出する |
| [`nested_ptr`](./nested_exception/nested_ptr.md) | 入れ子になった例外へのポインタを取得する |

###例
```cpp
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
        throw my_exception(); // 現在の例外(int)を入れ子にしてmy_exceptionを送出
      }
    }
    catch (my_exception& e) {
      std::cout << "2nd caught: my_exception(nested_exception)." << std::endl;
      // 入れ子になっている例外(int)を送出
      e.rethrow_nested();
    }
  }
  catch (int& x) {
    std::cout << "3rd caught: " << x << std::endl;
  }
}
```

###出力
```cpp
1st caught: 1
2nd caught: my_exception(nested_exception).
3rd caught: 1
```

##

##バージョン

###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


###参照

