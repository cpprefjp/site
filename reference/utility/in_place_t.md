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
デフォルトコンストラクタに`explicit`が付いているのは、`inplace_t x = {};`のように`=`付きの波カッコ初期化を禁止するためである。ユーザーは通常、`in_place_t`型の定数として事前定義されている`in_place`を使用すればよいので、問題にはならない。


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
* std::optional[link /reference/optional/optional.md]
* p.value()[link /reference/optional/optional/value.md]

### 出力
```
AAA
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
