# partial_ordering
* compare[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  class partial_ordering {
    int value;        //説明専用メンバ変数
    bool is_ordered;  //説明専用メンバ変数

    constexpr explicit partial_ordering(int v) noexcept //説明専用コンストラクタ
       : value(v)
       , is_ordered(v < -1 ? false : true) {}

  public:
    static const partial_ordering less;
    static const partial_ordering equivalent;
    static const partial_ordering greater;
    static const partial_ordering unordered;
  };

  //静的メンバ定数の定義（初期化している値は説明のためのもの）
  inline constexpr partial_ordering partial_ordering::less(-1);
  inline constexpr partial_ordering partial_ordering::equivalent(0);
  inline constexpr partial_ordering partial_ordering::greater(1);
  inline constexpr partial_ordering partial_ordering::unordered(-127);
}
```

## 概要

`partial_ordering`は`<=>`の戻り値型として利用される比較カテゴリ型の一つであり、その比較が半順序の要件を満たしている事を表明する。

全ての比較カテゴリ型は、表す順序を維持したままこの型に暗黙変換することができる。

上記の説明専用のメンバ変数やコンストラクタは実際に実装されるものではなく、各定数の初期化時の値もあくまで説明専用のものである。これらに依存したプログラムにならないように注意が必要である。

## 静的メンバ定数

比較カテゴリ型はコンストラクタの提供が規定されていないため、その値は静的メンバ定数から取得する必要がある。

| 名前         | 説明                                                          | 対応バージョン |
| ------------ | ------------------------------------------------------------- | -------------- |
| `less`       | `a <=> b`の比較結果が`a < b`である事を表す値                  | C++20          |
| `equivalent` | `a <=> b`比較結果が等価（`a == b`）である事を表す値           | C++20          |
| `greater`    | `a <=> b`の比較結果が`a > b`である事を表す値                  | C++20          |
| `unordered`  | `a <=> b`の比較結果が比較不能（順序付不可能）である事を表す値 | C++20          |

## メンバ関数

### 比較演算子

| 名前                                       | 説明                             | 対応バージョン |
| ------------------------------------------ | -------------------------------- | -------------- |
| [`operator==`](partial_ordering/op_equal.md)         | 等値比較                         | C++20          |
| [`operator!=`](partial_ordering/op_not_equal.md)     | 非等値比較 (`==`により使用可能)                       | C++20          |
| [`operator<`](partial_ordering/op_less.md)           | 左辺が右辺より小さいかを判定する | C++20          |
| [`operator<=`](partial_ordering/op_less_equal.md)    | 左辺が右辺以下かを判定する       | C++20          |
| [`operator>`](partial_ordering/op_greater.md)        | 左辺が右辺より大きいかを判定する | C++20          |
| [`operator>=`](partial_ordering/op_greater_equal.md) | 左辺が右辺以上かを判定する       | C++20          |
| [`operator<=>`](partial_ordering/op_compare_3way.md) | 三方比較                         | C++20          |


## partial_orderingによるカスタム比較実装例

```cpp example
#include <iostream>
#include <compare>

struct vector2d {
  double vec[2];

  auto operator<=>(const vector2d& that) const noexcept -> std::partial_ordering {
    //2つの要素の順序関係が一致する時にのみ順序を定義
    //v1 = (a1, b1), v2 = (a2, b2) の2つのベクトルに対して、a1 < a2 かつ b1 < b2 の時に限り v1 < v2 と順序を定義する

    auto comp0 = vec[0] <=> that.vec[0];
    auto comp1 = vec[1] <=> that.vec[1];

    if (comp0 == comp1) return comp0;

    return std::partial_ordering::unordered;
  }

  //生配列との比較
  auto operator<=>(const double(&other)[2]) const noexcept -> std::partial_ordering {
    return *this <=> vector2d{other[0], other[1]};
  }

};

int main()
{
  vector2d v1 = {2.0, 4.0}, v2 = {3.0, 1.0};

  std::cout << std::boolalpha;
  std::cout << (v1 <  v2) << std::endl;
  std::cout << (v1 <= v2) << std::endl;
  std::cout << (v1 >  v2) << std::endl;
  std::cout << (v1 >= v2) << std::endl;

  std::cout << "\n";

  double v3[] = {3.0, 5.0};

  std::cout << (v1 <  v3) << std::endl;
  std::cout << (v1 <= v3) << std::endl;
  std::cout << (v1 >  v3) << std::endl;
  std::cout << (v1 >= v3) << std::endl;

  std::cout << "\n";

  //異種型間比較時の逆順の演算子の導出
  std::cout << (v3 <  v1) << std::endl;
  std::cout << (v3 <= v1) << std::endl;
  std::cout << (v3 >  v1) << std::endl;
  std::cout << (v3 >= v1) << std::endl;
}
```
* partial_ordering[color ff0000]

### 出力
```
false
false
false
false

true
true
false
false

false
false
true
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

## 関連項目

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
- [全順序集合と半順序集合](http://proofcafe.org/k27c8/math/math/relation/page/totally_orderd_relation_and_partial_orderd_relation/)
    - サンプルコードの半順序関係の参考
