# nested_exception
* exception[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class nested_exception;
}
```

## 概要
`nested_exception`は、例外を階層構造として処理する場合に、元の例外を一時的に保持した状態で、別の例外として送出するための使用する例外クラスである。

入れ�になった例外を捕捉した場合、[`rethrow_nested()`](nested_exception/rethrow_nested.md)メンバ関数を呼び出すことで、元の例外を送出できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](nested_exception/op_constructor.md) | コンストラクタ | C++11 |
| `~virtual nested_exception() = default;` | デストラクタ | C++11 |
| `nested_exception& operator=(const nested_exception&) = default;` | 代入演算� | C++11 |
| [`rethrow_nested`](nested_exception/rethrow_nested.md) | 入れ�になった例外を送出する | C++11 |
| [`nested_ptr`](nested_exception/nested_ptr.md) | 入れ�になった例外へのポインタを取得する | C++11 |


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
* std::nested_exception[color ff0000]
* e.rethrow_nested()[link nested_exception/rethrow_nested.md]

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
- [N2559 Nesting Exception Objects (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2559.htm)

