# in_place_t
* utility[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  struct in_place_t {
    explicit in_place_t() = default;
  };

  inline constexpr in_place_t in_place {};
}
```

## 概要
`in_place_t`クラスは、オーバーロードのための空クラスである。

標準ライブラリの特定機能において、要素型のコンストラクタ引数を直接受け取って構築するための関数オーバーロードを定義するためにある。


## 備考
デフォルトコンストラクタに`explicit`が付いているのは、`in_place_t x = {};`のように`=`付きの波カッコ初期化を禁止するためである。ユーザーは通常、`in_place_t`型の定数として事前定義されている`in_place`を使用すればよいので、問題にはならない。


## 例
```cpp example
#include <iostream>
#include <optional>
#include <string>

int main()
{
  // stringクラスのコンストラクタ引数3と'A'をとり、
  // optionalクラス内でstring型のオブジェクトを生成する。
  std::optional<std::string> p {std::in_place, 3, 'A'};

  std::cout << p.value() << std::endl;
}
```
* std::in_place[color ff0000]
* p.value()[link /reference/optional/optional/value.md]

### 出力
```
AAA
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0032R1 Homogeneous interface for `variant`, `any` and `optional` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r1.pdf)
- [P0032R2 Homogeneous interface for `variant`, `any` and `optional` (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r2.pdf)
- [P0032R3 Homogeneous interface for `variant`, `any` and `optional` (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r3.pdf)
- [P0504R0 Revisiting in-place tag types for `any`/`optional`/`variant`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0504r0.html)
