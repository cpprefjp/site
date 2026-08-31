# intptr_t
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

## 概要
ポインタサイズの符号付き整数型。


## 備考
- この型の定義有無
    - C++11 : この型を実装するかどうかは処理系定義である
    - C++29 : この型は必ず定義される


この型は、以下の動作が保証される：

1. 有効な`void`へのポインタから`intptr_t`型への変換
2. `intptr_t`型のポインタ値から`void`へのポインタへの逆変換
3. 変換前と逆変換のポインタ値が等値となる


## 備考
この型は、以下のような用途に使用できる：

- ポインタ値を、一意なIDとして使用する
    - ポインタ値はオブジェクトごとに一意であるため、そのような用途に使用できる
- コールバック関数に渡す引数として、任意のオブジェクトを設定する


## 例
```cpp example
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


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2005, 2008では、`<stdlib.h>`にグローバル名前空間で定義されている。


## 参照
- [P3248R5 Require `[u]intptr_t`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3248r5.html)
    - C++29で、この型が必ず定義されるようになった。C++26までは、実装するかどうかは処理系定義だった
