# strong_ordering
* compare[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  class strong_ordering {
    int value;  //説明専用メンバ変数

    constexpr explicit strong_ordering(int v) noexcept : value(v) {}  //説明専用コンストラクタ

  public:

    static const strong_ordering less;
    static const strong_ordering equal;
    static const strong_ordering equivalent;
    static const strong_ordering greater;
  };

  //静的メンバ定数の定義（初期化している値は説明のためのもの）
  inline constexpr strong_ordering strong_ordering::less(-1);
  inline constexpr strong_ordering strong_ordering::equal(0);
  inline constexpr strong_ordering strong_ordering::equivalent(0));
  inline constexpr strong_ordering strong_ordering::greater(1);
}
```

## 概要

`strong_ordering`は`<=>`の戻り値型として利用される比較カテゴリ型の一つであり、その比較が全順序の要件を満たしている事を表明する。

上記の説明専用のメンバ変数やコンストラクタは実際に実装されるものではなく、各定数の初期化時の値もあくまで説明専用のものである。これらに依�したプ�グラムにならないように注意が必要である。

### 代入可能性（*substitutability*）

`strong_ordering`による�値比較は[代入可能性](/reference/compare.md)を満たしている事を表明する。

`strong_ordering`を返す`<=>`はそのように実装されている事が期待される。

## 静的メンバ定数

比較カテゴリ型はコンストラクタの提供が規定されていないため、その値は静的メンバ定数から取得する必要がある。

| 名前                | 説明                                                | 対応バージョン |
| ------------------- | --------------------------------------------------- | -------------- |
| `less`              | `a <=> b`の比較結果が`a < b`である事を表す値        | C++20          |
| `equal, equivalent` | `a <=> b`比較結果が�値（`a == b`）である事を表す値 | C++20          |
| `greater`           | `a <=> b`の比較結果が`a > b`である事を表す値        | C++20          |

## メンバ関数

### 比較カテゴリ型への暗黙変換

| 名前                                                                         | 説明                                                      | 対応バージョン |
| ---------------------------------------------------------------------------- | --------------------------------------------------------- | -------------- |
| [`oeprator partial_ordering`](strong_ordering/op_partial_ordering.md) | [`partial_ordering`](partial_ordering.md)への型変換演算� | C++20          |
| [`oeprator weak_ordering`](strong_ordering/op_weak_ordering.md)       | [`weak_ordering`](weak_ordering.md)への型変換演算�       | C++20          |


### 比較演算�

| 名前                                                       | 説明                             | 対応バージョン |
| ---------------------------------------------------------- | -------------------------------- | -------------- |
| [`operator==`](strong_ordering/op_equal.md)         | �値比較                         | C++20          |
| [`operator!=`](strong_ordering/op_not_equal.md)     | 非�値比較 (`==`により使用可能)                       | C++20          |
| [`operator<`](strong_ordering/op_less.md)           | 左辺が右辺より小さいかを判定する | C++20          |
| [`operator<=`](strong_ordering/op_less_equal.md)    | 左辺が右辺以下かを判定する       | C++20          |
| [`operator>`](strong_ordering/op_greater.md)        | 左辺が右辺より大きいかを判定する | C++20          |
| [`operator>=`](strong_ordering/op_greater_equal.md) | 左辺が右辺以上かを判定する       | C++20          |
| [`operator<=>`](strong_ordering/op_compare_3way.md) | 三方比較                         | C++20          |


## strong_orderingによるカスタム比較実装例

```cpp example
#include <iostream>
#include <string>
#include <compare>

struct national {
  std::size_t my_number;
  std::string first_name;
  std::string last_name;

  auto operator<=>(const national& that) const -> std::strong_ordering {
    //宣言と逆順の比較

    if (auto comp = last_name  <=> that.last_name ; comp != 0) return comp;
    if (auto comp = first_name <=> that.first_name; comp != 0) return comp;
    return my_number <=> that.my_number;
  }
};

int main()
{
  national p1 = {1, "tarou", "yamada"}, p2 = {2, "hanako", "suzuki"};

  std::cout << std::boolalpha;
  std::cout << (p1 <  p2) << std::endl;
  std::cout << (p1 <= p2) << std::endl;
  std::cout << (p1 >  p2) << std::endl;
  std::cout << (p1 >= p2) << std::endl;
}
```
* strong_ordering[color ff0000]

### 出力
```
false
false
true
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
