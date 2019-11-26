# endian
* bit[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  enum class endian {
    little = 以下参照,
    big = 以下参照,
    native = 以下参照
  };
}
```

## 概要
バイトの並び順 (エンディアン) を表す列挙型。

複数バイトの[スカラ型](/reference/type_traits/is_scalar.md)データの並び順として、実行環境には「ビッグエンディアン (big endian)」と「リトルエンディアン (little endian)」という2つの選択肢がある。ビッグエンディアンは上位ビットから下位ビットに向けて並び、リトルエンディアンは下位ビットから上位ビットに向けて並ぶ。

エンディアンはシステムによって異なるため、システム間でエンディアンの変換が必要になる場合がある。そういったときのために、この列挙型を使用できる。

各列挙値は、以下を意味する：

| 列挙値 | 説明 |
|--------|------|
| `little` | リトルエンディアン |
| `big`    | ビッグエンディアン |
| `native` | 実行環境のエンディアン。`little`か`big`か、またはそのどちらでもない値を持つ |

全てのスカラ型のサイズが1である場合、バイト順に意味はないため`little`、`big`、`native`は同じ値を持つ。そうでなければ、`little`と`big`は異なる値を持つ。

全てのスカラ型がビッグエンディアンである場合、`native == big`。全てのスカラ型がリトルエンディアンである場合、`native == little`。そのどちらでもなければ、`native`は`big`でも`little`でもない値となる (mixed endian、PDPエンディアン、ミドルエンディアンなどと呼ばれるエンディアン方式)。


## 例
```cpp example
#include <bit>
#include <iostream>

int main()
{
  if (std::endian::native == std::endian::little) {
    std::cout << "実行環境はリトルエンディアンを使用する" << std::endl;
  }
  else if (std::endian::native == std::endian::big) {
    std::cout << "実行環境はビッグエンディアンを使用する" << std::endl;
  }
  else {
    std::cout << "実行環境はリトルでもビッグでもないエンディアンを使用する" << std::endl;
  }
}
```
* std::endian::native[color ff0000]
* std::endian::little[color ff0000]
* std::endian::big[color ff0000]

### 出力例
```
実行環境はリトルエンディアンを使用する
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0463R1 endian, Just endian](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0463r1.html)
- [P1612R1 Relocate Endian's Specification](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1612r1.pdf)
