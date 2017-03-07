#intptr_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using intptr_t = signed-integer-type;
}
```
* signed-integer-type[italic]

##概要
ポインタサイズの符号あり整数型。

この型を実装するかどうかは処理系定義。


この型は、以下の動作が保証される：

1. 有効な`void`へのポインタから`intptr_t`型への変換
2. `intptr_t`型のポインタ値から`void`へのポインタへの逆変換
3. 変換前と逆変換のポインタ値が等値となる


##備考
この型は、以下のような用途に使用できる：

- ポインタ値を、一意なIDとして使用する
    - ポインタ値はオブジェクトごとに一意であるため、そのような用途に使用できる
- コールバック関数に渡す引数として、任意のオブジェクトを設定する


##例
```cpp
#include <cstdint>
#include <iostream>

// 整数型ひとつをコールバック関数の引数として渡せるAPI
void callback_api(void(*callback)(std::intptr_t), std::intptr_t arg)
{
  callback(arg);
}

struct X {};

void on_call(std::intptr_t arg)
{
  // パラメータで渡される整数値を、元のX*に逆変換する
  X* x = reinterpret_cast<X*>(arg);
  delete x;

  std::cout << "on_call" << std::endl;
}

int main()
{
  int value = 42;

  // value変数へのポインタを、整数値として保持する
  std::intptr_t pointer_value = reinterpret_cast<std::intptr_t>(&value);
  std::cout << std::hex << "0x" << pointer_value << std::endl;

  // コールバック関数の引数として、オブジェクトへのポインタを整数値に変換して渡す
  X* x = new X();
  callback_api(on_call, reinterpret_cast<std::intptr_t>(x));
}
```
* std::intptr_t[color ff0000]


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
	- 8.0, 9.0では、`<stdlib.h>`にグローバル名前空間で定義されている。
